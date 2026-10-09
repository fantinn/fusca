const assert=require('node:assert/strict'),path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
 try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 await page.goto(pathToFileURL(path.resolve(process.argv[2]||path.join(__dirname,'../index.html'))).href+'?debug=1&manual=1&low=1');
 await page.waitForFunction(()=>window.__g);
 const result=await page.evaluate(()=>{
  const g=__g,check=(v,m)=>{if(!v)throw Error(m)};let seed=219;const rand=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);
  g.start();g.race.selectedBet=0;g.racePick('carro');
  // Independent exhaustive reference: no cell lookup or distance rejection.
  function reference(v){const a=g.rectFor(v),hits=[];for(const b of g.physicalObstacles){if(Math.abs(a.x-b.x)>(b.ex??b.w)+3||Math.abs(a.z-b.z)>(b.ez??b.d)+3)continue;if(g.obbContact(a,b))hits.push(b)}
   for(const o of g.vehicleList()){if(o===v||Math.abs(v.position.y-o.position.y)>2.8)continue;if(g.obbContact(a,g.rectFor(o)))hits.push(o)}return hits;
  }
  for(let i=0;i<700;i++){
   const track=i%2?g.TRK:g.MXT,q=g.trkPose(rand()*track.L,(rand()-.5)*35,track);
   if(i%5===0){q.x=-230+rand()*760;q.z=-1100+rand()*2300}
   g.car.position.set(q.x,0,q.z);g.car.rotation.set(0,rand()*Math.PI*2,0);
   if(i%7===0){const R=g.race.field[0].g;R.position.copy(g.car.position);R.position.x+=(rand()-.5)*7;R.rotation.y=rand()*Math.PI*2}
   const expected=reference(g.car),actual=g.carContacts(g.car).map(h=>h.other||h.r);
   check(actual.length===expected.length&&actual.every(h=>expected.includes(h)),'collision mismatch at sample '+i);
  }
  const barrier={x:30,z:365,w:1,d:1};g.car.position.set(30,0,365);g.car.rotation.y=0;
  g.localStatics(g.car.position,3);g.physicalObstacles.push(barrier);
  check(g.carContacts(g.car).some(h=>h.r===barrier),'cache invalidation on insertion');g.physicalObstacles.pop();
  check(!g.carContacts(g.car).some(h=>h.r===barrier),'cache invalidation on removal');
  for(let i=0;i<1100;i++)g.localStatics({x:i*16,z:31},3);check(g.staticQueryCache.size<=512,'bounded collision cache');
  // Hidden render hierarchies must still support world-space physics queries and refresh on reappearance.
  const root=new g.T.Group(),child=new g.T.Object3D();child.position.set(1,0,0);root.add(child);g.scene.add(root);g.sleepHiddenMatrices(root);root.visible=false;root.position.set(10,0,0);
  check(child.getWorldPosition(new g.T.Vector3()).x===11,'hidden world-space query');root.position.x=20;root.visible=true;root.updateMatrixWorld(true);check(child.matrixWorld.elements[12]===21,'visible matrix wake');g.scene.remove(root);
  // Explicit zero-time placement must bypass distant suspension throttling.
  const v=g.traffic.find(t=>t.g!==g.car&&!t.g.userData.aiDriver).g;g.clearFlight(v);v.position.set(400,100,-500);v.userData.groundBudget=.09;g.groundVehicle(v,0);
  check(v.userData.groundBudget===0&&Math.abs(v.position.y-100)>1,'immediate ground reset');
  g.update(1/60);g.render();return{collisionSamples:700,cacheEntries:g.staticQueryCache.size};
 });assert.deepEqual(errors,[]);console.log('PASS',result);
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
