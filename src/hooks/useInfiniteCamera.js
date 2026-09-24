import {useEffect,useRef} from 'react'
import {useFrame,useThree} from '@react-three/fiber'
import {useScene} from '../context/SceneContext'
const START=28,END=-152,LENGTH=80
export default function useInfiniteCamera({scrollEnabled=true,parallaxEnabled=true,smoothing=.06}={}){const {camera}=useThree();const {hasEntered,currentRoom,teleportPhase}=useScene();const targetZ=useRef(START)
useEffect(()=>{const onScroll=()=>{if(!hasEntered||currentRoom||teleportPhase||!scrollEnabled)return;const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);const p=Math.min(1,Math.max(0,scrollY/max));targetZ.current=START+(END-START)*p};addEventListener('scroll',onScroll,{passive:true});onScroll();return()=>removeEventListener('scroll',onScroll)},[hasEntered,currentRoom,teleportPhase,scrollEnabled])
useFrame(({pointer})=>{if(!hasEntered||currentRoom||teleportPhase||!scrollEnabled)return;camera.position.z+=(targetZ.current-camera.position.z)*smoothing;if(parallaxEnabled){camera.position.x+=(pointer.x*.38-camera.position.x)*.035;camera.position.y+=(.2+1.45+pointer.y*.08-camera.position.y)*.025;camera.rotation.y+=(pointer.x*.055-camera.rotation.y)*.03;camera.rotation.z+=(pointer.x*.012-camera.rotation.z)*.03}})
return {targetZ}}