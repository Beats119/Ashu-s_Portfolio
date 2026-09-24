import {Canvas,useThree} from '@react-three/fiber'
import {Suspense,useEffect,useMemo,useRef,useState} from 'react'
import * as THREE from 'three'
import useInfiniteCamera from './hooks/useInfiniteCamera'
import {SceneProvider,useScene} from './context/SceneContext'
import './styles.css'

const rooms=[
{id:'systems',label:'SYSTEMS',sub:'RAG / AGENTS',title:'I BUILD THE SYSTEMS AROUND THE MODEL.',copy:'Applied AI engineering across retrieval, tool calling, multi-agent systems, speech and production workflows.',items:['RAG','FAISS','QDRANT','WEAVIATE','GOOGLE ADK','MCP']},
{id:'speech',label:'VOICE',sub:'TTS / SIGNAL',title:'LANGUAGE IS SIGNAL.',copy:'Multilingual TTS, code-switching, custom voice enhancements and speech-to-speech accent translation.',items:['MULTILINGUAL TTS','CODE-SWITCHING','VOICE ENHANCEMENT','ENCODER','MAPPER','VOCODER']},
{id:'generate',label:'GEN',sub:'DIFFUSION / CONTROL',title:'FROM NOISE TO CONTROL.',copy:'Generative-vision research with Stable Diffusion, LoRA, ControlNet, IP-Adapter and inpainting.',items:['STABLE DIFFUSION','LORA','CONTROLNET','IP-ADAPTER','INPAINTING']},
{id:'research',label:'ARCHIVE',sub:'PUBLICATIONS',title:'THE PAPER TRAIL.',copy:'IEEE research and a corresponding-author ICICS 2025 paper connecting applied engineering with research.',items:['IEEE','ICICS 2025','YOLO','ICIP']},
{id:'work',label:'FIELD LOG',sub:'SAMESPACE / INDIAAI',title:'WORK IN THE WILD.',copy:'Production and research roles at Samespace, HyperVerge Nexus and under the IndiaAI Mission.',items:['SDE-1 AI/ML','RESEARCH FELLOW','PRODUCTION AI','RESEARCH']},
{id:'about',label:'ORIGIN',sub:'SRM → IIT PATNA',title:'THE NEXT NODE.',copy:'B.Tech in CSE (AI & ML), CGPA 9.04/10.00. Now pursuing an M.Tech in Artificial Intelligence at IIT Patna.',items:['SRM IST','9.04 / 10.00','IIT PATNA','ARTIFICIAL INTELLIGENCE']},
{id:'contact',label:'SHIP',sub:'CONTACT / RESUME',title:'LET’S BUILD.',copy:'Have an interesting AI problem? I like the part after the demo.',items:['EMAIL','GITHUB','RESUME']}
]

function CameraController(){useInfiniteCamera({startZ:10,endZ:-92,smoothing:.07});return null}

function AppShell(){
 const [entered,setEntered]=useState(false)
 const [introOpen,setIntroOpen]=useState(true)
 return <SceneProvider>
   <div className="site">
    <div className="webgl"><Canvas camera={{position:[0,1.55,10],fov:58,near:.1,far:180}} gl={{antialias:true,powerPreference:'high-performance'}} dpr={[1,1.75]}>
      <color attach="background" args={['#e9e3d6']}/>
      <fog attach="fog" args={['#e9e3d6',13,58]}/>
      <hemisphereLight intensity={1.7} color="#fffaf0" groundColor="#a09a8e"/>
      <directionalLight position={[-5,8,8]} intensity={2.5} color="#fff6df"/>
      <Suspense fallback={null}><Corridor onEnter={()=>setEntered(true)}/><CameraController/></Suspense>
    </Canvas></div>
    <Hud entered={entered}/>
    <Caption entered={entered}/>
    <Intro open={introOpen} onEnter={()=>{setIntroOpen(false);setEntered(true)}}/>
    <RoomUI/>
   </div>
 </SceneProvider>
}

function Intro({open,onEnter}){
 return <div className={'intro '+(open?'':'intro-hidden')}>
   <div className="paper">
    <div className="tape"></div><div className="field">FIELD NOTE / 001</div>
    <div className="paper-name">ASHISH<br/>MAURYA</div>
    <div className="paper-rule"></div>
    <p>I build AI systems around the model — retrieval, tools, agents, speech, generation and evaluation.</p>
    <button onClick={onEnter}>OPEN THE NOTEBOOK <span>↗</span></button>
    <div className="scribble">applied ai / research / systems</div>
   </div>
 </div>
}

