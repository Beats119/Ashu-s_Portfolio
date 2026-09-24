import {useCallback,useEffect,useState} from 'react'
import {PerformanceProvider} from './context/PerformanceContext'
import {AchievementsProvider} from './context/AchievementsContext'
import {AudioProvider} from './context/AudioManager'
import {SceneProvider,useScene} from './context/SceneContext'
import Experience from './components/canvas/Experience'
import NavigationUI from './components/ui/NavigationUI'
import GlobalOverlay from './components/ui/GlobalOverlay'
import ScreenReaderOverlay from './components/ui/ScreenReaderOverlay'
import PaperTransition from './components/dom/PaperTransition'
import Preloader from './components/dom/Preloader'

function Content(){
  const [ready,setReady]=useState(false)
  const onComplete=useCallback(()=>setReady(true),[])
  const {hasEntered}=useScene()

  useEffect(()=>{
    document.title='Ashish Maurya — Beyond the Model'
  },[])

  return (
    <div className="app">
      <div className="canvas-wrapper"><Experience/></div>
      {!ready&&<Preloader ready onComplete={onComplete}/>}
      <NavigationUI/>
      <GlobalOverlay/>
      <PaperTransition/>
      <ScreenReaderOverlay/>
      {ready&&hasEntered&&<div className="scroll-hint">SCROLL TO WALK <span>↓</span></div>}
    </div>
  )
}

export default function App(){
  return (
    <PerformanceProvider>
      <AchievementsProvider>
        <AudioProvider>
          <SceneProvider>
            <Content/>
          </SceneProvider>
        </AudioProvider>
      </AchievementsProvider>
    </PerformanceProvider>
  )
}