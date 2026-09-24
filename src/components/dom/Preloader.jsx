import {useEffect,useRef} from 'react'
import gsap from 'gsap'
export default function Preloader({ready=true,onComplete}){
 const ref=useRef(null)
 useEffect(()=>{
  if(!ready)return
  const timer=setTimeout(()=>{
   if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){onComplete?.();return}
   gsap.fromTo(ref.current,{clipPath:'inset(0 0 0 0)'},{clipPath:'inset(0 50% 0 50%)',duration:1.15,ease:'power3.inOut',onComplete:onComplete})
  },500)
  return()=>clearTimeout(timer)
 },[ready,onComplete])
 return <div ref={ref} className="preloader"><div className="pre-paper"><span>FIELD NOTE / 001</span><strong>ASHISH<br/>MAURYA</strong><p>APPLIED AI / SYSTEMS / RESEARCH</p><small>booting the lab…</small></div></div>
}