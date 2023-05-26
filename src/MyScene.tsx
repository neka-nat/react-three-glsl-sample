import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ShaderMaterial } from 'three';

const vertexShader =
  `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader =
  `
  uniform float time;
  varying vec2 vUv;

  void main() {
    gl_FragColor = vec4(vUv, sin(time), 1.0);
  }
`

const MyShaderMaterial = new ShaderMaterial({
  uniforms: {
    u_time: { value: 0 },
    u_radius: { value: 10 }
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
});

const MyMesh: React.FC = () => {
  const ref = useRef<ShaderMaterial>();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.uniforms.u_time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <planeBufferGeometry attach="geometry" args={[10, 10]} />
      <primitive attach="material" object={MyShaderMaterial} ref={ref} />
    </mesh>
  );
};

const MyScene: React.FC = () => (
  <Canvas>
    <MyMesh />
  </Canvas>
);

export default MyScene;
