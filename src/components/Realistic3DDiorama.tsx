import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Compass, Eye, Sparkles } from 'lucide-react';

interface Realistic3DDioramaProps {
  sceneType: 'university_route' | 'safe_map' | 'problem' | 'verification' | 'ecosystem' | 'community' | 'business' | 'roadmap';
  className?: string;
  autoRotate?: boolean;
}

export const Realistic3DDiorama: React.FC<Realistic3DDioramaProps> = ({
  sceneType,
  className = '',
  autoRotate = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rootGroupRef = useRef<THREE.Group | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const rotationVelocity = useRef({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Isometric Orthographic Camera
    const aspect = width / height;
    const frustumSize = 14;
    const camera = new THREE.OrthographicCamera(
      (-frustumSize * aspect) / 2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      -frustumSize / 2,
      0.1,
      1000
    );
    // True isometric camera orientation (elevated 35.264°, rotated 45°)
    camera.position.set(20, 20, 20);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer with High-Fidelity Studio Shadows & ACES Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
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

    // 4. Studio Lighting Architecture
    // Key Sun Light (Warm studio light casting soft crisp shadows)
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.4);
    keyLight.position.set(16, 26, 14);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 60;
    keyLight.shadow.camera.left = -12;
    keyLight.shadow.camera.right = 12;
    keyLight.shadow.camera.top = 12;
    keyLight.shadow.camera.bottom = -12;
    keyLight.shadow.bias = -0.0004;
    keyLight.shadow.radius = 2.5;
    scene.add(keyLight);

    // Cool Sky / Rim Fill Light (Gentle cyan/blue rim on architecture)
    const rimLight = new THREE.DirectionalLight(0xdbeafe, 1.2);
    rimLight.position.set(-18, 16, -16);
    scene.add(rimLight);

    // Warm Ambient Fill (Ensures soft, readable architectural shadows)
    const ambientLight = new THREE.AmbientLight(0xfdfbf7, 0.95);
    scene.add(ambientLight);

    // 5. Root Group for Scene Objects
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    rootGroupRef.current = rootGroup;

    // Shared Palette Materials
    const plasterMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f0e8,
      roughness: 0.85,
      metalness: 0.05
    });

    const darkNavyMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a192f,
      roughness: 0.35,
      metalness: 0.2
    });

    const tealMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f766e,
      roughness: 0.3,
      metalness: 0.1
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.25,
      metalness: 0.6
    });

    const glassMaterial = new THREE.MeshStandardMaterial({
      color: 0xcffafe,
      roughness: 0.1,
      metalness: 0.4,
      transparent: true,
      opacity: 0.85
    });

    const windowGlowMaterial = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xfde047,
      emissiveIntensity: 0.8,
      roughness: 0.2
    });

    const streetMaterial = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.9
    });

    const greenLawnMaterial = new THREE.MeshStandardMaterial({
      color: 0xdcfce7,
      roughness: 0.8
    });

    const treeFoliageMaterial = new THREE.MeshStandardMaterial({
      color: 0x15803d,
      roughness: 0.7
    });

    const treeWoodMaterial = new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.9
    });

    // Helper: Add Miniature Realistic Tree
    const addTree = (x: number, z: number, scale = 1) => {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(x, 0.4, z);

      // Trunk
      const trunkGeo = new THREE.CylinderGeometry(0.08 * scale, 0.12 * scale, 0.6 * scale, 8);
      const trunk = new THREE.Mesh(trunkGeo, treeWoodMaterial);
      trunk.position.y = 0.3 * scale;
      trunk.castShadow = true;
      trunk.receiveShadow = true;
      treeGroup.add(trunk);

      // Geometric / Architectural Spherical Foliage
      const foliageGeo = new THREE.DodecahedronGeometry(0.45 * scale, 1);
      const foliage = new THREE.Mesh(foliageGeo, treeFoliageMaterial);
      foliage.position.y = 0.8 * scale;
      foliage.castShadow = true;
      foliage.receiveShadow = true;
      treeGroup.add(foliage);

      rootGroup.add(treeGroup);
    };

    // Helper: Add Realistic Streetlight with Warm Glowing PointLight
    const addStreetLamp = (x: number, z: number) => {
      const lampGroup = new THREE.Group();
      lampGroup.position.set(x, 0.4, z);

      const poleGeo = new THREE.CylinderGeometry(0.04, 0.05, 1.2, 8);
      const pole = new THREE.Mesh(poleGeo, darkNavyMaterial);
      pole.position.y = 0.6;
      pole.castShadow = true;
      lampGroup.add(pole);

      const headGeo = new THREE.BoxGeometry(0.18, 0.06, 0.18);
      const head = new THREE.Mesh(headGeo, goldMaterial);
      head.position.y = 1.2;
      lampGroup.add(head);

      // Glowing bulb
      const bulbGeo = new THREE.SphereGeometry(0.06, 8, 8);
      const bulb = new THREE.Mesh(bulbGeo, windowGlowMaterial);
      bulb.position.y = 1.15;
      lampGroup.add(bulb);

      // Actual soft point light pool
      const light = new THREE.PointLight(0xfef08a, 1.4, 3.5, 1.8);
      light.position.y = 1.1;
      lampGroup.add(light);

      rootGroup.add(lampGroup);
    };

    // -------------------------------------------------------------
    // BUILD THE ISOMETRIC PODIUM PLINTH
    // -------------------------------------------------------------
    // Beveled Main Architectural Base
    const plinthGeo = new THREE.BoxGeometry(10.5, 0.8, 10.5);
    const plinth = new THREE.Mesh(plinthGeo, plasterMaterial);
    plinth.position.y = 0;
    plinth.receiveShadow = true;
    plinth.castShadow = true;
    rootGroup.add(plinth);

    // Subtle dark base rim
    const plinthBaseGeo = new THREE.BoxGeometry(10.8, 0.15, 10.8);
    const plinthBase = new THREE.Mesh(plinthBaseGeo, darkNavyMaterial);
    plinthBase.position.y = -0.42;
    plinthBase.receiveShadow = true;
    rootGroup.add(plinthBase);

    // Shadow Receiver Ground Plane
    const shadowFloorGeo = new THREE.PlaneGeometry(30, 30);
    const shadowFloorMat = new THREE.ShadowMaterial({ opacity: 0.18 });
    const shadowFloor = new THREE.Mesh(shadowFloorGeo, shadowFloorMat);
    shadowFloor.rotation.x = -Math.PI / 2;
    shadowFloor.position.y = -0.52;
    shadowFloor.receiveShadow = true;
    scene.add(shadowFloor);

    // -------------------------------------------------------------
    // BUILD SCENE SPECIFIC ARCHITECTURAL COMPOSITIONS
    // -------------------------------------------------------------
    if (sceneType === 'university_route') {
      // 1. Classical University Campus (Left side)
      const uniGroup = new THREE.Group();
      uniGroup.position.set(-2.8, 0.4, -1.8);

      // Portico steps
      const stepsGeo = new THREE.BoxGeometry(2.4, 0.12, 1.8);
      const steps = new THREE.Mesh(stepsGeo, plasterMaterial);
      steps.position.y = 0.06;
      steps.castShadow = true;
      steps.receiveShadow = true;
      uniGroup.add(steps);

      // Main university building mass
      const uniBodyGeo = new THREE.BoxGeometry(2.2, 1.6, 1.4);
      const uniBody = new THREE.Mesh(uniBodyGeo, plasterMaterial);
      uniBody.position.y = 0.9;
      uniBody.castShadow = true;
      uniBody.receiveShadow = true;
      uniGroup.add(uniBody);

      // Classical triangular pediment roof
      const pedimentShape = new THREE.Shape();
      pedimentShape.moveTo(-1.2, 0);
      pedimentShape.lineTo(0, 0.8);
      pedimentShape.lineTo(1.2, 0);
      pedimentShape.closePath();
      const pedimentGeo = new THREE.ExtrudeGeometry(pedimentShape, { depth: 1.5, bevelEnabled: false });
      const pediment = new THREE.Mesh(pedimentGeo, tealMaterial);
      pediment.rotation.y = Math.PI / 2;
      pediment.position.set(0.75, 1.7, -1.2);
      pediment.castShadow = true;
      uniGroup.add(pediment);

      // Classical Portico Columns (4 fluted columns)
      for (let i = -0.8; i <= 0.8; i += 0.53) {
        const colGeo = new THREE.CylinderGeometry(0.07, 0.08, 1.2, 12);
        const col = new THREE.Mesh(colGeo, plasterMaterial);
        col.position.set(i, 0.7, 0.75);
        col.castShadow = true;
        uniGroup.add(col);
      }

      // Windows
      for (let y = 0.6; y <= 1.3; y += 0.5) {
        for (let x = -0.7; x <= 0.7; x += 0.7) {
          const winGeo = new THREE.BoxGeometry(0.28, 0.32, 0.05);
          const win = new THREE.Mesh(winGeo, windowGlowMaterial);
          win.position.set(x, y, 0.71);
          uniGroup.add(win);
        }
      }

      rootGroup.add(uniGroup);

      // 2. Modern Glass Workplace & Education Center (Right side)
      const workGroup = new THREE.Group();
      workGroup.position.set(2.6, 0.4, 1.6);

      const workTower1Geo = new THREE.BoxGeometry(1.8, 2.8, 1.6);
      const workTower1 = new THREE.Mesh(workTower1Geo, tealMaterial);
      workTower1.position.y = 1.4;
      workTower1.castShadow = true;
      workTower1.receiveShadow = true;
      workGroup.add(workTower1);

      // Glass Facade wrap
      const glassFacadeGeo = new THREE.BoxGeometry(1.6, 2.4, 0.06);
      const glassFacade = new THREE.Mesh(glassFacadeGeo, glassMaterial);
      glassFacade.position.set(0, 1.4, 0.81);
      workGroup.add(glassFacade);

      // Secondary stepped office wing
      const workTower2Geo = new THREE.BoxGeometry(1.4, 1.8, 1.2);
      const workTower2 = new THREE.Mesh(workTower2Geo, plasterMaterial);
      workTower2.position.set(-1.2, 0.9, 0.2);
      workTower2.castShadow = true;
      workTower2.receiveShadow = true;
      workGroup.add(workTower2);

      // Verified Audit Badge on Building
      const badgeGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.08, 16);
      const badge = new THREE.Mesh(badgeGeo, goldMaterial);
      badge.rotation.x = Math.PI / 2;
      badge.position.set(0, 2.5, 0.83);
      workGroup.add(badge);

      rootGroup.add(workGroup);

      // 3. Illuminated S-Curved Safe Route Corridor
      const pathCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.8, 0.42, -0.6),
        new THREE.Vector3(-1.2, 0.42, 0.4),
        new THREE.Vector3(0.5, 0.42, 0.2),
        new THREE.Vector3(1.8, 0.42, 1.2),
      ]);

      // Base asphalt track
      const pathGeo = new THREE.TubeGeometry(pathCurve, 32, 0.35, 8, false);
      const pathMesh = new THREE.Mesh(pathGeo, streetMaterial);
      pathMesh.receiveShadow = true;
      rootGroup.add(pathMesh);

      // Glowing Teal Ribbon Centerline
      const glowLineGeo = new THREE.TubeGeometry(pathCurve, 32, 0.1, 8, false);
      const glowLineMat = new THREE.MeshStandardMaterial({
        color: 0x14b8a6,
        emissive: 0x0d9488,
        emissiveIntensity: 0.9,
        roughness: 0.2
      });
      const glowLine = new THREE.Mesh(glowLineGeo, glowLineMat);
      rootGroup.add(glowLine);

      // Streetlights along the path
      addStreetLamp(-1.8, 0.9);
      addStreetLamp(0.1, -0.4);
      addStreetLamp(1.5, 0.4);

      // Miniature trees and greenery
      addTree(-3.8, 0.5, 1.1);
      addTree(-1.5, -2.2, 0.9);
      addTree(3.8, -0.5, 1.2);
      addTree(0.8, 2.5, 1.0);
      addTree(-0.2, 3.2, 0.85);

    } else if (sceneType === 'safe_map' || sceneType === 'problem') {
      // City Grid with Protected Green Walking Corridor & 24/7 Safe Hubs
      // Roads (X and Z intersection)
      const roadXGeo = new THREE.BoxGeometry(9.6, 0.04, 1.4);
      const roadX = new THREE.Mesh(roadXGeo, streetMaterial);
      roadX.position.set(0, 0.42, 0);
      roadX.receiveShadow = true;
      rootGroup.add(roadX);

      const roadZGeo = new THREE.BoxGeometry(1.4, 0.04, 9.6);
      const roadZ = new THREE.Mesh(roadZGeo, streetMaterial);
      roadZ.position.set(0, 0.42, 0);
      roadZ.receiveShadow = true;
      rootGroup.add(roadZ);

      // Glowing Green Protected Walkway Corridor
      const walkwayGeo = new THREE.BoxGeometry(9.4, 0.06, 0.4);
      const walkwayMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x059669,
        emissiveIntensity: 0.8,
        roughness: 0.3
      });
      const walkway = new THREE.Mesh(walkwayGeo, walkwayMat);
      walkway.position.set(0, 0.45, -0.55);
      rootGroup.add(walkway);

      // Safe Hub 1: Metro Station Entrance Pavilion (Illuminated Glass)
      const metroGroup = new THREE.Group();
      metroGroup.position.set(-2.2, 0.4, -2.2);
      const metroBaseGeo = new THREE.BoxGeometry(1.6, 0.7, 1.4);
      const metroBase = new THREE.Mesh(metroBaseGeo, tealMaterial);
      metroBase.position.y = 0.35;
      metroBase.castShadow = true;
      metroGroup.add(metroBase);

      const metroRoofGeo = new THREE.BoxGeometry(1.8, 0.1, 1.6);
      const metroRoof = new THREE.Mesh(metroRoofGeo, plasterMaterial);
      metroRoof.position.y = 0.75;
      metroGroup.add(metroRoof);

      // Metro "M" sign beacon
      const mBeaconGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.08, 16);
      const mBeacon = new THREE.Mesh(mBeaconGeo, windowGlowMaterial);
      mBeacon.position.set(0, 1.1, 0);
      metroGroup.add(mBeacon);
      rootGroup.add(metroGroup);

      // Safe Hub 2: 24/7 Pharmacy with glowing medical cross
      const pharmGroup = new THREE.Group();
      pharmGroup.position.set(2.2, 0.4, 2.2);
      const pharmBodyGeo = new THREE.BoxGeometry(1.5, 1.2, 1.5);
      const pharmBody = new THREE.Mesh(pharmBodyGeo, plasterMaterial);
      pharmBody.position.y = 0.6;
      pharmBody.castShadow = true;
      pharmGroup.add(pharmBody);

      // Glowing Green Cross on facade
      const crossV = new THREE.BoxGeometry(0.12, 0.4, 0.06);
      const crossH = new THREE.BoxGeometry(0.4, 0.12, 0.06);
      const crossMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x16a34a, emissiveIntensity: 1 });
      const cVMesh = new THREE.Mesh(crossV, crossMat);
      const cHMesh = new THREE.Mesh(crossH, crossMat);
      cVMesh.position.set(0, 0.7, 0.76);
      cHMesh.position.set(0, 0.7, 0.76);
      pharmGroup.add(cVMesh);
      pharmGroup.add(cHMesh);
      rootGroup.add(pharmGroup);

      // Surrounding City Blocks
      const block1Geo = new THREE.BoxGeometry(2.4, 2.0, 2.4);
      const block1 = new THREE.Mesh(block1Geo, darkNavyMaterial);
      block1.position.set(2.4, 1.4, -2.4);
      block1.castShadow = true;
      rootGroup.add(block1);

      const block2Geo = new THREE.BoxGeometry(2.4, 1.6, 2.4);
      const block2 = new THREE.Mesh(block2Geo, plasterMaterial);
      block2.position.set(-2.4, 1.2, 2.4);
      block2.castShadow = true;
      rootGroup.add(block2);

      // Streetlights and Greenery
      addStreetLamp(-1.2, 0.9);
      addStreetLamp(1.2, -0.9);
      addStreetLamp(-3.2, 0.9);
      addStreetLamp(3.2, -0.9);

      addTree(-3.8, -1.8, 1);
      addTree(1.2, 3.2, 1.1);
      addTree(3.8, 1.2, 0.9);

    } else if (sceneType === 'verification') {
      // 5-Stage Verified Modern Corporate Architecture & Audit Gate
      const hqGroup = new THREE.Group();
      hqGroup.position.set(0, 0.4, 0);

      // Main Glass Corporate Headquarters
      const hqTowerGeo = new THREE.BoxGeometry(2.6, 3.6, 2.2);
      const hqTower = new THREE.Mesh(hqTowerGeo, plasterMaterial);
      hqTower.position.y = 1.8;
      hqTower.castShadow = true;
      hqTower.receiveShadow = true;
      hqGroup.add(hqTower);

      // Glass Curtain Facade
      const glassTowerGeo = new THREE.BoxGeometry(2.4, 3.2, 0.1);
      const glassTower = new THREE.Mesh(glassTowerGeo, glassMaterial);
      glassTower.position.set(0, 1.8, 1.12);
      hqGroup.add(glassTower);

      // Floor Spandrels
      for (let y = 0.8; y <= 3.2; y += 0.8) {
        const spandrelGeo = new THREE.BoxGeometry(2.45, 0.08, 0.12);
        const spandrel = new THREE.Mesh(spandrelGeo, darkNavyMaterial);
        spandrel.position.set(0, y, 1.13);
        hqGroup.add(spandrel);
      }

      // Security Access Gate & Turnstile Pavilion
      const gateGeo = new THREE.BoxGeometry(3.6, 0.6, 1.2);
      const gate = new THREE.Mesh(gateGeo, tealMaterial);
      gate.position.set(0, 0.3, 2.0);
      gate.castShadow = true;
      hqGroup.add(gate);

      // 5 Audit Badges / Checkpoints on Plaza
      const badgePositions = [-1.5, -0.75, 0, 0.75, 1.5];
      badgePositions.forEach((xPos) => {
        const markerGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.06, 16);
        const marker = new THREE.Mesh(markerGeo, goldMaterial);
        marker.position.set(xPos, 0.04, 3.0);
        hqGroup.add(marker);

        const pinGeo = new THREE.SphereGeometry(0.08, 8, 8);
        const pin = new THREE.Mesh(pinGeo, windowGlowMaterial);
        pin.position.set(xPos, 0.2, 3.0);
        hqGroup.add(pin);
      });

      rootGroup.add(hqGroup);

      addStreetLamp(-2.5, 1.5);
      addStreetLamp(2.5, 1.5);
      addTree(-3.2, -1.5, 1.2);
      addTree(3.2, -1.5, 1.2);
      addTree(-3.0, 2.5, 0.9);
      addTree(3.0, 2.5, 0.9);

    } else if (sceneType === 'ecosystem') {
      // Connected Job Ecosystem: University + School + Kindergarten + Tech Coworking
      // 4 Quadrants connected by crosswalks
      const q1 = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 1.8), tealMaterial);
      q1.position.set(-2.2, 1.3, -2.2);
      q1.castShadow = true;
      rootGroup.add(q1);

      const q2 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.4, 1.6), plasterMaterial);
      q2.position.set(2.2, 1.1, -2.2);
      q2.castShadow = true;
      rootGroup.add(q2);

      const q3 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.2, 1.5), goldMaterial);
      q3.position.set(-2.2, 1.0, 2.2);
      q3.castShadow = true;
      rootGroup.add(q3);

      const q4 = new THREE.Mesh(new THREE.BoxGeometry(2.0, 2.4, 2.0), darkNavyMaterial);
      q4.position.set(2.2, 1.6, 2.2);
      q4.castShadow = true;
      rootGroup.add(q4);

      // Connecting Plaza / Walkways
      const plazaGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.06, 32);
      const plaza = new THREE.Mesh(plazaGeo, greenLawnMaterial);
      plaza.position.set(0, 0.43, 0);
      rootGroup.add(plaza);

      // Central Fountain / Sculpture
      const fountGeo = new THREE.CylinderGeometry(0.4, 0.5, 0.3, 16);
      const fount = new THREE.Mesh(fountGeo, tealMaterial);
      fount.position.set(0, 0.55, 0);
      rootGroup.add(fount);

      addStreetLamp(-0.9, -0.9);
      addStreetLamp(0.9, 0.9);
      addStreetLamp(-0.9, 0.9);
      addStreetLamp(0.9, -0.9);

      addTree(0, -3.2, 1.1);
      addTree(0, 3.2, 1.1);
      addTree(-3.5, 0, 1.0);
      addTree(3.5, 0, 1.0);

    } else if (sceneType === 'community') {
      // Community & SOS: Student Peer Walking Figures & Emergency Beacon Pillar
      const plazaGeo = new THREE.BoxGeometry(8.5, 0.04, 8.5);
      const plaza = new THREE.Mesh(plazaGeo, greenLawnMaterial);
      plaza.position.set(0, 0.42, 0);
      rootGroup.add(plaza);

      // Central SOS Pillar / Safety Totem with pulsating warm light
      const totemGeo = new THREE.BoxGeometry(0.5, 2.2, 0.5);
      const totem = new THREE.Mesh(totemGeo, darkNavyMaterial);
      totem.position.set(0, 1.5, 0);
      totem.castShadow = true;
      rootGroup.add(totem);

      // Beacon Top Light (Gold emergency beacon)
      const beaconLightGeo = new THREE.SphereGeometry(0.25, 16, 16);
      const beaconLight = new THREE.Mesh(beaconLightGeo, goldMaterial);
      beaconLight.position.set(0, 2.65, 0);
      rootGroup.add(beaconLight);

      const beaconLightSource = new THREE.PointLight(0xd97706, 2.5, 6, 2);
      beaconLightSource.position.set(0, 2.65, 0);
      rootGroup.add(beaconLightSource);

      // Radial concentric safe ripple rings on floor
      for (let r = 1.2; r <= 3.6; r += 1.2) {
        const ringGeo = new THREE.RingGeometry(r, r + 0.08, 32);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x0f766e, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = -Math.PI / 2;
        ring.position.set(0, 0.45, 0);
        rootGroup.add(ring);
      }

      // Miniature Student Peer Figures (Minimalist architectural stylized figures)
      const createFigure = (x: number, z: number, colorHex: number) => {
        const figGroup = new THREE.Group();
        figGroup.position.set(x, 0.4, z);
        const bodyGeo = new THREE.CapsuleGeometry(0.1, 0.35, 4, 8);
        const bodyMat = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.5 });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.position.y = 0.35;
        body.castShadow = true;
        figGroup.add(body);

        const headGeo = new THREE.SphereGeometry(0.09, 8, 8);
        const head = new THREE.Mesh(headGeo, plasterMaterial);
        head.position.y = 0.65;
        figGroup.add(head);
        return figGroup;
      };

      rootGroup.add(createFigure(-1.2, 1.2, 0x0f766e));
      rootGroup.add(createFigure(-0.9, 1.4, 0x0a192f));
      rootGroup.add(createFigure(1.4, -1.1, 0x0f766e));
      rootGroup.add(createFigure(1.1, -1.3, 0xd97706));

      addStreetLamp(-2.8, -2.8);
      addStreetLamp(2.8, -2.8);
      addStreetLamp(-2.8, 2.8);
      addStreetLamp(2.8, 2.8);

      addTree(-3.2, 0, 1.2);
      addTree(3.2, 0, 1.2);

    } else if (sceneType === 'business') {
      // Financial Architecture: Stepped Tiered Isometric Podium & Revenue Pillars
      const tier1 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.2, 2.4), tealMaterial);
      tier1.position.set(-2.0, 1.0, 0);
      tier1.castShadow = true;
      rootGroup.add(tier1);

      const tier2 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.2, 2.4), darkNavyMaterial);
      tier2.position.set(0.6, 1.5, -1.2);
      tier2.castShadow = true;
      rootGroup.add(tier2);

      const tier3 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 3.2, 2.4), goldMaterial);
      tier3.position.set(1.8, 2.0, 1.4);
      tier3.castShadow = true;
      rootGroup.add(tier3);

      // Gold Coin / Value Discs on top of pillars
      const discGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.15, 24);
      const discMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.2 });

      const d1 = new THREE.Mesh(discGeo, discMat);
      d1.position.set(-2.0, 1.7, 0);
      rootGroup.add(d1);

      const d2 = new THREE.Mesh(discGeo, discMat);
      d2.position.set(0.6, 2.7, -1.2);
      rootGroup.add(d2);

      const d3 = new THREE.Mesh(discGeo, discMat);
      d3.position.set(1.8, 3.7, 1.4);
      rootGroup.add(d3);

      addStreetLamp(-3.2, 2.2);
      addStreetLamp(-0.5, 2.8);
      addTree(-3.5, -2.2, 1.1);
      addTree(3.5, -2.2, 1.1);

    } else {
      // Roadmap & Regional Expansion: Interconnected Regional Hubs
      // Central Tashkent Hub
      const centralHub = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.4, 2.4), darkNavyMaterial);
      centralHub.position.set(-1.0, 1.6, -1.0);
      centralHub.castShadow = true;
      rootGroup.add(centralHub);

      // Regional Hubs: Samarkand, Bukhara, Fergana
      const hub1 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.6, 1.4), tealMaterial);
      hub1.position.set(2.4, 1.2, -1.8);
      hub1.castShadow = true;
      rootGroup.add(hub1);

      const hub2 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 1.4), tealMaterial);
      hub2.position.set(-2.4, 1.1, 2.2);
      hub2.castShadow = true;
      rootGroup.add(hub2);

      const hub3 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.8, 1.6), goldMaterial);
      hub3.position.set(2.2, 1.3, 2.2);
      hub3.castShadow = true;
      rootGroup.add(hub3);

      // Glowing Connecting Light Bridge Lines
      const bridgeGeo1 = new THREE.TubeGeometry(
        new THREE.LineCurve3(new THREE.Vector3(-1.0, 1.2, -1.0), new THREE.Vector3(2.4, 1.0, -1.8)),
        16, 0.08, 8, false
      );
      const bridgeMat = new THREE.MeshStandardMaterial({ color: 0x14b8a6, emissive: 0x0f766e, emissiveIntensity: 0.8 });
      rootGroup.add(new THREE.Mesh(bridgeGeo1, bridgeMat));

      const bridgeGeo2 = new THREE.TubeGeometry(
        new THREE.LineCurve3(new THREE.Vector3(-1.0, 1.2, -1.0), new THREE.Vector3(-2.4, 0.9, 2.2)),
        16, 0.08, 8, false
      );
      rootGroup.add(new THREE.Mesh(bridgeGeo2, bridgeMat));

      const bridgeGeo3 = new THREE.TubeGeometry(
        new THREE.LineCurve3(new THREE.Vector3(-1.0, 1.2, -1.0), new THREE.Vector3(2.2, 1.0, 2.2)),
        16, 0.08, 8, false
      );
      rootGroup.add(new THREE.Mesh(bridgeGeo3, bridgeMat));

      addStreetLamp(0, 0);
      addTree(-3.5, -2.5, 1);
      addTree(3.5, 0, 1.1);
    }

    // -------------------------------------------------------------
    // RENDER LOOP & INTERACTION
    // -------------------------------------------------------------
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle continuous turntable breathing when not actively dragged
      if (rootGroupRef.current) {
        if (!isDraggingRef.current && autoRotate) {
          // Slow subtle rotation for depth perception
          rootGroupRef.current.rotation.y += 0.0025;
        }

        // Apply friction to user drag rotation
        rootGroupRef.current.rotation.y += rotationVelocity.current.x;
        rootGroupRef.current.rotation.x = Math.max(
          -0.2,
          Math.min(0.2, rootGroupRef.current.rotation.x + rotationVelocity.current.y)
        );

        rotationVelocity.current.x *= 0.92;
        rotationVelocity.current.y *= 0.92;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Mouse & Touch Interaction Handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      setIsInteracting(true);
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      rotationVelocity.current = {
        x: deltaX * 0.004,
        y: deltaY * 0.002
      };

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      setTimeout(() => setIsInteracting(false), 800);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        setIsInteracting(true);
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.current.y;

      rotationVelocity.current = {
        x: deltaX * 0.005,
        y: deltaY * 0.003
      };

      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleMouseUp);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      const newAspect = newWidth / newHeight;

      camera.left = (-frustumSize * newAspect) / 2;
      camera.right = (frustumSize * newAspect) / 2;
      camera.top = frustumSize / 2;
      camera.bottom = -frustumSize / 2;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);

      renderer.dispose();
      if (container && renderer.domElement) {
        container.innerHTML = '';
      }
    };
  }, [sceneType, autoRotate]);

  const resetRotation = () => {
    if (rootGroupRef.current) {
      rootGroupRef.current.rotation.set(0, 0, 0);
      rotationVelocity.current = { x: 0, y: 0 };
    }
  };

  return (
    <div className={`relative w-full h-full min-h-[380px] lg:min-h-[460px] flex items-center justify-center select-none overflow-hidden rounded-2xl bg-gradient-to-b from-[#FAF8F5] to-[#F1EDE4] border border-[#E7E1D4] shadow-inner ${className}`}>
      {/* Three.js Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing flex items-center justify-center"
      />

      {/* 3D Realistic Badge & Interactive Hint */}
      <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-lg border border-stone-200/80 shadow-xs text-[11px] font-semibold text-navy-900 tracking-wide">
          <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
          REAL 3D ISOMETRIC MODEL
        </div>
      </div>

      {/* Floating 3D Controls */}
      <div className="absolute bottom-4 right-4 flex items-center gap-1.5 z-10">
        <button
          onClick={resetRotation}
          title="Boshlang'ich burchakka qaytarish"
          className="p-2 bg-white/90 hover:bg-white backdrop-blur-md text-stone-700 hover:text-navy-900 rounded-lg border border-stone-200/80 shadow-xs transition-all active:scale-95"
        >
          <RotateCw className="w-4 h-4" />
        </button>
        <div className="px-2.5 py-1.5 bg-white/90 backdrop-blur-md text-[11px] text-stone-600 rounded-lg border border-stone-200/80 shadow-xs font-medium flex items-center gap-1">
          <Compass className="w-3.5 h-3.5 text-teal-700" />
          <span>Aylantirish uchun torting</span>
        </div>
      </div>
    </div>
  );
};
