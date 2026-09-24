import {useRef} from 'react'
import {useFrame,useThree} from '@react-three/fiber'
import gsap from 'gsap'

export default function SegmentDoors({position=[0,0,0]}){
  const left=useRef(null)
  const right=useRef(null)
  const isOpen=useRef(false)
  const {camera}=useThree()

  useFrame(()=>{
    const distance=Math.abs(camera.position.z-position[2])

    if(distance<9&&!isOpen.current){
      isOpen.current=true
      gsap.to(left.current.rotation,{y:-Math.PI*.5,duration:.7,ease:'power2.out'})
      gsap.to(right.current.rotation,{y:Math.PI*.5,duration:.7,ease:'power2.out'})
    }

    if(distance>15&&isOpen.current){
      isOpen.current=false
      gsap.to(left.current.rotation,{y:0,duration:.6,ease:'power2.inOut'})
      gsap.to(right.current.rotation,{y:0,duration:.6,ease:'power2.inOut'})
    }
  })

  return (
    <group position={position}>
      <mesh ref={left} position={[-1,0,0]}>
        <boxGeometry args={[1.95,3.5,.14]}/>
        <meshBasicMaterial color="#eee8dc"/>
      </mesh>
      <mesh ref={right} position={[1,0,0]}>
        <boxGeometry args={[1.95,3.5,.14]}/>
        <meshBasicMaterial color="#eee8dc"/>
      </mesh>
    </group>
  )
}
