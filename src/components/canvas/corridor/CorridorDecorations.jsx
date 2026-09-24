import {Text} from '@react-three/drei'

export default function CorridorDecorations({zOffset=10,length=80}){
  const items=Array.from({length:12},(_,i)=>({
    z:zOffset-5-i*6,
    side:i%2===0?1:-1,
    label:i%2===0?'// THINK / BUILD':'// TODO: EVALUATE'
  }))

  return (
    <group>
      {items.map((item,i)=>(
        <Text
          key={i}
          position={[item.side*3.02,1.05,item.z]}
          fontSize={.09}
          color="#898378"
          rotation={[0,0,item.side>0?.06:-.06]}
        >
          {item.label}
        </Text>
      ))}
    </group>
  )
}