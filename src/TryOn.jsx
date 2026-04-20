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

  reset() {
    this.prev = null;
  }
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
  const dist = (a, b) => Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

  const leftIris   = px(LANDMARKS.LEFT_IRIS_CENTER);
  const rightIris  = px(LANDMARKS.RIGHT_IRIS_CENTER);
  const leftEyeIn  = px(LANDMARKS.LEFT_EYE_INNER);
  const leftEyeOut = px(LANDMARKS.LEFT_EYE_OUTER);
  const rightEyeIn = px(LANDMARKS.RIGHT_EYE_INNER);
  const rightEyeOut= px(LANDMARKS.RIGHT_EYE_OUTER);
  const leftBrowLower  = avgPx(LANDMARKS.LEFT_EYEBROW_LOWER);
  const rightBrowLower = avgPx(LANDMARKS.RIGHT_EYEBROW_LOWER);
  const leftBrowUpper  = avgPx(LANDMARKS.LEFT_EYEBROW_UPPER);
  const rightBrowUpper = avgPx(LANDMARKS.RIGHT_EYEBROW_UPPER);
  const browMidLower   = {
    x: (leftBrowLower.x + rightBrowLower.x) / 2,
    y: (leftBrowLower.y + rightBrowLower.y) / 2,
    z: (leftBrowLower.z + rightBrowLower.z) / 2,
  };
  const noseBridgeTop = px(LANDMARKS.NOSE_BRIDGE_TOP);
  const noseBridgeMid = px(LANDMARKS.NOSE_BRIDGE_MID);
  const noseLeftPad   = px(LANDMARKS.NOSE_LEFT_PAD);
  const noseRightPad  = px(LANDMARKS.NOSE_RIGHT_PAD);
  const faceLeft   = px(LANDMARKS.FACE_LEFT);
  const faceRight  = px(LANDMARKS.FACE_RIGHT);
  const templeLeft = px(LANDMARKS.TEMPLE_LEFT);
  const templeRight= px(LANDMARKS.TEMPLE_RIGHT);
  const foreheadCenter = px(LANDMARKS.FOREHEAD_CENTER);
  const chin       = px(LANDMARKS.CHIN);
  const underEyeLeft  = px(LANDMARKS.UNDER_EYE_LEFT);
  const underEyeRight = px(LANDMARKS.UNDER_EYE_RIGHT);
  const leftUpperLid  = px(LANDMARKS.LEFT_UPPER_LID);
  const leftLowerLid  = px(LANDMARKS.LEFT_LOWER_LID);
  const rightUpperLid = px(LANDMARKS.RIGHT_UPPER_LID);
  const rightLowerLid = px(LANDMARKS.RIGHT_LOWER_LID);

  const irisDistance = dist(leftIris, rightIris);
  const eyeSpan = dist(leftEyeOut, rightEyeOut);
  const templeWidth = dist(templeLeft, templeRight);
  const faceWidth = dist(faceLeft, faceRight);
  const faceHeight = dist(foreheadCenter, chin);
  const nosePadWidth = dist(noseLeftPad, noseRightPad);
  const leftBrowEyeGap  = dist(leftBrowLower, leftIris);
  const rightBrowEyeGap = dist(rightBrowLower, rightIris);
  const avgBrowEyeGap   = (leftBrowEyeGap + rightBrowEyeGap) / 2;
  const leftEyeOpen  = dist(leftUpperLid, leftLowerLid);
  const rightEyeOpen = dist(rightUpperLid, rightLowerLid);

  const angleIris = Math.atan2(rightIris.y - leftIris.y, rightIris.x - leftIris.x);
  const angleEyeCorners = Math.atan2(rightEyeOut.y - leftEyeOut.y, rightEyeOut.x - leftEyeOut.x);
  const angleBrow = Math.atan2(rightBrowLower.y - leftBrowLower.y, rightBrowLower.x - leftBrowLower.x);
  const angle = angleEyeCorners * 0.5 + angleBrow * 0.3 + angleIris * 0.2;

  const centerX = (leftIris.x + rightIris.x) / 2;
  const browCenterY = browMidLower.y;
  const noseBridgeY = noseBridgeTop.y;
  const centerY = browCenterY * 0.35 + noseBridgeY * 0.45 + ((leftIris.y + rightIris.y) / 2) * 0.20;
  const glassesWidth = eyeSpan * 1.55;
  const glassesHeight = avgBrowEyeGap * 2.6;
  const avgZ = (leftIris.z + rightIris.z + noseBridgeTop.z) / 3;
  const depthScale = 1 + (-avgZ * 0.8);

  return {
    leftIris, rightIris, leftEyeIn, leftEyeOut, rightEyeIn, rightEyeOut,
    leftBrowLower, rightBrowLower, leftBrowUpper, rightBrowUpper, browMidLower,
    noseBridgeTop, noseBridgeMid, noseBridgeLow: noseBridgeTop, noseLeftPad, noseRightPad,
    faceLeft, faceRight, templeLeft, templeRight, foreheadCenter, chin, underEyeLeft, underEyeRight,
    irisDistance, eyeSpan, templeWidth, faceWidth, faceHeight, nosePadWidth, avgBrowEyeGap,
    leftEyeOpen, rightEyeOpen, centerX, centerY, angle, glassesWidth, glassesHeight, depthScale,
  };
}

