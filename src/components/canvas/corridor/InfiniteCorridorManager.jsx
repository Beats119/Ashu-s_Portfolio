import {useCallback,useState} from 'react'
import {useFrame,useThree} from '@react-three/fiber'
import {useScene} from '../../../context/SceneContext'
import CorridorSegment,{SEGMENT_LENGTH} from './CorridorSegment'

function SegmentVisibility({children,segmentIndex}){
  const ref = useState(null)[0]
  const {camera}=useThree()
  useFrame(()=>{
    if(!ref?.current)return
    const startZ=10-(segmentIndex*SEGMENT_LENGTH)
    const endZ=startZ-SEGMENT_LENGTH
    const visible=!(camera.position.z<endZ-5||camera.position.z>startZ+30)
    if(ref.current.visible!==visible)ref.current.visible=visible
  })
  return <group ref={ref}>{children}</group>
}

export default function InfiniteCorridorManager({onDoorEnter,hideDoorsForSegments=[]}){
  const {camera}=useThree()
  const {hasEntered}=useScene()
  const [activeSegments,setActiveSegments]=useState([0,1])

  const getSegmentFromZ=useCallback(
    z=>Math.floor((10-z)/SEGMENT_LENGTH),
    []
  )

  useFrame(()=>{
    if(!hasEntered){
      if(activeSegments.length!==2||activeSegments[0]!==0||activeSegments[1]!==1){
        setActiveSegments([0,1])
      }
      return
    }

    const current=getSegmentFromZ(camera.position.z)
    const desired=[current-1,current,current+1]
    const changed=
      desired.some(index=>!activeSegments.includes(index))||
      activeSegments.some(index=>!desired.includes(index))

    if(changed)setActiveSegments(desired)
  })

  return (
    <group>
      {activeSegments.map(segmentIndex=>(
        <SegmentVisibility key={`segment-${segmentIndex}`} segmentIndex={segmentIndex}>
          <CorridorSegment
            segmentIndex={segmentIndex}
            onDoorEnter={onDoorEnter}
            hideSegmentDoors={hideDoorsForSegments.includes(segmentIndex)}
          />
        </SegmentVisibility>
      ))}
    </group>
  )
}