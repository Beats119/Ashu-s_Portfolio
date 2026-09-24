import {createContext,useContext,useMemo,useState} from 'react'
const C=createContext(null)
export function PerformanceProvider({children}){const [tier,setTier]=useState('HIGH');const settings=useMemo(()=>({antialias:tier!=='LOW',dpr:tier==='LOW'?[1,1]:tier==='BALANCED'?[1,1.4]:[1,1.7],powerPreference:'high-performance',shadows:false}),[tier]);const downgradeTier=()=>setTier(t=>t==='HIGH'?'BALANCED':'LOW');return <C.Provider value={{tier,settings,downgradeTier}}>{children}</C.Provider>}
export const usePerformance=()=>useContext(C)