// ── REALISTIC GLASSES WITH SIDE ARMS ──
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

  const [glasses, setGlasses] = useState("/glass1.png");
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [glbLoading, setGlbLoading] = useState(false);
  const [showArms, setShowArms] = useState(true);
  const [cameraReady, setCameraReady] = useState(false);
  const cameraReadyRef = useRef(false);
  const smootherRef = useRef(new LandmarkSmoother(0.45));

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

  // Initialize 3D scene
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

  // FaceMesh and rendering loop
  useEffect(() => {
    // Dynamically load MediaPipe
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
      faceMesh.setOptions({ maxNumFaces: 1, refineLandmarks: true, minDetectionConfidence: 0.5, minTrackingConfidence: 0.5 });
      
      // Start camera faster with explicit constraints
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" } });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
            // Mark camera ready as soon as video is playing
            cameraReadyRef.current = true;
            setCameraReady(true);
          }
        } catch (err) {
          console.error("Camera error:", err);
          // Still mark ready to remove overlay (show error state gracefully)
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
        if (results.image) {
          ctx.drawImage(results.image, 0, 0, W, H);
        }
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
          cx: geo.centerX,
          cy: geo.centerY,
          gw: geo.glassesWidth,
          gh: geo.glassesHeight,
          angle: geo.angle,
          ds: geo.depthScale,
        });
        
        if (_is3D) {
          const model = glassModel3dRef.current;
          const r = rendererRef.current, s = sceneRef.current, c = cameraRef.current;
          if (model && r && s && c) {
            model.position.x = smoothed.cx - W / 2;
            model.position.y = -(smoothed.cy - H / 2);
            const scale3D = (smoothed.gw * smoothed.ds) / modelWidthRef.current;
            model.scale.setScalar(scale3D);
            model.rotation.z = -smoothed.angle;
            r.render(s, c);
          }
        } else {
          const img = imgRef.current;
          if (!img.complete || !img.src) return;
          const adj = adjRef.current[glassesRef.current] || DEFAULT_ADJ;
          const w = smoothed.gw * adj.scaleW * smoothed.ds;
          const h = smoothed.gh * adj.scaleH * smoothed.ds;
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
      
      return () => {
        cancelAnimationFrame(frameRequest);
        if (faceMesh) faceMesh.close();
        if (videoRef.current && videoRef.current.srcObject) {
          const tracks = videoRef.current.srcObject.getTracks();
          tracks.forEach(track => track.stop());
        }
      };
    };
    
    loadMediaPipe();
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
  
  // ─────────────────────────────────────────────────────────────────
  // PROFESSIONAL VR DESIGN - FULLY RESPONSIVE MOBILE FIRST
  // ─────────────────────────────────────────────────────────────────
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
      {/* Animated cyber grid */}
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: `linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        pointerEvents: "none",
        zIndex: 0
      }} />
      
      {/* Glowing orbs */}
      <div style={{ position: "fixed", top: "-20%", right: "-10%", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(201,168,76,0.12), transparent 70%)", borderRadius: "50%", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-20%", left: "-10%", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(100,180,255,0.08), transparent 70%)", borderRadius: "50%", pointerEvents: "none", zIndex: 0 }} />

      {/* Header */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between", 
        padding: "18px 24px", 
        borderBottom: "1px solid rgba(201,168,76,0.3)",
        backdropFilter: "blur(12px)",
        background: "rgba(0,0,0,0.5)",
        zIndex: 2,
        position: "relative"
      }}>
        <div style={{ 
          fontFamily: "'Space Grotesk', monospace", 
          fontSize: "24px", 
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
          fontSize: "10px", 
          letterSpacing: "2px", 
          background: "rgba(201,168,76,0.15)",
          border: "1px solid rgba(201,168,76,0.5)",
          padding: "6px 16px", 
          borderRadius: "40px",
          backdropFilter: "blur(4px)",
          fontWeight: 500,
          boxShadow: "0 0 12px rgba(201,168,76,0.2)"
        }}>
          {is3D ? "⚡ 3D MODE" : "🔮 LIVE"}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "20px", 
        flex: 1, 
        padding: "16px 16px 24px 16px", 
        overflowY: "auto",
        zIndex: 2,
        position: "relative"
      }}>
        {/* Camera Panel */}
        <div style={{ 
          background: "rgba(8, 8, 12, 0.7)",
          backdropFilter: "blur(20px)",
          borderRadius: "32px", 
          padding: "12px", 
          border: "1px solid rgba(201,168,76,0.25)",
          boxShadow: "0 25px 40px -12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)"
        }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", maxWidth: "100%", margin: "0 auto" }}>
            {/* Corner brackets */}
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                width: "20px",
                height: "20px",
                borderColor: "#c9a84c",
                borderStyle: "solid",
                zIndex: 10,
                top: i < 2 ? "12px" : "auto",
                bottom: i >= 2 ? "12px" : "auto",
                left: i % 2 === 0 ? "12px" : "auto",
                right: i % 2 === 1 ? "12px" : "auto",
                borderWidth: i === 0 ? "2px 0 0 2px" : i === 1 ? "2px 2px 0 0" : i === 2 ? "0 0 2px 2px" : "0 2px 2px 0",
                opacity: 0.7
              }} />
            ))}
            
            {/* Live indicator */}
            <div style={{ 
              position: "absolute", 
              top: "16px", 
              right: "16px", 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              fontSize: "10px", 
              fontWeight: 600,
              letterSpacing: "1px", 
              color: "#c9a84c", 
              zIndex: 10, 
              background: "rgba(0,0,0,0.6)", 
              padding: "5px 14px", 
              borderRadius: "40px",
              backdropFilter: "blur(8px)",
              border: "0.5px solid rgba(201,168,76,0.5)"
            }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#c9a84c", boxShadow: "0 0 8px #c9a84c", animation: "pulse 1.2s ease-in-out infinite" }} />
              {is3D ? "3D ACTIVE" : "FACE TRACKING"}
            </div>
            
            {/* Stats badges */}
            <div style={{ 
              position: "absolute", 
              bottom: "16px", 
              left: "16px", 
              display: "flex", 
              gap: "8px", 
              flexWrap: "wrap", 
              zIndex: 10 
            }}>
              <span style={{ fontSize: "9px", fontWeight: 500, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", border: "0.5px solid rgba(201,168,76,0.3)", padding: "4px 12px", borderRadius: "30px", letterSpacing: "0.5px" }}>💡 {brightness}%</span>
              <span style={{ fontSize: "9px", fontWeight: 500, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", border: "0.5px solid rgba(201,168,76,0.3)", padding: "4px 12px", borderRadius: "30px" }}>🎨 {contrast}%</span>
              <span style={{ fontSize: "9px", fontWeight: 500, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", border: "0.5px solid rgba(201,168,76,0.3)", padding: "4px 12px", borderRadius: "30px" }}>🌈 {saturate}%</span>
              {showArms && !is3D && <span style={{ fontSize: "9px", background: "rgba(201,168,76,0.2)", borderColor: "#c9a84c", color: "#c9a84c", padding: "4px 12px", borderRadius: "30px" }}>🦾 ARMS ON</span>}
            </div>
            
            {glbLoading && (
              <div style={{ 
                position: "absolute", 
                top: "50%", 
                left: "50%", 
                transform: "translate(-50%,-50%)", 
                fontSize: "11px", 
                fontWeight: 600,
                letterSpacing: "2px", 
                background: "rgba(0,0,0,0.8)", 
                padding: "8px 20px", 
                borderRadius: "40px", 
                zIndex: 20, 
                border: "1px solid #c9a84c",
                backdropFilter: "blur(8px)"
              }}>
                ⚡ LOADING 3D...
              </div>
            )}

            {/* Camera Loading Overlay - shows briefly then fades */}
            {!cameraReady && (
              <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: "24px",
                background: "rgba(5, 5, 8, 0.98)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                zIndex: 30,
                transition: "opacity 0.3s ease"
              }}>
                <div style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  border: "3px solid rgba(201,168,76,0.15)",
                  borderTop: "3px solid #c9a84c",
                  animation: "spinRing 0.9s linear infinite",
                  boxShadow: "0 0 18px rgba(201,168,76,0.35)"
                }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", color: "#c9a84c", marginBottom: "6px" }}>
                    INITIALIZING CAMERA
                  </div>
                  <div style={{ fontSize: "10px", color: "rgba(240,236,225,0.4)", letterSpacing: "1px" }}>
                    Please allow camera access...
                  </div>
                </div>
              </div>
            )}
            
            <video ref={videoRef} style={{ display: "none" }} autoPlay playsInline muted />
            <canvas 
              ref={canvasRef} 
              width={640} 
              height={480} 
              style={{ 
                display: "block", 
                width: "100%", 
                height: "100%", 
                borderRadius: "24px", 
                objectFit: "cover",
                boxShadow: "inset 0 0 20px rgba(0,0,0,0.3)"
              }} 
            />
            <canvas 
              ref={threeCanvasRef} 
              width={640} 
              height={480} 
              style={{ 
                position: "absolute", 
                inset: 0, 
                width: "100%", 
                height: "100%", 
                pointerEvents: "none", 
                opacity: is3D ? 1 : 0, 
                borderRadius: "24px" 
              }} 
            />
          </div>
        </div>

        {/* Controls Panel - Glassmorphic */}
        <div style={{ 
          background: "rgba(12, 12, 18, 0.7)",
          backdropFilter: "blur(24px)",
          borderRadius: "32px", 
          padding: "20px 18px", 
          display: "flex", 
          flexDirection: "column", 
          gap: "24px", 
          border: "1px solid rgba(201,168,76,0.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
        }}>
          {/* Frame Selection */}
          <div>
            <div style={{ fontSize: "10px", letterSpacing: "2.5px", color: "#c9a84c", marginBottom: "14px", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "20px", height: "2px", background: "#c9a84c" }}></span>
              SELECT FRAME
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
              {GLASS_OPTIONS.map(g => (
                <div
                  key={g.id}
                  onClick={() => setGlasses(g.id)}
                  style={{
                    background: glasses === g.id ? (g.is3d ? "linear-gradient(135deg, #0f1828, #0a0f1a)" : "linear-gradient(135deg, #1e1a10, #14110a)") : "rgba(20,20,28,0.6)",
                    border: `1px solid ${glasses === g.id ? (g.is3d ? "#64b4ff" : "#c9a84c") : "rgba(201,168,76,0.2)"}`,
                    borderRadius: "20px",
                    padding: "14px 6px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    cursor: "pointer",
                    transition: "all 0.2s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
                    transform: glasses === g.id ? "scale(1.02)" : "scale(1)",
                    boxShadow: glasses === g.id ? `0 0 15px ${g.is3d ? "rgba(100,180,255,0.3)" : "rgba(201,168,76,0.2)"}` : "none",
                    position: "relative"
                  }}
                >
                  {g.is3d && <span style={{ position: "absolute", top: "8px", right: "8px", fontSize: "8px", fontWeight: 700, color: "#64b4ff", background: "rgba(100,180,255,0.2)", padding: "2px 8px", borderRadius: "20px", border: "0.5px solid rgba(100,180,255,0.5)" }}>3D</span>}
                  <div style={{ fontSize: "32px", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}>{g.emoji}</div>
                  <div style={{ fontSize: "12px", fontWeight: 500, color: "rgba(240,236,225,0.9)" }}>{g.name}</div>
                  <div style={{ fontSize: "13px", color: g.is3d ? "#64b4ff" : "#c9a84c", fontWeight: 700 }}>{g.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Toggle Arms */}
          {!is3D && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0" }}>
              <span style={{ fontSize: "12px", fontWeight: 500, color: "rgba(240,236,225,0.8)", letterSpacing: "0.5px" }}>🦾 REALISTIC ARMS</span>
              <label style={{ position: "relative", display: "inline-block", width: "48px", height: "24px" }}>
                <input type="checkbox" checked={showArms} onChange={(e) => setShowArms(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
                <span style={{ position: "absolute", cursor: "pointer", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#2a2a2f", transition: ".3s", borderRadius: "24px", border: "0.5px solid rgba(201,168,76,0.4)" }}>
                  <span style={{ 
                    position: "absolute", 
                    height: "18px", 
                    width: "18px", 
                    left: "3px", 
                    bottom: "2px", 
                    backgroundColor: "#c9a84c", 
                    transition: ".3s", 
                    borderRadius: "50%", 
                    transform: showArms ? "translateX(24px)" : "none",
                    boxShadow: "0 0 6px #c9a84c"
                  }} />
                </span>
              </label>
            </div>
          )}

          {/* Adjustments Panel */}
          {!is3D && (
            <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: "24px", padding: "16px", border: "0.5px solid rgba(201,168,76,0.2)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", alignItems: "center" }}>
                <span style={{ fontSize: "10px", letterSpacing: "2px", color: "#c9a84c", fontWeight: 600 }}>⚙️ FRAME ADJUST</span>
                <button onClick={resetAdj} style={{ fontSize: "9px", fontWeight: 500, color: "#c9a84c", background: "rgba(201,168,76,0.1)", border: "0.5px solid rgba(201,168,76,0.4)", padding: "4px 14px", borderRadius: "30px", cursor: "pointer" }}>⟳ RESET</button>
              </div>
              {[
                { label: "WIDTH", key: "scaleW", min: 0.3, max: 3, step: 0.05, fmt: v => `${v.toFixed(2)}×` },
                { label: "HEIGHT", key: "scaleH", min: 0.3, max: 3, step: 0.05, fmt: v => `${v.toFixed(2)}×` },
                { label: "MOVE L/R", key: "offsetX", min: -150, max: 150, step: 1, fmt: v => `${v > 0 ? "+" : ""}${v}px` },
                { label: "MOVE U/D", key: "offsetY", min: -150, max: 150, step: 1, fmt: v => `${v > 0 ? "+" : ""}${v}px` },
                { label: "ROTATION", key: "rotate", min: -30, max: 30, step: 0.5, fmt: v => `${v > 0 ? "+" : ""}${v.toFixed(1)}°` },
              ].map(({ label, key, min, max, step, fmt }) => (
                <div key={key} style={{ marginBottom: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontSize: "11px", color: "rgba(240,236,225,0.6)" }}>{label}</span>
                    <span style={{ fontSize: "11px", color: "#c9a84c", fontWeight: 600 }}>{fmt(curAdj[key])}</span>
                  </div>
                  <input type="range" min={min} max={max} step={step} value={curAdj[key]} onChange={e => setAdj(key, Number(e.target.value))} style={{ width: "100%", height: "4px", background: "rgba(201,168,76,0.2)", borderRadius: "4px" }} />
                </div>
              ))}
            </div>
          )}

          {/* Scene Filters */}
          <div>
            <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#c9a84c", marginBottom: "14px", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "20px", height: "2px", background: "#c9a84c" }}></span>
              SCENE FILTERS
            </div>
            {[
              { label: "BRIGHTNESS", val: brightness, set: setBrightness, icon: "☀️" },
              { label: "CONTRAST", val: contrast, set: setContrast, icon: "🎚️" },
              { label: "SATURATION", val: saturate, set: setSaturate, icon: "🎨" },
            ].map(({ label, val, set, icon }) => (
              <div key={label} style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "11px", color: "rgba(240,236,225,0.6)" }}>{icon} {label}</span>
                  <span style={{ fontSize: "11px", color: "#c9a84c", fontWeight: 600 }}>{val}%</span>
                </div>
                <input type="range" min="0" max="200" step="1" value={val} onChange={e => set(Number(e.target.value))} style={{ width: "100%", height: "4px", background: "rgba(201,168,76,0.2)", borderRadius: "4px" }} />
              </div>
            ))}
          </div>

          <button onClick={capturePhoto} style={{ 
            width: "100%", 
            background: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))",
            border: "1px solid rgba(201,168,76,0.5)", 
            color: "#c9a84c", 
            fontSize: "12px", 
            letterSpacing: "2px", 
            padding: "14px", 
            borderRadius: "60px", 
            cursor: "pointer", 
            fontWeight: 700,
            transition: "all 0.2s",
            backdropFilter: "blur(4px)"
          }}>
            📸 CAPTURE LOOK
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        @keyframes spinRing {
          to { transform: rotate(360deg); }
        }
        input[type="range"] {
          -webkit-appearance: none;
          background: transparent;
        }
        input[type="range"]:focus {
          outline: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #c9a84c;
          cursor: pointer;
          border: 2px solid #0c0c0e;
          box-shadow: 0 0 8px #c9a84c;
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #c9a84c;
          cursor: pointer;
          border: 2px solid #0c0c0e;
        }
        button:hover {
          background: rgba(201,168,76,0.2);
          box-shadow: 0 0 12px rgba(201,168,76,0.3);
        }
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(20,20,28,0.5);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: #c9a84c;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default TryOn;