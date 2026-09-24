import {Canvas} from '@react-three/fiber'
import {Suspense} from 'react'
import Corridor from './corridor/Corridor'
import RoomStage from './rooms/RoomStage'
import useInfiniteCamera from '../../hooks/useInfiniteCamera'
import {useScene} from '../../context/SceneContext'
function Camera(){useInfiniteCamera();return null}
function Scene(){const {currentRoom}=useScene();return <><Corridor/>{currentRoom&&<RoomStage room={currentRoom}/>}<Camera/></>}
export default function Experience(){return <Canvas camera={{position:[0,1.55,11],fov:58,near:.1,far:180}} dpr={[1,1.7]} gl={{antialias:true,powerPreference:'high-performance'}}><color attach="background" args={['#e9e3d6']}/><fog attach="fog" args={['#e9e3d6',12,58]}/><ambientLight intensity={1.35}/><directionalLight position={[-5,10,8]} intensity={2}/><Suspense fallback={null}><Scene/></Suspense></Canvas>}