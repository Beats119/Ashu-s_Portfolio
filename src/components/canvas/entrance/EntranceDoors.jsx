import {Text} from '@react-three/drei'
import {useRef,useState} from 'react'
import {useThree} from '@react-three/fiber'
import gsap from 'gsap'
import {useScene} from '../../../context/SceneContext'
export default function EntranceDoors(){
 const {camera}=useThree();const {markEntered}=useScene();const l=useRef();const r=useRef();const [hover,setHover]=useState(false)
 const open=()=>{if(!l.current||!r.current)return;gsap.timeline({onComplete:markEntered}).to(l.current.rotation,{y:-Math.PI*.56,duration:.9,ease:'power2.out'}).to(r.current.rotation,{y:Math.PI*.56,duration:.9,ease:'power2.out'},0).to(camera.position,{z:4.8,y:1.5,duration:1.6,ease:'power3.inOut'},.1)}
 return <group position={[0,0,7]}>
  <mesh position={[0,3.2,-.12]}><boxGeometry args={[5.8,6.3,.3]}/><meshBasicMaterial color="#d8d2c5"/></mesh>
  <mesh position={[0,6.25,.05]}><boxGeometry args={[6,.25,.35]}/><meshBasicMaterial color="#4a473e"/></mesh>
  <mesh ref={l} position={[-1.25,3,.18]} onClick={open} onPointerOver={()=>setHover(true)} onPointerOut={()=>setHover(false)}><boxGeometry args={[2.35,5.7,.14]}/><meshBasicMaterial color={hover?'#f7f2e8':'#ece6d9'}/></mesh>
  <mesh ref={r} position={[1.25,3,.18]} onClick={open} onPointerOver={()=>setHover(true)} onPointerOut={()=>setHover(false)}><boxGeometry args={[2.35,5.7,.14]}/><meshBasicMaterial color={hover?'#f7f2e8':'#ece6d9'}/></mesh>
  <Text position={[0,4.52,.28]} fontSize={.48} color="#2c2a24" anchorX="center" anchorY="middle">ASHISH MAURYA</Text>
  <Text position={[0,4.0,.28]} fontSize={.16} color="#777268" anchorX="center" anchorY="middle">APPLIED AI ENGINEER</Text>
  <Text position={[0,2.05,.3]} fontSize={.15} color={hover?'#d8674e':'#6f6a60'} anchorX="center" anchorY="middle">CLICK TO ENTER</Text>
  <mesh position={[-3.2,3,-.05]}><boxGeometry args={[.2,6.2,.22]}/><meshBasicMaterial color="#4a473e"/></mesh>
  <mesh position={[3.2,3,-.05]}><boxGeometry args={[.2,6.2,.22]}/><meshBasicMaterial color="#4a473e"/></mesh>
 </group>
}