import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Desk — warm wood with beveled edges
 */
export function Desk() {
  const deskMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#b8946a',
        roughness: 0.55,
        metalness: 0.05,
      }),
    []
  );

  const legMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2a2a28',
        roughness: 0.3,
        metalness: 0.5,
      }),
    []
  );

  const legPositions = [
    [-2.1, -0.64, -1.25],
    [2.1, -0.64, -1.25],
    [-2.1, -0.64, 1.25],
    [2.1, -0.64, 1.25],
  ];

  return (
    <group position={[0, -0.5, 0]}>
      {/* Desk top */}
      <mesh material={deskMaterial} castShadow receiveShadow>
        <boxGeometry args={[4.8, 0.1, 2.9]} />
      </mesh>
      {/* Desk edge bevel/trim */}
      <mesh position={[0, -0.05, 0]} castShadow>
        <boxGeometry args={[4.85, 0.02, 2.95]} />
        <meshStandardMaterial color="#9a7a5a" roughness={0.5} metalness={0.1} />
      </mesh>
      {/* Legs */}
      {legPositions.map((pos, i) => (
        <mesh key={i} material={legMaterial} position={pos} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 1.28, 12]} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Laptop — open with glowing screen, this is the centerpiece
 */
export function Laptop() {
  const screenGlowRef = useRef();

  // Subtle screen pulse
  useFrame((state) => {
    if (screenGlowRef.current) {
      screenGlowRef.current.emissiveIntensity =
        0.35 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    }
  });

  const baseMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#c0c0c0',
        roughness: 0.25,
        metalness: 0.7,
      }),
    []
  );

  const screenBackMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#b0b0b0',
        roughness: 0.25,
        metalness: 0.7,
      }),
    []
  );

  const displayMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1e293b',
        roughness: 0.05,
        metalness: 0.1,
        emissive: '#6366f1',
        emissiveIntensity: 0.35,
      }),
    []
  );

  const keyboardMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#333333',
        roughness: 0.5,
        metalness: 0.3,
      }),
    []
  );

  const trackpadMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#888888',
        roughness: 0.2,
        metalness: 0.5,
      }),
    []
  );

  const openAngle = 1.7;

  return (
    <group position={[0, -0.42, -0.1]}>
      {/* Base */}
      <mesh material={baseMaterial} castShadow>
        <boxGeometry args={[1.7, 0.04, 1.15]} />
      </mesh>
      {/* Keyboard */}
      <mesh
        material={keyboardMaterial}
        position={[0, 0.021, -0.1]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[1.4, 0.65]} />
      </mesh>
      {/* Trackpad */}
      <mesh
        material={trackpadMaterial}
        position={[0, 0.021, 0.32]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[0.55, 0.3]} />
      </mesh>

      {/* Screen assembly — hinged from back edge */}
      <group position={[0, 0.02, -0.575]} rotation={[-openAngle, 0, 0]}>
        {/* Screen back */}
        <mesh material={screenBackMaterial} position={[0, 0, -0.55]} castShadow>
          <boxGeometry args={[1.65, 0.025, 1.1]} />
        </mesh>
        {/* Display - the glowing screen */}
        <mesh
          position={[0, 0.014, -0.55]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[1.5, 0.98]} />
          <meshStandardMaterial
            ref={screenGlowRef}
            color="#0f172a"
            roughness={0.05}
            metalness={0.0}
            emissive="#6366f1"
            emissiveIntensity={0.35}
          />
        </mesh>
        {/* Screen bezel lines (subtle) */}
        <mesh
          position={[0, 0.015, -0.05]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.08, 0.008]} />
          <meshStandardMaterial color="#555" roughness={0.3} metalness={0.3} />
        </mesh>
      </group>

      {/* Screen glow light */}
      <pointLight
        position={[0, 0.5, -0.8]}
        intensity={0.5}
        color="#818cf8"
        distance={2.5}
        decay={2}
      />
    </group>
  );
}

/**
 * Desk Lamp — modern design
 */
export function DeskLamp() {
  const lightRef = useRef();

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.intensity =
        0.8 + Math.sin(state.clock.elapsedTime * 0.4) * 0.03;
    }
  });

  const metalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1a18',
        roughness: 0.3,
        metalness: 0.7,
      }),
    []
  );

  const shadeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#f5efe6',
        roughness: 0.7,
        metalness: 0.0,
        side: THREE.DoubleSide,
      }),
    []
  );

  return (
    <group position={[2.1, -0.42, -1.0]}>
      <mesh material={metalMaterial} castShadow>
        <cylinderGeometry args={[0.13, 0.16, 0.035, 20]} />
      </mesh>
      <mesh material={metalMaterial} position={[0, 0.38, 0]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 0.75, 8]} />
      </mesh>
      <mesh material={shadeMaterial} position={[0, 0.7, 0]}>
        <coneGeometry args={[0.16, 0.22, 20, 1, true]} />
      </mesh>
      <pointLight
        ref={lightRef}
        position={[0, 0.6, 0]}
        intensity={0.8}
        color="#fff3e0"
        distance={3.5}
        decay={2}
      />
    </group>
  );
}

/**
 * Realistic potted flower/plant with colored blooms
 */
