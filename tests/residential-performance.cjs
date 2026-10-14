const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const {pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});try{
 for(const file of process.argv.slice(2).length?process.argv.slice(2):[path.join(__dirname,'../index.html')])for(const low of [false,true,'performance']){
 const page=await browser.newPage({viewport:{width:1280,height:720}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{let seed=145;Math.random=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296)});
 await page.goto(pathToFileURL(path.resolve(file)).href+'?debug=1&manual=1'+(low==='performance'?'&performance=1':low?'&low=1':''));await page.waitForFunction(()=>window.__g);
 const result=await page.evaluate(()=>{const g=__g;g.start();document.querySelector('#rmClose').click();for(let i=0;i<60;i++)g.update(1/60);g.cam.position.set(0,24,100);g.cam.lookAt(0,0,-50);g.renderer.shadowMap.needsUpdate=true;g.render();
 const geometries=new Set();let triangles=0;g.scene.traverse(o=>{if(o.isMesh&&!geometries.has(o.geometry)){geometries.add(o.geometry);triangles+=(o.geometry.index?.count||o.geometry.attributes.position.count)/3}});
 if(g.BLD){for(const b of g.BLD){if(b.h>6)throw Error('Non-residential building');if(!g.physicalObstacles.some(o=>o.x===b.x&&o.z===b.z&&o.w===b.w/2&&o.d===b.d/2))throw Error('House collision footprint mismatch')}if(!g.BLD.length)throw Error('No houses');}
 return{houses:g.BLD?.length,uniqueTriangles:Math.round(triangles),renderTriangles:g.renderer.info.render.triangles,drawCalls:g.renderer.info.render.calls,pixelRatio:g.renderer.getPixelRatio(),shadow:g.SHADOW_RES};});assert.deepEqual(errors,[]);console.log(JSON.stringify({file:path.basename(file),low,...result}));
 if(process.env.HOUSE_PREVIEW&&!low)await page.screenshot({path:process.env.HOUSE_PREVIEW});await page.close();
 }
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
