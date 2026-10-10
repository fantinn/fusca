// Two tabs in the same room (BroadcastChannel, no Supabase): punch, knock-down, grab/drag/throw, breaking free, running over and car-to-car contact.
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
  for(const [p,name] of [[a,'Ana'],[b,'Beto']])await p.evaluate(async name=>{document.querySelector('#netname').value=name;await __g.netJoin('PVP1');__g.simTime=50},name);
  await a.waitForFunction(()=>__g.net.peers.size===1);await b.waitForFunction(()=>__g.net.peers.size===1);
  // Advance both games 50 ms at a time (no rendering), sending a snapshot each slice, so snapshots and events get through.
  const run=async(ms=600,each)=>{for(let k=0;k<ms/50;k++){await Promise.all([a,b].map(p=>p.evaluate(()=>{for(let i=0;i<3;i++)__g.update(1/60);__g.netSend()})));if(each)await each();await new Promise(r=>setTimeout(r,15))}};
  const base=await a.evaluate(()=>({x:__g.car.position.x+6,z:__g.car.position.z}));
  const onFoot=(p,x,z,h)=>p.evaluate(([x,z,h])=>{const g=__g;g.inCar=false;g.player.position.set(x,0,z);g.heading=h;g.player.rotation.y=h},[x,z,h]);
  const place=async()=>{await onFoot(a,base.x,base.z,0);await onFoot(b,base.x,base.z+1.25,Math.PI);await run(900)};
  await place();
  assert(await a.evaluate(()=>[...__g.net.peers.values()][0].cur?.m===1),'A sees B on foot');

  // Punch: B loses health; three clean punches in a row knock B down.
  const hp0=await b.evaluate(()=>__g.health);
  await a.keyboard.press('q');await run(500);
  const hp1=await b.evaluate(()=>__g.health);assert(hp1<hp0,'punch lands on the remote player ('+hp0+' → '+hp1+')');
  for(let k=0;k<3;k++){await onFoot(a,base.x,base.z,0);await onFoot(b,base.x,base.z+1.25,Math.PI);await run(400);await a.keyboard.press('q');await run(500)}
  assert(await b.evaluate(()=>!!__g.player.userData.rag||__g.health<60),'combo knocks the remote player down');
  await run(5000);

  // Grab: holding X takes B; walking away drags B along; Q throws.
  await b.evaluate(()=>{__g.health=100});await place();
  await a.evaluate(()=>{__g.keys.x=true});await run(900);
  assert(await a.evaluate(()=>!!__g.netGrab),'A holds B');assert(await b.evaluate(()=>!!__g.netHeld),'B knows it is held');await run(400);
  assert(await a.evaluate(()=>[...__g.net.peers.values()][0].cur?.m===4),'A sees B held');assert(await b.evaluate(()=>[...__g.net.peers.values()][0].holding),'B sees A holding');
  if(process.env.PVP_SHOTS)for(const [p,n] of [[a,'a'],[b,'b']])await p.evaluate(()=>__g.render()).then(()=>p.screenshot({path:path.join(process.env.PVP_SHOTS,'grab-'+n+'.png')}));
  const b0=await b.evaluate(()=>__g.player.position.z);
  await run(1500,()=>a.evaluate(()=>{__g.player.position.z-=.08}));
  const b1=await b.evaluate(()=>__g.player.position.z);assert(b1<b0-1,'held player is dragged ('+b0.toFixed(2)+' → '+b1.toFixed(2)+')');
  await a.keyboard.press('q');await run(600);
  assert(await a.evaluate(()=>!__g.netGrab),'throw releases');assert(await b.evaluate(()=>!__g.netHeld&&!!__g.player.userData.rag),'thrown player falls');
  await a.evaluate(()=>{__g.keys.x=false});await run(5000);

  // Breaking free: mashing A/D.
  await b.evaluate(()=>{__g.health=100});await place();await a.evaluate(()=>{__g.keys.x=true});await run(900);
  assert(await b.evaluate(()=>!!__g.netHeld),'held again');
  for(let k=0;k<14;k++){await b.keyboard.press(k%2?'d':'a');await run(60)}await run(600);
  assert(await b.evaluate(()=>!__g.netHeld),'B breaks free');assert(await a.evaluate(()=>!__g.netGrab),'A lets go when B breaks free');
  await a.evaluate(()=>{__g.keys.x=false});await run(800);

  // Running over: A's car at speed into B on foot.
  await b.evaluate(()=>{__g.health=100});await onFoot(b,base.x,base.z+9,Math.PI);
  await a.evaluate(([x,z])=>{const g=__g;g.player.position.set(x,0,z-30);g.inCar=true;g.car.position.set(x,0,z-4);g.car.rotation.set(0,0,0);g.angle=0;g.heading=0;g.velocity=0;g.car.userData.vel={x:0,z:0}},[base.x,base.z]);await run(900);
  await run(1200,()=>a.evaluate(()=>{const g=__g;g.angle=0;g.car.rotation.y=0;g.velocity=14;g.car.userData.vel={x:0,z:14}}));
  assert(await b.evaluate(()=>__g.health<100&&!!__g.player.userData.rag),'running over knocks the remote player down');
  await run(5000);

  // Car against car: B parked in a car ahead; A drives into it. A is blocked by B's car and B's car is pushed.
  await b.evaluate(([x,z])=>{const g=__g;g.inCar=true;g.car.position.set(x,0,z+10);g.car.rotation.set(0,0,0);g.angle=0;g.velocity=0;g.car.userData.vel={x:0,z:0}},[base.x,base.z]);
  await run(1000);const bx=await b.evaluate(()=>__g.car.position.x),bz0=await b.evaluate(()=>__g.car.position.z);await a.evaluate(([x,z])=>{const g=__g;g.car.position.set(x,0,z-6);g.car.rotation.set(0,0,0);g.angle=0;g.velocity=0;g.car.userData.vel={x:0,z:0};g.car.userData.lastImpact=null},[bx,base.z]);await run(600);
  let maxA=0;
  let maxB=0;await run(1500,async()=>{await a.evaluate(bz=>{const g=__g;if(g.car.position.z<bz-5.5){g.velocity=12;g.car.userData.vel={x:0,z:12}}},bz0);maxA=Math.max(maxA,await a.evaluate(()=>__g.velocity));maxB=Math.max(maxB,await b.evaluate(()=>Math.hypot(__g.car.userData.vel?.x||0,__g.car.userData.vel?.z||0)))});
  const az=await a.evaluate(()=>__g.car.position.z),bz=await b.evaluate(()=>__g.car.position.z);
  assert(maxA>8,'A drives at B ('+maxA.toFixed(1)+' m/s)');assert(az<bz-3,'A does not drive through B ('+az.toFixed(1)+' vs '+bz.toFixed(1)+')');assert(maxB>1.5,'B\'s car is pushed ('+maxB.toFixed(2)+' m/s)');
  assert.deepEqual(errors,[]);console.log('PASS: punch, knock-down, grab/drag/throw, break free, run over, car contact');
 }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);process.exit(1)});
