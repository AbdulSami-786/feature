import React, { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// ── Per-frame default adjustments ─────────────────────────────────
const DEFAULT_ADJ = { scaleW: 1, scaleH: 1, offsetX: 0, offsetY: 8, rotate: 0 };
const AVIATOR_ADJ = { scaleW: 1, scaleH: 1.18, offsetX: 0, offsetY: 18, rotate: 0 };
const ROUND_ADJ   = { scaleW: 1, scaleH: 0.85, offsetX: 0, offsetY: 6, rotate: 0 };

// ══════════════════════════════════════════════════════════════════
// ── GLASS OPTIONS – each frame now has only ONE size ──────────────
// ══════════════════════════════════════════════════════════════════
const GLASS_OPTIONS = [
  { id: "/glass1.png",  name: "Classic",  price: "PKR 4,500", emoji: "👓", 
    sizes: [{ label:"XL", scale:1.10, mobileScale:0.65 }] 
  },
  { id: "/glass2.png",  name: "Aviator",  price: "PKR 5,200", emoji: "🕶️", 
    sizes: [{ label:"L", scale:1.15, mobileScale:1.00 }] 
  },
  { id: "/glass3.png",  name: "Sport",    price: "PKR 3,800", emoji: "🥽", 
    sizes: [{ label:"L", scale:1.15, mobileScale:1.00 }] 
  },
  { id: "/glass4.png",  name: "Round",    price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
  },
  { id: "/glass5.png",  name: "Wayfarer", price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.25, mobileScale:0.98 }] 
  },
  { id: "/glass6.png",  name: "Vintage",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
  },
  { id: "/glass7.png",  name: "Clubmaster", price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] 
  },
  { id: "/glass8.png",  name: "Cat Eye",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] 
  },
  { id: "/glass9.png",  name: "Shield",    price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"M", scale:1.00, mobileScale:0.75 }] 
  },
  { id: "/glass10.png", name: "Oval",      price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
  },
  { id: "/glass11.png", name: "Square",    price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"S", scale:0.75, mobileScale:0.50 }] 
  },
  { id: "/glass12.png", name: "Hexagonal", price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
  },
  { id: "/glass13.png", name: "Geometric", price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"M", scale:1.00, mobileScale:0.75 }] 
  },
  { id: "/glass14.png", name: "Steampunk", price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"S", scale:0.95, mobileScale:0.50 }] 
  },
  { id: "/glass15.png", name: "Sports",    price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
  },
  { id: "/glass16.png", name: "Retro",     price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
  },
  { id: "/glass17.png", name: "Modern",    price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
  },
  { id: "/glass18.png", name: "Luxury",    price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
  },
  { id: "/glass19.png", name: "Designer",  price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
  },
  { id: "/glass20.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
  },
  { id: "/glass21.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"M", scale:1.00, mobileScale:0.75 }] 
  },
  { id: "/glass22.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.05, mobileScale:0.95 }] 
  },
  { id: "/glass23.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
  },
  { id: "/glass24.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"S", scale:0.85, mobileScale:0.50 }] 
  },
  { id: "/glass25.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
  },
  { id: "/glass26.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
  },
  { id: "/glass27.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
  },
  { id: "/glass28.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"M", scale:1.00, mobileScale:0.75 }] 
  },
  { id: "/glass29.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.25, mobileScale:0.95 }] 
  },
  { id: "/glass30.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
  },
  { id: "/glass31.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
  },
  { id: "/glass32.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
  },
  { id: "/glass33.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
  },
  { id: "/glass34.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
  },
  { id: "/glass35.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"M", scale:1.10, mobileScale:0.75 }] 
  },
  { id: "/glass36.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
  },
  { id: "/glass37.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
  },
  { id: "/glass38.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] 
  },
  { id: "/glass39.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
  },
  { id: "/glass40.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"M", scale:1.00, mobileScale:0.75 }] 
  },
  { id: "/glass41.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
  },
  { id: "/glass42.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"S", scale:0.95, mobileScale:0.50 }] 
  },
  { id: "/glass43.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
  },
  { id: "/glass44.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
  },
  { id: "/glass45.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] 
  },
  { id: "/glass46.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"XL", scale:1.40, mobileScale:1.10 }] 
  },
  { id: "/glass47.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"XL", scale:1.20, mobileScale:1.10 }] 
  },
  { id: "/glass48.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"M", scale:1.00, mobileScale:0.75 }] 
  },
  { id: "/glass49.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
    sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
  },
];

