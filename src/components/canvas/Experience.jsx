import {Suspense} from 'react'
import {Canvas} from '@react-three/fiber'
import Corridor from './corridor/Corridor'
import RoomStage from './rooms/RoomStage'
import {ROOMS} from '../../data/content'
import {useScene} from '../../context/SceneContext'
import useInfiniteCamera from '../../hooks/useInfiniteCamera'
function Camera(){useInfiniteCamera();return null}
function Scene(){const {currentRoom}=useScene();const room=currentRoom?ROOMS.find(r=>r.id===currentRoom):null;return <><Corridor/>{room&&<RoomStage room={room} z={room.z}/>}<Camera/></>}
export default function Experience(){return <Canvas camera={{position:[0,1.55,11],fov:58,near:.1,far:170}} dpr={[1,1.7]} gl={{antialias:true,powerPreference:'high-performance'}}><color attach="background" args={['#e9e3d6']}/><fog attach="fog" args={['#e9e3d6',11,55]}/><hemisphereLight intensity={1.75} color="#fff8e8" groundColor="#9d978a"/><directionalLight position={[-5,10,10]} intensity={2.4}/><Suspense fallback={null}><Scene/></Suspense></Canvas>}