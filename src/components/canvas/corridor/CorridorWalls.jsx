export default function CorridorWalls({zStart=10,length=80}){
  const marks=Array.from({length:14},(_,i)=>zStart-3-i*5.5)
  return (
    <group>
      <mesh position={[0,-1.75,zStart-length/2]} rotation={[-Math.PI/2,0,0]}>
        <planeGeometry args={[7,length]}/>
        <meshBasicMaterial color="#e8e2d7"/>
      </mesh>
      <mesh position={[0,1.75,zStart-length/2]} rotation={[Math.PI/2,0,0]}>
        <planeGeometry args={[7,length]}/>
        <meshBasicMaterial color="#f1ede4"/>
      </mesh>
      <mesh position={[-3.5,0,zStart-length/2]} rotation={[0,Math.PI/2,0]}>
        <planeGeometry args={[length,3.5]}/>
        <meshBasicMaterial color="#dfd9ce"/>
      </mesh>
      <mesh position={[3.5,0,zStart-length/2]} rotation={[0,-Math.PI/2,0]}>
        <planeGeometry args={[length,3.5]}/>
        <meshBasicMaterial color="#dfd9ce"/>
      </mesh>
      {marks.map((z,i)=>(
        <group key={i}>
          <mesh position={[-3.46,.05,z]} rotation={[0,Math.PI/2,0]}>
            <planeGeometry args={[.02,3.1]}/>
            <meshBasicMaterial color="#aaa397" transparent opacity={.45}/>
          </mesh>
          <mesh position={[3.46,.05,z]} rotation={[0,-Math.PI/2,0]}>
            <planeGeometry args={[.02,3.1]}/>
            <meshBasicMaterial color="#aaa397" transparent opacity={.45}/>
          </mesh>
        </group>
      ))}
    </group>
  )
}