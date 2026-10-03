import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Ground — bright warm surface
 */
export function Ground() {
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#f0ebe3',
        roughness: 0.85,
        metalness: 0.0,
      }),
    []
  );

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1.3, 0]}
      receiveShadow
      material={material}
    >
      <planeGeometry args={[24, 24]} />
    </mesh>
  );
}

/**
 * Wall — soft bright background
 */
export function Wall() {
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#f5f0ea',
        roughness: 0.9,
        metalness: 0.0,
      }),
    []
  );

  return (
    <mesh position={[0, 1.8, -3.5]} material={material} receiveShadow>
      <planeGeometry args={[16, 8]} />
    </mesh>
  );
}

/**
 * Floating dust motes — brighter, slightly colored
 */
export function FloatingParticles({ count = 40 }) {
  const particlesRef = useRef();

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      [0.39, 0.4, 0.95],  // indigo
      [0.55, 0.36, 0.96],  // purple
      [0.23, 0.51, 0.96],  // blue
      [0.93, 0.45, 0.1],   // orange
      [0.13, 0.72, 0.38],  // green
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 7;
      pos[i * 3 + 1] = Math.random() * 3.5 - 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c[0];
      col[i * 3 + 1] = c[1];
      col[i * 3 + 2] = c[2];
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const posAttr = particlesRef.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      const y = posAttr.getY(i);
      posAttr.setY(
        i,
        y + Math.sin(state.clock.elapsedTime * 0.15 + i * 0.7) * 0.0004
      );
      const x = posAttr.getX(i);
      posAttr.setX(
        i,
        x + Math.cos(state.clock.elapsedTime * 0.1 + i * 0.5) * 0.0002
      );
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}
