import {Suspense} from 'react'
import {Canvas} from '@react-three/fiber'
import InfiniteCorridorManager from './corridor/InfiniteCorridorManager'
import EntranceDoors from './entrance/EntranceDoors'
import EmptyCorridor from './entrance/EmptyCorridor'
import SignSystem from './entrance/SignSystem'
import TeleportRoom from './corridor/TeleportRoom'
import useInfiniteCamera from '../../hooks/useInfiniteCamera'
import {useScene} from '../../context/SceneContext'

function CameraController(){
  const {hasEntered,currentRoom}=useScene()
  useInfiniteCamera({
    scrollEnabled:hasEntered&&!currentRoom,
    parallaxEnabled:hasEntered&&!currentRoom,
    smoothing:.06
  })
  return null
}

function World(){
  const {hasEntered,enterRoom}=useScene()
  return (
    <>
      <InfiniteCorridorManager onDoorEnter={enterRoom} hideDoorsForSegments={hasEntered?[]:[-1]}/>
      {!hasEntered&&(
        <>
          <EmptyCorridor/>
          <EntranceDoors position={[0,0,22]}/>
          <SignSystem/>
        </>
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
      dpr={[1,1.5]}
      gl={{antialias:true,powerPreference:'high-performance',alpha:false}}
      onCreated={({camera})=>{
        camera.position.set(0,.9,28)
        camera.rotation.set(0,0,0)
      }}
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