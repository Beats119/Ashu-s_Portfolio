import {useState} from 'react'
import {SceneProvider,useScene} from './context/SceneContext'
import Experience from './components/canvas/Experience'
import NavigationUI from './components/ui/NavigationUI'
import PaperTransition from './components/dom/PaperTransition'
function Intro(){const {markEntered}=useScene();const [open,setOpen]=useState(true);if(!open)return null;return <div className="intro-screen"><div className="intro-sheet"><div className="intro-tape"></div><span className="paper-label">FIELD NOTE / 001</span><h1>ASHISH<br/>MAURYA</h1><div className="ink-line"></div><p>Applied AI Engineer building systems around LLMs, retrieval, agents, speech and generative AI.</p><button onClick={()=>{setOpen(false);markEntered()}}>ENTER THE LAB <b>↗</b></button><small>scroll = walk · click a door = enter</small><i>hand-built / no template</i></div></div>}
function AppInner(){return <div id="top" className="app-shell"><div className="canvas-shell"><Experience/></div><NavigationUI/><PaperTransition/><Intro/></div>}
export default function App(){return <SceneProvider><AppInner/></SceneProvider>}