function Hud({entered}){
 const {currentRoom}=useScene()
 return <header className="hud">
   <div className="mark">AM<span>.</span></div>
   <div className="hud-center">{currentRoom?String(rooms.findIndex(r=>r.id===currentRoom)+1).padStart(2,'0')+' / '+currentRoom.toUpperCase():'SCROLL / WALK'}</div>
   <div className="hud-right"><button onClick={()=>document.querySelector('#map')?.classList.toggle('map-show')}>MAP</button><a href="resume.html">CV</a></div>
 </header>
}

function Caption(){
 const {currentRoom}=useScene()
 const room=currentRoom?rooms.find(r=>r.id===currentRoom):null
 return <div className="caption">
  <div className="eyebrow">{room?room.sub:'ASHISH MAURYA / APPLIED AI ENGINEER'}</div>
  <h1 dangerouslySetInnerHTML={{__html:room?room.title:'BEYOND<br/>THE MODEL.'}}/>
  <p>{room?.copy||'A walkable, hand-drawn world through LLMs, RAG, speech AI, agentic systems, generative vision and research.'}</p>
  <div className="caption-foot">{room?room.items.join(' · '):'LLMs · RAG · SPEECH AI · AGENTIC SYSTEMS'}</div>
 </div>
}

function Corridor({onEnter}){
 const {currentRoom,enterRoom}=useScene()
 const doors=useMemo(()=>rooms.map((r,i)=>({room:r,z:3-i*16,side:i%2===0?-1:1})),[])
 const decor=useMemo(()=>Array.from({length:34},(_,i)=>({z:8-i*3.4,side:i%2?-1:1,rot:(i%5-2)*.08,scale:.75+(i%4)*.12})),[])
 return <>
  <group>
   <CorridorMesh/>
   {decor.map((d,i)=><SketchNote key={i} {...d}/>)}
   {doors.map(d=><Door key={d.room.id} {...d} active={currentRoom===d.room.id} onOpen={()=>enterRoom(d.room.id)} onEnter={onEnter}/>)}
   <Avatar/>
  </group>
  {currentRoom&&<RoomEnvironment room={rooms.find(r=>r.id===currentRoom)}/>}
 </>
}

function CorridorMesh(){
 return <group>
  <mesh position={[0,-.05,-43]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[7.8,110]}/><meshStandardMaterial color="#e6e0d3" roughness={1}/></mesh>
  <mesh position={[0,6.2,-43]} rotation={[Math.PI/2,0,0]}><planeGeometry args={[7.8,110]}/><meshStandardMaterial color="#eee9df" roughness={1}/></mesh>
  <mesh position={[-3.9,3.1,-43]} rotation={[0,Math.PI/2,0]}><planeGeometry args={[110,6.3]}/><meshStandardMaterial color="#ddd8cc" roughness={1}/></mesh>
  <mesh position={[3.9,3.1,-43]} rotation={[0,-Math.PI/2,0]}><planeGeometry args={[110,6.3]}/><meshStandardMaterial color="#ddd8cc" roughness={1}/></mesh>
  <gridHelper args={[7.8,26,'#bbb5a8','#d6d0c5']} position={[0,.005,-43]} rotation={[0,0,0]}/>
  <DoodleLine from={[-3.86,0.2,9]} to={[-3.86,5.7,-107]}/><DoodleLine from={[3.86,0.2,9]} to={[3.86,5.7,-107]}/>
 </group>
}

function DoodleLine({from,to}){const pts=[new THREE.Vector3(...from),new THREE.Vector3((from[0]+to[0])/2+.05,2.4,(from[2]+to[2])/2),new THREE.Vector3(...to)];return <line><bufferGeometry attach="geometry" onUpdate={g=>g.setFromPoints(pts)}/><lineBasicMaterial color="#6d695f" transparent opacity={.55}/></line>}

function SketchNote({z,side,rot,scale}){
 return <mesh position={[side*(3.45+(Math.abs(z)%2)*.08),2.4+(Math.sin(z)*.4),z]} rotation={[0,side>0?-Math.PI/2:Math.PI/2,rot]} scale={scale}><planeGeometry args={[.78,1.05]}/><meshStandardMaterial color="#f2eee4" roughness={1}/></mesh>
}

