import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const RotatingObject = () => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.015;
  });

  return (
    <Float speed={5} rotationIntensity={2} floatIntensity={2}>
      <Icosahedron ref={mesh} args={[1, 0]}>
        <meshStandardMaterial
          color="#E8A317"
          wireframe
          emissive="#E8A317"
          emissiveIntensity={0.5}
        />
      </Icosahedron>
    </Float>
  );
};

const Innovation3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <RotatingObject />
      </Canvas>
    </div>
  );
};

export default Innovation3D;
