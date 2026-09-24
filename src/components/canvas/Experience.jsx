import {useCallback} from 'react'
import InfiniteCorridorManager from './corridor/InfiniteCorridorManager'
import EntranceDoors from './entrance/EntranceDoors'
import EmptyCorridor from './entrance/EmptyCorridor'
import SignSystem from './entrance/SignSystem'
import TeleportRoom from './corridor/TeleportRoom'
import {useScene} from '../../context/SceneContext'
export default function Experience(){
 const {hasEntered,enterRoom}=useScene()
 const handleDoorEnter=useCallback(id=>enterRoom(id),[enterRoom])
 return <>{!hasEntered?<><EmptyCorridor/><EntranceDoors position={[0,0,22]}/><SignSystem/></>:<InfiniteCorridorManager onDoorEnter={handleDoorEnter}/>}<TeleportRoom/></>
}