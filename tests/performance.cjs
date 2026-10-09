// Diagnostic benchmark, not an FPS guarantee. Requires Playwright and Edge.
// node tests/performance.cjs [index.html] [report.json]
const fs=require('node:fs'),path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
 try{const all=[];
 for(const mode of ['city','carro','moto']){
  const page=await browser.newPage({viewport:{width:1280,height:720}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{let seed=145;Math.random=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296)});
  const file=path.resolve(process.argv[2]||path.join(__dirname,'../index.html'));
  await page.goto(pathToFileURL(file).href+'?debug=1&manual=1&low=1');await page.waitForFunction(()=>window.__g);
  await page.evaluate(mode=>{const g=__g;g.start();if(mode==='city'){document.querySelector('#rmClose').click();g.car.position.set(4,0,30);g.angle=Math.PI;g.car.rotation.y=Math.PI}else{g.race.selectedBet=0;g.racePick(mode)}for(let i=0;i<120;i++)g.update(1/60)},mode);
  const stats=await page.evaluate(()=>{const g=__g,ms=[];for(let i=0;i<600;i++){const t=performance.now();g.update(1/60);ms.push(performance.now()-t)}ms.sort((a,b)=>a-b);return{meanMs:ms.reduce((a,b)=>a+b,0)/ms.length,medianMs:ms[300],p95Ms:ms[570],simulatedSeconds:10,cacheEntries:g.staticQueryCache?.size??null}});
  if(errors.length)throw Error(errors.join('\n'));
  all.push({mode,...stats});console.log(JSON.stringify(all.at(-1)));await page.close();
 }
 if(process.argv[3])fs.writeFileSync(process.argv[3],JSON.stringify(all,null,2));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
