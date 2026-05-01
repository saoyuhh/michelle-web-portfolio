"use client";

import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer, ContactShadows } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

extend({ MeshLineGeometry, MeshLineMaterial });

const GLTF_PATH = '/assets/card.glb';
const TEXTURE_PATH = '/assets/lanyard.png';

export default function Lanyard({ isHackerMode }) {
  return (
    <div className="absolute inset-0 w-full h-full" style={{ zIndex: 50, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [1.5, 1, 17], fov: 25 }}
        gl={{ toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.4 }}
        style={{ pointerEvents: 'auto' }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[0, 5, 5]} intensity={1.1} />
        <Physics interpolate gravity={[0, -60, 0]} timeStep={1 / 60}>
          <Band isHackerMode={isHackerMode} />
        </Physics>
        <ContactShadows opacity={0.2} blur={2} far={10} resolution={256} color="#000000" position={[0, -8, 0]} />
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 10, isHackerMode }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef(), hookRef = useRef(); // prettier-ignore
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3(); // prettier-ignore
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 2.5, linearDamping: 2.5 };
  const { scene } = useGLTF(GLTF_PATH);
  const texture = useTexture(TEXTURE_PATH);
  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3()
  ]));
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useSphericalJoint(fixed, j1, [[0, 0, 0], [0, 0, 0]]); // prettier-ignore
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 2.25]); // prettier-ignore
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 2.25]); // prettier-ignore
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.8, 0]]); // 0.6 for the card hole attachment

  useEffect(() => {
    if (card.current) {
      card.current.applyImpulse({ x: (Math.random() - 0.5) * 1, y: 2, z: 2 }, true);
      card.current.applyTorqueImpulse({
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
        z: (Math.random() - 0.5) * 2
      }, true);
    }
  }, []);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.roughness = 0.4;
          child.material.metalness = 0;
          if (child.material.map) {
            child.material.map.anisotropy = 16;
            child.material.map.colorSpace = THREE.SRGBColorSpace;
            child.material.map.minFilter = THREE.LinearMipmapLinearFilter;
            child.material.map.magFilter = THREE.LinearFilter;
            child.material.map.generateMipmaps = true;
          }
        }
      });
    }
  }, [scene]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });

      // Update curve points (0 = top, 4 = bottom/hook)
      // Since band is now inside the group at [2.5, 4.5], top is [0,0,0]
      const topPos = new THREE.Vector3(0, 0, 0);
      const bottomPos = new THREE.Vector3();
      if (hookRef.current) {
        hookRef.current.getWorldPosition(bottomPos);
        band.current.worldToLocal(bottomPos);
      }


      curve.points[0].copy(topPos);
      // NOTE: DO NOT CHANGE THIS TO j1.current.translation() DIRECTLY AS IT WILL CAUSE TYPEERROR
      curve.points[1].lerpVectors(topPos, bottomPos, 0.25);
      curve.points[2].lerpVectors(topPos, bottomPos, 0.5);
      curve.points[3].lerpVectors(topPos, bottomPos, 0.75);
      curve.points[4].copy(bottomPos);


      band.current.geometry.setPoints(curve.getPoints(32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 16;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;

  return (
    <>
      <group position={[3, 5.5, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed"
          position={[0, 0, 0]} />

        <RigidBody position={[-0.4, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[-0.4, -2.25, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[-0.4, -4.5, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
          enabledRotations={[false, false, true]}
          angularDamping={3.5}
          linearDamping={3.0}
          restitution={0.5}
          position={[3, -5.95, 0]}
        >
          <CuboidCollider args={[0.5, 0.45, 0.02]} />
          <group ref={hookRef} position={[0, 1.6, 0]} />
          <group
            scale={2.4}
            position={[0.3, -1.1, 0.01]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e) => (e.target.setPointerCapture(e.pointerId), drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))}
          >
            <primitive object={scene} />
          </group>
        </RigidBody>
        <mesh ref={band}>
          <meshLineGeometry />
          <meshLineMaterial color={isHackerMode ? '#32CD32' : '#ffffff'} depthTest={false} resolution={[width, height]} useMap map={texture} repeat={[-3, 1]} lineWidth={0.9} />
        </mesh>
      </group>
    </>
  );
}

useGLTF.preload(GLTF_PATH);
useTexture.preload(TEXTURE_PATH);
