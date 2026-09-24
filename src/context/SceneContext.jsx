import {createContext,useCallback,useContext,useMemo,useRef,useState} from 'react'
const C=createContext(null)
export function SceneProvider({children}){const [currentRoom,setCurrentRoom]=useState(null);const [hasEntered,setHasEntered]=useState(false);const [teleportTarget,setTeleportTarget]=useState(null);const [teleportPhase,setTeleportPhase]=useState(null);const [overlayContent,setOverlayContent]=useState(null);const [mapOpen,setMapOpen]=useState(false);const [audio,setAudio]=useState(false);const cameraReturn=useRef(null)
const markEntered=useCallback(()=>setHasEntered(true),[])
const enterRoom=useCallback(id=>{setCurrentRoom(id);setTeleportTarget(null);setTeleportPhase(null)},[])
const exitRoom=useCallback(()=>{setCurrentRoom(null);setOverlayContent(null)},[])
const teleportTo=useCallback(id=>{if(id===currentRoom)return;cameraReturn.current=window.scrollY;setTeleportTarget(id);setTeleportPhase('closing')},[currentRoom])
const openOverlay=useCallback(c=>setOverlayContent(c),[]),closeOverlay=useCallback(()=>setOverlayContent(null),[])
const value=useMemo(()=>({currentRoom,hasEntered,teleportTarget,teleportPhase,overlayContent,mapOpen,audio,cameraReturn,markEntered,enterRoom,exitRoom,teleportTo,openOverlay,closeOverlay,setTeleportPhase,setMapOpen,setAudio}),[currentRoom,hasEntered,teleportTarget,teleportPhase,overlayContent,mapOpen,audio,markEntered,enterRoom,exitRoom,teleportTo,openOverlay,closeOverlay])
return <C.Provider value={value}>{children}</C.Provider>}
export function useScene(){const c=useContext(C);if(!c)throw new Error('useScene must be used within SceneProvider');return c}