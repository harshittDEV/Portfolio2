import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Desk, Laptop, DeskLamp, FlowerPlant, Notebook, Pen, Mug } from './DeskObjects';
import { Ground, Wall, FloatingParticles } from './Environment';
import CameraController from './CameraController';
import { useIsMobile, usePrefersReducedMotion } from '../../hooks/useAnimations';

function SceneContent({ isMobile }) {
  return (
    <>
      <CameraController />

      {/* Lighting — bright, warm with colorful accents */}
      <ambientLight intensity={0.65} color="#f8f4ff" />

      {/* Main sun light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        color="#fff8f0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.1}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.001}
      />

      {/* Fill light — slightly purple */}
      <directionalLight
        position={[-4, 5, -2]}
        intensity={0.4}
        color="#e8d8f8"
      />

      {/* Accent rim light — warm */}
      <directionalLight
        position={[0, 2, 6]}
        intensity={0.25}
        color="#ffeedd"
      />

      {/* Environment */}
      <Ground />
      <Wall />

      {/* Desk & Objects */}
      <Desk />
      <Laptop />
      <DeskLamp />
      <FlowerPlant />
      <Notebook />
      <Pen />

      {/* Extra detail on desktop */}
      {!isMobile && (
        <>
          <Mug />
          <FloatingParticles count={30} />
        </>
      )}
    </>
  );
}

export default function Scene() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();

  const dpr = useMemo(() => {
    if (isMobile) return [1, 1.5];
    return [1, 2];
  }, [isMobile]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="canvas-container" aria-hidden="true">
      <Canvas
        dpr={dpr}
        shadows
        camera={{
          fov: 35,
          near: 0.1,
          far: 100,
          position: [3, 2.5, 5],
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContent isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
