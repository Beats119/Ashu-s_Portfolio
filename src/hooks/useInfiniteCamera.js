import {useEffect,useRef} from 'react'
import {useFrame,useThree} from '@react-three/fiber'
import {useScene} from '../context/SceneContext'

export default function useInfiniteCamera({startZ=9,endZ=-110,smoothing=.075}={}){
  const {camera}=useThree()
  const {hasEntered,currentRoom,isTeleporting}=useScene()
  const targetZ=useRef(startZ)

  useEffect(()=>{
    const onScroll=()=>{
      if(!hasEntered||currentRoom||isTeleporting) return
      const max=Math.max(1,document.documentElement.scrollHeight-innerHeight)
      const p=Math.min(1,Math.max(0,scrollY/max))
      targetZ.current=startZ+(endZ-startZ)*p
    }
    addEventListener('scroll',onScroll,{passive:true})
    onScroll()
    return()=>removeEventListener('scroll',onScroll)
  },[hasEntered,currentRoom,isTeleporting,startZ,endZ])

  useFrame(()=>{
    if(!hasEntered) return
    if(!currentRoom&&!isTeleporting){
      camera.position.z+=(targetZ.current-camera.position.z)*smoothing
      const p=(camera.position.z-startZ)/(endZ-startZ||1)
      camera.position.x+=(Math.sin(p*Math.PI*14)*.07-camera.position.x)*.04
      camera.position.y+=(1.55+Math.sin(p*Math.PI*10)*.025-camera.position.y)*.04
      camera.rotation.x*=.92
      camera.rotation.y*=.92
    }
  })

  return {
    getProgress:()=>Math.min(1,Math.max(0,(startZ-camera.position.z)/(startZ-endZ)))
  }
}