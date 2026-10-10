const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(require('node:path').resolve(__dirname,'../index.html'),'utf8');
const physics=source.slice(source.indexOf('const CAR={'),source.indexOf('// ===== FIM FÍSICA DE DIREÇÃO ====='));
function simulation({speed=26,mode='carro',racing=true,offroad=false,hz=60}={}){
 const clamp=(x,a,b)=>Math.min(b,Math.max(a,x));
 const C={Math,Number,T:{MathUtils:{clamp,lerp:(a,b,t)=>a+(b-a)*t,smoothstep:(x,a,b)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t)}}},
 car:{position:{x:0,z:500},rotation:{y:0},userData:{}},race:{on:racing,t:1,mode},RT:{dirt:false},keys:{},velocity:speed,angle:0,steer:0,nitro:100,simTime:1,distance:0,heading:0,
 TRK:{ph:{}},circuitRoad:()=>!offroad,mxIn:()=>false,onMountainRoad:()=>false,roads:[],ROADX2:[],surfaceGradient:()=>({x:0,z:0}),moveCar(dt){C.car.position.x+=C.car.userData.vel.x*dt;C.car.position.z+=C.car.userData.vel.z*dt}};
 vm.createContext(C);vm.runInContext(physics+'\nthis.stepPhysics=driveStep;this.driver=drv;',C);
 const history=[];
 function run(seconds,keys){C.keys=keys;for(let frame=0;frame<Math.round(seconds*hz);frame++){const n=Math.ceil(120/hz),dt=1/hz/n;for(let i=0;i<n;i++){C.simTime+=dt;C.stepPhysics(dt)}const u=C.car.userData;history.push({time:C.simTime,speed:Math.hypot(u.vel.x,u.vel.z),slip:u.fx.slipAngle,yaw:u.yawRate,angle:C.angle,drift:u.fx.drift||0});assert(Number.isFinite(C.angle+C.velocity+u.vel.x+u.vel.z),'finite physics')}}
 return {C,history,run,last:()=>history.at(-1)};
}
function maneuver(options={},side='a'){
 const s=simulation(options);s.run(.3,{w:true});s.run(.25,{w:true,[side]:true});s.run(.32,{w:true,[side]:true,' ':true});const entry=s.last();s.run(1.1,{w:true,[side]:true});const held=s.last();s.run(.35,{w:true,[side==='a'?'d':'a']:true});s.run(1.4,{w:true});return {entry,held,exit:s.last(),peak:Math.max(...s.history.map(h=>Math.abs(h.slip))),s};
}
if(require.main===module){
 const left=maneuver(),right=maneuver({},'d');
 console.log(JSON.stringify({entryDegrees:Math.abs(left.entry.slip)*180/Math.PI,sustainedDegrees:Math.abs(left.held.slip)*180/Math.PI,peakDegrees:left.peak*180/Math.PI,exitDegrees:Math.abs(left.exit.slip)*180/Math.PI,sustainedKmh:left.held.speed*3.6},null,2));
 if(process.argv.includes('--check')){
  assert(Math.abs(left.entry.slip)>.12,'handbrake initiates a drift');
  assert(Math.abs(left.held.slip)>.16,'throttle sustains drift after releasing handbrake');
  assert(left.held.speed>12,'drift retains useful speed');assert(left.peak<1,'controlled angle below spin');
  assert(Math.abs(left.exit.slip)<.1,'counter-steer and release recover grip');
  assert(Math.abs(left.held.slip+right.held.slip)<.001,'left/right symmetry');
  const low=simulation({speed:3});low.run(.5,{a:true,' ':true});assert(low.last().drift<.1,'no drift at parking speed');
  const coast=simulation();coast.run(.3,{w:true});coast.run(.5,{a:true,' ':true});coast.run(2,{});assert(Math.abs(coast.last().slip)<.1,'lifting exits slide');
  const brake=simulation();brake.run(.5,{w:true,a:true,' ':true});brake.run(.5,{s:true});assert(brake.last().speed<5&&brake.last().drift<.1,'braking overrides drift');
  const normal=simulation();normal.run(3,{w:true});assert(Math.abs(normal.last().slip)<.001&&Math.abs(normal.C.angle)<.001,'straight-line stability');
  for(const config of [{racing:false},{mode:'moto'},{mode:'kart'},{mode:'caminhao'},{offroad:true}])assert.equal(maneuver(config).held.drift,0,'drift assist restricted to asphalt car races');
  const collision=simulation();collision.run(.5,{w:true,a:true,' ':true});collision.C.car.userData.lastImpact={time:collision.C.simTime,speed:20};collision.C.car.userData.vel.x-=10;collision.run(.3,{w:true,a:true});assert(collision.last().drift<.1,'impact cancels drift assist');
  const boost=simulation({speed:45});boost.run(.35,{w:true,a:true,' ':true});boost.run(2,{w:true,a:true,Shift:true});assert(Math.max(...boost.history.map(h=>Math.abs(h.slip)))<.9,'turbo slide stays controllable');
  const reset=simulation();reset.run(.5,{w:true,a:true,' ':true});reset.C.angle=0;reset.C.velocity=0;reset.run(.1,{});assert(reset.last().drift<.01,'teleport clears drift');
  const a=maneuver({hz:30}),b=maneuver({hz:120});assert(Math.abs(a.exit.speed-b.exit.speed)<1,'frame-rate independent speed');assert(Math.abs(a.exit.angle-b.exit.angle)<.1,'frame-rate independent heading');
  console.log('PASS: initiation, sustained drift, counter-steer, lift, brakes, low speed, symmetry and timestep stability');
 }
}
module.exports={simulation,maneuver};
