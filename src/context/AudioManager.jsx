import {createContext,useCallback,useContext,useMemo,useState} from 'react'
const C=createContext(null)
export function AudioProvider({children}){const [isMuted,setMuted]=useState(true);const toggleMute=useCallback(()=>setMuted(v=>!v),[]);const value=useMemo(()=>({isMuted,toggleMute,globalVolume:1,enableAudio(){setMuted(false)},play(){}}),[isMuted,toggleMute]);return <C.Provider value={value}>{children}</C.Provider>}
export const useAudio=()=>useContext(C)