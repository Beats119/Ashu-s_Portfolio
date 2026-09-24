import {useEffect,useState} from 'react'
import {useScene} from '../../context/SceneContext'
import {ROOMS} from '../../data/content'
export default function NavigationUI(){
 const {hasEntered,currentRoom,setMapOpen,mapOpen,setAudio,audio,setRecruiter,recruiter,exitRoom}=useScene()
 const [p,setP]=useState(0)
 useEffect(()=>{const f=()=>{const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);setP(Math.min(1,Math.max(0,scrollY/max)))};addEventListener('scroll',f,{passive:true});f();return()=>removeEventListener('scroll',f)},[])
 if(!hasEntered)return null
 return <><header className="nav-ui"><a className="nav-logo" href="#top">AM<span>.</span></a><div className="nav-center">{currentRoom?ROOMS.find(r=>r.id===currentRoom)?.label:'CORRIDOR · '+Math.round(p*100)+'%'}</div><div className="nav-actions"><button onClick={()=>setMapOpen(true)}>MAP</button><button onClick={()=>setAudio(!audio)}>{audio?'SOUND ON':'SOUND OFF'}</button><button onClick={()=>setRecruiter(!recruiter)}>{recruiter?'EXPLORE':'RECRUITER'}</button></div></header><div className="room-dots">{ROOMS.map(r=><span key={r.id} className={currentRoom===r.id?'active':''}/>)}</div>{mapOpen&&<MapPanel/>}{recruiter&&<RecruiterPanel/>}{currentRoom&&<button className="back-btn" onClick={exitRoom}>← BACK TO CORRIDOR</button>}</>
}
function MapPanel(){
 const {setMapOpen,enterRoom}=useScene()
 return <div className="ui-panel"><button className="panel-close" onClick={()=>setMapOpen(false)}>ESC / CLOSE</button><div className="map-inner"><div className="kicker">FIELD MAP / NAVIGATION</div><h2>THE LAB.</h2><div className="map-grid">{ROOMS.map((r,i)=><button key={r.id} onClick={()=>{setMapOpen(false);enterRoom(r.id)}}><b>{String(i+1).padStart(2,'0')}</b><strong>{r.label}</strong><small>{r.short}</small></button>)}</div></div></div>
}
function RecruiterPanel(){
 const {setRecruiter}=useScene()
 return <div className="ui-panel"><button className="panel-close" onClick={()=>setRecruiter(false)}>ESC / CLOSE</button><div className="recruiter-inner"><div className="kicker">RECRUITER MODE</div><h2>ASHISH<br/>MAURYA.</h2><p>Applied AI Engineer — LLMs, RAG, Speech AI &amp; Agentic Systems.</p><div className="recruiter-grid"><div><b>WORK</b><span>Samespace</span><span>HyperVerge Nexus</span><span>IndiaAI Mission</span></div><div><b>RESEARCH</b><span>IEEE · Co-author</span><span>ICICS 2025 · Corresponding Author</span></div><div><b>EDUCATION</b><span>SRM IST · 9.04 / 10.00</span><span>IIT Patna · M.Tech AI</span></div><div><b>LINKS</b><a href="mailto:beats119119@gmail.com">Email</a><a href="https://github.com/Beats119" target="_blank" rel="noreferrer">GitHub</a><a href="resume.html">Resume</a></div></div></div></div>
}