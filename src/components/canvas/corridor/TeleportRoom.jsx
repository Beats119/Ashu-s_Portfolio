import {useEffect,useState} from 'react'
import {useScene} from '../../../context/SceneContext'
import {ROOMS} from '../../../data/content'
import RoomInterior from './RoomInterior'
export default function TeleportRoom(){const {currentRoom}=useScene();const room=currentRoom&&ROOMS.find(r=>r.id===currentRoom);const [show,setShow]=useState(false);useEffect(()=>{setShow(false);if(room){const t=setTimeout(()=>setShow(true),50);return()=>clearTimeout(t)}},[room?.id]);return room&&show?<RoomInterior label={room.label} roomId={room.id} worldZ={room.z} showRoom/>:null}