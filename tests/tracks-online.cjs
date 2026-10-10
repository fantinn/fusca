const assert=require('node:assert/strict');
const fs=require('node:fs');const path=require('node:path');const http=require('node:http');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const server=http.createServer((req,res)=>{res.setHeader('Content-Type','text/html; charset=utf-8');res.end(fs.readFileSync(path.resolve(__dirname,'../index.html')))});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const url='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({channel:'msedge',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});const errors=[];
 try{
  const context=await browser.newContext({viewport:{width:1280,height:800}});
  async function page(low=false){const p=await context.newPage();p.on('pageerror',e=>errors.push(e.message));await p.goto(url+'/?debug=1&manual=1&net=local'+(low?'&low=1&touch=1':''));await p.waitForFunction(()=>!!window.__g);return p}
  const a=await page();await a.evaluate(()=>__g.start());
  const tracks=await a.evaluate(()=>{
   const g=__g,out={};for(const id of ['oval','jardim','porto']){g.race.trackId=id;const K=g.trackGet(id);out[id]={length:K.L,blocked:[]};
    for(let d=0;d<K.L;d+=6){const p=g.trkPose(d,0,K);g.car.position.set(p.x,0,p.z);g.car.rotation.set(0,p.yaw,0);if(g.carContacts(g.car).some(c=>!c.other))out[id].blocked.push(d)}
    for(const mode of ['carro','kart','caminhao','formula','moto']){g.openRaceHub();g.race.selectedBet=0;g.racePick(mode);if(g.RT!==K)throw Error('wrong track');for(const v of [g.car,...g.race.field.map(r=>r.g)])if(g.carContacts(v).some(c=>!c.other))throw Error('blocked grid '+id+' '+mode);g.race.t=1;for(let n=0;n<90;n++){g.simTime+=1/60;g.race.cars=g.raceCars();for(const r of g.race.field)g.rivalDrive(r,1/60)}if(g.race.field.some(r=>!Number.isFinite(r.g.position.x+r.g.position.z)||r.g.position.z<1350))throw Error('bad AI');g.endRace();g.hideField()}
   }g.openRaceHub();g.race.trackId='porto';document.querySelector('#rmTrack').value='porto';g.trackPreview();return out;
  });for(const t of Object.values(tracks))assert.deepEqual(t.blocked,[]);console.log('Track geometry and all 4 vehicle classes:',tracks);
  await a.screenshot({path:path.resolve(__dirname,'../tracks-preview.png')});
  await a.evaluate(()=>{__g.racePick('carro');__g.step(30)});await a.screenshot({path:path.resolve(__dirname,'../porto-preview.png')});await a.evaluate(()=>{__g.endRace();__g.hideField()});
  const b=await page(true);
  for(const [p,name] of [[a,'Ana'],[b,'Beto']]){await p.evaluate(async name=>{document.querySelector('#netname').value=name;await __g.netJoin('TEST1')},name)}
  await a.waitForFunction(()=>__g.net.peers.size===1);await b.waitForFunction(()=>__g.net.peers.size===1);
  const aid=await a.evaluate(()=>__g.net.id),bid=await b.evaluate(()=>__g.net.id),host=aid<bid?a:b,guest=host===a?b:a;
  await guest.evaluate(()=>{__g.inCar=false;document.querySelector('#pause').click()});
  // A non-coordinator requests the race; all clients are pulled into it, including the paused pedestrian.
  await guest.evaluate(()=>{__g.race.trackId='jardim';__g.racePick('caminhao')});
  for(const p of [a,b])await p.waitForFunction(()=>__g.race.on&&__g.race.online?.startAt>0);
  const states=await Promise.all([a,b].map(p=>p.evaluate(()=>({id:__g.race.online.id,start:__g.race.online.startAt,slot:__g.race.slot,track:__g.race.online.track,field:__g.race.field.length,total:__g.race.total,bet:__g.race.bet,car:__g.car.userData.model,inCar:__g.inCar}))));
  assert.equal(states[0].id,states[1].id);assert.equal(states[0].start,states[1].start);assert.notEqual(states[0].slot,states[1].slot);for(const s of states){assert.equal(s.field,5);assert.equal(s.total,7);assert.equal(s.bet,0);assert.equal(s.track,'jardim');assert.equal(s.car,'Caminhão');assert(s.inCar)}
  const id=states[0].id;await guest.evaluate(()=>__g.racePick('kart'));assert.equal(await guest.evaluate(()=>__g.race.online.id),id);
  // Repeated state messages never reset the grid or charge a second entry.
  await host.evaluate(()=>{for(let i=0;i<8;i++)__g.netSend()});await guest.evaluate(()=>__g.step());assert.equal(await guest.evaluate(()=>__g.race.online.id),id);
  await host.waitForFunction(()=>Date.now()>__g.race.online.startAt+150);
  for(const p of [host,guest])await p.evaluate(()=>{__g.step(2);if(__g.race.t<0)throw Error('still frozen')});
  await host.evaluate(()=>{__g.step(120);__g.netSend()});await guest.waitForFunction(()=>__g.race.field.every(r=>r.target&&r.target[6]>-100));
  const hp=await host.evaluate(()=>__g.race.field.map(r=>r.p));await guest.evaluate(()=>__g.step(15));const gp=await guest.evaluate(()=>__g.race.field.map(r=>r.p));hp.forEach((p,i)=>assert(Math.abs(p-gp[i])<.01,'NPC authoritative progress'));
  const c=await page();await c.evaluate(async()=>{document.querySelector('#netname').value='Cris';await __g.netJoin('TEST1')});await c.waitForFunction(()=>__g.net.peers.size===2);assert.equal(await c.evaluate(()=>__g.race.on),false);
  // Remote humans count in the standings.
  await host.evaluate(()=>{__g.race.me.p=500;__g.netSend()});await guest.waitForFunction(()=>[...__g.net.peers.values()].some(p=>p.race?.p===500));assert(await guest.evaluate(()=>__g.racePos()>1));
  for(const p of [a,b])await p.evaluate(()=>{__g.endRace();__g.netSend()});
  await host.waitForFunction(()=>__g.race.online.closed);await guest.waitForFunction(()=>__g.race.online.closed);
  await c.evaluate(()=>{__g.race.trackId='mx';__g.racePick('moto')});for(const p of [a,b,c])await p.waitForFunction(()=>__g.race.on&&__g.race.online.track==='mx'&&__g.race.online.startAt);
  const slots=await Promise.all([a,b,c].map(p=>p.evaluate(()=>({slot:__g.race.slot,x:__g.car.position.x,z:__g.car.position.z,n:__g.race.total}))));assert.equal(new Set(slots.map(s=>s.slot)).size,3);for(const s of slots)assert.equal(s.n,8);
  for(const p of [a,b,c])assert(await p.evaluate(()=>{const g=__g,sl=g.race.slot,q=g.trkPose(-9-10*sl,sl%2?-3.2:3.2,g.RT);return Math.hypot(g.car.position.x-q.x,g.car.position.z-q.z)<.01}));
  const leaderId=await c.evaluate(()=>__g.race.online.host),all=[a,b,c];let leader;for(const p of all)if(await p.evaluate(()=>__g.net.id)===leaderId)leader=p;
  await leader.close();for(const p of all.filter(p=>p!==leader))await p.waitForFunction(()=>!__g.race.on&&__g.race.online.closed,{},{timeout:16000});
  console.log('PASS: non-host start, paused/on-foot participant, mixed quality, shared countdown/grid/NPCs, duplicate protection, late join, standings and next race');
  console.log('PASS: coordinator disconnect releases every remaining participant');
  assert.deepEqual(errors,[]);
 }finally{await browser.close();await new Promise(r=>server.close(r))}
})().catch(e=>{console.error(e);process.exitCode=1});
