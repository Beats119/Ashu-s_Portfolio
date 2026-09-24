import {Float,Text} from '@react-three/drei'
import * as THREE from 'three'
export default function RoomStage({room}){
 const color=room.kind==='voice'?'#dfeae6':room.kind==='generation'?'#ece1d8':'#ebe7df'
 return <group position={[0,0,-3]}>
  <mesh position={[0,-.25,-12]}><boxGeometry args={[24,.2,18]}/><meshBasicMaterial color="#d2ccc0"/></mesh>
  <mesh position={[0,5.8,-12]} rotation={[Math.PI/2,0,0]}><planeGeometry args={[24,18]}/><meshBasicMaterial color="#f1eee5"/></mesh>
  <mesh position={[-11.8,2.8,-12]} rotation={[0,Math.PI/2,0]}><planeGeometry args={[18,6]}/><meshBasicMaterial color="#ddd8cb"/></mesh>
  <mesh position={[11.8,2.8,-12]} rotation={[0,-Math.PI/2,0]}><planeGeometry args={[18,6]}/><meshBasicMaterial color="#ddd8cb"/></mesh>
  <mesh position={[0,2.8,-20.8]}><planeGeometry args={[24,6]}/><meshBasicMaterial color="#f0ece3"/></mesh>
  <Text position={[0,4.2,-20.4]} fontSize={1.15} color="#292821" anchorX="center" anchorY="middle" maxWidth={18} textAlign="center">{room.title}</Text>
  <Text position={[0,3.25,-20.35]} fontSize={.25} color="#777269" anchorX="center" anchorY="middle">{room.sub}</Text>
  {room.kind==='systems'&&<SystemsArt/>}
  {room.kind==='voice'&&<VoiceArt/>}
  {room.kind==='generation'&&<GenerationArt/>}
  {room.kind==='research'&&<ResearchArt/>}
  {room.kind==='field'&&<FieldArt/>}
  {room.kind==='origin'&&<OriginArt/>}
  {room.kind==='contact'&&<ContactArt/>}
  <mesh position={[0,-.02,-11.7]}><boxGeometry args={[5.5,.06,3.4]}/><meshBasicMaterial color={color}/></mesh>
 </group>
}
function Monitor({x,y,z,label,sub}){return <group position={[x,y,z]}><mesh><boxGeometry args={[2.9,1.8,.15]}/><meshBasicMaterial color="#26251f"/></mesh><mesh position={[0,0,.1]}><planeGeometry args={[2.55,1.45]}/><meshBasicMaterial color="#eef1eb"/></mesh><Text position={[0,.15,.12]} fontSize={.2} color="#2f312c" anchorX="center" anchorY="middle" maxWidth={2.2} textAlign="center">{label}</Text><Text position={[0,-.25,.12]} fontSize={.09} color="#7c7b72" anchorX="center" anchorY="middle">{sub}</Text></group>}
function SystemsArt(){return <group><Monitor x={-4.2} y={2.1} z={-8.7} label="RAG" sub="retrieve → context"/><Monitor x={0} y={2.1} z={-8.8} label="AGENTS" sub="tools → action"/><Monitor x={4.2} y={2.1} z={-8.7} label="MCP" sub="server layer"/><mesh position={[0,4.65,-8.8]}><torusGeometry args={[1.25,.035,8,64]}/><meshBasicMaterial color="#d8674e"/></mesh></group>}
function VoiceArt(){return <group>{Array.from({length:40},(_,i)=>{const x=(i-20)*.28,y=2.1+Math.sin(i*.7)*.65;return <mesh key={i} position={[x,y,-8.9]}><boxGeometry args={[.07,.35+Math.abs(Math.sin(i*.7))*.9,.04]}/><meshBasicMaterial color={i%8===0?'#d8674e':'#5d9f96'}/></mesh>})}</group>}
function GenerationArt(){return <group>{Array.from({length:100},(_,i)=>{const a=i*.37,r=.25+(i%10)*.16,x=Math.cos(a)*r,y=1.9+Math.sin(a)*r;return <mesh key={i} position={[x,y,-8.8]}><boxGeometry args={[.06,.06,.06]}/><meshBasicMaterial color={i%9===0?'#d8674e':'#444238'}/></mesh>})}<Text position={[0,3.7,-8.7]} fontSize={.35} color="#d8674e">NOISE → CONTROL</Text></group>}
function ResearchArt(){return <group>{[-3.2,0,3.2].map((x,i)=><mesh key={i} position={[x,2,-8.9]} rotation={[0,0,(i-1)*.08]}><boxGeometry args={[2.4,2.9,.05]}/><meshBasicMaterial color="#f7f3ea"/><Text position={[0,1.05,.05]} fontSize={.16} color="#38362f" maxWidth={2} textAlign="center">PAPER {i+1}</Text><Text position={[0,.3,.05]} fontSize={.1} color="#777269" maxWidth={1.9} textAlign="center">{i===0?'IEEE / YOLO':i===1?'ICIP / SD':'CORRESPONDING AUTHOR'}</Text></mesh>)}</group>}
function FieldArt(){return <group><Monitor x={-3.4} y={2.1} z={-8.9} label="SAMESPACE" sub="production AI"/><Monitor x={0} y={2.1} z={-8.9} label="HYPERVERGE" sub="research"/><Monitor x={3.4} y={2.1} z={-8.9} label="INDIAAI" sub="research grant"/></group>}
function OriginArt(){return <group><Text position={[-2.4,2.3,-8.9]} fontSize={.5} color="#292821">SRM</Text><Text position={[2.3,2.3,-8.9]} fontSize={.5} color="#292821">IIT PATNA</Text><Text position={[0,3.2,-8.8]} fontSize={.25} color="#d8674e">9.04 / 10.00</Text><mesh position={[0,2,-8.7]} rotation={[Math.PI/2,0,0]}><planeGeometry args={[5,.035]}/><meshBasicMaterial color="#5d9f96"/></mesh></group>}
function ContactArt(){return <group><mesh position={[0,2,-8.8]}><boxGeometry args={[4.8,2.5,.05]}/><meshBasicMaterial color="#f7f3ea"/></mesh><Text position={[0,2.45,-8.7]} fontSize={.35} color="#292821">SYSTEM READY</Text><Text position={[0,1.72,-8.7]} fontSize={.21} color="#777269" anchorX="center" maxWidth={4.2}>beats119119@gmail.com</Text></group>}