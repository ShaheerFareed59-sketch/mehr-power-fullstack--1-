"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 1.1, 9);

    function size() {
      const w = container!.clientWidth;
      const h = container!.clientHeight;
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, reduceMotion ? 1 : 2));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    // Lights
    scene.add(new THREE.AmbientLight(0x2a3a30, 1.1));
    const sun = new THREE.PointLight(0xe7a23d, 2.4, 20);
    sun.position.set(4, 5, 4);
    scene.add(sun);
    const tealLight = new THREE.PointLight(0x45d9a4, 1.8, 14);
    tealLight.position.set(-3, -1, 3);
    scene.add(tealLight);

    // Solar panel group
    const panelGroup = new THREE.Group();
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x1c2620, metalness: 0.4, roughness: 0.6 });
    const cellMat = new THREE.MeshStandardMaterial({
      color: 0x0e2a3a,
      metalness: 0.6,
      roughness: 0.25,
      emissive: 0x0a3a4a,
      emissiveIntensity: 0.25
    });
    panelGroup.add(new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.08, 3.0), frameMat));

    const cols = 6;
    const rows = 4;
    const gap = 0.06;
    const cw = (4.4 - gap * (cols + 1)) / cols;
    const ch = (3.0 - gap * (rows + 1)) / rows;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const cell = new THREE.Mesh(new THREE.BoxGeometry(cw, 0.05, ch), cellMat);
        cell.position.set(
          -4.4 / 2 + gap + cw / 2 + i * (cw + gap),
          0.05,
          -3.0 / 2 + gap + ch / 2 + j * (ch + gap)
        );
        panelGroup.add(cell);
      }
    }
    panelGroup.rotation.x = -0.55;
    panelGroup.rotation.z = 0.12;
    panelGroup.position.set(-0.6, 0.4, 0);
    scene.add(panelGroup);

    // Battery
    const battMat = new THREE.MeshStandardMaterial({
      color: 0x223327,
      metalness: 0.3,
      roughness: 0.4,
      emissive: 0x1c5c44,
      emissiveIntensity: 0.5
    });
    const battery = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 1.5, 24), battMat);
    scene.add(battery);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0x45d9a4,
      metalness: 0.5,
      roughness: 0.3,
      emissive: 0x45d9a4,
      emissiveIntensity: 0.6
    });
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.44, 0.06, 24), capMat);
    cap.position.y = 0.78;
    battery.add(cap);

    // Energy ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(3.1, 0.012, 8, 90),
      new THREE.MeshBasicMaterial({ color: 0xe7a23d, transparent: true, opacity: 0.35 })
    );
    ring.rotation.x = Math.PI / 2.3;
    scene.add(ring);

    // Particles
    const particleCount = reduceMotion ? 0 : 60;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5 + 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: 0xe7a23d, size: 0.028, transparent: true, opacity: 0.55 })
    );
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMouseMove);

    size();
    window.addEventListener("resize", size);

    let angle = 0;
    let frameId: number;
    function animate() {
      if (!reduceMotion) {
        angle += 0.0038;
        panelGroup.rotation.y = Math.sin(angle * 0.6) * 0.22;

        const orbitR = 3.0;
        battery.position.set(
          Math.cos(angle * 0.7 + 1.2) * orbitR * 0.62 + 1.4,
          Math.sin(angle * 1.1) * 0.4 - 0.2,
          Math.sin(angle * 0.7 + 1.2) * orbitR * 0.62 - 0.8
        );
        battery.rotation.y += 0.01;

        ring.rotation.z += 0.0015;
        particles.rotation.y += 0.0008;

        camera.position.x += (mouseX * 1.4 - camera.position.x) * 0.03;
        camera.position.y += (1.1 - mouseY * 0.8 - camera.position.y) * 0.03;
        camera.lookAt(0, 0.3, 0);
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", size);
      window.removeEventListener("mousemove", onMouseMove);
      pGeo.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas id="hero-canvas" ref={canvasRef} />;
}
