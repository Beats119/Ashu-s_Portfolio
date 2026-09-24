import {Text} from '@react-three/drei'
import {useRef,useState} from 'react'
import {useFrame} from '@react-three/fiber'
import * as THREE from 'three'
import {sketchTexture} from '../SketchMaterial'
export default function DoorSection({room,onOpen}){
 const g=useRef();const [hover,setHover]=useState(false)
 useFrame((_,d)=>{if(g.current){const t=hover?1.04:1;g.current.scale.lerp(new THREE.Vector3(t,t,t),Math.min(1,d*8))}})
 const side=room.side==='left'?-1:1
 return <group ref={g} position={[side*3.44,0,room.z]} rotation={[0,side>0?-Math.PI/2:Math.PI/2]}
  onPointerOver={e=>{e.stopPropagation();setHover(true);document.body.classList.add('door-hover')}}
  onPointerOut={()=>{setHover(false);document.body.classList.remove('door-hover')}}
  onClick={e=>{e.stopPropagation();onOpen()}}>
   <mesh position={[0,3,0]}><boxGeometry args={[2.5,5.4,.12]}/><meshBasicMaterial map={sketchTexture(room.label)} transparent/></mesh>
   <mesh position={[0,5.8,.02]}><boxGeometry args={[2.75,.16,.18]}/><meshBasicMaterial color="#4b4941"/></mesh>
   <mesh position={[-1.2,2.9,.02]}><boxGeometry args={[.16,5.8,.18]}/><meshBasicMaterial color="#4b4941"/></mesh>
   <mesh position={[1.2,2.9,.02]}><boxGeometry args={[.16,5.8,.18]}/><meshBasicMaterial color="#4b4941"/></mesh>
   <mesh position={[side>.0?-.36:.36,2.22,.14]}><sphereGeometry args={[.1,14,14]}/><meshBasicMaterial color={hover?'#d8674e':'#5c9b92'} /></mesh>
   <Text position={[0,1.12,.13]} fontSize={.16} color="#35332d" anchorX="center" anchorY="middle" maxWidth={2.05} textAlign="center">{room.sub}</Text>
 </group>
}