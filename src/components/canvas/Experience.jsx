import {Suspense,useCallback} from 'react'
import {Canvas} from '@react-three/fiber'
import InfiniteCorridorManager from './corridor/InfiniteCorridorManager'
import EntranceDoors from './entrance/EntranceDoors'
import EmptyCorridor from './entrance/EmptyCorridor'
import SignSystem from './entrance/SignSystem'
import TeleportRoom from './corridor/TeleportRoom'
import {useScene} from '../../context/SceneContext'
import useInfiniteCamera from '../../hooks/useInfiniteCamera'
function Camera(){useInfiniteCamera({scrollEnabled:true,parallaxEnabled:true});return null}
function World(){const {hasEntered,enterRoom}=useScene();const handleDoorEnter=useCallback(id=>enterRoom(id),[enterRoom]);return <>{!hasEntered?<><EmptyCorridor/><EntranceDoors position={[0,0,22]}/><SignSystem/></>:<InfiniteCorridorManager onDoorEnter={handleDoorEnter}/>}<TeleportRoom/><Camera/></>}
export default function Experience(){return <Canvas camera={{position:[0,.2,28],fov:60,near:.1,far:170}} dpr={[1,1.65]} gl={{antialias:true,powerPreference:'high-performance',alpha:false}}><color attach="background" args={['#f4f1e8']}/><fog attach="fog" args={['#f4f1e8',12,65]}/><ambientLight intensity={1.6}/><directionalLight position={[-5,8,10]} intensity={2}/><Suspense fallback={null}><World/></Suspense></Canvas>}