function Door({room,z,side,onOpen,active}){
 const group=useRef()
 const [hover,setHover]=useState(false)
 const x=side*3.48
 return <group ref={group} position={[x,0,z]} rotation={[0,side>0?-Math.PI/2:Math.PI/2]}>
   <mesh position={[0,3,0]}><planeGeometry args={[2.5,5.7]}/><meshStandardMaterial color={hover?'#f5f0e5':'#ede8dc'} roughness={1}/></mesh>
   <mesh position={[0,5.75,.02]}><boxGeometry args={[2.75,.18,.2]}/><meshStandardMaterial color="#45423a"/></mesh>
   <mesh position={[-1.2,2.9,.02]}><boxGeometry args={[.18,5.7,.2]}/><meshStandardMaterial color="#45423a"/></mesh>
   <mesh position={[1.2,2.9,.02]}><boxGeometry args={[.18,5.7,.2]}/><meshStandardMaterial color="#45423a"/></mesh>
   <mesh position={[0,4.85,.03]}><planeGeometry args={[1.95,.62]}/><meshStandardMaterial color="#d8d1c2"/></mesh>
   <DoorText room={room}/>
   <mesh position={[-.35,2.25,.07]} onPointerEnter={()=>setHover(true)} onPointerLeave={()=>setHover(false)} onClick={onOpen}>
     <sphereGeometry args={[.11,14,14]}/><meshStandardMaterial color="#d8674e" emissive="#32140d" emissiveIntensity={1}/><primitive object={new THREE.MeshBasicMaterial()} attach="material"/>
   </mesh>
 </group>
}

function DoorText({room}){
 return <group position={[0,5.0,.12]}><mesh><planeGeometry args={[1.9,.58]}/><meshBasicMaterial color="#ece6d8"/></mesh>
 </group>
}

function Avatar(){
 return <group position={[-.82,.3,7.2]} rotation={[0,.07,0]}>
   <mesh position={[0,1.15,0]}><capsuleGeometry args={[.32,.62,8,14]}/><meshStandardMaterial color="#20201d" roughness={1}/></mesh>
   <mesh position={[0,1.98,0]}><sphereGeometry args={[.34,18,14]}/><meshStandardMaterial color="#c7a68e" roughness={1}/></mesh>
   <mesh position={[0,2.12,0]}><sphereGeometry args={[.36,18,10,0,Math.PI*2,0,Math.PI*.5]}/><meshStandardMaterial color="#282721" roughness={1}/></mesh>
   <mesh position={[.38,1.18,.26]} rotation={[-.3,0,0]}><boxGeometry args={[.58,.06,.4]}/><meshStandardMaterial color="#eee9df" roughness={1}/></mesh>
   <mesh position={[-.2,.3,0]}><boxGeometry args={[.18,.72,.2]}/><meshStandardMaterial color="#25241f"/></mesh><mesh position={[.2,.3,0]}><boxGeometry args={[.18,.72,.2]}/><meshStandardMaterial color="#25241f"/></mesh>
 </group>
}

function RoomEnvironment({room}){
 return <group position={[0,0,room.id==='contact'?-3:-2]}>
   <mesh position={[0,2.9,-10]}><planeGeometry args={[26,12]}/><meshStandardMaterial color="#efe9db" roughness={1}/></mesh>
   {Array.from({length:8},(_,i)=><mesh key={i} position={[(i-3.5)*2.5,2+(i%3)*1.1,-9.6]} rotation={[0,(i%2?-1:1)*.08,(i%5-2)*.04]}><planeGeometry args={[1.75,1.05]}/><meshStandardMaterial color="#f6f1e7"/></mesh>)}
 </group>
}

function RoomUI(){
 const {currentRoom,exitRoom}=useScene()
 const room=currentRoom&&rooms.find(r=>r.id===currentRoom)
 useEffect(()=>{document.body.classList.toggle('in-room',!!currentRoom);return()=>document.body.classList.remove('in-room')},[currentRoom])
 return <div className="room-ui">{currentRoom&&<button className="back" onClick={exitRoom}>← BACK TO CORRIDOR</button>}</div>
}

export default function App(){return <AppShell/>}
