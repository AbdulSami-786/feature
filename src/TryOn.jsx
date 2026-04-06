import React, { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const TryOn = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(new Image());

  // Three.js refs
  const threeCanvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const glassModel3dRef = useRef(null);
  const modelWidthRef = useRef(1);
  const glbLoadedRef = useRef(false);
  const animationFrameRef = useRef(null);

  const [glasses, setGlasses] = useState("/glass1.png");
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [glbLoading, setGlbLoading] = useState(false);
  const [showCaptureFeedback, setShowCaptureFeedback] = useState(false);

  const glassOptions = [
    { id: "/glass1.png", name: "Classic", emoji: "👓", filterType: "classic" },
    { id: "/glass2.png", name: "Aviator", emoji: "🕶️", filterType: "aviator" },
    { id: "/glass3.png", name: "Sport", emoji: "🥽", filterType: "sport" },
    { id: "/glass4.png", name: "Round", emoji: "🪬", filterType: "round" },
    { id: "__3D__", name: "3D Frame", emoji: "✨", filterType: "3d", is3d: true },
  ];

  const is3D = glasses === "__3D__";

  // Preload 2D glasses images
  useEffect(() => {
    glassOptions.forEach(opt => {
      if (opt.id !== "__3D__") {
        const preloadImg = new Image();
        preloadImg.src = opt.id;
      }
    });
  }, []);

  // Three.js scene init / teardown
  useEffect(() => {
    if (!is3D) {
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
        sceneRef.current = null;
        cameraRef.current = null;
        glassModel3dRef.current = null;
        glbLoadedRef.current = false;
      }
      return;
    }

    const canvas = threeCanvasRef.current;
    if (!canvas) return;

    // Get device pixel ratio for crisp rendering
    const dpr = Math.min(window.devicePixelRatio, 2);
    
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(dpr);
    renderer.setSize(640, 480);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Orthographic camera - 1 unit = 1 pixel
    const orthoCamera = new THREE.OrthographicCamera(-320, 320, 240, -240, 0.1, 2000);
    orthoCamera.position.z = 500;
    cameraRef.current = orthoCamera;

    // Lighting for 3D model
    const ambient = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xfff5e0, 1.2);
    keyLight.position.set(2, 3, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xc9e0ff, 0.5);
    fillLight.position.set(-2, 0, 2);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0xffe0aa, 0.4);
    backLight.position.set(0, 2, -3);
    scene.add(backLight);

    setGlbLoading(true);
    const loader = new GLTFLoader();
    
    // Fallback to a sample GLB if needed - using a standard glasses model URL
    // For demo, we'll create a simple 3D glasses geometry if GLB fails
    const modelUrl = "/glasses.glb";
    
    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        model.position.sub(center);
        modelWidthRef.current = size.x || 1.5;

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = false;
            // Enhance material appearance
            if (child.material) {
              child.material.metalness = 0.6;
              child.material.roughness = 0.3;
            }
          }
        });

        glassModel3dRef.current = model;
        glbLoadedRef.current = true;
        scene.add(model);
        setGlbLoading(false);
      },
      (progress) => {
        console.log("Loading 3D model:", (progress.loaded / progress.total * 100) + "%");
      },
      (err) => {
        console.error("GLB load error:", err);
        // Create fallback 3D geometry - stylish glasses
        const group = new THREE.Group();
        
        // Left lens
        const leftLensGeo = new THREE.TorusGeometry(0.45, 0.08, 32, 64);
        const leftLensMat = new THREE.MeshStandardMaterial({ color: 0x88aaff, metalness: 0.7, roughness: 0.2, emissive: 0x112233 });
        const leftLens = new THREE.Mesh(leftLensGeo, leftLensMat);
        leftLens.position.set(-0.55, 0, 0);
        leftLens.scale.set(1, 0.8, 0.3);
        group.add(leftLens);
        
        // Left lens glass
        const leftGlassGeo = new THREE.SphereGeometry(0.42, 32, 32);
        const glassMat = new THREE.MeshStandardMaterial({ color: 0xaaccff, metalness: 0.9, roughness: 0.1, transparent: true, opacity: 0.6 });
        const leftGlass = new THREE.Mesh(leftGlassGeo, glassMat);
        leftGlass.position.set(-0.55, 0, 0.02);
        leftGlass.scale.set(1, 0.75, 0.15);
        group.add(leftGlass);
        
        // Right lens
        const rightLens = new THREE.Mesh(leftLensGeo, leftLensMat);
        rightLens.position.set(0.55, 0, 0);
        rightLens.scale.set(1, 0.8, 0.3);
        group.add(rightLens);
        
        const rightGlass = new THREE.Mesh(leftGlassGeo, glassMat);
        rightGlass.position.set(0.55, 0, 0.02);
        rightGlass.scale.set(1, 0.75, 0.15);
        group.add(rightGlass);
        
        // Bridge
        const bridgeGeo = new THREE.BoxGeometry(0.4, 0.08, 0.12);
        const bridgeMat = new THREE.MeshStandardMaterial({ color: 0xccaa77, metalness: 0.5 });
        const bridge = new THREE.Mesh(bridgeGeo, bridgeMat);
        bridge.position.set(0, 0.05, 0.05);
        group.add(bridge);
        
        // Arms
        const armGeo = new THREE.BoxGeometry(0.15, 0.06, 0.6);
        const armMat = new THREE.MeshStandardMaterial({ color: 0xccaa77, metalness: 0.4 });
        const leftArm = new THREE.Mesh(armGeo, armMat);
        leftArm.position.set(-0.95, 0.02, -0.35);
        leftArm.rotation.z = 0.2;
        group.add(leftArm);
        
        const rightArm = new THREE.Mesh(armGeo, armMat);
        rightArm.position.set(0.95, 0.02, -0.35);
        rightArm.rotation.z = -0.2;
        group.add(rightArm);
        
        modelWidthRef.current = 1.4;
        glassModel3dRef.current = group;
        glbLoadedRef.current = true;
        scene.add(group);
        setGlbLoading(false);
      }
    );

    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      rendererRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      glassModel3dRef.current = null;
      glbLoadedRef.current = false;
    };
  }, [is3D]);

  // FaceMesh + Camera loop
  useEffect(() => {
    let faceMesh = null;
    let cameraStream = null;

    const initFaceMesh = async () => {
      try {
        // Request camera with proper constraints for mobile full screen
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          cameraStream = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    initFaceMesh();

    faceMesh = new window.FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({ 
      maxNumFaces: 1, 
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
    
    faceMesh.onResults(onResults);

    let camera = new window.Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current && videoRef.current.readyState >= 2) {
          await faceMesh.send({ image: videoRef.current });
        }
      },
      width: 640,
      height: 480,
    });
    camera.start();

    function onResults(results) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const W = canvas.width;
      const H = canvas.height;

      // Draw video frame with CSS filters
      ctx.clearRect(0, 0, W, H);
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%)`;
      if (results.image) {
        ctx.drawImage(results.image, 0, 0, W, H);
      }
      ctx.filter = "none";

      // Render 3D scene if in 3D mode
      if (is3D && rendererRef.current && sceneRef.current && cameraRef.current && glbLoadedRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) return;

      const lm = results.multiFaceLandmarks[0];

      // Use iris landmarks for stable positioning (requires refineLandmarks)
      const leftIris = lm[468];
      const rightIris = lm[473];

      if (!leftIris || !rightIris) return;

      const dx = (rightIris.x - leftIris.x) * W;
      const dy = (rightIris.y - leftIris.y) * H;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      // Center between irises, adjusted for nose bridge position
      const centerX = ((leftIris.x + rightIris.x) / 2) * W;
      const centerY = ((leftIris.y + rightIris.y) / 2) * H + distance * 0.12;
      const glassWidth = distance * 2.8;

      if (is3D) {
        const model = glassModel3dRef.current;
        const renderer = rendererRef.current;
        const scene = sceneRef.current;
        const threeCam = cameraRef.current;

        if (model && renderer && scene && threeCam && glbLoadedRef.current) {
          model.position.x = centerX - W / 2;
          model.position.y = -(centerY - H / 2);
          model.position.z = 0;
          const scale = glassWidth / modelWidthRef.current;
          model.scale.setScalar(scale);
          model.rotation.z = -angle;
          renderer.render(scene, threeCam);
        }
      } else {
        // 2D PNG overlay
        const img = imgRef.current;
        if (img.complete && img.src) {
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(angle);
          const w = glassWidth;
          const h = w / 2.5;
          ctx.drawImage(img, -w / 2, -h / 2, w, h);
          ctx.restore();
        }
      }
    }

    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
      if (faceMesh) {
        faceMesh.close();
      }
    };
  }, [brightness, contrast, saturate, is3D]);

  // Sync 2D glasses image
  useEffect(() => {
    if (!is3D && glasses !== "__3D__") {
      imgRef.current.src = glasses;
    }
  }, [glasses, is3D]);

  // Capture screenshot
  const handleCapture = useCallback(() => {
    const canvas = canvasRef.current;
    const threeCanvas = threeCanvasRef.current;
    
    if (!canvas) return;
    
    // Create a temporary canvas to combine if needed
    const captureCanvas = document.createElement("canvas");
    captureCanvas.width = canvas.width;
    captureCanvas.height = canvas.height;
    const ctx = captureCanvas.getContext("2d");
    
    // Draw main canvas
    ctx.drawImage(canvas, 0, 0);
    
    // If in 3D mode and three canvas has content, overlay it
    if (is3D && threeCanvas) {
      try {
        ctx.drawImage(threeCanvas, 0, 0);
      } catch(e) { console.warn("Cannot capture 3D overlay"); }
    }
    
    // Download
    const link = document.createElement("a");
    link.download = `vr-optics-look-${Date.now()}.png`;
    link.href = captureCanvas.toDataURL("image/png");
    link.click();
    
    setShowCaptureFeedback(true);
    setTimeout(() => setShowCaptureFeedback(false), 1500);
  }, [is3D]);

  return (
    <div className="tryon-container">
      <style>{`
        .tryon-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #0a0a0c;
          overflow: hidden;
          font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        /* Full screen camera wrapper */
        .camera-fullscreen {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000;
        }

        .canvas-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000;
        }

        /* Main canvas - fills screen while preserving aspect ratio */
        .main-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 0;
        }

        /* Three.js overlay canvas */
        .three-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          transition: opacity 0.2s ease;
        }

        video {
          display: none;
        }

        /* Bottom circular filter icons */
        .filter-dock {
          position: fixed;
          bottom: 28px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 14px;
          padding: 12px 20px;
          z-index: 100;
          background: rgba(10, 10, 15, 0.7);
          backdrop-filter: blur(20px);
          border-radius: 60px;
          margin: 0 auto;
          width: fit-content;
          border: 0.5px solid rgba(255, 215, 140, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .filter-icon {
          width: 62px;
          height: 62px;
          border-radius: 50%;
          background: rgba(25, 25, 35, 0.85);
          backdrop-filter: blur(4px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          border: 1.5px solid rgba(255, 215, 140, 0.2);
          gap: 4px;
        }

        .filter-icon.active {
          border-color: #c9a84c;
          background: rgba(201, 168, 76, 0.2);
          transform: scale(1.08);
          box-shadow: 0 0 18px rgba(201, 168, 76, 0.3);
        }

        .filter-icon.three-d-active {
          border-color: #64b4ff;
          background: rgba(100, 180, 255, 0.2);
          box-shadow: 0 0 18px rgba(100, 180, 255, 0.3);
        }

        .filter-emoji {
          font-size: 28px;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }

        .filter-label {
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.5px;
          color: rgba(255, 245, 220, 0.8);
        }

        /* Top status bar */
        .status-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          padding: 14px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 100;
          background: linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%);
          pointer-events: none;
        }

        .brand {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 500;
          letter-spacing: 2px;
          color: #f0e8d0;
          text-shadow: 0 1px 4px rgba(0,0,0,0.3);
        }

        .brand span { color: #c9a84c; }

        .mode-badge {
          font-size: 9px;
          padding: 4px 12px;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(8px);
          border-radius: 20px;
          color: #c9a84c;
          border: 0.5px solid rgba(201,168,76,0.4);
          letter-spacing: 1px;
        }

        /* Capture button */
        .capture-btn {
          position: fixed;
          bottom: 28px;
          right: 20px;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(201, 168, 76, 0.9);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 100;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          transition: all 0.2s ease;
          backdrop-filter: blur(4px);
        }

        .capture-btn:active {
          transform: scale(0.92);
          background: #c9a84c;
        }

        .capture-btn svg {
          width: 24px;
          height: 24px;
          fill: #0a0a0c;
        }

        /* Capture feedback */
        .capture-feedback {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(12px);
          padding: 12px 24px;
          border-radius: 40px;
          color: #c9a84c;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 1px;
          z-index: 200;
          animation: fadeOut 1.5s ease forwards;
          pointer-events: none;
          white-space: nowrap;
        }

        @keyframes fadeOut {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          70% { opacity: 1; }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
        }

        /* Loading indicator */
        .loading-3d {
          position: fixed;
          bottom: 110px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(12px);
          padding: 6px 14px;
          border-radius: 30px;
          font-size: 10px;
          color: #64b4ff;
          z-index: 100;
          letter-spacing: 1px;
          pointer-events: none;
        }

        /* Adjust for smaller screens */
        @media (max-width: 550px) {
          .filter-icon {
            width: 54px;
            height: 54px;
          }
          .filter-emoji {
            font-size: 24px;
          }
          .filter-label {
            font-size: 8px;
          }
          .filter-dock {
            gap: 10px;
            padding: 10px 16px;
            bottom: 20px;
          }
          .capture-btn {
            width: 48px;
            height: 48px;
            bottom: 22px;
            right: 16px;
          }
        }
      `}</style>

      {/* Status Bar */}
      <div className="status-bar">
        <div className="brand">VR<span>.</span>OPTICS</div>
        <div className="mode-badge">{is3D ? "3D MODE" : "LIVE"}</div>
      </div>

      {/* Full screen camera */}
      <div className="camera-fullscreen">
        <div className="canvas-wrapper">
          <canvas
            ref={canvasRef}
            width={640}
            height={480}
            className="main-canvas"
            style={{ objectFit: "cover" }}
          />
          <canvas
            ref={threeCanvasRef}
            width={640}
            height={480}
            className="three-overlay"
            style={{ opacity: is3D ? 1 : 0, objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Hidden video element */}
      <video ref={videoRef} autoPlay playsInline muted />

      {/* 3D Loading indicator */}
      {glbLoading && is3D && (
        <div className="loading-3d">LOADING 3D MODEL ✨</div>
      )}

      {/* Bottom circular filter icons */}
      <div className="filter-dock">
        {glassOptions.map((opt) => (
          <div
            key={opt.id}
            className={`filter-icon ${glasses === opt.id ? (opt.is3d ? "three-d-active" : "active") : ""}`}
            onClick={() => setGlasses(opt.id)}
          >
            <div className="filter-emoji">{opt.emoji}</div>
            <div className="filter-label">{opt.name}</div>
          </div>
        ))}
      </div>

      {/* Capture Button */}
      <button className="capture-btn" onClick={handleCapture}>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="5" fill="#0a0a0c" stroke="#c9a84c" strokeWidth="1.5"/>
          <path d="M5 7h2l2-3h6l2 3h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" fill="none" stroke="#c9a84c" strokeWidth="1.5"/>
        </svg>
      </button>

      {/* Capture feedback */}
      {showCaptureFeedback && (
        <div className="capture-feedback">✨ LOOK SAVED ✨</div>
      )}
    </div>
  );
};

export default TryOn;