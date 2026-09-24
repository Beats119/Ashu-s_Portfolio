import {Text} from '@react-three/drei'
import {useRef,useState} from 'react'
import {useThree} from '@react-three/fiber'
import gsap from 'gsap'
import {useScene} from '../../../context/SceneContext'

export default function DoorSection({
  position,
  side='left',
  label,
  short,
  roomId
}){
  const {camera}=useThree()
  const {teleportTo}=useScene()
  const left=useRef(null)
  const right=useRef(null)
  const [hover,setHover]=useState(false)

  const open=()=>{
    if(!left.current||!right.current)return
    const targetX=side==='left'?0.65:-0.65
    const targetZ=position[2]+3.8

    gsap.timeline({
      onComplete:()=>teleportTo(roomId)
    })
    .to(left.current.rotation,{
      y:-Math.PI*.5,
      duration:.62,
      ease:'power2.inOut'
    })
    .to(right.current.rotation,{
      y:Math.PI*.5,
      duration:.62,
      ease:'power2.inOut'
    },0)
    .to(camera.position,{
      x:targetX,
      y:.2,
      z:targetZ,
      duration:1.15,
      ease:'power3.inOut'
    },.1)
  }

  return (
    <group
      position={position}
      rotation={[0,side==='left'?Math.PI/2:-Math.PI/2]}
      onPointerOver={e=>{
        e.stopPropagation()
        setHover(true)
        document.body.classList.add('door-hover')
      }}
      onPointerOut={()=>{
        setHover(false)
        document.body.classList.remove('door-hover')
      }}
    >
      <mesh
        ref={left}
        position={[-.58,1.45,0]}
        onClick={e=>{
          e.stopPropagation()
          open()
        }}
      >
        <planeGeometry args={[1.08,2.9]}/>
        <meshBasicMaterial color={hover?'#fbf5e9':'#eee8dc'}/>
      </mesh>

      <mesh
        ref={right}
        position={[.58,1.45,.02]}
        onClick={e=>{
          e.stopPropagation()
          open()
        }}
      >
        <planeGeometry args={[1.08,2.9]}/>
        <meshBasicMaterial color={hover?'#fbf5e9':'#eee8dc'}/>
      </mesh>

      <mesh position={[0,3.05,.04]}>
        <boxGeometry args={[2.55,.16,.18]}/>
        <meshBasicMaterial color="#4f4b43"/>
      </mesh>

      <Text
        position={[0,2.45,.12]}
        fontSize={.16}
        color="#2e2c27"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.2}
        textAlign="center"
      >
        {label}
      </Text>

      <Text
        position={[0,2.1,.12]}
        fontSize={.09}
        color={hover?'#c6634c':'#777268'}
        anchorX="center"
        anchorY="middle"
      >
        {short}
      </Text>

      <mesh position={[side==='left'?.35:-.35,1.45,.18]}>
        <sphereGeometry args={[.07,12,12]}/>
        <meshBasicMaterial color={hover?'#d8674e':'#6b9d95'}/>
      </mesh>
    </group>
  )
}