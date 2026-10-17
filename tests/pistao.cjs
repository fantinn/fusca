const assert=require('node:assert/strict');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
 try{
 for(const perf of [false,true]){
  const page=await browser.newPage({viewport:{width:1280,height:720}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{let seed=14;Math.random=()=>((seed=(1664525*seed+1013904223)>>>0)/4294967296)});
  await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href+'?debug=1&manual=1'+(perf?'&performance=1':''));
  await page.waitForFunction(()=>!!window.__g,{},{timeout:90000});
  const result=await page.evaluate(()=>{
   const g=__g,check=(v,m)=>{if(!v)throw Error(m)};
   g.start();g.race.selectedBet=0;g.racePick('pistao');
   check(g.race.on&&g.race.total===26&&g.race.field.length===25,'26 cars including player');
   check(g.RT===g.TRACKS.oval.track&&g.race.laps===5,'oval race');
   check(g.car.userData.stock,'stock car model');
   check(new Set(g.race.field.map(r=>r.g.userData.raceNumber)).size===25,'unique rival numbers');
   const vehicles=[g.car,...g.race.field.map(r=>r.g)];
   for(const v of vehicles)check(!g.carContacts(v).length,'clear grid '+v.userData.raceNumber);
   check(g.ovalHeight(400,1680)>5&&g.ovalHeight(100,1540)===0,'banked turns, flat start');
   const m=g.startMarshal;check(m&&m.g.position.distanceTo(new g.T.Vector3(...(()=>{const p=g.trkPose(8,0,g.RT);return[p.x,g.surfaceY(p.x,p.z),p.z]})()))<.01,'marshal on centerline');
   check(m.g.userData.arms[1].rotation.z<-3,'flag raised');
   g.step(239);check(g.race.t<0&&!m.released,'no early flag');
   g.step(24);check(g.race.t>0&&m.released&&m.g.userData.arms[1].rotation.z>-.4,'flag lowered on go');
   // Swept collision at racing speed, using the same ragdoll as other actors.
   const p=m.g.position.clone(),yaw=m.g.rotation.y+Math.PI;
   g.car.position.copy(p);g.car.rotation.y=yaw;g.car.userData.vel={x:Math.sin(yaw)*60,z:Math.cos(yaw)*60};
   g.updateMarshal(1/60);check(!!m.g.userData.rag&&!m.flag.visible,'marshal can be hit');
   g.endRace();g.hideField();g.openRaceHub();g.racePick('pistao');
   check(!m.g.userData.rag&&m.g.userData.rig.visible&&m.flag.visible,'marshal resets for next race');
   g.race.t=1;g.car.position.set(100,0,1680);g.car.userData.vel={x:0,z:0};
   const first=g.race.field[0];let top=0;
   const start=performance.now();
   for(let n=0;n<1800;n++){
    g.simTime+=1/60;g.race.t+=1/60;g.race.cars=g.raceCars();for(const r of g.race.field)g.rivalDrive(r,1/60);
    top=Math.max(top,Math.hypot(first.g.userData.vel.x,first.g.userData.vel.z));
   }
   check(g.race.field.every(r=>Number.isFinite(r.g.position.x+r.g.position.y+r.g.position.z)&&r.p>200),'all 25 rivals progress');
   check(top>65,'stock cars exceed 234 km/h');
   g.cam.position.set(100,70,1480);g.cam.lookAt(100,0,1660);g.visualBudget(1);g.render();
   if(g.PERF){check(!g.renderer.shadowMap.enabled,'shadows disabled');check(!g.rain.visible,'rain off');let maps=0;g.scene.traverse(o=>{if(o.isLight&&o.shadow?.map)maps++});check(!maps,'zero allocated shadow maps')}
   const out={performance:g.PERF,cars:26,topKmh:Math.round(top*3.6),minProgress:Math.round(Math.min(...g.race.field.map(r=>r.p))),aiMs:Math.round(performance.now()-start),drawCalls:g.renderer.info.render.calls,triangles:g.renderer.info.render.triangles,pixelRatio:g.PR.cur};
   g.endRace();g.hideField();g.openRaceHub();g.race.trackId='oval';g.racePick('caminhao');
   check(g.car.userData.K.vmax===78&&g.car.userData.K.acc===32,'player racing truck tune');
   check(g.race.field.every(r=>r.g.userData.K.vmax===78),'rival racing truck tune');
   g.race.t=1;g.race.cars=g.raceCars();const truck=g.race.field[0];let truckTop=0;
   for(let n=0;n<900;n++){g.simTime+=1/60;g.race.t+=1/60;g.race.cars=g.raceCars();for(const r of g.race.field)g.rivalDrive(r,1/60);truckTop=Math.max(truckTop,Math.hypot(truck.g.userData.vel.x,truck.g.userData.vel.z))}
   check(truckTop>55,'truck exceeds old speed cap');out.truckKmh=Math.round(truckTop*3.6);
   g.hideField();const launch=g.trkPose(-120,-8,g.RT);g.car.position.set(launch.x,g.surfaceY(launch.x,launch.z),launch.z);g.angle=launch.yaw;g.car.rotation.set(0,launch.yaw,0);g.velocity=0;g.clearFlight(g.car);g.keys.w=true;
   for(let n=0;n<300;n++){g.simTime+=1/60;g.drive(1/60)}g.keysClear();
   check(g.velocity>40,'player truck accelerates to over 144 km/h in 5 seconds');out.playerTruckKmh=Math.round(g.velocity*3.6);
   g.endRace();check(g.car.userData.K.vmax===30,'restore road truck after race');g.hideField();
   g.openRaceHub();g.racePick('pistao');g.step(1);return out;
  });
  await page.screenshot({path:path.resolve(__dirname,perf?'../pistao-performance-preview.png':'../pistao-preview.png')});
  assert.deepEqual(errors,[]);console.log(JSON.stringify(result));await page.close();
 }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
