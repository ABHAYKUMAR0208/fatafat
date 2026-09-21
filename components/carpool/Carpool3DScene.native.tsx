import { Canvas, useFrame } from '@react-three/fiber/native';
import React, { useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import * as THREE from 'three';

const CanvasNative = Canvas as unknown as React.ComponentType<any>;

const BLUE = '#3350DE';
const BLUE_DEEP = '#161F42';
const BLUE_LIGHT = '#5B8DEF';
const BLUE_ICE = '#EAF0FE';
const WHEEL = '#0F162E';

function FloatingCar() {
  const group = useRef<THREE.Group>(null!);
  const wheels = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.position.y = Math.sin(t * 1.3) * 0.12;
      group.current.rotation.y = Math.sin(t * 0.35) * 0.5 + t * 0.15;
    }
    wheels.current.forEach((wheel) => {
      if (wheel) wheel.rotation.z -= 0.04;
    });
  });

  const wheelPositions: [number, number, number][] = [
    [-0.78, -0.42, 0.58],
    [0.78, -0.42, 0.58],
    [-0.78, -0.42, -0.58],
    [0.78, -0.42, -0.58],
  ];

  return (
    <group ref={group} position={[0, 0.1, 0]}>
      {/* body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.3, 0.5, 1.1]} />
        <meshStandardMaterial color={BLUE} metalness={0.4} roughness={0.35} />
      </mesh>

      {/* cabin */}
      <mesh position={[-0.12, 0.42, 0]}>
        <boxGeometry args={[1.25, 0.42, 0.95]} />
        <meshStandardMaterial color={BLUE_ICE} metalness={0.1} roughness={0.5} />
      </mesh>

      {/* nose accent */}
      <mesh position={[1.12, -0.05, 0]}>
        <boxGeometry args={[0.12, 0.34, 0.9]} />
        <meshStandardMaterial color={BLUE_LIGHT} metalness={0.5} roughness={0.25} />
      </mesh>

      {/* wheels */}
      {wheelPositions.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) wheels.current[i] = el;
          }}
          position={pos}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.26, 0.26, 0.22, 20]} />
          <meshStandardMaterial color={WHEEL} metalness={0.3} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function OrbitDot({ radius, speed, height, color, size }: { radius: number; speed: number; height: number; color: string; size: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    if (ref.current) {
      ref.current.position.set(Math.cos(t) * radius, height + Math.sin(t * 1.8) * 0.1, Math.sin(t) * radius);
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} />
    </mesh>
  );
}

function Ground() {
  return (
    <mesh position={[0, -0.72, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[2.1, 48]} />
      <meshStandardMaterial color={BLUE_ICE} transparent opacity={0.55} />
    </mesh>
  );
}

export default function Carpool3DScene() {
  const dpr = useMemo(() => [1, 2] as [number, number], []);

  return (
    <View style={styles.wrap}>
      <CanvasNative
        dpr={dpr}
        camera={{ position: [3.1, 1.7, 3.6], fov: 38 }}
        gl={{ alpha: true, antialias: true }}
        style={styles.canvas}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[3, 4, 2]} intensity={1.1} color="#FFFFFF" />
        <directionalLight position={[-3, 2, -2]} intensity={0.35} color={BLUE_LIGHT} />

        <Ground />
        <FloatingCar />

        <OrbitDot radius={1.7} speed={0.5} height={0.6} color={BLUE_LIGHT} size={0.06} />
        <OrbitDot radius={1.9} speed={0.35} height={0.9} color={BLUE} size={0.05} />
        <OrbitDot radius={1.5} speed={0.65} height={0.3} color={BLUE_DEEP} size={0.045} />
      </CanvasNative>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%', maxWidth: 420, height: 280 },
  canvas: { flex: 1, backgroundColor: 'transparent' },
});