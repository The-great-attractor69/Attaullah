import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ThemeConfig } from '../types/portfolio';

interface SaltMonolith3DProps {
  theme: ThemeConfig;
  className?: string;
  isInteractive?: boolean;
}

// Deterministic 3D pseudo-random noise for low-poly faceted rock displacement
function facetedRockNoise(x: number, y: number, z: number): number {
  return (
    Math.sin(x * 1.7 + y * 2.1) * 0.32 +
    Math.cos(y * 1.9 + z * 1.5) * 0.22 +
    Math.sin(z * 3.1 - x * 2.5) * 0.12
  );
}

export const SaltMonolith3D: React.FC<SaltMonolith3DProps> = ({
  theme,
  className = '',
  isInteractive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  // Three.js object references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rockBoundingSphereRef = useRef<THREE.Sphere | null>(null);
  const monolithRef = useRef<THREE.Group | null>(null);
  const reflectionMonolithRef = useRef<THREE.Group | null>(null);
  const coreLightRef = useRef<THREE.PointLight | null>(null);
  const innerCoreMeshRef = useRef<THREE.Mesh | null>(null);
  const outerRockMeshRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  // Interaction coordinates
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const dragStart = useRef({ x: 0, y: 0 });
  const rotationOffset = useRef({ x: 0.12, y: -0.35 });
  const targetRotation = useRef({ x: 0.12, y: -0.35 });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
        return;
      }
    } catch {
      setWebGLSupported(false);
      return;
    }

    // 1. Scene & Camera setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Soft distance fog matching atmospheric dusky backdrop
    scene.fog = new THREE.FogExp2(0x0b0908, 0.04);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    cameraRef.current = camera;

    // 2. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Master Group for floating monolith
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);
    monolithRef.current = masterGroup;

    // 4. Create Low-Poly Faceted Crystal Monolith Geometry
    // We use an icosahedron with moderate detail (detail: 2) converted to non-indexed geometry
    // so every triangular face has independent flat-shading normals!
    const baseGeo: THREE.BufferGeometry = new THREE.IcosahedronGeometry(1.4, 2).toNonIndexed();

    const posAttr = baseGeo.attributes.position;
    const vertex = new THREE.Vector3();

    // Displace vertices in low-poly style
    for (let i = 0; i < posAttr.count; i++) {
      vertex.fromBufferAttribute(posAttr, i);

      // Elongate vertically like a natural standing monolith
      vertex.y *= 1.58;
      vertex.x *= 0.96;
      vertex.z *= 0.92;

      // Slight taper towards top
      const heightFactor = (vertex.y + 2.0) / 4.0;
      const taper = 1.08 - heightFactor * 0.28;
      vertex.x *= taper;
      vertex.z *= taper;

      // Organic low-poly cleavage displacement
      const disp = 1.0 + facetedRockNoise(vertex.x, vertex.y, vertex.z) * 0.35;
      vertex.multiplyScalar(disp);

      posAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    baseGeo.computeVertexNormals();
    baseGeo.computeBoundingBox();
    baseGeo.computeBoundingSphere();
    const rockSphere = baseGeo.boundingSphere!.clone();
    rockBoundingSphereRef.current = rockSphere;

    // Fit camera to rock's bounding sphere with ~3% margin and no cropping
    const fitCameraToBoundingSphere = (w: number, h: number) => {
      if (!cameraRef.current || !rockBoundingSphereRef.current) return;
      const cam = cameraRef.current;
      const sphere = rockBoundingSphereRef.current;
      const aspect = w / h;
      cam.aspect = aspect;

      // 3% margin inside the box on both edges: rock occupies ~94% of the limiting viewport dimension
      const margin = 0.03;
      const marginFactor = 1 / (1 - 2 * margin); // ≈ 1.064
      const floatOffset = 0.06; // Sinusoidal levitation amplitude
      const targetRadius = (sphere.radius + floatOffset) * marginFactor;

      const vFovRad = (cam.fov * Math.PI) / 180;
      const distV = targetRadius / Math.tan(vFovRad / 2);
      const distH = distV / aspect;
      const fitDistance = Math.max(distV, distH);

      cam.position.set(sphere.center.x, sphere.center.y, sphere.center.z + fitDistance);
      cam.lookAt(sphere.center);
      cam.updateProjectionMatrix();
    };

    // Initial camera fit
    fitCameraToBoundingSphere(width, height);

    // 5. Materials
    // Outer translucent crystal rock material with flatShading: true
    const rockMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(theme.crystalColor),
      emissive: new THREE.Color(theme.innerGlowColor),
      emissiveIntensity: 0.38,
      roughness: 0.3,
      metalness: 0.05,
      transmission: 0.58,
      thickness: 1.85,
      ior: 1.54,
      specularIntensity: 0.95,
      specularColor: new THREE.Color(theme.rimColor),
      clearcoat: 0.4,
      clearcoatRoughness: 0.2,
      flatShading: true, // True low-poly crystal aesthetic
    });

    const rockMesh = new THREE.Mesh(baseGeo, rockMaterial);
    rockMesh.castShadow = true;
    rockMesh.receiveShadow = true;
    masterGroup.add(rockMesh);
    outerRockMeshRef.current = rockMesh;

    // 6. Glowing Inner Core Mesh (The inner fiery light of the salt lamp)
    const coreGeo = new THREE.IcosahedronGeometry(0.8, 1).toNonIndexed();
    const coreMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(theme.innerGlowColor),
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.scale.set(0.7, 1.25, 0.7);
    coreMesh.position.set(0, -0.05, 0);
    masterGroup.add(coreMesh);
    innerCoreMeshRef.current = coreMesh;

    // 7. Internal and Environmental Lights
    // Internal Core Point Light - casts warm light through and around the rock
    const corePointLight = new THREE.PointLight(theme.innerGlowColor, 4.4, 9);
    corePointLight.position.set(0, 0, 0);
    masterGroup.add(corePointLight);
    coreLightRef.current = corePointLight;

    // External Rim / Key Light
    const keyLight = new THREE.DirectionalLight(theme.rimColor, 1.35);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Warm front fill light
    const fillLight = new THREE.PointLight(theme.lightColor, 2.0, 8);
    fillLight.position.set(-3, 1, 3);
    scene.add(fillLight);

    // Soft ambient light
    const ambientLight = new THREE.AmbientLight(0x201610, 1.1);
    scene.add(ambientLight);

    // 8. Glossy Dark Liquid Mirror Floor & Reflection
    const floorGeo = new THREE.PlaneGeometry(24, 24);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x050403,
      roughness: 0.16,
      metalness: 0.88,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -2.25;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Reflection clone beneath the floor for true realistic liquid reflection
    const reflectionGroup = new THREE.Group();
    const reflectionRockMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(theme.crystalColor),
      emissive: new THREE.Color(theme.innerGlowColor),
      emissiveIntensity: 0.45,
      roughness: 0.4,
      metalness: 0.1,
      transparent: true,
      opacity: 0.38,
      flatShading: true,
    });
    const reflectionRockMesh = new THREE.Mesh(baseGeo.clone(), reflectionRockMat);
    reflectionRockMesh.scale.set(1, -1, 1);
    reflectionGroup.position.set(0, -4.5, 0);
    reflectionGroup.add(reflectionRockMesh);
    scene.add(reflectionGroup);
    reflectionMonolithRef.current = reflectionGroup;

    // 9. Ambient Golden Dust Motes / Particles
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 40 : 90;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 5.5;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 4.2 + 0.2;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 3.8;
      particleSpeeds[i] = 0.002 + Math.random() * 0.004;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color(theme.rimColor),
      size: 0.032,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 10. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation for mouse parallax and dragging
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      targetRotation.current.x += (rotationOffset.current.x - targetRotation.current.x) * 0.08;
      targetRotation.current.y += (rotationOffset.current.y - targetRotation.current.y) * 0.08;

      if (masterGroup) {
        // Floating sinusoidal levitation
        const floatY = Math.sin(elapsedTime * 0.8) * 0.06;
        masterGroup.position.y = floatY;

        // Auto slow rotation + user drag/parallax
        const autoRotY = elapsedTime * 0.1;
        masterGroup.rotation.y = autoRotY + targetRotation.current.y + mouse.current.x * 0.22;
        masterGroup.rotation.x = targetRotation.current.x - mouse.current.y * 0.18;
        masterGroup.rotation.z = Math.sin(elapsedTime * 0.5) * 0.02 + mouse.current.x * 0.04;

        // Sync reflection monolith
        if (reflectionMonolithRef.current) {
          reflectionMonolithRef.current.position.y = -4.5 - floatY;
          reflectionMonolithRef.current.rotation.y = masterGroup.rotation.y;
          reflectionMonolithRef.current.rotation.x = -masterGroup.rotation.x;
          reflectionMonolithRef.current.rotation.z = -masterGroup.rotation.z;
        }

        // Inner glowing core breathing pulse
        if (innerCoreMeshRef.current) {
          const pulse = 1.0 + Math.sin(elapsedTime * 1.8) * 0.08;
          innerCoreMeshRef.current.scale.set(0.7 * pulse, 1.25 * pulse, 0.7 * pulse);
        }

        if (coreLightRef.current) {
          coreLightRef.current.intensity = 4.2 + Math.sin(elapsedTime * 2.0) * 0.5;
        }
      }

      // Animate ambient particles slowly upward
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += particleSpeeds[i];
          if (positions[i * 3 + 1] > 2.6) {
            positions[i * 3 + 1] = -2.0;
          }
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
        particlesRef.current.rotation.y = elapsedTime * 0.015;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 11. Event Listeners for Interaction & Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;
      renderer.setSize(newWidth, newHeight);
      fitCameraToBoundingSphere(newWidth, newHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const rawX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const rawY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      // Smoothly clamp parallax influence so it never causes off-screen drifting
      mouse.current.targetX = Math.max(-1.5, Math.min(1.5, rawX));
      mouse.current.targetY = Math.max(-1.5, Math.min(1.5, rawY));
    };

    // ResizeObserver ensures smooth camera re-fitting on any container size change
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          renderer.setSize(w, h);
          fitCameraToBoundingSphere(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      baseGeo.dispose();
      rockMaterial.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      floorGeo.dispose();
      floorMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update theme dynamically when theme prop changes
  useEffect(() => {
    if (!outerRockMeshRef.current || !innerCoreMeshRef.current || !coreLightRef.current) return;

    const rockMat = outerRockMeshRef.current.material as THREE.MeshPhysicalMaterial;
    rockMat.color.setHex(theme.crystalColor);
    rockMat.emissive.setHex(theme.innerGlowColor);
    rockMat.specularColor.setHex(theme.rimColor);

    const coreMat = innerCoreMeshRef.current.material as THREE.MeshBasicMaterial;
    coreMat.color.setHex(theme.innerGlowColor);

    coreLightRef.current.color.setHex(theme.innerGlowColor);

    if (particlesRef.current) {
      const pMat = particlesRef.current.material as THREE.PointsMaterial;
      pMat.color.setHex(theme.rimColor);
    }
  }, [theme]);

  // Pointer Drag handlers for 360 inspect
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isInteractive) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !isInteractive) return;
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;
    dragStart.current = { x: e.clientX, y: e.clientY };

    rotationOffset.current.y += deltaX * 0.012;
    rotationOffset.current.x += deltaY * 0.012;
    rotationOffset.current.x = Math.max(-0.6, Math.min(0.6, rotationOffset.current.x));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  return (
    <div
      className={`relative w-full h-full select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className={`w-full h-full cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />

      {/* Fallback if WebGL unsupported */}
      {!webGLSupported && (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center bg-[#0e0b09]/80 backdrop-blur-md">
          <div className="max-w-xs">
            <p className="text-sm text-stone-300 mb-2">3D Faceted Monolith</p>
            <p className="text-xs text-stone-500">
              WebGL acceleration is required to render the real-time crystal monolith.
            </p>
          </div>
        </div>
      )}

      {/* Subtle interaction tip overlay */}
      <div
        className={`absolute bottom-6 right-6 text-[11px] text-stone-400 tracking-wider transition-opacity duration-300 pointer-events-none ${
          isHovered ? 'opacity-80' : 'opacity-40'
        }`}
      >
        <span className="inline-block mr-1 text-[#d97736]">✦</span> Drag to inspect 3D crystal · {theme.name}
      </div>
    </div>
  );
};
