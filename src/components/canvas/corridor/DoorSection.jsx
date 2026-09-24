import {Text} from '@react-three/drei'
import {useMemo,useRef,useState} from 'react'
import {useThree} from '@react-three/fiber'
import gsap from 'gsap'
import {useScene} from '../../../context/SceneContext'
import {sketchTexture} from '../SketchMaterial'

export default function DoorSection({room}){
 const {camera}=useThree();const {enterRoom}=useScene();const left=useRef();const right=useRef();const frame=useRef();const [hover,setHover]=useState(false);const tex=useMemo(()=>sketchTexture(room.label),[room.label])
 const side=room.side==='left'?-1:1;const y=2.72
 const open=()=>{
  if(!camera||!left.current||!right.current)return
  document.body.classList.add('entering-room')
  const z=room.z-3.2;const x=side*.45
  gsap.timeline({onComplete:()=>{document.body.classList.remove('entering-room');enterRoom(room.id)}})
   .to(left.current.rotation,{y:-Math.PI*.55,duration:.55,ease:'power2.out'},0)
   .to(right.current.rotation,{y:Math.PI*.55,duration:.55,ease:'power2.out'},0)
   .to(camera.position,{x,z,y:1.45,duration:1.1,ease:'power3.inOut'},.12)
   .to(camera.rotation,{x:0,y:0,z:0,duration:.9,ease:'power2.inOut'},.18)
 }
 return <group position={[side*3.44,0,room.z]} rotation={[0,side>0?-Math.PI/2:Math.PI/2]}
  onPointerOver={e=>{e.stopPropagation();setHover(true);document.body.classList.add('door-hover')}}
  onPointerOut={()=>{setHover(false);document.body.classList.remove('door-hover')}}
  onClick={e=>{e.stopPropagation();open()}}>
   <mesh ref={frame} position={[0,2.95,0]}><boxGeometry args={[2.65,5.9,.16]}/><meshBasicMaterial color="#4f4b42"/></mesh>
   <mesh ref={left} position={[-.62,y,.09]}><planeGeometry args={[1.16,4.85]}/><meshBasicMaterial map={tex}/></mesh>
   <mesh ref={right} position={[.62,y,.1]}><planeGeometry args={[1.16,4.85]}/><meshBasicMaterial map={tex}/></mesh>
   <Text position={[0,4.78,.19]} fontSize={.22} color="#27251f" anchorX="center" anchorY="middle" maxWidth={2.2} textAlign="center">{room.label}</Text>
   <Text position={[0,4.42,.19]} fontSize={.1} color="#756f63" anchorX="center" anchorY="middle" maxWidth={2.1} textAlign="center">{room.short}</Text>
   <mesh position={[side>0?-.15:.15,2.35,.2]}><sphereGeometry args={[.075,12,12]}/><meshBasicMaterial color={hover?'#d8674e':'#6c9c94'}/></mesh>
   <mesh position={[0,.25,.08]}><boxGeometry args={[2.2,.1,.16]}/><meshBasicMaterial color="#b4aea1"/></mesh>
 </group>
}