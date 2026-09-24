import {createContext,useContext,useState} from 'react'
const C=createContext(null)
export function AchievementsProvider({children}){const [unlocked,setUnlocked]=useState([]);const unlockAchievement=id=>setUnlocked(v=>v.includes(id)?v:[...v,id]);return <C.Provider value={{unlocked,unlockAchievement}}>{children}</C.Provider>}
export const useAchievements=()=>useContext(C)