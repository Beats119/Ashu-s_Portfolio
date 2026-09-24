import {useEffect,useRef} from 'react'
import gsap from 'gsap'
import {useScene} from '../../context/SceneContext'
export default function PaperTransition(){
 const {teleportPhase,setTeleportPhase}=useScene()
 const ref=useRef(null)
 useEffect(()=>{
  if(!teleportPhase)return
  const el=ref.current
  gsap.killTweensOf(el)
  if(teleportPhase==='closing'){
   gsap.set(el,{display:'block',clipPath:'inset(0 100% 0 0)'})
   gsap.to(el,{clipPath:'inset(0 0 0 0)',duration:.65,ease:'power2.inOut',onComplete:()=>setTeleportPhase('opening')})
  }
  if(teleportPhase==='opening'){
   gsap.to(el,{clipPath:'inset(0 100% 0 0)',duration:.8,ease:'power3.inOut',onComplete:()=>{gsap.set(el,{display:'none'});setTeleportPhase(null)}})
  }
 },[teleportPhase,setTeleportPhase])
 return <div ref={ref} className="paper-transition" aria-hidden="true"/>
}