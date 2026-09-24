import {useEffect} from 'react'
import {useScene} from '../../context/SceneContext'
export default function PaperTransition(){
 const {transition,setTransition}=useScene()
 useEffect(()=>{if(!transition)return;const t=setTimeout(()=>setTransition(null),850);return()=>clearTimeout(t)},[transition,setTransition])
 return <div className={'paper-transition '+(transition?'pt-open':'')} aria-hidden="true"><div className="pt-left"></div><div className="pt-right"></div></div>
}