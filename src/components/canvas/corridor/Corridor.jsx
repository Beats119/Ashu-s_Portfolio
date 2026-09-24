import {Float,Text} from '@react-three/drei'
import {useMemo} from 'react'
import * as THREE from 'three'
import {ROOMS} from '../../../data/content'
import DoorSection from './DoorSection'
import {paperTexture} from '../SketchMaterial'
import {useScene} from '../../../context/SceneContext'
function Scribble({x,y,z,rx=0}){return <mesh position={[x,y,z]} rotation={[0,rx,0]}><planeGeometry args={[.9,.62]}/><meshBasicMaterial map={paperTexture()} transparent/></mesh>}
export default function Corridor(){
 const {enterRoom}=useScene()
 const notes=useMemo(()=>Array.from({length:26},(_,i)=>({x:(i%2?-1:1)*(3.2+Math.random()*.45),y:1.5+Math.random()*3,z:12-i*4.8,r:((i%7)-3)*.03})),[])
 return <group>
  <mesh position={[0,-.08,-49]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[7.6,120]}/><meshBasicMaterial color="#e5dfd2" map={paperTexture()}/></mesh>
  <mesh position={[0,6,-49]} rotation={[Math.PI/2,0,0]}><planeGeometry args={[7.6,120]}/><meshBasicMaterial color="#f0ece3" map={paperTexture()}/></mesh>
  <mesh position={[-3.8,3,-49]} rotation={[0,Math.PI/2,0]}><planeGeometry args={[120,6]}/><meshBasicMaterial color="#ded8cb" map={paperTexture()}/></mesh>
  <mesh position={[3.8,3,-49]} rotation={[0,-Math.PI/2,0]}><planeGeometry args={[120,6]}/><meshBasicMaterial color="#ded8cb" map={paperTexture()}/></mesh>
  <gridHelper args={[7.6,40,'#beb7aa','#d5cfc3']} position={[0,.01,-49]}/>
  {ROOMS.map((room,i)=><DoorSection key={room.id} room={room} onOpen={()=>enterRoom(room.id)}/>)}
  {notes.map((n,i)=><Scribble key={i} {...n}/>)}
  <Welcome/>
 </group>
}
function Welcome(){
 return <group position={[0,-.28,7.4]}>
  <Float speed={1.5} rotationIntensity={.08} floatIntensity={.1}>
   <Text fontSize={1.35} color="#27261f" anchorX="center" anchorY="middle" maxWidth={4.8} textAlign="center">ASHISH</Text>
   <Text position={[0,-.85,0]} fontSize={.4} color="#777269" anchorX="center" anchorY="middle">APPLIED AI ENGINEER</Text>
  </Float>
  <Avatar/>
 </group>
}
function Avatar(){
 return <group position={[-.92,0,0]}>
  <mesh position={[0,1.05,0]}><capsuleGeometry args={[.28,.62,6,12]}/><meshBasicMaterial color="#282720"/></mesh>
  <mesh position={[0,1.83,0]}><sphereGeometry args={[.32,16,12]}/><meshBasicMaterial color="#c7a58d"/></mesh>
  <mesh position={[0,2,0]}><sphereGeometry args={[.34,16,10,0,Math.PI*2,0,Math.PI*.52]}/><meshBasicMaterial color="#24231f"/></mesh>
  <mesh position={[-.2,.23,0]}><boxGeometry args={[.17,.68,.18]}/><meshBasicMaterial color="#24231f"/></mesh>
  <mesh position={[.2,.23,0]}><boxGeometry args={[.17,.68,.18]}/><meshBasicMaterial color="#24231f"/></mesh>
  <mesh position={[.34,1.1,.22]} rotation={[-.32,0,0]}><boxGeometry args={[.54,.05,.36]}/><meshBasicMaterial color="#ece7dc"/></mesh>
 </group>
}