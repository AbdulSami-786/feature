import React, { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// ── GLASSES DATA WITH ACTUAL PHYSICAL SIZES (in mm) ─────────────────────────────────
const GLASS_OPTIONS = [
  { 
    id: "/glass1.png", 
    name: "Classic", 
    price: "PKR 4,500", 
    emoji: "👓", 
    brand: "Gucci", 
    model: "GG01840",
    sizes: [
      { label: "S", width: 128, height: 45, bridge: 16, pxWidth: 150, pxHeight: 53 },
      { label: "M", width: 135, height: 48, bridge: 18, pxWidth: 158, pxHeight: 56 },
      { label: "L", width: 142, height: 51, bridge: 20, pxWidth: 166, pxHeight: 60 },
      { label: "XL", width: 150, height: 54, bridge: 22, pxWidth: 175, pxHeight: 63 }
    ],
    defaultSize: "M"
  },
  { 
    id: "/glass2.png", 
    name: "Aviator", 
    price: "PKR 5,200", 
    emoji: "🕶️", 
    brand: "Ray-Ban", 
    model: "RB3025",
    sizes: [
      { label: "S", width: 130, height: 48, bridge: 14, pxWidth: 152, pxHeight: 56 },
      { label: "M", width: 138, height: 52, bridge: 16, pxWidth: 162, pxHeight: 61 },
      { label: "L", width: 146, height: 56, bridge: 18, pxWidth: 171, pxHeight: 66 },
      { label: "XL", width: 155, height: 60, bridge: 20, pxWidth: 182, pxHeight: 70 }
    ],
    defaultSize: "M"
  },
  { 
    id: "/glass3.png", 
    name: "Sport", 
    price: "PKR 3,800", 
    emoji: "🥽", 
    brand: "Oakley", 
    model: "SPORT-01",
    sizes: [
      { label: "S", width: 125, height: 44, bridge: 15, pxWidth: 147, pxHeight: 52 },
      { label: "M", width: 132, height: 47, bridge: 17, pxWidth: 155, pxHeight: 55 },
      { label: "L", width: 140, height: 50, bridge: 19, pxWidth: 164, pxHeight: 59 },
      { label: "XL", width: 148, height: 53, bridge: 21, pxWidth: 173, pxHeight: 62 }
    ],
    defaultSize: "M"
  },
  { 
    id: "/glass4.png", 
    name: "Round", 
    price: "PKR 4,900", 
    emoji: "🪬", 
    brand: "Gucci", 
    model: "GG02300",
    sizes: [
      { label: "S", width: 120, height: 42, bridge: 17, pxWidth: 141, pxHeight: 49 },
      { label: "M", width: 128, height: 45, bridge: 19, pxWidth: 150, pxHeight: 53 },
      { label: "L", width: 136, height: 48, bridge: 21, pxWidth: 160, pxHeight: 56 },
      { label: "XL", width: 145, height: 52, bridge: 23, pxWidth: 170, pxHeight: 61 }
    ],
    defaultSize: "M"
  },
  { 
    id: "__3D__", 
    name: "3D Frame", 
    price: "PKR 6,500", 
    emoji: "✨", 
    is3d: true, 
    brand: "VR", 
    model: "3D Pro",
    sizes: [
      { label: "S", width: 130, height: 46, bridge: 16, pxWidth: 152, pxHeight: 54 },
      { label: "M", width: 138, height: 49, bridge: 18, pxWidth: 162, pxHeight: 57 },
      { label: "L", width: 146, height: 52, bridge: 20, pxWidth: 171, pxHeight: 61 },
      { label: "XL", width: 155, height: 56, bridge: 22, pxWidth: 182, pxHeight: 66 }
    ],
    defaultSize: "M"
  },
];

const COLOR_OPTIONS = [
  { name: "Shiny Black", value: "#1a1a1a", code: "005" },
  { name: "Polished Clear", value: "#e8e4dc", code: "001" },
  { name: "Transparent", value: "#c5c0b5", code: "002" },
  { name: "Grey", value: "#8a8a8a", code: "003" },
  { name: "Matte Black", value: "#2d2d2d", code: "004" },
];

// ── Per-frame adjustments ─────────────────────────────────
const DEFAULT_ADJ = { scaleW: 1, scaleH: 1, offsetX: 0, offsetY: 0, rotate: 0 };
const AVIATOR_ADJ = { scaleW: 1, scaleH: 1.18, offsetX: 0, offsetY: 12, rotate: 0 };
const ROUND_ADJ   = { scaleW: 1, scaleH: 0.85, offsetX: 0, offsetY: 0, rotate: 0 };

// ══════════════════════════════════════════════════════════════════
// ── FACE LANDMARK INDICES ──
// ══════════════════════════════════════════════════════════════════
const LANDMARKS = {
  LEFT_IRIS_CENTER: 468,
  RIGHT_IRIS_CENTER: 473,
  LEFT_EYE_INNER: 133,
  LEFT_EYE_OUTER: 33,
  RIGHT_EYE_INNER: 362,
  RIGHT_EYE_OUTER: 263,
  LEFT_EYEBROW_LOWER: [70, 63, 105, 66, 107],
  RIGHT_EYEBROW_LOWER: [300, 293, 334, 296, 336],
  NOSE_BRIDGE_TOP: 6,
};

class LandmarkSmoother {
  constructor(alpha = 0.7) {
    this.alpha = alpha;
    this.prev = null;
  }
  smooth(current) {
    if (!this.prev) {
      this.prev = { ...current };
      return current;
    }
    const result = {};
    for (const key of Object.keys(current)) {
      result[key] = this.prev[key] + this.alpha * (current[key] - this.prev[key]);
    }
    this.prev = { ...result };
    return result;
  }
  reset() { this.prev = null; }
}

// ══════════════════════════════════════════════════════════════════
// ── FACE GEOMETRY EXTRACTOR - GETS FACE POSITION ONLY ──
// ══════════════════════════════════════════════════════════════════
function extractFaceGeometry(lm, W, H) {
  const px = (idx) => ({ x: lm[idx].x * W, y: lm[idx].y * H });
  const avgPx = (indices) => {
    const pts = indices.map(i => px(i));
    return {
      x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
      y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
    };
  };

  const leftIris = px(LANDMARKS.LEFT_IRIS_CENTER);
  const rightIris = px(LANDMARKS.RIGHT_IRIS_CENTER);
  const leftBrowLower = avgPx(LANDMARKS.LEFT_EYEBROW_LOWER);
  const rightBrowLower = avgPx(LANDMARKS.RIGHT_EYEBROW_LOWER);

  const angleIris = Math.atan2(rightIris.y - leftIris.y, rightIris.x - leftIris.x);
  const angleBrow = Math.atan2(rightBrowLower.y - leftBrowLower.y, rightBrowLower.x - leftBrowLower.x);
  const angle = angleIris * 0.6 + angleBrow * 0.4;

  const centerX = (leftIris.x + rightIris.x) / 2;
  const browCenterY = (leftBrowLower.y + rightBrowLower.y) / 2;
  const irisCenterY = (leftIris.y + rightIris.y) / 2;
  const centerY = browCenterY * 0.45 + irisCenterY * 0.55;

  return { centerX, centerY, angle };
}

const drawGlassesWithArms = (ctx, img, x, y, w, h, angle) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.shadowColor = "rgba(0,0,0,0.3)";
  ctx.shadowBlur = 6;
  ctx.drawImage(img, -w / 2, -h / 2, w, h);
  ctx.shadowColor = "transparent";
  
  const armLength = w * 0.88;
  const armThickness = h * 0.055;
  const armStartY = -h * 0.08;
  
  const hingeX = -w / 2;
  const hookX = -w / 2 - armLength;
  ctx.beginPath();
  ctx.fillStyle = "#3a3022";
  ctx.moveTo(hingeX, armStartY);
  ctx.lineTo(hingeX - armLength * 0.6, armStartY - armThickness * 0.3);
  ctx.quadraticCurveTo(hookX + 5, armStartY + armThickness, hookX, armStartY + armThickness * 1.8);
  ctx.lineTo(hookX, armStartY + armThickness * 2.2);
  ctx.quadraticCurveTo(hookX + 5, armStartY + armThickness * 1.5, hingeX - armLength * 0.6, armStartY + armThickness * 0.7);
  ctx.lineTo(hingeX, armStartY + armThickness);
  ctx.fill();
  
  const hingeXR = w / 2;
  const hookXR = w / 2 + armLength;
  ctx.beginPath();
  ctx.moveTo(hingeXR, armStartY);
  ctx.lineTo(hingeXR + armLength * 0.6, armStartY - armThickness * 0.3);
  ctx.quadraticCurveTo(hookXR - 5, armStartY + armThickness, hookXR, armStartY + armThickness * 1.8);
  ctx.lineTo(hookXR, armStartY + armThickness * 2.2);
  ctx.quadraticCurveTo(hookXR - 5, armStartY + armThickness * 1.5, hingeXR + armLength * 0.6, armStartY + armThickness * 0.7);
  ctx.lineTo(hingeXR, armStartY + armThickness);
  ctx.fill();
  
  ctx.fillStyle = "#c9a84c";
  ctx.fillRect(hingeX - 3, armStartY - 1, 5, armThickness + 2);
  ctx.fillRect(hingeXR - 2, armStartY - 1, 5, armThickness + 2);
  
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

  const [glasses, setGlasses] = useState(GLASS_OPTIONS[0]);
  const [selectedSize, setSelectedSize] = useState(GLASS_OPTIONS[0].defaultSize);
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [glbLoading, setGlbLoading] = useState(false);
  const [showArms, setShowArms] = useState(true);
  const [cameraReady, setCameraReady] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const cameraReadyRef = useRef(false);
  const smootherRef = useRef(new LandmarkSmoother(0.7));

  const is3D = glasses.id === "__3D__";
  const currentSizeData = glasses.sizes.find(s => s.label === selectedSize) || glasses.sizes[1];

  const [adjustments, setAdjustments] = useState(() =>
    Object.fromEntries(GLASS_OPTIONS.filter(g => !g.is3d).map(g => {
      if (g.id === "/glass2.png") return [g.id, { ...AVIATOR_ADJ }];
      if (g.id === "/glass4.png") return [g.id, { ...ROUND_ADJ }];
      return [g.id, { ...DEFAULT_ADJ }];
    }))
  );

  const brightnessRef = useRef(brightness);
  const contrastRef = useRef(contrast);
  const saturateRef = useRef(saturate);
  const glassesRef = useRef(glasses);
  const is3DRef = useRef(false);
  const adjRef = useRef(adjustments);
  const showArmsRef = useRef(showArms);

  // Snapshot of fixed size kept in a ref so the render loop always reads the latest
  const fixedSizeRef = useRef({ width: currentSizeData.pxWidth, height: currentSizeData.pxHeight });

  useEffect(() => { brightnessRef.current = brightness; }, [brightness]);
  useEffect(() => { contrastRef.current = contrast; }, [contrast]);
  useEffect(() => { saturateRef.current = saturate; }, [saturate]);
  useEffect(() => { glassesRef.current = glasses; }, [glasses]);
  useEffect(() => { is3DRef.current = glasses.id === "__3D__"; }, [glasses]);
  useEffect(() => { adjRef.current = adjustments; }, [adjustments]);
  useEffect(() => { showArmsRef.current = showArms; }, [showArms]);

  // Keep fixedSizeRef in sync with selected size — the ONLY thing that changes frame size
  useEffect(() => {
    fixedSizeRef.current = {
      width: currentSizeData.pxWidth,
      height: currentSizeData.pxHeight,
    };
  }, [currentSizeData]);

  const curAdj = adjustments[glasses.id] || DEFAULT_ADJ;

  // Returns the current fixed pixel size (never affected by zoom / face distance)
  const getFixedGlassesSize = useCallback(() => {
    return { width: fixedSizeRef.current.width, height: fixedSizeRef.current.height };
  }, []);

  // 3D Scene
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
    renderer.setSize(640, 480);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const cam = new THREE.OrthographicCamera(-320, 320, 240, -240, 0.1, 2000);
    cam.position.z = 500;
    cameraRef.current = cam;
    
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const keyLight = new THREE.DirectionalLight(0xfff5e0, 1.2);
    keyLight.position.set(2, 3, 4);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xc9e0ff, 0.5);
    fillLight.position.set(-2, 0, 2);
    scene.add(fillLight);
    
    setGlbLoading(true);
    new GLTFLoader().load(
      "/glasses.glb",
      (gltf) => {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        model.position.sub(box.getCenter(new THREE.Vector3()));
        modelWidthRef.current = box.getSize(new THREE.Vector3()).x || 1;
        glassModel3dRef.current = model;
        scene.add(model);
        setGlbLoading(false);
      },
      undefined,
      (err) => { console.error("GLB error:", err); setGlbLoading(false); }
    );
    return () => {
      if (rendererRef.current) rendererRef.current.dispose();
      rendererRef.current = sceneRef.current = cameraRef.current = glassModel3dRef.current = null;
    };
  }, [is3D]);

  // FaceMesh and rendering
  useEffect(() => {
    const loadMediaPipe = async () => {
      if (!window.FaceMesh) {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js";
          script.onload = resolve;
          document.head.appendChild(script);
        });
      }
      
      const faceMesh = new window.FaceMesh({
        locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${f}`,
      });
      faceMesh.setOptions({ 
        maxNumFaces: 1, 
        refineLandmarks: true, 
        minDetectionConfidence: 0.5, 
        minTrackingConfidence: 0.5 
      });
      
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" } 
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
            cameraReadyRef.current = true;
            setCameraReady(true);
          }
        } catch (err) {
          console.error("Camera error:", err);
          setCameraReady(true);
        }
      };
      
      startCamera();
      faceMesh.onResults(onResults);
      
      let frameRequest;
      const processFrame = async () => {
        if (videoRef.current && videoRef.current.readyState >= 2 && faceMesh) {
          await faceMesh.send({ image: videoRef.current });
        }
        frameRequest = requestAnimationFrame(processFrame);
      };
      frameRequest = requestAnimationFrame(processFrame);
      
      function onResults(results) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const W = canvas.width, H = canvas.height;
        
        ctx.clearRect(0, 0, W, H);
        ctx.filter = `brightness(${brightnessRef.current}%) contrast(${contrastRef.current}%) saturate(${saturateRef.current}%)`;
        if (results.image) ctx.drawImage(results.image, 0, 0, W, H);
        ctx.filter = "none";
        
        if (is3DRef.current && rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
        
        if (!results.multiFaceLandmarks?.length) {
          smootherRef.current.reset();
          return;
        }
        
        const lm = results.multiFaceLandmarks[0];
        const geo = extractFaceGeometry(lm, W, H);
        
        const smoothed = smootherRef.current.smooth({
          cx: geo.centerX, cy: geo.centerY,
          angle: geo.angle,
        });
        
        if (is3DRef.current) {
          const model = glassModel3dRef.current;
          if (model && rendererRef.current && sceneRef.current && cameraRef.current) {
            // Position tracks face; scale is FIXED by selected size only
            model.position.x = smoothed.cx - W / 2;
            model.position.y = -(smoothed.cy - H / 2);
            const fixedScale = 0.28 * (fixedSizeRef.current.width / 162);
            model.scale.setScalar(fixedScale);
            model.rotation.z = -smoothed.angle;
            rendererRef.current.render(sceneRef.current, cameraRef.current);
          }
        } else {
          const img = imgRef.current;
          if (!img.complete || !img.src) return;
          const adj = adjRef.current[glassesRef.current.id] || DEFAULT_ADJ;
          
          // FIXED pixel size — never changes with zoom or face distance
          const fixedSize = getFixedGlassesSize();
          const w = fixedSize.width * adj.scaleW;
          const h = fixedSize.height * adj.scaleH;
          const finalAngle = smoothed.angle + (adj.rotate * Math.PI / 180);
          const fx = smoothed.cx + adj.offsetX;
          const fy = smoothed.cy + adj.offsetY;
          
          if (showArmsRef.current) {
            drawGlassesWithArms(ctx, img, fx, fy, w, h, finalAngle);
          } else {
            ctx.save();
            ctx.translate(fx, fy);
            ctx.rotate(finalAngle);
            ctx.drawImage(img, -w / 2, -h / 2, w, h);
            ctx.restore();
          }
        }
      }
      
      return () => {
        cancelAnimationFrame(frameRequest);
        if (faceMesh) faceMesh.close();
        if (videoRef.current && videoRef.current.srcObject) {
          videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
      };
    };
    loadMediaPipe();
  }, [getFixedGlassesSize]);

  useEffect(() => {
    if (!is3D && imgRef.current) {
      imgRef.current.src = glasses.id;
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
    <>
      {/* Meta viewport tag to prevent zoom scaling of fixed elements */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover" />
      
      <div style={{ 
        fontFamily: "'Inter', 'Space Grotesk', sans-serif", 
        background: "#0a0a0c", 
        color: "#ffffff", 
        minHeight: "100vh", 
        display: "flex", 
        flexDirection: "column",
      }}>
        <div style={{ 
          display: "flex", 
          flexDirection: "column",
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
          padding: "20px 24px",
          gap: "24px",
        }}>
          {/* Header */}
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            paddingBottom: "20px",
          }}>
            <div>
              <h1 style={{ fontSize: "28px", fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>
                VR<span style={{ color: "#c9a84c" }}>.</span>OPTICS
              </h1>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", margin: "4px 0 0 0" }}>Virtual Try-On Experience</p>
            </div>
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "40px",
                padding: "10px 20px",
                color: isFavorite ? "#c9a84c" : "rgba(255,255,255,0.7)",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>{isFavorite ? "❤️" : "🤍"}</span> Add to Favorite Products
            </button>
          </div>

          {/* Two Column Layout */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
            {/* Camera Column */}
            <div style={{ flex: "2", minWidth: "300px" }}>
              <div style={{ 
                background: "rgba(255,255,255,0.02)",
                borderRadius: "28px",
                border: "1px solid rgba(255,255,255,0.08)",
                overflow: "hidden",
              }}>
                {/* FIXED-SIZE CONTAINER: Prevents zoom scaling of the frame area */}
                {/* Using CSS transform: scale(1) to counteract browser zoom */}
                <div 
                  className="zoom-resistant-container"
                  style={{ 
                    position: "relative", 
                    width: "640px", 
                    height: "480px", 
                    background: "#000",
                    margin: "0 auto",
                    transformOrigin: "top left",
                  }}
                >
                  {!cameraReady && (
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "#0a0a0c",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 20,
                      gap: "16px",
                    }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "50%", border: "2px solid rgba(201,168,76,0.3)", borderTop: "2px solid #c9a84c", animation: "spin 1s linear infinite" }} />
                      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>Initializing camera...</p>
                    </div>
                  )}
                  <video ref={videoRef} style={{ display: "none" }} autoPlay playsInline muted />
                  <canvas 
                    ref={canvasRef} 
                    width={640} 
                    height={480} 
                    style={{ 
                      width: "640px", 
                      height: "480px", 
                      objectFit: "cover",
                      display: "block",
                    }} 
                  />
                  <canvas 
                    ref={threeCanvasRef} 
                    width={640} 
                    height={480} 
                    style={{ 
                      position: "absolute", 
                      inset: 0, 
                      width: "640px", 
                      height: "480px", 
                      pointerEvents: "none", 
                      opacity: is3D ? 1 : 0,
                      display: "block",
                    }} 
                  />
                  {glbLoading && (
                    <div style={{ position: "absolute", bottom: "16px", right: "16px", background: "rgba(0,0,0,0.7)", padding: "6px 12px", borderRadius: "20px", fontSize: "11px" }}>
                      Loading 3D...
                    </div>
                  )}
                </div>
                
                {/* Product Info Bar */}
                <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                    <div>
                      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "1px" }}>PRODUCT NAME</div>
                      <div style={{ fontSize: "18px", fontWeight: 600 }}>{glasses.brand} {glasses.model}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>PRICE</div>
                      <div style={{ fontSize: "20px", fontWeight: 700, color: "#c9a84c" }}>{glasses.price}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls Column */}
            <div style={{ 
              flex: "1.2",
              minWidth: "280px",
              background: "rgba(255,255,255,0.02)",
              borderRadius: "28px",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "28px",
            }}>
              {/* Size Selection */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "1px", color: "rgba(255,255,255,0.6)" }}>SIZE</span>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Actual product dimensions</span>
                </div>
                
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {glasses.sizes.map(size => (
                    <button
                      key={size.label}
                      onClick={() => setSelectedSize(size.label)}
                      style={{
                        minWidth: "70px",
                        padding: "12px 8px",
                        borderRadius: "20px",
                        background: selectedSize === size.label ? "#c9a84c" : "rgba(255,255,255,0.05)",
                        border: selectedSize === size.label ? "none" : "1px solid rgba(255,255,255,0.1)",
                        color: selectedSize === size.label ? "#000" : "rgba(255,255,255,0.7)",
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: "16px", fontWeight: 600 }}>{size.label}</div>
                      <div style={{ fontSize: "9px", opacity: 0.8 }}>{size.width}×{size.height}mm</div>
                    </button>
                  ))}
                </div>
                
                {currentSizeData && (
                  <div style={{ 
                    marginTop: "12px", 
                    padding: "12px", 
                    background: "rgba(255,255,255,0.03)", 
                    borderRadius: "16px", 
                    fontSize: "11px", 
                    color: "rgba(255,255,255,0.5)",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Lens: <strong style={{ color: "#c9a84c" }}>{currentSizeData.width}×{currentSizeData.height}mm</strong></span>
                      <span>Bridge: <strong style={{ color: "#c9a84c" }}>{currentSizeData.bridge}mm</strong></span>
                    </div>
                    <div style={{ marginTop: "8px", fontSize: "10px", textAlign: "center", color: "#c9a84c", fontWeight: 500 }}>
                      🔒 FIXED SIZE — Does NOT change when you zoom in/out
                    </div>
                    <div style={{ marginTop: "4px", fontSize: "9px", textAlign: "center", color: "rgba(255,255,255,0.3)" }}>
                      Screen size: {currentSizeData.pxWidth}×{currentSizeData.pxHeight}px (constant)
                    </div>
                  </div>
                )}
              </div>

              {/* Color Selection */}
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "1px", color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>COLOR</div>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  {COLOR_OPTIONS.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "48px",
                        background: color.value,
                        border: selectedColor.name === color.name ? "2px solid #c9a84c" : "1px solid rgba(255,255,255,0.2)",
                        boxShadow: selectedColor.name === color.name ? "0 0 0 2px rgba(201,168,76,0.3)" : "none",
                      }} />
                      <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)" }}>{color.name}</span>
                      <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>{color.code}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Improve Fit */}
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "1px", color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>IMPROVE FIT</div>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <button 
                    onClick={() => setShowArms(!showArms)}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "30px",
                      padding: "10px 20px",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.8)",
                      cursor: "pointer",
                    }}
                  >
                    {showArms ? "Hide Arms" : "Show Arms"}
                  </button>
                </div>
              </div>

              {/* Manual Adjustment */}
              {!is3D && (
                <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "20px", padding: "16px" }}>
                  <div style={{ fontSize: "11px", color: "#c9a84c", marginBottom: "12px" }}>MANUAL ADJUSTMENT</div>
                  {[
                    { label: "Width", key: "scaleW", min: 0.7, max: 1.5, step: 0.01, fmt: v => `${(v*100).toFixed(0)}%` },
                    { label: "Height", key: "scaleH", min: 0.7, max: 1.5, step: 0.01, fmt: v => `${(v*100).toFixed(0)}%` },
                    { label: "Position X", key: "offsetX", min: -30, max: 30, step: 1, fmt: v => `${v}px` },
                    { label: "Position Y", key: "offsetY", min: -30, max: 30, step: 1, fmt: v => `${v}px` },
                  ].map(({ label, key, min, max, step, fmt }) => (
                    <div key={key} style={{ marginBottom: "12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "11px" }}>
                        <span>{label}</span>
                        <span style={{ color: "#c9a84c" }}>{fmt(curAdj[key])}</span>
                      </div>
                      <input 
                        type="range" 
                        min={min} 
                        max={max} 
                        step={step} 
                        value={curAdj[key]} 
                        onChange={e => setAdjustments(prev => ({ ...prev, [glasses.id]: { ...prev[glasses.id], [key]: Number(e.target.value) } }))}
                        style={{ width: "100%", height: "3px", background: "rgba(255,255,255,0.2)", borderRadius: "3px" }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Image */}
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "1px", color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>UPLOAD IMAGE</div>
                <label style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px dashed rgba(255,255,255,0.2)",
                  borderRadius: "20px",
                  padding: "14px",
                  cursor: "pointer",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.6)",
                }}>
                  📷 Upload Photo for Face Detection
                  <input type="file" accept="image/*" style={{ display: "none" }} />
                </label>
              </div>

              {/* Capture Button */}
              <button 
                onClick={capturePhoto}
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg, #c9a84c, #b8922e)",
                  border: "none",
                  borderRadius: "40px",
                  padding: "14px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#000",
                  cursor: "pointer",
                }}
              >
                📸 Capture Look
              </button>
            </div>
          </div>

          {/* Frame Selection Row */}
          <div style={{ 
            background: "rgba(255,255,255,0.02)",
            borderRadius: "28px",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "20px",
          }}>
            <div style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "1px", color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>
              TRY OTHER STYLES
            </div>
            <div style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "8px" }}>
              {GLASS_OPTIONS.map(g => (
                <button
                  key={g.id}
                  onClick={() => {
                    setGlasses(g);
                    setSelectedSize(g.defaultSize);
                  }}
                  style={{
                    minWidth: "100px",
                    background: glasses.id === g.id ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.03)",
                    border: glasses.id === g.id ? "1px solid #c9a84c" : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "20px",
                    padding: "12px",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ fontSize: "28px", marginBottom: "8px" }}>{g.emoji}</div>
                  <div style={{ fontSize: "13px", fontWeight: 500 }}>{g.name}</div>
                  <div style={{ fontSize: "11px", color: "#c9a84c" }}>{g.price}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          ::-webkit-scrollbar { width: 6px; height: 6px; }
          ::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 10px; }
          ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.5); border-radius: 10px; }
          input[type="range"] { -webkit-appearance: none; }
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 14px; height: 14px;
            border-radius: 50%;
            background: #c9a84c;
            cursor: pointer;
          }
          button { transition: all 0.2s ease; }
          button:hover { transform: scale(0.98); opacity: 0.9; }
          
          /* CRITICAL: CSS zoom resistance for the camera container */
          .zoom-resistant-container {
            zoom: reset;
            -moz-transform: scale(1);
            -webkit-transform: scale(1);
            transform: scale(1);
          }
          
          /* Ensure canvas elements don't inherit zoom */
          canvas {
            zoom: 1;
            image-rendering: crisp-edges;
          }
          
          /* Prevent text zoom from affecting layout */
          body {
            text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
          }
        `}</style>
      </div>
    </>
  );
};

export default TryOn;