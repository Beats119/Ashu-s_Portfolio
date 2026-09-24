import {Text} from '@react-three/drei'
import {useFrame,useThree} from '@react-three/fiber'
import {useRef} from 'react'
import * as THREE from 'three'
import {useScene} from '../context/SceneContext'

const DOOR_TEXT_OFFSET=0.11
export default function Corridor({onEnter}){
 const {camera}=useThree()
 const {currentRoom,enterRoom}=useScene()
 const scroll=useRef(0)
 useFrame((_,delta)=>{
   const max=Math.max(1,document.documentElement.scrollHeight-innerHeight)
   const target=(scrollY/max)*100
   scroll.current+=(target-scroll.current)*Math.min(1,delta*4)
 })
 const doors=[
  ['SEE','VISION / OCR','systems',3,-1],['RETRIEVE','RAG / SEARCH','systems',-13,1],['ACT','AGENTS / MCP','systems',-29,-1],
  ['SPEAK','TTS / SIGNAL','speech',-45,1],['GENERATE','DIFFUSION','generate',-61,-1],['VERIFY','EVAL / GUARDRAILS','systems',-77,1],
  ['RESEARCH','PAPERS / EVIDENCE','research',-93,-1],['FIELD LOG','SAMESPACE / INDIAAI','work',-109,1],['ORIGIN','SRM / IIT PATNA','about',-125,-1],['SHIP','CONTACT / RESUME','contact',-141,1]
 ]
 return <group>
  <mesh position={[0,-.2,-69]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[7.6,160]}/><meshBasicMaterial color="#e4dfd4"/></mesh>
  <mesh position={[0,5.9,-69]} rotation={[Math.PI/2,0,0]}><planeGeometry args={[7.6,160]}/><meshBasicMaterial color="#eee9df"/></mesh>
  <mesh position={[-3.8,2.85,-69]} rotation={[0,Math.PI/2,0]}><planeGeometry args={[160,6]}/><meshBasicMaterial color="#dbd6ca"/></mesh>
  <mesh position={[3.8,2.85,-69]} rotation={[0,-Math.PI/2,0]}><planeGeometry args={[160,6]}/><meshBasicMaterial color="#dbd6ca"/></mesh>
  {doors.map(([label,sub,id,z,side],i)=><Door key={i} label={label} sub={sub} roomId={id} z={z} side={side} active={currentRoom===id} onOpen={()=>{enterRoom(id);onEnter?.()}}/>)}
  <Avatar/>
 </group>
}
function Door({label,sub,z,side,onOpen}){
 const [hover,setHover]=[false,()=>{}]
 return <group position={[side*3.45,2.7,z]} rotation={[0,side>0?-Math.PI/2:Math.PI/2]}>
   <mesh><boxGeometry args={[2.6,5.5,.18]}/><meshBasicMaterial color={hover?'#faf5ea':'#eee8db'}/></mesh>
   <mesh position={[0,2.86,.12]}><boxGeometry args={[2.9,.18,.22]}/><meshBasicMaterial color="#4d493f"/></mesh>
   <Text position={[0,1.1,.12]} fontSize={.28} color="#2c2a25" anchorX="center" anchorY="middle" maxWidth={2.1} textAlign="center">{label}</Text>
   <Text position={[0,.72,.12]} fontSize={.1} color="#78736a" anchorX="center" anchorY="middle" maxWidth={2.2} textAlign="center">{sub}</Text>
   <mesh position={[side>0?-0.35:0.35,0,.18]} onClick={e=>{e.stopPropagation();onOpen()}} onPointerOver={e=>e.stopPropagation()}>
    <sphereGeometry args={[.1,12,12]}/><meshBasicMaterial color="#d8674e"/>
   </mesh>
 </group>
}
function Avatar(){
 const g=useRef()
 useFrame(({clock})=>{if(g.current)g.current.position.y=.25+Math.sin(clock.elapsedTime*1.7)*.035})
 return <group ref={g} position={[-.8,.25,6.8]}>
   <mesh position={[0,1.05,0]}><capsuleGeometry args={[.3,.62,6,12]}/><meshBasicMaterial color="#282722"/></mesh>
   <mesh position={[0,1.87,0]}><sphereGeometry args={[.33,16,12]}/><meshBasicMaterial color="#c5a48d"/></mesh>
   <mesh position={[0,2.02,0]}><sphereGeometry args={[.35,16,10,0,Math.PI*2,0,Math.PI*.5]}/><meshBasicMaterial color="#24231f"/></mesh>
   <mesh position={[-.21,.2,0]}><boxGeometry args={[.18,.65,.2]}/><meshBasicMaterial color="#24231f"/></mesh>
   <mesh position={[.21,.2,0]}><boxGeometry args={[.18,.65,.2]}/><meshBasicMaterial color="#24231f"/></mesh>
   <mesh position={[.36,1.05,.22]} rotation={[-.3,0,0]}><boxGeometry args={[.55,.05,.37]}/><meshBasicMaterial color="#eae5da"/></mesh>
 </group>
}