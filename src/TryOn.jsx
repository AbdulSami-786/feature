import React, { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// ── Per-frame default adjustments ─────────────────────────────────
const DEFAULT_ADJ = { scaleW: 1, scaleH: 1, offsetX: 0, offsetY: 0, rotate: 0 };
const AVIATOR_ADJ = { scaleW: 1, scaleH: 1.18, offsetX: 0, offsetY: 12, rotate: 0 };
const ROUND_ADJ   = { scaleW: 1, scaleH: 0.85, offsetX: 0, offsetY: 0, rotate: 0 };

const GLASS_OPTIONS = [
  { id: "/glass1.png", name: "Classic",  price: "PKR 4,500", emoji: "👓" },
  { id: "/glass2.png", name: "Aviator",  price: "PKR 5,200", emoji: "🕶️" },
  { id: "/glass3.png", name: "Sport",    price: "PKR 3,800", emoji: "🥽" },
  { id: "/glass4.png", name: "Round",    price: "PKR 4,900", emoji: "🪬" },
  { id: "__3D__",      name: "3D Frame", price: "PKR 6,500", emoji: "✨", is3d: true },
];

// ── REALISTIC GLASSES WITH SIDE ARMS (BOWS THAT GO BEHIND EARS) ──
// Enhanced 3D-look with shadows, gradients, and metallic hinges
const drawGlassesWithRealisticArms = (ctx, img, x, y, w, h, angle) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  
  // ---- MAIN LENS / FRAME - with subtle shadow for depth ----
  ctx.shadowColor = "rgba(0,0,0,0.35)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.drawImage(img, -w / 2, -h / 2, w, h);
  ctx.shadowColor = "transparent";
  
  // ARM DIMENSIONS - elegant, proportionate
  const armLength = w * 0.92;      // Extended length reaching ear area
  const armThickness = h * 0.058;  // Slim, premium arm
  const armStartY = -h * 0.09;     // Starts at upper temple region
  
  // ---- LEFT ARM (Bow that wraps behind ear) ----
  const hingeX = -w / 2;
  const hingeY = armStartY;
  
  // Curved path for realistic ear wrap: goes back, dips, then hooks
  const backX = -w / 2 - armLength * 0.42;
  const backY = armStartY - armThickness * 0.2;
  const earX = -w / 2 - armLength * 0.68;
  const earY = armStartY + armThickness * 1.3;
  const hookX = -w / 2 - armLength;
  const hookY = armStartY + armThickness * 2.0;
  
  ctx.beginPath();
  // Create gradient for 3D metallic look
  const armGrad = ctx.createLinearGradient(hingeX - 10, hingeY - 5, hookX + 5, hookY + 5);
  armGrad.addColorStop(0, "#2a241c");
  armGrad.addColorStop(0.5, "#4a3e2e");
  armGrad.addColorStop(1, "#1e1914");
  ctx.fillStyle = armGrad;
  
  ctx.moveTo(hingeX, hingeY);
  ctx.lineTo(backX, backY - armThickness * 0.35);
  ctx.quadraticCurveTo(earX - 6, earY - armThickness * 0.6, earX, earY);
  ctx.quadraticCurveTo(hookX - 4, hookY - armThickness * 0.4, hookX, hookY);
  ctx.lineTo(hookX, hookY + armThickness);
  ctx.quadraticCurveTo(hookX - 4, hookY + armThickness * 0.6 + armThickness, earX, earY + armThickness);
  ctx.quadraticCurveTo(earX - 6, earY + armThickness * 0.6 + armThickness, backX, backY + armThickness * 0.35);
  ctx.lineTo(hingeX, hingeY + armThickness);
  ctx.closePath();
  ctx.fill();
  
  // ---- RIGHT ARM (Symmetrical) ----
  const hingeXR = w / 2;
  const hingeYR = armStartY;
  const backXR = w / 2 + armLength * 0.42;
  const backYR = armStartY - armThickness * 0.2;
  const earXR = w / 2 + armLength * 0.68;
  const earYR = armStartY + armThickness * 1.3;
  const hookXR = w / 2 + armLength;
  const hookYR = armStartY + armThickness * 2.0;
  
  ctx.beginPath();
  ctx.moveTo(hingeXR, hingeYR);
  ctx.lineTo(backXR, backYR - armThickness * 0.35);
  ctx.quadraticCurveTo(earXR + 6, earYR - armThickness * 0.6, earXR, earYR);
  ctx.quadraticCurveTo(hookXR + 4, hookYR - armThickness * 0.4, hookXR, hookYR);
  ctx.lineTo(hookXR, hookYR + armThickness);
  ctx.quadraticCurveTo(hookXR + 4, hookYR + armThickness * 0.6 + armThickness, earXR, earYR + armThickness);
  ctx.quadraticCurveTo(earXR + 6, earYR + armThickness * 0.6 + armThickness, backXR, backYR + armThickness * 0.35);
  ctx.lineTo(hingeXR, hingeYR + armThickness);
  ctx.closePath();
  ctx.fill();
  
  // ---- HINGE DETAILS (metallic connectors) ----
  ctx.fillStyle = "#c9a84c";
  ctx.shadowBlur = 2;
  ctx.shadowColor = "rgba(0,0,0,0.4)";
  ctx.fillRect(hingeX - 4, hingeY - 1.5, 6, armThickness + 3);
  ctx.fillRect(hingeXR - 2, hingeYR - 1.5, 6, armThickness + 3);
  
  // ---- EAR HOOK RUBBER TIPS (comfort grip) ----
  ctx.fillStyle = "#3a3022";
  ctx.beginPath();
  ctx.ellipse(hookX - 3, hookY + armThickness * 0.7, armThickness * 0.9, armThickness * 1.3, -0.25, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(hookXR + 3, hookYR + armThickness * 0.7, armThickness * 0.9, armThickness * 1.3, 0.25, 0, Math.PI * 2);
  ctx.fill();
  
  // ---- HIGH-END SHINE / SPECULAR HIGHLIGHT (3D look) ----
  ctx.beginPath();
  ctx.moveTo(hingeX + 2, hingeY + 2);
  ctx.lineTo(backX - 3, backY + 1.5);
  ctx.quadraticCurveTo(earX - 4, earY - 3, hookX - 3, hookY + 2);
  ctx.lineTo(hookX - 3, hookY + armThickness - 3);
  ctx.quadraticCurveTo(earX - 4, earY + armThickness - 5, backX - 3, backY + armThickness - 2);
  ctx.lineTo(hingeX + 2, hingeY + armThickness - 1);
  ctx.closePath();
  ctx.fillStyle = "rgba(220, 200, 160, 0.25)";
  ctx.fill();
  
  ctx.beginPath();
  ctx.moveTo(hingeXR - 2, hingeYR + 2);
  ctx.lineTo(backXR + 3, backYR + 1.5);
  ctx.quadraticCurveTo(earXR + 4, earYR - 3, hookXR + 3, hookYR + 2);
  ctx.lineTo(hookXR + 3, hookYR + armThickness - 3);
  ctx.quadraticCurveTo(earXR + 4, earYR + armThickness - 5, backXR + 3, backYR + armThickness - 2);
  ctx.lineTo(hingeXR - 2, hingeYR + armThickness - 1);
  ctx.closePath();
  ctx.fill();
  
  // Extra 3D edge definition: thin outline on arms
  ctx.strokeStyle = "rgba(0,0,0,0.5)";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(hingeX, hingeY);
  ctx.lineTo(backX, backY - armThickness * 0.35);
  ctx.quadraticCurveTo(earX - 6, earY - armThickness * 0.6, earX, earY);
  ctx.quadraticCurveTo(hookX - 4, hookY - armThickness * 0.4, hookX, hookY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(hingeXR, hingeYR);
  ctx.lineTo(backXR, backYR - armThickness * 0.35);
  ctx.quadraticCurveTo(earXR + 6, earYR - armThickness * 0.6, earXR, earYR);
  ctx.quadraticCurveTo(hookXR + 4, hookYR - armThickness * 0.4, hookXR, hookYR);
  ctx.stroke();
  
  ctx.restore();
};

const TryOn = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(new Image());

  const threeCanvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const glassModel3dRef = useRef(null);
  const modelWidthRef = useRef(1);

  const [glasses, setGlasses] = useState("/glass1.png");
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [glbLoading, setGlbLoading] = useState(false);
  const [showArms, setShowArms] = useState(true);

  const [adjustments, setAdjustments] = useState(() =>
    Object.fromEntries(
      GLASS_OPTIONS.filter(g => !g.is3d).map(g => {
        if (g.id === "/glass2.png") return [g.id, { ...AVIATOR_ADJ }];
        if (g.id === "/glass4.png") return [g.id, { ...ROUND_ADJ }];
        return [g.id, { ...DEFAULT_ADJ }];
      })
    )
  );

  const brightnessRef = useRef(brightness);
  const contrastRef = useRef(contrast);
  const saturateRef = useRef(saturate);
  const glassesRef = useRef(glasses);
  const is3DRef = useRef(false);
  const adjRef = useRef(adjustments);
  const showArmsRef = useRef(showArms);

  useEffect(() => { brightnessRef.current = brightness; }, [brightness]);
  useEffect(() => { contrastRef.current = contrast; }, [contrast]);
  useEffect(() => { saturateRef.current = saturate; }, [saturate]);
  useEffect(() => { glassesRef.current = glasses; }, [glasses]);
  useEffect(() => { is3DRef.current = glasses === "__3D__"; }, [glasses]);
  useEffect(() => { adjRef.current = adjustments; }, [adjustments]);
  useEffect(() => { showArmsRef.current = showArms; }, [showArms]);

  const is3D = glasses === "__3D__";
  const curAdj = adjustments[glasses] || DEFAULT_ADJ;

  const setAdj = (key, val) =>
    setAdjustments(prev => ({ ...prev, [glasses]: { ...prev[glasses], [key]: val } }));

  const resetAdj = () => {
    if (glasses === "/glass2.png") {
      setAdjustments(prev => ({ ...prev, [glasses]: { ...AVIATOR_ADJ } }));
    } else if (glasses === "/glass4.png") {
      setAdjustments(prev => ({ ...prev, [glasses]: { ...ROUND_ADJ } }));
    } else {
      setAdjustments(prev => ({ ...prev, [glasses]: { ...DEFAULT_ADJ } }));
    }
  };

  // Initialize 3D scene for GLB model
  useEffect(() => {
    if (!is3D) {
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = sceneRef.current = cameraRef.current = glassModel3dRef.current = null;
      }
      return;
    }

    const canvas = threeCanvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(640, 480);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const cam = new THREE.OrthographicCamera(-320, 320, 240, -240, 0.1, 2000);
    cam.position.z = 500;
    cameraRef.current = cam;

    // Enhanced lighting for 3D model
    scene.add(new THREE.AmbientLight(0xffffff, 1.4));
    const keyLight = new THREE.DirectionalLight(0xfff5e0, 1.3);
    keyLight.position.set(2, 3, 4);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xc9e0ff, 0.6);
    fillLight.position.set(-2, 0, 2);
    scene.add(fillLight);
    const backLight = new THREE.DirectionalLight(0xffcc88, 0.4);
    backLight.position.set(0, 1, -3);
    scene.add(backLight);

    setGlbLoading(true);
    new GLTFLoader().load(
      "/glasses.glb",
      (gltf) => {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        model.position.sub(box.getCenter(new THREE.Vector3()));
        modelWidthRef.current = box.getSize(new THREE.Vector3()).x || 1;
        model.traverse(c => { if (c.isMesh) c.castShadow = true; });
        glassModel3dRef.current = model;
        scene.add(model);
        setGlbLoading(false);
      },
      undefined,
      (err) => { console.error("GLB error:", err); setGlbLoading(false); }
    );

    return () => {
      renderer.dispose();
      rendererRef.current = sceneRef.current = cameraRef.current = glassModel3dRef.current = null;
    };
  }, [is3D]);

  // FaceMesh and main rendering loop
  useEffect(() => {
    const faceMesh = new window.FaceMesh({
      locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${f}`,
    });
    faceMesh.setOptions({ maxNumFaces: 1, refineLandmarks: true, minDetectionConfidence: 0.5, minTrackingConfidence: 0.5 });
    faceMesh.onResults(onResults);

    const camera = new window.Camera(videoRef.current, {
      onFrame: async () => { await faceMesh.send({ image: videoRef.current }); },
      width: 640, height: 480,
    });
    camera.start();

    function onResults(results) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const W = canvas.width, H = canvas.height;

      ctx.clearRect(0, 0, W, H);
      ctx.filter = `brightness(${brightnessRef.current}%) contrast(${contrastRef.current}%) saturate(${saturateRef.current}%)`;
      ctx.drawImage(results.image, 0, 0, W, H);
      ctx.filter = "none";

      const _is3D = is3DRef.current;
      if (_is3D && rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      if (!results.multiFaceLandmarks?.length) return;

      const lm = results.multiFaceLandmarks[0];
      // Use iris landmarks for more precise eye positioning (468 = left iris, 473 = right iris)
      const leftIris = lm[468] || lm[133];
      const rightIris = lm[473] || lm[362];
      const dx = (rightIris.x - leftIris.x) * W;
      const dy = (rightIris.y - leftIris.y) * H;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      const cx = ((leftIris.x + rightIris.x) / 2) * W;
      const cy = ((leftIris.y + rightIris.y) / 2) * H + dist * 0.12;

      if (_is3D) {
        const model = glassModel3dRef.current;
        const r = rendererRef.current, s = sceneRef.current, c = cameraRef.current;
        if (model && r && s && c) {
          model.position.x = cx - W / 2;
          model.position.y = -(cy - H / 2);
          model.scale.setScalar((dist * 2.9) / modelWidthRef.current);
          model.rotation.z = -angle;
          r.render(s, c);
        }
      } else {
        const img = imgRef.current;
        if (!img.complete || !img.src) return;

        const adj = adjRef.current[glassesRef.current] || DEFAULT_ADJ;
        const baseW = dist * 2.8;
        const w = baseW * adj.scaleW;
        const h = (baseW / 2.45) * adj.scaleH;

        if (showArmsRef.current) {
          drawGlassesWithRealisticArms(ctx, img, cx + adj.offsetX, cy + adj.offsetY, w, h, angle + (adj.rotate * Math.PI / 180));
        } else {
          ctx.save();
          ctx.translate(cx + adj.offsetX, cy + adj.offsetY);
          ctx.rotate(angle + (adj.rotate * Math.PI / 180));
          ctx.drawImage(img, -w / 2, -h / 2, w, h);
          ctx.restore();
        }
      }
    }

    return () => {
      if (faceMesh) faceMesh.close();
    };
  }, []);

  useEffect(() => {
    if (!is3D && imgRef.current) {
      imgRef.current.src = glasses;
      imgRef.current.crossOrigin = "Anonymous";
    }
  }, [glasses, is3D]);

  const capturePhoto = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'vroptics_tryon.png';
    link.href = canvas.toDataURL();
    link.click();
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#0c0c0e", color: "#e8e4dc", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 32px 16px", borderBottom: "0.5px solid rgba(201,168,76,.18)", flexShrink: 0 }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 400, letterSpacing: ".14em", color: "#f0e8d0" }}>
          VR<span style={{ color: "#c9a84c" }}>.</span>OPTICS
        </div>
        <div style={{ fontSize: "10px", letterSpacing: ".22em", color: "#c9a84c", border: "0.5px solid rgba(201,168,76,.4)", padding: "4px 12px", borderRadius: "20px" }}>
          {is3D ? "3D PREVIEW" : "LIVE PREVIEW"}
        </div>
      </div>

      {/* Main Body */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", flex: 1, minHeight: 0 }}>
        {/* Camera Panel */}
        <div style={{ background: "#111114", display: "flex", alignItems: "center", justifyContent: "center", borderRight: "0.5px solid rgba(201,168,76,.1)", padding: "32px" }}>
          <div style={{ position: "relative", border: "0.5px solid rgba(201,168,76,.25)", borderRadius: "6px", overflow: "hidden", width: "100%", maxWidth: "640px" }}>
            {/* Decorative corners */}
            <div style={{ position: "absolute", width: "16px", height: "16px", borderColor: "rgba(201,168,76,.6)", borderStyle: "solid", zIndex: 2, top: "10px", left: "10px", borderWidth: "1.5px 0 0 1.5px" }} />
            <div style={{ position: "absolute", width: "16px", height: "16px", borderColor: "rgba(201,168,76,.6)", borderStyle: "solid", zIndex: 2, top: "10px", right: "10px", borderWidth: "1.5px 1.5px 0 0" }} />
            <div style={{ position: "absolute", width: "16px", height: "16px", borderColor: "rgba(201,168,76,.6)", borderStyle: "solid", zIndex: 2, bottom: "10px", left: "10px", borderWidth: "0 0 1.5px 1.5px" }} />
            <div style={{ position: "absolute", width: "16px", height: "16px", borderColor: "rgba(201,168,76,.6)", borderStyle: "solid", zIndex: 2, bottom: "10px", right: "10px", borderWidth: "0 1.5px 1.5px 0" }} />
            
            {/* Live indicator */}
            <div style={{ position: "absolute", top: "12px", right: "14px", display: "flex", alignItems: "center", gap: "6px", fontSize: "10px", letterSpacing: ".15em", color: "#c9a84c", zIndex: 3 }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c9a84c", animation: "pulse 1.4s ease-in-out infinite" }} />
              {is3D ? "3D" : "LIVE"}
            </div>
            
            {/* Pill badges */}
            <div style={{ position: "absolute", bottom: "12px", left: "12px", display: "flex", gap: "6px", flexWrap: "wrap", zIndex: 3 }}>
              <span style={{ fontSize: "9px", letterSpacing: ".1em", color: "rgba(201,168,76,.7)", background: "rgba(0,0,0,.5)", border: "0.5px solid rgba(201,168,76,.25)", padding: "3px 8px", borderRadius: "20px" }}>BRIGHT {brightness}%</span>
              <span style={{ fontSize: "9px", letterSpacing: ".1em", color: "rgba(201,168,76,.7)", background: "rgba(0,0,0,.5)", border: "0.5px solid rgba(201,168,76,.25)", padding: "3px 8px", borderRadius: "20px" }}>CONTRAST {contrast}%</span>
              <span style={{ fontSize: "9px", letterSpacing: ".1em", color: "rgba(201,168,76,.7)", background: "rgba(0,0,0,.5)", border: "0.5px solid rgba(201,168,76,.25)", padding: "3px 8px", borderRadius: "20px" }}>SAT {saturate}%</span>
              {showArms && !is3D && <span style={{ fontSize: "9px", letterSpacing: ".1em", background: "rgba(201,168,76,.2)", borderColor: "rgba(201,168,76,.6)", color: "#c9a84c", padding: "3px 8px", borderRadius: "20px" }}>👂 BEHIND EARS</span>}
              {is3D && <span style={{ fontSize: "9px", letterSpacing: ".1em", color: "rgba(150,220,255,.8)", background: "rgba(100,180,255,.1)", border: "0.5px solid rgba(100,180,255,.3)", padding: "3px 8px", borderRadius: "20px" }}>GLB · THREE.JS</span>}
            </div>
            
            {glbLoading && (
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: "11px", letterSpacing: ".2em", color: "rgba(201,168,76,.7)", background: "rgba(0,0,0,.6)", padding: "8px 18px", borderRadius: "20px", border: "0.5px solid rgba(201,168,76,.3)", zIndex: 4 }}>
                LOADING 3D MODEL…
              </div>
            )}
            
            <video ref={videoRef} style={{ display: "none" }} autoPlay playsInline muted />
            <canvas ref={canvasRef} width={640} height={480} style={{ display: "block", width: "100%", height: "auto" }} />
            <canvas ref={threeCanvasRef} width={640} height={480} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", transition: "opacity .3s", opacity: is3D ? 1 : 0 }} />
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ background: "#0e0e11", display: "flex", flexDirection: "column", padding: "20px 16px", gap: "16px", overflowY: "auto" }}>
          {/* Frame Selection */}
          <div>
            <div style={{ fontSize: "9px", letterSpacing: ".28em", color: "rgba(201,168,76,.5)", marginBottom: "10px" }}>SELECT FRAME</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {GLASS_OPTIONS.map(g => (
                <div
                  key={g.id}
                  onClick={() => setGlasses(g.id)}
                  style={{
                    background: glasses === g.id ? (g.is3d ? "#0f1828" : "#1b1810") : "#15151a",
                    border: `0.5px solid ${glasses === g.id ? (g.is3d ? "rgba(100,180,255,.6)" : "rgba(201,168,76,.55)") : "rgba(255,255,255,.07)"}`,
                    borderRadius: "6px",
                    padding: "10px 8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    position: "relative"
                  }}
                >
                  {g.is3d && <span style={{ position: "absolute", top: "5px", right: "5px", fontSize: "7px", letterSpacing: ".1em", color: "rgba(100,200,255,.8)", background: "rgba(100,180,255,.1)", border: "0.5px solid rgba(100,180,255,.3)", padding: "1px 5px", borderRadius: "10px" }}>3D</span>}
                  <div style={{ fontSize: "20px" }}>{g.emoji}</div>
                  <div style={{ fontSize: "10px", color: "rgba(232,228,220,.55)", letterSpacing: ".06em" }}>{g.name}</div>
                  <div style={{ fontSize: "11px", color: g.is3d ? "#64b4ff" : "#c9a84c", fontWeight: 500 }}>{g.price}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height: "0.5px", background: "rgba(255,215,140,.08)" }} />

          {/* Toggle Arms */}
          {!is3D && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
              <span style={{ fontSize: "10px", color: "rgba(232,228,220,.6)", letterSpacing: ".1em" }}>👂 ARMS BEHIND EARS</span>
              <label style={{ position: "relative", display: "inline-block", width: "44px", height: "22px" }}>
                <input type="checkbox" checked={showArms} onChange={(e) => setShowArms(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
                <span style={{ position: "absolute", cursor: "pointer", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#2a2a2f", transition: ".3s", borderRadius: "22px" }}>
                  <span style={{ position: "absolute", content: "", height: "16px", width: "16px", left: "3px", bottom: "3px", backgroundColor: "#e8e4dc", transition: ".3s", borderRadius: "50%", transform: showArms ? "translateX(22px)" : "none", background: showArms ? "#0c0c0e" : "#e8e4dc" }} />
                </span>
              </label>
            </div>
          )}

          {/* Adjustments Panel (2D only) */}
          {!is3D && (
            <div style={{ background: "#131318", border: "0.5px solid rgba(201,168,76,.12)", borderRadius: "6px", padding: "14px 12px 10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ fontSize: "9px", letterSpacing: ".28em", color: "rgba(201,168,76,.5)" }}>FRAME ADJUST</span>
                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <span style={{ fontSize: "9px", letterSpacing: ".1em", color: "rgba(201,168,76,.8)", background: "rgba(201,168,76,.08)", border: "0.5px solid rgba(201,168,76,.2)", padding: "2px 8px", borderRadius: "10px" }}>
                    {GLASS_OPTIONS.find(g => g.id === glasses)?.name}
                  </span>
                  <button onClick={resetAdj} style={{ fontSize: "8px", letterSpacing: ".18em", color: "rgba(232,228,220,.3)", background: "transparent", border: "0.5px solid rgba(255,255,255,.08)", padding: "3px 8px", borderRadius: "10px", cursor: "pointer", fontFamily: "inherit" }}>RESET</button>
                </div>
              </div>
              {[
                { label: "WIDTH", key: "scaleW", min: 0.3, max: 3, step: 0.05, fmt: v => `${v.toFixed(2)}×` },
                { label: "HEIGHT", key: "scaleH", min: 0.3, max: 3, step: 0.05, fmt: v => `${v.toFixed(2)}×` },
                { label: "MOVE LEFT/RIGHT", key: "offsetX", min: -150, max: 150, step: 1, fmt: v => `${v > 0 ? "+" : ""}${v}px` },
                { label: "MOVE UP/DOWN", key: "offsetY", min: -150, max: 150, step: 1, fmt: v => `${v > 0 ? "+" : ""}${v}px` },
                { label: "ROTATION", key: "rotate", min: -30, max: 30, step: 0.5, fmt: v => `${v > 0 ? "+" : ""}${v.toFixed(1)}°` },
              ].map(({ label, key, min, max, step, fmt }) => (
                <div key={key} style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "11px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "10px", color: "rgba(232,228,220,.5)", letterSpacing: ".1em" }}>{label}</span>
                    <span style={{ fontSize: "10px", color: "#c9a84c", fontWeight: 500 }}>{fmt(curAdj[key])}</span>
                  </div>
                  <input type="range" min={min} max={max} step={step} value={curAdj[key]} onChange={e => setAdj(key, Number(e.target.value))} style={{ width: "100%", height: "2px", background: "rgba(255,215,140,.14)", borderRadius: "2px", outline: "none", WebkitAppearance: "none" }} />
                </div>
              ))}
            </div>
          )}

          <div style={{ height: "0.5px", background: "rgba(255,215,140,.08)" }} />

          {/* Scene Filters */}
          <div>
            <div style={{ fontSize: "9px", letterSpacing: ".28em", color: "rgba(201,168,76,.5)", marginBottom: "10px" }}>SCENE FILTERS</div>
            {[
              { label: "BRIGHTNESS", val: brightness, set: setBrightness },
              { label: "CONTRAST", val: contrast, set: setContrast },
              { label: "SATURATION", val: saturate, set: setSaturate },
            ].map(({ label, val, set }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "11px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "10px", color: "rgba(232,228,220,.5)", letterSpacing: ".1em" }}>{label}</span>
                  <span style={{ fontSize: "10px", color: "#c9a84c", fontWeight: 500 }}>{val}%</span>
                </div>
                <input type="range" min="0" max="200" step="1" value={val} onChange={e => set(Number(e.target.value))} style={{ width: "100%", height: "2px", background: "rgba(255,215,140,.14)", borderRadius: "2px", outline: "none", WebkitAppearance: "none" }} />
              </div>
            ))}
          </div>

          <div style={{ height: "0.5px", background: "rgba(255,215,140,.08)" }} />
          <button onClick={capturePhoto} style={{ width: "100%", background: "transparent", border: "0.5px solid rgba(201,168,76,.4)", color: "#c9a84c", fontFamily: "inherit", fontSize: "11px", letterSpacing: ".22em", padding: "12px", borderRadius: "4px", cursor: "pointer", transition: "background 0.2s" }}>CAPTURE LOOK</button>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.25; } }
        input[type="range"] { -webkit-appearance: none; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 13px; height: 13px; border-radius: 50%; background: #c9a84c; cursor: pointer; border: 2px solid #0c0c0e; }
        input[type="range"]::-moz-range-thumb { width: 13px; height: 13px; border-radius: 50%; background: #c9a84c; cursor: pointer; border: 2px solid #0c0c0e; }
        button:hover { background: rgba(201,168,76,.08); }
      `}</style>
    </div>
  );
};

export default TryOn;