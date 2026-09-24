import {useMemo} from 'react'
import CorridorWalls from './CorridorWalls'
import DoorSection from './DoorSection'
import SegmentDoors from './SegmentDoors'
import Avatar from './Avatar'
import HeroText from './HeroText'
import Doodles from './Doodles'
import CorridorDecorations from './CorridorDecorations'
export const SEGMENT_LENGTH=80
export default function CorridorSegment({segmentIndex=0,onDoorEnter,hideSegmentDoors=false}){
 const zOffset=10-segmentIndex*SEGMENT_LENGTH
 const doors=useMemo(()=>{
  const sets=[
   [{roomId:'systems',label:'THE SYSTEMS LAB',short:'RAG · AGENTS',side:'left',relativeZ:-18},{roomId:'voice',label:'THE VOICE LAB',short:'TTS · SIGNAL',side:'right',relativeZ:-32},{roomId:'generation',label:'THE GENERATION LAB',short:'DIFFUSION · CONTROL',side:'left',relativeZ:-46},{roomId:'research',label:'THE ARCHIVE',short:'PAPERS · RESEARCH',side:'right',relativeZ:-60}],
   [{roomId:'field',label:'FIELD LOG',short:'SAMESPACE · INDIAAI',side:'left',relativeZ:-18},{roomId:'origin',label:'THE ORIGIN',short:'SRM · IIT PATNA',side:'right',relativeZ:-32},{roomId:'contact',label:"LET'S CONNECT",short:'EMAIL · GITHUB · CV',side:'left',relativeZ:-46},{roomId:'systems',label:'SYSTEMS / AGAIN',short:'RAG · AGENTS',side:'right',relativeZ:-60}]
  ]
  return sets[segmentIndex%2]
 },[segmentIndex])
 return <group>
  <CorridorWalls zStart={zOffset} length={SEGMENT_LENGTH}/>
  <group position={[0,0,zOffset-2]}><HeroText position={[0,0,-.3]}/><Avatar position={[-.72,-.62,-.6]}/><Doodles/></group>
  {doors.map(d=><DoorSection key={segmentIndex+'-'+d.roomId+'-'+d.relativeZ} roomId={d.roomId} label={d.label} short={d.short} side={d.side} position={[d.side==='left'?-2.62:2.62,0,zOffset+d.relativeZ]} onEnter={()=>onDoorEnter?.(d.roomId)}/>)}
  <CorridorDecorations zOffset={zOffset} length={SEGMENT_LENGTH}/>
  {!hideSegmentDoors&&<SegmentDoors position={[0,0,zOffset-75]}/>}
 </group>
}