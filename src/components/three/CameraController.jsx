import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Camera controller that responds to scroll position.
 * The camera slowly moves around the desk as the user scrolls.
 */
export default function CameraController() {
  const { camera } = useThree();
  const scrollRef = useRef(0);
  const targetRef = useRef({
    x: 3,
    y: 2.5,
    z: 5,
    lookX: 0,
    lookY: -0.3,
    lookZ: 0,
  });
  const currentRef = useRef({ ...targetRef.current });

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    const scroll = scrollRef.current;

    // Camera positions at different scroll points
    // Start: Overview of desk
    // Middle: Closer, focused on work area
    // End: Pulled back, more open
    const t = scroll;

    // Smooth interpolation between key frames
    if (t < 0.3) {
      // Opening → Introduction
      const p = t / 0.3;
      targetRef.current.x = THREE.MathUtils.lerp(3, 2, p);
      targetRef.current.y = THREE.MathUtils.lerp(2.5, 2.0, p);
      targetRef.current.z = THREE.MathUtils.lerp(5, 4.5, p);
      targetRef.current.lookY = THREE.MathUtils.lerp(-0.3, -0.4, p);
    } else if (t < 0.6) {
      // Work → Stack
      const p = (t - 0.3) / 0.3;
      targetRef.current.x = THREE.MathUtils.lerp(2, 1, p);
      targetRef.current.y = THREE.MathUtils.lerp(2.0, 2.2, p);
      targetRef.current.z = THREE.MathUtils.lerp(4.5, 5, p);
      targetRef.current.lookY = THREE.MathUtils.lerp(-0.4, -0.3, p);
    } else {
      // Journey → Contact
      const p = (t - 0.6) / 0.4;
      targetRef.current.x = THREE.MathUtils.lerp(1, 2.5, p);
      targetRef.current.y = THREE.MathUtils.lerp(2.2, 3.0, p);
      targetRef.current.z = THREE.MathUtils.lerp(5, 6, p);
      targetRef.current.lookY = THREE.MathUtils.lerp(-0.3, -0.2, p);
    }

    // Smooth lerp
    const lerpSpeed = 0.03;
    currentRef.current.x = THREE.MathUtils.lerp(
      currentRef.current.x,
      targetRef.current.x,
      lerpSpeed
    );
    currentRef.current.y = THREE.MathUtils.lerp(
      currentRef.current.y,
      targetRef.current.y,
      lerpSpeed
    );
    currentRef.current.z = THREE.MathUtils.lerp(
      currentRef.current.z,
      targetRef.current.z,
      lerpSpeed
    );
    currentRef.current.lookY = THREE.MathUtils.lerp(
      currentRef.current.lookY,
      targetRef.current.lookY,
      lerpSpeed
    );

    camera.position.set(
      currentRef.current.x,
      currentRef.current.y,
      currentRef.current.z
    );
    camera.lookAt(
      targetRef.current.lookX,
      currentRef.current.lookY,
      targetRef.current.lookZ
    );
  });

  return null;
}
