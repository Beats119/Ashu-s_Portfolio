import {useCallback,useEffect,useState} from 'react'
import {Canvas} from '@react-three/fiber'
import {Preload} from '@react-three/drei'
import {Suspense} from 'react'
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

function SceneFrame(){
  return (
    <Canvas
      camera={{position:[0,.2,28],fov:60,near:.1,far:170}}
      gl={{antialias:true,powerPreference:'high-performance',alpha:false}}
      dpr={[1,1.65]}
    >
      <color attach="background" args={['#f4f0e5']}/>
      <fog attach="fog" args={['#f4f0e5',14,70]}/>
      <ambientLight intensity={1.6}/>
      <directionalLight position={[-5,8,10]} intensity={2}/>
      <Suspense fallback={null}>
        <Experience/>
        <Preload all/>
      </Suspense>
    </Canvas>
  )
}

function Content(){
  const [ready,setReady]=useState(false)
  const onComplete=useCallback(()=>setReady(true),[])
  const {hasEntered}=useScene()

  useEffect(()=>{
    document.title='Ashish Maurya — Beyond the Model'
  },[])

  return (
    <div className="app">
      <div className="canvas-wrapper"><SceneFrame/></div>
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