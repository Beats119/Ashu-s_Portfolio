import {Suspense} from 'react'
import {Canvas,useThree,useFrame} from '@react-three/fiber'
import {useRef} from 'react'
import InfiniteCorridorManager from './corridor/InfiniteCorridorManager'
import EntranceDoors from './entrance/EntranceDoors'
import EmptyCorridor from './entrance/EmptyCorridor'
import SignSystem from './entrance/SignSystem'
import TeleportRoom from './corridor/TeleportRoom'
import useInfiniteCamera from '../../hooks/useInfiniteCamera'
import {useScene} from '../../context/SceneContext'

function CameraController(){
  const {camera}=useThree()
  const {hasEntered,currentRoom}=useScene()
  useInfiniteCamera({scrollEnabled:true,parallaxEnabled:true,smoothing:.075})
  useFrame(()=>{
    if(!hasEntered||currentRoom)return
    if(camera.position.y<.5)camera.position.y=.85
  })
  return null
}

function World(){
  const {hasEntered,enterRoom}=useScene()
  return (
    <>
      {!hasEntered ? (
        <>
          <EmptyCorridor/>
          <EntranceDoors position={[0,0,22]}/>
          <SignSystem/>
        </>
      ) : (
        <InfiniteCorridorManager onDoorEnter={enterRoom}/>
      )}
      <TeleportRoom/>
      <CameraController/>
    </>
  )
}

export default function Experience(){
  return (
    <Canvas
      camera={{position:[0,.9,28],fov:60,near:.1,far:180}}
      dpr={[1,1.65]}
      gl={{antialias:true,powerPreference:'high-performance',alpha:false}}
    >
      <color attach="background" args={['#e4ded3']}/>
      <fog attach="fog" args={['#e4ded3',14,72]}/>
      <ambientLight intensity={1.5}/>
      <directionalLight position={[-4,8,10]} intensity={2.2}/>
      <Suspense fallback={null}>
        <World/>
      </Suspense>
    </Canvas>
  )
}