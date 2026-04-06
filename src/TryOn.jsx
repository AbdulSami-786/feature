import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const TryOn = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(new Image());

  // ── Three.js refs ──────────────────────────────────────────────
  const threeCanvasRef  = useRef(null);
  const rendererRef     = useRef(null);
  const sceneRef        = useRef(null);
  const cameraRef       = useRef(null);
  const glassModel3dRef = useRef(null);
  const modelWidthRef   = useRef(1);
  const glbLoadedRef    = useRef(false);

  const [glasses,    setGlasses]    = useState("/glass1.png");
  const [brightness, setBrightness] = useState(100);
  const [contrast,   setContrast]   = useState(100);
  const [saturate,   setSaturate]   = useState(100);
  const [glbLoading, setGlbLoading] = useState(false);

  const glassOptions = [
    { id: "/glass1.png", name: "Classic",  price: "PKR 4,500", emoji: "👓" },
    { id: "/glass2.png", name: "Aviator",  price: "PKR 5,200", emoji: "🕶️" },
    { id: "/glass3.png", name: "Sport",    price: "PKR 3,800", emoji: "🥽" },
    { id: "/glass4.png", name: "Round",    price: "PKR 4,900", emoji: "🪬" },
    { id: "__3D__",      name: "3D Frame", price: "PKR 6,500", emoji: "✨", is3d: true },
  ];

  const is3D = glasses === "__3D__";

  // ── Three.js scene init / teardown ─────────────────────────────
  useEffect(() => {
    if (!is3D) {
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current    = null;
        sceneRef.current       = null;
        cameraRef.current      = null;
        glassModel3dRef.current = null;
        glbLoadedRef.current   = false;
      }
      return;
    }

    const canvas = threeCanvasRef.current;
    if (!canvas) return;

    // Renderer with transparent background
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(640, 480);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Orthographic camera — 1 scene unit = 1 canvas pixel
    // Canvas 640×480 → left/right ±320, top/bottom ±240
    const orthoCamera = new THREE.OrthographicCamera(-320, 320, 240, -240, 0.1, 2000);
    orthoCamera.position.z = 500;
    cameraRef.current = orthoCamera;

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xfff5e0, 1.2);
    keyLight.position.set(2, 3, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xc9e0ff, 0.5);
    fillLight.position.set(-2, 0, 2);
    scene.add(fillLight);

    // Load the GLB model
    setGlbLoading(true);
    const loader = new GLTFLoader();
    loader.load(
      "/glasses.glb",
      (gltf) => {
        const model = gltf.scene;

        // Centre the model at origin and record its width
        const box    = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size   = box.getSize(new THREE.Vector3());

        model.position.sub(center);           // snap to origin
        modelWidthRef.current = size.x || 1;  // save for dynamic scaling

        // Enable shadows on all meshes
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow    = true;
            child.receiveShadow = false;
          }
        });

        glassModel3dRef.current = model;
        glbLoadedRef.current    = true;
        scene.add(model);
        setGlbLoading(false);
      },
      undefined,
      (err) => {
        console.error("GLB load error:", err);
        setGlbLoading(false);
      }
    );

    return () => {
      renderer.dispose();
      rendererRef.current     = null;
      sceneRef.current        = null;
      cameraRef.current       = null;
      glassModel3dRef.current = null;
      glbLoadedRef.current    = false;
    };
  }, [is3D]);

  // ── FaceMesh + Camera loop ─────────────────────────────────────
  useEffect(() => {
    const faceMesh = new window.FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({ maxNumFaces: 1, refineLandmarks: true });
    faceMesh.onResults(onResults);

    const camera = new window.Camera(videoRef.current, {
      onFrame: async () => {
        await faceMesh.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });
    camera.start();

    function onResults(results) {
      const canvas = canvasRef.current;
      const ctx    = canvas.getContext("2d");
      const W = canvas.width, H = canvas.height;

      // Draw video frame with CSS filter
      ctx.clearRect(0, 0, W, H);
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%)`;
      ctx.drawImage(results.image, 0, 0, W, H);
      ctx.filter = "none";

      // Always render 3D scene each frame (clears the Three canvas)
      if (is3D && rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      if (!results.multiFaceLandmarks?.length) return;

      const lm = results.multiFaceLandmarks[0];

      // ── Iris centers (requires refineLandmarks: true) ──────────
      // lm[468] = left iris center, lm[473] = right iris center
      // These are far more stable than outer-corner landmarks
      const leftIris  = lm[468];
      const rightIris = lm[473];

      const dx       = (rightIris.x - leftIris.x) * W;
      const dy       = (rightIris.y - leftIris.y) * H;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle    = Math.atan2(dy, dx);

      // Centre between irises; nudge Y down so frame sits at nose bridge
      const centerX    = ((leftIris.x + rightIris.x) / 2) * W;
      const centerY    = ((leftIris.y + rightIris.y) / 2) * H + distance * 0.12;
      // iris-to-iris is ~60% of full frame width → multiply by 2.8
      const glassWidth = distance * 2.8;

      if (is3D) {
        // ── 3D GLB path ─────────────────────────────────────────
        const model    = glassModel3dRef.current;
        const renderer = rendererRef.current;
        const scene    = sceneRef.current;
        const threeCam = cameraRef.current;

        if (model && renderer && scene && threeCam) {
          model.position.x = centerX - W / 2;
          model.position.y = -(centerY - H / 2);   // flip Y for Three.js
          model.position.z = 0;
          model.scale.setScalar(glassWidth / modelWidthRef.current);
          model.rotation.z = -angle;
          renderer.render(scene, threeCam);
        }
      } else {
        // ── 2D PNG path ──────────────────────────────────────────
        const img = imgRef.current;
        if (img.complete) {
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
  }, [brightness, contrast, saturate, is3D]);

  // ── Sync 2D glasses image ──────────────────────────────────────
  useEffect(() => {
    if (!is3D) imgRef.current.src = glasses;
  }, [glasses, is3D]);

  // ──────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');

        .opt-root {
          font-family: 'DM Sans', sans-serif;
          background: #0c0c0e;
          color: #e8e4dc;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* ── Header ── */
        .opt-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 32px 16px;
          border-bottom: 0.5px solid rgba(201,168,76,0.18);
        }
        .opt-brand {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-weight: 400;
          letter-spacing: 0.14em;
          color: #f0e8d0;
        }
        .opt-brand span { color: #c9a84c; }
        .opt-badge {
          font-size: 10px;
          letter-spacing: 0.22em;
          color: #c9a84c;
          border: 0.5px solid rgba(201,168,76,0.4);
          padding: 4px 12px;
          border-radius: 20px;
        }

        /* ── Body layout ── */
        .opt-body {
          display: grid;
          grid-template-columns: 1fr 300px;
          flex: 1;
        }

        /* ── Camera panel ── */
        .opt-cam-panel {
          background: #111114;
          display: flex;
          align-items: center;
          justify-content: center;
          border-right: 0.5px solid rgba(201,168,76,0.1);
          padding: 32px;
        }
        .opt-canvas-wrap {
          position: relative;
          border: 0.5px solid rgba(201,168,76,0.25);
          border-radius: 6px;
          overflow: hidden;
        }
        .opt-canvas-wrap canvas {
          display: block;
          width: 100%;
          max-width: 640px;
          height: auto;
          border-radius: 6px;
        }
        /* Three.js overlay canvas */
        .opt-three-canvas {
          position: absolute !important;
          inset: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        /* corner brackets */
        .opt-corner {
          position: absolute;
          width: 16px;
          height: 16px;
          border-color: rgba(201,168,76,0.6);
          border-style: solid;
          z-index: 2;
        }
        .opt-corner.tl { top: 10px; left: 10px;   border-width: 1.5px 0 0 1.5px; }
        .opt-corner.tr { top: 10px; right: 10px;   border-width: 1.5px 1.5px 0 0; }
        .opt-corner.bl { bottom: 10px; left: 10px;  border-width: 0 0 1.5px 1.5px; }
        .opt-corner.br { bottom: 10px; right: 10px;  border-width: 0 1.5px 1.5px 0; }

        /* live indicator */
        .opt-live {
          position: absolute;
          top: 12px;
          right: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          letter-spacing: 0.15em;
          color: #c9a84c;
          z-index: 3;
        }
        .opt-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c9a84c;
          animation: optPulse 1.4s ease-in-out infinite;
        }
        @keyframes optPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.25; }
        }

        /* 3D loading indicator */
        .opt-3d-loading {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 11px;
          letter-spacing: 0.2em;
          color: rgba(201,168,76,0.7);
          background: rgba(0,0,0,0.6);
          padding: 8px 18px;
          border-radius: 20px;
          border: 0.5px solid rgba(201,168,76,0.3);
          z-index: 4;
          animation: optPulse 1s ease-in-out infinite;
        }

        /* filter pills */
        .opt-pills {
          position: absolute;
          bottom: 12px;
          left: 12px;
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          z-index: 3;
        }
        .opt-pill {
          font-size: 9px;
          letter-spacing: 0.1em;
          color: rgba(201,168,76,0.7);
          background: rgba(0,0,0,0.5);
          border: 0.5px solid rgba(201,168,76,0.25);
          padding: 3px 8px;
          border-radius: 20px;
        }
        .opt-pill.three-d {
          color: rgba(150,220,255,0.8);
          border-color: rgba(150,220,255,0.3);
        }

        /* ── Sidebar ── */
        .opt-sidebar {
          background: #0e0e11;
          display: flex;
          flex-direction: column;
          padding: 24px 20px;
          gap: 22px;
          overflow-y: auto;
        }
        .opt-section-label {
          font-size: 9px;
          letter-spacing: 0.28em;
          color: rgba(201,168,76,0.5);
          margin-bottom: 12px;
        }

        /* frame cards */
        .opt-glass-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .opt-glass-card {
          background: #15151a;
          border: 0.5px solid rgba(255,255,255,0.07);
          border-radius: 6px;
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          position: relative;
        }
        .opt-glass-card:hover { border-color: rgba(201,168,76,0.3); }
        .opt-glass-card.active {
          border-color: rgba(201,168,76,0.55);
          background: #1b1810;
        }
        /* 3D card gets a special glow */
        .opt-glass-card.three-d-card {
          border-color: rgba(100,180,255,0.2);
          background: #0f1420;
        }
        .opt-glass-card.three-d-card:hover {
          border-color: rgba(100,180,255,0.4);
        }
        .opt-glass-card.three-d-card.active {
          border-color: rgba(100,180,255,0.6);
          background: #0f1828;
          box-shadow: 0 0 16px rgba(100,180,255,0.08);
        }
        .opt-3d-tag {
          position: absolute;
          top: 5px;
          right: 5px;
          font-size: 7px;
          letter-spacing: 0.1em;
          color: rgba(100,200,255,0.8);
          background: rgba(100,180,255,0.1);
          border: 0.5px solid rgba(100,180,255,0.3);
          padding: 1px 5px;
          border-radius: 10px;
        }

        .opt-glass-emoji { font-size: 22px; line-height: 1; }
        .opt-glass-name  { font-size: 11px; color: rgba(232,228,220,0.55); letter-spacing: 0.06em; }
        .opt-glass-price { font-size: 12px; color: #c9a84c; font-weight: 500; }
        .opt-glass-card.three-d-card .opt-glass-price { color: #64b4ff; }

        /* divider */
        .opt-divider { height: 0.5px; background: rgba(255,215,140,0.08); }

        /* filter sliders */
        .opt-filter-row { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
        .opt-filter-row:last-child { margin-bottom: 0; }
        .opt-filter-meta { display: flex; justify-content: space-between; align-items: center; }
        .opt-filter-name { font-size: 11px; color: rgba(232,228,220,0.5); letter-spacing: 0.1em; }
        .opt-filter-val  { font-size: 11px; color: #c9a84c; font-weight: 500; }

        input[type="range"].opt-range {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 2px;
          background: rgba(255,215,140,0.14);
          border-radius: 2px;
          outline: none;
          border: none;
        }
        input[type="range"].opt-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: #c9a84c;
          cursor: pointer;
          border: 2px solid #0c0c0e;
        }
        input[type="range"].opt-range::-moz-range-thumb {
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: #c9a84c;
          cursor: pointer;
          border: 2px solid #0c0c0e;
        }

        /* capture button */
        .opt-capture-btn {
          margin-top: auto;
          width: 100%;
          background: transparent;
          border: 0.5px solid rgba(201,168,76,0.4);
          color: #c9a84c;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.22em;
          padding: 13px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .opt-capture-btn:hover  { background: rgba(201,168,76,0.08); }
        .opt-capture-btn:active { background: rgba(201,168,76,0.14); }

        /* responsive */
        @media (max-width: 720px) {
          .opt-body        { grid-template-columns: 1fr; }
          .opt-cam-panel   { padding: 16px; border-right: none; border-bottom: 0.5px solid rgba(201,168,76,0.1); }
          .opt-sidebar     { padding: 20px 16px; }
        }
      `}</style>

      <div className="opt-root">
        {/* ── Header ── */}
        <div className="opt-header">
          <div className="opt-brand">VR<span>.</span>OPTICS</div>
          <div className="opt-badge">{is3D ? "3D PREVIEW" : "LIVE PREVIEW"}</div>
        </div>

        <div className="opt-body">
          {/* ── Camera / Canvas ── */}
          <div className="opt-cam-panel">
            <div className="opt-canvas-wrap">
              <div className="opt-corner tl" />
              <div className="opt-corner tr" />
              <div className="opt-corner bl" />
              <div className="opt-corner br" />

              <div className="opt-live">
                <div className="opt-dot" />
                {is3D ? "3D" : "LIVE"}
              </div>

              <div className="opt-pills">
                <span className="opt-pill">BRIGHT {brightness}%</span>
                <span className="opt-pill">CONTRAST {contrast}%</span>
                <span className="opt-pill">SAT {saturate}%</span>
                {is3D && <span className="opt-pill three-d">GLB · THREE.JS</span>}
              </div>

              {glbLoading && (
                <div className="opt-3d-loading">LOADING 3D MODEL…</div>
              )}

              <video ref={videoRef} style={{ display: "none" }} />

              {/* Main 2D canvas — always visible (draws video feed) */}
              <canvas ref={canvasRef} width={640} height={480} />

              {/* Three.js canvas — overlaid, transparent, only opaque in 3D mode */}
              <canvas
                ref={threeCanvasRef}
                className="opt-three-canvas"
                width={640}
                height={480}
                style={{ opacity: is3D ? 1 : 0 }}
              />
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="opt-sidebar">
            {/* Frame selection */}
            <div>
              <div className="opt-section-label">SELECT FRAME</div>
              <div className="opt-glass-grid">
                {glassOptions.map((g) => (
                  <div
                    key={g.id}
                    className={[
                      "opt-glass-card",
                      glasses === g.id ? "active" : "",
                      g.is3d ? "three-d-card" : "",
                    ].join(" ")}
                    onClick={() => setGlasses(g.id)}
                  >
                    {g.is3d && <span className="opt-3d-tag">3D</span>}
                    <div className="opt-glass-emoji">{g.emoji}</div>
                    <div className="opt-glass-name">{g.name}</div>
                    <div className="opt-glass-price">{g.price}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="opt-divider" />

            {/* Filters */}
            <div>
              <div className="opt-section-label">ADJUST FILTERS</div>

              <div className="opt-filter-row">
                <div className="opt-filter-meta">
                  <span className="opt-filter-name">BRIGHTNESS</span>
                  <span className="opt-filter-val">{brightness}%</span>
                </div>
                <input
                  type="range" className="opt-range"
                  min="0" max="200" step="1"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                />
              </div>

              <div className="opt-filter-row">
                <div className="opt-filter-meta">
                  <span className="opt-filter-name">CONTRAST</span>
                  <span className="opt-filter-val">{contrast}%</span>
                </div>
                <input
                  type="range" className="opt-range"
                  min="0" max="200" step="1"
                  value={contrast}
                  onChange={(e) => setContrast(Number(e.target.value))}
                />
              </div>

              <div className="opt-filter-row">
                <div className="opt-filter-meta">
                  <span className="opt-filter-name">SATURATION</span>
                  <span className="opt-filter-val">{saturate}%</span>
                </div>
                <input
                  type="range" className="opt-range"
                  min="0" max="200" step="1"
                  value={saturate}
                  onChange={(e) => setSaturate(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="opt-divider" />

            <button className="opt-capture-btn">CAPTURE LOOK</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TryOn;