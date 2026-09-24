import {useEffect,useState} from 'react'
import {useScene} from '../../context/SceneContext'
import {ROOMS} from '../../data/content'
export default function NavigationUI(){
 const {hasEntered,currentRoom,setMapOpen,mapOpen,setSoundOn,soundOn,setRecruiter,recruiter,exitRoom}=useScene()
 const [p,setP]=useState(0)
 useEffect(()=>{const f=()=>{const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);setP(Math.min(1,Math.max(0,scrollY/max)))};addEventListener('scroll',f,{passive:true});f();return()=>removeEventListener('scroll',f)},[])
 if(!hasEntered)return null
 return <><header className="nav-ui"><a className="nav-logo" href="#top">AM<span>.</span></a><div className="nav-status">{currentRoom?currentRoom.toUpperCase():'CORRIDOR / '+Math.round(p*100)+'%'}</div><div className="nav-actions"><button onClick={()=>setMapOpen(true)}>MAP</button><button onClick={()=>setSoundOn(!soundOn)}>{soundOn?'SOUND ON':'SOUND OFF'}</button><button onClick={()=>setRecruiter(!recruiter)}>{recruiter?'EXPLORE':'RECRUITER'}</button></div></header><div className="door-trace">{ROOMS.map((r,i)=><span key={r.id} className={currentRoom===r.id?'lit':''}></span>)}</div>{mapOpen&&<MapPanel onClose={()=>setMapOpen(false)}/>} {recruiter&&<RecruiterPanel onClose={()=>setRecruiter(false)}/>} {currentRoom&&<button className="back-ui" onClick={exitRoom}>← BACK TO CORRIDOR</button>}</>
}
function MapPanel({onClose}){
 const {setMapOpen,enterRoom}=useScene()
 return <div className="overlay-panel map-panel"><button className="panel-close" onClick={onClose}>ESC / CLOSE</button><div className="map-paper"><div className="panel-kicker">FIELD MAP / NAVIGATION</div><h2>THE WORLD.</h2><div className="map-line"></div><div className="map-rooms">{ROOMS.map((r,i)=><button key={r.id} onClick={()=>{const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);window.scrollTo({top:((i+1)/(ROOMS.length+1))*max,behavior:'auto'});setMapOpen(false);setTimeout(()=>enterRoom(r.id),40)}}><span>{String(i+1).padStart(2,'0')}</span><b>{r.label}</b><small>{r.short}</small></button>)}</div></div></div>
}
function RecruiterPanel({onClose}){
 return <div className="overlay-panel recruiter-panel"><button className="panel-close" onClick={onClose}>ESC / CLOSE</button><div className="recruiter-inner"><div className="panel-kicker">RECRUITER MODE</div><h2>ASHISH<br/>MAURYA.</h2><p>Applied AI Engineer — LLMs, RAG, Speech AI &amp; Agentic Systems.</p><div className="recruiter-grid"><div><b>EDUCATION</b><span>IIT Patna · M.Tech Artificial Intelligence</span><span>SRM IST · B.Tech CSE (AI &amp; ML) · 9.04/10.00</span></div><div><b>RESEARCH</b><span>IEEE · Co-author</span><span>ICICS 2025 · Corresponding Author</span></div><div><b>WORK</b><span>Samespace</span><span>HyperVerge Nexus</span><span>IndiaAI Mission</span></div><div><b>CONTACT</b><a href="mailto:beats119119@gmail.com">beats119119@gmail.com</a><a href="https://github.com/Beats119">github.com/Beats119</a><a href="resume.html">View Resume</a></div></div></div></div>
}