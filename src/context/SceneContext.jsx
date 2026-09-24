import {createContext,useCallback,useContext,useMemo,useRef,useState} from 'react'
const C=createContext(null)
export function SceneProvider({children}){
 const [currentRoom,setCurrentRoom]=useState(null);const [hasEntered,setHasEntered]=useState(false);const [teleportTarget,setTeleportTarget]=useState(null);const [teleportPhase,setTeleportPhase]=useState(null);const [overlayContent,setOverlayContent]=useState(null);const [mapOpen,setMapOpen]=useState(false);const [audio,setAudio]=useState(false);const [recruiter,setRecruiter]=useState(false);const cameraReturn=useRef(0)
 const markEntered=useCallback(()=>setHasEntered(true),[])
 const teleportTo=useCallback(id=>{if(!id)return;cameraReturn.current=window.scrollY;setTeleportTarget(id);setCurrentRoom(id);setTeleportPhase('closing');setOverlayContent(null)},[])
 const enterRoom=useCallback(id=>{setCurrentRoom(id);setTeleportTarget(null);setTeleportPhase(null)},[])
 const exitRoom=useCallback(()=>{setOverlayContent(null);setCurrentRoom(null);setTeleportTarget(null);setTeleportPhase(null)},[])
 const openOverlay=useCallback(c=>setOverlayContent(c),[]),closeOverlay=useCallback(()=>setOverlayContent(null),[])
 const value=useMemo(()=>({currentRoom,hasEntered,teleportTarget,teleportPhase,overlayContent,mapOpen,audio,recruiter,cameraReturn,markEntered,teleportTo,enterRoom,exitRoom,openOverlay,closeOverlay,setTeleportPhase,setMapOpen,setAudio,setRecruiter}),[currentRoom,hasEntered,teleportTarget,teleportPhase,overlayContent,mapOpen,audio,recruiter,markEntered,teleportTo,enterRoom,exitRoom,openOverlay,closeOverlay])
 return <C.Provider value={value}>{children}</C.Provider>
}
export function useScene(){const c=useContext(C);if(!c)throw new Error('SceneContext missing');return c}