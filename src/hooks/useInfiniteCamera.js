import {useEffect,useRef} from 'react'
import {useFrame,useThree} from '@react-three/fiber'
import {useScene} from '../context/SceneContext'
const START=11,END=-105
export default function useInfiniteCamera(){
 const {camera}=useThree();const {hasEntered,currentRoom,transition}=useScene();const target=useRef(START)
 useEffect(()=>{const onScroll=()=>{if(!hasEntered||currentRoom||transition)return;const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);const p=Math.min(1,Math.max(0,scrollY/max));target.current=START+(END-START)*p};addEventListener('scroll',onScroll,{passive:true});onScroll();return()=>removeEventListener('scroll',onScroll)},[hasEntered,currentRoom,transition])
 useFrame(({pointer,clock})=>{if(!hasEntered||currentRoom||transition)return;camera.position.z+=(target.current-camera.position.z)*.065;camera.position.x+=(pointer.x*.22-camera.position.x)*.025;camera.position.y+=(1.55+pointer.y*.08-camera.position.y)*.03;camera.rotation.z+=(pointer.x*.012-camera.rotation.z)*.03;camera.rotation.y+=((pointer.x*.045)-camera.rotation.y)*.03;})
 return target
}