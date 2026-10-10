// Run with PLAYWRIGHT_MODULE pointing to an installed Playwright package, or npm install playwright.
const assert=require('node:assert/strict');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
 try{
 const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href+'?debug=1&manual=1');
 await page.waitForFunction(()=>!!window.__g);
 await page.click('#start');
 assert(await page.locator('#racemenu').isVisible());
 await page.screenshot({path:path.resolve(__dirname,'../menu-preview.png')});
 const results=await page.evaluate(()=>{
  const g=__g,out={};
  const check=(v,m)=>{if(!v)throw Error(m)};
  check(g.TRK.L>3400&&g.MXT.L>1450,'larger tracks');
  check(document.querySelector('#surfhud')===null,'surf UI removed');
  check(g.OC.waves===undefined,'breaking wave simulator removed');
  out.trackClearance={};
  for(const track of [g.TRK,g.MXT]){const blocked=[];for(let d=0;d<track.L;d+=10){const p=g.trkPose(d,0,track);g.car.position.set(p.x,0,p.z);g.car.rotation.set(0,p.yaw,0);if(g.carContacts(g.car).some(c=>!c.other))blocked.push(Math.round(d));}out.trackClearance[track.dirt?'moto':'asphalt']=blocked;check(!blocked.length,'track center obstructed '+blocked)}
  for(const mode of ['carro','moto','kart','caminhao','formula']){
   g.openRaceHub();g.race.selectedBet=50;const before=g.cash;g.racePick(mode);
   check(g.race.on&&g.cash===before-50,mode+' entry debit');
   const grid=g.race.field.map(R=>g.carContacts(R.g).filter(c=>!c.other).length);
   check(!grid.some(Boolean),mode+' grid blocked '+grid);
   check(!g.carContacts(g.car).some(c=>!c.other),mode+' player grid blocked');
   g.race.t=1;g.race.cars=g.raceCars();
   for(let n=0;n<90;n++){g.simTime+=1/60;g.race.cars=g.raceCars();for(const R of g.race.field)g.rivalDrive(R,1/60)}
   check(g.race.field.every(R=>Number.isFinite(R.g.position.x+R.g.position.y+R.g.position.z)),'finite rival physics '+mode);
   g.race.fin=[];g.finishRace();check(g.cash===before+100,mode+' win pays 3x including stake');
   g.finishRace();check(g.cash===before+100,'duplicate payout blocked');
   out[mode]={grid,credit:g.cash};
  }
  g.hideField();g.openRaceHub();g.race.selectedBet=0;const free=g.cash;g.racePick('carro');check(g.cash===free,'free practice must not debit');
  // Equal-mass rear collision must transfer momentum to the rival and preserve its recovery window.
  g.race.t=1;const R=g.race.field[0],v=R.g;
  for(const q of g.race.field)q.g.position.set(400,0,900);
  g.clearFlight(g.car);g.car.position.set(0,0,365);g.angle=Math.PI/2;g.car.rotation.set(0,Math.PI/2,0);g.car.userData.vel={x:22,z:0};g.car.userData.yawRate=0;
  const sep=(g.car.userData.size?.d||2.1)*g.car.scale.z+(v.userData.size?.d||2.1)*v.scale.z-.2;
  v.position.set(sep,0,365);v.rotation.set(0,Math.PI/2,0);v.userData.vel={x:0,z:0};v.userData.spin=0;
  let hit=g.carContacts(g.car).find(c=>c.other===v);check(hit,'collision fixture overlap');
  g.collidePair(g.car,hit,true);
  const pushed=Math.hypot(v.userData.vel.x,v.userData.vel.z);check(pushed>5,'rival must receive substantial impulse');
  check(v.userData.impactUntil>g.simTime+.5,'post-hit recovery window');
  const position=v.position.clone();g.race.cars=g.raceCars();g.rivalDrive(R,.2);
  check(v.position.distanceTo(position)>.5,'rival must continue moving after impact');
  check(Math.hypot(v.userData.vel.x,v.userData.vel.z)<=pushed+.1,'no instant acceleration after impact');
  out.collision={pushed,after:Math.hypot(v.userData.vel.x,v.userData.vel.z)};
  // A high-speed moto launch is capped to a 2.5m ballistic rise above its take-off height.
  g.endRace();g.hideField();g.openRaceHub();g.racePick('moto');g.race.t=1;
  g.motoLaunch(g.car,24,0,0);check(g.car.userData.flight.vy<=7,'moto vertical speed cap');
  let hmax=-Infinity;for(const h of g.MXH.h)hmax=Math.max(hmax,h);check(g.MXT.jumpMax<2.7&&hmax<8,'lower MX ramps');
  out.moto={maxTerrainHeight:hmax,launchSpeed:g.car.userData.flight.vy};
  g.clearFlight(g.car);g.groundVehicle(g.car,0);g.keys.w=true;
  for(let i=0;i<120;i++){g.simTime+=1/120;g.drive(1/120)}g.keys.w=false;
  check(Number.isFinite(g.velocity)&&g.velocity>0,'moto drives');
  g.render();return out;
 });
 await page.screenshot({path:path.resolve(__dirname,'../moto-preview.png')});
 // Actual race input drives the drift model, effects and HUD together.
 const driveDrift=()=>{
  const g=__g;g.endRace();g.hideField();g.openRaceHub();g.race.trackId='oval';g.race.selectedBet=0;g.racePick('carro');g.race.t=1;
  for(const r of g.race.field){r.g.position.set(450,0,1800);r.done=true}
  g.keys.w=true;g.step(80);g.keys.a=true;g.step(12);g.keys[' ']=true;g.step(19);g.keys[' ']=false;g.step(12);
  const result={slip:g.car.userData.fx.slipAngle,drift:g.car.userData.fx.drift,visible:!document.querySelector('#drifthud').hidden,title:document.querySelector('#driftTitle').textContent};g.keysClear();return result;
 };const drift=await page.evaluate(driveDrift);assert(drift.drift>.5);assert(Math.abs(drift.slip)>.12);assert(drift.visible);console.log('Drift in browser:',drift);
 await page.screenshot({path:path.resolve(__dirname,'../drift-preview.png')});
 assert.deepEqual(errors,[]);console.log(JSON.stringify(results,null,2));
 // Touch menu remains reachable in a small landscape viewport.
 await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href+'?debug=1&manual=1&touch=1&low=1');
 await page.setViewportSize({width:896,height:414});await page.waitForFunction(()=>!!window.__g);
 await page.evaluate(()=>__g.start());assert(await page.locator('#racemenu').isVisible());
 await page.selectOption('#rmBet','0');await page.click('[data-mode="moto"]');
 assert(await page.evaluate(()=>__g.race.on&&__g.race.field.length===5));
 const touchDrift=await page.evaluate(driveDrift);assert(touchDrift.visible);assert.equal(await page.locator('#touch [data-key=" "] .car').textContent(),'DRIFT');
 const hud=await page.locator('#drifthud').boundingBox();assert(hud.x>=0&&hud.y>=0&&hud.x+hud.width<=896&&hud.y+hud.height<=414,'touch drift HUD fits viewport');
 await page.screenshot({path:path.resolve(__dirname,'../drift-touch-preview.png')});
 assert.deepEqual(errors,[]);console.log('PASS: 5 classes, wallet, contacts, recovery, jumps, touch menu');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
