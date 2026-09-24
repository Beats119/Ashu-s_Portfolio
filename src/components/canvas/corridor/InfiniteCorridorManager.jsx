import {useCallback,useRef,useState} from 'react'
import {useFrame,useThree} from '@react-three/fiber'
import CorridorSegment,{SEGMENT_LENGTH} from './CorridorSegment'

function SegmentVisibility({children,segmentIndex}){
  const ref=useRef()
  const {camera}=useThree()
  useFrame(()=>{
    if(!ref.current)return
    const startZ=10-(segmentIndex*SEGMENT_LENGTH)
    const endZ=startZ-SEGMENT_LENGTH
    ref.current.visible=!(camera.position.z<endZ-10||camera.position.z>startZ+35)
  })
  return <group ref={ref}>{children}</group>
}

export default function InfiniteCorridorManager({onDoorEnter}){
  const {camera}=useThree()
  const [activeSegments,setActiveSegments]=useState([0,1,2])
  const getSegmentFromZ=useCallback((z)=>Math.floor((10-z)/SEGMENT_LENGTH),[])

  useFrame(()=>{
    const current=getSegmentFromZ(camera.position.z)
    const desired=[current-1,current,current+1]
    const changed=
      desired.some(index=>!activeSegments.includes(index)) ||
      activeSegments.some(index=>!desired.includes(index))
    if(changed)setActiveSegments(desired)
  })

  return <group>
    {activeSegments.map(segmentIndex=>(
      <SegmentVisibility key={`segment-${segmentIndex}`} segmentIndex={segmentIndex}>
        <CorridorSegment segmentIndex={segmentIndex} onDoorEnter={onDoorEnter}/>
      </SegmentVisibility>
    ))}
  </group>
}