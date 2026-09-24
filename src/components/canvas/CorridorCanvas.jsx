import {Canvas} from '@react-three/fiber'
import {Suspense} from 'react'
import Corridor from '../Corridor'
import useInfiniteCamera from '../../hooks/useInfiniteCamera'
function Camera(){useInfiniteCamera({startZ:10,endZ:-141,smoothing:.06});return null}
export default function CorridorCanvas(){return <Canvas camera={{position:[0,1.55,10],fov:58,near:.1,far:180}} dpr={[1,1.6]} gl={{antialias:true,powerPreference:'high-performance'}}><color attach="background" args={['#e9e3d6']}/><fog attach="fog" args={['#e9e3d6',12,58]}/><hemisphereLight intensity={1.65} color="#fff7e6" groundColor="#8f8b80"/><directionalLight position={[-5,10,12]} intensity={2.2}/><Suspense fallback={null}><Corridor/><Camera/></Suspense></Canvas>}