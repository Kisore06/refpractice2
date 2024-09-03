import { Canvas, useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial, OrbitControls, SoftShadows } from '@react-three/drei';
import './App.css';
import { useRef, useState } from 'react';
import { a } from '@react-spring/three';
import { useSpring } from '@react-spring/three';


const RotateBox = ({position, args, color}) => {
  const boxref = useRef();
  const [click, setClick] =  useState(false);

  const expand = useSpring({
    scale: click ? [1.4, 1.4, 1.4] : [1, 1, 1]
  });

  useFrame(() =>
    (boxref.current.rotation.x = boxref.current.rotation.y += 0.01) 
  )

  return(
    <>
        <a.mesh 
          onClick= {() => setClick(!click)} 
          scale = {expand.scale}
          castShadow position={position} 
          ref={boxref}
        >
          <boxGeometry  args={args} />
          <MeshWobbleMaterial factor={0.3} speed={1}  color={color} />
        </a.mesh>

        <OrbitControls enableZoom={true} />
    </>
  );
};

function App() {
  return (
    <>
      <Canvas shadows colorManagement camera={{position: [-5, 2, 10], fov:60}}>
      <SoftShadows/>

      <ambientLight intensity={0.5} />
      <directionalLight 
        castShadow
        position={[0, 10, 10]}
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={10}
        shadow-camera-right={-10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, 0, 20]} intensity={1.5} />
      <pointLight position={[0, -10, 0]} intensity={1.5} />

      <group>
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
          <planeGeometry args={[100, 100]} />
          <shadowMaterial opacity={.2} color='black'/>
          {/* <meshStandardMaterial/> */}
        </mesh>

        <RotateBox position={[0,1,0]} args={[3,2,1]} color="green"/>
        <RotateBox position={[-2,1,-5]}  color="blue"/>
        <RotateBox position={[5,1,-2]}  color="yellow"/>
      </group>

      </Canvas>
    </>
  );
}

export default App;
