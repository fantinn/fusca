const assert=require('node:assert/strict'),path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});try{
 const page=await browser.newPage({viewport:{width:1280,height:800}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href+'?debug=1&manual=1');await page.waitForFunction(()=>window.__g,{},{timeout:90000});
 const result=await page.evaluate(()=>{const g=__g,check=(v,m)=>{if(!v)throw Error(m)};g.start();
 check(document.querySelector('[data-mode=pistao]'),'Copa Pistão visible');check(!document.querySelector('#buyMcqueen').disabled,'free McQueen unlocked');
 g.race.selectedBet=0;const n=g.traffic.length;check(g.buyMcqueen()&&g.cash===300,'free unlock preserves wallet');const car=g.car;
 check(car===g.ownedMcqueen&&car.userData.mcqueen&&car.userData.raceNumber===95,'equipped #95');
 check(g.buyMcqueen()&&g.cash===300&&g.traffic.length===n+1,'no duplicate charge or car');
 g.racePick('kart');check(g.car!==car,'category swap');g.endRace();g.hideField();g.openRaceHub();g.race.selectedBet=0;g.racePick('pistao');check(g.car===car&&g.car.userData.raceNumber===95,'owned car returns to Copa Pistão');
 check(g.race.total===34&&g.race.field.length===33,'34 car grid');check(!g.buyMcqueen(),'no purchase during race');const remote=g.netVehicle(g.netKind(car),'df2027');check(remote.userData.mcqueen&&remote.userData.raceNumber===95,'online appearance');
 g.step(1);const p=car.position,a=car.rotation.y;g.cam.position.set(p.x+Math.sin(a)*7+Math.cos(a)*5,p.y+3,p.z+Math.cos(a)*7-Math.sin(a)*5);g.cam.lookAt(p.x,p.y+.8,p.z);g.render();
 return{cash:g.cash,model:car.userData.model,number:car.userData.raceNumber,grid:g.race.total};});
 await page.screenshot({path:path.resolve(__dirname,'../mcqueen-preview.png')});assert.deepEqual(errors,[]);console.log('PASS',result);
 }finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