export function FlowerPlant() {
  const leafRef = useRef();

  useFrame((state) => {
    if (leafRef.current) {
      leafRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.25) * 0.03;
      leafRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.15) * 0.01;
    }
  });

  const potMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#c4856c',
        roughness: 0.75,
        metalness: 0.0,
      }),
    []
  );

  const potRimMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#d49a82',
        roughness: 0.7,
        metalness: 0.0,
      }),
    []
  );

  const soilMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#4a3a2a',
        roughness: 0.95,
        metalness: 0.0,
      }),
    []
  );

  const stemMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#3a7a3a',
        roughness: 0.7,
        metalness: 0.0,
      }),
    []
  );

  const leafMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#4a9a4a',
        roughness: 0.6,
        metalness: 0.0,
      }),
    []
  );

  const flowerColors = ['#ec4899', '#f97316', '#eab308', '#8b5cf6', '#3b82f6'];

  return (
    <group position={[-1.9, -0.42, -1.0]}>
      {/* Pot */}
      <mesh material={potMaterial} castShadow>
        <cylinderGeometry args={[0.11, 0.085, 0.2, 16]} />
      </mesh>
      {/* Pot rim */}
      <mesh material={potRimMaterial} position={[0, 0.1, 0]}>
        <torusGeometry args={[0.11, 0.015, 8, 20]} />
      </mesh>
      {/* Soil */}
      <mesh material={soilMaterial} position={[0, 0.09, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
      </mesh>

      {/* Plant with leaves and flowers */}
      <group ref={leafRef} position={[0, 0.15, 0]}>
        {/* Main stems and leaves */}
        {[0, 72, 144, 216, 288].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const height = 0.06 + i * 0.04;
          return (
            <group key={i}>
              {/* Stem */}
              <mesh
                material={stemMaterial}
                position={[
                  Math.cos(rad) * 0.03,
                  height / 2,
                  Math.sin(rad) * 0.03,
                ]}
              >
                <cylinderGeometry args={[0.005, 0.005, height + 0.12, 6]} />
              </mesh>
              {/* Leaf */}
              <mesh
                material={leafMaterial}
                position={[
                  Math.cos(rad) * 0.06,
                  height * 0.6,
                  Math.sin(rad) * 0.06,
                ]}
                rotation={[0.4, rad, 0.3]}
              >
                <sphereGeometry args={[0.035, 8, 6]} />
              </mesh>
              {/* Flower bloom */}
              <mesh
                position={[
                  Math.cos(rad) * 0.04,
                  height + 0.08,
                  Math.sin(rad) * 0.04,
                ]}
              >
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshStandardMaterial
                  color={flowerColors[i]}
                  roughness={0.5}
                  metalness={0.0}
                  emissive={flowerColors[i]}
                  emissiveIntensity={0.15}
                />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

/**
 * Notebook
 */
export function Notebook() {
  const coverMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#6366f1',
        roughness: 0.6,
        metalness: 0.1,
      }),
    []
  );

  const pagesMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#f8fafc',
        roughness: 0.9,
        metalness: 0.0,
      }),
    []
  );

  return (
    <group position={[1.3, -0.44, 0.5]} rotation={[0, 0.2, 0]}>
      <mesh material={coverMaterial} castShadow>
        <boxGeometry args={[0.52, 0.025, 0.72]} />
      </mesh>
      <mesh material={pagesMaterial} position={[0, 0.013, 0]}>
        <boxGeometry args={[0.5, 0.018, 0.7]} />
      </mesh>
    </group>
  );
}

/**
 * Pen
 */
export function Pen() {
  const penMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#6366f1',
        roughness: 0.25,
        metalness: 0.6,
      }),
    []
  );

  const clipMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#c0c0c0',
        roughness: 0.2,
        metalness: 0.8,
      }),
    []
  );

  return (
    <group position={[1.7, -0.43, 0.4]} rotation={[0, 0.7, Math.PI / 2]}>
      <mesh material={penMaterial} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 0.38, 8]} />
      </mesh>
      <mesh material={clipMaterial} position={[0, -0.19, 0]}>
        <coneGeometry args={[0.012, 0.035, 8]} />
      </mesh>
    </group>
  );
}

/**
 * Coffee mug with steam
 */
export function Mug() {
  const steamRef = useRef();

  useFrame((state) => {
    if (steamRef.current) {
      steamRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      const positions = steamRef.current.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const y = positions.getY(i);
        positions.setY(
          i,
          y + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.0002
        );
      }
      positions.needsUpdate = true;
    }
  });

  const mugMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#fafafa',
        roughness: 0.4,
        metalness: 0.1,
      }),
    []
  );

  const coffeeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#3a2a1a',
        roughness: 0.15,
        metalness: 0.0,
      }),
    []
  );

  // Steam particles
  const steamPositions = useMemo(() => {
    const pos = new Float32Array(15 * 3);
    for (let i = 0; i < 15; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.04;
      pos[i * 3 + 1] = Math.random() * 0.12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.04;
    }
    return pos;
  }, []);

  return (
    <group position={[-1.1, -0.42, 0.7]}>
      <mesh material={mugMaterial} castShadow>
        <cylinderGeometry args={[0.06, 0.052, 0.14, 20]} />
      </mesh>
      <mesh material={coffeeMaterial} position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.005, 20]} />
      </mesh>
      {/* Handle */}
      <mesh material={mugMaterial} position={[0.085, 0, 0]}>
        <torusGeometry args={[0.032, 0.008, 8, 16, Math.PI]} />
      </mesh>
      {/* Steam */}
      <points ref={steamRef} position={[0, 0.1, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={15}
            array={steamPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.006}
          color="#ffffff"
          transparent
          opacity={0.2}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
