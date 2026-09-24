import {Text,Float} from '@react-three/drei'
import * as THREE from 'three'
export default function RoomStage({room,z}){
 const accent=room.kind==='voice'?'#5d9f96':room.kind==='generation'?'#d8674e':'#5f685f'
 return <group position={[0,-.05,z-5]}>
  <mesh position={[0,-.15,-8]}><planeGeometry args={[22,17]}/><meshBasicMaterial color="#dfd9cc"/></mesh>
  <mesh position={[0,5.55,-8]} rotation={[Math.PI/2,0,0]}><planeGeometry args={[22,16]}/><meshBasicMaterial color="#f1ede2"/></mesh>
  <mesh position={[-11,2.7,-8]} rotation={[0,Math.PI/2,0]}><planeGeometry args={[16,5.7]}/><meshBasicMaterial color="#d9d3c6"/></mesh>
  <mesh position={[11,2.7,-8]} rotation={[0,-Math.PI/2,0]}><planeGeometry args={[16,5.7]}/><meshBasicMaterial color="#d9d3c6"/></mesh>
  <Text position={[0,4.2,-15.8]} fontSize={.82} color="#2d2b25" anchorX="center" anchorY="middle" maxWidth={18} textAlign="center">{room.title}</Text>
  <Text position={[0,3.55,-15.7]} fontSize={.19} color="#777268" anchorX="center" anchorY="middle">{room.sub}</Text>
  <Float speed={1.2} rotationIntensity={.08} floatIntensity={.14}>
    <mesh position={[0,2.2,-13.9]}><planeGeometry args={[5.8,3.1]}/><meshBasicMaterial color="#f7f2e7"/></mesh>
    <mesh position={[0,2.2,-13.72]}><planeGeometry args={[5.1,2.4]}/><meshBasicMaterial color={accent}/>
    </mesh>
  </Float>
  {room.kind==='systems'&&<SystemDiagram/>}
  {room.kind==='voice'&&<VoiceDiagram accent={accent}/>}
  {room.kind==='generation'&&<GenerationDiagram accent={accent}/>}
  {room.kind==='research'&&<ResearchDiagram/>}
  {room.kind==='field'&&<FieldDiagram/>}
  {room.kind==='origin'&&<OriginDiagram/>}
  {room.kind==='contact'&&<ContactDiagram/>}
 </group>
}
function SystemDiagram(){return <group position={[0,1.9,-13.55]}>{[['DOCS',-4],['VECTOR',-1.35],['RAG',1.35],['AGENT',4]].map(([t,x])=><group key={t} position={[x,0,0]}><mesh><boxGeometry args={[1.9,1.1,.04]}/><meshBasicMaterial color="#efeadf"/></mesh><Text position={[0,0,.04]} fontSize={.18} color="#2d2b25" anchorX="center" anchorY="middle">{t}</Text></group>)}<Text position={[0,-.95,0]} fontSize={.15} color="#777268">documents → embeddings → retrieval → action</Text></group>}
function VoiceDiagram({accent}){return <group position={[0,2,-13.52]}>{Array.from({length:54},(_,i)=><mesh key={i} position={[-5.1+i*.19,Math.sin(i*.65)*.4,0]}><boxGeometry args={[.055,.35+Math.abs(Math.sin(i*.65))*1.1,.03]}/><meshBasicMaterial color={i%11===0?'#d8674e':accent}/></mesh>)}<Text position={[0,-1.15,.02]} fontSize={.17} color="#777268">multilingual TTS · code-switching · accent translation</Text></group>}
function GenerationDiagram({accent}){return <group position={[0,2,-13.52]}>{Array.from({length:150},(_,i)=>{const a=i*.33,r=.2+(i%18)*.07;return <mesh key={i} position={[Math.cos(a)*r,Math.sin(a)*r,0]}><boxGeometry args={[.045,.045,.045]}/><meshBasicMaterial color={i%13===0?'#d8674e':accent}/></mesh>})}<Text position={[0,-1.2,.02]} fontSize={.18} color="#777268">Stable Diffusion + LoRA + ControlNet + IP-Adapter</Text></group>}
function ResearchDiagram(){return <group position={[0,2,-13.52]}>{[-2.8,0,2.8].map((x,i)=><group key={i} position={[x,0,0]} rotation={[0,0,(i-1)*.05]}><mesh><boxGeometry args={[2.1,2.7,.04]}/><meshBasicMaterial color="#f6f1e6"/></mesh><Text position={[0,.72,.04]} fontSize={.14} color="#292720" anchorX="center" maxWidth={1.7} textAlign="center">{i===0?'IEEE / YOLO':i===1?'ICIP / STABLE DIFFUSION':'CORRESPONDING AUTHOR'}</Text></group>)}</group>}
function FieldDiagram(){return <group position={[0,2,-13.52]}>{['SAMESPACE','HYPERVERGE','INDIAAI'].map((t,i)=><group key={t} position={[(i-1)*3,0,0]}><mesh><boxGeometry args={[2.4,1.5,.05]}/><meshBasicMaterial color="#eeeadf"/></mesh><Text position={[0,.1,.06]} fontSize={.17} color="#292720" anchorX="center" anchorY="middle">{t}</Text></group>)}</group>}
function OriginDiagram(){return <group position={[0,1.95,-13.5]}><Text position={[-3.1,0,0]} fontSize={.5} color="#292720">SRM</Text><Text position={[2.2,0,0]} fontSize={.42} color="#292720">IIT PATNA</Text><Text position={[0,-.85,0]} fontSize={.2} color="#d8674e">9.04 / 10.00</Text></group>}
function ContactDiagram(){return <group position={[0,1.95,-13.5]}><Text fontSize={.36} color="#292720" anchorX="center">SYSTEM READY.</Text><Text position={[0,-.75,0]} fontSize={.2} color="#777268" anchorX="center">beats119119@gmail.com</Text></group>}