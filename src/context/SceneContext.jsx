import {createContext,useCallback,useContext,useMemo,useRef,useState } from 'react'

const SceneContext=createContext(null)

export function SceneProvider({children}){
  const [hasEntered,setHasEntered]=useState(false)
  const [currentRoom,setCurrentRoom]=useState(null)
  const [isTeleporting,setIsTeleporting]=useState(false)
  const [paperPhase,setPaperPhase]=useState(null)
  const cameraReturn=useRef(null)

  const markEntered=useCallback(()=>setHasEntered(true),[])
  const enterRoom=useCallback((room)=>{
    setCurrentRoom(room)
    setIsTeleporting(false)
    setPaperPhase(null)
  },[])
  const exitRoom=useCallback(()=>{
    setCurrentRoom(null)
    setIsTeleporting(false)
    setPaperPhase(null)
  },[])
  const startTeleport=useCallback((room)=>{
    if(currentRoom===room || isTeleporting) return false
    setIsTeleporting(true)
    setPaperPhase('closing')
    return true
  },[currentRoom,isTeleporting])

  const value=useMemo(()=>({
    hasEntered,currentRoom,isTeleporting,paperPhase,
    markEntered,enterRoom,exitRoom,startTeleport,
    setPaperPhase,setCameraReturn:cameraReturn
  }),[hasEntered,currentRoom,isTeleporting,paperPhase,markEntered,enterRoom,exitRoom,startTeleport])

  return <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
}
export function useScene(){
  const value=useContext(SceneContext)
  if(!value) throw new Error('useScene must be used inside SceneProvider')
  return value
}