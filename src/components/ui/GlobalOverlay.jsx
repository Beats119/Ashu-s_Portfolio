import {useScene} from '../../context/SceneContext'
import {ROOMS,EXPERIENCE,PUBLICATIONS} from '../../data/content'
export default function GlobalOverlay(){
 const {currentRoom,exitRoom}=useScene()
 if(!currentRoom)return null
 const room=ROOMS.find(r=>r.id===currentRoom)
 return <div className="global-overlay"><div className="overlay-card"><button className="overlay-close" onClick={exitRoom}>ESC / BACK</button><div className="overlay-kicker">{room.sub}</div><h2>{room.title}</h2><p>{room.copy}</p><div className="overlay-tags">{room.tags.map(t=><span key={t}>{t}</span>)}</div>{currentRoom==='research'&&<div className="overlay-list">{PUBLICATIONS.map(p=><article key={p.title}><b>{p.venue}</b><h3>{p.title}</h3><small>{p.role}</small><p>{p.desc}</p></article>)}</div>}{currentRoom==='field'&&<div className="overlay-list">{EXPERIENCE.map(e=><article key={e.company+e.role}><b>{e.company}</b><h3>{e.role}</h3><small>{e.date}</small><p>{e.items.join(' ')}</p></article>)}</div>}{currentRoom==='contact'&&<div className="overlay-links"><a href="mailto:beats119119@gmail.com">EMAIL</a><a href="https://github.com/Beats119" target="_blank" rel="noreferrer">GITHUB</a><a href="resume.html">RESUME</a></div>}</div></div>
}