// ══════════════════════════════════════════════════════════════════
// ── MOBILE DETECTION ──────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════
const isMobile = typeof window !== "undefined" &&
  (window.innerWidth < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

// ══════════════════════════════════════════════════════════════════
// ── HELPER: GET SIZE SCALE WITH MOBILE FALLBACK ──────────────────
// ══════════════════════════════════════════════════════════════════
const getSizeScale = (sizeObj) => {
  if (!sizeObj) return 1;
  return isMobile
    ? (sizeObj.mobileScale ?? sizeObj.scale)
    : sizeObj.scale;
};

// ── MOBILE-SPECIFIC CONSTANTS ─────────────────────────────────────
const BASE_EYE_SPAN       = 120;
const BASE_GLASSES_WIDTH  = BASE_EYE_SPAN * 1.7;
const MOBILE_EMA_ALPHA    = 0.25;
const MOBILE_DEADZONE     = 1.5;
const MOBILE_LERP         = 0.2;
const MOBILE_CANVAS_W     = 480;
const MOBILE_CANVAS_H     = 360;
const DESKTOP_CANVAS_W    = 640;
const DESKTOP_CANVAS_H    = 480;
const CANVAS_W            = isMobile ? MOBILE_CANVAS_W : DESKTOP_CANVAS_W;
const CANVAS_H            = isMobile ? MOBILE_CANVAS_H : DESKTOP_CANVAS_H;
const MOBILE_FPS          = 30;
const MOBILE_FRAME_INTERVAL = 1000 / MOBILE_FPS;

const lerp = (a, b, t) => a + (b - a) * t;

// ── FACE LANDMARK INDICES ─────────────────────────────────────────
const LANDMARKS = {
  LEFT_IRIS_CENTER: 468, RIGHT_IRIS_CENTER: 473,
  LEFT_EYE_INNER: 133,   LEFT_EYE_OUTER: 33,
  RIGHT_EYE_INNER: 362,  RIGHT_EYE_OUTER: 263,
  LEFT_EYEBROW_LOWER:  [70, 63, 105, 66, 107],
  RIGHT_EYEBROW_LOWER: [300, 293, 334, 296, 336],
  LEFT_EYEBROW_UPPER:  [46, 53, 52, 65, 55],
  RIGHT_EYEBROW_UPPER: [276, 283, 282, 295, 285],
  NOSE_BRIDGE_TOP: 6, NOSE_BRIDGE_MID: 168, NOSE_BRIDGE_LOW: 197,
  NOSE_TIP: 5, NOSE_LEFT_PAD: 124, NOSE_RIGHT_PAD: 353,
  FACE_LEFT: 234, FACE_RIGHT: 454,
  CHEEK_LEFT: 116, CHEEK_RIGHT: 345,
  FOREHEAD_CENTER: 10, CHIN: 152,
  UNDER_EYE_LEFT: 145, UNDER_EYE_RIGHT: 374,
  TEMPLE_LEFT: 127,    TEMPLE_RIGHT: 356,
  LEFT_UPPER_LID: 159, RIGHT_UPPER_LID: 386,
  LEFT_LOWER_LID: 145, RIGHT_LOWER_LID: 374,
};

// ── EMA SMOOTHER ──────────────────────────────────────────────────
class LandmarkSmoother {
  constructor(alpha = 0.45) {
    this.alpha = alpha;
    this.prev = null;
  }
  smooth(current, deadzone = 0) {
    if (!this.prev) { this.prev = { ...current }; return current; }
    const result = {};
    for (const key of Object.keys(current)) {
      const delta = current[key] - this.prev[key];
      result[key] = (deadzone > 0 && Math.abs(delta) < deadzone)
        ? this.prev[key]
        : this.prev[key] + this.alpha * delta;
    }
    this.prev = { ...result };
    return result;
  }
  reset() { this.prev = null; }
}

// ── FACE GEOMETRY EXTRACTOR ───────────────────────────────────────
function extractFaceGeometry(lm, W, H) {
  const px    = (idx)     => ({ x: lm[idx].x * W, y: lm[idx].y * H, z: lm[idx].z });
  const avgPx = (indices) => {
    const pts = indices.map(i => px(i));
    return {
      x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
      y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
      z: pts.reduce((s, p) => s + p.z, 0) / pts.length,
    };
  };
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

  const leftIris    = px(LANDMARKS.LEFT_IRIS_CENTER);
  const rightIris   = px(LANDMARKS.RIGHT_IRIS_CENTER);
  const leftEyeOut  = px(LANDMARKS.LEFT_EYE_OUTER);
  const rightEyeOut = px(LANDMARKS.RIGHT_EYE_OUTER);
  const leftBrowLower  = avgPx(LANDMARKS.LEFT_EYEBROW_LOWER);
  const rightBrowLower = avgPx(LANDMARKS.RIGHT_EYEBROW_LOWER);
  const browMidLower   = { x: (leftBrowLower.x + rightBrowLower.x) / 2, y: (leftBrowLower.y + rightBrowLower.y) / 2 };
  const noseBridgeTop  = px(LANDMARKS.NOSE_BRIDGE_TOP);

  const eyeSpan        = dist(leftEyeOut, rightEyeOut);
  const leftBrowGap    = dist(leftBrowLower,  leftIris);
  const rightBrowGap   = dist(rightBrowLower, rightIris);
  const avgBrowEyeGap  = (leftBrowGap + rightBrowGap) / 2;

  const angleIris       = Math.atan2(rightIris.y    - leftIris.y,    rightIris.x    - leftIris.x);
  const angleEyeCorners = Math.atan2(rightEyeOut.y  - leftEyeOut.y,  rightEyeOut.x  - leftEyeOut.x);
  const angleBrow       = Math.atan2(rightBrowLower.y - leftBrowLower.y, rightBrowLower.x - leftBrowLower.x);
  const angle           = angleEyeCorners * 0.5 + angleBrow * 0.3 + angleIris * 0.2;

  const centerX   = (leftIris.x + rightIris.x) / 2;
  const centerY   = browMidLower.y * 0.35 + noseBridgeTop.y * 0.45 + ((leftIris.y + rightIris.y) / 2) * 0.20;

  let glassesWidth;
  if (isMobile) {
    const normalizedScale = Math.max(0.9, Math.min(1.1, eyeSpan / BASE_EYE_SPAN));
    glassesWidth = BASE_GLASSES_WIDTH * normalizedScale;
  } else {
    glassesWidth = eyeSpan * 1.7;
  }

  const glassesHeight = avgBrowEyeGap * 3.3;
  const avgZ          = (leftIris.z + rightIris.z + noseBridgeTop.z) / 3;
  const depthScale    = 1 + (-avgZ * 0.8);

  return { centerX, centerY, angle, glassesWidth, glassesHeight, depthScale };
}

// ══════════════════════════════════════════════════════════════════
// ── MAIN COMPONENT ────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════
const TryOn = () => {
  const videoRef       = useRef(null);
  const canvasRef      = useRef(null);
  const imgRef         = useRef(new Image());
  const threeCanvasRef = useRef(null);
  const rendererRef    = useRef(null);
  const sceneRef       = useRef(null);
  const cameraRef      = useRef(null);
  const glassModel3dRef = useRef(null);
  const modelWidthRef  = useRef(1);

  const prevPosRef      = useRef(null);
  const lastFrameTimeRef = useRef(0);
  const touchStartXRef  = useRef(null);

  const [glasses, setGlasses]           = useState("/glass1.png");
  const [brightness, setBrightness]     = useState(100);
  const [contrast, setContrast]         = useState(100);
  const [saturate, setSaturate]         = useState(100);
  const [glbLoading, setGlbLoading]     = useState(false);
  const [cameraReady, setCameraReady]   = useState(false);
  const cameraReadyRef = useRef(false);

  const smootherRef = useRef(new LandmarkSmoother(isMobile ? MOBILE_EMA_ALPHA : 0.45));

  const [adjustments, setAdjustments] = useState(() =>
    Object.fromEntries(
      GLASS_OPTIONS.filter(g => !g.is3d).map(g => {
        if (g.id === "/glass2.png") return [g.id, { ...AVIATOR_ADJ }];
        if (g.id === "/glass4.png") return [g.id, { ...ROUND_ADJ }];
        return [g.id, { ...DEFAULT_ADJ }];
      })
    )
  );

  const brightnessRef  = useRef(brightness);
  const contrastRef    = useRef(contrast);
  const saturateRef    = useRef(saturate);
  const glassesRef     = useRef(glasses);
  const is3DRef        = useRef(false);
  const adjRef         = useRef(adjustments);

  useEffect(() => { brightnessRef.current = brightness; }, [brightness]);
  useEffect(() => { contrastRef.current   = contrast;   }, [contrast]);
  useEffect(() => { saturateRef.current   = saturate;   }, [saturate]);
  useEffect(() => { glassesRef.current    = glasses;    }, [glasses]);
  useEffect(() => { is3DRef.current       = glasses === "__3D__"; }, [glasses]);
  useEffect(() => { adjRef.current        = adjustments; }, [adjustments]);

  const is3D   = glasses === "__3D__";
  const curAdj = adjustments[glasses] || DEFAULT_ADJ;

  const setAdj   = (key, val) => setAdjustments(prev => ({ ...prev, [glasses]: { ...prev[glasses], [key]: val } }));
  const resetAdj = () => {
    if (glasses === "/glass2.png")      setAdjustments(prev => ({ ...prev, [glasses]: { ...AVIATOR_ADJ } }));
    else if (glasses === "/glass4.png") setAdjustments(prev => ({ ...prev, [glasses]: { ...ROUND_ADJ } }));
    else                                setAdjustments(prev => ({ ...prev, [glasses]: { ...DEFAULT_ADJ } }));
  };

  // 3D scene init
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
    renderer.setSize(CANVAS_W, CANVAS_H);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const cam = new THREE.OrthographicCamera(-CANVAS_W / 2, CANVAS_W / 2, CANVAS_H / 2, -CANVAS_H / 2, 0.1, 2000);
    cam.position.z = 500;
    cameraRef.current = cam;
    scene.add(new THREE.AmbientLight(0xffffff, 1.4));
    const keyLight  = new THREE.DirectionalLight(0xfff5e0, 1.3); keyLight.position.set(2, 3, 4);  scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xc9e0ff, 0.6); fillLight.position.set(-2, 0, 2); scene.add(fillLight);
    const backLight = new THREE.DirectionalLight(0xffcc88, 0.4); backLight.position.set(0, 1, -3); scene.add(backLight);
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
    return () => { renderer.dispose(); rendererRef.current = sceneRef.current = cameraRef.current = glassModel3dRef.current = null; };
  }, [is3D]);

  // FaceMesh + main rendering loop
  useEffect(() => {
    const faceMesh = new window.FaceMesh({
      locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${f}`,
    });
    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    faceMesh.onResults(onResults);

    const camera = new window.Camera(videoRef.current, {
      onFrame: async () => {
        if (!cameraReadyRef.current) { cameraReadyRef.current = true; setCameraReady(true); }
        if (isMobile) {
          const now = performance.now();
          if (now - lastFrameTimeRef.current < MOBILE_FRAME_INTERVAL) return;
          lastFrameTimeRef.current = now;
        }
        await faceMesh.send({ image: videoRef.current });
      },
      width: CANVAS_W, height: CANVAS_H,
    });
    camera.start();

    function onResults(results) {
      const canvas = canvasRef.current;
      const ctx    = canvas.getContext("2d");
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      ctx.filter = `brightness(${brightnessRef.current}%) contrast(${contrastRef.current}%) saturate(${saturateRef.current}%)`;
      ctx.drawImage(results.image, 0, 0, W, H);
      ctx.filter = "none";

      const _is3D = is3DRef.current;
      if (_is3D && rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      if (!results.multiFaceLandmarks?.length) { smootherRef.current.reset(); prevPosRef.current = null; return; }

      const lm  = results.multiFaceLandmarks[0];
      const geo = extractFaceGeometry(lm, W, H);

      const smoothed = smootherRef.current.smooth(
        { cx: geo.centerX, cy: geo.centerY, gw: geo.glassesWidth, gh: geo.glassesHeight, angle: geo.angle, ds: geo.depthScale },
        isMobile ? MOBILE_DEADZONE : 0
      );

      if (isMobile) {
        if (prevPosRef.current) {
          smoothed.cx = lerp(prevPosRef.current.cx, smoothed.cx, MOBILE_LERP);
          smoothed.cy = lerp(prevPosRef.current.cy, smoothed.cy, MOBILE_LERP);
        }
        prevPosRef.current = { cx: smoothed.cx, cy: smoothed.cy };
      }

      // Use the single size from the frame's sizes array (first element)
      const currentGlassObj = GLASS_OPTIONS.find(g => g.id === glassesRef.current);
      let sizeScale = 1.0;
      if (currentGlassObj?.sizes && currentGlassObj.sizes.length > 0) {
        sizeScale = getSizeScale(currentGlassObj.sizes[0]);
      }

      if (_is3D) {
        const model = glassModel3dRef.current;
        const r = rendererRef.current, s = sceneRef.current, c = cameraRef.current;
        if (model && r && s && c) {
          model.position.x = smoothed.cx - W / 2;
          model.position.y = -(smoothed.cy - H / 2);
          let scale3D = isMobile
            ? (smoothed.gw / modelWidthRef.current)
            : (smoothed.gw * smoothed.ds) / modelWidthRef.current;
          scale3D *= sizeScale;
          model.scale.setScalar(scale3D);
          model.rotation.z = -smoothed.angle;
          r.render(s, c);
        }
      } else {
        const img = imgRef.current;
        if (!img.complete || !img.src) return;
        const adj = adjRef.current[glassesRef.current] || DEFAULT_ADJ;

        let w = isMobile
          ? smoothed.gw * adj.scaleW
          : smoothed.gw * adj.scaleW * smoothed.ds;
        let h = isMobile
          ? smoothed.gh * adj.scaleH
          : smoothed.gh * adj.scaleH * smoothed.ds;

        w *= sizeScale;
        h *= sizeScale;

        const finalAngle = smoothed.angle + (adj.rotate * Math.PI / 180);
        const fx = smoothed.cx + adj.offsetX;
        const fy = smoothed.cy + adj.offsetY;

        // ARMS ARE NEVER DRAWN – only the glasses image is placed
        ctx.save();
        ctx.translate(fx, fy);
        ctx.rotate(finalAngle);
        ctx.drawImage(img, -w / 2, -h / 2, w, h);
        ctx.restore();
      }
    }
    return () => { if (faceMesh) faceMesh.close(); };
  }, []); // No dependency on selectedSizeKey (removed)

  useEffect(() => {
    if (!is3D && imgRef.current) {
      imgRef.current.src = glasses;
      imgRef.current.crossOrigin = "Anonymous";
    }
  }, [glasses, is3D]);

  const capturePhoto = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "vroptics_tryon.png";
    link.href = canvas.toDataURL();
    link.click();
  }, []);

  const handleTouchStart = useCallback((e) => {
    if (!isMobile) return;
    touchStartXRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (!isMobile || touchStartXRef.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartXRef.current;
    if (Math.abs(dx) > 50) {
      const currentIdx = GLASS_OPTIONS.findIndex(g => g.id === glasses);
      if (dx < 0 && currentIdx < GLASS_OPTIONS.length - 1) {
        setGlasses(GLASS_OPTIONS[currentIdx + 1].id);
      } else if (dx > 0 && currentIdx > 0) {
        setGlasses(GLASS_OPTIONS[currentIdx - 1].id);
      }
    }
    touchStartXRef.current = null;
  }, [glasses]);

  const currentGlassName  = GLASS_OPTIONS.find(g => g.id === glasses)?.name || "";

  // Mobile layout
  if (isMobile) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#000",
          overflow: "hidden",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          color: "#fff",
          touchAction: "pan-y",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <video ref={videoRef} style={{ display: "none" }} autoPlay playsInline muted />
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          style={{
            position: "absolute",
            inset: 0,
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            display: "block",
          }}
        />
        <canvas
          ref={threeCanvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          style={{
            position: "absolute",
            inset: 0,
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            pointerEvents: "none",
            opacity: is3D ? 1 : 0,
          }}
        />

        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          paddingTop: "env(safe-area-inset-top, 12px)",
          padding: "env(safe-area-inset-top, 12px) 20px 16px",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.65), transparent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 20,
        }}>
          <div style={{
            fontSize: "20px",
            fontWeight: 800,
            letterSpacing: "-0.5px",
            background: "linear-gradient(135deg, #fff 0%, #c9a84c 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            VR<span style={{ color: "#c9a84c", WebkitTextFillColor: "#c9a84c" }}>.</span>OPTICS
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "1.5px",
            color: "#c9a84c",
            background: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(201,168,76,0.5)",
            padding: "6px 14px",
            borderRadius: "100px",
            backdropFilter: "blur(8px)",
          }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c9a84c", boxShadow: "0 0 8px #c9a84c", animation: "pulse 1.2s ease-in-out infinite" }} />
            {is3D ? "3D" : "LIVE"}
          </div>
        </div>

        {!cameraReady && (
          <div style={{
            position: "absolute",
            inset: 0,
            background: "rgba(8,8,12,0.98)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            zIndex: 50,
          }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              border: "2px solid rgba(201,168,76,0.2)",
              borderTop: "2px solid #c9a84c",
              animation: "spinRing 0.9s linear infinite",
            }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "3px", color: "#c9a84c", marginBottom: "8px" }}>INITIALIZING</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Allow camera access to continue</div>
            </div>
          </div>
        )}

        {glbLoading && (
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "2px",
            background: "rgba(0,0,0,0.9)",
            padding: "12px 24px",
            borderRadius: "100px",
            zIndex: 40,
            border: "1px solid #c9a84c",
            backdropFilter: "blur(12px)",
          }}>
            LOADING 3D…
          </div>
        )}

        <div style={{
          position: "absolute",
          bottom: "calc(env(safe-area-inset-bottom, 16px) + 240px)",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "13px",
          fontWeight: 700,
          color: "#fff",
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(8px)",
          padding: "6px 20px",
          borderRadius: "100px",
          border: "1px solid rgba(255,255,255,0.15)",
          whiteSpace: "nowrap",
          zIndex: 20,
        }}>
          {currentGlassName}
        </div>

        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: "env(safe-area-inset-bottom, 16px)",
          background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)",
          zIndex: 20,
        }}>
          {/* Frame selector (no size or arms buttons) */}
          <div style={{
            overflowX: "auto",
            display: "flex",
            gap: "12px",
            padding: "16px 20px 8px",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}>
            {GLASS_OPTIONS.map((g) => {
              const isActive = glasses === g.id;
              return (
                <div
                  key={g.id}
                  onClick={() => setGlasses(g.id)}
                  style={{
                    flexShrink: 0,
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: isActive
                      ? (g.is3d ? "rgba(100,180,255,0.35)" : "rgba(201,168,76,0.35)")
                      : "rgba(0,0,0,0.55)",
                    border: `2.5px solid ${isActive ? (g.is3d ? "#64b4ff" : "#c9a84c") : "rgba(255,255,255,0.2)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "26px",
                    scrollSnapAlign: "start",
                    transition: "all 0.2s cubic-bezier(0.2,0.9,0.4,1.1)",
                    transform: isActive ? "scale(1.18)" : "scale(1)",
                    backdropFilter: "blur(6px)",
                    boxShadow: isActive
                      ? `0 0 16px ${g.is3d ? "rgba(100,180,255,0.5)" : "rgba(201,168,76,0.45)"},inset 0 1px 0 rgba(255,255,255,0.15)`
                      : "none",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {g.emoji}
                </div>
              );
            })}
          </div>

          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "12px 40px 16px",
          }}>
            <div style={{ width: "52px", height: "52px" }} />

            <button
              onClick={capturePhoto}
              style={{
                width: "76px",
                height: "76px",
                borderRadius: "50%",
                background: "#fff",
                border: "5px solid rgba(255,255,255,0.4)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "26px",
                boxShadow: "0 0 0 2px rgba(255,255,255,0.2), 0 4px 16px rgba(0,0,0,0.4)",
                WebkitTapHighlightColor: "transparent",
                transition: "transform 0.15s",
                flexShrink: 0,
              }}
              onTouchStart={e => { e.currentTarget.style.transform = "scale(0.92)"; }}
              onTouchEnd={e   => { e.currentTarget.style.transform = "scale(1)"; }}
              aria-label="Capture photo"
            >
              📸
            </button>

            <div style={{ width: "52px", height: "52px" }} />
          </div>
        </div>

        <style>{`
          @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.8)} }
          @keyframes spinRing { to{transform:rotate(360deg)} }
          div::-webkit-scrollbar { display:none; }
          * { box-sizing:border-box; }
        `}</style>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════
  // ── DESKTOP LAYOUT ─────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════
  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      background: "radial-gradient(circle at 20% 30%, #0a0a0f, #000000)",
      color: "#ffffff",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflowX: "hidden",
    }}>
      <div style={{ position:"fixed", inset:0, backgroundImage:`radial-gradient(circle at 25% 40%, rgba(201,168,76,0.08) 0%, transparent 50%)`, pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"fixed", top:"-20%", right:"-10%", width:"70vw", height:"70vw", background:"radial-gradient(circle, rgba(201,168,76,0.08), transparent 70%)", borderRadius:"50%", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"fixed", bottom:"-20%", left:"-10%", width:"70vw", height:"70vw", background:"radial-gradient(circle, rgba(100,180,255,0.06), transparent 70%)", borderRadius:"50%", pointerEvents:"none", zIndex:0 }} />

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px 32px", borderBottom:"1px solid rgba(201,168,76,0.2)", backdropFilter:"blur(20px)", background:"rgba(0,0,0,0.4)", zIndex:2, position:"relative" }}>
        <div style={{ fontFamily:"'Inter', sans-serif", fontSize:"28px", fontWeight:700, letterSpacing:"-0.5px", background:"linear-gradient(135deg, #ffffff 0%, #c9a84c 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
          VR<span style={{ color:"#c9a84c", background:"none", WebkitTextFillColor:"#c9a84c" }}>.</span>OPTICS
        </div>
        <div style={{ fontSize:"11px", letterSpacing:"3px", background:"rgba(201,168,76,0.12)", border:"1px solid rgba(201,168,76,0.4)", padding:"8px 20px", borderRadius:"100px", backdropFilter:"blur(8px)", fontWeight:600, textTransform:"uppercase" }}>
          {is3D ? "3D MODE" : "LIVE TRY-ON"}
        </div>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:"24px", flex:1, padding:"24px 32px 32px 32px", overflowY:"auto", zIndex:2, position:"relative", maxWidth:"1400px", margin:"0 auto", width:"100%" }}>

        <div style={{ background:"rgba(10,10,15,0.6)", backdropFilter:"blur(24px)", borderRadius:"40px", padding:"16px", border:"1px solid rgba(201,168,76,0.2)", boxShadow:"0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
          <div style={{ position:"relative", width:"100%", aspectRatio:"4/3", maxWidth:"100%", margin:"0 auto", borderRadius:"32px", overflow:"hidden" }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ position:"absolute", width:"24px", height:"24px", borderColor:"#c9a84c", borderStyle:"solid", zIndex:10, top:i<2?"20px":"auto", bottom:i>=2?"20px":"auto", left:i%2===0?"20px":"auto", right:i%2===1?"20px":"auto", borderWidth:i===0?"2px 0 0 2px":i===1?"2px 2px 0 0":i===2?"0 0 2px 2px":"0 2px 2px 0", opacity:0.6, pointerEvents:"none" }} />
            ))}
            <div style={{ position:"absolute", top:"20px", right:"20px", display:"flex", alignItems:"center", gap:"10px", fontSize:"10px", fontWeight:600, letterSpacing:"1.5px", color:"#c9a84c", zIndex:10, background:"rgba(0,0,0,0.7)", padding:"6px 16px", borderRadius:"100px", backdropFilter:"blur(12px)", border:"0.5px solid rgba(201,168,76,0.5)" }}>
              <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#c9a84c", boxShadow:"0 0 8px #c9a84c", animation:"pulse 1.2s ease-in-out infinite" }} />
              {is3D ? "3D ACTIVE" : "TRACKING"}
            </div>
            <div style={{ position:"absolute", bottom:"20px", left:"20px", display:"flex", gap:"10px", flexWrap:"wrap", zIndex:10 }}>
              <span style={{ fontSize:"10px", fontWeight:500, background:"rgba(0,0,0,0.7)", backdropFilter:"blur(8px)", border:"0.5px solid rgba(255,255,255,0.1)", padding:"5px 14px", borderRadius:"100px", letterSpacing:"0.3px" }}>💡 {brightness}%</span>
              <span style={{ fontSize:"10px", fontWeight:500, background:"rgba(0,0,0,0.7)", backdropFilter:"blur(8px)", border:"0.5px solid rgba(255,255,255,0.1)", padding:"5px 14px", borderRadius:"100px" }}>🎨 {contrast}%</span>
              <span style={{ fontSize:"10px", fontWeight:500, background:"rgba(0,0,0,0.7)", backdropFilter:"blur(8px)", border:"0.5px solid rgba(255,255,255,0.1)", padding:"5px 14px", borderRadius:"100px" }}>🌈 {saturate}%</span>
              {is3D && <span style={{ fontSize:"10px", color:"#64b4ff", background:"rgba(100,180,255,0.15)", border:"0.5px solid rgba(100,180,255,0.4)", padding:"5px 14px", borderRadius:"100px" }}>✨ 3D MODEL</span>}
            </div>
            {glbLoading && (
              <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", fontSize:"12px", fontWeight:600, letterSpacing:"2px", background:"rgba(0,0,0,0.9)", padding:"10px 24px", borderRadius:"100px", zIndex:20, border:"1px solid #c9a84c", backdropFilter:"blur(12px)" }}>
                LOADING 3D...
              </div>
            )}
            {!cameraReady && (
              <div style={{ position:"absolute", inset:0, borderRadius:"32px", background:"rgba(8,8,12,0.98)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"24px", zIndex:30 }}>
                <div style={{ width:"56px", height:"56px", borderRadius:"50%", border:"2px solid rgba(201,168,76,0.2)", borderTop:"2px solid #c9a84c", animation:"spinRing 0.9s linear infinite" }} />
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontSize:"12px", fontWeight:600, letterSpacing:"3px", color:"#c9a84c", marginBottom:"8px" }}>INITIALIZING</div>
                  <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.4)", letterSpacing:"0.5px" }}>Please allow camera access</div>
                </div>
              </div>
            )}
            <video ref={videoRef} style={{ display:"none" }} autoPlay playsInline muted />
            <canvas ref={canvasRef} width={640} height={480} style={{ display:"block", width:"100%", height:"100%", borderRadius:"32px", objectFit:"cover", boxShadow:"inset 0 0 20px rgba(0,0,0,0.2)" }} />
            <canvas ref={threeCanvasRef} width={640} height={480} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", opacity:is3D?1:0, borderRadius:"32px" }} />
          </div>
        </div>

        <div style={{ background:"rgba(10,10,15,0.6)", backdropFilter:"blur(24px)", borderRadius:"40px", padding:"28px", display:"flex", flexDirection:"column", gap:"28px", border:"1px solid rgba(201,168,76,0.15)", boxShadow:"0 8px 32px rgba(0,0,0,0.3)" }}>

          <div>
            <div style={{ fontSize:"11px", letterSpacing:"3px", color:"#c9a84c", marginBottom:"16px", fontWeight:600, display:"flex", alignItems:"center", gap:"10px" }}>
              <span style={{ width:"24px", height:"1px", background:"#c9a84c" }}></span>
              SELECT FRAME
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))", gap:"16px" }}>
              {GLASS_OPTIONS.map(g => (
                <div key={g.id} onClick={() => setGlasses(g.id)} style={{ background:glasses===g.id?(g.is3d?"linear-gradient(135deg,#0f1828,#0a0f1a)":"linear-gradient(135deg,#1e1a10,#14110a)"):"rgba(20,20,28,0.5)", border:`1.5px solid ${glasses===g.id?(g.is3d?"#64b4ff":"#c9a84c"):"rgba(201,168,76,0.15)"}`, borderRadius:"28px", padding:"20px 12px", display:"flex", flexDirection:"column", alignItems:"center", gap:"8px", cursor:"pointer", transition:"all 0.3s cubic-bezier(0.2,0.9,0.4,1.1)", transform:glasses===g.id?"translateY(-2px)":"translateY(0)", boxShadow:glasses===g.id?`0 8px 20px ${g.is3d?"rgba(100,180,255,0.2)":"rgba(201,168,76,0.15)"}`:"none", position:"relative" }}>
                  {g.is3d && <span style={{ position:"absolute", top:"12px", right:"12px", fontSize:"9px", fontWeight:700, color:"#64b4ff", background:"rgba(100,180,255,0.15)", padding:"3px 10px", borderRadius:"100px", border:"0.5px solid rgba(100,180,255,0.4)" }}>3D</span>}
                  <div style={{ fontSize:"40px", filter:"drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}>{g.emoji}</div>
                  <div style={{ fontSize:"14px", fontWeight:600, color:"rgba(255,255,255,0.9)" }}>{g.name}</div>
                  <div style={{ fontSize:"15px", color:g.is3d?"#64b4ff":"#c9a84c", fontWeight:700 }}>{g.price}</div>
                </div>
              ))}
            </div>
          </div>

          {!is3D && (
            <div style={{ background:"rgba(0,0,0,0.3)", borderRadius:"28px", padding:"20px", border:"0.5px solid rgba(201,168,76,0.15)" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"20px", alignItems:"center" }}>
                <span style={{ fontSize:"11px", letterSpacing:"3px", color:"#c9a84c", fontWeight:600 }}>⚙️ FRAME ADJUSTMENT</span>
                <button onClick={resetAdj} style={{ fontSize:"10px", fontWeight:600, color:"#c9a84c", background:"rgba(201,168,76,0.1)", border:"0.5px solid rgba(201,168,76,0.3)", padding:"5px 16px", borderRadius:"100px", cursor:"pointer", transition:"all 0.2s" }}>RESET</button>
              </div>
              {[
                { label:"WIDTH",    key:"scaleW",  min:0.3,  max:3,   step:0.05, fmt: v => `${v.toFixed(2)}×` },
                { label:"HEIGHT",   key:"scaleH",  min:0.3,  max:3,   step:0.05, fmt: v => `${v.toFixed(2)}×` },
                { label:"MOVE L/R", key:"offsetX", min:-150, max:150, step:1,    fmt: v => `${v>0?"+":""}${v}px` },
                { label:"MOVE U/D", key:"offsetY", min:-150, max:150, step:1,    fmt: v => `${v>0?"+":""}${v}px` },
                { label:"ROTATION", key:"rotate",  min:-30,  max:30,  step:0.5,  fmt: v => `${v>0?"+":""}${v.toFixed(1)}°` },
              ].map(({ label, key, min, max, step, fmt }) => (
                <div key={key} style={{ marginBottom:"18px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"10px" }}>
                    <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.5)", fontWeight:500 }}>{label}</span>
                    <span style={{ fontSize:"12px", color:"#c9a84c", fontWeight:600 }}>{fmt(curAdj[key])}</span>
                  </div>
                  <input type="range" min={min} max={max} step={step} value={curAdj[key]} onChange={e => setAdj(key, Number(e.target.value))} style={{ width:"100%", height:"4px", background:"rgba(201,168,76,0.2)", borderRadius:"4px" }} />
                </div>
              ))}
            </div>
          )}

          <div>
            <div style={{ fontSize:"11px", letterSpacing:"3px", color:"#c9a84c", marginBottom:"16px", fontWeight:600, display:"flex", alignItems:"center", gap:"10px" }}>
              <span style={{ width:"24px", height:"1px", background:"#c9a84c" }}></span>
              SCENE FILTERS
            </div>
            {[
              { label:"BRIGHTNESS", val:brightness, set:setBrightness, icon:"☀️" },
              { label:"CONTRAST",   val:contrast,   set:setContrast,   icon:"🎚️" },
              { label:"SATURATION", val:saturate,   set:setSaturate,   icon:"🎨" },
            ].map(({ label, val, set, icon }) => (
              <div key={label} style={{ marginBottom:"18px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"10px" }}>
                  <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.5)", fontWeight:500 }}>{icon} {label}</span>
                  <span style={{ fontSize:"12px", color:"#c9a84c", fontWeight:600 }}>{val}%</span>
                </div>
                <input type="range" min="0" max="200" step="1" value={val} onChange={e => set(Number(e.target.value))} style={{ width:"100%", height:"4px", background:"rgba(201,168,76,0.2)", borderRadius:"4px" }} />
              </div>
            ))}
          </div>

          <button onClick={capturePhoto} style={{ width:"100%", background:"linear-gradient(135deg,rgba(201,168,76,0.15),rgba(201,168,76,0.05))", border:"1px solid rgba(201,168,76,0.4)", color:"#c9a84c", fontSize:"13px", letterSpacing:"2px", padding:"16px", borderRadius:"100px", cursor:"pointer", fontWeight:700, transition:"all 0.3s ease", backdropFilter:"blur(8px)" }} onMouseEnter={e => { e.currentTarget.style.background="linear-gradient(135deg,rgba(201,168,76,0.25),rgba(201,168,76,0.1))"; e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 8px 20px rgba(201,168,76,0.2)"; }} onMouseLeave={e => { e.currentTarget.style.background="linear-gradient(135deg,rgba(201,168,76,0.15),rgba(201,168,76,0.05))"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
            📸 CAPTURE LOOK
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.8)} }
        @keyframes spinRing { to{transform:rotate(360deg)} }
        input[type="range"] { -webkit-appearance:none; background:transparent; }
        input[type="range"]:focus { outline:none; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance:none; width:18px; height:18px; border-radius:50%; background:#c9a84c; cursor:pointer; border:2px solid #0a0a0f; box-shadow:0 0 8px #c9a84c; transition:all 0.2s ease; }
        input[type="range"]::-webkit-slider-thumb:hover { transform:scale(1.2); box-shadow:0 0 12px #c9a84c; }
        input[type="range"]::-moz-range-thumb { width:18px; height:18px; border-radius:50%; background:#c9a84c; cursor:pointer; border:2px solid #0a0a0f; }
        button { transition:all 0.3s ease; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:rgba(20,20,28,0.5); border-radius:4px; }
        ::-webkit-scrollbar-thumb { background:#c9a84c; border-radius:4px; }
        * { box-sizing:border-box; }
      `}</style>
    </div>
  );
};

export default TryOn;