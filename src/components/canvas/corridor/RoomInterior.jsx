import {Text,Float} from '@react-three/drei'
export default function RoomInterior({label='THE SYSTEMS LAB',roomId,showRoom,onReady,worldZ=-20}){
 if(!showRoom)return null
 return <group position={[0,0,worldZ-6]}>
  <mesh position={[0,-1.7,-10]}><planeGeometry args={[26,18]}/><meshBasicMaterial color="#ddd7ca"/></mesh>
  <mesh position={[0,1.65,-10]} rotation={[Math.PI/2,0,0]}><planeGeometry args={[26,18]}/><meshBasicMaterial color="#f2eee4"/></mesh>
  <mesh position={[-5.8,0,-10]} rotation={[0,Math.PI/2,0]}><planeGeometry args={[18,3.4]}/><meshBasicMaterial color="#dfd9ce"/></mesh>
  <mesh position={[5.8,0,-10]} rotation={[0,-Math.PI/2,0]}><planeGeometry args={[18,3.4]}/><meshBasicMaterial color="#dfd9ce"/></mesh>
  <Text position={[0,2.05,-19.2]} fontSize={.72} color="#2a2822" anchorX="center" maxWidth={20} textAlign="center">{label}</Text>
  <Text position={[0,1.6,-19.18]} fontSize={.13} color="#777268" anchorX="center">EXPLORE THE ROOM</Text>
  <RoomObjects roomId={roomId}/>
 </group>
}
function RoomObjects({roomId}){
 const data=roomId==='systems'?['RAG','EMBEDDINGS','AGENTS','MCP']:roomId==='voice'?['TTS','CODE-SWITCH','S2S']:roomId==='research'?['IEEE','ICIP','ICICS 2025']:roomId==='field'?['SAMESPACE','HYPERVERGE','INDIAAI']:roomId==='origin'?['SRM','IIT PATNA','9.04 / 10']:['EMAIL','GITHUB','RESUME']
 return <group>{data.map((t,i)=><Float key={t} speed={1.2+i*.12} floatIntensity={.12} position={[(i-(data.length-1)/2)*2.65,1.0,-15.8]}><mesh><boxGeometry args={[2.05,1.35,.08]}/><meshBasicMaterial color="#f7f2e8"/></mesh><Text position={[0,0,.05]} fontSize={.16} color="#2f2d27" anchorX="center" anchorY="middle" maxWidth={1.8} textAlign="center">{t}</Text></Float>)}</group>
}