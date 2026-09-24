import {createContext,useCallback,useContext,useMemo,useRef,useState} from 'react'
const SceneContext=createContext(null)
export function SceneProvider({children}){
 const [hasEntered,setHasEntered]=useState(false)
 const [currentRoom,setCurrentRoom]=useState(null)
 const [transition,setTransition]=useState(null)
 const [mapOpen,setMapOpen]=useState(false)
 const [soundOn,setSoundOn]=useState(false)
 const [recruiter,setRecruiter]=useState(false)
 const cameraReturn=useRef(null)
 const markEntered=useCallback(()=>setHasEntered(true),[])
 const enterRoom=useCallback((id)=>{cameraReturn.current=window.scrollY;setTransition('closing');setTimeout(()=>{setCurrentRoom(id);setTransition('opening')},620)},[])
 const exitRoom=useCallback(()=>{setTransition('closing');setTimeout(()=>{setCurrentRoom(null);setTransition('opening');window.scrollTo({top:cameraReturn.current||0,behavior:'auto'})},620)},[])
 const value=useMemo(()=>({hasEntered,currentRoom,transition,mapOpen,soundOn,recruiter,markEntered,enterRoom,exitRoom,setTransition,setMapOpen,setSoundOn,setRecruiter}),[hasEntered,currentRoom,transition,mapOpen,soundOn,recruiter,markEntered,enterRoom,exitRoom])
 return <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
}
export function useScene(){const c=useContext(SceneContext);if(!c)throw new Error('SceneContext missing');return c}