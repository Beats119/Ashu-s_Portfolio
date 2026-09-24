import {useEffect,useRef} from 'react'
import {useFrame,useThree} from '@react-three/fiber'
import {useScene} from '../context/SceneContext'
const END=-152
export default function useInfiniteCamera({scrollEnabled=true,parallaxEnabled=true,smoothing=.06}={}){
  const {camera}=useThree()
  const {hasEntered,currentRoom,teleportPhase}=useScene()
  const start=useRef(28)
  const target=useRef(28)

  useEffect(()=>{
    if(hasEntered){
      start.current=camera.position.z
      target.current=camera.position.z
      camera.rotation.set(0,0,0)
    }
  },[hasEntered,camera])

  useEffect(()=>{
    const onScroll=()=>{
      if(!hasEntered||currentRoom||teleportPhase||!scrollEnabled)return
      const max=Math.max(1,document.documentElement.scrollHeight-innerHeight)
      const p=Math.min(1,Math.max(0,scrollY/max))
      target.current=start.current+(END-start.current)*p
    }
    addEventListener('scroll',onScroll,{passive:true})
    onScroll()
    return()=>removeEventListener('scroll',onScroll)
  },[hasEntered,currentRoom,teleportPhase,scrollEnabled])

  useFrame(({pointer})=>{
    if(!hasEntered||currentRoom||teleportPhase||!scrollEnabled)return
    camera.position.z+=(target.current-camera.position.z)*smoothing
    if(parallaxEnabled){
      camera.position.x+=(pointer.x*.28-camera.position.x)*.035
      camera.position.y+=((.9+pointer.y*.08)-camera.position.y)*.025
      camera.rotation.y+=(pointer.x*.045-camera.rotation.y)*.03
      camera.rotation.x+=(pointer.y*.02-camera.rotation.x)*.03
    }
  })
}