// Two tabs in the same room (BroadcastChannel, no Supabase): both see the same police. The leader's cruising patrol cars replace the
// other tab's own, a pursuit's units show up on the other screen where they really are, ramming a remote police car pushes it in its
// owner's game, and units that leave (arrest) disappear for everyone.
// Run with PLAYWRIGHT_MODULE pointing to an installed Playwright package, or npm install playwright.
const assert=require('node:assert/strict');
const fs=require('node:fs');const path=require('node:path');const http=require('node:http');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const server=http.createServer((req,res)=>{res.setHeader('Content-Type','text/html; charset=utf-8');res.end(fs.readFileSync(path.resolve(__dirname,'../index.html')))});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const url='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({channel:'msedge',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});const errors=[];
 try{
  const context=await browser.newContext({viewport:{width:1100,height:700}});
  async function page(){const p=await context.newPage();p.on('pageerror',e=>errors.push(e.message));await p.goto(url+'/?debug=1&manual=1&net=local');await p.waitForFunction(()=>!!window.__g);return p}
  const a=await page(),b=await page();
  for(const [p,name] of [[a,'Ana'],[b,'Beto']])await p.evaluate(async name=>{document.querySelector('#netname').value=name;await __g.netJoin('POL1');__g.simTime=50},name);
  await a.waitForFunction(()=>__g.net.peers.size===1);await b.waitForFunction(()=>__g.net.peers.size===1);
  // Advance the given games 50 ms at a time (no rendering), sending a snapshot each slice; the others only keep sending.
  const run=async(ms=600,live=[a,b])=>{for(let k=0;k<ms/50;k++){await Promise.all([a,b].map(p=>p.evaluate(on=>{if(on)for(let i=0;i<3;i++)__g.update(1/60);__g.netSend()},live.includes(p))));await new Promise(r=>setTimeout(r,15))}};
  const ids=await Promise.all([a,b].map(p=>p.evaluate(()=>__g.net.id))),[lead,other]=ids[0]<ids[1]?[a,b]:[b,a],leadId=ids[0]<ids[1]?ids[0]:ids[1],aId=ids[0];
  await run(1500);

  // Cruising patrols: only the leader's cars drive; the other tab put its own away and shows the leader's in the same places.
  const cruising=()=>__g.traffic.filter(t=>t.patrol&&!t.g.userData.npcDriver).map(t=>({k:'c'+t.nid,x:t.g.position.x,z:t.g.position.z}));
  const mine=await lead.evaluate(`(${cruising})()`);assert(mine.length>=3,'leader keeps its cruising patrol cars ('+mine.length+')');
  assert.equal(await other.evaluate(()=>__g.traffic.filter(t=>t.patrol).length),0,'the other tab has no cruising patrol cars of its own');
  assert(await other.evaluate(()=>__g.netPatrolStash.length>=3),'its own patrol cars are put away');
  await run(800,[other]);// leader frozen: the ghosts settle on its exact positions
  const ghosts=await other.evaluate(id=>[...(__g.netCops.get(id)?.entries()||[])].filter(([k])=>k[0]==='c').map(([k,G])=>({k,x:G.veh.position.x,z:G.veh.position.z,red:G.veh.userData.siren.red.visible||G.veh.userData.siren.blue.visible})),leadId);
  const now=await lead.evaluate(`(${cruising})()`);
  assert.equal(ghosts.length,now.length,'every cruising patrol car of the leader is on the other screen');
  for(const g of ghosts){const m=now.find(q=>q.k===g.k);assert(m&&Math.hypot(m.x-g.x,m.z-g.z)<.05,'patrol '+g.k+' in the same place')}
  assert(ghosts.every(g=>!g.red),'cruising patrols keep the lights off while nobody is wanted');

  // Pursuit: Ana commits a crime; her units appear on Beto's screen, lights flashing, where they are in her game.
  await a.evaluate(()=>__g.crime(90,'Teste'));await run(4000);
  const units=await a.evaluate(()=>__g.police.map(p=>({k:'u'+p.nid,v:p.v&&[p.v.position.x,p.v.position.z],o:[p.g.position.x,p.g.position.z]})));
  assert(units.filter(u=>u.v).length>=2,'Ana is chased by several units ('+units.length+')');
  await run(800,[b]);
  const seen=await b.evaluate(id=>Object.fromEntries([...(__g.netCops.get(id)?.entries()||[])].filter(([k])=>k[0]==='u').map(([k,G])=>[k,{v:G.veh&&[G.veh.position.x,G.veh.position.z],o:G.body&&[G.body.position.x,G.body.position.z],vis:!!G.body?.visible}])),aId);
  for(const u of units){const s=seen[u.k];assert(s,'unit '+u.k+' visible to Beto');if(u.v)assert(s.v&&Math.hypot(u.v[0]-s.v[0],u.v[1]-s.v[1])<.05,'unit car '+u.k+' in the same place');assert(s.o&&Math.hypot(u.o[0]-s.o[0],u.o[1]-s.o[1])<.05,'officer '+u.k+' in the same place')}
  assert.equal(Object.keys(seen).length,units.length,'no stale units on Beto\'s screen');
  assert(await b.evaluate(id=>[...__g.netCops.get(id).values()].filter(G=>G.veh).every(G=>G.veh.userData.siren.red.visible!==G.veh.userData.siren.blue.visible),aId),'remote units flash');

  // Ramming one of Ana's police cars with Beto's car pushes it in Ana's game.
  const base=await b.evaluate(()=>({x:__g.car.position.x+6,z:__g.car.position.z}));
  const target=units.find(u=>u.v).k;
  await a.evaluate(([k,x,z])=>{for(const p of __g.police){if(!p.v)continue;const mine='u'+p.nid===k;p.v.position.set(x,0,mine?z+10:z+400+p.nid*12);p.v.rotation.set(0,0,0);p.v.userData.vel={x:0,z:0};p.v.userData.spin=0}},[target,base.x,base.z]);
  await b.evaluate(([x,z])=>{const g=__g;g.inCar=true;g.car.position.set(x,0,z-6);g.car.rotation.set(0,0,0);g.angle=0;g.velocity=0;g.car.userData.vel={x:0,z:0};g.car.userData.lastImpact=null},[base.x,base.z]);
  await run(900,[b]);
  for(let k=0;k<24;k++){await b.evaluate(()=>{const g=__g;g.angle=0;g.car.rotation.y=0;g.velocity=Math.max(g.velocity,12);g.car.userData.vel.z=Math.max(g.car.userData.vel.z,12);for(let i=0;i<3;i++)g.update(1/60);g.netSend()});await a.evaluate(()=>__g.netSend());await new Promise(r=>setTimeout(r,15))}
  const pushed=await a.evaluate(k=>{const p=__g.police.find(p=>'u'+p.nid===k),u=p.v.userData;return Math.hypot(u.vel.x,u.vel.z)},target);
  assert(pushed>1,'the rammed police car is pushed in its owner\'s game ('+pushed.toFixed(2)+' m/s)');
  const bz=await b.evaluate(()=>__g.car.position.z);assert(bz<base.z+10,'Beto\'s car does not drive through it ('+(bz-base.z).toFixed(2)+')');

  // A player driving a patrol car is seen in a patrol car.
  assert.equal(await a.evaluate(()=>__g.netKind(__g.police.find(p=>p.v).v)),'pol-'+await a.evaluate(()=>__g.police.find(p=>p.v).v.userData.copModel),'patrol cars travel as police cars');
  assert(await b.evaluate(()=>!!__g.netVehicle('pol-kombi','ffffff').userData.siren),'and are rebuilt with their light bar');

  // Arrest: Ana's pursuit units go away on Beto's screen too.
  await a.evaluate(()=>{__g.arrested()});await run(800,[b]);
  const left=await a.evaluate(()=>__g.police.map(p=>'u'+p.nid));
  const still=await b.evaluate(id=>[...(__g.netCops.get(id)?.keys()||[])].filter(k=>k[0]==='u'),aId);
  assert.deepEqual(still.sort(),left.sort(),'units that left are gone for everyone');
  assert.deepEqual(errors,[],'no page errors');
  console.log('police online ok • cruising '+mine.length+' • pursuit '+units.length+' • pushed '+pushed.toFixed(1)+' m/s');
 }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);process.exit(1)});
