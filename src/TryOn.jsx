import React, { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// ── Per-frame default adjustments ─────────────────────────────────
const DEFAULT_ADJ = { scaleW: 1, scaleH: 1, offsetX: 0, offsetY: 8, rotate: 0 };
const AVIATOR_ADJ = { scaleW: 1, scaleH: 1.18, offsetX: 0, offsetY: 18, rotate: 0 };
const ROUND_ADJ   = { scaleW: 1, scaleH: 0.85, offsetX: 0, offsetY: 6, rotate: 0 };

// ── ENHANCED PRODUCT DATA (with colors, product link) ─────────────
const GLASS_OPTIONS = [
  {
    id: "classic",
    name: "Classic",
    price: "PKR 4,500",
    emoji: "👓",
    productLink: "https://example.com/classic",
    colors: [
      { name: "Black", image: "/glass1_black.png" },
      { name: "White", image: "/glass1_white.png" }
    ],
    sizes: [
      { label: "S", scale: 0.85 },
      { label: "M", scale: 1.0 },
      { label: "L", scale: 1.15 },
      { label: "XL", scale: 1.3 }
    ]
  },
  {
    id: "aviator",
    name: "Aviator",
    price: "PKR 5,200",
    emoji: "🕶️",
    productLink: "https://example.com/aviator",
    colors: [
      { name: "Black", image: "/glass2_black.png" },
      { name: "White", image: "/glass2_white.png" }
    ],
    sizes: [
      { label: "S", scale: 0.85 },
      { label: "M", scale: 1.0 },
      { label: "L", scale: 1.15 },
      { label: "XL", scale: 1.3 }
    ]
  },
  {
    id: "sport",
    name: "Sport",
    price: "PKR 3,800",
    emoji: "🥽",
    productLink: "https://example.com/sport",
    colors: [
      { name: "Black", image: "/glass3_black.png" },
      { name: "White", image: "/glass3_white.png" }
    ],
    sizes: [
      { label: "S", scale: 0.85 },
      { label: "M", scale: 1.0 },
      { label: "L", scale: 1.15 },
      { label: "XL", scale: 1.3 }
    ]
  },
  {
    id: "round",
    name: "Round",
    price: "PKR 4,900",
    emoji: "🪬",
    productLink: "https://example.com/round",
    colors: [
      { name: "Black", image: "/glass4_black.png" },
      { name: "White", image: "/glass4_white.png" }
    ],
    sizes: [
      { label: "S", scale: 0.85 },
      { label: "M", scale: 1.0 },
      { label: "L", scale: 1.15 },
      { label: "XL", scale: 1.3 }
    ]
  },
  {
    id: "3d",
    name: "3D Frame",
    price: "PKR 6,500",
    emoji: "✨",
    is3d: true,
    productLink: "https://example.com/3d",
    colors: [], // 3D model uses a single GLB; color selection disabled
    sizes: [
      { label: "S", scale: 0.85 },
      { label: "M", scale: 1.0 },
      { label: "L", scale: 1.15 },
      { label: "XL", scale: 1.3 }
    ]
  }
];

// ══════════════════════════════════════════════════════════════════
// ── ENHANCED FACE LANDMARK INDICES (MediaPipe 468 + 10 iris)  ──
// ══════════════════════════════════════════════════════════════════
const LANDMARKS = {
  LEFT_IRIS_CENTER:  468,
  RIGHT_IRIS_CENTER: 473,
  LEFT_EYE_INNER:  133,
  LEFT_EYE_OUTER:   33,
  RIGHT_EYE_INNER: 362,
  RIGHT_EYE_OUTER: 263,
  LEFT_EYEBROW_LOWER:  [70, 63, 105, 66, 107],
  RIGHT_EYEBROW_LOWER: [300, 293, 334, 296, 336],
  LEFT_EYEBROW_UPPER:  [46, 53, 52, 65, 55],
  RIGHT_EYEBROW_UPPER: [276, 283, 282, 295, 285],
  NOSE_BRIDGE_TOP:    6,
  NOSE_BRIDGE_MID:  168,
  NOSE_BRIDGE_LOW:  197,
  NOSE_TIP:           5,
  NOSE_LEFT_PAD:   124,
  NOSE_RIGHT_PAD:  353,
  FACE_LEFT:   234,
  FACE_RIGHT:  454,
  CHEEK_LEFT:  116,
  CHEEK_RIGHT: 345,
  FOREHEAD_CENTER: 10,
  CHIN: 152,
  UNDER_EYE_LEFT:  145,
  UNDER_EYE_RIGHT: 374,
  TEMPLE_LEFT:  127,
  TEMPLE_RIGHT: 356,
  LEFT_UPPER_LID:  159,
  RIGHT_UPPER_LID: 386,
  LEFT_LOWER_LID:  145,
  RIGHT_LOWER_LID: 374,
};

// ══════════════════════════════════════════════════════════════════
// ── EXPONENTIAL MOVING AVERAGE SMOOTHER ─────────────────────────
// ══════════════════════════════════════════════════════════════════
class LandmarkSmoother {
  constructor(alpha = 0.45) {
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
// ── FULL FACE GEOMETRY EXTRACTOR ────────────────────────────────
// ══════════════════════════════════════════════════════════════════
function extractFaceGeometry(lm, W, H) {
  const px = (idx) => ({ x: lm[idx].x * W, y: lm[idx].y * H, z: lm[idx].z });
  const avgPx = (indices) => {
    const pts = indices.map(i => px(i));
    return {
      x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
      y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
      z: pts.reduce((s, p) => s + p.z, 0) / pts.length,
    };
  };
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

  const leftIris   = px(LANDMARKS.LEFT_IRIS_CENTER);
  const rightIris  = px(LANDMARKS.RIGHT_IRIS_CENTER);
  const leftEyeOut = px(LANDMARKS.LEFT_EYE_OUTER);
  const rightEyeOut= px(LANDMARKS.RIGHT_EYE_OUTER);
  const leftBrowLower  = avgPx(LANDMARKS.LEFT_EYEBROW_LOWER);
  const rightBrowLower = avgPx(LANDMARKS.RIGHT_EYEBROW_LOWER);
  const browMidLower   = { x: (leftBrowLower.x + rightBrowLower.x)/2, y: (leftBrowLower.y + rightBrowLower.y)/2 };
  const noseBridgeTop = px(LANDMARKS.NOSE_BRIDGE_TOP);

  const eyeSpan = dist(leftEyeOut, rightEyeOut);
  const leftBrowEyeGap  = dist(leftBrowLower, leftIris);
  const rightBrowEyeGap = dist(rightBrowLower, rightIris);
  const avgBrowEyeGap   = (leftBrowEyeGap + rightBrowEyeGap) / 2;

  const angleIris = Math.atan2(rightIris.y - leftIris.y, rightIris.x - leftIris.x);
  const angleEyeCorners = Math.atan2(rightEyeOut.y - leftEyeOut.y, rightEyeOut.x - leftEyeOut.x);
  const angleBrow = Math.atan2(rightBrowLower.y - leftBrowLower.y, rightBrowLower.x - leftBrowLower.x);
  const angle = angleEyeCorners * 0.5 + angleBrow * 0.3 + angleIris * 0.2;

  const centerX = (leftIris.x + rightIris.x) / 2;
  const browCenterY = browMidLower.y;
  const noseBridgeY = noseBridgeTop.y;
  const centerY = browCenterY * 0.35 + noseBridgeY * 0.45 + ((leftIris.y + rightIris.y)/2) * 0.20;

  const glassesWidth = eyeSpan * 1.7;
  const glassesHeight = avgBrowEyeGap * 3.3;

  const avgZ = (leftIris.z + rightIris.z + noseBridgeTop.z) / 3;
  const depthScale = 1 + (-avgZ * 0.8);

  return { centerX, centerY, angle, glassesWidth, glassesHeight, depthScale };
}

// ── REALISTIC GLASSES WITH SIDE ARMS (unchanged) ──
const drawGlassesWithRealisticArms = (ctx, img, x, y, w, h, angle) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.shadowColor = "rgba(0,0,0,0.35)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.drawImage(img, -w / 2, -h / 2, w, h);
  ctx.shadowColor = "transparent";
  
  const armLength = w * 0.92;
  const armThickness = h * 0.058;
  const armStartY = -h * 0.09;
  
  const hingeX = -w / 2;
  const hingeY = armStartY;
  const backX = -w / 2 - armLength * 0.42;
  const backY = armStartY - armThickness * 0.2;
  const earX = -w / 2 - armLength * 0.68;
  const earY = armStartY + armThickness * 1.3;
  const hookX = -w / 2 - armLength;
  const hookY = armStartY + armThickness * 2.0;
  
  ctx.beginPath();
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
  
  ctx.fillStyle = "#c9a84c";
  ctx.fillRect(hingeX - 4, hingeY - 1.5, 6, armThickness + 3);
  ctx.fillRect(hingeXR - 2, hingeYR - 1.5, 6, armThickness + 3);
  
  ctx.fillStyle = "#3a3022";
  ctx.beginPath();
  ctx.ellipse(hookX - 3, hookY + armThickness * 0.7, armThickness * 0.9, armThickness * 1.3, -0.25, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(hookXR + 3, hookYR + armThickness * 0.7, armThickness * 0.9, armThickness * 1.3, 0.25, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = "rgba(220, 200, 160, 0.25)";
  ctx.beginPath();
  ctx.moveTo(hingeX + 2, hingeY + 2);
  ctx.lineTo(backX - 3, backY + 1.5);
  ctx.quadraticCurveTo(earX - 4, earY - 3, hookX - 3, hookY + 2);
  ctx.lineTo(hookX - 3, hookY + armThickness - 3);
  ctx.quadraticCurveTo(earX - 4, earY + armThickness - 5, backX - 3, backY + armThickness - 2);
  ctx.lineTo(hingeX + 2, hingeY + armThickness - 1);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(hingeXR - 2, hingeYR + 2);
  ctx.lineTo(backXR + 3, backYR + 1.5);
  ctx.quadraticCurveTo(earXR + 4, earYR - 3, hookXR + 3, hookYR + 2);
  ctx.lineTo(hookXR + 3, hookYR + armThickness - 3);
  ctx.quadraticCurveTo(earXR + 4, earYR + armThickness - 5, backXR + 3, backYR + armThickness - 2);
  ctx.lineTo(hingeXR - 2, hingeYR + armThickness - 1);
  ctx.fill();
  
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

  // State for selected product, color, size
  const [selectedProduct, setSelectedProduct] = useState(GLASS_OPTIONS[0]);
  const [selectedColor, setSelectedColor] = useState(selectedProduct.colors[0]?.name || "");
  const [selectedSizeKey, setSelectedSizeKey] = useState("M");
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [glbLoading, setGlbLoading] = useState(false);
  const [showArms, setShowArms] = useState(true);
  const [cameraReady, setCameraReady] = useState(false);
  const cameraReadyRef = useRef(false);

  const is3D = selectedProduct.is3d === true;
  const currentImage = is3D ? null : selectedProduct.colors.find(c => c.name === selectedColor)?.image || selectedProduct.colors[0]?.image;

  // Helper: get size scale multiplier
  const getSizeScale = useCallback(() => {
    const sizeObj = selectedProduct.sizes?.find(s => s.label === selectedSizeKey);
    return sizeObj ? sizeObj.scale : 1.0;
  }, [selectedProduct, selectedSizeKey]);

  const smootherRef = useRef(new LandmarkSmoother(0.45));

  // Adjustments state (keyed by product id + color? We keep by product id for simplicity)
  const [adjustments, setAdjustments] = useState(() =>
    Object.fromEntries(
      GLASS_OPTIONS.filter(g => !g.is3d).map(g => {
        if (g.id === "aviator") return [g.id, { ...AVIATOR_ADJ }];
        if (g.id === "round") return [g.id, { ...ROUND_ADJ }];
        return [g.id, { ...DEFAULT_ADJ }];
      })
    )
  );

  const brightnessRef = useRef(brightness);
  const contrastRef = useRef(contrast);
  const saturateRef = useRef(saturate);
  const selectedProductRef = useRef(selectedProduct);
  const is3DRef = useRef(is3D);
  const adjRef = useRef(adjustments);
  const showArmsRef = useRef(showArms);
  const currentImageRef = useRef(currentImage);
  const getSizeScaleRef = useRef(getSizeScale);

  useEffect(() => { brightnessRef.current = brightness; }, [brightness]);
  useEffect(() => { contrastRef.current = contrast; }, [contrast]);
  useEffect(() => { saturateRef.current = saturate; }, [saturate]);
  useEffect(() => { selectedProductRef.current = selectedProduct; }, [selectedProduct]);
  useEffect(() => { is3DRef.current = is3D; }, [is3D]);
  useEffect(() => { adjRef.current = adjustments; }, [adjustments]);
  useEffect(() => { showArmsRef.current = showArms; }, [showArms]);
  useEffect(() => { currentImageRef.current = currentImage; }, [currentImage]);
  useEffect(() => { getSizeScaleRef.current = getSizeScale; }, [getSizeScale]);

  const curAdj = adjustments[selectedProduct.id] || DEFAULT_ADJ;

  const setAdj = (key, val) =>
    setAdjustments(prev => ({ ...prev, [selectedProduct.id]: { ...prev[selectedProduct.id], [key]: val } }));

  const resetAdj = () => {
    if (selectedProduct.id === "aviator") {
      setAdjustments(prev => ({ ...prev, [selectedProduct.id]: { ...AVIATOR_ADJ } }));
    } else if (selectedProduct.id === "round") {
      setAdjustments(prev => ({ ...prev, [selectedProduct.id]: { ...ROUND_ADJ } }));
    } else {
      setAdjustments(prev => ({ ...prev, [selectedProduct.id]: { ...DEFAULT_ADJ } }));
    }
  };

  // 3D scene init (unchanged)
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

  // FaceMesh and main loop (with size multiplier applied)
  useEffect(() => {
    const faceMesh = new window.FaceMesh({
      locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${f}`,
    });
    faceMesh.setOptions({ maxNumFaces: 1, refineLandmarks: true, minDetectionConfidence: 0.5, minTrackingConfidence: 0.5 });
    faceMesh.onResults(onResults);
    const camera = new window.Camera(videoRef.current, {
      onFrame: async () => {
        if (!cameraReadyRef.current) {
          cameraReadyRef.current = true;
          setCameraReady(true);
        }
        await faceMesh.send({ image: videoRef.current });
      },
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
      if (!results.multiFaceLandmarks?.length) {
        smootherRef.current.reset();
        return;
      }
      const lm = results.multiFaceLandmarks[0];
      const geo = extractFaceGeometry(lm, W, H);
      const smoothed = smootherRef.current.smooth({
        cx: geo.centerX, cy: geo.centerY, gw: geo.glassesWidth, gh: geo.glassesHeight,
        angle: geo.angle, ds: geo.depthScale,
      });
      
      const sizeScale = getSizeScaleRef.current();
      
      if (_is3D) {
        const model = glassModel3dRef.current;
        const r = rendererRef.current, s = sceneRef.current, c = cameraRef.current;
        if (model && r && s && c) {
          model.position.x = smoothed.cx - W / 2;
          model.position.y = -(smoothed.cy - H / 2);
          let scale3D = (smoothed.gw * smoothed.ds) / modelWidthRef.current;
          scale3D *= sizeScale;
          model.scale.setScalar(scale3D);
          model.rotation.z = -smoothed.angle;
          r.render(s, c);
        }
      } else {
        const img = imgRef.current;
        if (!img.complete || !img.src) return;
        const adj = adjRef.current[selectedProductRef.current.id] || DEFAULT_ADJ;
        let w = smoothed.gw * adj.scaleW * smoothed.ds;
        let h = smoothed.gh * adj.scaleH * smoothed.ds;
        w *= sizeScale;
        h *= sizeScale;
        const finalAngle = smoothed.angle + (adj.rotate * Math.PI / 180);
        const fx = smoothed.cx + adj.offsetX;
        const fy = smoothed.cy + adj.offsetY;
        if (showArmsRef.current) {
          drawGlassesWithRealisticArms(ctx, img, fx, fy, w, h, finalAngle);
        } else {
          ctx.save();
          ctx.translate(fx, fy);
          ctx.rotate(finalAngle);
          ctx.drawImage(img, -w / 2, -h / 2, w, h);
          ctx.restore();
        }
      }
    }
    return () => { if (faceMesh) faceMesh.close(); };
  }, []);

  // Load image when currentImage changes
  useEffect(() => {
    if (!is3D && currentImage) {
      imgRef.current.src = currentImage;
      imgRef.current.crossOrigin = "Anonymous";
    }
  }, [currentImage, is3D]);

  const capturePhoto = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'vroptics_tryon.png';
    link.href = canvas.toDataURL();
    link.click();
  }, []);

  // Responsive UI helpers
  const isMobile = window.innerWidth <= 768;
  
  return (
    <div style={{ 
      fontFamily: "'Space Grotesk', 'Inter', sans-serif", 
      background: "radial-gradient(circle at 20% 30%, #050508, #000000)", 
      color: "#f0ede8", 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column",
      position: "relative",
      overflowX: "hidden"
    }}>
      {/* Animated background elements */}
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: `radial-gradient(circle at 25% 40%, rgba(201,168,76,0.08) 0%, transparent 50%), repeating-linear-gradient(45deg, rgba(201,168,76,0.02) 0px, rgba(201,168,76,0.02) 2px, transparent 2px, transparent 8px)`,
        pointerEvents: "none",
        zIndex: 0
      }} />
      <div style={{ position: "fixed", top: "-20%", right: "-10%", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(201,168,76,0.12), transparent 70%)", borderRadius: "50%", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-20%", left: "-10%", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(100,180,255,0.08), transparent 70%)", borderRadius: "50%", pointerEvents: "none", zIndex: 0 }} />

      {/* Header */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between", 
        padding: "16px 20px", 
        borderBottom: "1px solid rgba(201,168,76,0.3)",
        backdropFilter: "blur(16px)",
        background: "rgba(0,0,0,0.6)",
        zIndex: 2,
        position: "relative"
      }}>
        <div style={{ 
          fontFamily: "'Space Grotesk', monospace", 
          fontSize: isMobile ? "20px" : "26px", 
          fontWeight: 600, 
          letterSpacing: "-0.02em", 
          background: "linear-gradient(135deg, #f0e8d0 0%, #c9a84c 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 0 8px rgba(201,168,76,0.3)"
        }}>
          VR<span style={{ color: "#c9a84c", background: "none", WebkitTextFillColor: "#c9a84c" }}>.</span>OPTICS
        </div>
        <div style={{ 
          fontSize: "9px", 
          letterSpacing: "2px", 
          background: "rgba(201,168,76,0.15)",
          border: "1px solid rgba(201,168,76,0.5)",
          padding: "5px 12px", 
          borderRadius: "40px",
          backdropFilter: "blur(4px)",
          fontWeight: 500
        }}>
          {is3D ? "⚡ 3D MODE" : "🔮 LIVE"}
        </div>
      </div>

      <div style={{ 
        display: "flex", 
        flexDirection: isMobile ? "column" : "row",
        gap: "20px", 
        flex: 1, 
        padding: "16px", 
        overflowY: "auto",
        zIndex: 2,
        position: "relative"
      }}>
        {/* Camera viewer */}
        <div style={{ 
          background: "rgba(8, 8, 12, 0.7)",
          backdropFilter: "blur(20px)",
          borderRadius: "32px", 
          padding: "12px", 
          border: "1px solid rgba(201,168,76,0.25)",
          boxShadow: "0 25px 40px -12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
          flex: isMobile ? "auto" : 2,
        }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", maxWidth: "100%", margin: "0 auto" }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                width: "16px",
                height: "16px",
                borderColor: "#c9a84c",
                borderStyle: "solid",
                zIndex: 10,
                top: i < 2 ? "8px" : "auto",
                bottom: i >= 2 ? "8px" : "auto",
                left: i % 2 === 0 ? "8px" : "auto",
                right: i % 2 === 1 ? "8px" : "auto",
                borderWidth: i === 0 ? "2px 0 0 2px" : i === 1 ? "2px 2px 0 0" : i === 2 ? "0 0 2px 2px" : "0 2px 2px 0",
                opacity: 0.7
              }} />
            ))}
            <div style={{ 
              position: "absolute", 
              top: "12px", 
              right: "12px", 
              display: "flex", 
              alignItems: "center", 
              gap: "6px", 
              fontSize: "9px", 
              fontWeight: 600,
              letterSpacing: "1px", 
              color: "#c9a84c", 
              zIndex: 10, 
              background: "rgba(0,0,0,0.6)", 
              padding: "4px 10px", 
              borderRadius: "40px",
              backdropFilter: "blur(8px)"
            }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c9a84c", boxShadow: "0 0 8px #c9a84c", animation: "pulse 1.2s ease-in-out infinite" }} />
              {is3D ? "3D ACTIVE" : "FACE TRACKING"}
            </div>
            <div style={{ 
              position: "absolute", 
              bottom: "12px", 
              left: "12px", 
              display: "flex", 
              gap: "6px", 
              flexWrap: "wrap", 
              zIndex: 10 
            }}>
              <span style={{ fontSize: "8px", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", border: "0.5px solid rgba(201,168,76,0.3)", padding: "3px 10px", borderRadius: "30px" }}>💡 {brightness}%</span>
              <span style={{ fontSize: "8px", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", border: "0.5px solid rgba(201,168,76,0.3)", padding: "3px 10px", borderRadius: "30px" }}>🎨 {contrast}%</span>
              <span style={{ fontSize: "8px", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", border: "0.5px solid rgba(201,168,76,0.3)", padding: "3px 10px", borderRadius: "30px" }}>🌈 {saturate}%</span>
              {showArms && !is3D && <span style={{ fontSize: "8px", background: "rgba(201,168,76,0.2)", borderColor: "#c9a84c", color: "#c9a84c", padding: "3px 10px", borderRadius: "30px" }}>🦾 ARMS ON</span>}
            </div>
            {glbLoading && (
              <div style={{ 
                position: "absolute", 
                top: "50%", 
                left: "50%", 
                transform: "translate(-50%,-50%)", 
                fontSize: "10px", 
                fontWeight: 600,
                background: "rgba(0,0,0,0.8)", 
                padding: "6px 16px", 
                borderRadius: "40px", 
                zIndex: 20, 
                border: "1px solid #c9a84c"
              }}>
                ⚡ LOADING 3D...
              </div>
            )}
            {!cameraReady && (
              <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: "24px",
                background: "rgba(5, 5, 8, 0.97)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                zIndex: 30,
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: "3px solid rgba(201,168,76,0.15)",
                  borderTop: "3px solid #c9a84c",
                  animation: "spinRing 0.9s linear infinite"
                }} />
                <div style={{ textAlign: "center", fontSize: "10px", fontWeight: 700, letterSpacing: "2px", color: "#c9a84c" }}>INITIALIZING CAMERA</div>
              </div>
            )}
            <video ref={videoRef} style={{ display: "none" }} autoPlay playsInline muted />
            <canvas ref={canvasRef} width={640} height={480} style={{ display: "block", width: "100%", height: "100%", borderRadius: "24px", objectFit: "cover", boxShadow: "inset 0 0 20px rgba(0,0,0,0.3)" }} />
            <canvas ref={threeCanvasRef} width={640} height={480} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: is3D ? 1 : 0, borderRadius: "24px" }} />
          </div>
        </div>

        {/* Controls panel */}
        <div style={{ 
          background: "rgba(12, 12, 18, 0.7)",
          backdropFilter: "blur(24px)",
          borderRadius: "32px", 
          padding: "18px", 
          display: "flex", 
          flexDirection: "column", 
          gap: "20px", 
          border: "1px solid rgba(201,168,76,0.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          flex: isMobile ? "auto" : 1.2,
        }}>
          {/* Frame selection */}
          <div>
            <div style={{ fontSize: "10px", letterSpacing: "2.5px", color: "#c9a84c", marginBottom: "12px", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "20px", height: "2px", background: "#c9a84c" }}></span>
              SELECT FRAME
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "10px" }}>
              {GLASS_OPTIONS.map(g => (
                <div key={g.id} onClick={() => {
                  setSelectedProduct(g);
                  if (g.colors.length) setSelectedColor(g.colors[0].name);
                  setSelectedSizeKey("M");
                }} style={{
                  background: selectedProduct.id === g.id ? (g.is3d ? "linear-gradient(135deg, #0f1828, #0a0f1a)" : "linear-gradient(135deg, #1e1a10, #14110a)") : "rgba(20,20,28,0.6)",
                  border: `1px solid ${selectedProduct.id === g.id ? (g.is3d ? "#64b4ff" : "#c9a84c") : "rgba(201,168,76,0.2)"}`,
                  borderRadius: "20px", padding: "12px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer", transition: "all 0.2s", transform: selectedProduct.id === g.id ? "scale(1.02)" : "scale(1)", position: "relative"
                }}>
                  {g.is3d && <span style={{ position: "absolute", top: "6px", right: "6px", fontSize: "7px", fontWeight: 700, color: "#64b4ff", background: "rgba(100,180,255,0.2)", padding: "2px 6px", borderRadius: "20px" }}>3D</span>}
                  <div style={{ fontSize: "28px" }}>{g.emoji}</div>
                  <div style={{ fontSize: "11px", fontWeight: 500 }}>{g.name}</div>
                  <div style={{ fontSize: "11px", color: g.is3d ? "#64b4ff" : "#c9a84c", fontWeight: 700 }}>{g.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Color selection (only if not 3D and has colors) */}
          {!is3D && selectedProduct.colors?.length > 0 && (
            <div>
              <div style={{ fontSize: "10px", letterSpacing: "2.5px", color: "#c9a84c", marginBottom: "10px", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "20px", height: "2px", background: "#c9a84c" }}></span>
                COLOR
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                {selectedProduct.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    style={{
                      flex: 1,
                      background: selectedColor === color.name ? "linear-gradient(135deg, #c9a84c, #b38f3a)" : "rgba(20,20,28,0.8)",
                      border: `1px solid ${selectedColor === color.name ? "#c9a84c" : "rgba(201,168,76,0.3)"}`,
                      color: selectedColor === color.name ? "#0c0c0e" : "#f0ede8",
                      fontSize: "12px",
                      fontWeight: 600,
                      padding: "8px 0",
                      borderRadius: "40px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      textTransform: "uppercase"
                    }}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size selection */}
          {selectedProduct.sizes?.length > 0 && (
            <div>
              <div style={{ fontSize: "10px", letterSpacing: "2.5px", color: "#c9a84c", marginBottom: "10px", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "20px", height: "2px", background: "#c9a84c" }}></span>
                FRAME SIZE
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {selectedProduct.sizes.map(size => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSizeKey(size.label)}
                    style={{
                      flex: "1 0 auto",
                      minWidth: "60px",
                      background: selectedSizeKey === size.label ? "linear-gradient(135deg, #c9a84c, #b38f3a)" : "rgba(20,20,28,0.8)",
                      border: `1px solid ${selectedSizeKey === size.label ? "#c9a84c" : "rgba(201,168,76,0.3)"}`,
                      color: selectedSizeKey === size.label ? "#0c0c0e" : "#f0ede8",
                      fontSize: "12px",
                      fontWeight: 700,
                      padding: "8px 0",
                      borderRadius: "40px",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Product link */}
          {selectedProduct.productLink && (
            <div style={{ marginTop: "4px" }}>
              <a href={selectedProduct.productLink} target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "11px",
                color: "#c9a84c",
                textDecoration: "none",
                borderBottom: "1px dashed rgba(201,168,76,0.5)",
                paddingBottom: "2px"
              }}>
                🔗 VIEW PRODUCT →
              </a>
            </div>
          )}

          {/* Arms toggle (2D only) */}
          {!is3D && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0" }}>
              <span style={{ fontSize: "11px", fontWeight: 500, color: "rgba(240,236,225,0.8)" }}>🦾 REALISTIC ARMS</span>
              <label style={{ position: "relative", display: "inline-block", width: "44px", height: "22px" }}>
                <input type="checkbox" checked={showArms} onChange={(e) => setShowArms(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
                <span style={{ position: "absolute", cursor: "pointer", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#2a2a2f", transition: ".3s", borderRadius: "22px", border: "0.5px solid rgba(201,168,76,0.4)" }}>
                  <span style={{ position: "absolute", height: "16px", width: "16px", left: "3px", bottom: "2px", backgroundColor: "#c9a84c", transition: ".3s", borderRadius: "50%", transform: showArms ? "translateX(22px)" : "none", boxShadow: "0 0 6px #c9a84c" }} />
                </span>
              </label>
            </div>
          )}

          {/* Manual adjustments (2D only) */}
          {!is3D && (
            <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: "24px", padding: "14px", border: "0.5px solid rgba(201,168,76,0.2)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px", alignItems: "center" }}>
                <span style={{ fontSize: "9px", letterSpacing: "2px", color: "#c9a84c", fontWeight: 600 }}>⚙️ FRAME ADJUST</span>
                <button onClick={resetAdj} style={{ fontSize: "8px", fontWeight: 500, color: "#c9a84c", background: "rgba(201,168,76,0.1)", border: "0.5px solid rgba(201,168,76,0.4)", padding: "3px 12px", borderRadius: "30px", cursor: "pointer" }}>⟳ RESET</button>
              </div>
              {[
                { label: "WIDTH", key: "scaleW", min: 0.3, max: 3, step: 0.05, fmt: v => `${v.toFixed(2)}×` },
                { label: "HEIGHT", key: "scaleH", min: 0.3, max: 3, step: 0.05, fmt: v => `${v.toFixed(2)}×` },
                { label: "MOVE L/R", key: "offsetX", min: -150, max: 150, step: 1, fmt: v => `${v > 0 ? "+" : ""}${v}px` },
                { label: "MOVE U/D", key: "offsetY", min: -150, max: 150, step: 1, fmt: v => `${v > 0 ? "+" : ""}${v}px` },
                { label: "ROTATION", key: "rotate", min: -30, max: 30, step: 0.5, fmt: v => `${v > 0 ? "+" : ""}${v.toFixed(1)}°` },
              ].map(({ label, key, min, max, step, fmt }) => (
                <div key={key} style={{ marginBottom: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "10px", color: "rgba(240,236,225,0.6)" }}>{label}</span>
                    <span style={{ fontSize: "10px", color: "#c9a84c", fontWeight: 600 }}>{fmt(curAdj[key])}</span>
                  </div>
                  <input type="range" min={min} max={max} step={step} value={curAdj[key]} onChange={e => setAdj(key, Number(e.target.value))} style={{ width: "100%", height: "3px", background: "rgba(201,168,76,0.2)", borderRadius: "4px" }} />
                </div>
              ))}
            </div>
          )}

          {/* Scene filters */}
          <div>
            <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#c9a84c", marginBottom: "12px", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "20px", height: "2px", background: "#c9a84c" }}></span>
              SCENE FILTERS
            </div>
            {[
              { label: "BRIGHTNESS", val: brightness, set: setBrightness, icon: "☀️" },
              { label: "CONTRAST", val: contrast, set: setContrast, icon: "🎚️" },
              { label: "SATURATION", val: saturate, set: setSaturate, icon: "🎨" },
            ].map(({ label, val, set, icon }) => (
              <div key={label} style={{ marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "10px", color: "rgba(240,236,225,0.6)" }}>{icon} {label}</span>
                  <span style={{ fontSize: "10px", color: "#c9a84c", fontWeight: 600 }}>{val}%</span>
                </div>
                <input type="range" min="0" max="200" step="1" value={val} onChange={e => set(Number(e.target.value))} style={{ width: "100%", height: "3px", background: "rgba(201,168,76,0.2)", borderRadius: "4px" }} />
              </div>
            ))}
          </div>

          <button onClick={capturePhoto} style={{ width: "100%", background: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))", border: "1px solid rgba(201,168,76,0.5)", color: "#c9a84c", fontSize: "11px", letterSpacing: "2px", padding: "12px", borderRadius: "60px", cursor: "pointer", fontWeight: 700, transition: "all 0.2s" }}>📸 CAPTURE LOOK</button>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.85)} }
        @keyframes spinRing { to { transform: rotate(360deg); } }
        input[type="range"] { -webkit-appearance: none; background: transparent; }
        input[type="range"]:focus { outline: none; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%; background: #c9a84c; cursor: pointer; border: 2px solid #0c0c0e; box-shadow: 0 0 6px #c9a84c; }
        input[type="range"]::-moz-range-thumb { width: 14px; height: 14px; border-radius: 50%; background: #c9a84c; cursor: pointer; border: 2px solid #0c0c0e; }
        button:hover { background: rgba(201,168,76,0.2); box-shadow: 0 0 12px rgba(201,168,76,0.3); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: rgba(20,20,28,0.5); border-radius: 4px; }
        ::-webkit-scrollbar-thumb { background: #c9a84c; border-radius: 4px; }
        @media (max-width: 768px) {
          div { transition: all 0.2s ease; }
        }
      `}</style>
    </div>
  );
};

export default TryOn;