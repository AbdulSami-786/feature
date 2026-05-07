// import React, { useRef, useEffect, useState, useCallback } from "react";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// // ── Per-frame default adjustments ─────────────────────────────────
// const DEFAULT_ADJ = { scaleW: 1, scaleH: 1, offsetX: 0, offsetY: 8, rotate: 0 };
// const AVIATOR_ADJ = { scaleW: 1, scaleH: 1.18, offsetX: 0, offsetY: 18, rotate: 0 };
// const ROUND_ADJ   = { scaleW: 1, scaleH: 0.85, offsetX: 0, offsetY: 6, rotate: 0 };

// // ══════════════════════════════════════════════════════════════════
// // ── GLASS OPTIONS – each frame now has only ONE size ──────────────
// // ══════════════════════════════════════════════════════════════════
// const GLASS_OPTIONS = [
//   { id: "/glass1.png",  name: "Classic",  price: "PKR 4,500", emoji: "👓", 
//     sizes: [{ label:"XL", scale:1.10, mobileScale:0.65 }] 
//   },
//   { id: "/glass2.png",  name: "Aviator",  price: "PKR 5,200", emoji: "🕶️", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:1.00 }] 
//   },
//   { id: "/glass3.png",  name: "Sport",    price: "PKR 3,800", emoji: "🥽", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:1.00 }] 
//   },
//   { id: "/glass4.png",  name: "Round",    price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
//   },
//   { id: "/glass5.png",  name: "Wayfarer", price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.25, mobileScale:0.98 }] 
//   },
//   { id: "/glass6.png",  name: "Vintage",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
//   },
//   { id: "/glass7.png",  name: "Clubmaster", price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] 
//   },
//   { id: "/glass8.png",  name: "Cat Eye",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] 
//   },
//   { id: "/glass9.png",  name: "Shield",    price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"M", scale:1.00, mobileScale:0.75 }] 
//   },
//   { id: "/glass10.png", name: "Oval",      price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
//   },
//   { id: "/glass11.png", name: "Square",    price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"S", scale:0.75, mobileScale:0.50 }] 
//   },
//   { id: "/glass12.png", name: "Hexagonal", price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
//   },
//   { id: "/glass13.png", name: "Geometric", price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"M", scale:1.00, mobileScale:0.75 }] 
//   },
//   { id: "/glass14.png", name: "Steampunk", price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"S", scale:0.95, mobileScale:0.50 }] 
//   },
//   { id: "/glass15.png", name: "Sports",    price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
//   },
//   { id: "/glass16.png", name: "Retro",     price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
//   },
//   { id: "/glass17.png", name: "Modern",    price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
//   },
//   { id: "/glass18.png", name: "Luxury",    price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
//   },
//   { id: "/glass19.png", name: "Designer",  price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
//   },
//   { id: "/glass20.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
//   },
//   { id: "/glass21.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"M", scale:1.00, mobileScale:0.75 }] 
//   },
//   { id: "/glass22.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.05, mobileScale:0.95 }] 
//   },
//   { id: "/glass23.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
//   },
//   { id: "/glass24.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"S", scale:0.85, mobileScale:0.50 }] 
//   },
//   { id: "/glass25.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
//   },
//   { id: "/glass26.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
//   },
//   { id: "/glass27.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
//   },
//   { id: "/glass28.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"M", scale:1.00, mobileScale:0.75 }] 
//   },
//   { id: "/glass29.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.25, mobileScale:0.95 }] 
//   },
//   { id: "/glass30.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
//   },
//   { id: "/glass31.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
//   },
//   { id: "/glass32.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
//   },
//   { id: "/glass33.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
//   },
//   { id: "/glass34.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
//   },
//   { id: "/glass35.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"M", scale:1.10, mobileScale:0.75 }] 
//   },
//   { id: "/glass36.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
//   },
//   { id: "/glass37.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
//   },
//   { id: "/glass38.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] 
//   },
//   { id: "/glass39.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
//   },
//   { id: "/glass40.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"M", scale:1.00, mobileScale:0.75 }] 
//   },
//   { id: "/glass41.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
//   },
//   { id: "/glass42.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"S", scale:0.95, mobileScale:0.50 }] 
//   },
//   { id: "/glass43.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
//   },
//   { id: "/glass44.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
//   },
//   { id: "/glass45.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] 
//   },
//   { id: "/glass46.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"XL", scale:1.40, mobileScale:1.10 }] 
//   },
//   { id: "/glass47.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"XL", scale:1.20, mobileScale:1.10 }] 
//   },
//   { id: "/glass48.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"M", scale:1.00, mobileScale:0.75 }] 
//   },
//   { id: "/glass49.png", name: "Classic",   price: "PKR 4,900", emoji: "🪬", 
//     sizes: [{ label:"L", scale:1.15, mobileScale:0.95 }] 
//   },
// ];

// // ══════════════════════════════════════════════════════════════════
// // ── MOBILE DETECTION ──────────────────────────────────────────────
// // ══════════════════════════════════════════════════════════════════
// const isMobile = typeof window !== "undefined" &&
//   (window.innerWidth < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

// // ══════════════════════════════════════════════════════════════════
// // ── HELPER: GET SIZE SCALE WITH MOBILE FALLBACK ──────────────────
// // ══════════════════════════════════════════════════════════════════
// const getSizeScale = (sizeObj) => {
//   if (!sizeObj) return 1;
//   return isMobile
//     ? (sizeObj.mobileScale ?? sizeObj.scale)
//     : sizeObj.scale;
// };

// // ── MOBILE-SPECIFIC CONSTANTS ─────────────────────────────────────
// const BASE_EYE_SPAN       = 120;
// const BASE_GLASSES_WIDTH  = BASE_EYE_SPAN * 1.7;
// const MOBILE_EMA_ALPHA    = 0.25;
// const MOBILE_DEADZONE     = 1.5;
// const MOBILE_LERP         = 0.2;
// const MOBILE_CANVAS_W     = 480;
// const MOBILE_CANVAS_H     = 360;
// const DESKTOP_CANVAS_W    = 640;
// const DESKTOP_CANVAS_H    = 480;
// const CANVAS_W            = isMobile ? MOBILE_CANVAS_W : DESKTOP_CANVAS_W;
// const CANVAS_H            = isMobile ? MOBILE_CANVAS_H : DESKTOP_CANVAS_H;
// const MOBILE_FPS          = 30;
// const MOBILE_FRAME_INTERVAL = 1000 / MOBILE_FPS;

// const lerp = (a, b, t) => a + (b - a) * t;

// // ── FACE LANDMARK INDICES ─────────────────────────────────────────
// const LANDMARKS = {
//   LEFT_IRIS_CENTER: 468, RIGHT_IRIS_CENTER: 473,
//   LEFT_EYE_INNER: 133,   LEFT_EYE_OUTER: 33,
//   RIGHT_EYE_INNER: 362,  RIGHT_EYE_OUTER: 263,
//   LEFT_EYEBROW_LOWER:  [70, 63, 105, 66, 107],
//   RIGHT_EYEBROW_LOWER: [300, 293, 334, 296, 336],
//   LEFT_EYEBROW_UPPER:  [46, 53, 52, 65, 55],
//   RIGHT_EYEBROW_UPPER: [276, 283, 282, 295, 285],
//   NOSE_BRIDGE_TOP: 6, NOSE_BRIDGE_MID: 168, NOSE_BRIDGE_LOW: 197,
//   NOSE_TIP: 5, NOSE_LEFT_PAD: 124, NOSE_RIGHT_PAD: 353,
//   FACE_LEFT: 234, FACE_RIGHT: 454,
//   CHEEK_LEFT: 116, CHEEK_RIGHT: 345,
//   FOREHEAD_CENTER: 10, CHIN: 152,
//   UNDER_EYE_LEFT: 145, UNDER_EYE_RIGHT: 374,
//   TEMPLE_LEFT: 127,    TEMPLE_RIGHT: 356,
//   LEFT_UPPER_LID: 159, RIGHT_UPPER_LID: 386,
//   LEFT_LOWER_LID: 145, RIGHT_LOWER_LID: 374,
// };

// // ── EMA SMOOTHER ──────────────────────────────────────────────────
// class LandmarkSmoother {
//   constructor(alpha = 0.45) {
//     this.alpha = alpha;
//     this.prev = null;
//   }
//   smooth(current, deadzone = 0) {
//     if (!this.prev) { this.prev = { ...current }; return current; }
//     const result = {};
//     for (const key of Object.keys(current)) {
//       const delta = current[key] - this.prev[key];
//       result[key] = (deadzone > 0 && Math.abs(delta) < deadzone)
//         ? this.prev[key]
//         : this.prev[key] + this.alpha * delta;
//     }
//     this.prev = { ...result };
//     return result;
//   }
//   reset() { this.prev = null; }
// }

// // ── FACE GEOMETRY EXTRACTOR ───────────────────────────────────────
// function extractFaceGeometry(lm, W, H) {
//   const px    = (idx)     => ({ x: lm[idx].x * W, y: lm[idx].y * H, z: lm[idx].z });
//   const avgPx = (indices) => {
//     const pts = indices.map(i => px(i));
//     return {
//       x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
//       y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
//       z: pts.reduce((s, p) => s + p.z, 0) / pts.length,
//     };
//   };
//   const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

//   const leftIris    = px(LANDMARKS.LEFT_IRIS_CENTER);
//   const rightIris   = px(LANDMARKS.RIGHT_IRIS_CENTER);
//   const leftEyeOut  = px(LANDMARKS.LEFT_EYE_OUTER);
//   const rightEyeOut = px(LANDMARKS.RIGHT_EYE_OUTER);
//   const leftBrowLower  = avgPx(LANDMARKS.LEFT_EYEBROW_LOWER);
//   const rightBrowLower = avgPx(LANDMARKS.RIGHT_EYEBROW_LOWER);
//   const browMidLower   = { x: (leftBrowLower.x + rightBrowLower.x) / 2, y: (leftBrowLower.y + rightBrowLower.y) / 2 };
//   const noseBridgeTop  = px(LANDMARKS.NOSE_BRIDGE_TOP);

//   const eyeSpan        = dist(leftEyeOut, rightEyeOut);
//   const leftBrowGap    = dist(leftBrowLower,  leftIris);
//   const rightBrowGap   = dist(rightBrowLower, rightIris);
//   const avgBrowEyeGap  = (leftBrowGap + rightBrowGap) / 2;

//   const angleIris       = Math.atan2(rightIris.y    - leftIris.y,    rightIris.x    - leftIris.x);
//   const angleEyeCorners = Math.atan2(rightEyeOut.y  - leftEyeOut.y,  rightEyeOut.x  - leftEyeOut.x);
//   const angleBrow       = Math.atan2(rightBrowLower.y - leftBrowLower.y, rightBrowLower.x - leftBrowLower.x);
//   const angle           = angleEyeCorners * 0.5 + angleBrow * 0.3 + angleIris * 0.2;

//   const centerX   = (leftIris.x + rightIris.x) / 2;
//   const centerY   = browMidLower.y * 0.35 + noseBridgeTop.y * 0.45 + ((leftIris.y + rightIris.y) / 2) * 0.20;

//   let glassesWidth;
//   if (isMobile) {
//     const normalizedScale = Math.max(0.9, Math.min(1.1, eyeSpan / BASE_EYE_SPAN));
//     glassesWidth = BASE_GLASSES_WIDTH * normalizedScale;
//   } else {
//     glassesWidth = eyeSpan * 1.7;
//   }

//   const glassesHeight = avgBrowEyeGap * 3.3;
//   const avgZ          = (leftIris.z + rightIris.z + noseBridgeTop.z) / 3;
//   const depthScale    = 1 + (-avgZ * 0.8);

//   return { centerX, centerY, angle, glassesWidth, glassesHeight, depthScale };
// }

// // ══════════════════════════════════════════════════════════════════
// // ── MAIN COMPONENT ────────────────────────────────────────────────
// // ══════════════════════════════════════════════════════════════════
// const TryOn = () => {
//   const videoRef       = useRef(null);
//   const canvasRef      = useRef(null);
//   const imgRef         = useRef(new Image());
//   const threeCanvasRef = useRef(null);
//   const rendererRef    = useRef(null);
//   const sceneRef       = useRef(null);
//   const cameraRef      = useRef(null);
//   const glassModel3dRef = useRef(null);
//   const modelWidthRef  = useRef(1);

//   const prevPosRef      = useRef(null);
//   const lastFrameTimeRef = useRef(0);
//   const touchStartXRef  = useRef(null);

//   const [glasses, setGlasses]           = useState("/glass1.png");
//   const [brightness, setBrightness]     = useState(100);
//   const [contrast, setContrast]         = useState(100);
//   const [saturate, setSaturate]         = useState(100);
//   const [glbLoading, setGlbLoading]     = useState(false);
//   const [cameraReady, setCameraReady]   = useState(false);
//   const cameraReadyRef = useRef(false);

//   const smootherRef = useRef(new LandmarkSmoother(isMobile ? MOBILE_EMA_ALPHA : 0.45));

//   const [adjustments, setAdjustments] = useState(() =>
//     Object.fromEntries(
//       GLASS_OPTIONS.filter(g => !g.is3d).map(g => {
//         if (g.id === "/glass2.png") return [g.id, { ...AVIATOR_ADJ }];
//         if (g.id === "/glass4.png") return [g.id, { ...ROUND_ADJ }];
//         return [g.id, { ...DEFAULT_ADJ }];
//       })
//     )
//   );

//   const brightnessRef  = useRef(brightness);
//   const contrastRef    = useRef(contrast);
//   const saturateRef    = useRef(saturate);
//   const glassesRef     = useRef(glasses);
//   const is3DRef        = useRef(false);
//   const adjRef         = useRef(adjustments);

//   useEffect(() => { brightnessRef.current = brightness; }, [brightness]);
//   useEffect(() => { contrastRef.current   = contrast;   }, [contrast]);
//   useEffect(() => { saturateRef.current   = saturate;   }, [saturate]);
//   useEffect(() => { glassesRef.current    = glasses;    }, [glasses]);
//   useEffect(() => { is3DRef.current       = glasses === "__3D__"; }, [glasses]);
//   useEffect(() => { adjRef.current        = adjustments; }, [adjustments]);

//   const is3D   = glasses === "__3D__";
//   const curAdj = adjustments[glasses] || DEFAULT_ADJ;

//   const setAdj   = (key, val) => setAdjustments(prev => ({ ...prev, [glasses]: { ...prev[glasses], [key]: val } }));
//   const resetAdj = () => {
//     if (glasses === "/glass2.png")      setAdjustments(prev => ({ ...prev, [glasses]: { ...AVIATOR_ADJ } }));
//     else if (glasses === "/glass4.png") setAdjustments(prev => ({ ...prev, [glasses]: { ...ROUND_ADJ } }));
//     else                                setAdjustments(prev => ({ ...prev, [glasses]: { ...DEFAULT_ADJ } }));
//   };

//   // 3D scene init
//   useEffect(() => {
//     if (!is3D) {
//       if (rendererRef.current) {
//         rendererRef.current.dispose();
//         rendererRef.current = sceneRef.current = cameraRef.current = glassModel3dRef.current = null;
//       }
//       return;
//     }
//     const canvas = threeCanvasRef.current;
//     if (!canvas) return;
//     const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     renderer.setSize(CANVAS_W, CANVAS_H);
//     renderer.setClearColor(0x000000, 0);
//     rendererRef.current = renderer;
//     const scene = new THREE.Scene();
//     sceneRef.current = scene;
//     const cam = new THREE.OrthographicCamera(-CANVAS_W / 2, CANVAS_W / 2, CANVAS_H / 2, -CANVAS_H / 2, 0.1, 2000);
//     cam.position.z = 500;
//     cameraRef.current = cam;
//     scene.add(new THREE.AmbientLight(0xffffff, 1.4));
//     const keyLight  = new THREE.DirectionalLight(0xfff5e0, 1.3); keyLight.position.set(2, 3, 4);  scene.add(keyLight);
//     const fillLight = new THREE.DirectionalLight(0xc9e0ff, 0.6); fillLight.position.set(-2, 0, 2); scene.add(fillLight);
//     const backLight = new THREE.DirectionalLight(0xffcc88, 0.4); backLight.position.set(0, 1, -3); scene.add(backLight);
//     setGlbLoading(true);
//     new GLTFLoader().load(
//       "/glasses.glb",
//       (gltf) => {
//         const model = gltf.scene;
//         const box = new THREE.Box3().setFromObject(model);
//         model.position.sub(box.getCenter(new THREE.Vector3()));
//         modelWidthRef.current = box.getSize(new THREE.Vector3()).x || 1;
//         model.traverse(c => { if (c.isMesh) c.castShadow = true; });
//         glassModel3dRef.current = model;
//         scene.add(model);
//         setGlbLoading(false);
//       },
//       undefined,
//       (err) => { console.error("GLB error:", err); setGlbLoading(false); }
//     );
//     return () => { renderer.dispose(); rendererRef.current = sceneRef.current = cameraRef.current = glassModel3dRef.current = null; };
//   }, [is3D]);

//   // FaceMesh + main rendering loop
//   useEffect(() => {
//     const faceMesh = new window.FaceMesh({
//       locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${f}`,
//     });
//     faceMesh.setOptions({
//       maxNumFaces: 1,
//       refineLandmarks: true,
//       minDetectionConfidence: 0.5,
//       minTrackingConfidence: 0.5,
//     });
//     faceMesh.onResults(onResults);

//     const camera = new window.Camera(videoRef.current, {
//       onFrame: async () => {
//         if (!cameraReadyRef.current) { cameraReadyRef.current = true; setCameraReady(true); }
//         if (isMobile) {
//           const now = performance.now();
//           if (now - lastFrameTimeRef.current < MOBILE_FRAME_INTERVAL) return;
//           lastFrameTimeRef.current = now;
//         }
//         await faceMesh.send({ image: videoRef.current });
//       },
//       width: CANVAS_W, height: CANVAS_H,
//     });
//     camera.start();

//     function onResults(results) {
//       const canvas = canvasRef.current;
//       const ctx    = canvas.getContext("2d");
//       const W = canvas.width, H = canvas.height;
//       ctx.clearRect(0, 0, W, H);
//       ctx.filter = `brightness(${brightnessRef.current}%) contrast(${contrastRef.current}%) saturate(${saturateRef.current}%)`;
//       ctx.drawImage(results.image, 0, 0, W, H);
//       ctx.filter = "none";

//       const _is3D = is3DRef.current;
//       if (_is3D && rendererRef.current && sceneRef.current && cameraRef.current) {
//         rendererRef.current.render(sceneRef.current, cameraRef.current);
//       }
//       if (!results.multiFaceLandmarks?.length) { smootherRef.current.reset(); prevPosRef.current = null; return; }

//       const lm  = results.multiFaceLandmarks[0];
//       const geo = extractFaceGeometry(lm, W, H);

//       const smoothed = smootherRef.current.smooth(
//         { cx: geo.centerX, cy: geo.centerY, gw: geo.glassesWidth, gh: geo.glassesHeight, angle: geo.angle, ds: geo.depthScale },
//         isMobile ? MOBILE_DEADZONE : 0
//       );

//       if (isMobile) {
//         if (prevPosRef.current) {
//           smoothed.cx = lerp(prevPosRef.current.cx, smoothed.cx, MOBILE_LERP);
//           smoothed.cy = lerp(prevPosRef.current.cy, smoothed.cy, MOBILE_LERP);
//         }
//         prevPosRef.current = { cx: smoothed.cx, cy: smoothed.cy };
//       }

//       // Use the single size from the frame's sizes array (first element)
//       const currentGlassObj = GLASS_OPTIONS.find(g => g.id === glassesRef.current);
//       let sizeScale = 1.0;
//       if (currentGlassObj?.sizes && currentGlassObj.sizes.length > 0) {
//         sizeScale = getSizeScale(currentGlassObj.sizes[0]);
//       }

//       if (_is3D) {
//         const model = glassModel3dRef.current;
//         const r = rendererRef.current, s = sceneRef.current, c = cameraRef.current;
//         if (model && r && s && c) {
//           model.position.x = smoothed.cx - W / 2;
//           model.position.y = -(smoothed.cy - H / 2);
//           let scale3D = isMobile
//             ? (smoothed.gw / modelWidthRef.current)
//             : (smoothed.gw * smoothed.ds) / modelWidthRef.current;
//           scale3D *= sizeScale;
//           model.scale.setScalar(scale3D);
//           model.rotation.z = -smoothed.angle;
//           r.render(s, c);
//         }
//       } else {
//         const img = imgRef.current;
//         if (!img.complete || !img.src) return;
//         const adj = adjRef.current[glassesRef.current] || DEFAULT_ADJ;

//         let w = isMobile
//           ? smoothed.gw * adj.scaleW
//           : smoothed.gw * adj.scaleW * smoothed.ds;
//         let h = isMobile
//           ? smoothed.gh * adj.scaleH
//           : smoothed.gh * adj.scaleH * smoothed.ds;

//         w *= sizeScale;
//         h *= sizeScale;

//         const finalAngle = smoothed.angle + (adj.rotate * Math.PI / 180);
//         const fx = smoothed.cx + adj.offsetX;
//         const fy = smoothed.cy + adj.offsetY;

//         // ARMS ARE NEVER DRAWN – only the glasses image is placed
//         ctx.save();
//         ctx.translate(fx, fy);
//         ctx.rotate(finalAngle);
//         ctx.drawImage(img, -w / 2, -h / 2, w, h);
//         ctx.restore();
//       }
//     }
//     return () => { if (faceMesh) faceMesh.close(); };
//   }, []); // No dependency on selectedSizeKey (removed)

//   useEffect(() => {
//     if (!is3D && imgRef.current) {
//       imgRef.current.src = glasses;
//       imgRef.current.crossOrigin = "Anonymous";
//     }
//   }, [glasses, is3D]);

//   const capturePhoto = useCallback(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const link = document.createElement("a");
//     link.download = "vroptics_tryon.png";
//     link.href = canvas.toDataURL();
//     link.click();
//   }, []);

//   const handleTouchStart = useCallback((e) => {
//     if (!isMobile) return;
//     touchStartXRef.current = e.touches[0].clientX;
//   }, []);

//   const handleTouchEnd = useCallback((e) => {
//     if (!isMobile || touchStartXRef.current === null) return;
//     const dx = e.changedTouches[0].clientX - touchStartXRef.current;
//     if (Math.abs(dx) > 50) {
//       const currentIdx = GLASS_OPTIONS.findIndex(g => g.id === glasses);
//       if (dx < 0 && currentIdx < GLASS_OPTIONS.length - 1) {
//         setGlasses(GLASS_OPTIONS[currentIdx + 1].id);
//       } else if (dx > 0 && currentIdx > 0) {
//         setGlasses(GLASS_OPTIONS[currentIdx - 1].id);
//       }
//     }
//     touchStartXRef.current = null;
//   }, [glasses]);

//   const currentGlassName  = GLASS_OPTIONS.find(g => g.id === glasses)?.name || "";

//   // Mobile layout
//   if (isMobile) {
//     return (
//       <div
//         style={{
//           position: "fixed",
//           inset: 0,
//           background: "#000",
//           overflow: "hidden",
//           fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
//           color: "#fff",
//           touchAction: "pan-y",
//         }}
//         onTouchStart={handleTouchStart}
//         onTouchEnd={handleTouchEnd}
//       >
//         <video ref={videoRef} style={{ display: "none" }} autoPlay playsInline muted />
//         <canvas
//           ref={canvasRef}
//           width={CANVAS_W}
//           height={CANVAS_H}
//           style={{
//             position: "absolute",
//             inset: 0,
//             width: "100vw",
//             height: "100vh",
//             objectFit: "cover",
//             display: "block",
//           }}
//         />
//         <canvas
//           ref={threeCanvasRef}
//           width={CANVAS_W}
//           height={CANVAS_H}
//           style={{
//             position: "absolute",
//             inset: 0,
//             width: "100vw",
//             height: "100vh",
//             objectFit: "cover",
//             pointerEvents: "none",
//             opacity: is3D ? 1 : 0,
//           }}
//         />

//         <div style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           paddingTop: "env(safe-area-inset-top, 12px)",
//           padding: "env(safe-area-inset-top, 12px) 20px 16px",
//           background: "linear-gradient(to bottom, rgba(0,0,0,0.65), transparent)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           zIndex: 20,
//         }}>
//           <div style={{
//             fontSize: "20px",
//             fontWeight: 800,
//             letterSpacing: "-0.5px",
//             background: "linear-gradient(135deg, #fff 0%, #c9a84c 100%)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             backgroundClip: "text",
//           }}>
//             VR<span style={{ color: "#c9a84c", WebkitTextFillColor: "#c9a84c" }}>.</span>OPTICS
//           </div>
//           <div style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "6px",
//             fontSize: "10px",
//             fontWeight: 700,
//             letterSpacing: "1.5px",
//             color: "#c9a84c",
//             background: "rgba(0,0,0,0.55)",
//             border: "1px solid rgba(201,168,76,0.5)",
//             padding: "6px 14px",
//             borderRadius: "100px",
//             backdropFilter: "blur(8px)",
//           }}>
//             <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c9a84c", boxShadow: "0 0 8px #c9a84c", animation: "pulse 1.2s ease-in-out infinite" }} />
//             {is3D ? "3D" : "LIVE"}
//           </div>
//         </div>

//         {!cameraReady && (
//           <div style={{
//             position: "absolute",
//             inset: 0,
//             background: "rgba(8,8,12,0.98)",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: "24px",
//             zIndex: 50,
//           }}>
//             <div style={{
//               width: "56px",
//               height: "56px",
//               borderRadius: "50%",
//               border: "2px solid rgba(201,168,76,0.2)",
//               borderTop: "2px solid #c9a84c",
//               animation: "spinRing 0.9s linear infinite",
//             }} />
//             <div style={{ textAlign: "center" }}>
//               <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "3px", color: "#c9a84c", marginBottom: "8px" }}>INITIALIZING</div>
//               <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Allow camera access to continue</div>
//             </div>
//           </div>
//         )}

//         {glbLoading && (
//           <div style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%,-50%)",
//             fontSize: "12px",
//             fontWeight: 700,
//             letterSpacing: "2px",
//             background: "rgba(0,0,0,0.9)",
//             padding: "12px 24px",
//             borderRadius: "100px",
//             zIndex: 40,
//             border: "1px solid #c9a84c",
//             backdropFilter: "blur(12px)",
//           }}>
//             LOADING 3D…
//           </div>
//         )}

//         <div style={{
//           position: "absolute",
//           bottom: "calc(env(safe-area-inset-bottom, 16px) + 240px)",
//           left: "50%",
//           transform: "translateX(-50%)",
//           fontSize: "13px",
//           fontWeight: 700,
//           color: "#fff",
//           background: "rgba(0,0,0,0.5)",
//           backdropFilter: "blur(8px)",
//           padding: "6px 20px",
//           borderRadius: "100px",
//           border: "1px solid rgba(255,255,255,0.15)",
//           whiteSpace: "nowrap",
//           zIndex: 20,
//         }}>
//           {currentGlassName}
//         </div>

//         <div style={{
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           paddingBottom: "env(safe-area-inset-bottom, 16px)",
//           background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)",
//           zIndex: 20,
//         }}>
//           {/* Frame selector (no size or arms buttons) */}
//           <div style={{
//             overflowX: "auto",
//             display: "flex",
//             gap: "12px",
//             padding: "16px 20px 8px",
//             scrollSnapType: "x mandatory",
//             WebkitOverflowScrolling: "touch",
//             scrollbarWidth: "none",
//             msOverflowStyle: "none",
//           }}>
//             {GLASS_OPTIONS.map((g) => {
//               const isActive = glasses === g.id;
//               return (
//                 <div
//                   key={g.id}
//                   onClick={() => setGlasses(g.id)}
//                   style={{
//                     flexShrink: 0,
//                     width: "64px",
//                     height: "64px",
//                     borderRadius: "50%",
//                     background: isActive
//                       ? (g.is3d ? "rgba(100,180,255,0.35)" : "rgba(201,168,76,0.35)")
//                       : "rgba(0,0,0,0.55)",
//                     border: `2.5px solid ${isActive ? (g.is3d ? "#64b4ff" : "#c9a84c") : "rgba(255,255,255,0.2)"}`,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     cursor: "pointer",
//                     fontSize: "26px",
//                     scrollSnapAlign: "start",
//                     transition: "all 0.2s cubic-bezier(0.2,0.9,0.4,1.1)",
//                     transform: isActive ? "scale(1.18)" : "scale(1)",
//                     backdropFilter: "blur(6px)",
//                     boxShadow: isActive
//                       ? `0 0 16px ${g.is3d ? "rgba(100,180,255,0.5)" : "rgba(201,168,76,0.45)"},inset 0 1px 0 rgba(255,255,255,0.15)`
//                       : "none",
//                     WebkitTapHighlightColor: "transparent",
//                   }}
//                 >
//                   {g.emoji}
//                 </div>
//               );
//             })}
//           </div>

//           <div style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-around",
//             padding: "12px 40px 16px",
//           }}>
//             <div style={{ width: "52px", height: "52px" }} />

//             <button
//               onClick={capturePhoto}
//               style={{
//                 width: "76px",
//                 height: "76px",
//                 borderRadius: "50%",
//                 background: "#fff",
//                 border: "5px solid rgba(255,255,255,0.4)",
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: "26px",
//                 boxShadow: "0 0 0 2px rgba(255,255,255,0.2), 0 4px 16px rgba(0,0,0,0.4)",
//                 WebkitTapHighlightColor: "transparent",
//                 transition: "transform 0.15s",
//                 flexShrink: 0,
//               }}
//               onTouchStart={e => { e.currentTarget.style.transform = "scale(0.92)"; }}
//               onTouchEnd={e   => { e.currentTarget.style.transform = "scale(1)"; }}
//               aria-label="Capture photo"
//             >
//               📸
//             </button>

//             <div style={{ width: "52px", height: "52px" }} />
//           </div>
//         </div>

//         <style>{`
//           @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.8)} }
//           @keyframes spinRing { to{transform:rotate(360deg)} }
//           div::-webkit-scrollbar { display:none; }
//           * { box-sizing:border-box; }
//         `}</style>
//       </div>
//     );
//   }

//   // ══════════════════════════════════════════════════════════════
//   // ── DESKTOP LAYOUT ─────────────────────────────────────────────
//   // ══════════════════════════════════════════════════════════════
//   return (
//     <div style={{
//       fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
//       background: "radial-gradient(circle at 20% 30%, #0a0a0f, #000000)",
//       color: "#ffffff",
//       minHeight: "100vh",
//       display: "flex",
//       flexDirection: "column",
//       position: "relative",
//       overflowX: "hidden",
//     }}>
//       <div style={{ position:"fixed", inset:0, backgroundImage:`radial-gradient(circle at 25% 40%, rgba(201,168,76,0.08) 0%, transparent 50%)`, pointerEvents:"none", zIndex:0 }} />
//       <div style={{ position:"fixed", top:"-20%", right:"-10%", width:"70vw", height:"70vw", background:"radial-gradient(circle, rgba(201,168,76,0.08), transparent 70%)", borderRadius:"50%", pointerEvents:"none", zIndex:0 }} />
//       <div style={{ position:"fixed", bottom:"-20%", left:"-10%", width:"70vw", height:"70vw", background:"radial-gradient(circle, rgba(100,180,255,0.06), transparent 70%)", borderRadius:"50%", pointerEvents:"none", zIndex:0 }} />

//       <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px 32px", borderBottom:"1px solid rgba(201,168,76,0.2)", backdropFilter:"blur(20px)", background:"rgba(0,0,0,0.4)", zIndex:2, position:"relative" }}>
//         <div style={{ fontFamily:"'Inter', sans-serif", fontSize:"28px", fontWeight:700, letterSpacing:"-0.5px", background:"linear-gradient(135deg, #ffffff 0%, #c9a84c 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
//           VR<span style={{ color:"#c9a84c", background:"none", WebkitTextFillColor:"#c9a84c" }}>.</span>OPTICS
//         </div>
//         <div style={{ fontSize:"11px", letterSpacing:"3px", background:"rgba(201,168,76,0.12)", border:"1px solid rgba(201,168,76,0.4)", padding:"8px 20px", borderRadius:"100px", backdropFilter:"blur(8px)", fontWeight:600, textTransform:"uppercase" }}>
//           {is3D ? "3D MODE" : "LIVE TRY-ON"}
//         </div>
//       </div>

//       <div style={{ display:"flex", flexDirection:"column", gap:"24px", flex:1, padding:"24px 32px 32px 32px", overflowY:"auto", zIndex:2, position:"relative", maxWidth:"1400px", margin:"0 auto", width:"100%" }}>

//         <div style={{ background:"rgba(10,10,15,0.6)", backdropFilter:"blur(24px)", borderRadius:"40px", padding:"16px", border:"1px solid rgba(201,168,76,0.2)", boxShadow:"0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
//           <div style={{ position:"relative", width:"100%", aspectRatio:"4/3", maxWidth:"100%", margin:"0 auto", borderRadius:"32px", overflow:"hidden" }}>
//             {[...Array(4)].map((_, i) => (
//               <div key={i} style={{ position:"absolute", width:"24px", height:"24px", borderColor:"#c9a84c", borderStyle:"solid", zIndex:10, top:i<2?"20px":"auto", bottom:i>=2?"20px":"auto", left:i%2===0?"20px":"auto", right:i%2===1?"20px":"auto", borderWidth:i===0?"2px 0 0 2px":i===1?"2px 2px 0 0":i===2?"0 0 2px 2px":"0 2px 2px 0", opacity:0.6, pointerEvents:"none" }} />
//             ))}
//             <div style={{ position:"absolute", top:"20px", right:"20px", display:"flex", alignItems:"center", gap:"10px", fontSize:"10px", fontWeight:600, letterSpacing:"1.5px", color:"#c9a84c", zIndex:10, background:"rgba(0,0,0,0.7)", padding:"6px 16px", borderRadius:"100px", backdropFilter:"blur(12px)", border:"0.5px solid rgba(201,168,76,0.5)" }}>
//               <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#c9a84c", boxShadow:"0 0 8px #c9a84c", animation:"pulse 1.2s ease-in-out infinite" }} />
//               {is3D ? "3D ACTIVE" : "TRACKING"}
//             </div>
//             <div style={{ position:"absolute", bottom:"20px", left:"20px", display:"flex", gap:"10px", flexWrap:"wrap", zIndex:10 }}>
//               <span style={{ fontSize:"10px", fontWeight:500, background:"rgba(0,0,0,0.7)", backdropFilter:"blur(8px)", border:"0.5px solid rgba(255,255,255,0.1)", padding:"5px 14px", borderRadius:"100px", letterSpacing:"0.3px" }}>💡 {brightness}%</span>
//               <span style={{ fontSize:"10px", fontWeight:500, background:"rgba(0,0,0,0.7)", backdropFilter:"blur(8px)", border:"0.5px solid rgba(255,255,255,0.1)", padding:"5px 14px", borderRadius:"100px" }}>🎨 {contrast}%</span>
//               <span style={{ fontSize:"10px", fontWeight:500, background:"rgba(0,0,0,0.7)", backdropFilter:"blur(8px)", border:"0.5px solid rgba(255,255,255,0.1)", padding:"5px 14px", borderRadius:"100px" }}>🌈 {saturate}%</span>
//               {is3D && <span style={{ fontSize:"10px", color:"#64b4ff", background:"rgba(100,180,255,0.15)", border:"0.5px solid rgba(100,180,255,0.4)", padding:"5px 14px", borderRadius:"100px" }}>✨ 3D MODEL</span>}
//             </div>
//             {glbLoading && (
//               <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", fontSize:"12px", fontWeight:600, letterSpacing:"2px", background:"rgba(0,0,0,0.9)", padding:"10px 24px", borderRadius:"100px", zIndex:20, border:"1px solid #c9a84c", backdropFilter:"blur(12px)" }}>
//                 LOADING 3D...
//               </div>
//             )}
//             {!cameraReady && (
//               <div style={{ position:"absolute", inset:0, borderRadius:"32px", background:"rgba(8,8,12,0.98)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"24px", zIndex:30 }}>
//                 <div style={{ width:"56px", height:"56px", borderRadius:"50%", border:"2px solid rgba(201,168,76,0.2)", borderTop:"2px solid #c9a84c", animation:"spinRing 0.9s linear infinite" }} />
//                 <div style={{ textAlign:"center" }}>
//                   <div style={{ fontSize:"12px", fontWeight:600, letterSpacing:"3px", color:"#c9a84c", marginBottom:"8px" }}>INITIALIZING</div>
//                   <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.4)", letterSpacing:"0.5px" }}>Please allow camera access</div>
//                 </div>
//               </div>
//             )}
//             <video ref={videoRef} style={{ display:"none" }} autoPlay playsInline muted />
//             <canvas ref={canvasRef} width={640} height={480} style={{ display:"block", width:"100%", height:"100%", borderRadius:"32px", objectFit:"cover", boxShadow:"inset 0 0 20px rgba(0,0,0,0.2)" }} />
//             <canvas ref={threeCanvasRef} width={640} height={480} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", opacity:is3D?1:0, borderRadius:"32px" }} />
//           </div>
//         </div>

//         <div style={{ background:"rgba(10,10,15,0.6)", backdropFilter:"blur(24px)", borderRadius:"40px", padding:"28px", display:"flex", flexDirection:"column", gap:"28px", border:"1px solid rgba(201,168,76,0.15)", boxShadow:"0 8px 32px rgba(0,0,0,0.3)" }}>

//           <div>
//             <div style={{ fontSize:"11px", letterSpacing:"3px", color:"#c9a84c", marginBottom:"16px", fontWeight:600, display:"flex", alignItems:"center", gap:"10px" }}>
//               <span style={{ width:"24px", height:"1px", background:"#c9a84c" }}></span>
//               SELECT FRAME
//             </div>
//             <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))", gap:"16px" }}>
//               {GLASS_OPTIONS.map(g => (
//                 <div key={g.id} onClick={() => setGlasses(g.id)} style={{ background:glasses===g.id?(g.is3d?"linear-gradient(135deg,#0f1828,#0a0f1a)":"linear-gradient(135deg,#1e1a10,#14110a)"):"rgba(20,20,28,0.5)", border:`1.5px solid ${glasses===g.id?(g.is3d?"#64b4ff":"#c9a84c"):"rgba(201,168,76,0.15)"}`, borderRadius:"28px", padding:"20px 12px", display:"flex", flexDirection:"column", alignItems:"center", gap:"8px", cursor:"pointer", transition:"all 0.3s cubic-bezier(0.2,0.9,0.4,1.1)", transform:glasses===g.id?"translateY(-2px)":"translateY(0)", boxShadow:glasses===g.id?`0 8px 20px ${g.is3d?"rgba(100,180,255,0.2)":"rgba(201,168,76,0.15)"}`:"none", position:"relative" }}>
//                   {g.is3d && <span style={{ position:"absolute", top:"12px", right:"12px", fontSize:"9px", fontWeight:700, color:"#64b4ff", background:"rgba(100,180,255,0.15)", padding:"3px 10px", borderRadius:"100px", border:"0.5px solid rgba(100,180,255,0.4)" }}>3D</span>}
//                   <div style={{ fontSize:"40px", filter:"drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}>{g.emoji}</div>
//                   <div style={{ fontSize:"14px", fontWeight:600, color:"rgba(255,255,255,0.9)" }}>{g.name}</div>
//                   <div style={{ fontSize:"15px", color:g.is3d?"#64b4ff":"#c9a84c", fontWeight:700 }}>{g.price}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {!is3D && (
//             <div style={{ background:"rgba(0,0,0,0.3)", borderRadius:"28px", padding:"20px", border:"0.5px solid rgba(201,168,76,0.15)" }}>
//               <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"20px", alignItems:"center" }}>
//                 <span style={{ fontSize:"11px", letterSpacing:"3px", color:"#c9a84c", fontWeight:600 }}>⚙️ FRAME ADJUSTMENT</span>
//                 <button onClick={resetAdj} style={{ fontSize:"10px", fontWeight:600, color:"#c9a84c", background:"rgba(201,168,76,0.1)", border:"0.5px solid rgba(201,168,76,0.3)", padding:"5px 16px", borderRadius:"100px", cursor:"pointer", transition:"all 0.2s" }}>RESET</button>
//               </div>
//               {[
//                 { label:"WIDTH",    key:"scaleW",  min:0.3,  max:3,   step:0.05, fmt: v => `${v.toFixed(2)}×` },
//                 { label:"HEIGHT",   key:"scaleH",  min:0.3,  max:3,   step:0.05, fmt: v => `${v.toFixed(2)}×` },
//                 { label:"MOVE L/R", key:"offsetX", min:-150, max:150, step:1,    fmt: v => `${v>0?"+":""}${v}px` },
//                 { label:"MOVE U/D", key:"offsetY", min:-150, max:150, step:1,    fmt: v => `${v>0?"+":""}${v}px` },
//                 { label:"ROTATION", key:"rotate",  min:-30,  max:30,  step:0.5,  fmt: v => `${v>0?"+":""}${v.toFixed(1)}°` },
//               ].map(({ label, key, min, max, step, fmt }) => (
//                 <div key={key} style={{ marginBottom:"18px" }}>
//                   <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"10px" }}>
//                     <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.5)", fontWeight:500 }}>{label}</span>
//                     <span style={{ fontSize:"12px", color:"#c9a84c", fontWeight:600 }}>{fmt(curAdj[key])}</span>
//                   </div>
//                   <input type="range" min={min} max={max} step={step} value={curAdj[key]} onChange={e => setAdj(key, Number(e.target.value))} style={{ width:"100%", height:"4px", background:"rgba(201,168,76,0.2)", borderRadius:"4px" }} />
//                 </div>
//               ))}
//             </div>
//           )}

//           <div>
//             <div style={{ fontSize:"11px", letterSpacing:"3px", color:"#c9a84c", marginBottom:"16px", fontWeight:600, display:"flex", alignItems:"center", gap:"10px" }}>
//               <span style={{ width:"24px", height:"1px", background:"#c9a84c" }}></span>
//               SCENE FILTERS
//             </div>
//             {[
//               { label:"BRIGHTNESS", val:brightness, set:setBrightness, icon:"☀️" },
//               { label:"CONTRAST",   val:contrast,   set:setContrast,   icon:"🎚️" },
//               { label:"SATURATION", val:saturate,   set:setSaturate,   icon:"🎨" },
//             ].map(({ label, val, set, icon }) => (
//               <div key={label} style={{ marginBottom:"18px" }}>
//                 <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"10px" }}>
//                   <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.5)", fontWeight:500 }}>{icon} {label}</span>
//                   <span style={{ fontSize:"12px", color:"#c9a84c", fontWeight:600 }}>{val}%</span>
//                 </div>
//                 <input type="range" min="0" max="200" step="1" value={val} onChange={e => set(Number(e.target.value))} style={{ width:"100%", height:"4px", background:"rgba(201,168,76,0.2)", borderRadius:"4px" }} />
//               </div>
//             ))}
//           </div>

//           <button onClick={capturePhoto} style={{ width:"100%", background:"linear-gradient(135deg,rgba(201,168,76,0.15),rgba(201,168,76,0.05))", border:"1px solid rgba(201,168,76,0.4)", color:"#c9a84c", fontSize:"13px", letterSpacing:"2px", padding:"16px", borderRadius:"100px", cursor:"pointer", fontWeight:700, transition:"all 0.3s ease", backdropFilter:"blur(8px)" }} onMouseEnter={e => { e.currentTarget.style.background="linear-gradient(135deg,rgba(201,168,76,0.25),rgba(201,168,76,0.1))"; e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 8px 20px rgba(201,168,76,0.2)"; }} onMouseLeave={e => { e.currentTarget.style.background="linear-gradient(135deg,rgba(201,168,76,0.15),rgba(201,168,76,0.05))"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
//             📸 CAPTURE LOOK
//           </button>
//         </div>
//       </div>

//       <style>{`
//         @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.8)} }
//         @keyframes spinRing { to{transform:rotate(360deg)} }
//         input[type="range"] { -webkit-appearance:none; background:transparent; }
//         input[type="range"]:focus { outline:none; }
//         input[type="range"]::-webkit-slider-thumb { -webkit-appearance:none; width:18px; height:18px; border-radius:50%; background:#c9a84c; cursor:pointer; border:2px solid #0a0a0f; box-shadow:0 0 8px #c9a84c; transition:all 0.2s ease; }
//         input[type="range"]::-webkit-slider-thumb:hover { transform:scale(1.2); box-shadow:0 0 12px #c9a84c; }
//         input[type="range"]::-moz-range-thumb { width:18px; height:18px; border-radius:50%; background:#c9a84c; cursor:pointer; border:2px solid #0a0a0f; }
//         button { transition:all 0.3s ease; }
//         ::-webkit-scrollbar { width:4px; }
//         ::-webkit-scrollbar-track { background:rgba(20,20,28,0.5); border-radius:4px; }
//         ::-webkit-scrollbar-thumb { background:#c9a84c; border-radius:4px; }
//         * { box-sizing:border-box; }
//       `}</style>
//     </div>
//   );
// };

// export default TryOn;




















































// // abeer ui

// import React, { useRef, useEffect, useState, useCallback } from "react";

// // ── Per-frame default adjustments ─────────────────────────────────
// const DEFAULT_ADJ = { scaleW: 1,   scaleH: 1,    offsetX: 0, offsetY: 8,  rotate: 0 };
// const AVIATOR_ADJ = { scaleW: 1,   scaleH: 1.18, offsetX: 0, offsetY: 18, rotate: 0 };
// const ROUND_ADJ   = { scaleW: 1,   scaleH: 0.85, offsetX: 0, offsetY: 6,  rotate: 0 };

// // ── Full glass catalogue ───────────────────────────────────────────
// const GLASS_OPTIONS = [
//   { id: "/glass1.png",  name: "Classic",      price: "PKR 4,500", emoji: "👓", sizes: [{ label:"XL", scale:1.10, mobileScale:0.65 }] },
//   { id: "/glass2.png",  name: "Aviator",      price: "PKR 5,200", emoji: "🕶️", sizes: [{ label:"L",  scale:1.15, mobileScale:1.00 }] },
//   { id: "/glass3.png",  name: "Sport",        price: "PKR 3,800", emoji: "🥽", sizes: [{ label:"L",  scale:1.15, mobileScale:1.00 }] },
//   { id: "/glass4.png",  name: "Round",        price: "PKR 4,900", emoji: "⭕", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass5.png",  name: "Wayfarer",     price: "PKR 4,900", emoji: "🕶️", sizes: [{ label:"L",  scale:1.25, mobileScale:0.98 }] },
//   { id: "/glass6.png",  name: "Vintage",      price: "PKR 4,900", emoji: "🪩", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass7.png",  name: "Clubmaster",   price: "PKR 4,900", emoji: "🔲", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
//   { id: "/glass8.png",  name: "Cat Eye",      price: "PKR 4,900", emoji: "😼", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
//   { id: "/glass9.png",  name: "Shield",       price: "PKR 4,900", emoji: "🛡️", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass10.png", name: "Oval",         price: "PKR 4,900", emoji: "🥚", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass11.png", name: "Square",       price: "PKR 4,900", emoji: "⬛", sizes: [{ label:"S",  scale:0.75, mobileScale:0.50 }] },
//   { id: "/glass12.png", name: "Hexagonal",    price: "PKR 4,900", emoji: "⬡", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass13.png", name: "Geometric",    price: "PKR 4,900", emoji: "🔷", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass14.png", name: "Steampunk",    price: "PKR 4,900", emoji: "⚙️", sizes: [{ label:"S",  scale:0.95, mobileScale:0.50 }] },
//   { id: "/glass15.png", name: "Sports Pro",   price: "PKR 4,900", emoji: "🏃", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass16.png", name: "Retro",        price: "PKR 4,900", emoji: "🎞️", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass17.png", name: "Modern",       price: "PKR 4,900", emoji: "✨", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass18.png", name: "Luxury",       price: "PKR 4,900", emoji: "💎", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass19.png", name: "Designer",     price: "PKR 4,900", emoji: "🎨", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass20.png", name: "Classic II",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass21.png", name: "Classic III",  price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass22.png", name: "Classic IV",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.05, mobileScale:0.95 }] },
//   { id: "/glass23.png", name: "Classic V",    price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass24.png", name: "Classic VI",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"S",  scale:0.85, mobileScale:0.50 }] },
//   { id: "/glass25.png", name: "Classic VII",  price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass26.png", name: "Classic VIII", price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass27.png", name: "Classic IX",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass28.png", name: "Classic X",    price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass29.png", name: "Classic XI",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.25, mobileScale:0.95 }] },
//   { id: "/glass30.png", name: "Classic XII",  price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass31.png", name: "Classic 31",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass32.png", name: "Classic 32",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass33.png", name: "Classic 33",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass34.png", name: "Classic 34",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass35.png", name: "Classic 35",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.10, mobileScale:0.75 }] },
//   { id: "/glass36.png", name: "Classic 36",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass37.png", name: "Classic 37",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass38.png", name: "Classic 38",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
//   { id: "/glass39.png", name: "Classic 39",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass40.png", name: "Classic 40",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass41.png", name: "Classic 41",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass42.png", name: "Classic 42",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"S",  scale:0.95, mobileScale:0.50 }] },
//   { id: "/glass43.png", name: "Classic 43",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass44.png", name: "Classic 44",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass45.png", name: "Classic 45",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
//   { id: "/glass46.png", name: "Classic 46",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.40, mobileScale:1.10 }] },
//   { id: "/glass47.png", name: "Classic 47",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.20, mobileScale:1.10 }] },
//   { id: "/glass48.png", name: "Classic 48",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass49.png", name: "Classic 49",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
// ];

// // ── Device detection ──────────────────────────────────────────────
// const isMobile = typeof window !== "undefined" &&
//   (window.innerWidth < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

// const getSizeScale = (sizeObj) => {
//   if (!sizeObj) return 1;
//   return isMobile ? (sizeObj.mobileScale ?? sizeObj.scale) : sizeObj.scale;
// };

// // ── Constants ─────────────────────────────────────────────────────
// const BASE_EYE_SPAN      = 120;
// const BASE_GLASSES_WIDTH = BASE_EYE_SPAN * 1.7;
// const MOBILE_EMA_ALPHA   = 0.25;
// const MOBILE_DEADZONE    = 1.5;
// const MOBILE_LERP        = 0.2;
// const MOBILE_FPS         = 30;
// const MOBILE_FRAME_INT   = 1000 / MOBILE_FPS;
// const PHONE_CANVAS_W     = 340;
// const PHONE_CANVAS_H     = 680;
// const DESKTOP_CANVAS_W   = 640;
// const DESKTOP_CANVAS_H   = 480;

// const lerp = (a, b, t) => a + (b - a) * t;

// // ── Full landmark set ─────────────────────────────────────────────
// const LANDMARKS = {
//   LEFT_IRIS_CENTER:       468,
//   RIGHT_IRIS_CENTER:      473,
//   LEFT_EYE_INNER:         133,
//   LEFT_EYE_OUTER:          33,
//   RIGHT_EYE_INNER:        362,
//   RIGHT_EYE_OUTER:        263,
//   LEFT_EYEBROW_LOWER:     [70, 63, 105, 66, 107],
//   RIGHT_EYEBROW_LOWER:    [300, 293, 334, 296, 336],
//   LEFT_EYEBROW_UPPER:     [46, 53, 52, 65, 55],
//   RIGHT_EYEBROW_UPPER:    [276, 283, 282, 295, 285],
//   NOSE_BRIDGE_TOP:        6,
//   NOSE_BRIDGE_MID:        168,
//   NOSE_BRIDGE_LOW:        197,
//   NOSE_TIP:               5,
//   NOSE_LEFT_PAD:          124,
//   NOSE_RIGHT_PAD:         353,
//   FACE_LEFT:              234,
//   FACE_RIGHT:             454,
//   CHEEK_LEFT:             116,
//   CHEEK_RIGHT:            345,
//   FOREHEAD_CENTER:        10,
//   CHIN:                   152,
//   UNDER_EYE_LEFT:         145,
//   UNDER_EYE_RIGHT:        374,
//   TEMPLE_LEFT:            127,
//   TEMPLE_RIGHT:           356,
//   LEFT_UPPER_LID:         159,
//   RIGHT_UPPER_LID:        386,
//   LEFT_LOWER_LID:         145,
//   RIGHT_LOWER_LID:        374,
// };

// // ── EMA Smoother ──────────────────────────────────────────────────
// class LandmarkSmoother {
//   constructor(alpha = 0.45) { this.alpha = alpha; this.prev = null; }
//   smooth(current, deadzone = 0) {
//     if (!this.prev) { this.prev = { ...current }; return current; }
//     const result = {};
//     for (const key of Object.keys(current)) {
//       const delta = current[key] - this.prev[key];
//       result[key] = (deadzone > 0 && Math.abs(delta) < deadzone)
//         ? this.prev[key]
//         : this.prev[key] + this.alpha * delta;
//     }
//     this.prev = { ...result };
//     return result;
//   }
//   reset() { this.prev = null; }
// }

// // ── Face geometry extraction ──────────────────────────────────────
// function extractFaceGeometry(lm, W, H) {
//   const px = (idx) => ({ x: lm[idx].x * W, y: lm[idx].y * H, z: lm[idx].z });
//   const avgPx = (indices) => {
//     const pts = indices.map(i => px(i));
//     return {
//       x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
//       y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
//       z: pts.reduce((s, p) => s + p.z, 0) / pts.length,
//     };
//   };
//   const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

//   const leftIris       = px(LANDMARKS.LEFT_IRIS_CENTER);
//   const rightIris      = px(LANDMARKS.RIGHT_IRIS_CENTER);
//   const leftEyeOut     = px(LANDMARKS.LEFT_EYE_OUTER);
//   const rightEyeOut    = px(LANDMARKS.RIGHT_EYE_OUTER);
//   const leftBrowLower  = avgPx(LANDMARKS.LEFT_EYEBROW_LOWER);
//   const rightBrowLower = avgPx(LANDMARKS.RIGHT_EYEBROW_LOWER);
//   const noseBridgeTop  = px(LANDMARKS.NOSE_BRIDGE_TOP);

//   const browMidLower = {
//     x: (leftBrowLower.x + rightBrowLower.x) / 2,
//     y: (leftBrowLower.y + rightBrowLower.y) / 2,
//   };

//   const eyeSpan       = dist(leftEyeOut, rightEyeOut);
//   const leftBrowGap   = dist(leftBrowLower, leftIris);
//   const rightBrowGap  = dist(rightBrowLower, rightIris);
//   const avgBrowEyeGap = (leftBrowGap + rightBrowGap) / 2;

//   const angleIris       = Math.atan2(rightIris.y - leftIris.y, rightIris.x - leftIris.x);
//   const angleEyeCorners = Math.atan2(rightEyeOut.y - leftEyeOut.y, rightEyeOut.x - leftEyeOut.x);
//   const angleBrow       = Math.atan2(rightBrowLower.y - leftBrowLower.y, rightBrowLower.x - leftBrowLower.x);
//   const angle = angleEyeCorners * 0.5 + angleBrow * 0.3 + angleIris * 0.2;

//   const centerX = (leftIris.x + rightIris.x) / 2;
//   const centerY = browMidLower.y * 0.35 + noseBridgeTop.y * 0.45 + ((leftIris.y + rightIris.y) / 2) * 0.20;

//   let glassesWidth;
//   if (isMobile) {
//     const normalizedScale = Math.max(0.9, Math.min(1.1, eyeSpan / BASE_EYE_SPAN));
//     glassesWidth = BASE_GLASSES_WIDTH * normalizedScale;
//   } else {
//     glassesWidth = eyeSpan * 1.7;
//   }

//   const glassesHeight = avgBrowEyeGap * 3.3;
//   const avgZ       = (leftIris.z + rightIris.z + noseBridgeTop.z) / 3;
//   const depthScale = 1 + (-avgZ * 0.8);

//   return { centerX, centerY, angle, glassesWidth, glassesHeight, depthScale };
// }

// // ── Color tokens ──────────────────────────────────────────────────
// const C = {
//   orange:       "#E87F24",
//   yellow:       "#FFC81E",
//   cream:        "#FEFDDF",
//   blue:         "#73A5CA",
//   dark:         "#0d0805",
//   orangeBorder: "rgba(232,127,36,0.28)",
//   orange30:     "rgba(232,127,36,0.30)",
//   orange20:     "rgba(232,127,36,0.20)",
//   orange12:     "rgba(232,127,36,0.12)",
//   orange08:     "rgba(232,127,36,0.08)",
//   orange04:     "rgba(232,127,36,0.04)",
//   cream80:      "rgba(254,253,223,0.80)",
//   cream50:      "rgba(254,253,223,0.50)",
//   cream30:      "rgba(254,253,223,0.30)",
//   cream15:      "rgba(254,253,223,0.15)",
//   blue30:       "rgba(115,165,202,0.30)",
//   blue15:       "rgba(115,165,202,0.15)",
//   blue08:       "rgba(115,165,202,0.08)",
//   black70:      "rgba(0,0,0,0.70)",
//   black55:      "rgba(0,0,0,0.55)",
//   black25:      "rgba(0,0,0,0.25)",
//   white15:      "rgba(255,255,255,0.15)",
//   white08:      "rgba(255,255,255,0.08)",
//   white04:      "rgba(255,255,255,0.04)",
//   yellow15:     "rgba(255,200,30,0.15)",
//   gradOY:       "linear-gradient(135deg, #E87F24, #FFC81E)",
//   gradOYtext:   "linear-gradient(135deg, #FFC81E, #E87F24)",
//   gradHeader:   "linear-gradient(135deg, #FEFDDF 30%, #E87F24 100%)",
// };

// const pill = {
//   borderRadius: 100,
//   backdropFilter: "blur(10px)",
//   WebkitBackdropFilter: "blur(10px)",
// };

// // ── Section accordion ─────────────────────────────────────────────
// const Section = ({ title, icon, defaultOpen = false, children }) => {
//   const [open, setOpen] = useState(defaultOpen);
//   return (
//     <div style={{ borderRadius:16, border:`1px solid ${C.orangeBorder}`, overflow:"hidden", background:C.orange04 }}>
//       <button onClick={() => setOpen(o => !o)} style={{
//         width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
//         padding:"13px 18px", background:C.orange08, border:"none", cursor:"pointer",
//       }}>
//         <span style={{ display:"flex", alignItems:"center", gap:8, fontSize:10, fontWeight:700, letterSpacing:"2.5px", color:C.orange }}>
//           <span style={{ fontSize:13 }}>{icon}</span>{title}
//         </span>
//         <span style={{ fontSize:9, color:C.yellow, transform:open?"rotate(180deg)":"rotate(0)", transition:"transform 0.22s ease", display:"inline-block" }}>▼</span>
//       </button>
//       {open && <div style={{ padding:"16px 18px", background:C.black25 }}>{children}</div>}
//     </div>
//   );
// };

// // ── Slider row ────────────────────────────────────────────────────
// const SliderRow = ({ label, value, min, max, step, onChange, fmt }) => (
//   <div style={{ marginBottom:18 }}>
//     <div style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}>
//       <span style={{ fontSize:10, color:C.cream50, fontWeight:600, letterSpacing:"1px" }}>{label}</span>
//       <span style={{ fontSize:11, fontWeight:700, background:C.gradOYtext, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{fmt(value)}</span>
//     </div>
//     <input
//       type="range"
//       id={`slider-${label.toLowerCase().replace(/\s+/g,"-")}`}
//       name={`slider-${label.toLowerCase().replace(/\s+/g,"-")}`}
//       min={min} max={max} step={step} value={value}
//       onChange={e => onChange(Number(e.target.value))}
//       style={{ width:"100%", height:3, background:C.orange20, borderRadius:4, appearance:"none", WebkitAppearance:"none", cursor:"pointer" }}
//     />
//   </div>
// );

// // ─────────────────────────────────────────────────────────────────
// // MAIN COMPONENT
// // ─────────────────────────────────────────────────────────────────
// const TryOn = () => {
//   const videoRef     = useRef(null);
//   const canvasRef    = useRef(null);
//   const imgRef       = useRef(new Image());
//   const prevPosRef   = useRef(null);
//   const lastFrameRef = useRef(0);
//   const touchStartX  = useRef(null);
//   const touchStartY  = useRef(null);
//   const cameraRdyRef = useRef(false);
//   const glassesRef   = useRef("/glass1.png");
//   const adjRef       = useRef({});
//   const smootherRef  = useRef(new LandmarkSmoother(isMobile ? MOBILE_EMA_ALPHA : 0.45));

//   const [glasses, setGlasses]         = useState("/glass1.png");
//   const [cameraReady, setCameraReady] = useState(false);
//   const [swipeDir, setSwipeDir]       = useState(null);
//   const [brightness, setBrightness]   = useState(100);
//   const [contrast, setContrast]       = useState(100);
//   const [saturate, setSaturate]       = useState(100);
//   const [mpError, setMpError]         = useState(null);

//   const brightnessRef = useRef(100);
//   const contrastRef   = useRef(100);
//   const saturateRef   = useRef(100);
//   useEffect(() => { brightnessRef.current = brightness; }, [brightness]);
//   useEffect(() => { contrastRef.current   = contrast;   }, [contrast]);
//   useEffect(() => { saturateRef.current   = saturate;   }, [saturate]);

//   const [adjustments, setAdjustments] = useState(() =>
//     Object.fromEntries(GLASS_OPTIONS.map(g => {
//       if (g.id === "/glass2.png") return [g.id, { ...AVIATOR_ADJ }];
//       if (g.id === "/glass4.png") return [g.id, { ...ROUND_ADJ }];
//       return [g.id, { ...DEFAULT_ADJ }];
//     }))
//   );

//   useEffect(() => { glassesRef.current = glasses; }, [glasses]);
//   useEffect(() => { adjRef.current     = adjustments; }, [adjustments]);

//   const currentGlass = GLASS_OPTIONS.find(g => g.id === glasses);
//   const curAdj       = adjustments[glasses] || DEFAULT_ADJ;

//   const setAdj = (key, val) =>
//     setAdjustments(prev => ({ ...prev, [glasses]: { ...(prev[glasses] || DEFAULT_ADJ), [key]: val } }));
//   const resetAdj = () =>
//     setAdjustments(prev => ({ ...prev, [glasses]:
//       glasses === "/glass2.png" ? { ...AVIATOR_ADJ } :
//       glasses === "/glass4.png" ? { ...ROUND_ADJ }   : { ...DEFAULT_ADJ }
//     }));

//   // ── Glass image loader ────────────────────────────────────────
//   useEffect(() => {
//     imgRef.current.crossOrigin = "Anonymous";
//     imgRef.current.src = glasses;
//   }, [glasses]);

//   // ── Swipe helper ──────────────────────────────────────────────
//   const changeFrame = useCallback((dir) => {
//     const idx = GLASS_OPTIONS.findIndex(g => g.id === glassesRef.current);
//     setSwipeDir(dir);
//     setTimeout(() => setSwipeDir(null), 300);
//     if (dir === "left"  && idx < GLASS_OPTIONS.length - 1) setGlasses(GLASS_OPTIONS[idx + 1].id);
//     if (dir === "right" && idx > 0)                        setGlasses(GLASS_OPTIONS[idx - 1].id);
//   }, []);

//   // ── onResults handler ─────────────────────────────────────────
//   function onResults(results) {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     const W = canvas.width, H = canvas.height;

//     ctx.clearRect(0, 0, W, H);
//     ctx.filter = `brightness(${brightnessRef.current}%) contrast(${contrastRef.current}%) saturate(${saturateRef.current}%)`;
//     ctx.drawImage(results.image, 0, 0, W, H);
//     ctx.filter = "none";

//     if (!results.multiFaceLandmarks?.length) {
//       smootherRef.current.reset(); prevPosRef.current = null; return;
//     }

//     const lm  = results.multiFaceLandmarks[0];
//     const geo = extractFaceGeometry(lm, W, H);

//     const sm = smootherRef.current.smooth(
//       { cx: geo.centerX, cy: geo.centerY, gw: geo.glassesWidth, gh: geo.glassesHeight, angle: geo.angle, ds: geo.depthScale },
//       isMobile ? MOBILE_DEADZONE : 0
//     );

//     if (isMobile && prevPosRef.current) {
//       sm.cx = lerp(prevPosRef.current.cx, sm.cx, MOBILE_LERP);
//       sm.cy = lerp(prevPosRef.current.cy, sm.cy, MOBILE_LERP);
//     }
//     prevPosRef.current = { cx: sm.cx, cy: sm.cy };

//     const img = imgRef.current;
//     if (!img.complete || !img.src) return;

//     const glassObj = GLASS_OPTIONS.find(g => g.id === glassesRef.current);
//     const sSc      = glassObj?.sizes?.[0] ? getSizeScale(glassObj.sizes[0]) : 1.0;
//     const adj      = adjRef.current[glassesRef.current] || DEFAULT_ADJ;

//     let w = isMobile ? sm.gw * adj.scaleW : sm.gw * adj.scaleW * sm.ds;
//     let h = isMobile ? sm.gh * adj.scaleH : sm.gh * adj.scaleH * sm.ds;
//     w *= sSc; h *= sSc;

//     ctx.save();
//     ctx.translate(sm.cx + adj.offsetX, sm.cy + adj.offsetY);
//     ctx.rotate(sm.angle + adj.rotate * Math.PI / 180);
//     ctx.drawImage(img, -w / 2, -h / 2, w, h);
//     ctx.restore();
//   }

//   // ── MediaPipe: direct initialization (no dynamic script loading) ─
//   // NOTE: Make sure your index.html includes these two <script> tags BEFORE this component loads:
//   //   <script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3/camera_utils.js" crossorigin="anonymous"></script>
//   //   <script src="https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/face_mesh.js" crossorigin="anonymous"></script>
//   useEffect(() => {
//     if (!window.FaceMesh || !window.Camera) {
//       setMpError("MediaPipe globals not found. Add the two MediaPipe <script> tags to index.html.");
//       return;
//     }

//     const faceMesh = new window.FaceMesh({
//       locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/${file}`,
//     });

//     faceMesh.setOptions({
//       maxNumFaces: 1,
//       refineLandmarks: true,
//       minDetectionConfidence: 0.5,
//       minTrackingConfidence: 0.5,
//     });

//     faceMesh.onResults(onResults);

//     const cam = new window.Camera(videoRef.current, {
//       onFrame: async () => {
//         if (!cameraRdyRef.current) {
//           cameraRdyRef.current = true;
//           setCameraReady(true);
//         }
//         if (isMobile) {
//           const now = performance.now();
//           if (now - lastFrameRef.current < MOBILE_FRAME_INT) return;
//           lastFrameRef.current = now;
//         }
//         await faceMesh.send({ image: videoRef.current });
//       },
//       width:  isMobile ? PHONE_CANVAS_W  : DESKTOP_CANVAS_W,
//       height: isMobile ? PHONE_CANVAS_H  : DESKTOP_CANVAS_H,
//     });

//     cam.start();

//     return () => {
//       faceMesh.close();
//     };
//   }, []);

//   // ── Global CSS ────────────────────────────────────────────────
//   const css = `
//     @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');
//     *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

//     input[type="range"] { -webkit-appearance:none; appearance:none; background:transparent; }
//     input[type="range"]::-webkit-slider-runnable-track { background:linear-gradient(90deg,${C.orange20},${C.yellow15}); height:3px; border-radius:3px; }
//     input[type="range"]::-webkit-slider-thumb {
//       -webkit-appearance:none; width:15px; height:15px; border-radius:50%;
//       background:radial-gradient(circle at 35% 35%,${C.yellow},${C.orange});
//       cursor:pointer; margin-top:-6px; border:1.5px solid ${C.dark};
//       box-shadow:0 0 10px ${C.orange}99;
//     }
//     input[type="range"]::-moz-range-thumb {
//       width:15px; height:15px; border-radius:50%;
//       background:radial-gradient(circle at 35% 35%,${C.yellow},${C.orange});
//       cursor:pointer; border:1.5px solid ${C.dark};
//     }

//     .right-panel { scrollbar-width:thin; scrollbar-color:${C.orange} ${C.orange08}; }
//     ::-webkit-scrollbar { width:5px; height:5px; }
//     ::-webkit-scrollbar-track { background:${C.orange08}; border-radius:5px; }
//     ::-webkit-scrollbar-thumb { background:linear-gradient(180deg,${C.orange},${C.yellow}); border-radius:5px; }
//     ::-webkit-scrollbar-thumb:hover { background:${C.yellow}; }

//     .frame-scroller { scroll-behavior:smooth; -webkit-overflow-scrolling:touch; scrollbar-width:none; -ms-overflow-style:none; }
//     .frame-scroller::-webkit-scrollbar { display:none; }

//     .frame-card { transition:transform 0.22s cubic-bezier(0.2,0.9,0.4,1.1), box-shadow 0.22s ease; -webkit-tap-highlight-color:transparent; }
//     .frame-card:hover { transform:translateY(-3px) scale(1.03); }

//     @keyframes spin      { to { transform:rotate(360deg); } }
//     @keyframes fadeIn    { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
//     @keyframes pulse     { 0%,100%{opacity:0.6} 50%{opacity:1} }
//     @keyframes swipeL    { 0%{transform:translateX(0);opacity:1} 100%{transform:translateX(-14px);opacity:0} }
//     @keyframes swipeR    { 0%{transform:translateX(0);opacity:1} 100%{transform:translateX(14px);opacity:0} }
//     @keyframes facePulse { 0%,100%{opacity:0.35} 50%{opacity:0.65} }

//     .spinner       { width:44px;height:44px;border-radius:50%;border:2px solid ${C.blue15};border-top-color:${C.orange};animation:spin 0.85s linear infinite; }
//     .spinner-inner { width:30px;height:30px;border-radius:50%;border:1.5px solid ${C.yellow15};border-bottom-color:${C.yellow};animation:spin 1.2s linear infinite reverse;position:absolute;top:7px;left:7px; }
//     .ar-badge      { animation:pulse 2.5s ease-in-out infinite; }
//     .face-guide    { animation:facePulse 2s ease-in-out infinite; }
//     .swipe-left    { animation:swipeL 0.3s ease forwards; }
//     .swipe-right   { animation:swipeR 0.3s ease forwards; }
//   `;

//   // ── Error banner ──────────────────────────────────────────────
//   const ErrorBanner = () => mpError ? (
//     <div style={{
//       position:"fixed", top:0, left:0, right:0, zIndex:999,
//       background:"#7f1d1d", color:"#fecaca", padding:"10px 20px",
//       fontSize:12, fontWeight:600, textAlign:"center",
//     }}>
//       ⚠️ MediaPipe load failed: {mpError}. Add the two MediaPipe &lt;script&gt; tags to index.html.
//     </div>
//   ) : null;

//   // ══════════════════════════════════════════════════════════════
//   // MOBILE LAYOUT
//   // ══════════════════════════════════════════════════════════════
//   if (isMobile) {
//     const idx = GLASS_OPTIONS.findIndex(g => g.id === glasses);

//     const onTouchStart = (e) => {
//       touchStartX.current = e.touches[0].clientX;
//       touchStartY.current = e.touches[0].clientY;
//     };
//     const onTouchEnd = (e) => {
//       if (touchStartX.current === null) return;
//       const dx = e.changedTouches[0].clientX - touchStartX.current;
//       const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
//       if (Math.abs(dx) > 50 && Math.abs(dx) > dy) changeFrame(dx < 0 ? "left" : "right");
//       touchStartX.current = null; touchStartY.current = null;
//     };

//     return (
//       <div style={{
//         display:"flex", justifyContent:"center", alignItems:"center",
//         height:"100vh", background:"#0f0804",
//         fontFamily:"'DM Sans',sans-serif", color:C.cream,
//       }}>
//         <style>{css}</style>
//         <ErrorBanner />
//         <video ref={videoRef} style={{ display:"none" }} autoPlay playsInline muted />

//         <div
//           onTouchStart={onTouchStart}
//           onTouchEnd={onTouchEnd}
//           style={{
//             width:340, height:680,
//             borderRadius:40, overflow:"hidden",
//             border:"8px solid #1c1c1e",
//             position:"relative",
//             boxShadow:`0 0 0 1px #2a2a2a, 0 40px 80px rgba(0,0,0,0.8), 0 0 60px ${C.orange}18, inset 0 1px 0 rgba(255,255,255,0.08)`,
//             background:"#000",
//             userSelect:"none",
//             touchAction:"pan-y",
//           }}
//         >
//           <canvas
//             ref={canvasRef}
//             width={PHONE_CANVAS_W}
//             height={PHONE_CANVAS_H}
//             className={swipeDir === "left" ? "swipe-left" : swipeDir === "right" ? "swipe-right" : ""}
//             style={{ display:"block", width:"100%", height:"100%", objectFit:"cover" }}
//           />

//           <div style={{
//             position:"absolute", inset:0, pointerEvents:"none",
//             background:`linear-gradient(to bottom, rgba(15,8,4,0.68) 0%, rgba(15,8,4,0.08) 20%, transparent 35%, transparent 58%, rgba(15,8,4,0.28) 72%, rgba(15,8,4,0.94) 100%)`,
//           }} />

//           {cameraReady && (
//             <div className="face-guide" style={{
//               position:"absolute", top:"18%", left:"50%", transform:"translateX(-50%)",
//               width:140, height:180, borderRadius:"50%",
//               border:`2px dashed ${C.orange}`, opacity:0.5, pointerEvents:"none",
//             }} />
//           )}

//           {[
//             { style:{top:14,left:14},    path:"M0,20 L0,0 L20,0",   color:C.orange },
//             { style:{top:14,right:14},   path:"M0,0 L20,0 L20,20",  color:C.yellow },
//             { style:{bottom:14,left:14}, path:"M0,0 L0,20 L20,20",  color:C.yellow },
//             { style:{bottom:14,right:14},path:"M20,0 L20,20 L0,20", color:C.orange },
//           ].map((c, i) => (
//             <div key={i} style={{ position:"absolute", width:24, height:24, ...c.style, zIndex:5, pointerEvents:"none" }}>
//               <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
//                 <path d={c.path} stroke={c.color} strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
//               </svg>
//             </div>
//           ))}

//           <div style={{
//             position:"absolute", top:0, left:0, right:0, zIndex:20,
//             padding:"14px 18px 12px",
//             display:"flex", alignItems:"center", justifyContent:"space-between",
//           }}>
//             <div>
//               <div style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:800, letterSpacing:-0.5, lineHeight:1 }}>
//                 <span style={{ background:C.gradHeader, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>VR</span>
//                 <span style={{ color:C.yellow, margin:"0 1px" }}>.</span>
//                 <span style={{ background:C.gradHeader, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>OPTICS</span>
//               </div>
//               <div style={{ fontSize:7, fontWeight:600, letterSpacing:"1.5px", color:C.cream30, marginTop:2 }}>VIRTUAL TRY-ON BY ASW</div>
//             </div>
//             <div className="ar-badge" style={{
//               ...pill, fontSize:8, fontWeight:700, letterSpacing:"1.5px",
//               color:C.blue, background:C.blue08, border:`0.5px solid ${C.blue30}`, padding:"4px 10px",
//             }}>AR TRY-ON</div>
//           </div>

//           {cameraReady && currentGlass && (
//             <div style={{
//               position:"absolute", bottom:110, left:"50%", transform:"translateX(-50%)",
//               zIndex:20, whiteSpace:"nowrap",
//               background:C.black55, ...pill,
//               border:`1px solid ${C.orangeBorder}`,
//               padding:"5px 16px",
//               boxShadow:`0 0 20px ${C.orange}22`,
//               display:"flex", alignItems:"center", gap:8,
//               animation:"fadeIn 0.3s ease",
//             }}>
//               <span style={{ fontSize:11, fontWeight:700, color:C.cream }}>{currentGlass.name}</span>
//               <span style={{ width:1, height:10, background:C.orange30, display:"inline-block" }} />
//               <span style={{ fontSize:11, fontWeight:700, background:C.gradOY, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//                 {currentGlass.price}
//               </span>
//             </div>
//           )}

//           {cameraReady && (
//             <div style={{
//               position:"absolute", bottom:92, left:"50%", transform:"translateX(-50%)",
//               display:"flex", gap:4, zIndex:20, maxWidth:280, flexWrap:"wrap", justifyContent:"center",
//             }}>
//               {GLASS_OPTIONS.map((g, i) => (
//                 <div key={g.id} style={{
//                   width: i === idx ? 12 : 4, height:4, borderRadius:3,
//                   background: i === idx ? C.orange : C.white15,
//                   transition:"all 0.25s ease",
//                 }} />
//               ))}
//             </div>
//           )}

//           <div style={{ position:"absolute", bottom:0, left:0, right:0, zIndex:20, padding:"8px 0 12px" }}>
//             <div style={{ display:"flex", justifyContent:"space-between", padding:"0 14px 6px" }}>
//               <span style={{ fontSize:8, fontWeight:700, letterSpacing:"2px", color:C.cream30 }}>FRAMES</span>
//               <span style={{ fontSize:8, color:C.cream30 }}>{idx + 1} / {GLASS_OPTIONS.length}</span>
//             </div>
//             <div className="frame-scroller" style={{
//               display:"flex", gap:8, padding:"2px 12px 2px", overflowX:"auto", scrollSnapType:"x mandatory",
//             }}>
//               {GLASS_OPTIONS.map(g => {
//                 const isA = glasses === g.id;
//                 return (
//                   <div key={g.id} className="frame-card" onClick={() => setGlasses(g.id)} style={{
//                     flexShrink:0, scrollSnapAlign:"start",
//                     width:56, height:56, borderRadius:13,
//                     background: isA ? C.orange12 : "rgba(13,8,5,0.70)",
//                     border:`1.5px solid ${isA ? C.orange : C.white15}`,
//                     display:"flex", alignItems:"center", justifyContent:"center",
//                     cursor:"pointer", overflow:"hidden", padding:5,
//                     transform: isA ? "scale(1.1)" : "scale(1)",
//                     backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)",
//                     boxShadow: isA ? `0 0 16px ${C.orange}55, 0 0 30px ${C.yellow}18` : "none",
//                     position:"relative",
//                   }}>
//                     {isA && (
//                       <div style={{
//                         position:"absolute", bottom:3, left:"50%", transform:"translateX(-50%)",
//                         width:4, height:4, borderRadius:"50%",
//                         background:C.yellow, boxShadow:`0 0 5px ${C.yellow}`,
//                       }} />
//                     )}
//                     <img src={g.id} alt={g.name} style={{
//                       width:"100%", height:"80%", objectFit:"contain",
//                       filter: isA ? `drop-shadow(0 0 4px ${C.orange}80)` : "brightness(0.6) saturate(0.7)",
//                       transition:"filter 0.2s ease",
//                     }} />
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {!cameraReady && (
//             <div style={{
//               position:"absolute", inset:0, zIndex:50,
//               background:`radial-gradient(ellipse 120% 80% at 55% 30%, rgba(232,127,36,0.08) 0%, rgba(10,5,2,0.99) 60%)`,
//               display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:24,
//             }}>
//               <div style={{ position:"relative", width:44, height:44 }}>
//                 <div className="spinner" /><div className="spinner-inner" />
//               </div>
//               <div style={{ textAlign:"center" }}>
//                 <div style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:800, marginBottom:6 }}>
//                   <span style={{ background:C.gradHeader, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>VR.OPTICS</span>
//                 </div>
//                 <div style={{ fontSize:9, fontWeight:700, letterSpacing:"3px", color:C.orange, marginBottom:8 }}>INITIALIZING</div>
//                 <div style={{ fontSize:10, color:C.cream30 }}>Allow camera access to continue</div>
//               </div>
//               <div style={{ fontSize:9, color:C.cream15, border:`0.5px solid ${C.white08}`, borderRadius:100, padding:"4px 14px" }}>
//                 ← Swipe to browse frames →
//               </div>
//             </div>
//           )}
//         </div>

//         <div style={{
//           position:"absolute", right:20, top:"50%", transform:"translateY(-50%)",
//           display:"flex", flexDirection:"column", gap:12,
//         }}>
//           {[
//             { icon:"←→", label:"Swipe",  action: () => changeFrame("left") },
//             { icon:"🔀",  label:"Random", action: () => { const r = Math.floor(Math.random() * GLASS_OPTIONS.length); setGlasses(GLASS_OPTIONS[r].id); } },
//           ].map((b, i) => (
//             <button key={i} onClick={b.action} style={{
//               background:"rgba(20,12,5,0.85)", border:`1px solid ${C.orangeBorder}`,
//               borderRadius:12, padding:"10px 12px", cursor:"pointer",
//               color:C.cream, fontSize:10, fontWeight:700, letterSpacing:"1px",
//               backdropFilter:"blur(12px)",
//               display:"flex", flexDirection:"column", alignItems:"center", gap:4,
//               transition:"all 0.2s ease",
//             }}>
//               <span style={{ fontSize:16 }}>{b.icon}</span>
//               <span style={{ color:C.orange }}>{b.label}</span>
//             </button>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // ══════════════════════════════════════════════════════════════
//   // DESKTOP LAYOUT
//   // ══════════════════════════════════════════════════════════════
//   return (
//     <div style={{
//       fontFamily:"'DM Sans',sans-serif",
//       background:`
//         radial-gradient(ellipse 90% 55% at 78% 8%,  rgba(232,127,36,0.18) 0%, transparent 55%),
//         radial-gradient(ellipse 70% 45% at 15% 85%, rgba(115,165,202,0.13) 0%, transparent 55%),
//         radial-gradient(ellipse 55% 65% at 48% 55%, rgba(255,200,30,0.05)  0%, transparent 65%),
//         radial-gradient(ellipse 120% 120% at 50% 50%, #110a04 0%, #0a0703 100%)
//       `,
//       color:C.cream, height:"100vh", display:"flex", flexDirection:"column", overflow:"hidden",
//     }}>
//       <style>{css}</style>
//       <ErrorBanner />

//       <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
//         <div style={{ position:"absolute", top:"-20%", right:"-10%", width:"60vw", height:"60vw",
//           background:`radial-gradient(circle, rgba(232,127,36,0.22) 0%, rgba(232,127,36,0.06) 45%, transparent 70%)`, borderRadius:"50%" }} />
//         <div style={{ position:"absolute", top:"5%", right:"22%", width:"22vw", height:"22vw",
//           background:`radial-gradient(circle, rgba(255,200,30,0.10) 0%, transparent 65%)`, borderRadius:"50%" }} />
//         <div style={{ position:"absolute", bottom:"-25%", left:"-14%", width:"55vw", height:"55vw",
//           background:`radial-gradient(circle, rgba(115,165,202,0.14) 0%, rgba(115,165,202,0.04) 45%, transparent 70%)`, borderRadius:"50%" }} />
//         <div style={{ position:"absolute", bottom:0, left:0, right:0, height:1,
//           background:`linear-gradient(90deg, transparent 0%, rgba(232,127,36,0.35) 40%, rgba(255,200,30,0.35) 60%, transparent 100%)` }} />
//       </div>

//       <header style={{
//         position:"relative", zIndex:10,
//         display:"flex", alignItems:"center", justifyContent:"space-between",
//         padding:"0 32px", height:62,
//         borderBottom:`1px solid ${C.orangeBorder}`,
//         backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)",
//         background:"linear-gradient(90deg, rgba(17,10,4,0.88) 0%, rgba(20,12,5,0.82) 100%)", flexShrink:0,
//       }}>
//         <div>
//           <div style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800, letterSpacing:-0.5 }}>
//             <span style={{ background:C.gradHeader, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>VR</span>
//             <span style={{ color:C.yellow, margin:"0 1px" }}>.</span>
//             <span style={{ background:C.gradHeader, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>OPTICS</span>
//           </div>
//           <div style={{ fontSize:9, fontWeight:600, letterSpacing:"2px", color:C.cream30, marginTop:1 }}>VIRTUAL TRY-ON BY ASW</div>
//         </div>
//         <div style={{ display:"flex", alignItems:"center", gap:16 }}>
//           <span style={{ fontSize:11, color:C.cream50, letterSpacing:"0.5px" }}>Virtual Try-On Studio</span>
//           <div className="ar-badge" style={{
//             ...pill, fontSize:9, fontWeight:700, letterSpacing:"1.5px",
//             color:C.blue, background:C.blue08, border:`0.5px solid ${C.blue30}`, padding:"5px 12px",
//           }}>AR LIVE</div>
//         </div>
//       </header>

//       <div style={{ display:"grid", gridTemplateColumns:"3fr 2fr", flex:1, overflow:"hidden", position:"relative", zIndex:1 }}>
//         <div style={{ padding:22, display:"flex", flexDirection:"column", overflow:"hidden" }}>
//           <div style={{
//             flex:1, position:"relative", borderRadius:24, overflow:"hidden",
//             border:`1px solid ${C.orangeBorder}`, background:"#000",
//             boxShadow:`inset 0 0 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,200,30,0.08)`,
//           }}>
//             {[
//               { top:14,   left:14,   borderWidth:"2px 0 0 2px", borderRadius:"5px 0 0 0", borderColor:C.orange },
//               { top:14,   right:14,  borderWidth:"2px 2px 0 0", borderRadius:"0 5px 0 0", borderColor:C.yellow },
//               { bottom:14,left:14,   borderWidth:"0 0 2px 2px", borderRadius:"0 0 0 5px", borderColor:C.yellow },
//               { bottom:14,right:14,  borderWidth:"0 2px 2px 0", borderRadius:"0 0 5px 0", borderColor:C.orange },
//             ].map((s, i) => (
//               <div key={i} style={{ position:"absolute", width:20, height:20, zIndex:5,
//                 borderColor:s.borderColor, borderStyle:"solid", opacity:0.75, pointerEvents:"none", ...s }} />
//             ))}

//             <div style={{ position:"absolute", bottom:14, left:14, zIndex:5 }}>
//               <div style={{ background:C.black70, ...pill, border:`0.5px solid ${C.orangeBorder}`, padding:"7px 16px", boxShadow:`0 0 16px ${C.orange}18` }}>
//                 <span style={{ fontSize:9, fontWeight:700, color:C.cream50, marginRight:7, letterSpacing:"1.5px" }}>SELECTED</span>
//                 <span style={{ fontSize:12, fontWeight:700, color:C.cream }}>{currentGlass?.name}</span>
//                 <span style={{ fontSize:12, marginLeft:10, fontWeight:700, background:C.gradOY, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//                   {currentGlass?.price}
//                 </span>
//               </div>
//             </div>

//             <video ref={videoRef} style={{ display:"none" }} autoPlay playsInline muted />
//             <canvas ref={canvasRef} width={DESKTOP_CANVAS_W} height={DESKTOP_CANVAS_H}
//               style={{ display:"block", width:"100%", height:"100%", objectFit:"cover" }} />

//             {!cameraReady && (
//               <div style={{
//                 position:"absolute", inset:0, borderRadius:24, zIndex:30,
//                 background:`radial-gradient(ellipse 100% 60% at 55% 30%, rgba(232,127,36,0.07) 0%, rgba(17,10,4,0.98) 55%)`,
//                 display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:28,
//               }}>
//                 <div style={{ position:"relative", width:50, height:50 }}>
//                   <div className="spinner" /><div className="spinner-inner" />
//                 </div>
//                 <div style={{ textAlign:"center" }}>
//                   <div style={{ fontFamily:"'Syne',sans-serif", fontSize:10, fontWeight:700, letterSpacing:"3px",
//                     background:C.gradOY, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:8 }}>
//                     INITIALIZING CAMERA
//                   </div>
//                   <div style={{ fontSize:11, color:C.cream30 }}>Please allow camera access to continue</div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="right-panel" style={{
//           overflowY:"auto", padding:"18px 22px 22px 8px",
//           display:"flex", flexDirection:"column", gap:14,
//           background:"linear-gradient(180deg, rgba(24,15,6,0.72) 0%, rgba(17,10,4,0.85) 100%)",
//           borderLeft:`1px solid ${C.orangeBorder}`,
//         }}>
//           <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:9 }}>
//             {GLASS_OPTIONS.map(g => {
//               const isA = glasses === g.id;
//               return (
//                 <div key={g.id} className="frame-card" onClick={() => setGlasses(g.id)} style={{
//                   borderRadius:16, background:isA ? C.orange12 : C.white04,
//                   border:`1px solid ${isA ? C.orange : C.white08}`,
//                   padding:"11px 8px", display:"flex", flexDirection:"column",
//                   alignItems:"center", gap:6, cursor:"pointer",
//                   boxShadow:isA ? `0 0 20px ${C.orange}28, 0 0 40px ${C.yellow}10` : "none",
//                   transition:"all 0.22s ease",
//                 }}>
//                   <div style={{
//                     width:"100%", height:52, display:"flex", alignItems:"center", justifyContent:"center",
//                     borderRadius:9, overflow:"hidden", background:isA ? C.orange08 : C.white04,
//                   }}>
//                     <img src={g.id} alt={g.name} style={{
//                       width:"88%", height:"88%", objectFit:"contain",
//                       filter:isA ? `drop-shadow(0 0 5px ${C.orange}70)` : "brightness(0.80) saturate(0.75)",
//                       transition:"filter 0.2s ease",
//                     }} />
//                   </div>
//                   <div style={{ fontSize:10, fontWeight:700, color:isA ? C.cream : C.cream50, textAlign:"center", lineHeight:1.2 }}>{g.name}</div>
//                   <div style={{ fontSize:9, fontWeight:700,
//                     background:isA ? C.gradOY : "none", WebkitBackgroundClip:isA?"text":"unset",
//                     WebkitTextFillColor:isA?"transparent":C.orange, color:isA?"transparent":C.orange,
//                   }}>{g.price}</div>
//                 </div>
//               );
//             })}
//           </div>

//           <Section title="FRAME CALIBRATION" icon="⚙️">
//             <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:14 }}>
//               <button onClick={resetAdj} style={{
//                 fontSize:9, fontWeight:700, color:C.cream, background:C.orange12,
//                 border:`0.5px solid ${C.orange30}`, padding:"4px 14px", borderRadius:100, cursor:"pointer",
//               }}>RESET</button>
//             </div>
//             <SliderRow label="WIDTH"    value={curAdj.scaleW}  min={0.3}  max={3}   step={0.05} onChange={v=>setAdj("scaleW",v)}  fmt={v=>`${v.toFixed(2)}×`} />
//             <SliderRow label="HEIGHT"   value={curAdj.scaleH}  min={0.3}  max={3}   step={0.05} onChange={v=>setAdj("scaleH",v)}  fmt={v=>`${v.toFixed(2)}×`} />
//             <SliderRow label="MOVE L/R" value={curAdj.offsetX} min={-150} max={150} step={1}    onChange={v=>setAdj("offsetX",v)} fmt={v=>`${v>0?"+":""}${v}px`} />
//             <SliderRow label="MOVE U/D" value={curAdj.offsetY} min={-150} max={150} step={1}    onChange={v=>setAdj("offsetY",v)} fmt={v=>`${v>0?"+":""}${v}px`} />
//             <SliderRow label="ROTATION" value={curAdj.rotate}  min={-30}  max={30}  step={0.5}  onChange={v=>setAdj("rotate",v)}  fmt={v=>`${v>0?"+":""}${v.toFixed(1)}°`} />
//           </Section>

//           <Section title="SCENE FILTERS" icon="🎨">
//             <SliderRow label="BRIGHTNESS" value={brightness} min={0} max={200} step={1} onChange={setBrightness} fmt={v=>`${v}%`} />
//             <SliderRow label="CONTRAST"   value={contrast}   min={0} max={200} step={1} onChange={setContrast}   fmt={v=>`${v}%`} />
//             <SliderRow label="SATURATION" value={saturate}   min={0} max={200} step={1} onChange={setSaturate}   fmt={v=>`${v}%`} />
//           </Section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TryOn;













































// import React, { useRef, useEffect, useState, useCallback } from "react";

// // ── Per-frame default adjustments ─────────────────────────────────
// const DEFAULT_ADJ = { scaleW: 1,   scaleH: 1,    offsetX: 0, offsetY: 8,  rotate: 0 };
// const AVIATOR_ADJ = { scaleW: 1,   scaleH: 1.18, offsetX: 0, offsetY: 18, rotate: 0 };
// const ROUND_ADJ   = { scaleW: 1,   scaleH: 0.85, offsetX: 0, offsetY: 6,  rotate: 0 };

// // ── Full glass catalogue ───────────────────────────────────────────
// const GLASS_OPTIONS = [
//   { id: "/glass1.png",  name: "Classic",      price: "PKR 4,500", emoji: "👓", sizes: [{ label:"XL", scale:1.10, mobileScale:0.65 }] },
//   { id: "/glass2.png",  name: "Aviator",      price: "PKR 5,200", emoji: "🕶️", sizes: [{ label:"L",  scale:1.15, mobileScale:1.00 }] },
//   { id: "/glass3.png",  name: "Sport",        price: "PKR 3,800", emoji: "🥽", sizes: [{ label:"L",  scale:1.15, mobileScale:1.00 }] },
//   { id: "/glass4.png",  name: "Round",        price: "PKR 4,900", emoji: "⭕", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass5.png",  name: "Wayfarer",     price: "PKR 4,900", emoji: "🕶️", sizes: [{ label:"L",  scale:1.25, mobileScale:0.98 }] },
//   { id: "/glass6.png",  name: "Vintage",      price: "PKR 4,900", emoji: "🪩", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass7.png",  name: "Clubmaster",   price: "PKR 4,900", emoji: "🔲", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
//   { id: "/glass8.png",  name: "Cat Eye",      price: "PKR 4,900", emoji: "😼", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
//   { id: "/glass9.png",  name: "Shield",       price: "PKR 4,900", emoji: "🛡️", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass10.png", name: "Oval",         price: "PKR 4,900", emoji: "🥚", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass11.png", name: "Square",       price: "PKR 4,900", emoji: "⬛", sizes: [{ label:"S",  scale:0.75, mobileScale:0.50 }] },
//   { id: "/glass12.png", name: "Hexagonal",    price: "PKR 4,900", emoji: "⬡", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass13.png", name: "Geometric",    price: "PKR 4,900", emoji: "🔷", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass14.png", name: "Steampunk",    price: "PKR 4,900", emoji: "⚙️", sizes: [{ label:"S",  scale:0.95, mobileScale:0.50 }] },
//   { id: "/glass15.png", name: "Sports Pro",   price: "PKR 4,900", emoji: "🏃", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass16.png", name: "Retro",        price: "PKR 4,900", emoji: "🎞️", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass17.png", name: "Modern",       price: "PKR 4,900", emoji: "✨", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass18.png", name: "Luxury",       price: "PKR 4,900", emoji: "💎", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass19.png", name: "Designer",     price: "PKR 4,900", emoji: "🎨", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass20.png", name: "Classic II",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass21.png", name: "Classic III",  price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass22.png", name: "Classic IV",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.05, mobileScale:0.95 }] },
//   { id: "/glass23.png", name: "Classic V",    price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass24.png", name: "Classic VI",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"S",  scale:0.85, mobileScale:0.50 }] },
//   { id: "/glass25.png", name: "Classic VII",  price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass26.png", name: "Classic VIII", price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass27.png", name: "Classic IX",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass28.png", name: "Classic X",    price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass29.png", name: "Classic XI",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.25, mobileScale:0.95 }] },
//   { id: "/glass30.png", name: "Classic XII",  price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass31.png", name: "Classic 31",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass32.png", name: "Classic 32",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass33.png", name: "Classic 33",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass34.png", name: "Classic 34",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass35.png", name: "Classic 35",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.10, mobileScale:0.75 }] },
//   { id: "/glass36.png", name: "Classic 36",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass37.png", name: "Classic 37",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass38.png", name: "Classic 38",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
//   { id: "/glass39.png", name: "Classic 39",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass40.png", name: "Classic 40",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass41.png", name: "Classic 41",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass42.png", name: "Classic 42",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"S",  scale:0.95, mobileScale:0.50 }] },
//   { id: "/glass43.png", name: "Classic 43",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass44.png", name: "Classic 44",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass45.png", name: "Classic 45",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
//   { id: "/glass46.png", name: "Classic 46",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.40, mobileScale:1.10 }] },
//   { id: "/glass47.png", name: "Classic 47",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.20, mobileScale:1.10 }] },
//   { id: "/glass48.png", name: "Classic 48",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass49.png", name: "Classic 49",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
// ];

// // ── Device detection ──────────────────────────────────────────────
// const isMobile = typeof window !== "undefined" &&
//   (window.innerWidth < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

// const getSizeScale = (sizeObj) => {
//   if (!sizeObj) return 1;
//   return isMobile ? (sizeObj.mobileScale ?? sizeObj.scale) : sizeObj.scale;
// };

// // ── Constants ─────────────────────────────────────────────────────
// const BASE_EYE_SPAN      = 120;
// const BASE_GLASSES_WIDTH = BASE_EYE_SPAN * 1.7;
// const MOBILE_EMA_ALPHA   = 0.45;
// const MOBILE_DEADZONE    = 0.8;
// const MOBILE_LERP        = 0.35;
// const DESKTOP_EMA_ALPHA  = 0.55;
// const MOBILE_FPS         = 30;
// const MOBILE_FRAME_INT   = 1000 / MOBILE_FPS;
// const PHONE_CANVAS_W     = 340;
// const PHONE_CANVAS_H     = 680;
// const DESKTOP_CANVAS_W   = 640;
// const DESKTOP_CANVAS_H   = 480;

// const lerp = (a, b, t) => a + (b - a) * t;

// // ── Landmark indices ──────────────────────────────────────────────
// const LANDMARKS = {
//   LEFT_IRIS_CENTER:    468,
//   RIGHT_IRIS_CENTER:   473,
//   LEFT_EYE_OUTER:       33,
//   RIGHT_EYE_OUTER:     263,
//   LEFT_EYEBROW_LOWER:  [70, 63, 105, 66, 107],
//   RIGHT_EYEBROW_LOWER: [300, 293, 334, 296, 336],
//   NOSE_BRIDGE_TOP:     6,
//   NOSE_TIP:            4,
//   LEFT_FACE_EDGE:      234,
//   RIGHT_FACE_EDGE:     454,
// };

// class LandmarkSmoother {
//   constructor(posAlpha = 0.45, rotAlpha = 0.35) {
//     this.posAlpha = posAlpha;
//     this.rotAlpha = rotAlpha;
//     this.prev = null;
//   }
//   smooth(current, deadzone = 0) {
//     if (!this.prev) { this.prev = { ...current }; return { ...current }; }
//     const result = {};
//     for (const key of Object.keys(current)) {
//       const alpha = key === "angle" ? this.rotAlpha : this.posAlpha;
//       const delta = current[key] - this.prev[key];
//       result[key] = (deadzone > 0 && Math.abs(delta) < deadzone)
//         ? this.prev[key]
//         : this.prev[key] + alpha * delta;
//     }
//     this.prev = { ...result };
//     return result;
//   }
//   reset() { this.prev = null; }
// }

// function extractFaceGeometry(lm, W, H) {
//   const px = (idx) => ({ x: lm[idx].x * W, y: lm[idx].y * H, z: lm[idx].z });
//   const avgPx = (indices) => {
//     const pts = indices.map(i => px(i));
//     return {
//       x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
//       y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
//     };
//   };
//   const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

//   const leftIris       = px(LANDMARKS.LEFT_IRIS_CENTER);
//   const rightIris      = px(LANDMARKS.RIGHT_IRIS_CENTER);
//   const leftEyeOut     = px(LANDMARKS.LEFT_EYE_OUTER);
//   const rightEyeOut    = px(LANDMARKS.RIGHT_EYE_OUTER);
//   const leftBrowLower  = avgPx(LANDMARKS.LEFT_EYEBROW_LOWER);
//   const rightBrowLower = avgPx(LANDMARKS.RIGHT_EYEBROW_LOWER);
//   const noseBridgeTop  = px(LANDMARKS.NOSE_BRIDGE_TOP);
//   const leftFaceEdge   = px(LANDMARKS.LEFT_FACE_EDGE);
//   const rightFaceEdge  = px(LANDMARKS.RIGHT_FACE_EDGE);

//   const browMidLower = {
//     x: (leftBrowLower.x + rightBrowLower.x) / 2,
//     y: (leftBrowLower.y + rightBrowLower.y) / 2,
//   };

//   const eyeSpan       = dist(leftEyeOut, rightEyeOut);
//   const faceWidth     = dist(leftFaceEdge, rightFaceEdge);
//   const leftBrowGap   = dist(leftBrowLower, leftIris);
//   const rightBrowGap  = dist(rightBrowLower, rightIris);
//   const avgBrowEyeGap = (leftBrowGap + rightBrowGap) / 2;

//   const angleIris       = Math.atan2(rightIris.y - leftIris.y, rightIris.x - leftIris.x);
//   const angleEyeCorners = Math.atan2(rightEyeOut.y - leftEyeOut.y, rightEyeOut.x - leftEyeOut.x);
//   const angleBrow       = Math.atan2(rightBrowLower.y - leftBrowLower.y, rightBrowLower.x - leftBrowLower.x);
//   const angle = angleEyeCorners * 0.6 + angleBrow * 0.3 + angleIris * 0.1;

//   const irisY   = (leftIris.y + rightIris.y) / 2;
//   const centerX = (leftIris.x + rightIris.x) / 2;
//   const centerY = browMidLower.y * 0.25 + noseBridgeTop.y * 0.55 + irisY * 0.20;

//   let glassesWidth;
//   if (isMobile) {
//     const normalizedScale = Math.max(0.85, Math.min(1.15, eyeSpan / BASE_EYE_SPAN));
//     glassesWidth = BASE_GLASSES_WIDTH * normalizedScale;
//   } else {
//     glassesWidth = (eyeSpan * 0.8 + faceWidth * 0.12) * 1.65;
//   }

//   const glassesHeight = avgBrowEyeGap * 3.3;
//   const avgZ     = (leftIris.z + rightIris.z + noseBridgeTop.z) / 3;
//   const depthScale = Math.max(0.92, Math.min(1.08, 1 + (-avgZ * 0.6)));

//   return { centerX, centerY, angle, glassesWidth, glassesHeight, depthScale };
// }

// // ── NEW LIGHT THEME COLOR TOKENS ─────────────────────────────────
// const C = {
//   // Core palette
//   primary:        "#E87F24",
//   accent:         "#73A5CA",
//   bg:             "#FEFDDF",
//   surface:        "#F5F3C7",
//   text:           "#1E293B",

//   // Primary opacities
//   primary12:      "rgba(232,127,36,0.12)",
//   primary20:      "rgba(232,127,36,0.20)",
//   primary25:      "rgba(232,127,36,0.25)",
//   primary30:      "rgba(232,127,36,0.30)",
//   primary40:      "rgba(232,127,36,0.40)",

//   // Accent opacities
//   accent12:       "rgba(115,165,202,0.12)",
//   accent20:       "rgba(115,165,202,0.20)",
//   accent28:       "rgba(115,165,202,0.28)",

//   // Text opacities (on light bg)
//   text55:         "rgba(30,41,59,0.55)",
//   text30:         "rgba(30,41,59,0.30)",
//   text12:         "rgba(30,41,59,0.12)",
//   text06:         "rgba(30,41,59,0.06)",

//   // Glass surfaces
//   glassBg:        "rgba(254,253,223,0.65)",
//   glassBgSolid:   "rgba(254,253,223,0.92)",
//   glassBorder:    "rgba(255,255,255,0.70)",
//   surfaceBorder:  "rgba(255,255,255,0.85)",

//   // Camera overlay (stays dark — it's literally over a camera feed)
//   camOverlay:     "rgba(0,0,0,0.52)",
//   camOverlay70:   "rgba(0,0,0,0.70)",

//   // White helpers (for mobile camera UI)
//   white15:        "rgba(255,255,255,0.15)",
//   white08:        "rgba(255,255,255,0.08)",

//   // Gradients
//   gradPrimary:    "linear-gradient(135deg, #E87F24, #F5A623)",
//   gradPrimaryText:"linear-gradient(135deg, #F5A623, #E87F24)",
//   gradBg:         `
//     radial-gradient(ellipse 60% 50% at 80% 10%, rgba(232,127,36,0.13) 0%, transparent 60%),
//     radial-gradient(ellipse 50% 40% at 10% 80%, rgba(115,165,202,0.12) 0%, transparent 55%),
//     #FEFDDF
//   `,
// };

// // ── Glassmorphism pill helper ─────────────────────────────────────
// const glassPill = {
//   borderRadius: 100,
//   backdropFilter: "blur(14px)",
//   WebkitBackdropFilter: "blur(14px)",
// };

// const glassCard = {
//   background: C.glassBg,
//   border: `1px solid ${C.glassBorder}`,
//   backdropFilter: "blur(16px)",
//   WebkitBackdropFilter: "blur(16px)",
//   borderRadius: 20,
//   boxShadow: `0 8px 32px ${C.primary12}, 0 2px 8px ${C.text06}`,
// };

// // ── Section accordion ─────────────────────────────────────────────
// const Section = ({ title, icon, defaultOpen = false, children }) => {
//   const [open, setOpen] = useState(defaultOpen);
//   return (
//     <div style={{
//       borderRadius: 16,
//       border: `1px solid ${C.glassBorder}`,
//       overflow: "hidden",
//       background: C.glassBg,
//       backdropFilter: "blur(12px)",
//       WebkitBackdropFilter: "blur(12px)",
//       boxShadow: `0 2px 8px ${C.text06}`,
//     }}>
//       <button onClick={() => setOpen(o => !o)} style={{
//         width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
//         padding: "13px 16px",
//         background: `rgba(254,253,223,0.50)`,
//         border: "none", cursor: "pointer",
//         borderBottom: open ? `1px solid ${C.glassBorder}` : "none",
//       }}>
//         <span style={{
//           display: "flex", alignItems: "center", gap: 8,
//           fontSize: 10, fontWeight: 700, letterSpacing: "2px",
//           color: C.primary,
//         }}>
//           <span style={{ fontSize: 13 }}>{icon}</span>{title}
//         </span>
//         <span style={{
//           fontSize: 9, color: C.text55,
//           transform: open ? "rotate(180deg)" : "rotate(0)",
//           transition: "transform 0.22s ease", display: "inline-block",
//         }}>▼</span>
//       </button>
//       {open && (
//         <div style={{ padding: "16px", background: "rgba(245,243,199,0.40)" }}>
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

// // ── Slider row ────────────────────────────────────────────────────
// const SliderRow = ({ label, value, min, max, step, onChange, fmt }) => (
//   <div style={{ marginBottom: 18 }}>
//     <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
//       <span style={{ fontSize: 10, color: C.text55, fontWeight: 600, letterSpacing: "1px" }}>{label}</span>
//       <span style={{
//         fontSize: 11, fontWeight: 700,
//         background: C.gradPrimaryText,
//         WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
//       }}>{fmt(value)}</span>
//     </div>
//     <input
//       type="range"
//       min={min} max={max} step={step} value={value}
//       onChange={e => onChange(Number(e.target.value))}
//       style={{
//         width: "100%", height: 3,
//         background: C.primary20,
//         borderRadius: 4, appearance: "none", WebkitAppearance: "none", cursor: "pointer",
//       }}
//     />
//   </div>
// );

// // ─────────────────────────────────────────────────────────────────
// // MAIN COMPONENT
// // ─────────────────────────────────────────────────────────────────
// const TryOn = () => {
//   const videoRef         = useRef(null);
//   const canvasRef        = useRef(null);
//   const imgRef           = useRef(new Image());
//   const trackRef         = useRef({ cx:0, cy:0, gw:0, gh:0, angle:0, ds:1, prevCx:0, prevCy:0, hasLandmarks:false });
//   const rafIdRef         = useRef(null);
//   const lastFrameRef     = useRef(0);
//   const touchStartX      = useRef(null);
//   const touchStartY      = useRef(null);
//   const cameraRdyRef     = useRef(false);
//   const glassesRef       = useRef("/glass1.png");
//   const adjRef           = useRef({});
//   const smootherRef      = useRef(
//     new LandmarkSmoother(
//       isMobile ? MOBILE_EMA_ALPHA : DESKTOP_EMA_ALPHA,
//       isMobile ? 0.30 : 0.40
//     )
//   );
//   const pendingResultRef = useRef(null);

//   const [glasses, setGlasses]         = useState("/glass1.png");
//   const [cameraReady, setCameraReady] = useState(false);
//   const [brightness, setBrightness]   = useState(100);
//   const [contrast, setContrast]       = useState(100);
//   const [saturate, setSaturate]       = useState(100);
//   const [mpError, setMpError]         = useState(null);

//   const brightnessRef = useRef(100);
//   const contrastRef   = useRef(100);
//   const saturateRef   = useRef(100);
//   useEffect(() => { brightnessRef.current = brightness; }, [brightness]);
//   useEffect(() => { contrastRef.current   = contrast;   }, [contrast]);
//   useEffect(() => { saturateRef.current   = saturate;   }, [saturate]);

//   const [adjustments, setAdjustments] = useState(() =>
//     Object.fromEntries(GLASS_OPTIONS.map(g => {
//       if (g.id === "/glass2.png") return [g.id, { ...AVIATOR_ADJ }];
//       if (g.id === "/glass4.png") return [g.id, { ...ROUND_ADJ }];
//       return [g.id, { ...DEFAULT_ADJ }];
//     }))
//   );

//   useEffect(() => { glassesRef.current = glasses;     }, [glasses]);
//   useEffect(() => { adjRef.current     = adjustments; }, [adjustments]);

//   const currentGlass = GLASS_OPTIONS.find(g => g.id === glasses);
//   const curAdj       = adjustments[glasses] || DEFAULT_ADJ;

//   const setAdj = (key, val) =>
//     setAdjustments(prev => ({ ...prev, [glasses]: { ...(prev[glasses] || DEFAULT_ADJ), [key]: val } }));
//   const resetAdj = () =>
//     setAdjustments(prev => ({
//       ...prev, [glasses]:
//         glasses === "/glass2.png" ? { ...AVIATOR_ADJ } :
//         glasses === "/glass4.png" ? { ...ROUND_ADJ }   : { ...DEFAULT_ADJ }
//     }));

//   useEffect(() => {
//     imgRef.current.crossOrigin = "Anonymous";
//     imgRef.current.src = glasses;
//   }, [glasses]);

//   const drawLoop = useCallback(() => {
//     rafIdRef.current = requestAnimationFrame(drawLoop);
//     const now = performance.now();
//     if (isMobile && now - lastFrameRef.current < MOBILE_FRAME_INT) return;
//     lastFrameRef.current = now;

//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d", { alpha: false, willReadFrequently: false });
//     const W = canvas.width, H = canvas.height;

//     const result = pendingResultRef.current;
//     if (!result) return;

//     const beautyB = 108;
//     const beautyC = 96;
//     const beautyS = 105;
//     const finalB = Math.round((brightnessRef.current / 100) * beautyB);
//     const finalC = Math.round((contrastRef.current   / 100) * beautyC);
//     const finalS = Math.round((saturateRef.current   / 100) * beautyS);
//     ctx.filter = `brightness(${finalB}%) contrast(${finalC}%) saturate(${finalS}%) blur(0.3px)`;
//     ctx.drawImage(result.image, 0, 0, W, H);
//     ctx.filter = "none";

//     if (!result.multiFaceLandmarks?.length) {
//       smootherRef.current.reset();
//       trackRef.current.hasLandmarks = false;
//       return;
//     }

//     const lm  = result.multiFaceLandmarks[0];
//     const geo = extractFaceGeometry(lm, W, H);

//     const sm = smootherRef.current.smooth(
//       { cx: geo.centerX, cy: geo.centerY, gw: geo.glassesWidth, gh: geo.glassesHeight, angle: geo.angle, ds: geo.depthScale },
//       isMobile ? MOBILE_DEADZONE : 0
//     );

//     const tr = trackRef.current;
//     if (isMobile && tr.hasLandmarks) {
//       sm.cx = lerp(tr.prevCx, sm.cx, MOBILE_LERP);
//       sm.cy = lerp(tr.prevCy, sm.cy, MOBILE_LERP);
//     }
//     tr.prevCx = sm.cx;
//     tr.prevCy = sm.cy;
//     tr.hasLandmarks = true;

//     const img = imgRef.current;
//     if (!img.complete || !img.naturalWidth) return;

//     const glassObj = GLASS_OPTIONS.find(g => g.id === glassesRef.current);
//     const sSc      = glassObj?.sizes?.[0] ? getSizeScale(glassObj.sizes[0]) : 1.0;
//     const adj      = adjRef.current[glassesRef.current] || DEFAULT_ADJ;

//     let w = isMobile ? sm.gw * adj.scaleW : sm.gw * adj.scaleW * sm.ds;
//     let h = isMobile ? sm.gh * adj.scaleH : sm.gh * adj.scaleH * sm.ds;
//     w *= sSc; h *= sSc;

//     ctx.save();
//     ctx.translate(sm.cx + adj.offsetX, sm.cy + adj.offsetY);
//     ctx.rotate(sm.angle + adj.rotate * Math.PI / 180);
//     ctx.drawImage(img, -w / 2, -h / 2, w, h);
//     ctx.restore();
//   }, []);

//   const onResults = useCallback((results) => {
//     pendingResultRef.current = results;
//   }, []);

//   useEffect(() => {
//     if (!window.FaceMesh || !window.Camera) {
//       setMpError("MediaPipe globals not found. Add the two MediaPipe <script> tags to index.html.");
//       return;
//     }

//     const faceMesh = new window.FaceMesh({
//       locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/${file}`,
//     });
//     faceMesh.setOptions({
//       maxNumFaces: 1,
//       refineLandmarks: true,
//       minDetectionConfidence: 0.5,
//       minTrackingConfidence: 0.5,
//     });
//     faceMesh.onResults(onResults);

//     rafIdRef.current = requestAnimationFrame(drawLoop);

//     const cam = new window.Camera(videoRef.current, {
//       onFrame: async () => {
//         if (!cameraRdyRef.current) { cameraRdyRef.current = true; setCameraReady(true); }
//         if (isMobile) {
//           const now = performance.now();
//           if (now - lastFrameRef.current < MOBILE_FRAME_INT) return;
//         }
//         await faceMesh.send({ image: videoRef.current });
//       },
//       width:  isMobile ? PHONE_CANVAS_W  : DESKTOP_CANVAS_W,
//       height: isMobile ? PHONE_CANVAS_H  : DESKTOP_CANVAS_H,
//     });
//     cam.start();

//     return () => {
//       if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
//       faceMesh.close();
//     };
//   }, [drawLoop, onResults]);

//   // ── Global CSS ────────────────────────────────────────────────
//   const css = `
//     @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600&display=swap');
//     *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//     /* ── Range inputs ── */
//     input[type="range"] { -webkit-appearance: none; appearance: none; background: transparent; }
//     input[type="range"]::-webkit-slider-runnable-track {
//       background: linear-gradient(90deg, rgba(232,127,36,0.30), rgba(232,127,36,0.10));
//       height: 3px; border-radius: 3px;
//     }
//     input[type="range"]::-webkit-slider-thumb {
//       -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%;
//       background: radial-gradient(circle at 38% 35%, #F5A623, #E87F24);
//       cursor: pointer; margin-top: -6.5px;
//       border: 2px solid rgba(254,253,223,0.90);
//       box-shadow: 0 2px 8px rgba(232,127,36,0.40);
//     }
//     input[type="range"]::-moz-range-thumb {
//       width: 16px; height: 16px; border-radius: 50%;
//       background: radial-gradient(circle at 38% 35%, #F5A623, #E87F24);
//       cursor: pointer; border: 2px solid rgba(254,253,223,0.90);
//       box-shadow: 0 2px 8px rgba(232,127,36,0.40);
//     }

//     /* ── Scrollbars ── */
//     .right-panel { scrollbar-width: thin; scrollbar-color: rgba(232,127,36,0.40) rgba(232,127,36,0.08); }
//     ::-webkit-scrollbar { width: 3px; height: 3px; }
//     ::-webkit-scrollbar-track { background: rgba(232,127,36,0.06); border-radius: 4px; }
//     ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #E87F24, #F5A623); border-radius: 4px; }

//     /* ── Frame scroller (mobile) ── */
//     .frame-scroller { scroll-behavior: smooth; -webkit-overflow-scrolling: touch; scrollbar-width: none; -ms-overflow-style: none; }
//     .frame-scroller::-webkit-scrollbar { display: none; }

//     /* ── Frame cards ── */
//     .frame-card { transition: transform 0.2s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s ease; -webkit-tap-highlight-color: transparent; }
//     .frame-card:hover { transform: translateY(-2px) scale(1.03); }
//     .frame-card:active { transform: scale(0.96); }

//     /* ── Animations ── */
//     @keyframes spin    { to { transform: rotate(360deg); } }
//     @keyframes fadeIn  { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
//     @keyframes pulse   { 0%,100%{ opacity:0.55 } 50%{ opacity:1 } }
//     @keyframes shimmer { 0%{ background-position:200% center; } 100%{ background-position:-200% center; } }

//     /* ── Spinner ── */
//     .spinner {
//       width: 44px; height: 44px; border-radius: 50%;
//       border: 2px solid rgba(115,165,202,0.20);
//       border-top-color: #E87F24;
//       animation: spin 0.85s linear infinite;
//     }
//     .spinner-inner {
//       width: 30px; height: 30px; border-radius: 50%;
//       border: 1.5px solid rgba(232,127,36,0.15);
//       border-bottom-color: #F5A623;
//       animation: spin 1.2s linear infinite reverse;
//       position: absolute; top: 7px; left: 7px;
//     }

//     /* ── AR tracking dot pulse ── */
//     .ar-dot {
//       width: 7px; height: 7px; border-radius: 50%;
//       background: #73A5CA;
//       box-shadow: 0 0 8px rgba(115,165,202,0.70);
//       animation: pulse 2s ease infinite;
//       display: inline-block;
//       margin-right: 6px;
//       flex-shrink: 0;
//     }
//   `;

//   // ── Error banner ──────────────────────────────────────────────
//   if (mpError) return (
//     <div style={{
//       display: "flex", alignItems: "center", justifyContent: "center",
//       height: "100vh", background: C.bg, color: "#c2410c",
//       fontFamily: "monospace", padding: 24, textAlign: "center", fontSize: 13,
//     }}>
//       ⚠️ {mpError}
//     </div>
//   );

//   // ══════════════════════════════════════════════════════════════
//   // MOBILE LAYOUT
//   // ══════════════════════════════════════════════════════════════
//   if (isMobile) {
//     const idx = GLASS_OPTIONS.findIndex(g => g.id === glasses);

//     const onTouchStart = (e) => {
//       touchStartX.current = e.touches[0].clientX;
//       touchStartY.current = e.touches[0].clientY;
//     };
//     const onTouchEnd = (e) => {
//       if (touchStartX.current === null) return;
//       const dx = e.changedTouches[0].clientX - touchStartX.current;
//       const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
//       if (Math.abs(dx) > 50 && Math.abs(dx) > dy) {
//         const cur = GLASS_OPTIONS.findIndex(g => g.id === glassesRef.current);
//         if (dx < 0 && cur < GLASS_OPTIONS.length - 1) setGlasses(GLASS_OPTIONS[cur + 1].id);
//         if (dx > 0 && cur > 0)                        setGlasses(GLASS_OPTIONS[cur - 1].id);
//       }
//       touchStartX.current = null;
//       touchStartY.current = null;
//     };

//     return (
//       <div
//         style={{ position:"fixed", inset:0, background:"#000", fontFamily:"'Space Grotesk', sans-serif", color:"#fff", overflow:"hidden", touchAction:"pan-y" }}
//         onTouchStart={onTouchStart}
//         onTouchEnd={onTouchEnd}
//       >
//         <style>{css}</style>
//         <video ref={videoRef} style={{ display:"none" }} autoPlay playsInline muted />

//         {/* Full-screen camera canvas */}
//         <canvas
//           ref={canvasRef}
//           width={PHONE_CANVAS_W}
//           height={PHONE_CANVAS_H}
//           style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", display:"block" }}
//         />

//         {/* Top vignette */}
//         <div style={{
//           position:"absolute", top:0, left:0, right:0, height:"22%",
//           background:"linear-gradient(to bottom, rgba(0,0,0,0.50), transparent)",
//           pointerEvents:"none",
//         }} />

//         {/* AR tracking indicator — top left */}
//         {cameraReady && (
//           <div style={{
//             position:"absolute", top:18, left:16, zIndex:20,
//             display:"flex", alignItems:"center",
//             background:"rgba(0,0,0,0.42)",
//             ...glassPill,
//             border:`1px solid rgba(115,165,202,0.30)`,
//             padding:"5px 12px",
//             animation:"fadeIn 0.35s ease",
//           }}>
//             <span className="ar-dot" />
//             <span style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,0.80)", letterSpacing:"0.5px" }}>Tracking</span>
//           </div>
//         )}

//         {/* Frame name + price chip */}
//         {cameraReady && currentGlass && (
//           <div style={{
//             position:"absolute", bottom:176, left:"50%", transform:"translateX(-50%)",
//             zIndex:20, whiteSpace:"nowrap",
//             background:"rgba(0,0,0,0.48)",
//             ...glassPill,
//             border:`1px solid ${C.primary25}`,
//             padding:"7px 20px",
//             display:"flex", alignItems:"center", gap:10,
//             animation:"fadeIn 0.3s ease",
//             boxShadow:`0 4px 20px rgba(0,0,0,0.25), 0 0 20px ${C.primary12}`,
//           }}>
//             <span style={{ fontSize:13, fontWeight:700, color:"rgba(254,253,223,0.95)" }}>{currentGlass.name}</span>
//             <span style={{ width:1, height:11, background:C.primary30, display:"inline-block" }} />
//             <span style={{
//               fontSize:13, fontWeight:700,
//               background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
//             }}>{currentGlass.price}</span>
//           </div>
//         )}

//         {/* Progress dots */}
//         {cameraReady && (
//           <div style={{
//             position:"absolute", bottom:158, left:"50%", transform:"translateX(-50%)",
//             display:"flex", gap:4, zIndex:20,
//           }}>
//             {GLASS_OPTIONS.map((g, i) => (
//               <div key={g.id} style={{
//                 width: i === idx ? 14 : 4, height:4, borderRadius:3,
//                 background: i === idx ? C.primary : C.white15,
//                 transition:"all 0.25s ease",
//               }} />
//             ))}
//           </div>
//         )}

//         {/* Bottom frame scroller */}
//         <div style={{
//           position:"absolute", bottom:0, left:0, right:0, zIndex:20,
//           paddingBottom:"env(safe-area-inset-bottom, 12px)",
//           background:"linear-gradient(to top, rgba(10,5,2,0.96) 55%, transparent 100%)",
//         }}>
//           <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 18px 4px" }}>
//             <span style={{ fontSize:9, fontWeight:700, letterSpacing:"2px", color:"rgba(254,253,223,0.35)", textTransform:"uppercase" }}>
//               Frames
//             </span>
//             <span style={{ fontSize:9, color:"rgba(254,253,223,0.30)", fontFamily:"'Outfit', sans-serif" }}>
//               {idx + 1} / {GLASS_OPTIONS.length}
//             </span>
//           </div>

//           <div className="frame-scroller" style={{
//             display:"flex", gap:10, padding:"4px 14px 14px",
//             overflowX:"auto", scrollSnapType:"x mandatory",
//           }}>
//             {GLASS_OPTIONS.map(g => {
//               const isA = glasses === g.id;
//               return (
//                 <div key={g.id} className="frame-card" onClick={() => setGlasses(g.id)} style={{
//                   flexShrink:0, scrollSnapAlign:"start",
//                   width:64, height:64, borderRadius:16,
//                   background: isA ? "rgba(232,127,36,0.18)" : "rgba(30,20,10,0.70)",
//                   border:`1.5px solid ${isA ? C.primary : "rgba(255,255,255,0.12)"}`,
//                   display:"flex", alignItems:"center", justifyContent:"center",
//                   cursor:"pointer", overflow:"hidden", padding:6,
//                   transform: isA ? "scale(1.08)" : "scale(1)",
//                   backdropFilter:"blur(10px)", WebkitBackdropFilter:"blur(10px)",
//                   boxShadow: isA ? `0 0 20px rgba(232,127,36,0.50), 0 0 36px rgba(245,166,35,0.15)` : "none",
//                   position:"relative",
//                 }}>
//                   {isA && (
//                     <div style={{
//                       position:"absolute", bottom:4, left:"50%", transform:"translateX(-50%)",
//                       width:5, height:5, borderRadius:"50%",
//                       background:C.primary, boxShadow:`0 0 6px ${C.primary}`,
//                     }} />
//                   )}
//                   <img src={g.id} alt={g.name} style={{
//                     width:"100%", height:"80%", objectFit:"contain",
//                     filter: isA ? `drop-shadow(0 0 5px rgba(232,127,36,0.70))` : "brightness(0.55) saturate(0.6)",
//                     transition:"filter 0.2s ease",
//                   }} />
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Camera loading overlay */}
//         {!cameraReady && (
//           <div style={{
//             position:"absolute", inset:0, zIndex:50,
//             background:`radial-gradient(ellipse 120% 80% at 55% 30%, rgba(232,127,36,0.08) 0%, rgba(10,5,2,0.99) 60%)`,
//             display:"flex", flexDirection:"column",
//             alignItems:"center", justifyContent:"center", gap:24,
//           }}>
//             <div style={{ position:"relative", width:44, height:44 }}>
//               <div className="spinner" />
//               <div className="spinner-inner" />
//             </div>
//             <div style={{ textAlign:"center" }}>
//               <div style={{
//                 fontFamily:"'Outfit', sans-serif", fontSize:22, fontWeight:800, marginBottom:6,
//                 background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
//               }}>VR.OPTICS</div>
//               <div style={{ fontSize:9, fontWeight:700, letterSpacing:"3px", color:C.primary, marginBottom:8 }}>
//                 INITIALIZING
//               </div>
//               <div style={{ fontSize:10, color:"rgba(254,253,223,0.40)" }}>Allow camera access to continue</div>
//             </div>
//             <div style={{
//               fontSize:9, color:"rgba(254,253,223,0.22)",
//               border:`0.5px solid rgba(255,255,255,0.10)`, borderRadius:100, padding:"4px 14px",
//             }}>
//               ← Swipe to browse frames →
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   // ══════════════════════════════════════════════════════════════
//   // DESKTOP LAYOUT — New light glassmorphism theme
//   // ══════════════════════════════════════════════════════════════
//   return (
//     <div style={{
//       fontFamily: "'Space Grotesk', sans-serif",
//       background: C.gradBg,
//       color: C.text,
//       height: "100vh",
//       display: "flex",
//       overflow: "hidden",
//     }}>
//       <style>{css}</style>

//       {/* Ambient glow layers */}
//       <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
//         <div style={{
//           position:"absolute", top:"-15%", right:"-8%",
//           width:"52vw", height:"52vw", borderRadius:"50%",
//           background:`radial-gradient(circle, rgba(232,127,36,0.14) 0%, rgba(232,127,36,0.04) 45%, transparent 70%)`,
//         }} />
//         <div style={{
//           position:"absolute", bottom:"-20%", left:"-12%",
//           width:"48vw", height:"48vw", borderRadius:"50%",
//           background:`radial-gradient(circle, rgba(115,165,202,0.12) 0%, rgba(115,165,202,0.03) 45%, transparent 70%)`,
//         }} />
//       </div>

//       {/* ── LEFT: Camera (75%) ── */}
//       <div style={{
//         position:"relative", zIndex:1,
//         flex:"0 0 75%", maxWidth:"75%",
//         padding:20,
//         display:"flex", flexDirection:"column",
//       }}>
//         <div style={{
//           flex:1, position:"relative", borderRadius:22, overflow:"hidden",
//           border:`1px solid ${C.glassBorder}`,
//           background:"#000",
//           boxShadow:`
//             inset 0 0 60px rgba(0,0,0,0.40),
//             0 0 0 1px rgba(232,127,36,0.08),
//             0 8px 40px rgba(30,41,59,0.12)
//           `,
//         }}>
//           {/* AR corner brackets — using accent color */}
//           {[
//             { top:12, left:12,  borderWidth:"2px 0 0 2px",  borderRadius:"4px 0 0 0" },
//             { top:12, right:12, borderWidth:"2px 2px 0 0",  borderRadius:"0 4px 0 0" },
//             { bottom:12, left:12,  borderWidth:"0 0 2px 2px", borderRadius:"0 0 0 4px" },
//             { bottom:12, right:12, borderWidth:"0 2px 2px 0", borderRadius:"0 0 4px 0" },
//           ].map((s, i) => (
//             <div key={i} style={{
//               position:"absolute", zIndex:5,
//               width:18, height:18,
//               borderStyle:"solid",
//               borderColor:`rgba(115,165,202,0.50)`,
//               ...s,
//             }} />
//           ))}

//           {/* AR tracking status pill — top right */}
//           {cameraReady && (
//             <div style={{
//               position:"absolute", top:16, right:16, zIndex:5,
//               display:"flex", alignItems:"center",
//               background:"rgba(0,0,0,0.42)",
//               ...glassPill,
//               border:`1px solid rgba(115,165,202,0.28)`,
//               padding:"5px 14px",
//               animation:"fadeIn 0.3s ease",
//             }}>
//               <span className="ar-dot" />
//               <span style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,0.80)", letterSpacing:"0.5px" }}>
//                 Face Tracking Active
//               </span>
//             </div>
//           )}

//           {/* Selected frame badge — bottom left */}
//           <div style={{ position:"absolute", bottom:16, left:16, zIndex:5 }}>
//             <div style={{
//               background:"rgba(0,0,0,0.52)",
//               ...glassPill,
//               border:`0.5px solid ${C.primary25}`,
//               padding:"8px 20px",
//               boxShadow:`0 4px 20px rgba(0,0,0,0.25), 0 0 16px ${C.primary12}`,
//               display:"flex", alignItems:"center", gap:12,
//             }}>
//               <span style={{ fontSize:9, fontWeight:700, color:"rgba(254,253,223,0.50)", letterSpacing:"1.5px" }}>
//                 SELECTED
//               </span>
//               <span style={{ width:1, height:11, background:C.primary30, display:"inline-block" }} />
//               <span style={{ fontSize:13, fontWeight:700, color:"rgba(254,253,223,0.95)" }}>
//                 {currentGlass?.name}
//               </span>
//               <span style={{
//                 fontSize:13, fontWeight:700,
//                 background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
//               }}>
//                 {currentGlass?.price}
//               </span>
//             </div>
//           </div>

//           <video ref={videoRef} style={{ display:"none" }} autoPlay playsInline muted />
//           <canvas
//             ref={canvasRef}
//             width={DESKTOP_CANVAS_W}
//             height={DESKTOP_CANVAS_H}
//             style={{ display:"block", width:"100%", height:"100%", objectFit:"cover" }}
//           />

//           {/* Camera init overlay */}
//           {!cameraReady && (
//             <div style={{
//               position:"absolute", inset:0, borderRadius:22, zIndex:30,
//               background:`radial-gradient(ellipse 100% 60% at 55% 30%, rgba(232,127,36,0.08) 0%, rgba(254,253,223,0.97) 55%)`,
//               display:"flex", flexDirection:"column",
//               alignItems:"center", justifyContent:"center", gap:28,
//             }}>
//               <div style={{ position:"relative", width:50, height:50 }}>
//                 <div className="spinner" />
//                 <div className="spinner-inner" />
//               </div>
//               <div style={{ textAlign:"center" }}>
//                 <div style={{
//                   fontFamily:"'Outfit', sans-serif", fontSize:11, fontWeight:700,
//                   letterSpacing:"3px", textTransform:"uppercase",
//                   background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
//                   marginBottom:8,
//                 }}>
//                   Initializing Camera
//                 </div>
//                 <div style={{ fontSize:12, color:C.text55 }}>Please allow camera access to continue</div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ── RIGHT: Controls panel (25%) ── */}
//       <div className="right-panel" style={{
//         position:"relative", zIndex:1,
//         flex:"0 0 25%", maxWidth:"25%",
//         overflowY:"auto",
//         padding:"20px 16px 20px 4px",
//         display:"flex", flexDirection:"column", gap:12,
//         borderLeft:`1px solid ${C.glassBorder}`,
//         background:`linear-gradient(180deg, rgba(245,243,199,0.60) 0%, rgba(254,253,223,0.80) 100%)`,
//         backdropFilter:"blur(20px)",
//         WebkitBackdropFilter:"blur(20px)",
//       }}>

//         {/* Header */}
//         <div style={{ padding:"4px 4px 2px" }}>
//           <div style={{
//             fontFamily:"'Outfit', sans-serif", fontSize:18, fontWeight:700,
//             color:C.text, marginBottom:3,
//           }}>
//             Choose Frame
//           </div>
//           <div style={{ fontSize:10, letterSpacing:"1.5px", color:C.text30, fontWeight:600, textTransform:"uppercase" }}>
//             {GLASS_OPTIONS.length} styles available
//           </div>
//         </div>

//         {/* ── Frame grid ── */}
//         <div style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:8 }}>
//           {GLASS_OPTIONS.map(g => {
//             const isA = glasses === g.id;
//             return (
//               <div key={g.id} className="frame-card" onClick={() => setGlasses(g.id)} style={{
//                 borderRadius:14,
//                 background: isA ? C.primary12 : "rgba(254,253,223,0.55)",
//                 border:`1px solid ${isA ? C.primary : C.surfaceBorder}`,
//                 padding:"10px 6px",
//                 display:"flex", flexDirection:"column",
//                 alignItems:"center", gap:5,
//                 cursor:"pointer",
//                 boxShadow: isA
//                   ? `0 0 20px rgba(232,127,36,0.20), 0 4px 12px rgba(30,41,59,0.08)`
//                   : `0 1px 4px ${C.text06}`,
//                 transition:"all 0.22s cubic-bezier(0.22,1,0.36,1)",
//                 backdropFilter:"blur(8px)",
//                 WebkitBackdropFilter:"blur(8px)",
//               }}>
//                 <div style={{
//                   width:"100%", height:48,
//                   display:"flex", alignItems:"center", justifyContent:"center",
//                   borderRadius:10, overflow:"hidden",
//                   background: isA ? C.primary12 : C.text06,
//                 }}>
//                   <img src={g.id} alt={g.name} style={{
//                     width:"90%", height:"90%", objectFit:"contain",
//                     filter: isA
//                       ? `drop-shadow(0 0 5px rgba(232,127,36,0.55))`
//                       : `brightness(0.80) saturate(0.75)`,
//                     transition:"filter 0.2s ease",
//                   }} />
//                 </div>
//                 <div style={{
//                   fontSize:9, fontWeight:700, textAlign:"center", lineHeight:1.2,
//                   color: isA ? C.text : C.text55,
//                 }}>
//                   {g.name}
//                 </div>
//                 <div style={{
//                   fontSize:8, fontWeight:700,
//                   background: isA ? C.gradPrimary : "none",
//                   WebkitBackgroundClip: isA ? "text" : "unset",
//                   WebkitTextFillColor: isA ? "transparent" : C.primary,
//                   color: isA ? "transparent" : C.primary,
//                 }}>
//                   {g.price}
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* ── Frame calibration ── */}
//         <Section title="FRAME CALIBRATION" icon="⚙️">
//           <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:14 }}>
//             <button onClick={resetAdj} style={{
//               fontSize:9, fontWeight:700, color:C.primary,
//               background:C.primary12, border:`0.5px solid ${C.primary25}`,
//               padding:"5px 14px", borderRadius:100, cursor:"pointer",
//               fontFamily:"'Space Grotesk', sans-serif",
//               letterSpacing:"0.5px",
//               transition:"background 0.15s",
//             }}>Reset</button>
//           </div>
//           <SliderRow label="WIDTH"    value={curAdj.scaleW}  min={0.3}  max={3}   step={0.05} onChange={v => setAdj("scaleW",  v)} fmt={v => `${v.toFixed(2)}×`} />
//           <SliderRow label="HEIGHT"   value={curAdj.scaleH}  min={0.3}  max={3}   step={0.05} onChange={v => setAdj("scaleH",  v)} fmt={v => `${v.toFixed(2)}×`} />
//           <SliderRow label="MOVE L/R" value={curAdj.offsetX} min={-150} max={150} step={1}    onChange={v => setAdj("offsetX", v)} fmt={v => `${v > 0 ? "+" : ""}${v}px`} />
//           <SliderRow label="MOVE U/D" value={curAdj.offsetY} min={-150} max={150} step={1}    onChange={v => setAdj("offsetY", v)} fmt={v => `${v > 0 ? "+" : ""}${v}px`} />
//           <SliderRow label="ROTATION" value={curAdj.rotate}  min={-30}  max={30}  step={0.5}  onChange={v => setAdj("rotate",  v)} fmt={v => `${v > 0 ? "+" : ""}${v.toFixed(1)}°`} />
//         </Section>

//         {/* ── Scene filters ── */}
//         <Section title="SCENE FILTERS" icon="🎨">
//           <SliderRow label="BRIGHTNESS" value={brightness} min={0} max={200} step={1} onChange={setBrightness} fmt={v => `${v}%`} />
//           <SliderRow label="CONTRAST"   value={contrast}   min={0} max={200} step={1} onChange={setContrast}   fmt={v => `${v}%`} />
//           <SliderRow label="SATURATION" value={saturate}   min={0} max={200} step={1} onChange={setSaturate}   fmt={v => `${v}%`} />
//         </Section>

//       </div>
//     </div>
//   );
// };

// export default TryOn








// import React, { useRef, useEffect, useState, useCallback } from "react";

// const DEFAULT_ADJ = { scaleW: 1,   scaleH: 1,    offsetX: 0, offsetY: 8,  rotate: 0 };
// const AVIATOR_ADJ = { scaleW: 1,   scaleH: 1.18, offsetX: 0, offsetY: 18, rotate: 0 };
// const ROUND_ADJ   = { scaleW: 1,   scaleH: 0.85, offsetX: 0, offsetY: 6,  rotate: 0 };

// const GLASS_OPTIONS = [
//   { id: "/glass1.png",  name: "Classic",      price: "PKR 4,500", emoji: "👓", sizes: [{ label:"XL", scale:1.10, mobileScale:0.65 }] },
//   { id: "/glass2.png",  name: "Aviator",      price: "PKR 5,200", emoji: "🕶️", sizes: [{ label:"L",  scale:1.15, mobileScale:1.00 }] },
//   { id: "/glass3.png",  name: "Sport",        price: "PKR 3,800", emoji: "🥽", sizes: [{ label:"L",  scale:1.15, mobileScale:1.00 }] },
//   { id: "/glass4.png",  name: "Round",        price: "PKR 4,900", emoji: "⭕", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass5.png",  name: "Wayfarer",     price: "PKR 4,900", emoji: "🕶️", sizes: [{ label:"L",  scale:1.25, mobileScale:0.98 }] },
//   { id: "/glass6.png",  name: "Vintage",      price: "PKR 4,900", emoji: "🪩", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass7.png",  name: "Clubmaster",   price: "PKR 4,900", emoji: "🔲", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
//   { id: "/glass8.png",  name: "Cat Eye",      price: "PKR 4,900", emoji: "😼", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
//   { id: "/glass9.png",  name: "Shield",       price: "PKR 4,900", emoji: "🛡️", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass10.png", name: "Oval",         price: "PKR 4,900", emoji: "🥚", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass11.png", name: "Square",       price: "PKR 4,900", emoji: "⬛", sizes: [{ label:"S",  scale:0.75, mobileScale:0.50 }] },
//   { id: "/glass12.png", name: "Hexagonal",    price: "PKR 4,900", emoji: "⬡", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass13.png", name: "Geometric",    price: "PKR 4,900", emoji: "🔷", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass14.png", name: "Steampunk",    price: "PKR 4,900", emoji: "⚙️", sizes: [{ label:"S",  scale:0.95, mobileScale:0.50 }] },
//   { id: "/glass15.png", name: "Sports Pro",   price: "PKR 4,900", emoji: "🏃", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass16.png", name: "Retro",        price: "PKR 4,900", emoji: "🎞️", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass17.png", name: "Modern",       price: "PKR 4,900", emoji: "✨", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass18.png", name: "Luxury",       price: "PKR 4,900", emoji: "💎", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass19.png", name: "Designer",     price: "PKR 4,900", emoji: "🎨", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass20.png", name: "Classic II",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass21.png", name: "Classic III",  price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass22.png", name: "Classic IV",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.05, mobileScale:0.95 }] },
//   { id: "/glass23.png", name: "Classic V",    price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass24.png", name: "Classic VI",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"S",  scale:0.85, mobileScale:0.50 }] },
//   { id: "/glass25.png", name: "Classic VII",  price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass26.png", name: "Classic VIII", price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass27.png", name: "Classic IX",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass28.png", name: "Classic X",    price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass29.png", name: "Classic XI",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.25, mobileScale:0.95 }] },
//   { id: "/glass30.png", name: "Classic XII",  price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass31.png", name: "Classic 31",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass32.png", name: "Classic 32",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass33.png", name: "Classic 33",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass34.png", name: "Classic 34",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass35.png", name: "Classic 35",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.10, mobileScale:0.75 }] },
//   { id: "/glass36.png", name: "Classic 36",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass37.png", name: "Classic 37",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass38.png", name: "Classic 38",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
//   { id: "/glass39.png", name: "Classic 39",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass40.png", name: "Classic 40",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass41.png", name: "Classic 41",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass42.png", name: "Classic 42",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"S",  scale:0.95, mobileScale:0.50 }] },
//   { id: "/glass43.png", name: "Classic 43",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass44.png", name: "Classic 44",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass45.png", name: "Classic 45",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
//   { id: "/glass46.png", name: "Classic 46",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.40, mobileScale:1.10 }] },
//   { id: "/glass47.png", name: "Classic 47",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.20, mobileScale:1.10 }] },
//   { id: "/glass48.png", name: "Classic 48",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass49.png", name: "Classic 49",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
// ];

// const getIsMobile = () =>
//   typeof window !== "undefined" &&
//   (window.innerWidth < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

// const getMobileSizes = () => {
//   // FIX 7: Detect landscape and swap dims so canvas coordinate space matches CSS display
//   const landscape = typeof window !== "undefined" && window.innerWidth > window.innerHeight;
//   const isLowEnd = typeof window !== "undefined" &&
//     (window.innerWidth <= 360 || navigator.deviceMemory <= 4);
//   if (isLowEnd) {
//     return landscape
//       ? { camW: 480, camH: 360, canvasW: 480, canvasH: 360 }
//       : { camW: 360, camH: 480, canvasW: 360, canvasH: 480 };
//   }
//   return landscape
//     ? { camW: 640, camH: 480, canvasW: 640, canvasH: 480 }
//     : { camW: 480, camH: 640, canvasW: 480, canvasH: 640 };
// };

// const getSizeScale = (sizeObj, mobile) => {
//   if (!sizeObj) return 1;
//   return mobile ? (sizeObj.mobileScale ?? sizeObj.scale) : sizeObj.scale;
// };

// const MOBILE_EMA_ALPHA   = 0.55;
// const DESKTOP_EMA_ALPHA  = 0.50;
// const MOBILE_DEADZONE    = 1.2;
// const MOBILE_FPS         = 24;
// const MOBILE_FRAME_INT   = 1000 / MOBILE_FPS;

// const DESKTOP_CAM_W      = 1280;
// const DESKTOP_CAM_H      = 720;
// const DESKTOP_CANVAS_W   = 1280;
// const DESKTOP_CANVAS_H   = 720;

// // FIX 3: All beauty values set to 100 so needsFilter check works correctly
// // and no unnecessary filter string is built every frame at neutral settings
// const BEAUTY_B = 100;
// const BEAUTY_C = 100;
// const BEAUTY_S = 100;

// const LANDMARKS = {
//   LEFT_IRIS_CENTER:    468,
//   RIGHT_IRIS_CENTER:   473,
//   LEFT_EYE_OUTER:       33,
//   RIGHT_EYE_OUTER:     263,
//   LEFT_EYE_INNER:      133,
//   RIGHT_EYE_INNER:     362,
//   LEFT_EYEBROW_LOWER:  [70, 63, 105, 66, 107],
//   RIGHT_EYEBROW_LOWER: [300, 293, 334, 296, 336],
//   NOSE_BRIDGE_TOP:     6,
//   LEFT_FACE_EDGE:      234,
//   RIGHT_FACE_EDGE:     454,
// };

// class LandmarkSmoother {
//   constructor(posAlpha = 0.45, rotAlpha = 0.35) {
//     this.posAlpha = posAlpha;
//     this.rotAlpha = rotAlpha;
//     this.prev = null;
//   }
//   smooth(current, deadzone = 0) {
//     if (!this.prev) { this.prev = { ...current }; return { ...current }; }
//     const result = {};
//     for (const key of Object.keys(current)) {
//       const alpha = key === "angle" ? this.rotAlpha : this.posAlpha;
//       const delta = current[key] - this.prev[key];
//       result[key] = (deadzone > 0 && Math.abs(delta) < deadzone)
//         ? this.prev[key]
//         : this.prev[key] + alpha * delta;
//     }
//     this.prev = { ...result };
//     return result;
//   }
//   reset() { this.prev = null; }
// }

// function extractFaceGeometry(lm, W, H, useIris = true) {
//   const px = (idx) => ({ x: lm[idx].x * W, y: lm[idx].y * H, z: lm[idx].z ?? 0 });

//   const avgPx = (indices) => {
//     const pts = indices.map(i => px(i));
//     return {
//       x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
//       y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
//     };
//   };
//   const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

//   const leftEyeOut     = px(LANDMARKS.LEFT_EYE_OUTER);
//   const rightEyeOut    = px(LANDMARKS.RIGHT_EYE_OUTER);
//   const leftBrowLower  = avgPx(LANDMARKS.LEFT_EYEBROW_LOWER);
//   const rightBrowLower = avgPx(LANDMARKS.RIGHT_EYEBROW_LOWER);
//   const noseBridgeTop  = px(LANDMARKS.NOSE_BRIDGE_TOP);

//   let leftIris, rightIris;
//   if (useIris && lm.length > 473) {
//     leftIris  = px(LANDMARKS.LEFT_IRIS_CENTER);
//     rightIris = px(LANDMARKS.RIGHT_IRIS_CENTER);
//   } else {
//     const leftInner  = px(LANDMARKS.LEFT_EYE_INNER);
//     const rightInner = px(LANDMARKS.RIGHT_EYE_INNER);
//     leftIris  = { x: (leftEyeOut.x + leftInner.x) / 2, y: (leftEyeOut.y + leftInner.y) / 2, z: 0 };
//     rightIris = { x: (rightEyeOut.x + rightInner.x) / 2, y: (rightEyeOut.y + rightInner.y) / 2, z: 0 };
//   }

//   const browMidLower = {
//     x: (leftBrowLower.x + rightBrowLower.x) / 2,
//     y: (leftBrowLower.y + rightBrowLower.y) / 2,
//   };

//   const eyeSpan = dist(leftEyeOut, rightEyeOut);

//   const angleIris       = Math.atan2(rightIris.y - leftIris.y, rightIris.x - leftIris.x);
//   const angleEyeCorners = Math.atan2(rightEyeOut.y - leftEyeOut.y, rightEyeOut.x - leftEyeOut.x);
//   const angleBrow       = Math.atan2(rightBrowLower.y - leftBrowLower.y, rightBrowLower.x - leftBrowLower.x);
//   const angle = angleEyeCorners * 0.6 + angleBrow * 0.3 + angleIris * 0.1;

//   const irisY   = (leftIris.y + rightIris.y) / 2;
//   const centerX = (leftIris.x + rightIris.x) / 2;
//   const centerY = browMidLower.y * 0.25 + noseBridgeTop.y * 0.55 + irisY * 0.20;

//   // FIX 5: Scale up eyeSpan on mobile to compensate for narrower lid-corner span
//   // (no refined landmarks → eye corners are ~30% narrower than real face width)
//   const spanMult      = useIris ? 1.0 : 1.35;
//   const glassesWidth  = eyeSpan * 2.0 * spanMult;
//   const glassesHeight = eyeSpan * 0.75 * spanMult;

//   const avgZ       = (leftIris.z + rightIris.z + (noseBridgeTop.z ?? 0)) / 3;
//   const depthScale = Math.max(0.92, Math.min(1.08, 1 + (-avgZ * 0.6)));

//   return { centerX, centerY, angle, glassesWidth, glassesHeight, depthScale };
// }

// const C = {
//   primary:        "#E87F24",
//   accent:         "#73A5CA",
//   bg:             "#FEFDDF",
//   surface:        "#F5F3C7",
//   text:           "#1E293B",
//   primary12:      "rgba(232,127,36,0.12)",
//   primary20:      "rgba(232,127,36,0.20)",
//   primary25:      "rgba(232,127,36,0.25)",
//   primary30:      "rgba(232,127,36,0.30)",
//   primary40:      "rgba(232,127,36,0.40)",
//   accent12:       "rgba(115,165,202,0.12)",
//   accent20:       "rgba(115,165,202,0.20)",
//   accent28:       "rgba(115,165,202,0.28)",
//   text55:         "rgba(30,41,59,0.55)",
//   text30:         "rgba(30,41,59,0.30)",
//   text12:         "rgba(30,41,59,0.12)",
//   text06:         "rgba(30,41,59,0.06)",
//   glassBg:        "rgba(254,253,223,0.65)",
//   glassBorder:    "rgba(255,255,255,0.70)",
//   surfaceBorder:  "rgba(255,255,255,0.85)",
//   white15:        "rgba(255,255,255,0.15)",
//   white08:        "rgba(255,255,255,0.08)",
//   gradPrimary:    "linear-gradient(135deg, #E87F24, #F5A623)",
//   gradPrimaryText:"linear-gradient(135deg, #F5A623, #E87F24)",
//   gradBg: `
//     radial-gradient(ellipse 60% 50% at 80% 10%, rgba(232,127,36,0.13) 0%, transparent 60%),
//     radial-gradient(ellipse 50% 40% at 10% 80%, rgba(115,165,202,0.12) 0%, transparent 55%),
//     #FEFDDF
//   `,
// };

// const glassPill = {
//   borderRadius: 100,
//   backdropFilter: "blur(14px)",
//   WebkitBackdropFilter: "blur(14px)",
// };

// const Section = ({ title, icon, defaultOpen = false, children }) => {
//   const [open, setOpen] = useState(defaultOpen);
//   return (
//     <div style={{
//       borderRadius: 16, border: `1px solid ${C.glassBorder}`, overflow: "hidden",
//       background: C.glassBg, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
//       boxShadow: `0 2px 8px ${C.text06}`,
//     }}>
//       <button
//         onClick={() => setOpen(o => !o)}
//         aria-expanded={open}
//         aria-label={`${open ? "Collapse" : "Expand"} ${title}`}
//         style={{
//           width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
//           padding: "13px 16px", background: "rgba(254,253,223,0.50)", border: "none", cursor: "pointer",
//           borderBottom: open ? `1px solid ${C.glassBorder}` : "none",
//         }}
//       >
//         <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: C.primary }}>
//           <span style={{ fontSize: 13 }} aria-hidden="true">{icon}</span>{title}
//         </span>
//         <span aria-hidden="true" style={{
//           fontSize: 9, color: C.text55,
//           transform: open ? "rotate(180deg)" : "rotate(0)",
//           transition: "transform 0.22s ease", display: "inline-block",
//         }}>▼</span>
//       </button>
//       {open && <div style={{ padding: "16px", background: "rgba(245,243,199,0.40)" }}>{children}</div>}
//     </div>
//   );
// };

// const SliderRow = ({ label, value, min, max, step, onChange, fmt }) => (
//   <div style={{ marginBottom: 18 }}>
//     <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
//       <label style={{ fontSize: 10, color: C.text55, fontWeight: 600, letterSpacing: "1px" }}>{label}</label>
//       <span style={{ fontSize: 11, fontWeight: 700, background: C.gradPrimaryText, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
//         {fmt(value)}
//       </span>
//     </div>
//     <input
//       type="range" min={min} max={max} step={step} value={value}
//       aria-label={label}
//       onChange={e => onChange(Number(e.target.value))}
//       style={{ width: "100%", height: 3, background: C.primary20, borderRadius: 4, appearance: "none", WebkitAppearance: "none", cursor: "pointer" }}
//     />
//   </div>
// );

// const TryOn = () => {
//   const videoRef          = useRef(null);
//   const canvasRef         = useRef(null);
//   const imgRef            = useRef(new Image());
//   const trackRef          = useRef({ hasLandmarks: false });
//   const rafIdRef          = useRef(null);
//   const lastFrameRef      = useRef(0);
//   const touchStartX       = useRef(null);
//   const touchStartY       = useRef(null);
//   const cameraRdyRef      = useRef(false);
//   const glassesRef        = useRef("/glass1.png");
//   const adjRef            = useRef({});
//   const pendingResultRef  = useRef(null);
//   const camStreamRef      = useRef(null);
//   const camInstanceRef    = useRef(null);
//   const cachedGlassObjRef = useRef(null);
//   const ctxRef            = useRef(null);
//   const resultVersionRef  = useRef(0);
//   // FIX 4: Start at -1 so first frame (version=0) always draws
//   const lastDrawnVersionRef = useRef(-1);

//   const [isMobile, setIsMobile] = useState(() => getIsMobile());
//   const isMobileRef = useRef(isMobile);
//   const [mobileSizes, setMobileSizes] = useState(() => getMobileSizes());

//   useEffect(() => {
//     const onResize = () => {
//       const m = getIsMobile();
//       isMobileRef.current = m;
//       setIsMobile(m);
//       // FIX 8: Invalidate cached context on resize so stale context is not reused
//       ctxRef.current = null;
//       if (m) setMobileSizes(getMobileSizes());
//     };
//     window.addEventListener("resize", onResize, { passive: true });
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   const smootherRef = useRef(null);
//   if (!smootherRef.current) {
//     smootherRef.current = new LandmarkSmoother(
//       isMobile ? MOBILE_EMA_ALPHA : DESKTOP_EMA_ALPHA,
//       isMobile ? 0.28 : 0.40
//     );
//   }

//   const [glasses, setGlasses]         = useState("/glass1.png");
//   const [cameraReady, setCameraReady] = useState(false);
//   const [brightness, setBrightness]   = useState(100);
//   const [contrast,   setContrast]     = useState(100);
//   const [saturate,   setSaturate]     = useState(100);
//   const [mpError,    setMpError]      = useState(null);

//   const brightnessRef = useRef(100);
//   const contrastRef   = useRef(100);
//   const saturateRef   = useRef(100);

//   useEffect(() => { brightnessRef.current = brightness; }, [brightness]);
//   useEffect(() => { contrastRef.current   = contrast;   }, [contrast]);
//   useEffect(() => { saturateRef.current   = saturate;   }, [saturate]);

//   const adjustmentsRef = useRef(
//     Object.fromEntries(GLASS_OPTIONS.map(g => {
//       if (g.id === "/glass2.png") return [g.id, { ...AVIATOR_ADJ }];
//       if (g.id === "/glass4.png") return [g.id, { ...ROUND_ADJ }];
//       return [g.id, { ...DEFAULT_ADJ }];
//     }))
//   );
//   const [adjUIState, setAdjUIState] = useState(() => adjustmentsRef.current["/glass1.png"]);

//   useEffect(() => {
//     glassesRef.current        = glasses;
//     adjRef.current            = adjustmentsRef.current;
//     cachedGlassObjRef.current = GLASS_OPTIONS.find(g => g.id === glasses) || null;
//     setAdjUIState({ ...(adjustmentsRef.current[glasses] || DEFAULT_ADJ) });
//   }, [glasses]);

//   const setAdj = useCallback((key, val) => {
//     const id = glassesRef.current;
//     adjustmentsRef.current = {
//       ...adjustmentsRef.current,
//       [id]: { ...(adjustmentsRef.current[id] || DEFAULT_ADJ), [key]: val },
//     };
//     adjRef.current = adjustmentsRef.current;
//     setAdjUIState(prev => ({ ...prev, [key]: val }));
//   }, []);

//   const resetAdj = useCallback(() => {
//     const id = glassesRef.current;
//     const defaults =
//       id === "/glass2.png" ? { ...AVIATOR_ADJ } :
//       id === "/glass4.png" ? { ...ROUND_ADJ }   : { ...DEFAULT_ADJ };
//     adjustmentsRef.current = { ...adjustmentsRef.current, [id]: defaults };
//     adjRef.current = adjustmentsRef.current;
//     setAdjUIState({ ...defaults });
//   }, []);

//   useEffect(() => {
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.src = glasses;
//     imgRef.current = img;
//   }, [glasses]);

//   // ── Draw loop ─────────────────────────────────────────────────
//   const drawLoop = useCallback(() => {
//     rafIdRef.current = requestAnimationFrame(drawLoop);

//     const mobile = isMobileRef.current;
//     const now    = performance.now();

//     if (mobile && now - lastFrameRef.current < MOBILE_FRAME_INT) return;
//     lastFrameRef.current = now;

//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     if (!ctxRef.current) {
//       ctxRef.current = canvas.getContext("2d", { alpha: false, willReadFrequently: false });
//     }
//     const ctx = ctxRef.current;
//     if (!ctx) return;

//     const result = pendingResultRef.current;
//     if (!result?.image || resultVersionRef.current === lastDrawnVersionRef.current) return;

//     const W = canvas.width, H = canvas.height;

//     // Draw mirrored camera frame
//     if (mobile) {
//       ctx.filter = "none";
//     } else {
//       const userB = brightnessRef.current;
//       const userC = contrastRef.current;
//       const userS = saturateRef.current;
//       const needsFilter = userB !== 100 || userC !== 100 || userS !== 100
//         || BEAUTY_B !== 100 || BEAUTY_C !== 100 || BEAUTY_S !== 100;
//       ctx.filter = needsFilter
//         ? `brightness(${BEAUTY_B}%) contrast(${BEAUTY_C}%) saturate(${BEAUTY_S}%) brightness(${userB}%) contrast(${userC}%) saturate(${userS}%)`
//         : "none";
//     }

//     ctx.save();
//     ctx.translate(W, 0);
//     ctx.scale(-1, 1);
//     ctx.drawImage(result.image, 0, 0, W, H);
//     ctx.restore();
//     ctx.filter = "none";

//     if (!result.multiFaceLandmarks?.length) {
//       smootherRef.current.reset();
//       trackRef.current.hasLandmarks = false;
//       lastDrawnVersionRef.current   = resultVersionRef.current;
//       return;
//     }

//     const lm = result.multiFaceLandmarks[0];

//     // useIris=true on desktop (refineLandmarks=true → indices 468/473 exist)
//     // useIris=false on mobile (refineLandmarks=false → use eye-corner midpoint fallback)
//     const geo = extractFaceGeometry(lm, W, H, !mobile);

//     // FIX 1: Mirror the centerX to match the mirrored canvas draw
//     // Landmark X coords are in original (unmirrored) camera space.
//     // Canvas is drawn with scale(-1,1), so we must flip X: mirroredCx = W - centerX
//     const mirroredCx = W - geo.centerX;

//     const sm = smootherRef.current.smooth(
//       {
//         cx:    mirroredCx,
//         cy:    geo.centerY,
//         gw:    geo.glassesWidth,
//         gh:    geo.glassesHeight,
//         angle: geo.angle,
//         ds:    geo.depthScale,
//       },
//       mobile ? MOBILE_DEADZONE : 0
//     );

//     trackRef.current.hasLandmarks = true;

//     const img = imgRef.current;
//     if (!img.complete || !img.naturalWidth) {
//       lastDrawnVersionRef.current = resultVersionRef.current;
//       return;
//     }

//     const glassObj = cachedGlassObjRef.current;
//     const sSc      = glassObj?.sizes?.[0] ? getSizeScale(glassObj.sizes[0], mobile) : 1.0;
//     const adj      = adjRef.current[glassesRef.current] || DEFAULT_ADJ;

//     // Apply per-frame depth scale only on desktop (stable z data)
//     let w = mobile ? sm.gw * adj.scaleW : sm.gw * adj.scaleW * sm.ds;
//     let h = mobile ? sm.gh * adj.scaleH : sm.gh * adj.scaleH * sm.ds;
//     w *= sSc; h *= sSc;

//     // FIX 2: Negate rotation angle because canvas is horizontally mirrored
//     // Without this, head tilt left shows glasses tilted right (reversed)
//     const mirroredAngle = -sm.angle;

//     ctx.save();
//     ctx.translate(sm.cx + adj.offsetX, sm.cy + adj.offsetY);
//     ctx.rotate(mirroredAngle + adj.rotate * Math.PI / 180);
//     ctx.drawImage(img, -w / 2, -h / 2, w, h);
//     ctx.restore();

//     lastDrawnVersionRef.current = resultVersionRef.current;
//   }, []);

//   const onResults = useCallback((results) => {
//     pendingResultRef.current = results;
//     resultVersionRef.current++;
//   }, []);

//   // ── Camera + FaceMesh init ────────────────────────────────────
//   useEffect(() => {
//     if (!window.FaceMesh) {
//       setMpError("MediaPipe FaceMesh not found. Add the MediaPipe <script> tag to index.html.");
//       return;
//     }

//     const mobile = isMobileRef.current;
//     let camW, camH, canvasW, canvasH;

//     if (mobile) {
//       const sizes = mobileSizes;
//       camW    = sizes.camW;
//       camH    = sizes.camH;
//       canvasW = sizes.canvasW;
//       canvasH = sizes.canvasH;
//     } else {
//       camW    = DESKTOP_CAM_W;
//       camH    = DESKTOP_CAM_H;
//       canvasW = DESKTOP_CANVAS_W;
//       canvasH = DESKTOP_CANVAS_H;
//     }

//     if (canvasRef.current) {
//       canvasRef.current.width  = canvasW;
//       canvasRef.current.height = canvasH;
//       // FIX 8: Always clear cached context when canvas is resized
//       ctxRef.current = null;
//     }

//     const faceMesh = new window.FaceMesh({
//       locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/${file}`,
//     });
//     faceMesh.setOptions({
//       maxNumFaces:            1,
//       refineLandmarks:        !mobile,
//       minDetectionConfidence: mobile ? 0.35 : 0.50,
//       minTrackingConfidence:  mobile ? 0.30 : 0.50,
//     });
//     faceMesh.onResults(onResults);

//     rafIdRef.current = requestAnimationFrame(drawLoop);

//     navigator.mediaDevices.getUserMedia({
//       video: {
//         facingMode: "user",
//         width:      { ideal: camW },
//         height:     { ideal: camH },
//         frameRate:  { ideal: mobile ? 30 : 60 },
//       },
//       audio: false,
//     })
//     .then(stream => {
//       camStreamRef.current = stream;
//       const video = videoRef.current;
//       if (!video) return;

//       video.srcObject = stream;
//       video.onloadedmetadata = () => {
//         video.play().then(() => {
//           cameraRdyRef.current = true;
//           setCameraReady(true);

//           const sendFrame = async () => {
//             // FIX 6: Check cameraRdyRef BEFORE scheduling next RAF
//             // so that if cleanup fires between the check and the send, we stop cleanly
//             if (!cameraRdyRef.current) return;
//             try {
//               if (video.readyState >= 2) {
//                 await faceMesh.send({ image: video });
//               }
//             } catch (_) { /* ignore send errors on cleanup */ }
//             if (cameraRdyRef.current) {
//               camInstanceRef.current = requestAnimationFrame(sendFrame);
//             }
//           };
//           camInstanceRef.current = requestAnimationFrame(sendFrame);
//         }).catch(err => {
//           console.error("Video play failed:", err);
//           setMpError("Could not start video playback. Please reload and allow camera access.");
//         });
//       };
//     })
//     .catch(err => {
//       console.error("Camera failed:", err);
//       setMpError("Camera access denied or not available. Please allow camera permissions and reload.");
//     });

//     return () => {
//       // FIX 9: Set cameraRdyRef=false FIRST so any in-flight sendFrame RAF
//       // sees it and stops before faceMesh.close() is called
//       cameraRdyRef.current = false;

//       if (rafIdRef.current)       cancelAnimationFrame(rafIdRef.current);
//       if (camInstanceRef.current) cancelAnimationFrame(camInstanceRef.current);

//       if (camStreamRef.current) {
//         camStreamRef.current.getTracks().forEach(t => t.stop());
//         camStreamRef.current = null;
//       }
//       if (videoRef.current?.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach(t => t.stop());
//         videoRef.current.srcObject = null;
//       }
//       // Now safe to close — no more sendFrame calls can reach faceMesh
//       faceMesh.close();
//     };
//   }, [drawLoop, onResults, mobileSizes]);

//   const css = `
//     @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600&display=swap');
//     *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//     input[type="range"] { -webkit-appearance: none; appearance: none; background: transparent; }
//     input[type="range"]::-webkit-slider-runnable-track {
//       background: linear-gradient(90deg, rgba(232,127,36,0.30), rgba(232,127,36,0.10));
//       height: 3px; border-radius: 3px;
//     }
//     input[type="range"]::-webkit-slider-thumb {
//       -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%;
//       background: radial-gradient(circle at 38% 35%, #F5A623, #E87F24);
//       cursor: pointer; margin-top: -6.5px;
//       border: 2px solid rgba(254,253,223,0.90);
//       box-shadow: 0 2px 8px rgba(232,127,36,0.40);
//     }
//     input[type="range"]::-moz-range-thumb {
//       width: 16px; height: 16px; border-radius: 50%;
//       background: radial-gradient(circle at 38% 35%, #F5A623, #E87F24);
//       cursor: pointer; border: 2px solid rgba(254,253,223,0.90);
//       box-shadow: 0 2px 8px rgba(232,127,36,0.40);
//     }
//     .right-panel { scrollbar-width: thin; scrollbar-color: rgba(232,127,36,0.40) rgba(232,127,36,0.08); }
//     ::-webkit-scrollbar { width: 3px; height: 3px; }
//     ::-webkit-scrollbar-track { background: rgba(232,127,36,0.06); border-radius: 4px; }
//     ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #E87F24, #F5A623); border-radius: 4px; }
//     .frame-scroller { scroll-behavior: smooth; -webkit-overflow-scrolling: touch; scrollbar-width: none; -ms-overflow-style: none; }
//     .frame-scroller::-webkit-scrollbar { display: none; }
//     .frame-card { transition: transform 0.2s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s ease; -webkit-tap-highlight-color: transparent; }
//     .frame-card:hover { transform: translateY(-2px) scale(1.03); }
//     .frame-card:active { transform: scale(0.96); }
//     @keyframes spin    { to { transform: rotate(360deg); } }
//     @keyframes fadeIn  { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
//     @keyframes pulse   { 0%,100%{ opacity:0.55 } 50%{ opacity:1 } }
//     .spinner {
//       width: 44px; height: 44px; border-radius: 50%;
//       border: 2px solid rgba(115,165,202,0.20);
//       border-top-color: #E87F24;
//       animation: spin 0.85s linear infinite;
//     }
//     .spinner-inner {
//       width: 30px; height: 30px; border-radius: 50%;
//       border: 1.5px solid rgba(232,127,36,0.15);
//       border-bottom-color: #F5A623;
//       animation: spin 1.2s linear infinite reverse;
//       position: absolute; top: 7px; left: 7px;
//     }
//     .ar-dot {
//       width: 7px; height: 7px; border-radius: 50%;
//       background: #73A5CA;
//       box-shadow: 0 0 8px rgba(115,165,202,0.70);
//       animation: pulse 2s ease infinite;
//       display: inline-block;
//       margin-right: 6px;
//       flex-shrink: 0;
//     }
//     .frame-card:focus-visible { outline: 2px solid #E87F24; outline-offset: 2px; }
//   `;

//   if (mpError) return (
//     <div role="alert" style={{
//       display: "flex", alignItems: "center", justifyContent: "center",
//       height: "100vh", background: C.bg, color: "#c2410c",
//       fontFamily: "monospace", padding: 24, textAlign: "center", fontSize: 13,
//     }}>
//       ⚠️ {mpError}
//     </div>
//   );

//   const currentGlass = GLASS_OPTIONS.find(g => g.id === glasses);
//   const curAdj = adjUIState;

//   // ══════════════════════════════════════════════════════════════
//   // MOBILE LAYOUT
//   // ══════════════════════════════════════════════════════════════
//   if (isMobile) {
//     const idx = GLASS_OPTIONS.findIndex(g => g.id === glasses);
//     const { canvasW, canvasH } = mobileSizes;

//     const onTouchStart = (e) => {
//       touchStartX.current = e.touches[0].clientX;
//       touchStartY.current = e.touches[0].clientY;
//     };
//     const onTouchEnd = (e) => {
//       if (touchStartX.current === null) return;
//       const dx = e.changedTouches[0].clientX - touchStartX.current;
//       const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
//       if (Math.abs(dx) > 50 && Math.abs(dx) > dy) {
//         const cur = GLASS_OPTIONS.findIndex(g => g.id === glassesRef.current);
//         if (dx < 0 && cur < GLASS_OPTIONS.length - 1) setGlasses(GLASS_OPTIONS[cur + 1].id);
//         if (dx > 0 && cur > 0)                        setGlasses(GLASS_OPTIONS[cur - 1].id);
//       }
//       touchStartX.current = null;
//       touchStartY.current = null;
//     };

//     return (
//       <div
//         style={{ position:"fixed", inset:0, background:"#000", fontFamily:"'Space Grotesk',sans-serif", color:"#fff", overflow:"hidden", touchAction:"pan-y" }}
//         onTouchStart={onTouchStart}
//         onTouchEnd={onTouchEnd}
//       >
//         <style>{css}</style>
//         <video
//           ref={videoRef}
//           style={{
//             position: "absolute",
//             left: "-100%",
//             top: "-100%",
//             width: "1px",
//             height: "1px",
//             opacity: 0,
//             pointerEvents: "none",
//           }}
//           autoPlay
//           playsInline
//           muted
//         />

//         <canvas
//           ref={canvasRef}
//           width={canvasW}
//           height={canvasH}
//           style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", display:"block" }}
//           aria-label="AR glasses try-on camera view"
//         />

//         {/* Top vignette */}
//         <div style={{
//           position:"absolute", top:0, left:0, right:0, height:"22%",
//           background:"linear-gradient(to bottom, rgba(0,0,0,0.50), transparent)",
//           pointerEvents:"none",
//         }} aria-hidden="true" />

//         {/* AR tracking indicator */}
//         {cameraReady && (
//           <div role="status" aria-live="polite" style={{
//             position:"absolute", top:18, left:16, zIndex:20,
//             display:"flex", alignItems:"center",
//             background:"rgba(0,0,0,0.42)", ...glassPill,
//             border:`1px solid rgba(115,165,202,0.30)`,
//             padding:"5px 12px", animation:"fadeIn 0.35s ease",
//           }}>
//             <span className="ar-dot" aria-hidden="true" />
//             <span style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,0.80)", letterSpacing:"0.5px" }}>Tracking</span>
//           </div>
//         )}

//         {/* Frame name + price chip */}
//         {cameraReady && currentGlass && (
//           <div aria-live="polite" style={{
//             position:"absolute", bottom:176, left:"50%", transform:"translateX(-50%)",
//             zIndex:20, whiteSpace:"nowrap",
//             background:"rgba(0,0,0,0.48)", ...glassPill,
//             border:`1px solid ${C.primary25}`,
//             padding:"7px 20px",
//             display:"flex", alignItems:"center", gap:10,
//             animation:"fadeIn 0.3s ease",
//             boxShadow:`0 4px 20px rgba(0,0,0,0.25), 0 0 20px ${C.primary12}`,
//           }}>
//             <span style={{ fontSize:13, fontWeight:700, color:"rgba(254,253,223,0.95)" }}>{currentGlass.name}</span>
//             <span aria-hidden="true" style={{ width:1, height:11, background:C.primary30, display:"inline-block" }} />
//             <span style={{ fontSize:13, fontWeight:700, background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//               {currentGlass.price}
//             </span>
//           </div>
//         )}

//         {/* Progress dots */}
//         {cameraReady && (
//           <div aria-hidden="true" style={{
//             position:"absolute", bottom:158, left:"50%", transform:"translateX(-50%)",
//             display:"flex", gap:4, zIndex:20,
//           }}>
//             {GLASS_OPTIONS.map((g, i) => (
//               <div key={g.id} style={{
//                 width: i === idx ? 14 : 4, height:4, borderRadius:3,
//                 background: i === idx ? C.primary : C.white15,
//                 transition:"all 0.25s ease",
//               }} />
//             ))}
//           </div>
//         )}

//         {/* Bottom frame scroller */}
//         <div style={{
//           position:"absolute", bottom:0, left:0, right:0, zIndex:20,
//           paddingBottom:"env(safe-area-inset-bottom, 12px)",
//           background:"linear-gradient(to top, rgba(10,5,2,0.96) 55%, transparent 100%)",
//         }}>
//           <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 18px 4px" }}>
//             <span style={{ fontSize:9, fontWeight:700, letterSpacing:"2px", color:"rgba(254,253,223,0.35)", textTransform:"uppercase" }}>Frames</span>
//             <span style={{ fontSize:9, color:"rgba(254,253,223,0.30)" }} aria-live="polite">{idx + 1} / {GLASS_OPTIONS.length}</span>
//           </div>

//           <div
//             className="frame-scroller"
//             role="listbox"
//             aria-label="Select glasses frame"
//             style={{
//               display:"flex", gap:10, padding:"4px 14px 14px",
//               overflowX:"auto", scrollSnapType:"x mandatory",
//             }}
//           >
//             {GLASS_OPTIONS.map(g => {
//               const isA = glasses === g.id;
//               return (
//                 <div
//                   key={g.id}
//                   className="frame-card"
//                   role="option"
//                   aria-selected={isA}
//                   tabIndex={0}
//                   onClick={() => setGlasses(g.id)}
//                   onKeyDown={e => (e.key === "Enter" || e.key === " ") && setGlasses(g.id)}
//                   style={{
//                     flexShrink:0, scrollSnapAlign:"start",
//                     width:64, height:64, borderRadius:16,
//                     background: isA ? "rgba(232,127,36,0.18)" : "rgba(30,20,10,0.70)",
//                     border:`1.5px solid ${isA ? C.primary : "rgba(255,255,255,0.12)"}`,
//                     display:"flex", alignItems:"center", justifyContent:"center",
//                     cursor:"pointer", overflow:"hidden", padding:6,
//                     transform: isA ? "scale(1.08)" : "scale(1)",
//                     backdropFilter:"blur(10px)", WebkitBackdropFilter:"blur(10px)",
//                     boxShadow: isA ? `0 0 20px rgba(232,127,36,0.50), 0 0 36px rgba(245,166,35,0.15)` : "none",
//                     position:"relative",
//                   }}
//                 >
//                   {isA && (
//                     <div aria-hidden="true" style={{
//                       position:"absolute", bottom:4, left:"50%", transform:"translateX(-50%)",
//                       width:5, height:5, borderRadius:"50%",
//                       background:C.primary, boxShadow:`0 0 6px ${C.primary}`,
//                     }} />
//                   )}
//                   <img
//                     src={g.id}
//                     alt={g.name}
//                     loading="lazy"
//                     style={{
//                       width:"100%", height:"80%", objectFit:"contain",
//                       filter: isA ? `drop-shadow(0 0 5px rgba(232,127,36,0.70))` : "brightness(0.55) saturate(0.6)",
//                       transition:"filter 0.2s ease",
//                     }}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {!cameraReady && (
//           <div role="status" aria-label="Initializing camera" style={{
//             position:"absolute", inset:0, zIndex:50,
//             background:`radial-gradient(ellipse 120% 80% at 55% 30%, rgba(232,127,36,0.08) 0%, rgba(10,5,2,0.99) 60%)`,
//             display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:24,
//           }}>
//             <div style={{ position:"relative", width:44, height:44 }}>
//               <div className="spinner" />
//               <div className="spinner-inner" />
//             </div>
//             <div style={{ textAlign:"center" }}>
//               <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:22, fontWeight:800, marginBottom:6, background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//                 VR.OPTICS
//               </div>
//               <div style={{ fontSize:9, fontWeight:700, letterSpacing:"3px", color:C.primary, marginBottom:8 }}>INITIALIZING</div>
//               <div style={{ fontSize:10, color:"rgba(254,253,223,0.40)" }}>Allow camera access to continue</div>
//             </div>
//             <div style={{ fontSize:9, color:"rgba(254,253,223,0.22)", border:`0.5px solid rgba(255,255,255,0.10)`, borderRadius:100, padding:"4px 14px" }}>
//               ← Swipe to browse frames →
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   // ══════════════════════════════════════════════════════════════
//   // DESKTOP LAYOUT
//   // ══════════════════════════════════════════════════════════════
//   return (
//     <div style={{
//       fontFamily: "'Space Grotesk', sans-serif",
//       background: C.gradBg,
//       color: C.text,
//       height: "100vh",
//       display: "flex",
//       overflow: "hidden",
//     }}>
//       <style>{css}</style>

//       {/* Ambient glow */}
//       <div aria-hidden="true" style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
//         <div style={{ position:"absolute", top:"-15%", right:"-8%", width:"52vw", height:"52vw", borderRadius:"50%",
//           background:`radial-gradient(circle, rgba(232,127,36,0.14) 0%, rgba(232,127,36,0.04) 45%, transparent 70%)` }} />
//         <div style={{ position:"absolute", bottom:"-20%", left:"-12%", width:"48vw", height:"48vw", borderRadius:"50%",
//           background:`radial-gradient(circle, rgba(115,165,202,0.12) 0%, rgba(115,165,202,0.03) 45%, transparent 70%)` }} />
//       </div>

//       {/* ── LEFT: Camera (75%) ── */}
//       <div style={{ position:"relative", zIndex:1, flex:"0 0 75%", maxWidth:"75%", padding:20, display:"flex", flexDirection:"column" }}>
//         <div style={{
//           flex:1, position:"relative", borderRadius:22, overflow:"hidden",
//           border:`1px solid ${C.glassBorder}`, background:"#000",
//           boxShadow:`inset 0 0 60px rgba(0,0,0,0.40), 0 0 0 1px rgba(232,127,36,0.08), 0 8px 40px rgba(30,41,59,0.12)`,
//         }}>
//           {cameraReady && (
//             <div role="status" aria-live="polite" style={{
//               position:"absolute", top:16, right:16, zIndex:5,
//               display:"flex", alignItems:"center",
//               background:"rgba(0,0,0,0.42)", ...glassPill,
//               border:`1px solid rgba(115,165,202,0.28)`,
//               padding:"5px 14px", animation:"fadeIn 0.3s ease",
//             }}>
//               <span className="ar-dot" aria-hidden="true" />
//               <span style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,0.80)", letterSpacing:"0.5px" }}>Face Tracking Active</span>
//             </div>
//           )}

//           {/* Selected frame badge */}
//           <div style={{ position:"absolute", bottom:16, left:16, zIndex:5 }}>
//             <div aria-live="polite" style={{
//               background:"rgba(0,0,0,0.52)", ...glassPill,
//               border:`0.5px solid ${C.primary25}`, padding:"8px 20px",
//               boxShadow:`0 4px 20px rgba(0,0,0,0.25), 0 0 16px ${C.primary12}`,
//               display:"flex", alignItems:"center", gap:12,
//             }}>
//               <span style={{ fontSize:9, fontWeight:700, color:"rgba(254,253,223,0.50)", letterSpacing:"1.5px" }}>SELECTED</span>
//               <span aria-hidden="true" style={{ width:1, height:11, background:C.primary30, display:"inline-block" }} />
//               <span style={{ fontSize:13, fontWeight:700, color:"rgba(254,253,223,0.95)" }}>{currentGlass?.name}</span>
//               <span style={{ fontSize:13, fontWeight:700, background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//                 {currentGlass?.price}
//               </span>
//             </div>
//           </div>

//           <video
//             ref={videoRef}
//             style={{
//               position: "absolute",
//               left: "-100%",
//               top: "-100%",
//               width: "1px",
//               height: "1px",
//               opacity: 0,
//               pointerEvents: "none",
//             }}
//             autoPlay
//             playsInline
//             muted
//           />
//           <canvas
//             ref={canvasRef}
//             width={DESKTOP_CANVAS_W}
//             height={DESKTOP_CANVAS_H}
//             aria-label="AR glasses try-on camera view"
//             style={{ display:"block", width:"100%", height:"100%", objectFit:"cover" }}
//           />

//           {!cameraReady && (
//             <div role="status" aria-label="Initializing camera" style={{
//               position:"absolute", inset:0, borderRadius:22, zIndex:30,
//               background:`radial-gradient(ellipse 100% 60% at 55% 30%, rgba(232,127,36,0.08) 0%, rgba(254,253,223,0.97) 55%)`,
//               display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:28,
//             }}>
//               <div style={{ position:"relative", width:50, height:50 }}>
//                 <div className="spinner" />
//                 <div className="spinner-inner" />
//               </div>
//               <div style={{ textAlign:"center" }}>
//                 <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, fontWeight:700, letterSpacing:"3px",
//                   background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:8 }}>
//                   INITIALIZING CAMERA
//                 </div>
//                 <div style={{ fontSize:12, color:C.text55 }}>Please allow camera access to continue</div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ── RIGHT: Controls panel (25%) ── */}
//       <div
//         className="right-panel"
//         role="complementary"
//         aria-label="Frame selection and controls"
//         style={{
//           position:"relative", zIndex:1,
//           flex:"0 0 25%", maxWidth:"25%",
//           overflowY:"auto",
//           padding:"20px 16px 20px 4px",
//           display:"flex", flexDirection:"column", gap:12,
//           borderLeft:`1px solid ${C.glassBorder}`,
//           background:`linear-gradient(180deg, rgba(245,243,199,0.60) 0%, rgba(254,253,223,0.80) 100%)`,
//           backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
//         }}
//       >
//         <div style={{ padding:"4px 4px 2px" }}>
//           <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:18, fontWeight:700, color:C.text, marginBottom:3 }}>
//             Choose Frame
//           </div>
//           <div style={{ fontSize:10, letterSpacing:"1.5px", color:C.text30, fontWeight:600, textTransform:"uppercase" }}>
//             {GLASS_OPTIONS.length} styles available
//           </div>
//         </div>

//         <div
//           role="listbox"
//           aria-label="Select glasses frame"
//           style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:8 }}
//         >
//           {GLASS_OPTIONS.map(g => {
//             const isA = glasses === g.id;
//             return (
//               <div
//                 key={g.id}
//                 className="frame-card"
//                 role="option"
//                 aria-selected={isA}
//                 tabIndex={0}
//                 onClick={() => setGlasses(g.id)}
//                 onKeyDown={e => (e.key === "Enter" || e.key === " ") && setGlasses(g.id)}
//                 style={{
//                   borderRadius:14,
//                   background: isA ? C.primary12 : "rgba(254,253,223,0.55)",
//                   border:`1px solid ${isA ? C.primary : C.surfaceBorder}`,
//                   padding:"10px 6px",
//                   display:"flex", flexDirection:"column", alignItems:"center", gap:5,
//                   cursor:"pointer",
//                   boxShadow: isA ? `0 0 20px rgba(232,127,36,0.20), 0 4px 12px rgba(30,41,59,0.08)` : `0 1px 4px ${C.text06}`,
//                   transition:"all 0.22s cubic-bezier(0.22,1,0.36,1)",
//                   backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)",
//                 }}
//               >
//                 <div style={{
//                   width:"100%", height:48,
//                   display:"flex", alignItems:"center", justifyContent:"center",
//                   borderRadius:10, overflow:"hidden",
//                   background: isA ? C.primary12 : C.text06,
//                 }}>
//                   <img
//                     src={g.id}
//                     alt={g.name}
//                     loading="lazy"
//                     crossOrigin="anonymous"
//                     style={{
//                       width:"90%", height:"90%", objectFit:"contain",
//                       filter: isA ? `drop-shadow(0 0 5px rgba(232,127,36,0.55))` : "brightness(0.80) saturate(0.75)",
//                       transition:"filter 0.2s ease",
//                     }}
//                   />
//                 </div>
//                 <div style={{ fontSize:9, fontWeight:700, textAlign:"center", lineHeight:1.2, color: isA ? C.text : C.text55 }}>
//                   {g.name}
//                 </div>
//                 <div style={{
//                   fontSize:8, fontWeight:700,
//                   background: isA ? C.gradPrimary : "none",
//                   WebkitBackgroundClip: isA ? "text" : "unset",
//                   WebkitTextFillColor: isA ? "transparent" : C.primary,
//                   color: isA ? "transparent" : C.primary,
//                 }}>
//                   {g.price}
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <Section title="FRAME CALIBRATION" icon="⚙️">
//           <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:14 }}>
//             <button
//               onClick={resetAdj}
//               aria-label="Reset frame calibration to defaults"
//               style={{
//                 fontSize:9, fontWeight:700, color:C.primary,
//                 background:C.primary12, border:`0.5px solid ${C.primary25}`,
//                 padding:"5px 14px", borderRadius:100, cursor:"pointer",
//                 letterSpacing:"0.5px", transition:"background 0.15s",
//               }}
//             >Reset</button>
//           </div>
//           <SliderRow label="WIDTH"    value={curAdj.scaleW}  min={0.3}  max={3}   step={0.05} onChange={v => setAdj("scaleW",  v)} fmt={v => `${v.toFixed(2)}×`} />
//           <SliderRow label="HEIGHT"   value={curAdj.scaleH}  min={0.3}  max={3}   step={0.05} onChange={v => setAdj("scaleH",  v)} fmt={v => `${v.toFixed(2)}×`} />
//           <SliderRow label="MOVE L/R" value={curAdj.offsetX} min={-150} max={150} step={1}    onChange={v => setAdj("offsetX", v)} fmt={v => `${v > 0 ? "+" : ""}${v}px`} />
//           <SliderRow label="MOVE U/D" value={curAdj.offsetY} min={-150} max={150} step={1}    onChange={v => setAdj("offsetY", v)} fmt={v => `${v > 0 ? "+" : ""}${v}px`} />
//           <SliderRow label="ROTATION" value={curAdj.rotate}  min={-30}  max={30}  step={0.5}  onChange={v => setAdj("rotate",  v)} fmt={v => `${v > 0 ? "+" : ""}${v.toFixed(1)}°`} />
//         </Section>

//         <Section title="SCENE FILTERS" icon="🎨">
//           <SliderRow label="BRIGHTNESS" value={brightness} min={50}  max={160} step={1} onChange={setBrightness} fmt={v => `${v}%`} />
//           <SliderRow label="CONTRAST"   value={contrast}   min={60}  max={160} step={1} onChange={setContrast}   fmt={v => `${v}%`} />
//           <SliderRow label="SATURATION" value={saturate}   min={50}  max={160} step={1} onChange={setSaturate}   fmt={v => `${v}%`} />
//         </Section>
//       </div>
//     </div>
//   );
// };

// export default TryOn;












// import React, { useRef, useEffect, useState, useCallback } from "react";

// // ============================================================
// // GLASS ADJUSTMENTS & OPTIONS
// // ============================================================
// const DEFAULT_ADJ = { scaleW: 1, scaleH: 1, offsetX: 0, offsetY: 8, rotate: 0 };
// const AVIATOR_ADJ = { scaleW: 1, scaleH: 1.18, offsetX: 0, offsetY: 18, rotate: 0 };
// const ROUND_ADJ   = { scaleW: 1, scaleH: 0.85, offsetX: 0, offsetY: 6,  rotate: 0 };

// const GLASS_OPTIONS = [
//   { id: "/glass1.png",  name: "Classic",    price: "PKR 4,500", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass2.png",  name: "Aviator",    price: "PKR 5,200", emoji: "🕶️", aspectRatio: 0.45 },
//   { id: "/glass3.png",  name: "Sport",      price: "PKR 3,800", emoji: "🥽", aspectRatio: 0.50 },
//   { id: "/glass4.png",  name: "Round",      price: "PKR 4,900", emoji: "⭕", aspectRatio: 0.70 },
//   { id: "/glass5.png",  name: "Wayfarer",   price: "PKR 4,900", emoji: "🕶️", aspectRatio: 0.50 },
//   { id: "/glass6.png",  name: "Vintage",    price: "PKR 4,900", emoji: "🪩", aspectRatio: 0.50 },
//   { id: "/glass7.png",  name: "Clubmaster", price: "PKR 4,900", emoji: "🔲", aspectRatio: 0.50 },
//   { id: "/glass8.png",  name: "Cat Eye",    price: "PKR 4,900", emoji: "😼", aspectRatio: 0.50 },
//   { id: "/glass9.png",  name: "Shield",     price: "PKR 3,800", emoji: "🛡️", aspectRatio: 0.35 },
//   { id: "/glass10.png", name: "Oval",       price: "PKR 4,900", emoji: "🥚", aspectRatio: 0.50 },
//   { id: "/glass11.png", name: "Square",     price: "PKR 4,900", emoji: "⬛", aspectRatio: 0.55 },
//   { id: "/glass12.png", name: "Hexagonal",  price: "PKR 4,900", emoji: "⚡", aspectRatio: 0.50 },
//   { id: "/glass13.png", name: "Geometric",  price: "PKR 4,900", emoji: "🔷", aspectRatio: 0.50 },
//   { id: "/glass14.png", name: "Steampunk",  price: "PKR 4,900", emoji: "⚙️", aspectRatio: 0.50 },
//   { id: "/glass15.png", name: "Sports Pro", price: "PKR 4,900", emoji: "🏃", aspectRatio: 0.50 },
//   { id: "/glass16.png", name: "Retro",      price: "PKR 4,900", emoji: "🎞️", aspectRatio: 0.50 },
//   { id: "/glass17.png", name: "Modern",     price: "PKR 4,900", emoji: "✨", aspectRatio: 0.50 },
//   { id: "/glass18.png", name: "Luxury",     price: "PKR 4,900", emoji: "💎", aspectRatio: 0.50 },
//   { id: "/glass19.png", name: "Designer",   price: "PKR 4,900", emoji: "🎨", aspectRatio: 0.50 },
//   { id: "/glass20.png", name: "Classic II",   price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass21.png", name: "Classic III",  price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass22.png", name: "Classic IV",   price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass23.png", name: "Classic V",    price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass24.png", name: "Classic VI",   price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass25.png", name: "Classic VII",  price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass26.png", name: "Classic VIII", price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass27.png", name: "Classic IX",   price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass28.png", name: "Classic X",    price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass29.png", name: "Classic XI",   price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass30.png", name: "Classic XII",  price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass31.png", name: "Classic 31", price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass32.png", name: "Classic 32", price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass33.png", name: "Classic 33", price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass34.png", name: "Classic 34", price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass35.png", name: "Classic 35", price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass36.png", name: "Classic 36", price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass37.png", name: "Classic 37", price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass38.png", name: "Classic 38", price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass39.png", name: "Classic 39", price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass40.png", name: "Classic 40", price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass41.png", name: "Classic 41", price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass42.png", name: "Classic 42", price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass43.png", name: "Classic 43", price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass44.png", name: "Classic 44", price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass45.png", name: "Classic 45", price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass46.png", name: "Classic 46", price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass47.png", name: "Classic 47", price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass48.png", name: "Classic 48", price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
//   { id: "/glass49.png", name: "Classic 49", price: "PKR 4,900", emoji: "👓", aspectRatio: 0.50 },
// ];

// // ============================================================
// // RESPONSIVE SIZING ARCHITECTURE
// // ============================================================

// /**
//  * Breakpoints for device classification.
//  * Tablet support is structured in — just add a "tablet" layout branch
//  * in the component render section when you're ready.
//  */
// const BREAKPOINTS = {
//   mobile: 768,   // < 768px  → mobile
//   tablet: 1024,  // < 1024px → tablet (reserved for future use)
//   // >= 1024px  → desktop
// };

// /**
//  * DEVICE_CONFIG — single source of truth for ALL sizing and performance values.
//  *
//  * Camera:  The resolution hint sent to getUserMedia (hardware capture).
//  * Canvas:  The actual pixel dimensions of the <canvas> element we render into.
//  *          For mobile/tablet these are functions so they read the viewport lazily;
//  *          for desktop these are fixed numbers matching the typical webcam stream.
//  *
//  * MediaPipe:  Per-device ML confidence thresholds and feature flags.
//  * Render:     Per-device animation loop parameters (FPS cap, EMA smoothing, etc.).
//  */
// const DEVICE_CONFIG = {
//   mobile: {
//     camera: {
//       width: 720,
//       height: 1280,
//       fps: 30,
//       facingMode: "user",
//     },
//     canvas: {
//       // Read viewport at call-time so the value is always fresh after a resize.
//       getWidth:  () => window.innerWidth,
//       getHeight: () => window.innerHeight,
//     },
//     mediapipe: {
//       refineLandmarks:        false,
//       minDetectionConfidence: 0.35,
//       minTrackingConfidence:  0.30,
//     },
//     render: {
//       eyeMultiplier: 1.6,
//       emaAlpha:      0.55,
//       rotAlpha:      0.28,
//       deadzone:      1.2,
//       fps:           30,
//     },
//   },

//   // Tablet is fully wired up — add the JSX layout branch when you want to use it.
//   tablet: {
//     camera: {
//       width: 1280,
//       height: 720,
//       fps: 30,
//       facingMode: "user",
//     },
//     canvas: {
//       getWidth:  () => window.innerWidth,
//       getHeight: () => window.innerHeight,
//     },
//     mediapipe: {
//       refineLandmarks:        true,
//       minDetectionConfidence: 0.45,
//       minTrackingConfidence:  0.40,
//     },
//     render: {
//       eyeMultiplier: 1.9,
//       emaAlpha:      0.52,
//       rotAlpha:      0.35,
//       deadzone:      0.8,
//       fps:           30,
//     },
//   },

//   desktop: {
//     camera: {
//       width: 1280,
//       height: 720,
//       fps: 60,
//       facingMode: "user",
//     },
//     canvas: {
//       // Fixed logical resolution — matched to typical 16:9 HD webcam output.
//       // getWidth / getHeight are not used for desktop; container size wins instead.
//       width:  1280,
//       height: 720,
//     },
//     mediapipe: {
//       refineLandmarks:        true,
//       minDetectionConfidence: 0.50,
//       minTrackingConfidence:  0.50,
//     },
//     render: {
//       eyeMultiplier: 2.2,
//       emaAlpha:      0.50,
//       rotAlpha:      0.40,
//       deadzone:      0,
//       fps:           60,
//     },
//   },
// };

// // ============================================================
// // DEVICE DETECTION HELPERS
// // ============================================================

// /**
//  * Returns "mobile" | "tablet" | "desktop" based on viewport width
//  * and user-agent touch hints.  Single call-site — easy to extend.
//  */
// const getDeviceType = () => {
//   if (typeof window === "undefined") return "desktop";

//   const vw           = window.innerWidth;
//   const isTouchAgent = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

//   if (vw < BREAKPOINTS.mobile || (isTouchAgent && vw < BREAKPOINTS.tablet)) return "mobile";
//   if (vw < BREAKPOINTS.tablet || isTouchAgent)                               return "tablet";
//   return "desktop";
// };

// /** Convenience boolean — kept so every existing `isMobile` reference still works. */
// const isMobileType = (deviceType) => deviceType === "mobile";

// // ============================================================
// // SIZING UTILITIES
// // ============================================================

// /**
//  * computeCanvasDimensions
//  * Returns { width, height } for the canvas element.
//  *
//  * Mobile / Tablet → viewport-relative (dynamic).
//  * Desktop         → try to read the container DOM size first;
//  *                   fall back to the fixed config constants.
//  */
// const computeCanvasDimensions = (deviceType, containerEl = null) => {
//   const cfg = DEVICE_CONFIG[deviceType].canvas;

//   if (deviceType === "mobile" || deviceType === "tablet") {
//     return {
//       width:  cfg.getWidth(),
//       height: cfg.getHeight(),
//     };
//   }

//   // Desktop: honour the actual rendered container so the canvas fills the panel.
//   if (containerEl) {
//     const rect = containerEl.getBoundingClientRect();
//     if (rect.width > 0 && rect.height > 0) {
//       return {
//         width:  Math.round(rect.width),
//         height: Math.round(rect.height),
//       };
//     }
//   }

//   // Hard fallback to the fixed desktop constants.
//   return { width: cfg.width, height: cfg.height };
// };

// /**
//  * buildCameraConstraints
//  * Converts DEVICE_CONFIG camera block into a getUserMedia constraints object.
//  * Keeps camera setup DRY — change the config, every call updates automatically.
//  */
// const buildCameraConstraints = (deviceType) => {
//   const cam = DEVICE_CONFIG[deviceType].camera;
//   return {
//     video: {
//       facingMode:  cam.facingMode,
//       width:       { ideal: cam.width  },
//       height:      { ideal: cam.height },
//       frameRate:   { ideal: cam.fps    },
//     },
//     audio: false,
//   };
// };

// /**
//  * buildFrameInterval
//  * Returns the millisecond gap between rendered frames for the given device.
//  * Used for throttling the draw loop on battery-constrained devices.
//  */
// const buildFrameInterval = (deviceType) =>
//   1000 / DEVICE_CONFIG[deviceType].render.fps;

// // ============================================================
// // BEAUTY FILTER (desktop only — untouched from original)
// // ============================================================
// const BEAUTY_B = 100;
// const BEAUTY_C = 100;
// const BEAUTY_S = 100;

// // ============================================================
// // MEDIAPIPE LANDMARK INDICES
// // ============================================================
// const LANDMARKS = {
//   LEFT_IRIS_CENTER:   468,
//   RIGHT_IRIS_CENTER:  473,
//   LEFT_EYE_OUTER:     33,
//   RIGHT_EYE_OUTER:    263,
//   LEFT_EYE_INNER:     133,
//   RIGHT_EYE_INNER:    362,
//   LEFT_EYEBROW_LOWER:  [70,  63,  105,  66,  107],
//   RIGHT_EYEBROW_LOWER: [300, 293,  334, 296,  336],
//   NOSE_BRIDGE_TOP:    6,
//   LEFT_FACE_EDGE:     234,
//   RIGHT_FACE_EDGE:    454,
//   LEFT_EYE_UPPER_LID: 159,
//   LEFT_EYE_LOWER_LID: 145,
//   RIGHT_EYE_UPPER_LID: 386,
//   RIGHT_EYE_LOWER_LID: 374,
// };

// // ============================================================
// // LANDMARK SMOOTHER  (unchanged)
// // ============================================================
// const STABLE_THRESHOLD = 8;
// const STABLE_LIMIT     = 20;

// class LandmarkSmoother {
//   constructor(posAlpha = 0.45, rotAlpha = 0.35) {
//     this.posAlpha   = posAlpha;
//     this.rotAlpha   = rotAlpha;
//     this.prev       = null;
//     this.stableCount = 0;
//     this.lastStable  = null;
//   }

//   smooth(current, deadzone = 0) {
//     if (!this.prev) {
//       this.prev       = { ...current };
//       this.lastStable = { ...current };
//       return { ...current };
//     }

//     const result = {};
//     for (const key of Object.keys(current)) {
//       const alpha = key === "angle" ? this.rotAlpha : this.posAlpha;
//       const delta = current[key] - this.prev[key];
//       result[key] =
//         deadzone > 0 && Math.abs(delta) < deadzone
//           ? this.prev[key]
//           : this.prev[key] + alpha * delta;
//     }

//     const movement = Math.hypot(
//       (result.cx ?? 0) - (this.lastStable?.cx ?? result.cx ?? 0),
//       (result.cy ?? 0) - (this.lastStable?.cy ?? result.cy ?? 0),
//     );

//     if (movement < STABLE_THRESHOLD) {
//       this.stableCount++;
//       if (this.stableCount > STABLE_LIMIT && this.lastStable) {
//         result.cx = result.cx * 0.3 + this.lastStable.cx * 0.7;
//         result.cy = result.cy * 0.3 + this.lastStable.cy * 0.7;
//       }
//     } else {
//       this.stableCount = 0;
//       this.lastStable  = { ...result };
//     }

//     this.prev = { ...result };
//     return result;
//   }

//   reset() {
//     this.prev        = null;
//     this.stableCount = 0;
//     this.lastStable  = null;
//   }
// }

// // ============================================================
// // FACE GEOMETRY EXTRACTION  (unchanged)
// // ============================================================
// function extractFaceGeometry(lm, W, H, useIris = true, neutralFaceWidthRef = null) {
//   const px    = (idx) => ({ x: lm[idx].x * W, y: lm[idx].y * H, z: lm[idx].z ?? 0 });
//   const avgPx = (indices) => {
//     const pts = indices.map((i) => px(i));
//     return {
//       x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
//       y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
//     };
//   };
//   const dist  = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

//   const leftEyeOut    = px(LANDMARKS.LEFT_EYE_OUTER);
//   const rightEyeOut   = px(LANDMARKS.RIGHT_EYE_OUTER);
//   const leftBrowLower = avgPx(LANDMARKS.LEFT_EYEBROW_LOWER);
//   const rightBrowLower= avgPx(LANDMARKS.RIGHT_EYEBROW_LOWER);
//   const noseBridgeTop = px(LANDMARKS.NOSE_BRIDGE_TOP);
//   const leftEdge      = px(LANDMARKS.LEFT_FACE_EDGE);
//   const rightEdge     = px(LANDMARKS.RIGHT_FACE_EDGE);

//   let leftIris, rightIris;
//   if (useIris && lm.length > 473) {
//     leftIris  = px(LANDMARKS.LEFT_IRIS_CENTER);
//     rightIris = px(LANDMARKS.RIGHT_IRIS_CENTER);
//   } else {
//     const leftInner  = px(LANDMARKS.LEFT_EYE_INNER);
//     const rightInner = px(LANDMARKS.RIGHT_EYE_INNER);
//     leftIris  = { x: (leftEyeOut.x + leftInner.x)  / 2, y: (leftEyeOut.y  + leftInner.y)  / 2, z: 0 };
//     rightIris = { x: (rightEyeOut.x + rightInner.x) / 2, y: (rightEyeOut.y + rightInner.y) / 2, z: 0 };
//   }

//   const leftEyeCenter = {
//     x: (leftEyeOut.x + px(LANDMARKS.LEFT_EYE_INNER).x)  / 2,
//     y: (px(LANDMARKS.LEFT_EYE_UPPER_LID).y + px(LANDMARKS.LEFT_EYE_LOWER_LID).y) / 2,
//   };
//   const rightEyeCenter = {
//     x: (rightEyeOut.x + px(LANDMARKS.RIGHT_EYE_INNER).x) / 2,
//     y: (px(LANDMARKS.RIGHT_EYE_UPPER_LID).y + px(LANDMARKS.RIGHT_EYE_LOWER_LID).y) / 2,
//   };

//   const browMidLower = {
//     x: (leftBrowLower.x + rightBrowLower.x) / 2,
//     y: (leftBrowLower.y + rightBrowLower.y) / 2,
//   };

//   const eyeSpan          = dist(leftEyeOut, rightEyeOut);
//   const angleIris        = Math.atan2(rightIris.y - leftIris.y, rightIris.x - leftIris.x);
//   const angleEyeCorners  = Math.atan2(rightEyeOut.y - leftEyeOut.y, rightEyeOut.x - leftEyeOut.x);
//   const angleBrow        = Math.atan2(rightBrowLower.y - leftBrowLower.y, rightBrowLower.x - leftBrowLower.x);
//   const angle            = angleEyeCorners * 0.6 + angleBrow * 0.3 + angleIris * 0.1;

//   const eyeMidY  = (leftEyeCenter.y + rightEyeCenter.y) / 2;
//   const centerX  = (leftEyeCenter.x + rightEyeCenter.x) / 2;
//   const centerY  = browMidLower.y * 0.25 + noseBridgeTop.y * 0.55 + eyeMidY * 0.2;

//   let yawCompensation = 1.0;
//   if (neutralFaceWidthRef) {
//     const currentFaceWidth = dist(leftEdge, rightEdge);
//     if (!neutralFaceWidthRef.current) neutralFaceWidthRef.current = currentFaceWidth;
//     const yawRatio   = currentFaceWidth / neutralFaceWidthRef.current;
//     yawCompensation  = 1.0 / Math.max(0.55, yawRatio);
//   }

//   const spanMult    = useIris ? 1.0 : 1.05;
//   const normEyeSpan = eyeSpan * spanMult;
//   const avgZ        = (leftIris.z + rightIris.z + (noseBridgeTop.z ?? 0)) / 3;
//   const depthScale  = Math.max(0.92, Math.min(1.08, 1 + -avgZ * 0.6));
//   const faceWidth   = dist(leftEdge, rightEdge);

//   return { centerX, centerY, angle, depthScale, normEyeSpan, yawCompensation, faceWidth };
// }

// // ============================================================
// // THEME TOKENS  (unchanged)
// // ============================================================
// const C = {
//   primary:       "#E87F24",
//   accent:        "#73A5CA",
//   bg:            "#FEFDDF",
//   surface:       "#F5F3C7",
//   text:          "#1E293B",
//   primary12:     "rgba(232,127,36,0.12)",
//   primary20:     "rgba(232,127,36,0.20)",
//   primary25:     "rgba(232,127,36,0.25)",
//   primary30:     "rgba(232,127,36,0.30)",
//   primary40:     "rgba(232,127,36,0.40)",
//   accent12:      "rgba(115,165,202,0.12)",
//   accent20:      "rgba(115,165,202,0.20)",
//   accent28:      "rgba(115,165,202,0.28)",
//   text55:        "rgba(30,41,59,0.55)",
//   text30:        "rgba(30,41,59,0.30)",
//   text12:        "rgba(30,41,59,0.12)",
//   text06:        "rgba(30,41,59,0.06)",
//   glassBg:       "rgba(254,253,223,0.65)",
//   glassBorder:   "rgba(255,255,255,0.70)",
//   surfaceBorder: "rgba(255,255,255,0.85)",
//   white15:       "rgba(255,255,255,0.15)",
//   white08:       "rgba(255,255,255,0.08)",
//   gradPrimary:     "linear-gradient(135deg, #E87F24, #F5A623)",
//   gradPrimaryText: "linear-gradient(135deg, #F5A623, #E87F24)",
//   gradBg: `
//     radial-gradient(ellipse 60% 50% at 80% 10%, rgba(232,127,36,0.13) 0%, transparent 60%),
//     radial-gradient(ellipse 50% 40% at 10% 80%, rgba(115,165,202,0.12) 0%, transparent 55%),
//     #FEFDDF
//   `,
// };

// const glassPill = {
//   borderRadius:         100,
//   backdropFilter:       "blur(14px)",
//   WebkitBackdropFilter: "blur(14px)",
// };

// // ============================================================
// // UI SUB-COMPONENTS  (unchanged)
// // ============================================================
// const Section = ({ title, icon, defaultOpen = false, children }) => {
//   const [open, setOpen] = useState(defaultOpen);
//   return (
//     <div style={{
//       borderRadius: 16,
//       border: `1px solid ${C.glassBorder}`,
//       overflow: "hidden",
//       background: C.glassBg,
//       backdropFilter: "blur(12px)",
//       WebkitBackdropFilter: "blur(12px)",
//       boxShadow: `0 2px 8px ${C.text06}`,
//     }}>
//       <button
//         onClick={() => setOpen((o) => !o)}
//         aria-expanded={open}
//         aria-label={`${open ? "Collapse" : "Expand"} ${title}`}
//         style={{
//           width: "100%", display: "flex", alignItems: "center",
//           justifyContent: "space-between", padding: "13px 16px",
//           background: "rgba(254,253,223,0.50)", border: "none", cursor: "pointer",
//           borderBottom: open ? `1px solid ${C.glassBorder}` : "none",
//         }}
//       >
//         <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: C.primary }}>
//           <span style={{ fontSize: 13 }} aria-hidden="true">{icon}</span>
//           {title}
//         </span>
//         <span aria-hidden="true" style={{ fontSize: 9, color: C.text55, transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.22s ease", display: "inline-block" }}>▼</span>
//       </button>
//       {open && <div style={{ padding: "16px", background: "rgba(245,243,199,0.40)" }}>{children}</div>}
//     </div>
//   );
// };

// const SliderRow = ({ label, value, min, max, step, onChange, fmt }) => (
//   <div style={{ marginBottom: 18 }}>
//     <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
//       <label style={{ fontSize: 10, color: C.text55, fontWeight: 600, letterSpacing: "1px" }}>{label}</label>
//       <span style={{ fontSize: 11, fontWeight: 700, background: C.gradPrimaryText, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{fmt(value)}</span>
//     </div>
//     <input
//       type="range" min={min} max={max} step={step} value={value} aria-label={label}
//       onChange={(e) => onChange(Number(e.target.value))}
//       style={{ width: "100%", height: 3, background: C.primary20, borderRadius: 4, appearance: "none", WebkitAppearance: "none", cursor: "pointer" }}
//     />
//   </div>
// );

// // ============================================================
// // MAIN COMPONENT
// // ============================================================
// const TryOn = () => {
//   const videoRef          = useRef(null);
//   const canvasRef         = useRef(null);
//   const imgRef            = useRef(new Image());
//   const trackRef          = useRef({ hasLandmarks: false });
//   const rafIdRef          = useRef(null);
//   const lastFrameRef      = useRef(0);
//   const touchStartX       = useRef(null);
//   const touchStartY       = useRef(null);
//   const cameraRdyRef      = useRef(false);
//   const glassesRef        = useRef("/glass1.png");
//   const adjRef            = useRef({});
//   const pendingResultRef  = useRef(null);
//   const camStreamRef      = useRef(null);
//   const camInstanceRef    = useRef(null);
//   const cachedGlassObjRef = useRef(null);
//   const ctxRef            = useRef(null);
//   const resultVersionRef  = useRef(0);
//   const lastDrawnVersionRef   = useRef(-1);
//   const neutralFaceWidthRef   = useRef(null);
//   const depthScaleSmoothedRef = useRef(1.0);
//   const DS_ALPHA              = 0.12;
//   const scrollerRef = useRef(null);

//   // ----------------------------------------------------------
//   // DEVICE TYPE STATE — replaces getIsMobile() + getMobileSizes()
//   // ----------------------------------------------------------
//   const [deviceType, setDeviceType] = useState(() => getDeviceType());
//   const deviceTypeRef = useRef(deviceType);

//   // Backward-compat boolean so every JSX `isMobile` check still works untouched.
//   const isMobile    = isMobileType(deviceType);
//   const isMobileRef = useRef(isMobile);

//   // ----------------------------------------------------------
//   // CANVAS DIMENSIONS STATE
//   // Replaces the old `mobileSizes` state.
//   // Mobile/tablet: viewport-relative (re-computed on resize).
//   // Desktop:       computed from the container element in useEffect.
//   // ----------------------------------------------------------
//   const [canvasDimensions, setCanvasDimensions] = useState(() =>
//     computeCanvasDimensions(getDeviceType()),
//   );

//   const [scrollerH, setScrollerH] = useState(160);

//   // ----------------------------------------------------------
//   // FEATURE STATE
//   // ----------------------------------------------------------
//   const [glasses,      setGlasses]      = useState("/glass1.png");
//   const [cameraReady,  setCameraReady]  = useState(false);
//   const [brightness,   setBrightness]   = useState(100);
//   const [contrast,     setContrast]     = useState(100);
//   const [saturate,     setSaturate]     = useState(100);
//   const [mpError,      setMpError]      = useState(null);

//   const brightnessRef = useRef(100);
//   const contrastRef   = useRef(100);
//   const saturateRef   = useRef(100);

//   useEffect(() => { brightnessRef.current = brightness; }, [brightness]);
//   useEffect(() => { contrastRef.current   = contrast;   }, [contrast]);
//   useEffect(() => { saturateRef.current   = saturate;   }, [saturate]);

//   // ----------------------------------------------------------
//   // ADJUSTMENTS
//   // ----------------------------------------------------------
//   const adjustmentsRef = useRef(
//     Object.fromEntries(
//       GLASS_OPTIONS.map((g) => {
//         if (g.id === "/glass2.png") return [g.id, { ...AVIATOR_ADJ }];
//         if (g.id === "/glass4.png") return [g.id, { ...ROUND_ADJ   }];
//         return [g.id, { ...DEFAULT_ADJ }];
//       }),
//     ),
//   );
//   const [adjUIState, setAdjUIState] = useState(() => adjustmentsRef.current["/glass1.png"]);

//   useEffect(() => {
//     glassesRef.current        = glasses;
//     adjRef.current            = adjustmentsRef.current;
//     cachedGlassObjRef.current = GLASS_OPTIONS.find((g) => g.id === glasses) || null;
//     setAdjUIState({ ...(adjustmentsRef.current[glasses] || DEFAULT_ADJ) });
//   }, [glasses]);

//   const setAdj = useCallback((key, val) => {
//     const id = glassesRef.current;
//     adjustmentsRef.current = {
//       ...adjustmentsRef.current,
//       [id]: { ...(adjustmentsRef.current[id] || DEFAULT_ADJ), [key]: val },
//     };
//     adjRef.current = adjustmentsRef.current;
//     setAdjUIState((prev) => ({ ...prev, [key]: val }));
//   }, []);

//   const resetAdj = useCallback(() => {
//     const id = glassesRef.current;
//     const defaults =
//       id === "/glass2.png" ? { ...AVIATOR_ADJ }
//       : id === "/glass4.png" ? { ...ROUND_ADJ }
//       : { ...DEFAULT_ADJ };
//     adjustmentsRef.current = { ...adjustmentsRef.current, [id]: defaults };
//     adjRef.current         = adjustmentsRef.current;
//     setAdjUIState({ ...defaults });
//   }, []);

//   // Preload glasses image on selection change.
//   useEffect(() => {
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.src         = glasses;
//     imgRef.current  = img;
//   }, [glasses]);

//   // ----------------------------------------------------------
//   // LANDMARK SMOOTHER — initialised from DEVICE_CONFIG
//   // ----------------------------------------------------------
//   const smootherRef = useRef(null);
//   if (!smootherRef.current) {
//     const { emaAlpha, rotAlpha } = DEVICE_CONFIG[deviceType].render;
//     smootherRef.current = new LandmarkSmoother(emaAlpha, rotAlpha);
//   }

//   // ----------------------------------------------------------
//   // DRAW LOOP — reads device config via ref to stay up-to-date
//   // after a hot resize without restarting MediaPipe.
//   // ----------------------------------------------------------
//   const drawLoop = useCallback(() => {
//     rafIdRef.current = requestAnimationFrame(drawLoop);

//     const dt  = deviceTypeRef.current;
//     const cfg = DEVICE_CONFIG[dt].render;
//     const now = performance.now();

//     // Throttle to per-device FPS cap.
//     const frameInterval = buildFrameInterval(dt);
//     if (now - lastFrameRef.current < frameInterval) return;
//     lastFrameRef.current = now;

//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     if (!ctxRef.current) {
//       ctxRef.current = canvas.getContext("2d", { alpha: false, willReadFrequently: false });
//     }
//     const ctx = ctxRef.current;
//     if (!ctx) return;

//     const result = pendingResultRef.current;
//     if (!result?.image || resultVersionRef.current === lastDrawnVersionRef.current) return;

//     const W = canvas.width;
//     const H = canvas.height;
//     const isMob = isMobileType(dt);

//     // Beauty filter — desktop only.
//     if (isMob) {
//       ctx.filter = "none";
//     } else {
//       const uB = brightnessRef.current;
//       const uC = contrastRef.current;
//       const uS = saturateRef.current;
//       ctx.filter =
//         uB !== 100 || uC !== 100 || uS !== 100
//           ? `brightness(${BEAUTY_B}%) contrast(${BEAUTY_C}%) saturate(${BEAUTY_S}%) brightness(${uB}%) contrast(${uC}%) saturate(${uS}%)`
//           : "none";
//     }

//     // Flip horizontally to give a mirror feel.
//     ctx.save();
//     ctx.translate(W, 0);
//     ctx.scale(-1, 1);
//     ctx.drawImage(result.image, 0, 0, W, H);
//     ctx.restore();
//     ctx.filter = "none";

//     if (!result.multiFaceLandmarks?.length) {
//       smootherRef.current.reset();
//       neutralFaceWidthRef.current    = null;
//       trackRef.current.hasLandmarks  = false;
//       lastDrawnVersionRef.current    = resultVersionRef.current;
//       return;
//     }

//     const lm  = result.multiFaceLandmarks[0];
//     const geo = extractFaceGeometry(lm, W, H, !isMob, neutralFaceWidthRef);
//     const mirroredCx = W - geo.centerX;

//     const glassObj    = cachedGlassObjRef.current;
//     const aspectRatio = glassObj?.aspectRatio ?? 0.5;

//     // Eye multiplier comes from per-device config — no inline ternary needed.
//     const rawGw       = geo.normEyeSpan * cfg.eyeMultiplier * (isMob ? 1.0 : geo.yawCompensation);
//     const gwFromSpan  = isMob ? rawGw : Math.min(rawGw, geo.faceWidth * 0.9);
//     const ghFromAR    = gwFromSpan * aspectRatio;

//     depthScaleSmoothedRef.current =
//       depthScaleSmoothedRef.current * (1 - DS_ALPHA) + geo.depthScale * DS_ALPHA;

//     // Smooth the overlay position using per-device EMA and deadzone.
//     const sm = smootherRef.current.smooth(
//       { cx: mirroredCx, cy: geo.centerY, gw: gwFromSpan, gh: ghFromAR, angle: geo.angle },
//       cfg.deadzone,
//     );

//     trackRef.current.hasLandmarks = true;

//     const img = imgRef.current;
//     if (!img.complete || !img.naturalWidth) {
//       lastDrawnVersionRef.current = resultVersionRef.current;
//       return;
//     }

//     const adj         = adjRef.current[glassesRef.current] || DEFAULT_ADJ;
//     const smoothedDs  = depthScaleSmoothedRef.current;
//     const w = isMob ? sm.gw * adj.scaleW : sm.gw * adj.scaleW * smoothedDs;
//     const h = isMob ? sm.gh * adj.scaleH : sm.gh * adj.scaleH * smoothedDs;

//     ctx.save();
//     ctx.translate(sm.cx + adj.offsetX, sm.cy + adj.offsetY);
//     ctx.rotate(-sm.angle + adj.rotate * (Math.PI / 180));
//     ctx.drawImage(img, -w / 2, -h / 2, w, h);
//     ctx.restore();

//     lastDrawnVersionRef.current = resultVersionRef.current;
//   }, []);

//   const onResults = useCallback((results) => {
//     pendingResultRef.current = results;
//     resultVersionRef.current++;
//   }, []);

//   // ----------------------------------------------------------
//   // CAMERA + MEDIAPIPE SETUP
//   // Uses DEVICE_CONFIG exclusively — no inline magic numbers.
//   // ----------------------------------------------------------
//   useEffect(() => {
//     if (!window.FaceMesh) {
//       setMpError("MediaPipe FaceMesh not found. Add the MediaPipe <script> tag to index.html.");
//       return;
//     }

//     const dt      = deviceTypeRef.current;
//     const mpCfg   = DEVICE_CONFIG[dt].mediapipe;

//     // ── Canvas dimensions ──────────────────────────────────
//     if (canvasRef.current) {
//       const containerEl = canvasRef.current.parentElement;
//       const dims        = computeCanvasDimensions(dt, containerEl);
//       canvasRef.current.width  = dims.width;
//       canvasRef.current.height = dims.height;
//       ctxRef.current           = null;
//       // Keep state in sync so the mobile layout JSX gets the right initial size.
//       setCanvasDimensions(dims);
//     }

//     // ── MediaPipe FaceMesh ─────────────────────────────────
//     const faceMesh = new window.FaceMesh({
//       locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/${file}`,
//     });
//     faceMesh.setOptions({
//       maxNumFaces:            1,
//       refineLandmarks:        mpCfg.refineLandmarks,
//       minDetectionConfidence: mpCfg.minDetectionConfidence,
//       minTrackingConfidence:  mpCfg.minTrackingConfidence,
//     });
//     faceMesh.onResults(onResults);

//     rafIdRef.current = requestAnimationFrame(drawLoop);

//     // ── Camera stream ──────────────────────────────────────
//     navigator.mediaDevices
//       .getUserMedia(buildCameraConstraints(dt))
//       .then((stream) => {
//         camStreamRef.current = stream;
//         const video = videoRef.current;
//         if (!video) return;

//         video.srcObject      = stream;
//         video.onloadedmetadata = () => {
//           // On mobile, snap the canvas to the actual track resolution once known.
//           // This corrects for devices that negotiate a different size than requested.
//           if (dt === "mobile" || dt === "tablet") {
//             const track    = stream.getVideoTracks()[0];
//             const settings = track.getSettings();
//             if (canvasRef.current && settings.width && settings.height) {
//               canvasRef.current.width  = settings.width;
//               canvasRef.current.height = settings.height;
//               ctxRef.current           = null;
//               setCanvasDimensions({ width: settings.width, height: settings.height });
//             }
//           }

//           video.play().then(() => {
//             cameraRdyRef.current = true;
//             setCameraReady(true);

//             // ── Frame-send loop — throttled per device FPS ──
//             const sendInterval = buildFrameInterval(dt);
//             let lastSendTime   = 0;

//             const sendFrame = async (timestamp) => {
//               if (!cameraRdyRef.current) return;

//               if (timestamp - lastSendTime >= sendInterval) {
//                 lastSendTime = timestamp;
//                 try {
//                   if (video.readyState >= 2) await faceMesh.send({ image: video });
//                 } catch (_) { /* silent — stale frame */ }
//               }

//               if (cameraRdyRef.current) {
//                 camInstanceRef.current = requestAnimationFrame(sendFrame);
//               }
//             };

//             camInstanceRef.current = requestAnimationFrame(sendFrame);
//           });
//         };
//       })
//       .catch((err) => {
//         console.error(err);
//         setMpError("Camera access denied or not available.");
//       });

//     return () => {
//       cameraRdyRef.current = false;
//       if (rafIdRef.current)    cancelAnimationFrame(rafIdRef.current);
//       if (camInstanceRef.current) cancelAnimationFrame(camInstanceRef.current);
//       camStreamRef.current?.getTracks().forEach((t) => t.stop());
//       camStreamRef.current = null;
//       if (videoRef.current?.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
//         videoRef.current.srcObject = null;
//       }
//       faceMesh.close();
//     };
//   }, [drawLoop, onResults]);
//   // NOTE: `canvasDimensions` is intentionally NOT a dependency here.
//   // Resizing is handled by the resize effect below without restarting MediaPipe.

//   // ----------------------------------------------------------
//   // RESIZE HANDLER
//   // Keeps sizing in sync without tearing down and restarting
//   // the camera stream or MediaPipe instance.
//   // ----------------------------------------------------------
//   useEffect(() => {
//     const handleResize = () => {
//       const newDeviceType = getDeviceType();
//       const newIsMobile   = isMobileType(newDeviceType);

//       // Update refs synchronously so the running drawLoop sees the new values
//       // before the next React render cycle.
//       deviceTypeRef.current = newDeviceType;
//       isMobileRef.current   = newIsMobile;

//       // Invalidate the cached canvas context — it will be re-created on the
//       // next drawLoop tick using the new canvas dimensions.
//       ctxRef.current            = null;
//       neutralFaceWidthRef.current = null;

//       // Re-compute canvas size for the new viewport.
//       const newDims = computeCanvasDimensions(newDeviceType, canvasRef.current?.parentElement);
//       if (canvasRef.current) {
//         canvasRef.current.width  = newDims.width;
//         canvasRef.current.height = newDims.height;
//       }

//       // Update React state so the JSX layout re-evaluates device branch + sizes.
//       setDeviceType(newDeviceType);
//       setCanvasDimensions(newDims);
//     };

//     window.addEventListener("resize", handleResize, { passive: true });
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Measure the bottom scroller for mobile overlay positioning.
//   useEffect(() => {
//     if (scrollerRef.current) setScrollerH(scrollerRef.current.offsetHeight);
//   }, []);

//   // ----------------------------------------------------------
//   // STYLES
//   // ----------------------------------------------------------
//   const css = `
//     @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600&display=swap');
//     *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//     input[type="range"] { -webkit-appearance: none; appearance: none; background: transparent; }
//     input[type="range"]::-webkit-slider-runnable-track {
//       background: linear-gradient(90deg, rgba(232,127,36,0.30), rgba(232,127,36,0.10));
//       height: 3px; border-radius: 3px;
//     }
//     input[type="range"]::-webkit-slider-thumb {
//       -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%;
//       background: radial-gradient(circle at 38% 35%, #F5A623, #E87F24);
//       cursor: pointer; margin-top: -6.5px;
//       border: 2px solid rgba(254,253,223,0.90);
//       box-shadow: 0 2px 8px rgba(232,127,36,0.40);
//     }
//     input[type="range"]::-moz-range-thumb {
//       width: 16px; height: 16px; border-radius: 50%;
//       background: radial-gradient(circle at 38% 35%, #F5A623, #E87F24);
//       cursor: pointer; border: 2px solid rgba(254,253,223,0.90);
//       box-shadow: 0 2px 8px rgba(232,127,36,0.40);
//     }
//     .right-panel { scrollbar-width: thin; scrollbar-color: rgba(232,127,36,0.40) rgba(232,127,36,0.08); }
//     ::-webkit-scrollbar { width: 3px; height: 3px; }
//     ::-webkit-scrollbar-track { background: rgba(232,127,36,0.06); border-radius: 4px; }
//     ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #E87F24, #F5A623); border-radius: 4px; }
//     .frame-scroller { scroll-behavior: smooth; -webkit-overflow-scrolling: touch; scrollbar-width: none; -ms-overflow-style: none; }
//     .frame-scroller::-webkit-scrollbar { display: none; }
//     .frame-card { transition: transform 0.2s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s ease; -webkit-tap-highlight-color: transparent; }
//     .frame-card:hover { transform: translateY(-2px) scale(1.03); }
//     .frame-card:active { transform: scale(0.96); }
//     @keyframes spin    { to { transform: rotate(360deg); } }
//     @keyframes fadeIn  { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
//     @keyframes pulse   { 0%,100%{ opacity:0.55 } 50%{ opacity:1 } }
//     .spinner {
//       width: 44px; height: 44px; border-radius: 50%;
//       border: 2px solid rgba(115,165,202,0.20);
//       border-top-color: #E87F24;
//       animation: spin 0.85s linear infinite;
//     }
//     .spinner-inner {
//       width: 30px; height: 30px; border-radius: 50%;
//       border: 1.5px solid rgba(232,127,36,0.15);
//       border-bottom-color: #F5A623;
//       animation: spin 1.2s linear infinite reverse;
//       position: absolute; top: 7px; left: 7px;
//     }
//     .ar-dot {
//       width: 7px; height: 7px; border-radius: 50%;
//       background: #73A5CA;
//       box-shadow: 0 0 8px rgba(115,165,202,0.70);
//       animation: pulse 2s ease infinite;
//       display: inline-block; margin-right: 6px; flex-shrink: 0;
//     }
//     .frame-card:focus-visible { outline: 2px solid #E87F24; outline-offset: 2px; }
//   `;

//   // ----------------------------------------------------------
//   // ERROR STATE
//   // ----------------------------------------------------------
//   if (mpError) {
//     return (
//       <div role="alert" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: C.bg, color: "#c2410c", fontFamily: "monospace", padding: 24, textAlign: "center", fontSize: 13 }}>
//         ⚠️ {mpError}
//       </div>
//     );
//   }

//   const currentGlass = GLASS_OPTIONS.find((g) => g.id === glasses);
//   const curAdj       = adjUIState;

//   // ============================================================
//   // MOBILE LAYOUT
//   // ============================================================
//   if (isMobile) {
//     const idx = GLASS_OPTIONS.findIndex((g) => g.id === glasses);

//     // Canvas dimensions come from state — computed via DEVICE_CONFIG.
//     const { width: canvasW, height: canvasH } = canvasDimensions;

//     const onTouchStart = (e) => {
//       touchStartX.current = e.touches[0].clientX;
//       touchStartY.current = e.touches[0].clientY;
//     };
//     const onTouchEnd = (e) => {
//       if (touchStartX.current === null) return;
//       const dx = e.changedTouches[0].clientX - touchStartX.current;
//       const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
//       if (Math.abs(dx) > 50 && Math.abs(dx) > dy) {
//         const cur = GLASS_OPTIONS.findIndex((g) => g.id === glassesRef.current);
//         if (dx < 0 && cur < GLASS_OPTIONS.length - 1) setGlasses(GLASS_OPTIONS[cur + 1].id);
//         if (dx > 0 && cur > 0)                        setGlasses(GLASS_OPTIONS[cur - 1].id);
//       }
//       touchStartX.current = null;
//       touchStartY.current = null;
//     };

//     const DOTS_VISIBLE = 7;
//     const half         = Math.floor(DOTS_VISIBLE / 2);
//     const start        = Math.max(0, Math.min(idx - half, GLASS_OPTIONS.length - DOTS_VISIBLE));
//     const end          = Math.min(GLASS_OPTIONS.length, start + DOTS_VISIBLE);
//     const visibleDots  = GLASS_OPTIONS.slice(start, end);

//     return (
//       <div
//         style={{ position: "fixed", inset: 0, background: "#000", fontFamily: "'Space Grotesk',sans-serif", color: "#fff", overflow: "hidden", touchAction: "pan-y" }}
//         onTouchStart={onTouchStart}
//         onTouchEnd={onTouchEnd}
//       >
//         <style>{css}</style>

//         <video ref={videoRef} style={{ position: "absolute", visibility: "hidden", width: 0, height: 0, overflow: "hidden", pointerEvents: "none" }} autoPlay playsInline muted />

//         <canvas
//           ref={canvasRef}
//           width={canvasW}
//           height={canvasH}
//           style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", display: "block", background: "#000" }}
//           aria-label="AR glasses try-on camera view"
//         />

//         <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "22%", background: "linear-gradient(to bottom, rgba(0,0,0,0.50), transparent)", pointerEvents: "none" }} aria-hidden="true" />

//         {cameraReady && (
//           <div role="status" aria-live="polite" style={{ position: "absolute", top: 18, left: 16, zIndex: 20, display: "flex", alignItems: "center", background: "rgba(0,0,0,0.42)", ...glassPill, border: `1px solid rgba(115,165,202,0.30)`, padding: "5px 12px", animation: "fadeIn 0.35s ease" }}>
//             <span className="ar-dot" aria-hidden="true" />
//             <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.80)", letterSpacing: "0.5px" }}>Tracking</span>
//           </div>
//         )}

//         {cameraReady && currentGlass && (
//           <div aria-live="polite" style={{ position: "absolute", bottom: scrollerH + 16, left: "50%", transform: "translateX(-50%)", zIndex: 20, whiteSpace: "nowrap", background: "rgba(0,0,0,0.48)", ...glassPill, border: `1px solid ${C.primary25}`, padding: "7px 20px", display: "flex", alignItems: "center", gap: 10, animation: "fadeIn 0.3s ease", boxShadow: `0 4px 20px rgba(0,0,0,0.25), 0 0 20px ${C.primary12}` }}>
//             <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(254,253,223,0.95)" }}>{currentGlass.name}</span>
//             <span aria-hidden="true" style={{ width: 1, height: 11, background: C.primary30, display: "inline-block" }} />
//             <span style={{ fontSize: 13, fontWeight: 700, background: C.gradPrimary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{currentGlass.price}</span>
//           </div>
//         )}

//         {cameraReady && (
//           <div aria-hidden="true" style={{ position: "absolute", bottom: scrollerH + 2, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 4, zIndex: 20, alignItems: "center" }}>
//             {start > 0 && <div style={{ width: 3, height: 3, borderRadius: "50%", background: C.white15 }} />}
//             {visibleDots.map((g, i) => {
//               const isA    = glasses === g.id;
//               const isEdge = (i === 0 && start > 0) || (i === visibleDots.length - 1 && end < GLASS_OPTIONS.length);
//               return (
//                 <div key={g.id} style={{ width: isA ? 14 : isEdge ? 3 : 4, height: isA ? 4 : isEdge ? 3 : 4, borderRadius: isA ? 3 : "50%", background: isA ? C.primary : C.white15, transition: "all 0.25s ease" }} />
//               );
//             })}
//             {end < GLASS_OPTIONS.length && <div style={{ width: 3, height: 3, borderRadius: "50%", background: C.white15 }} />}
//           </div>
//         )}

//         <div ref={scrollerRef} style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 20, paddingBottom: "env(safe-area-inset-bottom, 12px)", background: "linear-gradient(to top, rgba(10,5,2,0.96) 55%, transparent 100%)" }}>
//           <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 18px 4px" }}>
//             <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "2px", color: "rgba(254,253,223,0.35)", textTransform: "uppercase" }}>Frames</span>
//             <span style={{ fontSize: 9, color: "rgba(254,253,223,0.30)" }} aria-live="polite">{idx + 1} / {GLASS_OPTIONS.length}</span>
//           </div>

//           <div className="frame-scroller" role="listbox" aria-label="Select glasses frame" onTouchStart={(e) => e.stopPropagation()} onTouchEnd={(e) => e.stopPropagation()} style={{ display: "flex", gap: 10, padding: "4px 14px 14px", overflowX: "auto", scrollSnapType: "x mandatory", touchAction: "pan-x" }}>
//             {GLASS_OPTIONS.map((g) => {
//               const isA = glasses === g.id;
//               return (
//                 <div key={g.id} className="frame-card" role="option" aria-selected={isA} tabIndex={0} onClick={() => setGlasses(g.id)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setGlasses(g.id)} style={{ flexShrink: 0, scrollSnapAlign: "start", width: 64, height: 64, borderRadius: 16, background: isA ? "rgba(232,127,36,0.18)" : "rgba(30,20,10,0.70)", border: `1.5px solid ${isA ? C.primary : "rgba(255,255,255,0.12)"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", overflow: "hidden", padding: 6, transform: isA ? "scale(1.08)" : "scale(1)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", boxShadow: isA ? `0 0 20px rgba(232,127,36,0.50), 0 0 36px rgba(245,166,35,0.15)` : "none", position: "relative" }}>
//                   {isA && <div aria-hidden="true" style={{ position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)", width: 5, height: 5, borderRadius: "50%", background: C.primary, boxShadow: `0 0 6px ${C.primary}` }} />}
//                   <img src={g.id} alt={g.name} loading="lazy" style={{ width: "100%", height: "80%", objectFit: "contain", filter: isA ? `drop-shadow(0 0 5px rgba(232,127,36,0.70))` : "brightness(0.55) saturate(0.6)", transition: "filter 0.2s ease" }} />
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {!cameraReady && (
//           <div role="status" aria-label="Initializing camera" style={{ position: "absolute", inset: 0, zIndex: 50, background: `radial-gradient(ellipse 120% 80% at 55% 30%, rgba(232,127,36,0.08) 0%, rgba(10,5,2,0.99) 60%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
//             <div style={{ position: "relative", width: 44, height: 44 }}><div className="spinner" /><div className="spinner-inner" /></div>
//             <div style={{ textAlign: "center" }}>
//               <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 6, background: C.gradPrimary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>VR.OPTICS</div>
//               <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "3px", color: C.primary, marginBottom: 8 }}>INITIALIZING</div>
//               <div style={{ fontSize: 10, color: "rgba(254,253,223,0.40)" }}>Allow camera access to continue</div>
//             </div>
//             <div style={{ fontSize: 9, color: "rgba(254,253,223,0.22)", border: `0.5px solid rgba(255,255,255,0.10)`, borderRadius: 100, padding: "4px 14px" }}>← Swipe to browse frames →</div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   // ============================================================
//   // DESKTOP LAYOUT  (tablet falls through here until you add its branch)
//   // ============================================================
//   const desktopCfg = DEVICE_CONFIG.desktop.canvas;

//   return (
//     <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: C.gradBg, color: C.text, height: "100vh", display: "flex", overflow: "hidden" }}>
//       <style>{css}</style>

//       <div aria-hidden="true" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
//         <div style={{ position: "absolute", top: "-15%", right: "-8%", width: "52vw", height: "52vw", borderRadius: "50%", background: `radial-gradient(circle, rgba(232,127,36,0.14) 0%, rgba(232,127,36,0.04) 45%, transparent 70%)` }} />
//         <div style={{ position: "absolute", bottom: "-20%", left: "-12%", width: "48vw", height: "48vw", borderRadius: "50%", background: `radial-gradient(circle, rgba(115,165,202,0.12) 0%, rgba(115,165,202,0.03) 45%, transparent 70%)` }} />
//       </div>

//       {/* ── LEFT: Camera panel (75%) ── */}
//       <div style={{ position: "relative", zIndex: 1, flex: "0 0 75%", maxWidth: "75%", padding: 20, display: "flex", flexDirection: "column" }}>
//         <div style={{ flex: 1, position: "relative", borderRadius: 22, overflow: "hidden", border: `1px solid ${C.glassBorder}`, background: "#000", boxShadow: `inset 0 0 60px rgba(0,0,0,0.40), 0 0 0 1px rgba(232,127,36,0.08), 0 8px 40px rgba(30,41,59,0.12)` }}>

//           {cameraReady && (
//             <div role="status" aria-live="polite" style={{ position: "absolute", top: 16, right: 16, zIndex: 5, display: "flex", alignItems: "center", background: "rgba(0,0,0,0.42)", ...glassPill, border: `1px solid rgba(115,165,202,0.28)`, padding: "5px 14px", animation: "fadeIn 0.3s ease" }}>
//               <span className="ar-dot" aria-hidden="true" />
//               <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.80)", letterSpacing: "0.5px" }}>Face Tracking Active</span>
//             </div>
//           )}

//           <div style={{ position: "absolute", bottom: 16, left: 16, zIndex: 5 }}>
//             <div aria-live="polite" style={{ background: "rgba(0,0,0,0.52)", ...glassPill, border: `0.5px solid ${C.primary25}`, padding: "8px 20px", boxShadow: `0 4px 20px rgba(0,0,0,0.25), 0 0 16px ${C.primary12}`, display: "flex", alignItems: "center", gap: 12 }}>
//               <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(254,253,223,0.50)", letterSpacing: "1.5px" }}>SELECTED</span>
//               <span aria-hidden="true" style={{ width: 1, height: 11, background: C.primary30, display: "inline-block" }} />
//               <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(254,253,223,0.95)" }}>{currentGlass?.name}</span>
//               <span style={{ fontSize: 13, fontWeight: 700, background: C.gradPrimary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{currentGlass?.price}</span>
//             </div>
//           </div>

//           <video ref={videoRef} style={{ position: "absolute", visibility: "hidden", width: 0, height: 0, overflow: "hidden", pointerEvents: "none" }} autoPlay playsInline muted />

//           {/* Canvas initial size from DEVICE_CONFIG — overwritten by container measurement in useEffect */}
//           <canvas
//             ref={canvasRef}
//             width={desktopCfg.width}
//             height={desktopCfg.height}
//             aria-label="AR glasses try-on camera view"
//             style={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }}
//           />

//           {!cameraReady && (
//             <div role="status" aria-label="Initializing camera" style={{ position: "absolute", inset: 0, borderRadius: 22, zIndex: 30, background: `radial-gradient(ellipse 100% 60% at 55% 30%, rgba(232,127,36,0.08) 0%, rgba(254,253,223,0.97) 55%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
//               <div style={{ position: "relative", width: 50, height: 50 }}><div className="spinner" /><div className="spinner-inner" /></div>
//               <div style={{ textAlign: "center" }}>
//                 <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "3px", background: C.gradPrimary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8 }}>INITIALIZING CAMERA</div>
//                 <div style={{ fontSize: 12, color: C.text55 }}>Please allow camera access to continue</div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ── RIGHT: Controls panel (25%) ── */}
//       <div className="right-panel" role="complementary" aria-label="Frame selection and controls" style={{ position: "relative", zIndex: 1, flex: "0 0 25%", maxWidth: "25%", overflowY: "auto", padding: "20px 16px 20px 4px", display: "flex", flexDirection: "column", gap: 12, borderLeft: `1px solid ${C.glassBorder}`, background: `linear-gradient(180deg, rgba(245,243,199,0.60) 0%, rgba(254,253,223,0.80) 100%)`, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>

//         <div style={{ padding: "4px 4px 2px" }}>
//           <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 3 }}>Choose Frame</div>
//           <div style={{ fontSize: 10, letterSpacing: "1.5px", color: C.text30, fontWeight: 600, textTransform: "uppercase" }}>{GLASS_OPTIONS.length} styles available</div>
//         </div>

//         <div role="listbox" aria-label="Select glasses frame" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
//           {GLASS_OPTIONS.map((g) => {
//             const isA = glasses === g.id;
//             return (
//               <div key={g.id} className="frame-card" role="option" aria-selected={isA} tabIndex={0} onClick={() => setGlasses(g.id)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setGlasses(g.id)} style={{ borderRadius: 14, background: isA ? C.primary12 : "rgba(254,253,223,0.55)", border: `1px solid ${isA ? C.primary : C.surfaceBorder}`, padding: "10px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer", boxShadow: isA ? `0 0 20px rgba(232,127,36,0.20), 0 4px 12px rgba(30,41,59,0.08)` : `0 1px 4px ${C.text06}`, transition: "all 0.22s cubic-bezier(0.22,1,0.36,1)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}>
//                 <div style={{ width: "100%", height: 48, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, overflow: "hidden", background: isA ? C.primary12 : C.text06 }}>
//                   <img src={g.id} alt={g.name} loading="lazy" crossOrigin="anonymous" style={{ width: "90%", height: "90%", objectFit: "contain", filter: isA ? `drop-shadow(0 0 5px rgba(232,127,36,0.55))` : "brightness(0.80) saturate(0.75)", transition: "filter 0.2s ease" }} />
//                 </div>
//                 <div style={{ fontSize: 9, fontWeight: 700, textAlign: "center", lineHeight: 1.2, color: isA ? C.text : C.text55 }}>{g.name}</div>
//                 <div style={{ fontSize: 8, fontWeight: 700, background: isA ? C.gradPrimary : "none", WebkitBackgroundClip: isA ? "text" : "unset", WebkitTextFillColor: isA ? "transparent" : C.primary, color: isA ? "transparent" : C.primary }}>{g.price}</div>
//               </div>
//             );
//           })}
//         </div>

//         <Section title="FRAME CALIBRATION" icon="⚙️">
//           <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
//             <button onClick={resetAdj} aria-label="Reset frame calibration to defaults" style={{ fontSize: 9, fontWeight: 700, color: C.primary, background: C.primary12, border: `0.5px solid ${C.primary25}`, padding: "5px 14px", borderRadius: 100, cursor: "pointer", letterSpacing: "0.5px", transition: "background 0.15s" }}>Reset</button>
//           </div>
//           <SliderRow label="WIDTH"    value={curAdj.scaleW}  min={0.3}  max={3}   step={0.05} onChange={(v) => setAdj("scaleW",  v)} fmt={(v) => `${v.toFixed(2)}×`} />
//           <SliderRow label="HEIGHT"   value={curAdj.scaleH}  min={0.3}  max={3}   step={0.05} onChange={(v) => setAdj("scaleH",  v)} fmt={(v) => `${v.toFixed(2)}×`} />
//           <SliderRow label="MOVE L/R" value={curAdj.offsetX} min={-150} max={150} step={1}    onChange={(v) => setAdj("offsetX", v)} fmt={(v) => `${v > 0 ? "+" : ""}${v}px`} />
//           <SliderRow label="MOVE U/D" value={curAdj.offsetY} min={-150} max={150} step={1}    onChange={(v) => setAdj("offsetY", v)} fmt={(v) => `${v > 0 ? "+" : ""}${v}px`} />
//           <SliderRow label="ROTATION" value={curAdj.rotate}  min={-30}  max={30}  step={0.5}  onChange={(v) => setAdj("rotate",  v)} fmt={(v) => `${v > 0 ? "+" : ""}${v.toFixed(1)}°`} />
//         </Section>

//         <Section title="SCENE FILTERS" icon="🎨">
//           <SliderRow label="BRIGHTNESS" value={brightness} min={50}  max={160} step={1} onChange={setBrightness} fmt={(v) => `${v}%`} />
//           <SliderRow label="CONTRAST"   value={contrast}   min={60}  max={160} step={1} onChange={setContrast}   fmt={(v) => `${v}%`} />
//           <SliderRow label="SATURATION" value={saturate}   min={50}  max={160} step={1} onChange={setSaturate}   fmt={(v) => `${v}%`} />
//         </Section>
//       </div>
//     </div>
//   );
// };

// export default TryOn;















// import React, { useRef, useEffect, useState, useCallback } from "react";

// const DEFAULT_ADJ = { scaleW: 1,   scaleH: 1,    offsetX: 0, offsetY: 8,  rotate: 0 };
// const AVIATOR_ADJ = { scaleW: 1,   scaleH: 1.18, offsetX: 0, offsetY: 18, rotate: 0 };
// const ROUND_ADJ   = { scaleW: 1,   scaleH: 0.85, offsetX: 0, offsetY: 6,  rotate: 0 };

// const GLASS_OPTIONS = [
//   { id: "/glass1.png",  name: "Classic",      price: "PKR 4,500", emoji: "👓", sizes: [{ label:"XL", scale:1.10, mobileScale:0.65 }] },
//   { id: "/glass2.png",  name: "Aviator",      price: "PKR 5,200", emoji: "🕶️", sizes: [{ label:"L",  scale:1.15, mobileScale:1.00 }] },
//   { id: "/glass3.png",  name: "Sport",        price: "PKR 3,800", emoji: "🥽", sizes: [{ label:"L",  scale:1.15, mobileScale:1.00 }] },
//   { id: "/glass4.png",  name: "Round",        price: "PKR 4,900", emoji: "⭕", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass5.png",  name: "Wayfarer",     price: "PKR 4,900", emoji: "🕶️", sizes: [{ label:"L",  scale:1.25, mobileScale:0.98 }] },
//   { id: "/glass6.png",  name: "Vintage",      price: "PKR 4,900", emoji: "🪩", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass7.png",  name: "Clubmaster",   price: "PKR 4,900", emoji: "🔲", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
//   { id: "/glass8.png",  name: "Cat Eye",      price: "PKR 4,900", emoji: "😼", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
//   { id: "/glass9.png",  name: "Shield",       price: "PKR 4,900", emoji: "🛡️", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass10.png", name: "Oval",         price: "PKR 4,900", emoji: "🥚", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass11.png", name: "Square",       price: "PKR 4,900", emoji: "⬛", sizes: [{ label:"S",  scale:0.75, mobileScale:0.50 }] },
//   { id: "/glass12.png", name: "Hexagonal",    price: "PKR 4,900", emoji: "⬡", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass13.png", name: "Geometric",    price: "PKR 4,900", emoji: "🔷", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass14.png", name: "Steampunk",    price: "PKR 4,900", emoji: "⚙️", sizes: [{ label:"S",  scale:0.95, mobileScale:0.50 }] },
//   { id: "/glass15.png", name: "Sports Pro",   price: "PKR 4,900", emoji: "🏃", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass16.png", name: "Retro",        price: "PKR 4,900", emoji: "🎞️", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass17.png", name: "Modern",       price: "PKR 4,900", emoji: "✨", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass18.png", name: "Luxury",       price: "PKR 4,900", emoji: "💎", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass19.png", name: "Designer",     price: "PKR 4,900", emoji: "🎨", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass20.png", name: "Classic II",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass21.png", name: "Classic III",  price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass22.png", name: "Classic IV",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.05, mobileScale:0.95 }] },
//   { id: "/glass23.png", name: "Classic V",    price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass24.png", name: "Classic VI",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"S",  scale:0.85, mobileScale:0.50 }] },
//   { id: "/glass25.png", name: "Classic VII",  price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass26.png", name: "Classic VIII", price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass27.png", name: "Classic IX",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass28.png", name: "Classic X",    price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass29.png", name: "Classic XI",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.25, mobileScale:0.95 }] },
//   { id: "/glass30.png", name: "Classic XII",  price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass31.png", name: "Classic 31",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass32.png", name: "Classic 32",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass33.png", name: "Classic 33",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass34.png", name: "Classic 34",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass35.png", name: "Classic 35",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.10, mobileScale:0.75 }] },
//   { id: "/glass36.png", name: "Classic 36",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass37.png", name: "Classic 37",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass38.png", name: "Classic 38",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
//   { id: "/glass39.png", name: "Classic 39",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass40.png", name: "Classic 40",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass41.png", name: "Classic 41",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass42.png", name: "Classic 42",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"S",  scale:0.95, mobileScale:0.50 }] },
//   { id: "/glass43.png", name: "Classic 43",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass44.png", name: "Classic 44",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass45.png", name: "Classic 45",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
//   { id: "/glass46.png", name: "Classic 46",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.40, mobileScale:1.10 }] },
//   { id: "/glass47.png", name: "Classic 47",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.20, mobileScale:1.10 }] },
//   { id: "/glass48.png", name: "Classic 48",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass49.png", name: "Classic 49",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
// ];

// const getIsMobile = () =>
//   typeof window !== "undefined" &&
//   (window.innerWidth < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

// const getMobileSizes = () => {
//   // FIX 7: Detect landscape and swap dims so canvas coordinate space matches CSS display
//   const landscape = typeof window !== "undefined" && window.innerWidth > window.innerHeight;
//   const isLowEnd = typeof window !== "undefined" &&
//     (window.innerWidth <= 360 || navigator.deviceMemory <= 4);
//   if (isLowEnd) {
//     return landscape
//       ? { camW: 480, camH: 360, canvasW: 480, canvasH: 360 }
//       : { camW: 360, camH: 480, canvasW: 360, canvasH: 480 };
//   }
//   return landscape
//     ? { camW: 640, camH: 480, canvasW: 640, canvasH: 480 }
//     : { camW: 480, camH: 640, canvasW: 480, canvasH: 640 };
// };

// const getSizeScale = (sizeObj, mobile) => {
//   if (!sizeObj) return 1;
//   return mobile ? (sizeObj.mobileScale ?? sizeObj.scale) : sizeObj.scale;
// };

// const MOBILE_EMA_ALPHA   = 0.55;
// const DESKTOP_EMA_ALPHA  = 0.50;
// const MOBILE_DEADZONE    = 1.2;
// const MOBILE_FPS         = 24;
// const MOBILE_FRAME_INT   = 1000 / MOBILE_FPS;

// const DESKTOP_CAM_W      = 1280;
// const DESKTOP_CAM_H      = 720;
// const DESKTOP_CANVAS_W   = 1280;
// const DESKTOP_CANVAS_H   = 720;

// // FIX 3: All beauty values set to 100 so needsFilter check works correctly
// // and no unnecessary filter string is built every frame at neutral settings
// const BEAUTY_B = 100;
// const BEAUTY_C = 100;
// const BEAUTY_S = 100;

// const LANDMARKS = {
//   LEFT_IRIS_CENTER:    468,
//   RIGHT_IRIS_CENTER:   473,
//   LEFT_EYE_OUTER:       33,
//   RIGHT_EYE_OUTER:     263,
//   LEFT_EYE_INNER:      133,
//   RIGHT_EYE_INNER:     362,
//   LEFT_EYEBROW_LOWER:  [70, 63, 105, 66, 107],
//   RIGHT_EYEBROW_LOWER: [300, 293, 334, 296, 336],
//   NOSE_BRIDGE_TOP:     6,
//   LEFT_FACE_EDGE:      234,
//   RIGHT_FACE_EDGE:     454,
// };

// class LandmarkSmoother {
//   constructor(posAlpha = 0.45, rotAlpha = 0.35) {
//     this.posAlpha = posAlpha;
//     this.rotAlpha = rotAlpha;
//     this.prev = null;
//   }
//   smooth(current, deadzone = 0) {
//     if (!this.prev) { this.prev = { ...current }; return { ...current }; }
//     const result = {};
//     for (const key of Object.keys(current)) {
//       const alpha = key === "angle" ? this.rotAlpha : this.posAlpha;
//       const delta = current[key] - this.prev[key];
//       result[key] = (deadzone > 0 && Math.abs(delta) < deadzone)
//         ? this.prev[key]
//         : this.prev[key] + alpha * delta;
//     }
//     this.prev = { ...result };
//     return result;
//   }
//   reset() { this.prev = null; }
// }

// function extractFaceGeometry(lm, W, H, useIris = true) {
//   const px = (idx) => ({ x: lm[idx].x * W, y: lm[idx].y * H, z: lm[idx].z ?? 0 });

//   const avgPx = (indices) => {
//     const pts = indices.map(i => px(i));
//     return {
//       x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
//       y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
//     };
//   };
//   const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

//   const leftEyeOut     = px(LANDMARKS.LEFT_EYE_OUTER);
//   const rightEyeOut    = px(LANDMARKS.RIGHT_EYE_OUTER);
//   const leftBrowLower  = avgPx(LANDMARKS.LEFT_EYEBROW_LOWER);
//   const rightBrowLower = avgPx(LANDMARKS.RIGHT_EYEBROW_LOWER);
//   const noseBridgeTop  = px(LANDMARKS.NOSE_BRIDGE_TOP);

//   let leftIris, rightIris;
//   if (useIris && lm.length > 473) {
//     leftIris  = px(LANDMARKS.LEFT_IRIS_CENTER);
//     rightIris = px(LANDMARKS.RIGHT_IRIS_CENTER);
//   } else {
//     const leftInner  = px(LANDMARKS.LEFT_EYE_INNER);
//     const rightInner = px(LANDMARKS.RIGHT_EYE_INNER);
//     leftIris  = { x: (leftEyeOut.x + leftInner.x) / 2, y: (leftEyeOut.y + leftInner.y) / 2, z: 0 };
//     rightIris = { x: (rightEyeOut.x + rightInner.x) / 2, y: (rightEyeOut.y + rightInner.y) / 2, z: 0 };
//   }

//   const browMidLower = {
//     x: (leftBrowLower.x + rightBrowLower.x) / 2,
//     y: (leftBrowLower.y + rightBrowLower.y) / 2,
//   };

//   const eyeSpan = dist(leftEyeOut, rightEyeOut);

//   const angleIris       = Math.atan2(rightIris.y - leftIris.y, rightIris.x - leftIris.x);
//   const angleEyeCorners = Math.atan2(rightEyeOut.y - leftEyeOut.y, rightEyeOut.x - leftEyeOut.x);
//   const angleBrow       = Math.atan2(rightBrowLower.y - leftBrowLower.y, rightBrowLower.x - leftBrowLower.x);
//   const angle = angleEyeCorners * 0.6 + angleBrow * 0.3 + angleIris * 0.1;

//   const irisY   = (leftIris.y + rightIris.y) / 2;
//   const centerX = (leftIris.x + rightIris.x) / 2;
//   const centerY = browMidLower.y * 0.25 + noseBridgeTop.y * 0.55 + irisY * 0.20;

//   // FIX 5: Scale up eyeSpan on mobile to compensate for narrower lid-corner span
//   // (no refined landmarks → eye corners are ~30% narrower than real face width)
//   const spanMult      = useIris ? 1.0 : 1.35;
//   const glassesWidth  = eyeSpan * 2.0 * spanMult;
//   const glassesHeight = eyeSpan * 0.75 * spanMult;

//   const avgZ       = (leftIris.z + rightIris.z + (noseBridgeTop.z ?? 0)) / 3;
//   const depthScale = Math.max(0.92, Math.min(1.08, 1 + (-avgZ * 0.6)));

//   return { centerX, centerY, angle, glassesWidth, glassesHeight, depthScale };
// }

// const C = {
//   primary:        "#E87F24",
//   accent:         "#73A5CA",
//   bg:             "#FEFDDF",
//   surface:        "#F5F3C7",
//   text:           "#1E293B",
//   primary12:      "rgba(232,127,36,0.12)",
//   primary20:      "rgba(232,127,36,0.20)",
//   primary25:      "rgba(232,127,36,0.25)",
//   primary30:      "rgba(232,127,36,0.30)",
//   primary40:      "rgba(232,127,36,0.40)",
//   accent12:       "rgba(115,165,202,0.12)",
//   accent20:       "rgba(115,165,202,0.20)",
//   accent28:       "rgba(115,165,202,0.28)",
//   text55:         "rgba(30,41,59,0.55)",
//   text30:         "rgba(30,41,59,0.30)",
//   text12:         "rgba(30,41,59,0.12)",
//   text06:         "rgba(30,41,59,0.06)",
//   glassBg:        "rgba(254,253,223,0.65)",
//   glassBorder:    "rgba(255,255,255,0.70)",
//   surfaceBorder:  "rgba(255,255,255,0.85)",
//   white15:        "rgba(255,255,255,0.15)",
//   white08:        "rgba(255,255,255,0.08)",
//   gradPrimary:    "linear-gradient(135deg, #E87F24, #F5A623)",
//   gradPrimaryText:"linear-gradient(135deg, #F5A623, #E87F24)",
//   gradBg: `
//     radial-gradient(ellipse 60% 50% at 80% 10%, rgba(232,127,36,0.13) 0%, transparent 60%),
//     radial-gradient(ellipse 50% 40% at 10% 80%, rgba(115,165,202,0.12) 0%, transparent 55%),
//     #FEFDDF
//   `,
// };

// const glassPill = {
//   borderRadius: 100,
//   backdropFilter: "blur(14px)",
//   WebkitBackdropFilter: "blur(14px)",
// };

// const Section = ({ title, icon, defaultOpen = false, children }) => {
//   const [open, setOpen] = useState(defaultOpen);
//   return (
//     <div style={{
//       borderRadius: 16, border: `1px solid ${C.glassBorder}`, overflow: "hidden",
//       background: C.glassBg, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
//       boxShadow: `0 2px 8px ${C.text06}`,
//     }}>
//       <button
//         onClick={() => setOpen(o => !o)}
//         aria-expanded={open}
//         aria-label={`${open ? "Collapse" : "Expand"} ${title}`}
//         style={{
//           width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
//           padding: "13px 16px", background: "rgba(254,253,223,0.50)", border: "none", cursor: "pointer",
//           borderBottom: open ? `1px solid ${C.glassBorder}` : "none",
//         }}
//       >
//         <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: C.primary }}>
//           <span style={{ fontSize: 13 }} aria-hidden="true">{icon}</span>{title}
//         </span>
//         <span aria-hidden="true" style={{
//           fontSize: 9, color: C.text55,
//           transform: open ? "rotate(180deg)" : "rotate(0)",
//           transition: "transform 0.22s ease", display: "inline-block",
//         }}>▼</span>
//       </button>
//       {open && <div style={{ padding: "16px", background: "rgba(245,243,199,0.40)" }}>{children}</div>}
//     </div>
//   );
// };

// const SliderRow = ({ label, value, min, max, step, onChange, fmt }) => (
//   <div style={{ marginBottom: 18 }}>
//     <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
//       <label style={{ fontSize: 10, color: C.text55, fontWeight: 600, letterSpacing: "1px" }}>{label}</label>
//       <span style={{ fontSize: 11, fontWeight: 700, background: C.gradPrimaryText, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
//         {fmt(value)}
//       </span>
//     </div>
//     <input
//       type="range" min={min} max={max} step={step} value={value}
//       aria-label={label}
//       onChange={e => onChange(Number(e.target.value))}
//       style={{ width: "100%", height: 3, background: C.primary20, borderRadius: 4, appearance: "none", WebkitAppearance: "none", cursor: "pointer" }}
//     />
//   </div>
// );

// const TryOn = () => {
//   const videoRef          = useRef(null);
//   const canvasRef         = useRef(null);
//   const imgRef            = useRef(new Image());
//   const trackRef          = useRef({ hasLandmarks: false });
//   const rafIdRef          = useRef(null);
//   const lastFrameRef      = useRef(0);
//   const touchStartX       = useRef(null);
//   const touchStartY       = useRef(null);
//   const cameraRdyRef      = useRef(false);
//   const glassesRef        = useRef("/glass1.png");
//   const adjRef            = useRef({});
//   const pendingResultRef  = useRef(null);
//   const camStreamRef      = useRef(null);
//   const camInstanceRef    = useRef(null);
//   const cachedGlassObjRef = useRef(null);
//   const ctxRef            = useRef(null);
//   const resultVersionRef  = useRef(0);
//   // FIX 4: Start at -1 so first frame (version=0) always draws
//   const lastDrawnVersionRef = useRef(-1);

//   const [isMobile, setIsMobile] = useState(() => getIsMobile());
//   const isMobileRef = useRef(isMobile);
//   const [mobileSizes, setMobileSizes] = useState(() => getMobileSizes());

//   useEffect(() => {
//     const onResize = () => {
//       const m = getIsMobile();
//       isMobileRef.current = m;
//       setIsMobile(m);
//       // FIX 8: Invalidate cached context on resize so stale context is not reused
//       ctxRef.current = null;
//       if (m) setMobileSizes(getMobileSizes());
//     };
//     window.addEventListener("resize", onResize, { passive: true });
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   const smootherRef = useRef(null);
//   if (!smootherRef.current) {
//     smootherRef.current = new LandmarkSmoother(
//       isMobile ? MOBILE_EMA_ALPHA : DESKTOP_EMA_ALPHA,
//       isMobile ? 0.28 : 0.40
//     );
//   }

//   const [glasses, setGlasses]         = useState("/glass1.png");
//   const [cameraReady, setCameraReady] = useState(false);
//   const [brightness, setBrightness]   = useState(100);
//   const [contrast,   setContrast]     = useState(100);
//   const [saturate,   setSaturate]     = useState(100);
//   const [mpError,    setMpError]      = useState(null);

//   const brightnessRef = useRef(100);
//   const contrastRef   = useRef(100);
//   const saturateRef   = useRef(100);

//   useEffect(() => { brightnessRef.current = brightness; }, [brightness]);
//   useEffect(() => { contrastRef.current   = contrast;   }, [contrast]);
//   useEffect(() => { saturateRef.current   = saturate;   }, [saturate]);

//   const adjustmentsRef = useRef(
//     Object.fromEntries(GLASS_OPTIONS.map(g => {
//       if (g.id === "/glass2.png") return [g.id, { ...AVIATOR_ADJ }];
//       if (g.id === "/glass4.png") return [g.id, { ...ROUND_ADJ }];
//       return [g.id, { ...DEFAULT_ADJ }];
//     }))
//   );
//   const [adjUIState, setAdjUIState] = useState(() => adjustmentsRef.current["/glass1.png"]);

//   useEffect(() => {
//     glassesRef.current        = glasses;
//     adjRef.current            = adjustmentsRef.current;
//     cachedGlassObjRef.current = GLASS_OPTIONS.find(g => g.id === glasses) || null;
//     setAdjUIState({ ...(adjustmentsRef.current[glasses] || DEFAULT_ADJ) });
//   }, [glasses]);

//   const setAdj = useCallback((key, val) => {
//     const id = glassesRef.current;
//     adjustmentsRef.current = {
//       ...adjustmentsRef.current,
//       [id]: { ...(adjustmentsRef.current[id] || DEFAULT_ADJ), [key]: val },
//     };
//     adjRef.current = adjustmentsRef.current;
//     setAdjUIState(prev => ({ ...prev, [key]: val }));
//   }, []);

//   const resetAdj = useCallback(() => {
//     const id = glassesRef.current;
//     const defaults =
//       id === "/glass2.png" ? { ...AVIATOR_ADJ } :
//       id === "/glass4.png" ? { ...ROUND_ADJ }   : { ...DEFAULT_ADJ };
//     adjustmentsRef.current = { ...adjustmentsRef.current, [id]: defaults };
//     adjRef.current = adjustmentsRef.current;
//     setAdjUIState({ ...defaults });
//   }, []);

//   useEffect(() => {
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.src = glasses;
//     imgRef.current = img;
//   }, [glasses]);

//   // ── Draw loop ─────────────────────────────────────────────────
//   const drawLoop = useCallback(() => {
//     rafIdRef.current = requestAnimationFrame(drawLoop);

//     const mobile = isMobileRef.current;
//     const now    = performance.now();

//     if (mobile && now - lastFrameRef.current < MOBILE_FRAME_INT) return;
//     lastFrameRef.current = now;

//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     if (!ctxRef.current) {
//       ctxRef.current = canvas.getContext("2d", { alpha: false, willReadFrequently: false });
//     }
//     const ctx = ctxRef.current;
//     if (!ctx) return;

//     const result = pendingResultRef.current;
//     if (!result?.image || resultVersionRef.current === lastDrawnVersionRef.current) return;

//     const W = canvas.width, H = canvas.height;

//     // Draw mirrored camera frame
//     if (mobile) {
//       ctx.filter = "none";
//     } else {
//       const userB = brightnessRef.current;
//       const userC = contrastRef.current;
//       const userS = saturateRef.current;
//       const needsFilter = userB !== 100 || userC !== 100 || userS !== 100
//         || BEAUTY_B !== 100 || BEAUTY_C !== 100 || BEAUTY_S !== 100;
//       ctx.filter = needsFilter
//         ? `brightness(${BEAUTY_B}%) contrast(${BEAUTY_C}%) saturate(${BEAUTY_S}%) brightness(${userB}%) contrast(${userC}%) saturate(${userS}%)`
//         : "none";
//     }

//     ctx.save();
//     ctx.translate(W, 0);
//     ctx.scale(-1, 1);
//     ctx.drawImage(result.image, 0, 0, W, H);
//     ctx.restore();
//     ctx.filter = "none";

//     if (!result.multiFaceLandmarks?.length) {
//       smootherRef.current.reset();
//       trackRef.current.hasLandmarks = false;
//       lastDrawnVersionRef.current   = resultVersionRef.current;
//       return;
//     }

//     const lm = result.multiFaceLandmarks[0];

//     // useIris=true on desktop (refineLandmarks=true → indices 468/473 exist)
//     // useIris=false on mobile (refineLandmarks=false → use eye-corner midpoint fallback)
//     const geo = extractFaceGeometry(lm, W, H, !mobile);

//     // FIX 1: Mirror the centerX to match the mirrored canvas draw
//     // Landmark X coords are in original (unmirrored) camera space.
//     // Canvas is drawn with scale(-1,1), so we must flip X: mirroredCx = W - centerX
//     const mirroredCx = W - geo.centerX;

//     const sm = smootherRef.current.smooth(
//       {
//         cx:    mirroredCx,
//         cy:    geo.centerY,
//         gw:    geo.glassesWidth,
//         gh:    geo.glassesHeight,
//         angle: geo.angle,
//         ds:    geo.depthScale,
//       },
//       mobile ? MOBILE_DEADZONE : 0
//     );

//     trackRef.current.hasLandmarks = true;

//     const img = imgRef.current;
//     if (!img.complete || !img.naturalWidth) {
//       lastDrawnVersionRef.current = resultVersionRef.current;
//       return;
//     }

//     const glassObj = cachedGlassObjRef.current;
//     const sSc      = glassObj?.sizes?.[0] ? getSizeScale(glassObj.sizes[0], mobile) : 1.0;
//     const adj      = adjRef.current[glassesRef.current] || DEFAULT_ADJ;

//     // Apply per-frame depth scale only on desktop (stable z data)
//     let w = mobile ? sm.gw * adj.scaleW : sm.gw * adj.scaleW * sm.ds;
//     let h = mobile ? sm.gh * adj.scaleH : sm.gh * adj.scaleH * sm.ds;
//     w *= sSc; h *= sSc;

//     // FIX 2: Negate rotation angle because canvas is horizontally mirrored
//     // Without this, head tilt left shows glasses tilted right (reversed)
//     const mirroredAngle = -sm.angle;

//     ctx.save();
//     ctx.translate(sm.cx + adj.offsetX, sm.cy + adj.offsetY);
//     ctx.rotate(mirroredAngle + adj.rotate * Math.PI / 180);
//     ctx.drawImage(img, -w / 2, -h / 2, w, h);
//     ctx.restore();

//     lastDrawnVersionRef.current = resultVersionRef.current;
//   }, []);

//   const onResults = useCallback((results) => {
//     pendingResultRef.current = results;
//     resultVersionRef.current++;
//   }, []);

//   // ── Camera + FaceMesh init ────────────────────────────────────
//   useEffect(() => {
//     if (!window.FaceMesh) {
//       setMpError("MediaPipe FaceMesh not found. Add the MediaPipe <script> tag to index.html.");
//       return;
//     }

//     const mobile = isMobileRef.current;
//     let camW, camH, canvasW, canvasH;

//     if (mobile) {
//       const sizes = mobileSizes;
//       camW    = sizes.camW;
//       camH    = sizes.camH;
//       canvasW = sizes.canvasW;
//       canvasH = sizes.canvasH;
//     } else {
//       camW    = DESKTOP_CAM_W;
//       camH    = DESKTOP_CAM_H;
//       canvasW = DESKTOP_CANVAS_W;
//       canvasH = DESKTOP_CANVAS_H;
//     }

//     if (canvasRef.current) {
//       canvasRef.current.width  = canvasW;
//       canvasRef.current.height = canvasH;
//       // FIX 8: Always clear cached context when canvas is resized
//       ctxRef.current = null;
//     }

//     const faceMesh = new window.FaceMesh({
//       locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/${file}`,
//     });
//     faceMesh.setOptions({
//       maxNumFaces:            1,
//       refineLandmarks:        !mobile,
//       minDetectionConfidence: mobile ? 0.35 : 0.50,
//       minTrackingConfidence:  mobile ? 0.30 : 0.50,
//     });
//     faceMesh.onResults(onResults);

//     rafIdRef.current = requestAnimationFrame(drawLoop);

//     navigator.mediaDevices.getUserMedia({
//       video: {
//         facingMode: "user",
//         width:      { ideal: camW },
//         height:     { ideal: camH },
//         frameRate:  { ideal: mobile ? 30 : 60 },
//       },
//       audio: false,
//     })
//     .then(stream => {
//       camStreamRef.current = stream;
//       const video = videoRef.current;
//       if (!video) return;

//       video.srcObject = stream;
//       video.onloadedmetadata = () => {
//         video.play().then(() => {
//           cameraRdyRef.current = true;
//           setCameraReady(true);

//           const sendFrame = async () => {
//             // FIX 6: Check cameraRdyRef BEFORE scheduling next RAF
//             // so that if cleanup fires between the check and the send, we stop cleanly
//             if (!cameraRdyRef.current) return;
//             try {
//               if (video.readyState >= 2) {
//                 await faceMesh.send({ image: video });
//               }
//             } catch (_) { /* ignore send errors on cleanup */ }
//             if (cameraRdyRef.current) {
//               camInstanceRef.current = requestAnimationFrame(sendFrame);
//             }
//           };
//           camInstanceRef.current = requestAnimationFrame(sendFrame);
//         }).catch(err => {
//           console.error("Video play failed:", err);
//           setMpError("Could not start video playback. Please reload and allow camera access.");
//         });
//       };
//     })
//     .catch(err => {
//       console.error("Camera failed:", err);
//       setMpError("Camera access denied or not available. Please allow camera permissions and reload.");
//     });

//     return () => {
//       // FIX 9: Set cameraRdyRef=false FIRST so any in-flight sendFrame RAF
//       // sees it and stops before faceMesh.close() is called
//       cameraRdyRef.current = false;

//       if (rafIdRef.current)       cancelAnimationFrame(rafIdRef.current);
//       if (camInstanceRef.current) cancelAnimationFrame(camInstanceRef.current);

//       if (camStreamRef.current) {
//         camStreamRef.current.getTracks().forEach(t => t.stop());
//         camStreamRef.current = null;
//       }
//       if (videoRef.current?.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach(t => t.stop());
//         videoRef.current.srcObject = null;
//       }
//       // Now safe to close — no more sendFrame calls can reach faceMesh
//       faceMesh.close();
//     };
//   }, [drawLoop, onResults, mobileSizes]);

//   const css = `
//     @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600&display=swap');
//     *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//     input[type="range"] { -webkit-appearance: none; appearance: none; background: transparent; }
//     input[type="range"]::-webkit-slider-runnable-track {
//       background: linear-gradient(90deg, rgba(232,127,36,0.30), rgba(232,127,36,0.10));
//       height: 3px; border-radius: 3px;
//     }
//     input[type="range"]::-webkit-slider-thumb {
//       -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%;
//       background: radial-gradient(circle at 38% 35%, #F5A623, #E87F24);
//       cursor: pointer; margin-top: -6.5px;
//       border: 2px solid rgba(254,253,223,0.90);
//       box-shadow: 0 2px 8px rgba(232,127,36,0.40);
//     }
//     input[type="range"]::-moz-range-thumb {
//       width: 16px; height: 16px; border-radius: 50%;
//       background: radial-gradient(circle at 38% 35%, #F5A623, #E87F24);
//       cursor: pointer; border: 2px solid rgba(254,253,223,0.90);
//       box-shadow: 0 2px 8px rgba(232,127,36,0.40);
//     }
//     .right-panel { scrollbar-width: thin; scrollbar-color: rgba(232,127,36,0.40) rgba(232,127,36,0.08); }
//     ::-webkit-scrollbar { width: 3px; height: 3px; }
//     ::-webkit-scrollbar-track { background: rgba(232,127,36,0.06); border-radius: 4px; }
//     ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #E87F24, #F5A623); border-radius: 4px; }
//     .frame-scroller { scroll-behavior: smooth; -webkit-overflow-scrolling: touch; scrollbar-width: none; -ms-overflow-style: none; }
//     .frame-scroller::-webkit-scrollbar { display: none; }
//     .frame-card { transition: transform 0.2s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s ease; -webkit-tap-highlight-color: transparent; }
//     .frame-card:hover { transform: translateY(-2px) scale(1.03); }
//     .frame-card:active { transform: scale(0.96); }
//     @keyframes spin    { to { transform: rotate(360deg); } }
//     @keyframes fadeIn  { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
//     @keyframes pulse   { 0%,100%{ opacity:0.55 } 50%{ opacity:1 } }
//     .spinner {
//       width: 44px; height: 44px; border-radius: 50%;
//       border: 2px solid rgba(115,165,202,0.20);
//       border-top-color: #E87F24;
//       animation: spin 0.85s linear infinite;
//     }
//     .spinner-inner {
//       width: 30px; height: 30px; border-radius: 50%;
//       border: 1.5px solid rgba(232,127,36,0.15);
//       border-bottom-color: #F5A623;
//       animation: spin 1.2s linear infinite reverse;
//       position: absolute; top: 7px; left: 7px;
//     }
//     .ar-dot {
//       width: 7px; height: 7px; border-radius: 50%;
//       background: #73A5CA;
//       box-shadow: 0 0 8px rgba(115,165,202,0.70);
//       animation: pulse 2s ease infinite;
//       display: inline-block;
//       margin-right: 6px;
//       flex-shrink: 0;
//     }
//     .frame-card:focus-visible { outline: 2px solid #E87F24; outline-offset: 2px; }
//   `;

//   if (mpError) return (
//     <div role="alert" style={{
//       display: "flex", alignItems: "center", justifyContent: "center",
//       height: "100vh", background: C.bg, color: "#c2410c",
//       fontFamily: "monospace", padding: 24, textAlign: "center", fontSize: 13,
//     }}>
//       ⚠️ {mpError}
//     </div>
//   );

//   const currentGlass = GLASS_OPTIONS.find(g => g.id === glasses);
//   const curAdj = adjUIState;

//   // ══════════════════════════════════════════════════════════════
//   // MOBILE LAYOUT
//   // ══════════════════════════════════════════════════════════════
//   if (isMobile) {
//     const idx = GLASS_OPTIONS.findIndex(g => g.id === glasses);
//     const { canvasW, canvasH } = mobileSizes;

//     const onTouchStart = (e) => {
//       touchStartX.current = e.touches[0].clientX;
//       touchStartY.current = e.touches[0].clientY;
//     };
//     const onTouchEnd = (e) => {
//       if (touchStartX.current === null) return;
//       const dx = e.changedTouches[0].clientX - touchStartX.current;
//       const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
//       if (Math.abs(dx) > 50 && Math.abs(dx) > dy) {
//         const cur = GLASS_OPTIONS.findIndex(g => g.id === glassesRef.current);
//         if (dx < 0 && cur < GLASS_OPTIONS.length - 1) setGlasses(GLASS_OPTIONS[cur + 1].id);
//         if (dx > 0 && cur > 0)                        setGlasses(GLASS_OPTIONS[cur - 1].id);
//       }
//       touchStartX.current = null;
//       touchStartY.current = null;
//     };

//     return (
//       <div
//         style={{ position:"fixed", inset:0, background:"#000", fontFamily:"'Space Grotesk',sans-serif", color:"#fff", overflow:"hidden", touchAction:"pan-y" }}
//         onTouchStart={onTouchStart}
//         onTouchEnd={onTouchEnd}
//       >
//         <style>{css}</style>
//         <video
//           ref={videoRef}
//           style={{
//             position: "absolute",
//             left: "-100%",
//             top: "-100%",
//             width: "1px",
//             height: "1px",
//             opacity: 0,
//             pointerEvents: "none",
//           }}
//           autoPlay
//           playsInline
//           muted
//         />

//         <canvas
//           ref={canvasRef}
//           width={canvasW}
//           height={canvasH}
//           style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", display:"block" }}
//           aria-label="AR glasses try-on camera view"
//         />

//         {/* Top vignette */}
//         <div style={{
//           position:"absolute", top:0, left:0, right:0, height:"22%",
//           background:"linear-gradient(to bottom, rgba(0,0,0,0.50), transparent)",
//           pointerEvents:"none",
//         }} aria-hidden="true" />

//         {/* AR tracking indicator */}
//         {cameraReady && (
//           <div role="status" aria-live="polite" style={{
//             position:"absolute", top:18, left:16, zIndex:20,
//             display:"flex", alignItems:"center",
//             background:"rgba(0,0,0,0.42)", ...glassPill,
//             border:`1px solid rgba(115,165,202,0.30)`,
//             padding:"5px 12px", animation:"fadeIn 0.35s ease",
//           }}>
//             <span className="ar-dot" aria-hidden="true" />
//             <span style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,0.80)", letterSpacing:"0.5px" }}>Tracking</span>
//           </div>
//         )}

//         {/* Frame name + price chip */}
//         {cameraReady && currentGlass && (
//           <div aria-live="polite" style={{
//             position:"absolute", bottom:176, left:"50%", transform:"translateX(-50%)",
//             zIndex:20, whiteSpace:"nowrap",
//             background:"rgba(0,0,0,0.48)", ...glassPill,
//             border:`1px solid ${C.primary25}`,
//             padding:"7px 20px",
//             display:"flex", alignItems:"center", gap:10,
//             animation:"fadeIn 0.3s ease",
//             boxShadow:`0 4px 20px rgba(0,0,0,0.25), 0 0 20px ${C.primary12}`,
//           }}>
//             <span style={{ fontSize:13, fontWeight:700, color:"rgba(254,253,223,0.95)" }}>{currentGlass.name}</span>
//             <span aria-hidden="true" style={{ width:1, height:11, background:C.primary30, display:"inline-block" }} />
//             <span style={{ fontSize:13, fontWeight:700, background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//               {currentGlass.price}
//             </span>
//           </div>
//         )}

//         {/* Progress dots */}
//         {cameraReady && (
//           <div aria-hidden="true" style={{
//             position:"absolute", bottom:158, left:"50%", transform:"translateX(-50%)",
//             display:"flex", gap:4, zIndex:20,
//           }}>
//             {GLASS_OPTIONS.map((g, i) => (
//               <div key={g.id} style={{
//                 width: i === idx ? 14 : 4, height:4, borderRadius:3,
//                 background: i === idx ? C.primary : C.white15,
//                 transition:"all 0.25s ease",
//               }} />
//             ))}
//           </div>
//         )}

//         {/* Bottom frame scroller */}
//         <div style={{
//           position:"absolute", bottom:0, left:0, right:0, zIndex:20,
//           paddingBottom:"env(safe-area-inset-bottom, 12px)",
//           background:"linear-gradient(to top, rgba(10,5,2,0.96) 55%, transparent 100%)",
//         }}>
//           <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 18px 4px" }}>
//             <span style={{ fontSize:9, fontWeight:700, letterSpacing:"2px", color:"rgba(254,253,223,0.35)", textTransform:"uppercase" }}>Frames</span>
//             <span style={{ fontSize:9, color:"rgba(254,253,223,0.30)" }} aria-live="polite">{idx + 1} / {GLASS_OPTIONS.length}</span>
//           </div>

//           <div
//             className="frame-scroller"
//             role="listbox"
//             aria-label="Select glasses frame"
//             style={{
//               display:"flex", gap:10, padding:"4px 14px 14px",
//               overflowX:"auto", scrollSnapType:"x mandatory",
//             }}
//           >
//             {GLASS_OPTIONS.map(g => {
//               const isA = glasses === g.id;
//               return (
//                 <div
//                   key={g.id}
//                   className="frame-card"
//                   role="option"
//                   aria-selected={isA}
//                   tabIndex={0}
//                   onClick={() => setGlasses(g.id)}
//                   onKeyDown={e => (e.key === "Enter" || e.key === " ") && setGlasses(g.id)}
//                   style={{
//                     flexShrink:0, scrollSnapAlign:"start",
//                     width:64, height:64, borderRadius:16,
//                     background: isA ? "rgba(232,127,36,0.18)" : "rgba(30,20,10,0.70)",
//                     border:`1.5px solid ${isA ? C.primary : "rgba(255,255,255,0.12)"}`,
//                     display:"flex", alignItems:"center", justifyContent:"center",
//                     cursor:"pointer", overflow:"hidden", padding:6,
//                     transform: isA ? "scale(1.08)" : "scale(1)",
//                     backdropFilter:"blur(10px)", WebkitBackdropFilter:"blur(10px)",
//                     boxShadow: isA ? `0 0 20px rgba(232,127,36,0.50), 0 0 36px rgba(245,166,35,0.15)` : "none",
//                     position:"relative",
//                   }}
//                 >
//                   {isA && (
//                     <div aria-hidden="true" style={{
//                       position:"absolute", bottom:4, left:"50%", transform:"translateX(-50%)",
//                       width:5, height:5, borderRadius:"50%",
//                       background:C.primary, boxShadow:`0 0 6px ${C.primary}`,
//                     }} />
//                   )}
//                   <img
//                     src={g.id}
//                     alt={g.name}
//                     loading="lazy"
//                     style={{
//                       width:"100%", height:"80%", objectFit:"contain",
//                       filter: isA ? `drop-shadow(0 0 5px rgba(232,127,36,0.70))` : "brightness(0.55) saturate(0.6)",
//                       transition:"filter 0.2s ease",
//                     }}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {!cameraReady && (
//           <div role="status" aria-label="Initializing camera" style={{
//             position:"absolute", inset:0, zIndex:50,
//             background:`radial-gradient(ellipse 120% 80% at 55% 30%, rgba(232,127,36,0.08) 0%, rgba(10,5,2,0.99) 60%)`,
//             display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:24,
//           }}>
//             <div style={{ position:"relative", width:44, height:44 }}>
//               <div className="spinner" />
//               <div className="spinner-inner" />
//             </div>
//             <div style={{ textAlign:"center" }}>
//               <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:22, fontWeight:800, marginBottom:6, background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//                 VR.OPTICS
//               </div>
//               <div style={{ fontSize:9, fontWeight:700, letterSpacing:"3px", color:C.primary, marginBottom:8 }}>INITIALIZING</div>
//               <div style={{ fontSize:10, color:"rgba(254,253,223,0.40)" }}>Allow camera access to continue</div>
//             </div>
//             <div style={{ fontSize:9, color:"rgba(254,253,223,0.22)", border:`0.5px solid rgba(255,255,255,0.10)`, borderRadius:100, padding:"4px 14px" }}>
//               ← Swipe to browse frames →
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   // ══════════════════════════════════════════════════════════════
//   // DESKTOP LAYOUT
//   // ══════════════════════════════════════════════════════════════
//   return (
//     <div style={{
//       fontFamily: "'Space Grotesk', sans-serif",
//       background: C.gradBg,
//       color: C.text,
//       height: "100vh",
//       display: "flex",
//       overflow: "hidden",
//     }}>
//       <style>{css}</style>

//       {/* Ambient glow */}
//       <div aria-hidden="true" style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
//         <div style={{ position:"absolute", top:"-15%", right:"-8%", width:"52vw", height:"52vw", borderRadius:"50%",
//           background:`radial-gradient(circle, rgba(232,127,36,0.14) 0%, rgba(232,127,36,0.04) 45%, transparent 70%)` }} />
//         <div style={{ position:"absolute", bottom:"-20%", left:"-12%", width:"48vw", height:"48vw", borderRadius:"50%",
//           background:`radial-gradient(circle, rgba(115,165,202,0.12) 0%, rgba(115,165,202,0.03) 45%, transparent 70%)` }} />
//       </div>

//       {/* ── LEFT: Camera (75%) ── */}
//       <div style={{ position:"relative", zIndex:1, flex:"0 0 75%", maxWidth:"75%", padding:20, display:"flex", flexDirection:"column" }}>
//         <div style={{
//           flex:1, position:"relative", borderRadius:22, overflow:"hidden",
//           border:`1px solid ${C.glassBorder}`, background:"#000",
//           boxShadow:`inset 0 0 60px rgba(0,0,0,0.40), 0 0 0 1px rgba(232,127,36,0.08), 0 8px 40px rgba(30,41,59,0.12)`,
//         }}>
//           {cameraReady && (
//             <div role="status" aria-live="polite" style={{
//               position:"absolute", top:16, right:16, zIndex:5,
//               display:"flex", alignItems:"center",
//               background:"rgba(0,0,0,0.42)", ...glassPill,
//               border:`1px solid rgba(115,165,202,0.28)`,
//               padding:"5px 14px", animation:"fadeIn 0.3s ease",
//             }}>
//               <span className="ar-dot" aria-hidden="true" />
//               <span style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,0.80)", letterSpacing:"0.5px" }}>Face Tracking Active</span>
//             </div>
//           )}

//           {/* Selected frame badge */}
//           <div style={{ position:"absolute", bottom:16, left:16, zIndex:5 }}>
//             <div aria-live="polite" style={{
//               background:"rgba(0,0,0,0.52)", ...glassPill,
//               border:`0.5px solid ${C.primary25}`, padding:"8px 20px",
//               boxShadow:`0 4px 20px rgba(0,0,0,0.25), 0 0 16px ${C.primary12}`,
//               display:"flex", alignItems:"center", gap:12,
//             }}>
//               <span style={{ fontSize:9, fontWeight:700, color:"rgba(254,253,223,0.50)", letterSpacing:"1.5px" }}>SELECTED</span>
//               <span aria-hidden="true" style={{ width:1, height:11, background:C.primary30, display:"inline-block" }} />
//               <span style={{ fontSize:13, fontWeight:700, color:"rgba(254,253,223,0.95)" }}>{currentGlass?.name}</span>
//               <span style={{ fontSize:13, fontWeight:700, background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//                 {currentGlass?.price}
//               </span>
//             </div>
//           </div>

//           <video
//             ref={videoRef}
//             style={{
//               position: "absolute",
//               left: "-100%",
//               top: "-100%",
//               width: "1px",
//               height: "1px",
//               opacity: 0,
//               pointerEvents: "none",
//             }}
//             autoPlay
//             playsInline
//             muted
//           />
//           <canvas
//             ref={canvasRef}
//             width={DESKTOP_CANVAS_W}
//             height={DESKTOP_CANVAS_H}
//             aria-label="AR glasses try-on camera view"
//             style={{ display:"block", width:"100%", height:"100%", objectFit:"cover" }}
//           />

//           {!cameraReady && (
//             <div role="status" aria-label="Initializing camera" style={{
//               position:"absolute", inset:0, borderRadius:22, zIndex:30,
//               background:`radial-gradient(ellipse 100% 60% at 55% 30%, rgba(232,127,36,0.08) 0%, rgba(254,253,223,0.97) 55%)`,
//               display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:28,
//             }}>
//               <div style={{ position:"relative", width:50, height:50 }}>
//                 <div className="spinner" />
//                 <div className="spinner-inner" />
//               </div>
//               <div style={{ textAlign:"center" }}>
//                 <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, fontWeight:700, letterSpacing:"3px",
//                   background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:8 }}>
//                   INITIALIZING CAMERA
//                 </div>
//                 <div style={{ fontSize:12, color:C.text55 }}>Please allow camera access to continue</div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ── RIGHT: Controls panel (25%) ── */}
//       <div
//         className="right-panel"
//         role="complementary"
//         aria-label="Frame selection and controls"
//         style={{
//           position:"relative", zIndex:1,
//           flex:"0 0 25%", maxWidth:"25%",
//           overflowY:"auto",
//           padding:"20px 16px 20px 4px",
//           display:"flex", flexDirection:"column", gap:12,
//           borderLeft:`1px solid ${C.glassBorder}`,
//           background:`linear-gradient(180deg, rgba(245,243,199,0.60) 0%, rgba(254,253,223,0.80) 100%)`,
//           backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
//         }}
//       >
//         <div style={{ padding:"4px 4px 2px" }}>
//           <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:18, fontWeight:700, color:C.text, marginBottom:3 }}>
//             Choose Frame
//           </div>
//           <div style={{ fontSize:10, letterSpacing:"1.5px", color:C.text30, fontWeight:600, textTransform:"uppercase" }}>
//             {GLASS_OPTIONS.length} styles available
//           </div>
//         </div>

//         <div
//           role="listbox"
//           aria-label="Select glasses frame"
//           style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:8 }}
//         >
//           {GLASS_OPTIONS.map(g => {
//             const isA = glasses === g.id;
//             return (
//               <div
//                 key={g.id}
//                 className="frame-card"
//                 role="option"
//                 aria-selected={isA}
//                 tabIndex={0}
//                 onClick={() => setGlasses(g.id)}
//                 onKeyDown={e => (e.key === "Enter" || e.key === " ") && setGlasses(g.id)}
//                 style={{
//                   borderRadius:14,
//                   background: isA ? C.primary12 : "rgba(254,253,223,0.55)",
//                   border:`1px solid ${isA ? C.primary : C.surfaceBorder}`,
//                   padding:"10px 6px",
//                   display:"flex", flexDirection:"column", alignItems:"center", gap:5,
//                   cursor:"pointer",
//                   boxShadow: isA ? `0 0 20px rgba(232,127,36,0.20), 0 4px 12px rgba(30,41,59,0.08)` : `0 1px 4px ${C.text06}`,
//                   transition:"all 0.22s cubic-bezier(0.22,1,0.36,1)",
//                   backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)",
//                 }}
//               >
//                 <div style={{
//                   width:"100%", height:48,
//                   display:"flex", alignItems:"center", justifyContent:"center",
//                   borderRadius:10, overflow:"hidden",
//                   background: isA ? C.primary12 : C.text06,
//                 }}>
//                   <img
//                     src={g.id}
//                     alt={g.name}
//                     loading="lazy"
//                     crossOrigin="anonymous"
//                     style={{
//                       width:"90%", height:"90%", objectFit:"contain",
//                       filter: isA ? `drop-shadow(0 0 5px rgba(232,127,36,0.55))` : "brightness(0.80) saturate(0.75)",
//                       transition:"filter 0.2s ease",
//                     }}
//                   />
//                 </div>
//                 <div style={{ fontSize:9, fontWeight:700, textAlign:"center", lineHeight:1.2, color: isA ? C.text : C.text55 }}>
//                   {g.name}
//                 </div>
//                 <div style={{
//                   fontSize:8, fontWeight:700,
//                   background: isA ? C.gradPrimary : "none",
//                   WebkitBackgroundClip: isA ? "text" : "unset",
//                   WebkitTextFillColor: isA ? "transparent" : C.primary,
//                   color: isA ? "transparent" : C.primary,
//                 }}>
//                     b {g.price}
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <Section title="FRAME CALIBRATION" icon="⚙️">
//           <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:14 }}>
//             <button
//               onClick={resetAdj}
//               aria-label="Reset frame calibration to defaults"
//               style={{
//                 fontSize:9, fontWeight:700, color:C.primary,
//                 background:C.primary12, border:`0.5px solid ${C.primary25}`,
//                 padding:"5px 14px", borderRadius:100, cursor:"pointer",
//                 letterSpacing:"0.5px", transition:"background 0.15s",
//               }}
//             >Reset</button>
//           </div>
//           <SliderRow label="WIDTH"    value={curAdj.scaleW}  min={0.3}  max={3}   step={0.05} onChange={v => setAdj("scaleW",  v)} fmt={v => `${v.toFixed(2)}×`} />
//           <SliderRow label="HEIGHT"   value={curAdj.scaleH}  min={0.3}  max={3}   step={0.05} onChange={v => setAdj("scaleH",  v)} fmt={v => `${v.toFixed(2)}×`} />
//           <SliderRow label="MOVE L/R" value={curAdj.offsetX} min={-150} max={150} step={1}    onChange={v => setAdj("offsetX", v)} fmt={v => `${v > 0 ? "+" : ""}${v}px`} />
//           <SliderRow label="MOVE U/D" value={curAdj.offsetY} min={-150} max={150} step={1}    onChange={v => setAdj("offsetY", v)} fmt={v => `${v > 0 ? "+" : ""}${v}px`} />
//           <SliderRow label="ROTATION" value={curAdj.rotate}  min={-30}  max={30}  step={0.5}  onChange={v => setAdj("rotate",  v)} fmt={v => `${v > 0 ? "+" : ""}${v.toFixed(1)}°`} />
//         </Section>

//         <Section title="SCENE FILTERS" icon="🎨">
//           <SliderRow label="BRIGHTNESS" value={brightness} min={50}  max={160} step={1} onChange={setBrightness} fmt={v => `${v}%`} />
//           <SliderRow label="CONTRAST"   value={contrast}   min={60}  max={160} step={1} onChange={setContrast}   fmt={v => `${v}%`} />
//           <SliderRow label="SATURATION" value={saturate}   min={50}  max={160} step={1} onChange={setSaturate}   fmt={v => `${v}%`} />
//         </Section>
//       </div>
//     </div>
//   );
// };

// export default TryOn;














// sami ui


// import React, { useRef, useEffect, useState, useCallback } from "react";

// // ─── Per-frame defaults ────────────────────────────────────────────────────────
// const DEFAULT_ADJ = { scaleW: 1,   scaleH: 1,    offsetX: 0, offsetY: 0,  rotate: 0 };
// const AVIATOR_ADJ = { scaleW: 1,   scaleH: 1.18, offsetX: 0, offsetY: 10, rotate: 0 };
// const ROUND_ADJ   = { scaleW: 1,   scaleH: 0.85, offsetX: 0, offsetY: 4,  rotate: 0 };

// const GLASS_OPTIONS = [
//   { id: "/glass1.png",  name: "Classic",      price: "PKR 4,500", emoji: "👓", sizes: [{ label:"XL", scale:1.10, mobileScale:0.65 }] },
//   { id: "/glass2.png",  name: "Aviator",      price: "PKR 5,200", emoji: "🕶️", sizes: [{ label:"L",  scale:1.15, mobileScale:1.00 }] },
//   { id: "/glass3.png",  name: "Sport",        price: "PKR 3,800", emoji: "🥽", sizes: [{ label:"L",  scale:1.15, mobileScale:1.00 }] },
//   { id: "/glass4.png",  name: "Round",        price: "PKR 4,900", emoji: "⭕", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass5.png",  name: "Wayfarer",     price: "PKR 4,900", emoji: "🕶️", sizes: [{ label:"L",  scale:1.25, mobileScale:0.98 }] },
//   { id: "/glass6.png",  name: "Vintage",      price: "PKR 4,900", emoji: "🪩", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass7.png",  name: "Clubmaster",   price: "PKR 4,900", emoji: "🔲", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
//   { id: "/glass8.png",  name: "Cat Eye",      price: "PKR 4,900", emoji: "😼", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
//   { id: "/glass9.png",  name: "Shield",       price: "PKR 4,900", emoji: "🛡️", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass10.png", name: "Oval",         price: "PKR 4,900", emoji: "🥚", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass11.png", name: "Square",       price: "PKR 4,900", emoji: "⬛", sizes: [{ label:"S",  scale:0.75, mobileScale:0.50 }] },
//   { id: "/glass12.png", name: "Hexagonal",    price: "PKR 4,900", emoji: "⬡", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass13.png", name: "Geometric",    price: "PKR 4,900", emoji: "🔷", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass14.png", name: "Steampunk",    price: "PKR 4,900", emoji: "⚙️", sizes: [{ label:"S",  scale:0.95, mobileScale:0.50 }] },
//   { id: "/glass15.png", name: "Sports Pro",   price: "PKR 4,900", emoji: "🏃", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass16.png", name: "Retro",        price: "PKR 4,900", emoji: "🎞️", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass17.png", name: "Modern",       price: "PKR 4,900", emoji: "✨", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass18.png", name: "Luxury",       price: "PKR 4,900", emoji: "💎", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass19.png", name: "Designer",     price: "PKR 4,900", emoji: "🎨", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass20.png", name: "Classic II",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass21.png", name: "Classic III",  price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass22.png", name: "Classic IV",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.05, mobileScale:0.95 }] },
//   { id: "/glass23.png", name: "Classic V",    price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass24.png", name: "Classic VI",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"S",  scale:0.85, mobileScale:0.50 }] },
//   { id: "/glass25.png", name: "Classic VII",  price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass26.png", name: "Classic VIII", price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass27.png", name: "Classic IX",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass28.png", name: "Classic X",    price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass29.png", name: "Classic XI",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.25, mobileScale:0.95 }] },
//   { id: "/glass30.png", name: "Classic XII",  price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass31.png", name: "Classic 31",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass32.png", name: "Classic 32",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass33.png", name: "Classic 33",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass34.png", name: "Classic 34",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass35.png", name: "Classic 35",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.10, mobileScale:0.75 }] },
//   { id: "/glass36.png", name: "Classic 36",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass37.png", name: "Classic 37",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass38.png", name: "Classic 38",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
//   { id: "/glass39.png", name: "Classic 39",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass40.png", name: "Classic 40",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass41.png", name: "Classic 41",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass42.png", name: "Classic 42",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"S",  scale:0.95, mobileScale:0.50 }] },
//   { id: "/glass43.png", name: "Classic 43",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass44.png", name: "Classic 44",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass45.png", name: "Classic 45",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
//   { id: "/glass46.png", name: "Classic 46",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.40, mobileScale:1.10 }] },
//   { id: "/glass47.png", name: "Classic 47",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.20, mobileScale:1.10 }] },
//   { id: "/glass48.png", name: "Classic 48",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass49.png", name: "Classic 49",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
// ];

// // ─── Device helpers ────────────────────────────────────────────────────────────
// const getIsMobile = () =>
//   typeof window !== "undefined" &&
//   (window.innerWidth < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

// const getMobileSizes = () => {
//   const landscape = typeof window !== "undefined" && window.innerWidth > window.innerHeight;
//   const isLowEnd  = typeof window !== "undefined" &&
//     (window.innerWidth <= 360 || (navigator.deviceMemory ?? 8) <= 2);
//   if (isLowEnd) {
//     return landscape
//       ? { camW: 480, camH: 360, canvasW: 480, canvasH: 360 }
//       : { camW: 360, camH: 480, canvasW: 360, canvasH: 480 };
//   }
//   return landscape
//     ? { camW: 640, camH: 480, canvasW: 640, canvasH: 480 }
//     : { camW: 480, camH: 640, canvasW: 480, canvasH: 640 };
// };

// const getSizeScale = (sizeObj, mobile) =>
//   sizeObj ? (mobile ? (sizeObj.mobileScale ?? sizeObj.scale) : sizeObj.scale) : 1;

// // ─── Timing constants ──────────────────────────────────────────────────────────
// // FIX: Raised mobile FPS from 24 → 30 for smoother AR overlay
// const MOBILE_FPS      = 30;
// const MOBILE_FRAME_INT = 1000 / MOBILE_FPS;

// const DESKTOP_CAM_W   = 1280;
// const DESKTOP_CAM_H   = 720;
// const DESKTOP_CANVAS_W = 1280;
// const DESKTOP_CANVAS_H = 720;

// // ─── Beauty passthrough (neutral) ─────────────────────────────────────────────
// const BEAUTY_B = 100, BEAUTY_C = 100, BEAUTY_S = 100;

// // ─── Landmark indices ─────────────────────────────────────────────────────────
// const LANDMARKS = {
//   LEFT_IRIS_CENTER:    468,
//   RIGHT_IRIS_CENTER:   473,
//   LEFT_EYE_OUTER:       33,
//   RIGHT_EYE_OUTER:     263,
//   LEFT_EYE_INNER:      133,
//   RIGHT_EYE_INNER:     362,
//   // Upper lid midpoints (more stable than brow for Y-reference)
//   LEFT_EYE_TOP:        [159, 160, 161],
//   RIGHT_EYE_TOP:       [386, 387, 388],
//   LEFT_EYEBROW_LOWER:  [70, 63, 105, 66, 107],
//   RIGHT_EYEBROW_LOWER: [300, 293, 334, 296, 336],
//   NOSE_BRIDGE_TOP:     6,
//   LEFT_FACE_EDGE:      234,
//   RIGHT_FACE_EDGE:     454,
// };

// // ─── FIX: Dedicated per-channel smoother (position / scale / rotation) ────────
// // Old code used a single EMA alpha for everything, causing position and
// // rotation to fight each other's damping.  Separating them allows:
// //   • position  → moderate alpha (responsive enough to track head movement)
// //   • scale     → low alpha     (scale changes should feel elastic, not twitchy)
// //   • rotation  → lowest alpha  (rotation jitter is the most visually annoying)
// // Velocity clamping prevents large detection jumps from propagating in one frame.
// class FaceGeoSmoother {
//   constructor({ posAlpha, scaleAlpha, rotAlpha, maxPosDelta = 60, maxScaleDelta = 0.15 }) {
//     this.posAlpha     = posAlpha;
//     this.scaleAlpha   = scaleAlpha;
//     this.rotAlpha     = rotAlpha;
//     this.maxPosDelta  = maxPosDelta;
//     this.maxScaleDelta = maxScaleDelta;
//     this.prev         = null;
//   }

//   // Clamp then EMA
//   _step(prev, cur, alpha, maxDelta, deadzone = 0) {
//     const raw = cur - prev;
//     if (deadzone > 0 && Math.abs(raw) < deadzone) return prev;
//     const delta = Math.max(-maxDelta, Math.min(maxDelta, raw));
//     return prev + alpha * delta;
//   }

//   smooth(cur, deadzone = 0) {
//     if (!this.prev) { this.prev = { ...cur }; return { ...cur }; }
//     const p = this.prev;
//     const r = {
//       cx:    this._step(p.cx,    cur.cx,    this.posAlpha,   this.maxPosDelta,   deadzone),
//       cy:    this._step(p.cy,    cur.cy,    this.posAlpha,   this.maxPosDelta,   deadzone),
//       gw:    this._step(p.gw,    cur.gw,    this.scaleAlpha, this.maxPosDelta,   0),
//       gh:    this._step(p.gh,    cur.gh,    this.scaleAlpha, this.maxPosDelta,   0),
//       angle: this._step(p.angle, cur.angle, this.rotAlpha,   0.18,               0),
//       ds:    this._step(p.ds,    cur.ds,    this.scaleAlpha, this.maxScaleDelta, 0),
//     };
//     this.prev = { ...r };
//     return r;
//   }

//   reset() { this.prev = null; }
// }

// // ─── FIX: Corrected face geometry extraction ──────────────────────────────────
// // Root cause of misalignment: old centerY was 55 % nose-bridge + 25 % brow + 20 % iris.
// // Glasses must sit AT the iris, so iris should dominate the Y anchor.
// //
// // Old:  centerY = browMidLower.y*0.25 + noseBridgeTop.y*0.55 + irisY*0.20
// // New:  centerY = irisY*0.65 + noseBridgeTop.y*0.30 + browMid.y*0.05
// //
// // This keeps the nose-bridge contribution (so the glasses bridge aligns with
// // the nose bridge) while ensuring the lens center sits on the iris.
// function extractFaceGeometry(lm, W, H, useIris = true) {
//   const px = (idx) => ({ x: lm[idx].x * W, y: lm[idx].y * H, z: lm[idx].z ?? 0 });
//   const avgPx = (indices) => {
//     const pts = indices.map(i => px(i));
//     return {
//       x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
//       y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
//     };
//   };
//   const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

//   const leftEyeOut  = px(LANDMARKS.LEFT_EYE_OUTER);
//   const rightEyeOut = px(LANDMARKS.RIGHT_EYE_OUTER);
//   const leftEyeIn   = px(LANDMARKS.LEFT_EYE_INNER);
//   const rightEyeIn  = px(LANDMARKS.RIGHT_EYE_INNER);
//   const noseBridgeTop = px(LANDMARKS.NOSE_BRIDGE_TOP);
//   const leftBrowLower  = avgPx(LANDMARKS.LEFT_EYEBROW_LOWER);
//   const rightBrowLower = avgPx(LANDMARKS.RIGHT_EYEBROW_LOWER);

//   // ── Iris (or fallback to eye-corner midpoint) ──────────────────────────────
//   let leftIris, rightIris;
//   if (useIris && lm.length > 473) {
//     leftIris  = px(LANDMARKS.LEFT_IRIS_CENTER);
//     rightIris = px(LANDMARKS.RIGHT_IRIS_CENTER);
//   } else {
//     // FIX: Better mobile fallback – use outer+inner corner average (closer to pupil)
//     leftIris  = {
//       x: leftEyeOut.x * 0.5 + leftEyeIn.x * 0.5,
//       y: leftEyeOut.y * 0.5 + leftEyeIn.y * 0.5,
//       z: 0,
//     };
//     rightIris = {
//       x: rightEyeOut.x * 0.5 + rightEyeIn.x * 0.5,
//       y: rightEyeOut.y * 0.5 + rightEyeIn.y * 0.5,
//       z: 0,
//     };
//   }

//   const irisY   = (leftIris.y  + rightIris.y)  / 2;
//   const centerX = (leftIris.x  + rightIris.x)  / 2;
//   const browMidY = (leftBrowLower.y + rightBrowLower.y) / 2;

//   // ── FIX: iris-dominant Y anchor ───────────────────────────────────────────
//   const centerY = irisY * 0.65 + noseBridgeTop.y * 0.30 + browMidY * 0.05;

//   // ── Angle: eye-corner line is the most stable rotation reference ──────────
//   const angleEyeCorners = Math.atan2(
//     rightEyeOut.y - leftEyeOut.y,
//     rightEyeOut.x - leftEyeOut.x,
//   );
//   const angleBrow = Math.atan2(
//     rightBrowLower.y - leftBrowLower.y,
//     rightBrowLower.x - leftBrowLower.x,
//   );
//   // FIX: weight eye-corners more heavily (0.70) vs brow (0.30) for stability
//   // iris angle omitted on mobile (unreliable fallback points)
//   const angleIris = useIris
//     ? Math.atan2(rightIris.y - leftIris.y, rightIris.x - leftIris.x)
//     : angleEyeCorners;
//   const angle = angleEyeCorners * 0.65 + angleBrow * 0.25 + angleIris * 0.10;

//   // ── Size ───────────────────────────────────────────────────────────────────
//   const eyeSpan = dist(leftEyeOut, rightEyeOut);
//   // FIX: reduce mobile spanMult to 1.20 (was 1.35) – less over-expansion
//   const spanMult = useIris ? 1.0 : 1.20;
//   const glassesWidth  = eyeSpan * 2.0 * spanMult;
//   const glassesHeight = eyeSpan * 0.75 * spanMult;

//   // ── Depth scale (desktop only; z-data too noisy on mobile) ───────────────
//   const avgZ = (leftIris.z + rightIris.z + (noseBridgeTop.z ?? 0)) / 3;
//   const depthScale = Math.max(0.93, Math.min(1.07, 1 + (-avgZ * 0.5)));

//   return { centerX, centerY, angle, glassesWidth, glassesHeight, depthScale };
// }

// // ─── Theme ────────────────────────────────────────────────────────────────────
// const C = {
//   primary:       "#E87F24",
//   accent:        "#73A5CA",
//   bg:            "#FEFDDF",
//   surface:       "#F5F3C7",
//   text:          "#1E293B",
//   primary12:     "rgba(232,127,36,0.12)",
//   primary20:     "rgba(232,127,36,0.20)",
//   primary25:     "rgba(232,127,36,0.25)",
//   primary30:     "rgba(232,127,36,0.30)",
//   primary40:     "rgba(232,127,36,0.40)",
//   accent12:      "rgba(115,165,202,0.12)",
//   accent20:      "rgba(115,165,202,0.20)",
//   accent28:      "rgba(115,165,202,0.28)",
//   text55:        "rgba(30,41,59,0.55)",
//   text30:        "rgba(30,41,59,0.30)",
//   text12:        "rgba(30,41,59,0.12)",
//   text06:        "rgba(30,41,59,0.06)",
//   glassBg:       "rgba(254,253,223,0.65)",
//   glassBorder:   "rgba(255,255,255,0.70)",
//   surfaceBorder: "rgba(255,255,255,0.85)",
//   white15:       "rgba(255,255,255,0.15)",
//   white08:       "rgba(255,255,255,0.08)",
//   gradPrimary:   "linear-gradient(135deg, #E87F24, #F5A623)",
//   gradPrimaryTx: "linear-gradient(135deg, #F5A623, #E87F24)",
//   gradBg: `
//     radial-gradient(ellipse 60% 50% at 80% 10%, rgba(232,127,36,0.13) 0%, transparent 60%),
//     radial-gradient(ellipse 50% 40% at 10% 80%, rgba(115,165,202,0.12) 0%, transparent 55%),
//     #FEFDDF
//   `,
// };

// const glassPill = {
//   borderRadius:          100,
//   backdropFilter:        "blur(14px)",
//   WebkitBackdropFilter:  "blur(14px)",
// };

// // ─── UI sub-components ────────────────────────────────────────────────────────
// const Section = ({ title, icon, defaultOpen = false, children }) => {
//   const [open, setOpen] = useState(defaultOpen);
//   return (
//     <div style={{
//       borderRadius: 16, border: `1px solid ${C.glassBorder}`, overflow: "hidden",
//       background: C.glassBg, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
//       boxShadow: `0 2px 8px ${C.text06}`,
//     }}>
//       <button
//         onClick={() => setOpen(o => !o)}
//         aria-expanded={open}
//         aria-label={`${open ? "Collapse" : "Expand"} ${title}`}
//         style={{
//           width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
//           padding: "13px 16px", background: "rgba(254,253,223,0.50)", border: "none", cursor: "pointer",
//           borderBottom: open ? `1px solid ${C.glassBorder}` : "none",
//         }}
//       >
//         <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: C.primary }}>
//           <span style={{ fontSize: 13 }} aria-hidden="true">{icon}</span>{title}
//         </span>
//         <span aria-hidden="true" style={{
//           fontSize: 9, color: C.text55,
//           transform: open ? "rotate(180deg)" : "rotate(0)",
//           transition: "transform 0.22s ease", display: "inline-block",
//         }}>▼</span>
//       </button>
//       {open && <div style={{ padding: "16px", background: "rgba(245,243,199,0.40)" }}>{children}</div>}
//     </div>
//   );
// };

// const SliderRow = ({ label, value, min, max, step, onChange, fmt }) => (
//   <div style={{ marginBottom: 18 }}>
//     <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
//       <label style={{ fontSize: 10, color: C.text55, fontWeight: 600, letterSpacing: "1px" }}>{label}</label>
//       <span style={{ fontSize: 11, fontWeight: 700, background: C.gradPrimaryTx, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
//         {fmt(value)}
//       </span>
//     </div>
//     <input
//       type="range" min={min} max={max} step={step} value={value}
//       aria-label={label}
//       onChange={e => onChange(Number(e.target.value))}
//       style={{ width: "100%", height: 3, background: C.primary20, borderRadius: 4, appearance: "none", WebkitAppearance: "none", cursor: "pointer" }}
//     />
//   </div>
// );

// // ─────────────────────────────────────────────────────────────────────────────
// // Main Component
// // ─────────────────────────────────────────────────────────────────────────────
// const TryOn = () => {
//   const videoRef         = useRef(null);
//   const canvasRef        = useRef(null);
//   const imgRef           = useRef(new Image());
//   const rafIdRef         = useRef(null);
//   const lastFrameRef     = useRef(0);
//   const touchStartX      = useRef(null);
//   const touchStartY      = useRef(null);
//   const cameraRdyRef     = useRef(false);
//   const glassesRef       = useRef("/glass1.png");
//   const adjRef           = useRef({});
//   const pendingResultRef = useRef(null);
//   const camStreamRef     = useRef(null);
//   const camInstanceRef   = useRef(null);
//   const cachedGlassRef   = useRef(null);
//   const ctxRef           = useRef(null);
//   const resultVersionRef     = useRef(0);
//   const lastDrawnVersionRef  = useRef(-1);

//   const [isMobile, setIsMobile] = useState(() => getIsMobile());
//   const isMobileRef = useRef(isMobile);
//   const [mobileSizes, setMobileSizes] = useState(() => getMobileSizes());

//   useEffect(() => {
//     const onResize = () => {
//       const m = getIsMobile();
//       isMobileRef.current = m;
//       setIsMobile(m);
//       ctxRef.current = null; // invalidate cached context
//       if (m) setMobileSizes(getMobileSizes());
//     };
//     window.addEventListener("resize", onResize, { passive: true });
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   // FIX: Separate smoothers per device with tuned per-channel alphas
//   const smootherRef = useRef(null);
//   if (!smootherRef.current) {
//     smootherRef.current = isMobile
//       ? new FaceGeoSmoother({
//           posAlpha:      0.38,  // was 0.55 – less position jitter
//           scaleAlpha:    0.25,  // slow, elastic scale
//           rotAlpha:      0.22,  // very slow rotation (most visually noisy)
//           maxPosDelta:   48,
//           maxScaleDelta: 0.12,
//         })
//       : new FaceGeoSmoother({
//           posAlpha:      0.45,
//           scaleAlpha:    0.32,
//           rotAlpha:      0.30,
//           maxPosDelta:   60,
//           maxScaleDelta: 0.15,
//         });
//   }

//   const [glasses, setGlasses]         = useState("/glass1.png");
//   const [cameraReady, setCameraReady] = useState(false);
//   const [brightness, setBrightness]   = useState(100);
//   const [contrast,   setContrast]     = useState(100);
//   const [saturate,   setSaturate]     = useState(100);
//   const [mpError,    setMpError]      = useState(null);

//   const brightnessRef = useRef(100);
//   const contrastRef   = useRef(100);
//   const saturateRef   = useRef(100);
//   useEffect(() => { brightnessRef.current = brightness; }, [brightness]);
//   useEffect(() => { contrastRef.current   = contrast;   }, [contrast]);
//   useEffect(() => { saturateRef.current   = saturate;   }, [saturate]);

//   const adjustmentsRef = useRef(
//     Object.fromEntries(GLASS_OPTIONS.map(g => {
//       if (g.id === "/glass2.png") return [g.id, { ...AVIATOR_ADJ }];
//       if (g.id === "/glass4.png") return [g.id, { ...ROUND_ADJ }];
//       return [g.id, { ...DEFAULT_ADJ }];
//     }))
//   );
//   const [adjUIState, setAdjUIState] = useState(() => adjustmentsRef.current["/glass1.png"]);

//   useEffect(() => {
//     glassesRef.current   = glasses;
//     adjRef.current       = adjustmentsRef.current;
//     cachedGlassRef.current = GLASS_OPTIONS.find(g => g.id === glasses) || null;
//     setAdjUIState({ ...(adjustmentsRef.current[glasses] || DEFAULT_ADJ) });
//   }, [glasses]);

//   const setAdj = useCallback((key, val) => {
//     const id = glassesRef.current;
//     adjustmentsRef.current = {
//       ...adjustmentsRef.current,
//       [id]: { ...(adjustmentsRef.current[id] || DEFAULT_ADJ), [key]: val },
//     };
//     adjRef.current = adjustmentsRef.current;
//     setAdjUIState(prev => ({ ...prev, [key]: val }));
//   }, []);

//   const resetAdj = useCallback(() => {
//     const id = glassesRef.current;
//     const defaults =
//       id === "/glass2.png" ? { ...AVIATOR_ADJ } :
//       id === "/glass4.png" ? { ...ROUND_ADJ }   : { ...DEFAULT_ADJ };
//     adjustmentsRef.current = { ...adjustmentsRef.current, [id]: defaults };
//     adjRef.current = adjustmentsRef.current;
//     setAdjUIState({ ...defaults });
//   }, []);

//   useEffect(() => {
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.src = glasses;
//     imgRef.current = img;
//   }, [glasses]);

//   // ── Draw loop ─────────────────────────────────────────────────────────────
//   const drawLoop = useCallback(() => {
//     rafIdRef.current = requestAnimationFrame(drawLoop);

//     const mobile = isMobileRef.current;
//     const now    = performance.now();
//     if (mobile && now - lastFrameRef.current < MOBILE_FRAME_INT) return;
//     lastFrameRef.current = now;

//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     if (!ctxRef.current) {
//       ctxRef.current = canvas.getContext("2d", { alpha: false, willReadFrequently: false });
//     }
//     const ctx = ctxRef.current;
//     if (!ctx) return;

//     const result = pendingResultRef.current;
//     if (!result?.image || resultVersionRef.current === lastDrawnVersionRef.current) return;

//     const W = canvas.width, H = canvas.height;

//     // ── Draw mirrored camera frame ─────────────────────────────────────────
//     const userB = brightnessRef.current;
//     const userC = contrastRef.current;
//     const userS = saturateRef.current;
//     const needsFilter = !mobile && (
//       userB !== 100 || userC !== 100 || userS !== 100 ||
//       BEAUTY_B !== 100 || BEAUTY_C !== 100 || BEAUTY_S !== 100
//     );
//     ctx.filter = needsFilter
//       ? `brightness(${BEAUTY_B}%) contrast(${BEAUTY_C}%) saturate(${BEAUTY_S}%) brightness(${userB}%) contrast(${userC}%) saturate(${userS}%)`
//       : "none";

//     ctx.save();
//     ctx.translate(W, 0);
//     ctx.scale(-1, 1);
//     ctx.drawImage(result.image, 0, 0, W, H);
//     ctx.restore();
//     ctx.filter = "none";

//     if (!result.multiFaceLandmarks?.length) {
//       smootherRef.current.reset();
//       lastDrawnVersionRef.current = resultVersionRef.current;
//       return;
//     }

//     const lm  = result.multiFaceLandmarks[0];
//     // FIX: useIris only on desktop where refineLandmarks=true provides indices 468/473
//     const geo = extractFaceGeometry(lm, W, H, !mobile);

//     // FIX: Mirror X to match mirrored canvas draw (landmark space → display space)
//     const mirroredCx = W - geo.centerX;

//     // FIX: Mobile deadzone 1.0 px (was 1.2) – slightly less lag on small faces
//     const sm = smootherRef.current.smooth(
//       { cx: mirroredCx, cy: geo.centerY, gw: geo.glassesWidth, gh: geo.glassesHeight, angle: geo.angle, ds: geo.depthScale },
//       mobile ? 1.0 : 0,
//     );

//     const img = imgRef.current;
//     if (!img.complete || !img.naturalWidth) {
//       lastDrawnVersionRef.current = resultVersionRef.current;
//       return;
//     }

//     const glassObj = cachedGlassRef.current;
//     const sSc      = glassObj?.sizes?.[0] ? getSizeScale(glassObj.sizes[0], mobile) : 1.0;
//     const adj      = adjRef.current[glassesRef.current] || DEFAULT_ADJ;

//     // FIX: depth scale only on desktop where z-data is reliable
//     //      On mobile the z-axis is noisy and causes scale flutter
//     let w = sm.gw * adj.scaleW;
//     let h = sm.gh * adj.scaleH;
//     if (!mobile) {
//       // Tightly clamped depth scale – only subtle parallax, no dramatic jumps
//       const ds = Math.max(0.95, Math.min(1.05, sm.ds));
//       w *= ds; h *= ds;
//     }
//     w *= sSc; h *= sSc;

//     // Ensure minimum readable size and maximum sanity bound
//     w = Math.max(20, Math.min(W * 0.95, w));
//     h = Math.max(8,  Math.min(H * 0.60, h));

//     // FIX: Negate angle to match mirrored canvas (head-tilt left → glasses tilt left)
//     const mirroredAngle = -sm.angle;

//     // FIX: Clamp render position so glasses never drift fully off-canvas
//     const halfW    = w * 0.5;
//     const halfH    = h * 0.5;
//     const clampedX = Math.max(halfW, Math.min(W - halfW, sm.cx + adj.offsetX));
//     const clampedY = Math.max(halfH, Math.min(H - halfH, sm.cy + adj.offsetY));

//     ctx.save();
//     ctx.translate(clampedX, clampedY);
//     ctx.rotate(mirroredAngle + adj.rotate * Math.PI / 180);
//     ctx.drawImage(img, -w / 2, -h / 2, w, h);
//     ctx.restore();

//     lastDrawnVersionRef.current = resultVersionRef.current;
//   }, []);

//   const onResults = useCallback((results) => {
//     pendingResultRef.current = results;
//     resultVersionRef.current++;
//   }, []);

//   // ── Camera + FaceMesh init ───────────────────────────────────────────────
//   useEffect(() => {
//     if (!window.FaceMesh) {
//       setMpError("MediaPipe FaceMesh not found. Add the MediaPipe <script> tag to index.html.");
//       return;
//     }

//     const mobile = isMobileRef.current;
//     let camW, camH, canvasW, canvasH;
//     if (mobile) {
//       ({ camW, camH, canvasW, canvasH } = mobileSizes);
//     } else {
//       camW = DESKTOP_CAM_W; camH = DESKTOP_CAM_H;
//       canvasW = DESKTOP_CANVAS_W; canvasH = DESKTOP_CANVAS_H;
//     }

//     if (canvasRef.current) {
//       canvasRef.current.width  = canvasW;
//       canvasRef.current.height = canvasH;
//       ctxRef.current = null;
//     }

//     const faceMesh = new window.FaceMesh({
//       locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/${file}`,
//     });
//     faceMesh.setOptions({
//       maxNumFaces:            1,
//       // FIX: refineLandmarks only on desktop – enables iris tracking (468/473)
//       //      On mobile it's too slow and not worth the frame cost
//       refineLandmarks:        !mobile,
//       minDetectionConfidence: mobile ? 0.40 : 0.50,
//       minTrackingConfidence:  mobile ? 0.35 : 0.50,
//     });
//     faceMesh.onResults(onResults);

//     rafIdRef.current = requestAnimationFrame(drawLoop);

//     navigator.mediaDevices.getUserMedia({
//       video: {
//         facingMode: "user",
//         width:      { ideal: camW },
//         height:     { ideal: camH },
//         // FIX: Request 30fps explicitly on mobile (was 30 but not for portrait path)
//         frameRate:  { ideal: mobile ? 30 : 60 },
//       },
//       audio: false,
//     })
//     .then(stream => {
//       camStreamRef.current = stream;
//       const video = videoRef.current;
//       if (!video) return;
//       video.srcObject = stream;
//       video.onloadedmetadata = () => {
//         video.play().then(() => {
//           cameraRdyRef.current = true;
//           setCameraReady(true);

//           const sendFrame = async () => {
//             if (!cameraRdyRef.current) return;
//             try {
//               if (video.readyState >= 2) await faceMesh.send({ image: video });
//             } catch (_) { /* ignore send errors on cleanup */ }
//             if (cameraRdyRef.current) {
//               camInstanceRef.current = requestAnimationFrame(sendFrame);
//             }
//           };
//           camInstanceRef.current = requestAnimationFrame(sendFrame);
//         }).catch(err => {
//           console.error("Video play failed:", err);
//           setMpError("Could not start video playback. Please reload and allow camera access.");
//         });
//       };
//     })
//     .catch(err => {
//       console.error("Camera failed:", err);
//       setMpError("Camera access denied or not available. Please allow camera permissions and reload.");
//     });

//     return () => {
//       cameraRdyRef.current = false;
//       if (rafIdRef.current)       cancelAnimationFrame(rafIdRef.current);
//       if (camInstanceRef.current) cancelAnimationFrame(camInstanceRef.current);
//       if (camStreamRef.current) {
//         camStreamRef.current.getTracks().forEach(t => t.stop());
//         camStreamRef.current = null;
//       }
//       if (videoRef.current?.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach(t => t.stop());
//         videoRef.current.srcObject = null;
//       }
//       faceMesh.close();
//     };
//   }, [drawLoop, onResults, mobileSizes]);

//   // ── CSS ──────────────────────────────────────────────────────────────────
//   const css = `
//     @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600&display=swap');
//     *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//     input[type="range"] { -webkit-appearance: none; appearance: none; background: transparent; }
//     input[type="range"]::-webkit-slider-runnable-track {
//       background: linear-gradient(90deg, rgba(232,127,36,0.30), rgba(232,127,36,0.10));
//       height: 3px; border-radius: 3px;
//     }
//     input[type="range"]::-webkit-slider-thumb {
//       -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%;
//       background: radial-gradient(circle at 38% 35%, #F5A623, #E87F24);
//       cursor: pointer; margin-top: -6.5px;
//       border: 2px solid rgba(254,253,223,0.90);
//       box-shadow: 0 2px 8px rgba(232,127,36,0.40);
//     }
//     input[type="range"]::-moz-range-thumb {
//       width: 16px; height: 16px; border-radius: 50%;
//       background: radial-gradient(circle at 38% 35%, #F5A623, #E87F24);
//       cursor: pointer; border: 2px solid rgba(254,253,223,0.90);
//       box-shadow: 0 2px 8px rgba(232,127,36,0.40);
//     }
//     .right-panel { scrollbar-width: thin; scrollbar-color: rgba(232,127,36,0.40) rgba(232,127,36,0.08); }
//     ::-webkit-scrollbar { width: 3px; height: 3px; }
//     ::-webkit-scrollbar-track { background: rgba(232,127,36,0.06); border-radius: 4px; }
//     ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #E87F24, #F5A623); border-radius: 4px; }
//     .frame-scroller { scroll-behavior: smooth; -webkit-overflow-scrolling: touch; scrollbar-width: none; -ms-overflow-style: none; }
//     .frame-scroller::-webkit-scrollbar { display: none; }
//     .frame-card { transition: transform 0.2s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s ease; -webkit-tap-highlight-color: transparent; }
//     .frame-card:hover { transform: translateY(-2px) scale(1.03); }
//     .frame-card:active { transform: scale(0.96); }
//     @keyframes spin   { to { transform: rotate(360deg); } }
//     @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
//     @keyframes pulse  { 0%,100%{ opacity:0.55 } 50%{ opacity:1 } }
//     .spinner {
//       width: 44px; height: 44px; border-radius: 50%;
//       border: 2px solid rgba(115,165,202,0.20);
//       border-top-color: #E87F24;
//       animation: spin 0.85s linear infinite;
//     }
//     .spinner-inner {
//       width: 30px; height: 30px; border-radius: 50%;
//       border: 1.5px solid rgba(232,127,36,0.15);
//       border-bottom-color: #F5A623;
//       animation: spin 1.2s linear infinite reverse;
//       position: absolute; top: 7px; left: 7px;
//     }
//     .ar-dot {
//       width: 7px; height: 7px; border-radius: 50%;
//       background: #73A5CA;
//       box-shadow: 0 0 8px rgba(115,165,202,0.70);
//       animation: pulse 2s ease infinite;
//       display: inline-block; margin-right: 6px; flex-shrink: 0;
//     }
//     .frame-card:focus-visible { outline: 2px solid #E87F24; outline-offset: 2px; }
//   `;

//   if (mpError) return (
//     <div role="alert" style={{
//       display: "flex", alignItems: "center", justifyContent: "center",
//       height: "100vh", background: C.bg, color: "#c2410c",
//       fontFamily: "monospace", padding: 24, textAlign: "center", fontSize: 13,
//     }}>
//       ⚠️ {mpError}
//     </div>
//   );

//   const currentGlass = GLASS_OPTIONS.find(g => g.id === glasses);
//   const curAdj       = adjUIState;

//   // ══════════════════════════════════════════════════════════════
//   // MOBILE LAYOUT
//   // ══════════════════════════════════════════════════════════════
//   if (isMobile) {
//     const idx = GLASS_OPTIONS.findIndex(g => g.id === glasses);
//     const { canvasW, canvasH } = mobileSizes;

//     const onTouchStart = (e) => {
//       touchStartX.current = e.touches[0].clientX;
//       touchStartY.current = e.touches[0].clientY;
//     };
//     const onTouchEnd = (e) => {
//       if (touchStartX.current === null) return;
//       const dx = e.changedTouches[0].clientX - touchStartX.current;
//       const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
//       if (Math.abs(dx) > 50 && Math.abs(dx) > dy) {
//         const cur = GLASS_OPTIONS.findIndex(g => g.id === glassesRef.current);
//         if (dx < 0 && cur < GLASS_OPTIONS.length - 1) setGlasses(GLASS_OPTIONS[cur + 1].id);
//         if (dx > 0 && cur > 0)                        setGlasses(GLASS_OPTIONS[cur - 1].id);
//       }
//       touchStartX.current = null;
//       touchStartY.current = null;
//     };

//     return (
//       <div
//         style={{ position:"fixed", inset:0, background:"#000", fontFamily:"'Space Grotesk',sans-serif", color:"#fff", overflow:"hidden", touchAction:"pan-y" }}
//         onTouchStart={onTouchStart}
//         onTouchEnd={onTouchEnd}
//       >
//         <style>{css}</style>
//         <video ref={videoRef} style={{ position:"absolute", left:"-100%", top:"-100%", width:"1px", height:"1px", opacity:0, pointerEvents:"none" }} autoPlay playsInline muted />

//         {/* FIX: canvas fills screen; objectFit:cover keeps face+overlay aligned */}
//         <canvas
//           ref={canvasRef}
//           width={canvasW}
//           height={canvasH}
//           style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", display:"block" }}
//           aria-label="AR glasses try-on camera view"
//         />

//         {/* Top vignette */}
//         <div style={{ position:"absolute", top:0, left:0, right:0, height:"22%", background:"linear-gradient(to bottom, rgba(0,0,0,0.50), transparent)", pointerEvents:"none" }} aria-hidden="true" />

//         {/* AR tracking indicator */}
//         {cameraReady && (
//           <div role="status" aria-live="polite" style={{
//             position:"absolute", top:18, left:16, zIndex:20,
//             display:"flex", alignItems:"center",
//             background:"rgba(0,0,0,0.42)", ...glassPill,
//             border:`1px solid rgba(115,165,202,0.30)`,
//             padding:"5px 12px", animation:"fadeIn 0.35s ease",
//           }}>
//             <span className="ar-dot" aria-hidden="true" />
//             <span style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,0.80)", letterSpacing:"0.5px" }}>Tracking</span>
//           </div>
//         )}

//         {/* Frame name + price */}
//         {cameraReady && currentGlass && (
//           <div aria-live="polite" style={{
//             position:"absolute", bottom:176, left:"50%", transform:"translateX(-50%)",
//             zIndex:20, whiteSpace:"nowrap",
//             background:"rgba(0,0,0,0.48)", ...glassPill,
//             border:`1px solid ${C.primary25}`,
//             padding:"7px 20px",
//             display:"flex", alignItems:"center", gap:10,
//             animation:"fadeIn 0.3s ease",
//             boxShadow:`0 4px 20px rgba(0,0,0,0.25), 0 0 20px ${C.primary12}`,
//           }}>
//             <span style={{ fontSize:13, fontWeight:700, color:"rgba(254,253,223,0.95)" }}>{currentGlass.name}</span>
//             <span aria-hidden="true" style={{ width:1, height:11, background:C.primary30, display:"inline-block" }} />
//             <span style={{ fontSize:13, fontWeight:700, background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//               {currentGlass.price}
//             </span>
//           </div>
//         )}

//         {/* Progress dots */}
//         {cameraReady && (
//           <div aria-hidden="true" style={{ position:"absolute", bottom:158, left:"50%", transform:"translateX(-50%)", display:"flex", gap:4, zIndex:20 }}>
//             {GLASS_OPTIONS.map((g, i) => (
//               <div key={g.id} style={{
//                 width: i === idx ? 14 : 4, height:4, borderRadius:3,
//                 background: i === idx ? C.primary : C.white15,
//                 transition:"all 0.25s ease",
//               }} />
//             ))}
//           </div>
//         )}

//         {/* Bottom frame scroller */}
//         <div style={{
//           position:"absolute", bottom:0, left:0, right:0, zIndex:20,
//           paddingBottom:"env(safe-area-inset-bottom, 12px)",
//           background:"linear-gradient(to top, rgba(10,5,2,0.96) 55%, transparent 100%)",
//         }}>
//           <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 18px 4px" }}>
//             <span style={{ fontSize:9, fontWeight:700, letterSpacing:"2px", color:"rgba(254,253,223,0.35)", textTransform:"uppercase" }}>Frames</span>
//             <span style={{ fontSize:9, color:"rgba(254,253,223,0.30)" }} aria-live="polite">{idx + 1} / {GLASS_OPTIONS.length}</span>
//           </div>

//           <div
//             className="frame-scroller"
//             role="listbox"
//             aria-label="Select glasses frame"
//             style={{ display:"flex", gap:10, padding:"4px 14px 14px", overflowX:"auto", scrollSnapType:"x mandatory" }}
//           >
//             {GLASS_OPTIONS.map(g => {
//               const isA = glasses === g.id;
//               return (
//                 <div
//                   key={g.id}
//                   className="frame-card"
//                   role="option"
//                   aria-selected={isA}
//                   tabIndex={0}
//                   onClick={() => setGlasses(g.id)}
//                   onKeyDown={e => (e.key === "Enter" || e.key === " ") && setGlasses(g.id)}
//                   style={{
//                     flexShrink:0, scrollSnapAlign:"start",
//                     width:64, height:64, borderRadius:16,
//                     background: isA ? "rgba(232,127,36,0.18)" : "rgba(30,20,10,0.70)",
//                     border:`1.5px solid ${isA ? C.primary : "rgba(255,255,255,0.12)"}`,
//                     display:"flex", alignItems:"center", justifyContent:"center",
//                     cursor:"pointer", overflow:"hidden", padding:6,
//                     transform: isA ? "scale(1.08)" : "scale(1)",
//                     backdropFilter:"blur(10px)", WebkitBackdropFilter:"blur(10px)",
//                     boxShadow: isA ? `0 0 20px rgba(232,127,36,0.50), 0 0 36px rgba(245,166,35,0.15)` : "none",
//                     position:"relative",
//                   }}
//                 >
//                   {isA && (
//                     <div aria-hidden="true" style={{
//                       position:"absolute", bottom:4, left:"50%", transform:"translateX(-50%)",
//                       width:5, height:5, borderRadius:"50%",
//                       background:C.primary, boxShadow:`0 0 6px ${C.primary}`,
//                     }} />
//                   )}
//                   <img
//                     src={g.id}
//                     alt={g.name}
//                     loading="lazy"
//                     style={{
//                       width:"100%", height:"80%", objectFit:"contain",
//                       filter: isA ? `drop-shadow(0 0 5px rgba(232,127,36,0.70))` : "brightness(0.55) saturate(0.6)",
//                       transition:"filter 0.2s ease",
//                     }}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {!cameraReady && (
//           <div role="status" aria-label="Initializing camera" style={{
//             position:"absolute", inset:0, zIndex:50,
//             background:`radial-gradient(ellipse 120% 80% at 55% 30%, rgba(232,127,36,0.08) 0%, rgba(10,5,2,0.99) 60%)`,
//             display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:24,
//           }}>
//             <div style={{ position:"relative", width:44, height:44 }}>
//               <div className="spinner" />
//               <div className="spinner-inner" />
//             </div>
//             <div style={{ textAlign:"center" }}>
//               <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:22, fontWeight:800, marginBottom:6, background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//                 VR.OPTICS
//               </div>
//               <div style={{ fontSize:9, fontWeight:700, letterSpacing:"3px", color:C.primary, marginBottom:8 }}>INITIALIZING</div>
//               <div style={{ fontSize:10, color:"rgba(254,253,223,0.40)" }}>Allow camera access to continue</div>
//             </div>
//             <div style={{ fontSize:9, color:"rgba(254,253,223,0.22)", border:`0.5px solid rgba(255,255,255,0.10)`, borderRadius:100, padding:"4px 14px" }}>
//               ← Swipe to browse frames →
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   // ══════════════════════════════════════════════════════════════
//   // DESKTOP LAYOUT
//   // ══════════════════════════════════════════════════════════════
//   return (
//     <div style={{ fontFamily:"'Space Grotesk', sans-serif", background:C.gradBg, color:C.text, height:"100vh", display:"flex", overflow:"hidden" }}>
//       <style>{css}</style>

//       {/* Ambient glow */}
//       <div aria-hidden="true" style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
//         <div style={{ position:"absolute", top:"-15%", right:"-8%", width:"52vw", height:"52vw", borderRadius:"50%",
//           background:`radial-gradient(circle, rgba(232,127,36,0.14) 0%, rgba(232,127,36,0.04) 45%, transparent 70%)` }} />
//         <div style={{ position:"absolute", bottom:"-20%", left:"-12%", width:"48vw", height:"48vw", borderRadius:"50%",
//           background:`radial-gradient(circle, rgba(115,165,202,0.12) 0%, rgba(115,165,202,0.03) 45%, transparent 70%)` }} />
//       </div>

//       {/* ── LEFT: Camera (75%) ── */}
//       <div style={{ position:"relative", zIndex:1, flex:"0 0 75%", maxWidth:"75%", padding:20, display:"flex", flexDirection:"column" }}>
//         <div style={{
//           flex:1, position:"relative", borderRadius:22, overflow:"hidden",
//           border:`1px solid ${C.glassBorder}`, background:"#000",
//           boxShadow:`inset 0 0 60px rgba(0,0,0,0.40), 0 0 0 1px rgba(232,127,36,0.08), 0 8px 40px rgba(30,41,59,0.12)`,
//         }}>
//           {cameraReady && (
//             <div role="status" aria-live="polite" style={{
//               position:"absolute", top:16, right:16, zIndex:5,
//               display:"flex", alignItems:"center",
//               background:"rgba(0,0,0,0.42)", ...glassPill,
//               border:`1px solid rgba(115,165,202,0.28)`,
//               padding:"5px 14px", animation:"fadeIn 0.3s ease",
//             }}>
//               <span className="ar-dot" aria-hidden="true" />
//               <span style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,0.80)", letterSpacing:"0.5px" }}>Face Tracking Active</span>
//             </div>
//           )}

//           {/* Selected frame badge */}
//           <div style={{ position:"absolute", bottom:16, left:16, zIndex:5 }}>
//             <div aria-live="polite" style={{
//               background:"rgba(0,0,0,0.52)", ...glassPill,
//               border:`0.5px solid ${C.primary25}`, padding:"8px 20px",
//               boxShadow:`0 4px 20px rgba(0,0,0,0.25), 0 0 16px ${C.primary12}`,
//               display:"flex", alignItems:"center", gap:12,
//             }}>
//               <span style={{ fontSize:9, fontWeight:700, color:"rgba(254,253,223,0.50)", letterSpacing:"1.5px" }}>SELECTED</span>
//               <span aria-hidden="true" style={{ width:1, height:11, background:C.primary30, display:"inline-block" }} />
//               <span style={{ fontSize:13, fontWeight:700, color:"rgba(254,253,223,0.95)" }}>{currentGlass?.name}</span>
//               <span style={{ fontSize:13, fontWeight:700, background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//                 {currentGlass?.price}
//               </span>
//             </div>
//           </div>

//           <video ref={videoRef} style={{ position:"absolute", left:"-100%", top:"-100%", width:"1px", height:"1px", opacity:0, pointerEvents:"none" }} autoPlay playsInline muted />
//           <canvas
//             ref={canvasRef}
//             width={DESKTOP_CANVAS_W}
//             height={DESKTOP_CANVAS_H}
//             aria-label="AR glasses try-on camera view"
//             style={{ display:"block", width:"100%", height:"100%", objectFit:"cover" }}
//           />

//           {!cameraReady && (
//             <div role="status" aria-label="Initializing camera" style={{
//               position:"absolute", inset:0, borderRadius:22, zIndex:30,
//               background:`radial-gradient(ellipse 100% 60% at 55% 30%, rgba(232,127,36,0.08) 0%, rgba(254,253,223,0.97) 55%)`,
//               display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:28,
//             }}>
//               <div style={{ position:"relative", width:50, height:50 }}>
//                 <div className="spinner" />
//                 <div className="spinner-inner" />
//               </div>
//               <div style={{ textAlign:"center" }}>
//                 <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, fontWeight:700, letterSpacing:"3px",
//                   background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:8 }}>
//                   INITIALIZING CAMERA
//                 </div>
//                 <div style={{ fontSize:12, color:C.text55 }}>Please allow camera access to continue</div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ── RIGHT: Controls panel (25%) ── */}
//       <div
//         className="right-panel"
//         role="complementary"
//         aria-label="Frame selection and controls"
//         style={{
//           position:"relative", zIndex:1,
//           flex:"0 0 25%", maxWidth:"25%",
//           overflowY:"auto",
//           padding:"20px 16px 20px 4px",
//           display:"flex", flexDirection:"column", gap:12,
//           borderLeft:`1px solid ${C.glassBorder}`,
//           background:`linear-gradient(180deg, rgba(245,243,199,0.60) 0%, rgba(254,253,223,0.80) 100%)`,
//           backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
//         }}
//       >
//         <div style={{ padding:"4px 4px 2px" }}>
//           <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:18, fontWeight:700, color:C.text, marginBottom:3 }}>
//             Choose Frame
//           </div>
//           <div style={{ fontSize:10, letterSpacing:"1.5px", color:C.text30, fontWeight:600, textTransform:"uppercase" }}>
//             {GLASS_OPTIONS.length} styles available
//           </div>
//         </div>

//         <div role="listbox" aria-label="Select glasses frame" style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:8 }}>
//           {GLASS_OPTIONS.map(g => {
//             const isA = glasses === g.id;
//             return (
//               <div
//                 key={g.id}
//                 className="frame-card"
//                 role="option"
//                 aria-selected={isA}
//                 tabIndex={0}
//                 onClick={() => setGlasses(g.id)}
//                 onKeyDown={e => (e.key === "Enter" || e.key === " ") && setGlasses(g.id)}
//                 style={{
//                   borderRadius:14,
//                   background: isA ? C.primary12 : "rgba(254,253,223,0.55)",
//                   border:`1px solid ${isA ? C.primary : C.surfaceBorder}`,
//                   padding:"10px 6px",
//                   display:"flex", flexDirection:"column", alignItems:"center", gap:5,
//                   cursor:"pointer",
//                   boxShadow: isA ? `0 0 20px rgba(232,127,36,0.20), 0 4px 12px rgba(30,41,59,0.08)` : `0 1px 4px ${C.text06}`,
//                   transition:"all 0.22s cubic-bezier(0.22,1,0.36,1)",
//                   backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)",
//                 }}
//               >
//                 <div style={{
//                   width:"100%", height:48,
//                   display:"flex", alignItems:"center", justifyContent:"center",
//                   borderRadius:10, overflow:"hidden",
//                   background: isA ? C.primary12 : C.text06,
//                 }}>
//                   <img
//                     src={g.id}
//                     alt={g.name}
//                     loading="lazy"
//                     crossOrigin="anonymous"
//                     style={{
//                       width:"90%", height:"90%", objectFit:"contain",
//                       filter: isA ? `drop-shadow(0 0 5px rgba(232,127,36,0.55))` : "brightness(0.80) saturate(0.75)",
//                       transition:"filter 0.2s ease",
//                     }}
//                   />
//                 </div>
//                 <div style={{ fontSize:9, fontWeight:700, textAlign:"center", lineHeight:1.2, color: isA ? C.text : C.text55 }}>
//                   {g.name}
//                 </div>
//                 <div style={{
//                   fontSize:8, fontWeight:700,
//                   background: isA ? C.gradPrimary : "none",
//                   WebkitBackgroundClip: isA ? "text" : "unset",
//                   WebkitTextFillColor: isA ? "transparent" : C.primary,
//                   color: isA ? "transparent" : C.primary,
//                 }}>
//                   {g.price}
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <Section title="FRAME CALIBRATION" icon="⚙️">
//           <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:14 }}>
//             <button
//               onClick={resetAdj}
//               aria-label="Reset frame calibration to defaults"
//               style={{
//                 fontSize:9, fontWeight:700, color:C.primary,
//                 background:C.primary12, border:`0.5px solid ${C.primary25}`,
//                 padding:"5px 14px", borderRadius:100, cursor:"pointer",
//                 letterSpacing:"0.5px", transition:"background 0.15s",
//               }}
//             >Reset</button>
//           </div>
//           <SliderRow label="WIDTH"    value={curAdj.scaleW}  min={0.3}  max={3}   step={0.05} onChange={v => setAdj("scaleW",  v)} fmt={v => `${v.toFixed(2)}×`} />
//           <SliderRow label="HEIGHT"   value={curAdj.scaleH}  min={0.3}  max={3}   step={0.05} onChange={v => setAdj("scaleH",  v)} fmt={v => `${v.toFixed(2)}×`} />
//           <SliderRow label="MOVE L/R" value={curAdj.offsetX} min={-150} max={150} step={1}    onChange={v => setAdj("offsetX", v)} fmt={v => `${v > 0 ? "+" : ""}${v}px`} />
//           <SliderRow label="MOVE U/D" value={curAdj.offsetY} min={-150} max={150} step={1}    onChange={v => setAdj("offsetY", v)} fmt={v => `${v > 0 ? "+" : ""}${v}px`} />
//           <SliderRow label="ROTATION" value={curAdj.rotate}  min={-30}  max={30}  step={0.5}  onChange={v => setAdj("rotate",  v)} fmt={v => `${v > 0 ? "+" : ""}${v.toFixed(1)}°`} />
//         </Section>

//         <Section title="SCENE FILTERS" icon="🎨">
//           <SliderRow label="BRIGHTNESS" value={brightness} min={50}  max={160} step={1} onChange={setBrightness} fmt={v => `${v}%`} />
//           <SliderRow label="CONTRAST"   value={contrast}   min={60}  max={160} step={1} onChange={setContrast}   fmt={v => `${v}%`} />
//           <SliderRow label="SATURATION" value={saturate}   min={50}  max={160} step={1} onChange={setSaturate}   fmt={v => `${v}%`} />
//         </Section>
//       </div>
//     </div>
//   );
// };

// export default TryOn;


























// import React, { useRef, useEffect, useState, useCallback } from "react";

// // ─── Per-frame defaults ────────────────────────────────────────────────────────
// const DEFAULT_ADJ = { scaleW: 1,   scaleH: 1,    offsetX: 0, offsetY: 0,  rotate: 0 };
// const AVIATOR_ADJ = { scaleW: 1,   scaleH: 1.18, offsetX: 0, offsetY: 10, rotate: 0 };
// const ROUND_ADJ   = { scaleW: 1,   scaleH: 0.85, offsetX: 0, offsetY: 4,  rotate: 0 };

// const GLASS_OPTIONS = [
//   { id: "/glass1.png",  name: "Classic",      price: "PKR 4,500", emoji: "👓", sizes: [{ label:"XL", scale:1.10, mobileScale:0.65 }] },
//   { id: "/glass2.png",  name: "Aviator",      price: "PKR 5,200", emoji: "🕶️", sizes: [{ label:"L",  scale:1.15, mobileScale:1.00 }] },
//   { id: "/glass3.png",  name: "Sport",        price: "PKR 3,800", emoji: "🥽", sizes: [{ label:"L",  scale:1.15, mobileScale:1.00 }] },
//   { id: "/glass4.png",  name: "Round",        price: "PKR 4,900", emoji: "⭕", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass5.png",  name: "Wayfarer",     price: "PKR 4,900", emoji: "🕶️", sizes: [{ label:"L",  scale:1.25, mobileScale:0.98 }] },
//   { id: "/glass6.png",  name: "Vintage",      price: "PKR 4,900", emoji: "🪩", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass7.png",  name: "Clubmaster",   price: "PKR 4,900", emoji: "🔲", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
//   { id: "/glass8.png",  name: "Cat Eye",      price: "PKR 4,900", emoji: "😼", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
//   { id: "/glass9.png",  name: "Shield",       price: "PKR 4,900", emoji: "🛡️", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass10.png", name: "Oval",         price: "PKR 4,900", emoji: "🥚", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass11.png", name: "Square",       price: "PKR 4,900", emoji: "⬛", sizes: [{ label:"S",  scale:0.75, mobileScale:0.50 }] },
//   { id: "/glass12.png", name: "Hexagonal",    price: "PKR 4,900", emoji: "⬡", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass13.png", name: "Geometric",    price: "PKR 4,900", emoji: "🔷", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass14.png", name: "Steampunk",    price: "PKR 4,900", emoji: "⚙️", sizes: [{ label:"S",  scale:0.95, mobileScale:0.50 }] },
//   { id: "/glass15.png", name: "Sports Pro",   price: "PKR 4,900", emoji: "🏃", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass16.png", name: "Retro",        price: "PKR 4,900", emoji: "🎞️", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass17.png", name: "Modern",       price: "PKR 4,900", emoji: "✨", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass18.png", name: "Luxury",       price: "PKR 4,900", emoji: "💎", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass19.png", name: "Designer",     price: "PKR 4,900", emoji: "🎨", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass20.png", name: "Classic II",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass21.png", name: "Classic III",  price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass22.png", name: "Classic IV",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.05, mobileScale:0.95 }] },
//   { id: "/glass23.png", name: "Classic V",    price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass24.png", name: "Classic VI",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"S",  scale:0.85, mobileScale:0.50 }] },
//   { id: "/glass25.png", name: "Classic VII",  price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass26.png", name: "Classic VIII", price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass27.png", name: "Classic IX",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass28.png", name: "Classic X",    price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass29.png", name: "Classic XI",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.25, mobileScale:0.95 }] },
//   { id: "/glass30.png", name: "Classic XII",  price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass31.png", name: "Classic 31",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass32.png", name: "Classic 32",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass33.png", name: "Classic 33",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass34.png", name: "Classic 34",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass35.png", name: "Classic 35",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.10, mobileScale:0.75 }] },
//   { id: "/glass36.png", name: "Classic 36",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass37.png", name: "Classic 37",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass38.png", name: "Classic 38",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
//   { id: "/glass39.png", name: "Classic 39",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass40.png", name: "Classic 40",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass41.png", name: "Classic 41",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass42.png", name: "Classic 42",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"S",  scale:0.95, mobileScale:0.50 }] },
//   { id: "/glass43.png", name: "Classic 43",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass44.png", name: "Classic 44",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
//   { id: "/glass45.png", name: "Classic 45",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
//   { id: "/glass46.png", name: "Classic 46",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.40, mobileScale:1.10 }] },
//   { id: "/glass47.png", name: "Classic 47",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.20, mobileScale:1.10 }] },
//   { id: "/glass48.png", name: "Classic 48",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
//   { id: "/glass49.png", name: "Classic 49",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
// ];

// // ─── Device helpers ────────────────────────────────────────────────────────────
// const getIsMobile = () =>
//   typeof window !== "undefined" &&
//   (window.innerWidth < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

// const getMobileSizes = () => {
//   const landscape = typeof window !== "undefined" && window.innerWidth > window.innerHeight;
//   const isLowEnd  = typeof window !== "undefined" &&
//     (window.innerWidth <= 360 || (navigator.deviceMemory ?? 8) <= 2);
//   if (isLowEnd) {
//     return landscape
//       ? { camW: 480, camH: 360, canvasW: 480, canvasH: 360 }
//       : { camW: 360, camH: 480, canvasW: 360, canvasH: 480 };
//   }
//   return landscape
//     ? { camW: 640, camH: 480, canvasW: 640, canvasH: 480 }
//     : { camW: 480, camH: 640, canvasW: 480, canvasH: 640 };
// };

// const getSizeScale = (sizeObj, mobile) =>
//   sizeObj ? (mobile ? (sizeObj.mobileScale ?? sizeObj.scale) : sizeObj.scale) : 1;

// // ─── Timing constants ──────────────────────────────────────────────────────────
// const MOBILE_FPS      = 30;
// const MOBILE_FRAME_INT = 1000 / MOBILE_FPS;

// const DESKTOP_CAM_W   = 1280;
// const DESKTOP_CAM_H   = 720;
// const DESKTOP_CANVAS_W = 1280;
// const DESKTOP_CANVAS_H = 720;

// // ─── Beauty passthrough (neutral) ─────────────────────────────────────────────
// const BEAUTY_B = 100, BEAUTY_C = 100, BEAUTY_S = 100;

// // ─── Landmark indices ─────────────────────────────────────────────────────────
// const LANDMARKS = {
//   LEFT_IRIS_CENTER:    468,
//   RIGHT_IRIS_CENTER:   473,
//   LEFT_EYE_OUTER:       33,
//   RIGHT_EYE_OUTER:     263,
//   LEFT_EYE_INNER:      133,
//   RIGHT_EYE_INNER:     362,
//   LEFT_EYE_TOP:        [159, 160, 161],
//   RIGHT_EYE_TOP:       [386, 387, 388],
//   LEFT_EYEBROW_LOWER:  [70, 63, 105, 66, 107],
//   RIGHT_EYEBROW_LOWER: [300, 293, 334, 296, 336],
//   NOSE_BRIDGE_TOP:     6,
//   LEFT_FACE_EDGE:      234,
//   RIGHT_FACE_EDGE:     454,
// };

// class FaceGeoSmoother {
//   constructor({ posAlpha, scaleAlpha, rotAlpha, maxPosDelta = 60, maxScaleDelta = 0.15 }) {
//     this.posAlpha     = posAlpha;
//     this.scaleAlpha   = scaleAlpha;
//     this.rotAlpha     = rotAlpha;
//     this.maxPosDelta  = maxPosDelta;
//     this.maxScaleDelta = maxScaleDelta;
//     this.prev         = null;
//   }

//   _step(prev, cur, alpha, maxDelta, deadzone = 0) {
//     const raw = cur - prev;
//     if (deadzone > 0 && Math.abs(raw) < deadzone) return prev;
//     const delta = Math.max(-maxDelta, Math.min(maxDelta, raw));
//     return prev + alpha * delta;
//   }

//   smooth(cur, deadzone = 0) {
//     if (!this.prev) { this.prev = { ...cur }; return { ...cur }; }
//     const p = this.prev;
//     const r = {
//       cx:    this._step(p.cx,    cur.cx,    this.posAlpha,   this.maxPosDelta,   deadzone),
//       cy:    this._step(p.cy,    cur.cy,    this.posAlpha,   this.maxPosDelta,   deadzone),
//       gw:    this._step(p.gw,    cur.gw,    this.scaleAlpha, this.maxPosDelta,   0),
//       gh:    this._step(p.gh,    cur.gh,    this.scaleAlpha, this.maxPosDelta,   0),
//       angle: this._step(p.angle, cur.angle, this.rotAlpha,   0.18,               0),
//       ds:    this._step(p.ds,    cur.ds,    this.scaleAlpha, this.maxScaleDelta, 0),
//     };
//     this.prev = { ...r };
//     return r;
//   }

//   reset() { this.prev = null; }
// }

// function extractFaceGeometry(lm, W, H, useIris = true) {
//   const px = (idx) => ({ x: lm[idx].x * W, y: lm[idx].y * H, z: lm[idx].z ?? 0 });
//   const avgPx = (indices) => {
//     const pts = indices.map(i => px(i));
//     return {
//       x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
//       y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
//     };
//   };
//   const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

//   const leftEyeOut  = px(LANDMARKS.LEFT_EYE_OUTER);
//   const rightEyeOut = px(LANDMARKS.RIGHT_EYE_OUTER);
//   const leftEyeIn   = px(LANDMARKS.LEFT_EYE_INNER);
//   const rightEyeIn  = px(LANDMARKS.RIGHT_EYE_INNER);
//   const noseBridgeTop = px(LANDMARKS.NOSE_BRIDGE_TOP);
//   const leftBrowLower  = avgPx(LANDMARKS.LEFT_EYEBROW_LOWER);
//   const rightBrowLower = avgPx(LANDMARKS.RIGHT_EYEBROW_LOWER);

//   let leftIris, rightIris;
//   if (useIris && lm.length > 473) {
//     leftIris  = px(LANDMARKS.LEFT_IRIS_CENTER);
//     rightIris = px(LANDMARKS.RIGHT_IRIS_CENTER);
//   } else {
//     leftIris  = {
//       x: leftEyeOut.x * 0.5 + leftEyeIn.x * 0.5,
//       y: leftEyeOut.y * 0.5 + leftEyeIn.y * 0.5,
//       z: 0,
//     };
//     rightIris = {
//       x: rightEyeOut.x * 0.5 + rightEyeIn.x * 0.5,
//       y: rightEyeOut.y * 0.5 + rightEyeIn.y * 0.5,
//       z: 0,
//     };
//   }

//   const irisY   = (leftIris.y  + rightIris.y)  / 2;
//   const centerX = (leftIris.x  + rightIris.x)  / 2;
//   const browMidY = (leftBrowLower.y + rightBrowLower.y) / 2;

//   const centerY = irisY * 0.65 + noseBridgeTop.y * 0.30 + browMidY * 0.05;

//   const angleEyeCorners = Math.atan2(
//     rightEyeOut.y - leftEyeOut.y,
//     rightEyeOut.x - leftEyeOut.x,
//   );
//   const angleBrow = Math.atan2(
//     rightBrowLower.y - leftBrowLower.y,
//     rightBrowLower.x - leftBrowLower.x,
//   );
//   const angleIris = useIris
//     ? Math.atan2(rightIris.y - leftIris.y, rightIris.x - leftIris.x)
//     : angleEyeCorners;
//   const angle = angleEyeCorners * 0.65 + angleBrow * 0.25 + angleIris * 0.10;

//   const eyeSpan = dist(leftEyeOut, rightEyeOut);
//   const spanMult = useIris ? 1.0 : 1.20;
//   const glassesWidth  = eyeSpan * 2.0 * spanMult;
//   const glassesHeight = eyeSpan * 0.75 * spanMult;

//   const avgZ = (leftIris.z + rightIris.z + (noseBridgeTop.z ?? 0)) / 3;
//   const depthScale = Math.max(0.93, Math.min(1.07, 1 + (-avgZ * 0.5)));

//   return { centerX, centerY, angle, glassesWidth, glassesHeight, depthScale };
// }

// // ─── Theme ────────────────────────────────────────────────────────────────────
// const C = {
//   primary:       "#E87F24",
//   accent:        "#73A5CA",
//   bg:            "#FEFDDF",
//   surface:       "#F5F3C7",
//   text:          "#1E293B",
//   primary12:     "rgba(232,127,36,0.12)",
//   primary20:     "rgba(232,127,36,0.20)",
//   primary25:     "rgba(232,127,36,0.25)",
//   primary30:     "rgba(232,127,36,0.30)",
//   primary40:     "rgba(232,127,36,0.40)",
//   accent12:      "rgba(115,165,202,0.12)",
//   accent20:      "rgba(115,165,202,0.20)",
//   accent28:      "rgba(115,165,202,0.28)",
//   text55:        "rgba(30,41,59,0.55)",
//   text30:        "rgba(30,41,59,0.30)",
//   text12:        "rgba(30,41,59,0.12)",
//   text06:        "rgba(30,41,59,0.06)",
//   glassBg:       "rgba(254,253,223,0.65)",
//   glassBorder:   "rgba(255,255,255,0.70)",
//   surfaceBorder: "rgba(255,255,255,0.85)",
//   white15:       "rgba(255,255,255,0.15)",
//   white08:       "rgba(255,255,255,0.08)",
//   gradPrimary:   "linear-gradient(135deg, #E87F24, #F5A623)",
//   gradPrimaryTx: "linear-gradient(135deg, #F5A623, #E87F24)",
//   gradBg: `
//     radial-gradient(ellipse 60% 50% at 80% 10%, rgba(232,127,36,0.13) 0%, transparent 60%),
//     radial-gradient(ellipse 50% 40% at 10% 80%, rgba(115,165,202,0.12) 0%, transparent 55%),
//     #FEFDDF
//   `,
// };

// const glassPill = {
//   borderRadius:          100,
//   backdropFilter:        "blur(14px)",
//   WebkitBackdropFilter:  "blur(14px)",
// };

// // ─── UI sub-components ────────────────────────────────────────────────────────
// const Section = ({ title, icon, defaultOpen = false, children }) => {
//   const [open, setOpen] = useState(defaultOpen);
//   return (
//     <div style={{
//       borderRadius: 16, border: `1px solid ${C.glassBorder}`, overflow: "hidden",
//       background: C.glassBg, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
//       boxShadow: `0 2px 8px ${C.text06}`,
//     }}>
//       <button
//         onClick={() => setOpen(o => !o)}
//         aria-expanded={open}
//         aria-label={`${open ? "Collapse" : "Expand"} ${title}`}
//         style={{
//           width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
//           padding: "13px 16px", background: "rgba(254,253,223,0.50)", border: "none", cursor: "pointer",
//           borderBottom: open ? `1px solid ${C.glassBorder}` : "none",
//         }}
//       >
//         <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: C.primary }}>
//           <span style={{ fontSize: 13 }} aria-hidden="true">{icon}</span>{title}
//         </span>
//         <span aria-hidden="true" style={{
//           fontSize: 9, color: C.text55,
//           transform: open ? "rotate(180deg)" : "rotate(0)",
//           transition: "transform 0.22s ease", display: "inline-block",
//         }}>▼</span>
//       </button>
//       {open && <div style={{ padding: "16px", background: "rgba(245,243,199,0.40)" }}>{children}</div>}
//     </div>
//   );
// };

// const SliderRow = ({ label, value, min, max, step, onChange, fmt }) => (
//   <div style={{ marginBottom: 18 }}>
//     <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
//       <label style={{ fontSize: 10, color: C.text55, fontWeight: 600, letterSpacing: "1px" }}>{label}</label>
//       <span style={{ fontSize: 11, fontWeight: 700, background: C.gradPrimaryTx, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
//         {fmt(value)}
//       </span>
//     </div>
//     <input
//       type="range" min={min} max={max} step={step} value={value}
//       aria-label={label}
//       onChange={e => onChange(Number(e.target.value))}
//       style={{ width: "100%", height: 3, background: C.primary20, borderRadius: 4, appearance: "none", WebkitAppearance: "none", cursor: "pointer" }}
//     />
//   </div>
// );

// // ─────────────────────────────────────────────────────────────────────────────
// // Main Component
// // ─────────────────────────────────────────────────────────────────────────────
// const TryOn = () => {
//   const videoRef         = useRef(null);
//   const canvasRef        = useRef(null);
//   const imgRef           = useRef(new Image());
//   const rafIdRef         = useRef(null);
//   const lastFrameRef     = useRef(0);
//   const touchStartX      = useRef(null);
//   const touchStartY      = useRef(null);
//   const cameraRdyRef     = useRef(false);
//   const glassesRef       = useRef("/glass1.png");
//   const adjRef           = useRef({});
//   const pendingResultRef = useRef(null);
//   const camStreamRef     = useRef(null);
//   const camInstanceRef   = useRef(null);
//   const cachedGlassRef   = useRef(null);
//   const ctxRef           = useRef(null);
//   const resultVersionRef     = useRef(0);
//   const lastDrawnVersionRef  = useRef(-1);

//   const [isMobile, setIsMobile] = useState(() => getIsMobile());
//   const isMobileRef = useRef(isMobile);
//   const [mobileSizes, setMobileSizes] = useState(() => getMobileSizes());

//   useEffect(() => {
//     const onResize = () => {
//       const m = getIsMobile();
//       isMobileRef.current = m;
//       setIsMobile(m);
//       ctxRef.current = null;
//       if (m) setMobileSizes(getMobileSizes());
//     };
//     window.addEventListener("resize", onResize, { passive: true });
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   const smootherRef = useRef(null);
//   if (!smootherRef.current) {
//     smootherRef.current = isMobile
//       ? new FaceGeoSmoother({
//           posAlpha:      0.38,
//           scaleAlpha:    0.25,
//           rotAlpha:      0.22,
//           maxPosDelta:   48,
//           maxScaleDelta: 0.12,
//         })
//       : new FaceGeoSmoother({
//           posAlpha:      0.45,
//           scaleAlpha:    0.32,
//           rotAlpha:      0.30,
//           maxPosDelta:   60,
//           maxScaleDelta: 0.15,
//         });
//   }

//   const [glasses, setGlasses]         = useState("/glass1.png");
//   const [cameraReady, setCameraReady] = useState(false);
//   const [brightness, setBrightness]   = useState(100);
//   const [contrast,   setContrast]     = useState(100);
//   const [saturate,   setSaturate]     = useState(100);
//   const [mpError,    setMpError]      = useState(null);

//   const brightnessRef = useRef(100);
//   const contrastRef   = useRef(100);
//   const saturateRef   = useRef(100);
//   useEffect(() => { brightnessRef.current = brightness; }, [brightness]);
//   useEffect(() => { contrastRef.current   = contrast;   }, [contrast]);
//   useEffect(() => { saturateRef.current   = saturate;   }, [saturate]);

//   const adjustmentsRef = useRef(
//     Object.fromEntries(GLASS_OPTIONS.map(g => {
//       if (g.id === "/glass2.png") return [g.id, { ...AVIATOR_ADJ }];
//       if (g.id === "/glass4.png") return [g.id, { ...ROUND_ADJ }];
//       return [g.id, { ...DEFAULT_ADJ }];
//     }))
//   );
//   const [adjUIState, setAdjUIState] = useState(() => adjustmentsRef.current["/glass1.png"]);

//   useEffect(() => {
//     glassesRef.current   = glasses;
//     adjRef.current       = adjustmentsRef.current;
//     cachedGlassRef.current = GLASS_OPTIONS.find(g => g.id === glasses) || null;
//     setAdjUIState({ ...(adjustmentsRef.current[glasses] || DEFAULT_ADJ) });
//   }, [glasses]);

//   const setAdj = useCallback((key, val) => {
//     const id = glassesRef.current;
//     adjustmentsRef.current = {
//       ...adjustmentsRef.current,
//       [id]: { ...(adjustmentsRef.current[id] || DEFAULT_ADJ), [key]: val },
//     };
//     adjRef.current = adjustmentsRef.current;
//     setAdjUIState(prev => ({ ...prev, [key]: val }));
//   }, []);

//   const resetAdj = useCallback(() => {
//     const id = glassesRef.current;
//     const defaults =
//       id === "/glass2.png" ? { ...AVIATOR_ADJ } :
//       id === "/glass4.png" ? { ...ROUND_ADJ }   : { ...DEFAULT_ADJ };
//     adjustmentsRef.current = { ...adjustmentsRef.current, [id]: defaults };
//     adjRef.current = adjustmentsRef.current;
//     setAdjUIState({ ...defaults });
//   }, []);

//   useEffect(() => {
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.src = glasses;
//     imgRef.current = img;
//   }, [glasses]);

//   // ── Draw loop ─────────────────────────────────────────────────────────────
//   const drawLoop = useCallback(() => {
//     rafIdRef.current = requestAnimationFrame(drawLoop);

//     const mobile = isMobileRef.current;
//     const now    = performance.now();
//     if (mobile && now - lastFrameRef.current < MOBILE_FRAME_INT) return;
//     lastFrameRef.current = now;

//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     if (!ctxRef.current) {
//       ctxRef.current = canvas.getContext("2d", { alpha: false, willReadFrequently: false });
//     }
//     const ctx = ctxRef.current;
//     if (!ctx) return;

//     const result = pendingResultRef.current;
//     if (!result?.image || resultVersionRef.current === lastDrawnVersionRef.current) return;

//     const W = canvas.width, H = canvas.height;

//     const userB = brightnessRef.current;
//     const userC = contrastRef.current;
//     const userS = saturateRef.current;
//     const needsFilter = !mobile && (
//       userB !== 100 || userC !== 100 || userS !== 100 ||
//       BEAUTY_B !== 100 || BEAUTY_C !== 100 || BEAUTY_S !== 100
//     );
//     ctx.filter = needsFilter
//       ? `brightness(${BEAUTY_B}%) contrast(${BEAUTY_C}%) saturate(${BEAUTY_S}%) brightness(${userB}%) contrast(${userC}%) saturate(${userS}%)`
//       : "none";

//     ctx.save();
//     ctx.translate(W, 0);
//     ctx.scale(-1, 1);
//     ctx.drawImage(result.image, 0, 0, W, H);
//     ctx.restore();
//     ctx.filter = "none";

//     if (!result.multiFaceLandmarks?.length) {
//       smootherRef.current.reset();
//       lastDrawnVersionRef.current = resultVersionRef.current;
//       return;
//     }

//     const lm  = result.multiFaceLandmarks[0];
//     const geo = extractFaceGeometry(lm, W, H, !mobile);

//     const mirroredCx = W - geo.centerX;

//     const sm = smootherRef.current.smooth(
//       { cx: mirroredCx, cy: geo.centerY, gw: geo.glassesWidth, gh: geo.glassesHeight, angle: geo.angle, ds: geo.depthScale },
//       mobile ? 1.0 : 0,
//     );

//     const img = imgRef.current;
//     if (!img.complete || !img.naturalWidth) {
//       lastDrawnVersionRef.current = resultVersionRef.current;
//       return;
//     }

//     const glassObj = cachedGlassRef.current;
//     const sSc      = glassObj?.sizes?.[0] ? getSizeScale(glassObj.sizes[0], mobile) : 1.0;
//     const adj      = adjRef.current[glassesRef.current] || DEFAULT_ADJ;

//     let w = sm.gw * adj.scaleW;
//     let h = sm.gh * adj.scaleH;
//     if (!mobile) {
//       const ds = Math.max(0.95, Math.min(1.05, sm.ds));
//       w *= ds; h *= ds;
//     }
//     w *= sSc; h *= sSc;

//     w = Math.max(20, Math.min(W * 0.95, w));
//     h = Math.max(8,  Math.min(H * 0.60, h));

//     const mirroredAngle = -sm.angle;

//     const halfW    = w * 0.5;
//     const halfH    = h * 0.5;
//     const clampedX = Math.max(halfW, Math.min(W - halfW, sm.cx + adj.offsetX));
//     const clampedY = Math.max(halfH, Math.min(H - halfH, sm.cy + adj.offsetY));

//     ctx.save();
//     ctx.translate(clampedX, clampedY);
//     ctx.rotate(mirroredAngle + adj.rotate * Math.PI / 180);
//     ctx.drawImage(img, -w / 2, -h / 2, w, h);
//     ctx.restore();

//     lastDrawnVersionRef.current = resultVersionRef.current;
//   }, []);

//   const onResults = useCallback((results) => {
//     pendingResultRef.current = results;
//     resultVersionRef.current++;
//   }, []);

//   // ── Camera + FaceMesh init ───────────────────────────────────────────────
//   useEffect(() => {
//     if (!window.FaceMesh) {
//       setMpError("MediaPipe FaceMesh not found. Add the MediaPipe <script> tag to index.html.");
//       return;
//     }

//     const mobile = isMobileRef.current;
//     let camW, camH, canvasW, canvasH;
//     if (mobile) {
//       ({ camW, camH, canvasW, canvasH } = mobileSizes);
//     } else {
//       camW = DESKTOP_CAM_W; camH = DESKTOP_CAM_H;
//       canvasW = DESKTOP_CANVAS_W; canvasH = DESKTOP_CANVAS_H;
//     }

//     if (canvasRef.current) {
//       canvasRef.current.width  = canvasW;
//       canvasRef.current.height = canvasH;
//       ctxRef.current = null;
//     }

//     const faceMesh = new window.FaceMesh({
//       locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/${file}`,
//     });
//     faceMesh.setOptions({
//       maxNumFaces:            1,
//       refineLandmarks:        !mobile,
//       minDetectionConfidence: mobile ? 0.40 : 0.50,
//       minTrackingConfidence:  mobile ? 0.35 : 0.50,
//     });
//     faceMesh.onResults(onResults);

//     rafIdRef.current = requestAnimationFrame(drawLoop);

//     navigator.mediaDevices.getUserMedia({
//       video: {
//         facingMode: "user",
//         width:      { ideal: camW },
//         height:     { ideal: camH },
//         frameRate:  { ideal: mobile ? 30 : 60 },
//       },
//       audio: false,
//     })
//     .then(stream => {
//       camStreamRef.current = stream;
//       const video = videoRef.current;
//       if (!video) return;
//       video.srcObject = stream;
//       video.onloadedmetadata = () => {
//         video.play().then(() => {
//           cameraRdyRef.current = true;
//           setCameraReady(true);

//           const sendFrame = async () => {
//             if (!cameraRdyRef.current) return;
//             try {
//               if (video.readyState >= 2) await faceMesh.send({ image: video });
//             } catch (_) { /* ignore send errors on cleanup */ }
//             if (cameraRdyRef.current) {
//               camInstanceRef.current = requestAnimationFrame(sendFrame);
//             }
//           };
//           camInstanceRef.current = requestAnimationFrame(sendFrame);
//         }).catch(err => {
//           console.error("Video play failed:", err);
//           setMpError("Could not start video playback. Please reload and allow camera access.");
//         });
//       };
//     })
//     .catch(err => {
//       console.error("Camera failed:", err);
//       setMpError("Camera access denied or not available. Please allow camera permissions and reload.");
//     });

//     return () => {
//       cameraRdyRef.current = false;
//       if (rafIdRef.current)       cancelAnimationFrame(rafIdRef.current);
//       if (camInstanceRef.current) cancelAnimationFrame(camInstanceRef.current);
//       if (camStreamRef.current) {
//         camStreamRef.current.getTracks().forEach(t => t.stop());
//         camStreamRef.current = null;
//       }
//       if (videoRef.current?.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach(t => t.stop());
//         videoRef.current.srcObject = null;
//       }
//       faceMesh.close();
//     };
//   }, [drawLoop, onResults, mobileSizes]);

//   // ── CSS ──────────────────────────────────────────────────────────────────
//   const css = `
//     @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600&display=swap');
//     *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//     input[type="range"] { -webkit-appearance: none; appearance: none; background: transparent; }
//     input[type="range"]::-webkit-slider-runnable-track {
//       background: linear-gradient(90deg, rgba(232,127,36,0.30), rgba(232,127,36,0.10));
//       height: 3px; border-radius: 3px;
//     }
//     input[type="range"]::-webkit-slider-thumb {
//       -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%;
//       background: radial-gradient(circle at 38% 35%, #F5A623, #E87F24);
//       cursor: pointer; margin-top: -6.5px;
//       border: 2px solid rgba(254,253,223,0.90);
//       box-shadow: 0 2px 8px rgba(232,127,36,0.40);
//     }
//     input[type="range"]::-moz-range-thumb {
//       width: 16px; height: 16px; border-radius: 50%;
//       background: radial-gradient(circle at 38% 35%, #F5A623, #E87F24);
//       cursor: pointer; border: 2px solid rgba(254,253,223,0.90);
//       box-shadow: 0 2px 8px rgba(232,127,36,0.40);
//     }
//     .right-panel { scrollbar-width: thin; scrollbar-color: rgba(232,127,36,0.40) rgba(232,127,36,0.08); }
//     ::-webkit-scrollbar { width: 3px; height: 3px; }
//     ::-webkit-scrollbar-track { background: rgba(232,127,36,0.06); border-radius: 4px; }
//     ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #E87F24, #F5A623); border-radius: 4px; }

//     /* ── Snapchat-style ring carousel ── */
//     .lens-carousel {
//       display: flex;
//       gap: 14px;
//       padding: 6px 20px 14px;
//       overflow-x: auto;
//       overflow-y: visible;
//       scroll-snap-type: x mandatory;
//       -webkit-overflow-scrolling: touch;
//       scrollbar-width: none;
//       -ms-overflow-style: none;
//       will-change: scroll-position;
//     }
//     .lens-carousel::-webkit-scrollbar { display: none; }

//     .lens-ring {
//       flex-shrink: 0;
//       scroll-snap-align: center;
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       gap: 5px;
//       cursor: pointer;
//       -webkit-tap-highlight-color: transparent;
//       user-select: none;
//     }

//     .lens-ring__circle {
//       position: relative;
//       border-radius: 50%;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       transition:
//         transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1),
//         opacity 0.22s ease,
//         box-shadow 0.28s ease;
//       will-change: transform, opacity, box-shadow;
//     }

//     /* Active ring */
//     .lens-ring--active .lens-ring__circle {
//       transform: scale(1.18);
//       opacity: 1;
//       box-shadow:
//         0 0 0 2.5px #E87F24,
//         0 0 0 4.5px rgba(232,127,36,0.22),
//         0 0 20px rgba(232,127,36,0.65),
//         0 0 40px rgba(245,166,35,0.28);
//     }

//     /* Inactive ring */
//     .lens-ring--inactive .lens-ring__circle {
//       transform: scale(0.88);
//       opacity: 0.52;
//       box-shadow:
//         0 0 0 1.5px rgba(255,255,255,0.14),
//         0 2px 8px rgba(0,0,0,0.30);
//     }

//     .lens-ring__circle:active {
//       transform: scale(0.82) !important;
//       opacity: 0.75 !important;
//       transition: transform 0.10s ease, opacity 0.10s ease !important;
//     }

//     .lens-ring__img {
//       width: 68%;
//       height: 68%;
//       object-fit: contain;
//       transition: filter 0.22s ease;
//       pointer-events: none;
//     }

//     .lens-ring--active .lens-ring__img {
//       filter: drop-shadow(0 0 6px rgba(232,127,36,0.80)) brightness(1.08);
//     }
//     .lens-ring--inactive .lens-ring__img {
//       filter: brightness(0.50) saturate(0.45);
//     }

//     /* Active glow ring SVG border */
//     .lens-ring__glow-ring {
//       position: absolute;
//       inset: -3px;
//       border-radius: 50%;
//       pointer-events: none;
//       opacity: 0;
//       transition: opacity 0.26s ease;
//       background: conic-gradient(
//         from 0deg,
//         #F5A623,
//         #E87F24,
//         #FF6B35,
//         #F5A623
//       );
//       border-radius: 50%;
//       padding: 2px;
//       -webkit-mask:
//         linear-gradient(#fff 0 0) content-box,
//         linear-gradient(#fff 0 0);
//       -webkit-mask-composite: xor;
//       mask-composite: exclude;
//       animation: spin-ring 3s linear infinite;
//     }
//     .lens-ring--active .lens-ring__glow-ring {
//       opacity: 1;
//     }

//     @keyframes spin-ring {
//       to { transform: rotate(360deg); }
//     }

//     .lens-ring__label {
//       font-size: 9px;
//       font-weight: 700;
//       letter-spacing: 0.4px;
//       text-align: center;
//       max-width: 60px;
//       white-space: nowrap;
//       overflow: hidden;
//       text-overflow: ellipsis;
//       transition: color 0.22s ease, opacity 0.22s ease;
//       pointer-events: none;
//     }
//     .lens-ring--active .lens-ring__label {
//       color: #F5A623;
//       opacity: 1;
//     }
//     .lens-ring--inactive .lens-ring__label {
//       color: rgba(255,255,255,0.38);
//       opacity: 1;
//     }

//     /* Active dot indicator */
//     .lens-ring__dot {
//       width: 4px;
//       height: 4px;
//       border-radius: 50%;
//       background: #E87F24;
//       box-shadow: 0 0 6px #E87F24;
//       transition: opacity 0.22s ease, transform 0.22s ease;
//     }
//     .lens-ring--active .lens-ring__dot {
//       opacity: 1;
//       transform: scale(1);
//     }
//     .lens-ring--inactive .lens-ring__dot {
//       opacity: 0;
//       transform: scale(0);
//     }

//     .frame-scroller { scroll-behavior: smooth; -webkit-overflow-scrolling: touch; scrollbar-width: none; -ms-overflow-style: none; }
//     .frame-scroller::-webkit-scrollbar { display: none; }
//     .frame-card { transition: transform 0.2s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s ease; -webkit-tap-highlight-color: transparent; }
//     .frame-card:hover { transform: translateY(-2px) scale(1.03); }
//     .frame-card:active { transform: scale(0.96); }
//     .frame-card:focus-visible { outline: 2px solid #E87F24; outline-offset: 2px; }
//     @keyframes spin   { to { transform: rotate(360deg); } }
//     @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
//     @keyframes pulse  { 0%,100%{ opacity:0.55 } 50%{ opacity:1 } }
//     .spinner {
//       width: 44px; height: 44px; border-radius: 50%;
//       border: 2px solid rgba(115,165,202,0.20);
//       border-top-color: #E87F24;
//       animation: spin 0.85s linear infinite;
//     }
//     .spinner-inner {
//       width: 30px; height: 30px; border-radius: 50%;
//       border: 1.5px solid rgba(232,127,36,0.15);
//       border-bottom-color: #F5A623;
//       animation: spin 1.2s linear infinite reverse;
//       position: absolute; top: 7px; left: 7px;
//     }
//     .ar-dot {
//       width: 7px; height: 7px; border-radius: 50%;
//       background: #73A5CA;
//       box-shadow: 0 0 8px rgba(115,165,202,0.70);
//       animation: pulse 2s ease infinite;
//       display: inline-block; margin-right: 6px; flex-shrink: 0;
//     }
//   `;

//   if (mpError) return (
//     <div role="alert" style={{
//       display: "flex", alignItems: "center", justifyContent: "center",
//       height: "100vh", background: C.bg, color: "#c2410c",
//       fontFamily: "monospace", padding: 24, textAlign: "center", fontSize: 13,
//     }}>
//       ⚠️ {mpError}
//     </div>
//   );

//   const currentGlass = GLASS_OPTIONS.find(g => g.id === glasses);
//   const curAdj       = adjUIState;

//   // ══════════════════════════════════════════════════════════════
//   // MOBILE LAYOUT
//   // ══════════════════════════════════════════════════════════════
//   if (isMobile) {
//     const idx = GLASS_OPTIONS.findIndex(g => g.id === glasses);
//     const { canvasW, canvasH } = mobileSizes;

//     // Circle size: 58px active hub, 50px inactive — responsive to narrow screens
//     const CIRCLE_SIZE_ACTIVE   = 58;
//     const CIRCLE_SIZE_INACTIVE = 50;

//     const onTouchStart = (e) => {
//       touchStartX.current = e.touches[0].clientX;
//       touchStartY.current = e.touches[0].clientY;
//     };
//     const onTouchEnd = (e) => {
//       if (touchStartX.current === null) return;
//       const dx = e.changedTouches[0].clientX - touchStartX.current;
//       const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
//       if (Math.abs(dx) > 50 && Math.abs(dx) > dy) {
//         const cur = GLASS_OPTIONS.findIndex(g => g.id === glassesRef.current);
//         if (dx < 0 && cur < GLASS_OPTIONS.length - 1) setGlasses(GLASS_OPTIONS[cur + 1].id);
//         if (dx > 0 && cur > 0)                        setGlasses(GLASS_OPTIONS[cur - 1].id);
//       }
//       touchStartX.current = null;
//       touchStartY.current = null;
//     };

//     return (
//       <div
//         style={{ position:"fixed", inset:0, background:"#000", fontFamily:"'Space Grotesk',sans-serif", color:"#fff", overflow:"hidden", touchAction:"pan-y" }}
//         onTouchStart={onTouchStart}
//         onTouchEnd={onTouchEnd}
//       >
//         <style>{css}</style>
//         <video ref={videoRef} style={{ position:"absolute", left:"-100%", top:"-100%", width:"1px", height:"1px", opacity:0, pointerEvents:"none" }} autoPlay playsInline muted />

//         <canvas
//           ref={canvasRef}
//           width={canvasW}
//           height={canvasH}
//           style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", display:"block" }}
//           aria-label="AR glasses try-on camera view"
//         />

//         {/* Top vignette */}
//         <div style={{ position:"absolute", top:0, left:0, right:0, height:"22%", background:"linear-gradient(to bottom, rgba(0,0,0,0.50), transparent)", pointerEvents:"none" }} aria-hidden="true" />

//         {/* AR tracking indicator */}
//         {cameraReady && (
//           <div role="status" aria-live="polite" style={{
//             position:"absolute", top:18, left:16, zIndex:20,
//             display:"flex", alignItems:"center",
//             background:"rgba(0,0,0,0.42)", ...glassPill,
//             border:`1px solid rgba(115,165,202,0.30)`,
//             padding:"5px 12px", animation:"fadeIn 0.35s ease",
//           }}>
//             <span className="ar-dot" aria-hidden="true" />
//             <span style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,0.80)", letterSpacing:"0.5px" }}>Tracking</span>
//           </div>
//         )}

//         {/* Frame name + price */}
//         {cameraReady && currentGlass && (
//           <div aria-live="polite" style={{
//             position:"absolute", bottom:158, left:"50%", transform:"translateX(-50%)",
//             zIndex:20, whiteSpace:"nowrap",
//             background:"rgba(0,0,0,0.48)", ...glassPill,
//             border:`1px solid ${C.primary25}`,
//             padding:"7px 20px",
//             display:"flex", alignItems:"center", gap:10,
//             animation:"fadeIn 0.3s ease",
//             boxShadow:`0 4px 20px rgba(0,0,0,0.25), 0 0 20px ${C.primary12}`,
//           }}>
//             <span style={{ fontSize:13, fontWeight:700, color:"rgba(254,253,223,0.95)" }}>{currentGlass.name}</span>
//             <span aria-hidden="true" style={{ width:1, height:11, background:C.primary30, display:"inline-block" }} />
//             <span style={{ fontSize:13, fontWeight:700, background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//               {currentGlass.price}
//             </span>
//           </div>
//         )}

//         {/* Progress dots */}
//         {cameraReady && (
//           <div aria-hidden="true" style={{ position:"absolute", bottom:140, left:"50%", transform:"translateX(-50%)", display:"flex", gap:4, zIndex:20 }}>
//             {GLASS_OPTIONS.map((g, i) => (
//               <div key={g.id} style={{
//                 width: i === idx ? 14 : 4, height:4, borderRadius:3,
//                 background: i === idx ? C.primary : C.white15,
//                 transition:"all 0.25s ease",
//               }} />
//             ))}
//           </div>
//         )}

//         {/* ── UPDATED: Snapchat-style circular ring carousel ── */}
//         <div style={{
//           position:"absolute", bottom:0, left:0, right:0, zIndex:20,
//           paddingBottom:"env(safe-area-inset-bottom, 10px)",
//           background:"linear-gradient(to top, rgba(8,4,1,0.97) 50%, rgba(8,4,1,0.80) 75%, transparent 100%)",
//         }}>
//           {/* Header row */}
//           <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 20px 2px" }}>
//             <span style={{ fontSize:9, fontWeight:700, letterSpacing:"2px", color:"rgba(254,253,223,0.30)", textTransform:"uppercase" }}>Frames</span>
//             <span style={{ fontSize:9, color:"rgba(254,253,223,0.25)" }} aria-live="polite">{idx + 1} / {GLASS_OPTIONS.length}</span>
//           </div>

//           {/* Ring carousel */}
//           <div
//             className="lens-carousel"
//             role="listbox"
//             aria-label="Select glasses frame"
//           >
//             {GLASS_OPTIONS.map((g, i) => {
//               const isA = glasses === g.id;
//               const circleSize = isA ? CIRCLE_SIZE_ACTIVE : CIRCLE_SIZE_INACTIVE;

//               return (
//                 <div
//                   key={g.id}
//                   className={`lens-ring ${isA ? "lens-ring--active" : "lens-ring--inactive"}`}
//                   role="option"
//                   aria-selected={isA}
//                   tabIndex={0}
//                   onClick={() => setGlasses(g.id)}
//                   onKeyDown={e => (e.key === "Enter" || e.key === " ") && setGlasses(g.id)}
//                   style={{ minWidth: CIRCLE_SIZE_ACTIVE + 2 }}
//                 >
//                   {/* Circle button */}
//                   <div
//                     className="lens-ring__circle"
//                     style={{
//                       width:  circleSize,
//                       height: circleSize,
//                       background: isA
//                         ? "radial-gradient(circle at 35% 35%, rgba(232,127,36,0.22), rgba(10,5,2,0.90))"
//                         : "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.07), rgba(10,5,2,0.82))",
//                     }}
//                   >
//                     {/* Spinning glow ring for active */}
//                     <div className="lens-ring__glow-ring" aria-hidden="true" />

//                     {/* Glass image */}
//                     <img
//                       src={g.id}
//                       alt={g.name}
//                       loading="lazy"
//                       className="lens-ring__img"
//                     />
//                   </div>

//                   {/* Label */}
//                   <span className="lens-ring__label">{g.name}</span>

//                   {/* Active dot indicator */}
//                   <div className="lens-ring__dot" aria-hidden="true" />
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//         {/* ── END: Snapchat-style circular ring carousel ── */}

//         {!cameraReady && (
//           <div role="status" aria-label="Initializing camera" style={{
//             position:"absolute", inset:0, zIndex:50,
//             background:`radial-gradient(ellipse 120% 80% at 55% 30%, rgba(232,127,36,0.08) 0%, rgba(10,5,2,0.99) 60%)`,
//             display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:24,
//           }}>
//             <div style={{ position:"relative", width:44, height:44 }}>
//               <div className="spinner" />
//               <div className="spinner-inner" />
//             </div>
//             <div style={{ textAlign:"center" }}>
//               <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:22, fontWeight:800, marginBottom:6, background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//                 VR.OPTICS
//               </div>
//               <div style={{ fontSize:9, fontWeight:700, letterSpacing:"3px", color:C.primary, marginBottom:8 }}>INITIALIZING</div>
//               <div style={{ fontSize:10, color:"rgba(254,253,223,0.40)" }}>Allow camera access to continue</div>
//             </div>
//             <div style={{ fontSize:9, color:"rgba(254,253,223,0.22)", border:`0.5px solid rgba(255,255,255,0.10)`, borderRadius:100, padding:"4px 14px" }}>
//               ← Swipe to browse frames →
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   // ══════════════════════════════════════════════════════════════
//   // DESKTOP LAYOUT  (unchanged)
//   // ══════════════════════════════════════════════════════════════
//   return (
//     <div style={{ fontFamily:"'Space Grotesk', sans-serif", background:C.gradBg, color:C.text, height:"100vh", display:"flex", overflow:"hidden" }}>
//       <style>{css}</style>

//       {/* Ambient glow */}
//       <div aria-hidden="true" style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
//         <div style={{ position:"absolute", top:"-15%", right:"-8%", width:"52vw", height:"52vw", borderRadius:"50%",
//           background:`radial-gradient(circle, rgba(232,127,36,0.14) 0%, rgba(232,127,36,0.04) 45%, transparent 70%)` }} />
//         <div style={{ position:"absolute", bottom:"-20%", left:"-12%", width:"48vw", height:"48vw", borderRadius:"50%",
//           background:`radial-gradient(circle, rgba(115,165,202,0.12) 0%, rgba(115,165,202,0.03) 45%, transparent 70%)` }} />
//       </div>

//       {/* ── LEFT: Camera (75%) ── */}
//       <div style={{ position:"relative", zIndex:1, flex:"0 0 75%", maxWidth:"75%", padding:20, display:"flex", flexDirection:"column" }}>
//         <div style={{
//           flex:1, position:"relative", borderRadius:22, overflow:"hidden",
//           border:`1px solid ${C.glassBorder}`, background:"#000",
//           boxShadow:`inset 0 0 60px rgba(0,0,0,0.40), 0 0 0 1px rgba(232,127,36,0.08), 0 8px 40px rgba(30,41,59,0.12)`,
//         }}>
//           {cameraReady && (
//             <div role="status" aria-live="polite" style={{
//               position:"absolute", top:16, right:16, zIndex:5,
//               display:"flex", alignItems:"center",
//               background:"rgba(0,0,0,0.42)", ...glassPill,
//               border:`1px solid rgba(115,165,202,0.28)`,
//               padding:"5px 14px", animation:"fadeIn 0.3s ease",
//             }}>
//               <span className="ar-dot" aria-hidden="true" />
//               <span style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,0.80)", letterSpacing:"0.5px" }}>Face Tracking Active</span>
//             </div>
//           )}

//           {/* Selected frame badge */}
//           <div style={{ position:"absolute", bottom:16, left:16, zIndex:5 }}>
//             <div aria-live="polite" style={{
//               background:"rgba(0,0,0,0.52)", ...glassPill,
//               border:`0.5px solid ${C.primary25}`, padding:"8px 20px",
//               boxShadow:`0 4px 20px rgba(0,0,0,0.25), 0 0 16px ${C.primary12}`,
//               display:"flex", alignItems:"center", gap:12,
//             }}>
//               <span style={{ fontSize:9, fontWeight:700, color:"rgba(254,253,223,0.50)", letterSpacing:"1.5px" }}>SELECTED</span>
//               <span aria-hidden="true" style={{ width:1, height:11, background:C.primary30, display:"inline-block" }} />
//               <span style={{ fontSize:13, fontWeight:700, color:"rgba(254,253,223,0.95)" }}>{currentGlass?.name}</span>
//               <span style={{ fontSize:13, fontWeight:700, background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//                 {currentGlass?.price}
//               </span>
//             </div>
//           </div>

//           <video ref={videoRef} style={{ position:"absolute", left:"-100%", top:"-100%", width:"1px", height:"1px", opacity:0, pointerEvents:"none" }} autoPlay playsInline muted />
//           <canvas
//             ref={canvasRef}
//             width={DESKTOP_CANVAS_W}
//             height={DESKTOP_CANVAS_H}
//             aria-label="AR glasses try-on camera view"
//             style={{ display:"block", width:"100%", height:"100%", objectFit:"cover" }}
//           />

//           {!cameraReady && (
//             <div role="status" aria-label="Initializing camera" style={{
//               position:"absolute", inset:0, borderRadius:22, zIndex:30,
//               background:`radial-gradient(ellipse 100% 60% at 55% 30%, rgba(232,127,36,0.08) 0%, rgba(254,253,223,0.97) 55%)`,
//               display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:28,
//             }}>
//               <div style={{ position:"relative", width:50, height:50 }}>
//                 <div className="spinner" />
//                 <div className="spinner-inner" />
//               </div>
//               <div style={{ textAlign:"center" }}>
//                 <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, fontWeight:700, letterSpacing:"3px",
//                   background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:8 }}>
//                   INITIALIZING CAMERA
//                 </div>
//                 <div style={{ fontSize:12, color:C.text55 }}>Please allow camera access to continue</div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ── RIGHT: Controls panel (25%) ── */}
//       <div
//         className="right-panel"
//         role="complementary"
//         aria-label="Frame selection and controls"
//         style={{
//           position:"relative", zIndex:1,
//           flex:"0 0 25%", maxWidth:"25%",
//           overflowY:"auto",
//           padding:"20px 16px 20px 4px",
//           display:"flex", flexDirection:"column", gap:12,
//           borderLeft:`1px solid ${C.glassBorder}`,
//           background:`linear-gradient(180deg, rgba(245,243,199,0.60) 0%, rgba(254,253,223,0.80) 100%)`,
//           backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
//         }}
//       >
//         <div style={{ padding:"4px 4px 2px" }}>
//           <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:18, fontWeight:700, color:C.text, marginBottom:3 }}>
//             Choose Frame
//           </div>
//           <div style={{ fontSize:10, letterSpacing:"1.5px", color:C.text30, fontWeight:600, textTransform:"uppercase" }}>
//             {GLASS_OPTIONS.length} styles available
//           </div>
//         </div>

//         <div role="listbox" aria-label="Select glasses frame" style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:8 }}>
//           {GLASS_OPTIONS.map(g => {
//             const isA = glasses === g.id;
//             return (
//               <div
//                 key={g.id}
//                 className="frame-card"
//                 role="option"
//                 aria-selected={isA}
//                 tabIndex={0}
//                 onClick={() => setGlasses(g.id)}
//                 onKeyDown={e => (e.key === "Enter" || e.key === " ") && setGlasses(g.id)}
//                 style={{
//                   borderRadius:14,
//                   background: isA ? C.primary12 : "rgba(254,253,223,0.55)",
//                   border:`1px solid ${isA ? C.primary : C.surfaceBorder}`,
//                   padding:"10px 6px",
//                   display:"flex", flexDirection:"column", alignItems:"center", gap:5,
//                   cursor:"pointer",
//                   boxShadow: isA ? `0 0 20px rgba(232,127,36,0.20), 0 4px 12px rgba(30,41,59,0.08)` : `0 1px 4px ${C.text06}`,
//                   transition:"all 0.22s cubic-bezier(0.22,1,0.36,1)",
//                   backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)",
//                 }}
//               >
//                 <div style={{
//                   width:"100%", height:48,
//                   display:"flex", alignItems:"center", justifyContent:"center",
//                   borderRadius:10, overflow:"hidden",
//                   background: isA ? C.primary12 : C.text06,
//                 }}>
//                   <img
//                     src={g.id}
//                     alt={g.name}
//                     loading="lazy"
//                     crossOrigin="anonymous"
//                     style={{
//                       width:"90%", height:"90%", objectFit:"contain",
//                       filter: isA ? `drop-shadow(0 0 5px rgba(232,127,36,0.55))` : "brightness(0.80) saturate(0.75)",
//                       transition:"filter 0.2s ease",
//                     }}
//                   />
//                 </div>
//                 <div style={{ fontSize:9, fontWeight:700, textAlign:"center", lineHeight:1.2, color: isA ? C.text : C.text55 }}>
//                   {g.name}
//                 </div>
//                 <div style={{
//                   fontSize:8, fontWeight:700,
//                   background: isA ? C.gradPrimary : "none",
//                   WebkitBackgroundClip: isA ? "text" : "unset",
//                   WebkitTextFillColor: isA ? "transparent" : C.primary,
//                   color: isA ? "transparent" : C.primary,
//                 }}>
//                   {g.price}
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <Section title="FRAME CALIBRATION" icon="⚙️">
//           <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:14 }}>
//             <button
//               onClick={resetAdj}
//               aria-label="Reset frame calibration to defaults"
//               style={{
//                 fontSize:9, fontWeight:700, color:C.primary,
//                 background:C.primary12, border:`0.5px solid ${C.primary25}`,
//                 padding:"5px 14px", borderRadius:100, cursor:"pointer",
//                 letterSpacing:"0.5px", transition:"background 0.15s",
//               }}
//             >Reset</button>
//           </div>
//           <SliderRow label="WIDTH"    value={curAdj.scaleW}  min={0.3}  max={3}   step={0.05} onChange={v => setAdj("scaleW",  v)} fmt={v => `${v.toFixed(2)}×`} />
//           <SliderRow label="HEIGHT"   value={curAdj.scaleH}  min={0.3}  max={3}   step={0.05} onChange={v => setAdj("scaleH",  v)} fmt={v => `${v.toFixed(2)}×`} />
//           <SliderRow label="MOVE L/R" value={curAdj.offsetX} min={-150} max={150} step={1}    onChange={v => setAdj("offsetX", v)} fmt={v => `${v > 0 ? "+" : ""}${v}px`} />
//           <SliderRow label="MOVE U/D" value={curAdj.offsetY} min={-150} max={150} step={1}    onChange={v => setAdj("offsetY", v)} fmt={v => `${v > 0 ? "+" : ""}${v}px`} />
//           <SliderRow label="ROTATION" value={curAdj.rotate}  min={-30}  max={30}  step={0.5}  onChange={v => setAdj("rotate",  v)} fmt={v => `${v > 0 ? "+" : ""}${v.toFixed(1)}°`} />
//         </Section>

//         <Section title="SCENE FILTERS" icon="🎨">
//           <SliderRow label="BRIGHTNESS" value={brightness} min={50}  max={160} step={1} onChange={setBrightness} fmt={v => `${v}%`} />
//           <SliderRow label="CONTRAST"   value={contrast}   min={60}  max={160} step={1} onChange={setContrast}   fmt={v => `${v}%`} />
//           <SliderRow label="SATURATION" value={saturate}   min={50}  max={160} step={1} onChange={setSaturate}   fmt={v => `${v}%`} />
//         </Section>
//       </div>
//     </div>
//   );
// };

// export default TryOn;







// final product




import React, { useRef, useEffect, useState, useCallback } from "react";

// ─── Per-frame defaults ────────────────────────────────────────────────────────
const DEFAULT_ADJ = { scaleW: 1,   scaleH: 1,    offsetX: 0, offsetY: 0,  rotate: 0 };
const AVIATOR_ADJ = { scaleW: 1,   scaleH: 1.18, offsetX: 0, offsetY: 10, rotate: 0 };
const ROUND_ADJ   = { scaleW: 1,   scaleH: 0.85, offsetX: 0, offsetY: 4,  rotate: 0 };

const GLASS_OPTIONS = [
  { id: "/glass1.png",  name: "Classic",      price: "PKR 4,500", emoji: "👓", sizes: [{ label:"XL", scale:1.10, mobileScale:0.65 }] },
  { id: "/glass2.png",  name: "Aviator",      price: "PKR 5,200", emoji: "🕶️", sizes: [{ label:"L",  scale:1.15, mobileScale:1.00 }] },
  { id: "/glass3.png",  name: "Sport",        price: "PKR 3,800", emoji: "🥽", sizes: [{ label:"L",  scale:1.15, mobileScale:1.00 }] },
  { id: "/glass4.png",  name: "Round",        price: "PKR 4,900", emoji: "⭕", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
  { id: "/glass5.png",  name: "Wayfarer",     price: "PKR 4,900", emoji: "🕶️", sizes: [{ label:"L",  scale:1.25, mobileScale:0.98 }] },
  { id: "/glass6.png",  name: "Vintage",      price: "PKR 4,900", emoji: "🪩", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
  { id: "/glass7.png",  name: "Clubmaster",   price: "PKR 4,900", emoji: "🔲", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
  { id: "/glass8.png",  name: "Cat Eye",      price: "PKR 4,900", emoji: "😼", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
  { id: "/glass9.png",  name: "Shield",       price: "PKR 4,900", emoji: "🛡️", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
  { id: "/glass10.png", name: "Oval",         price: "PKR 4,900", emoji: "🥚", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
  { id: "/glass11.png", name: "Square",       price: "PKR 4,900", emoji: "⬛", sizes: [{ label:"S",  scale:0.75, mobileScale:0.50 }] },
  { id: "/glass12.png", name: "Hexagonal",    price: "PKR 4,900", emoji: "⬡", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
  { id: "/glass13.png", name: "Geometric",    price: "PKR 4,900", emoji: "🔷", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
  { id: "/glass14.png", name: "Steampunk",    price: "PKR 4,900", emoji: "⚙️", sizes: [{ label:"S",  scale:0.95, mobileScale:0.50 }] },
  { id: "/glass15.png", name: "Sports Pro",   price: "PKR 4,900", emoji: "🏃", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
  { id: "/glass16.png", name: "Retro",        price: "PKR 4,900", emoji: "🎞️", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
  { id: "/glass17.png", name: "Modern",       price: "PKR 4,900", emoji: "✨", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
  { id: "/glass18.png", name: "Luxury",       price: "PKR 4,900", emoji: "💎", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
  { id: "/glass19.png", name: "Designer",     price: "PKR 4,900", emoji: "🎨", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
  { id: "/glass20.png", name: "Classic II",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
  { id: "/glass21.png", name: "Classic III",  price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
  { id: "/glass22.png", name: "Classic IV",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.05, mobileScale:0.95 }] },
  { id: "/glass23.png", name: "Classic V",    price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
  { id: "/glass24.png", name: "Classic VI",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"S",  scale:0.85, mobileScale:0.50 }] },
  { id: "/glass25.png", name: "Classic VII",  price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
  { id: "/glass26.png", name: "Classic VIII", price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
  { id: "/glass27.png", name: "Classic IX",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
  { id: "/glass28.png", name: "Classic X",    price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
  { id: "/glass29.png", name: "Classic XI",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.25, mobileScale:0.95 }] },
  { id: "/glass30.png", name: "Classic XII",  price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
  { id: "/glass31.png", name: "Classic 31",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
  { id: "/glass32.png", name: "Classic 32",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
  { id: "/glass33.png", name: "Classic 33",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
  { id: "/glass34.png", name: "Classic 34",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
  { id: "/glass35.png", name: "Classic 35",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.10, mobileScale:0.75 }] },
  { id: "/glass36.png", name: "Classic 36",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
  { id: "/glass37.png", name: "Classic 37",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
  { id: "/glass38.png", name: "Classic 38",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
  { id: "/glass39.png", name: "Classic 39",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
  { id: "/glass40.png", name: "Classic 40",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
  { id: "/glass41.png", name: "Classic 41",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
  { id: "/glass42.png", name: "Classic 42",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"S",  scale:0.95, mobileScale:0.50 }] },
  { id: "/glass43.png", name: "Classic 43",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
  { id: "/glass44.png", name: "Classic 44",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
  { id: "/glass45.png", name: "Classic 45",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.30, mobileScale:1.10 }] },
  { id: "/glass46.png", name: "Classic 46",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.40, mobileScale:1.10 }] },
  { id: "/glass47.png", name: "Classic 47",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"XL", scale:1.20, mobileScale:1.10 }] },
  { id: "/glass48.png", name: "Classic 48",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"M",  scale:1.00, mobileScale:0.75 }] },
  { id: "/glass49.png", name: "Classic 49",   price: "PKR 4,900", emoji: "👓", sizes: [{ label:"L",  scale:1.15, mobileScale:0.95 }] },
];

// ─── Device helpers ────────────────────────────────────────────────────────────
const getIsMobile = () =>
  typeof window !== "undefined" &&
  (window.innerWidth < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

const getMobileSizes = () => {
  const landscape = typeof window !== "undefined" && window.innerWidth > window.innerHeight;
  const isLowEnd  = typeof window !== "undefined" &&
    (window.innerWidth <= 360 || (navigator.deviceMemory ?? 8) <= 2);
  if (isLowEnd) {
    return landscape
      ? { camW: 480, camH: 360, canvasW: 480, canvasH: 360 }
      : { camW: 360, camH: 480, canvasW: 360, canvasH: 480 };
  }
  return landscape
    ? { camW: 640, camH: 480, canvasW: 640, canvasH: 480 }
    : { camW: 480, camH: 640, canvasW: 480, canvasH: 640 };
};

const getSizeScale = (sizeObj, mobile) =>
  sizeObj ? (mobile ? (sizeObj.mobileScale ?? sizeObj.scale) : sizeObj.scale) : 1;

// ─── Timing constants ──────────────────────────────────────────────────────────
const MOBILE_FPS      = 30;
const MOBILE_FRAME_INT = 1000 / MOBILE_FPS;

const DESKTOP_CAM_W   = 1280;
const DESKTOP_CAM_H   = 720;
const DESKTOP_CANVAS_W = 1280;
const DESKTOP_CANVAS_H = 720;

// ─── Beauty passthrough (neutral) ─────────────────────────────────────────────
const BEAUTY_B = 100, BEAUTY_C = 100, BEAUTY_S = 100;

// ─── Landmark indices ─────────────────────────────────────────────────────────
const LANDMARKS = {
  LEFT_IRIS_CENTER:    468,
  RIGHT_IRIS_CENTER:   473,
  LEFT_EYE_OUTER:       33,
  RIGHT_EYE_OUTER:     263,
  LEFT_EYE_INNER:      133,
  RIGHT_EYE_INNER:     362,
  LEFT_EYE_TOP:        [159, 160, 161],
  RIGHT_EYE_TOP:       [386, 387, 388],
  LEFT_EYEBROW_LOWER:  [70, 63, 105, 66, 107],
  RIGHT_EYEBROW_LOWER: [300, 293, 334, 296, 336],
  NOSE_BRIDGE_TOP:     6,
  LEFT_FACE_EDGE:      234,
  RIGHT_FACE_EDGE:     454,
};

class FaceGeoSmoother {
  constructor({ posAlpha, scaleAlpha, rotAlpha, maxPosDelta = 60, maxScaleDelta = 0.15 }) {
    this.posAlpha     = posAlpha;
    this.scaleAlpha   = scaleAlpha;
    this.rotAlpha     = rotAlpha;
    this.maxPosDelta  = maxPosDelta;
    this.maxScaleDelta = maxScaleDelta;
    this.prev         = null;
  }

  _step(prev, cur, alpha, maxDelta, deadzone = 0) {
    const raw = cur - prev;
    if (deadzone > 0 && Math.abs(raw) < deadzone) return prev;
    const delta = Math.max(-maxDelta, Math.min(maxDelta, raw));
    return prev + alpha * delta;
  }

  smooth(cur, deadzone = 0) {
    if (!this.prev) { this.prev = { ...cur }; return { ...cur }; }
    const p = this.prev;
    const r = {
      cx:    this._step(p.cx,    cur.cx,    this.posAlpha,   this.maxPosDelta,   deadzone),
      cy:    this._step(p.cy,    cur.cy,    this.posAlpha,   this.maxPosDelta,   deadzone),
      gw:    this._step(p.gw,    cur.gw,    this.scaleAlpha, this.maxPosDelta,   0),
      gh:    this._step(p.gh,    cur.gh,    this.scaleAlpha, this.maxPosDelta,   0),
      angle: this._step(p.angle, cur.angle, this.rotAlpha,   0.18,               0),
      ds:    this._step(p.ds,    cur.ds,    this.scaleAlpha, this.maxScaleDelta, 0),
    };
    this.prev = { ...r };
    return r;
  }

  reset() { this.prev = null; }
}

function extractFaceGeometry(lm, W, H, useIris = true) {
  const px = (idx) => ({ x: lm[idx].x * W, y: lm[idx].y * H, z: lm[idx].z ?? 0 });
  const avgPx = (indices) => {
    const pts = indices.map(i => px(i));
    return {
      x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
      y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
    };
  };
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

  const leftEyeOut  = px(LANDMARKS.LEFT_EYE_OUTER);
  const rightEyeOut = px(LANDMARKS.RIGHT_EYE_OUTER);
  const leftEyeIn   = px(LANDMARKS.LEFT_EYE_INNER);
  const rightEyeIn  = px(LANDMARKS.RIGHT_EYE_INNER);
  const noseBridgeTop = px(LANDMARKS.NOSE_BRIDGE_TOP);
  const leftBrowLower  = avgPx(LANDMARKS.LEFT_EYEBROW_LOWER);
  const rightBrowLower = avgPx(LANDMARKS.RIGHT_EYEBROW_LOWER);

  let leftIris, rightIris;
  if (useIris && lm.length > 473) {
    leftIris  = px(LANDMARKS.LEFT_IRIS_CENTER);
    rightIris = px(LANDMARKS.RIGHT_IRIS_CENTER);
  } else {
    leftIris  = {
      x: leftEyeOut.x * 0.5 + leftEyeIn.x * 0.5,
      y: leftEyeOut.y * 0.5 + leftEyeIn.y * 0.5,
      z: 0,
    };
    rightIris = {
      x: rightEyeOut.x * 0.5 + rightEyeIn.x * 0.5,
      y: rightEyeOut.y * 0.5 + rightEyeIn.y * 0.5,
      z: 0,
    };
  }

  const irisY   = (leftIris.y  + rightIris.y)  / 2;
  const centerX = (leftIris.x  + rightIris.x)  / 2;
  const browMidY = (leftBrowLower.y + rightBrowLower.y) / 2;

  const centerY = irisY * 0.65 + noseBridgeTop.y * 0.30 + browMidY * 0.05;

  const angleEyeCorners = Math.atan2(
    rightEyeOut.y - leftEyeOut.y,
    rightEyeOut.x - leftEyeOut.x,
  );
  const angleBrow = Math.atan2(
    rightBrowLower.y - leftBrowLower.y,
    rightBrowLower.x - leftBrowLower.x,
  );
  const angleIris = useIris
    ? Math.atan2(rightIris.y - leftIris.y, rightIris.x - leftIris.x)
    : angleEyeCorners;
  const angle = angleEyeCorners * 0.65 + angleBrow * 0.25 + angleIris * 0.10;

  const eyeSpan = dist(leftEyeOut, rightEyeOut);
  const spanMult = useIris ? 1.0 : 1.20;
  const glassesWidth  = eyeSpan * 2.0 * spanMult;
  const glassesHeight = eyeSpan * 0.75 * spanMult;

  const avgZ = (leftIris.z + rightIris.z + (noseBridgeTop.z ?? 0)) / 3;
  const depthScale = Math.max(0.93, Math.min(1.07, 1 + (-avgZ * 0.5)));

  return { centerX, centerY, angle, glassesWidth, glassesHeight, depthScale };
}

// ─── Theme ────────────────────────────────────────────────────────────────────
const C = {
  primary:       "#E87F24",
  accent:        "#73A5CA",
  bg:            "#FEFDDF",
  surface:       "#F5F3C7",
  text:          "#1E293B",
  primary12:     "rgba(232,127,36,0.12)",
  primary20:     "rgba(232,127,36,0.20)",
  primary25:     "rgba(232,127,36,0.25)",
  primary30:     "rgba(232,127,36,0.30)",
  primary40:     "rgba(232,127,36,0.40)",
  accent12:      "rgba(115,165,202,0.12)",
  accent20:      "rgba(115,165,202,0.20)",
  accent28:      "rgba(115,165,202,0.28)",
  text55:        "rgba(30,41,59,0.55)",
  text30:        "rgba(30,41,59,0.30)",
  text12:        "rgba(30,41,59,0.12)",
  text06:        "rgba(30,41,59,0.06)",
  glassBg:       "rgba(254,253,223,0.65)",
  glassBorder:   "rgba(255,255,255,0.70)",
  surfaceBorder: "rgba(255,255,255,0.85)",
  white15:       "rgba(255,255,255,0.15)",
  white08:       "rgba(255,255,255,0.08)",
  gradPrimary:   "linear-gradient(135deg, #E87F24, #F5A623)",
  gradPrimaryTx: "linear-gradient(135deg, #F5A623, #E87F24)",
  gradBg: `
    radial-gradient(ellipse 60% 50% at 80% 10%, rgba(232,127,36,0.13) 0%, transparent 60%),
    radial-gradient(ellipse 50% 40% at 10% 80%, rgba(115,165,202,0.12) 0%, transparent 55%),
    #FEFDDF
  `,
};

const glassPill = {
  borderRadius:          100,
  backdropFilter:        "blur(14px)",
  WebkitBackdropFilter:  "blur(14px)",
};

// ─── UI sub-components ────────────────────────────────────────────────────────
const Section = ({ title, icon, defaultOpen = false, children }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{
      borderRadius: 16, border: `1px solid ${C.glassBorder}`, overflow: "hidden",
      background: C.glassBg, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      boxShadow: `0 2px 8px ${C.text06}`,
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label={`${open ? "Collapse" : "Expand"} ${title}`}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "13px 16px", background: "rgba(254,253,223,0.50)", border: "none", cursor: "pointer",
          borderBottom: open ? `1px solid ${C.glassBorder}` : "none",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: C.primary }}>
          <span style={{ fontSize: 13 }} aria-hidden="true">{icon}</span>{title}
        </span>
        <span aria-hidden="true" style={{
          fontSize: 9, color: C.text55,
          transform: open ? "rotate(180deg)" : "rotate(0)",
          transition: "transform 0.22s ease", display: "inline-block",
        }}>▼</span>
      </button>
      {open && <div style={{ padding: "16px", background: "rgba(245,243,199,0.40)" }}>{children}</div>}
    </div>
  );
};

const SliderRow = ({ label, value, min, max, step, onChange, fmt }) => (
  <div style={{ marginBottom: 18 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
      <label style={{ fontSize: 10, color: C.text55, fontWeight: 600, letterSpacing: "1px" }}>{label}</label>
      <span style={{ fontSize: 11, fontWeight: 700, background: C.gradPrimaryTx, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        {fmt(value)}
      </span>
    </div>
    <input
      type="range" min={min} max={max} step={step} value={value}
      aria-label={label}
      onChange={e => onChange(Number(e.target.value))}
      style={{ width: "100%", height: 3, background: C.primary20, borderRadius: 4, appearance: "none", WebkitAppearance: "none", cursor: "pointer" }}
    />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
const TryOn = () => {
  const videoRef         = useRef(null);
  const canvasRef        = useRef(null);
  const imgRef           = useRef(new Image());
  const rafIdRef         = useRef(null);
  const lastFrameRef     = useRef(0);
  const touchStartX      = useRef(null);
  const touchStartY      = useRef(null);
  const cameraRdyRef     = useRef(false);
  const glassesRef       = useRef("/glass1.png");
  const adjRef           = useRef({});
  const pendingResultRef = useRef(null);
  const camStreamRef     = useRef(null);
  const camInstanceRef   = useRef(null);
  const cachedGlassRef   = useRef(null);
  const ctxRef           = useRef(null);
  const resultVersionRef     = useRef(0);
  const lastDrawnVersionRef  = useRef(-1);

  const [isMobile, setIsMobile] = useState(() => getIsMobile());
  const isMobileRef = useRef(isMobile);
  const [mobileSizes, setMobileSizes] = useState(() => getMobileSizes());

  useEffect(() => {
    const onResize = () => {
      const m = getIsMobile();
      isMobileRef.current = m;
      setIsMobile(m);
      ctxRef.current = null;
      if (m) setMobileSizes(getMobileSizes());
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const smootherRef = useRef(null);
  if (!smootherRef.current) {
    smootherRef.current = isMobile
      ? new FaceGeoSmoother({
          posAlpha:      0.38,
          scaleAlpha:    0.25,
          rotAlpha:      0.22,
          maxPosDelta:   48,
          maxScaleDelta: 0.12,
        })
      : new FaceGeoSmoother({
          posAlpha:      0.45,
          scaleAlpha:    0.32,
          rotAlpha:      0.30,
          maxPosDelta:   60,
          maxScaleDelta: 0.15,
        });
  }

  const [glasses, setGlasses]         = useState("/glass1.png");
  const [cameraReady, setCameraReady] = useState(false);
  const [brightness, setBrightness]   = useState(100);
  const [contrast,   setContrast]     = useState(100);
  const [saturate,   setSaturate]     = useState(100);
  const [mpError,    setMpError]      = useState(null);

  const brightnessRef = useRef(100);
  const contrastRef   = useRef(100);
  const saturateRef   = useRef(100);
  useEffect(() => { brightnessRef.current = brightness; }, [brightness]);
  useEffect(() => { contrastRef.current   = contrast;   }, [contrast]);
  useEffect(() => { saturateRef.current   = saturate;   }, [saturate]);

  const adjustmentsRef = useRef(
    Object.fromEntries(GLASS_OPTIONS.map(g => {
      if (g.id === "/glass2.png") return [g.id, { ...AVIATOR_ADJ }];
      if (g.id === "/glass4.png") return [g.id, { ...ROUND_ADJ }];
      return [g.id, { ...DEFAULT_ADJ }];
    }))
  );
  const [adjUIState, setAdjUIState] = useState(() => adjustmentsRef.current["/glass1.png"]);

  useEffect(() => {
    glassesRef.current   = glasses;
    adjRef.current       = adjustmentsRef.current;
    cachedGlassRef.current = GLASS_OPTIONS.find(g => g.id === glasses) || null;
    setAdjUIState({ ...(adjustmentsRef.current[glasses] || DEFAULT_ADJ) });
  }, [glasses]);

  const setAdj = useCallback((key, val) => {
    const id = glassesRef.current;
    adjustmentsRef.current = {
      ...adjustmentsRef.current,
      [id]: { ...(adjustmentsRef.current[id] || DEFAULT_ADJ), [key]: val },
    };
    adjRef.current = adjustmentsRef.current;
    setAdjUIState(prev => ({ ...prev, [key]: val }));
  }, []);

  const resetAdj = useCallback(() => {
    const id = glassesRef.current;
    const defaults =
      id === "/glass2.png" ? { ...AVIATOR_ADJ } :
      id === "/glass4.png" ? { ...ROUND_ADJ }   : { ...DEFAULT_ADJ };
    adjustmentsRef.current = { ...adjustmentsRef.current, [id]: defaults };
    adjRef.current = adjustmentsRef.current;
    setAdjUIState({ ...defaults });
  }, []);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = glasses;
    imgRef.current = img;
  }, [glasses]);

  // ── Draw loop ─────────────────────────────────────────────────────────────
  const drawLoop = useCallback(() => {
    rafIdRef.current = requestAnimationFrame(drawLoop);

    const mobile = isMobileRef.current;
    const now    = performance.now();
    if (mobile && now - lastFrameRef.current < MOBILE_FRAME_INT) return;
    lastFrameRef.current = now;

    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!ctxRef.current) {
      ctxRef.current = canvas.getContext("2d", { alpha: false, willReadFrequently: false });
    }
    const ctx = ctxRef.current;
    if (!ctx) return;

    const result = pendingResultRef.current;
    if (!result?.image || resultVersionRef.current === lastDrawnVersionRef.current) return;

    const W = canvas.width, H = canvas.height;

    const userB = brightnessRef.current;
    const userC = contrastRef.current;
    const userS = saturateRef.current;
    const needsFilter = !mobile && (
      userB !== 100 || userC !== 100 || userS !== 100 ||
      BEAUTY_B !== 100 || BEAUTY_C !== 100 || BEAUTY_S !== 100
    );
    ctx.filter = needsFilter
      ? `brightness(${BEAUTY_B}%) contrast(${BEAUTY_C}%) saturate(${BEAUTY_S}%) brightness(${userB}%) contrast(${userC}%) saturate(${userS}%)`
      : "none";

    ctx.save();
    ctx.translate(W, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(result.image, 0, 0, W, H);
    ctx.restore();
    ctx.filter = "none";

    if (!result.multiFaceLandmarks?.length) {
      smootherRef.current.reset();
      lastDrawnVersionRef.current = resultVersionRef.current;
      return;
    }

    const lm  = result.multiFaceLandmarks[0];
    const geo = extractFaceGeometry(lm, W, H, !mobile);

    const mirroredCx = W - geo.centerX;

    const sm = smootherRef.current.smooth(
      { cx: mirroredCx, cy: geo.centerY, gw: geo.glassesWidth, gh: geo.glassesHeight, angle: geo.angle, ds: geo.depthScale },
      mobile ? 1.0 : 0,
    );

    const img = imgRef.current;
    if (!img.complete || !img.naturalWidth) {
      lastDrawnVersionRef.current = resultVersionRef.current;
      return;
    }

    const glassObj = cachedGlassRef.current;
    const sSc      = glassObj?.sizes?.[0] ? getSizeScale(glassObj.sizes[0], mobile) : 1.0;
    const adj      = adjRef.current[glassesRef.current] || DEFAULT_ADJ;

    let w = sm.gw * adj.scaleW;
    let h = sm.gh * adj.scaleH;
    if (!mobile) {
      const ds = Math.max(0.95, Math.min(1.05, sm.ds));
      w *= ds; h *= ds;
    }
    w *= sSc; h *= sSc;

    w = Math.max(20, Math.min(W * 0.95, w));
    h = Math.max(8,  Math.min(H * 0.60, h));

    const mirroredAngle = -sm.angle;

    const halfW    = w * 0.5;
    const halfH    = h * 0.5;
    const clampedX = Math.max(halfW, Math.min(W - halfW, sm.cx + adj.offsetX));
    const clampedY = Math.max(halfH, Math.min(H - halfH, sm.cy + adj.offsetY));

    ctx.save();
    ctx.translate(clampedX, clampedY);
    ctx.rotate(mirroredAngle + adj.rotate * Math.PI / 180);
    ctx.drawImage(img, -w / 2, -h / 2, w, h);
    ctx.restore();

    lastDrawnVersionRef.current = resultVersionRef.current;
  }, []);

  const onResults = useCallback((results) => {
    pendingResultRef.current = results;
    resultVersionRef.current++;
  }, []);

  // ── Camera + FaceMesh init ───────────────────────────────────────────────
  useEffect(() => {
    if (!window.FaceMesh) {
      setMpError("MediaPipe FaceMesh not found. Add the MediaPipe <script> tag to index.html.");
      return;
    }

    const mobile = isMobileRef.current;
    let camW, camH, canvasW, canvasH;
    if (mobile) {
      ({ camW, camH, canvasW, canvasH } = mobileSizes);
    } else {
      camW = DESKTOP_CAM_W; camH = DESKTOP_CAM_H;
      canvasW = DESKTOP_CANVAS_W; canvasH = DESKTOP_CANVAS_H;
    }

    if (canvasRef.current) {
      canvasRef.current.width  = canvasW;
      canvasRef.current.height = canvasH;
      ctxRef.current = null;
    }

    const faceMesh = new window.FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/${file}`,
    });
    faceMesh.setOptions({
      maxNumFaces:            1,
      refineLandmarks:        !mobile,
      minDetectionConfidence: mobile ? 0.40 : 0.50,
      minTrackingConfidence:  mobile ? 0.35 : 0.50,
    });
    faceMesh.onResults(onResults);

    rafIdRef.current = requestAnimationFrame(drawLoop);

    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width:      { ideal: camW },
        height:     { ideal: camH },
        frameRate:  { ideal: mobile ? 30 : 60 },
      },
      audio: false,
    })
    .then(stream => {
      camStreamRef.current = stream;
      const video = videoRef.current;
      if (!video) return;
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play().then(() => {
          cameraRdyRef.current = true;
          setCameraReady(true);

          const sendFrame = async () => {
            if (!cameraRdyRef.current) return;
            try {
              if (video.readyState >= 2) await faceMesh.send({ image: video });
            } catch (_) { /* ignore send errors on cleanup */ }
            if (cameraRdyRef.current) {
              camInstanceRef.current = requestAnimationFrame(sendFrame);
            }
          };
          camInstanceRef.current = requestAnimationFrame(sendFrame);
        }).catch(err => {
          console.error("Video play failed:", err);
          setMpError("Could not start video playback. Please reload and allow camera access.");
        });
      };
    })
    .catch(err => {
      console.error("Camera failed:", err);
      setMpError("Camera access denied or not available. Please allow camera permissions and reload.");
    });

    return () => {
      cameraRdyRef.current = false;
      if (rafIdRef.current)       cancelAnimationFrame(rafIdRef.current);
      if (camInstanceRef.current) cancelAnimationFrame(camInstanceRef.current);
      if (camStreamRef.current) {
        camStreamRef.current.getTracks().forEach(t => t.stop());
        camStreamRef.current = null;
      }
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop());
        videoRef.current.srcObject = null;
      }
      faceMesh.close();
    };
  }, [drawLoop, onResults, mobileSizes]);

  // ── CSS ──────────────────────────────────────────────────────────────────
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    input[type="range"] { -webkit-appearance: none; appearance: none; background: transparent; }
    input[type="range"]::-webkit-slider-runnable-track {
      background: linear-gradient(90deg, rgba(232,127,36,0.30), rgba(232,127,36,0.10));
      height: 3px; border-radius: 3px;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%;
      background: radial-gradient(circle at 38% 35%, #F5A623, #E87F24);
      cursor: pointer; margin-top: -6.5px;
      border: 2px solid rgba(254,253,223,0.90);
      box-shadow: 0 2px 8px rgba(232,127,36,0.40);
    }
    input[type="range"]::-moz-range-thumb {
      width: 16px; height: 16px; border-radius: 50%;
      background: radial-gradient(circle at 38% 35%, #F5A623, #E87F24);
      cursor: pointer; border: 2px solid rgba(254,253,223,0.90);
      box-shadow: 0 2px 8px rgba(232,127,36,0.40);
    }
    .right-panel { scrollbar-width: thin; scrollbar-color: rgba(232,127,36,0.40) rgba(232,127,36,0.08); }
    ::-webkit-scrollbar { width: 3px; height: 3px; }
    ::-webkit-scrollbar-track { background: rgba(232,127,36,0.06); border-radius: 4px; }
    ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #E87F24, #F5A623); border-radius: 4px; }

    /* ───────────────── SNAPCHAT STYLE LENS UI ───────────────── */

    .lens-carousel {
      display: flex;
      gap: 14px;
      padding: 6px 20px 14px;
      overflow-x: auto;
      overflow-y: visible;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      -ms-overflow-style: none;
      scroll-behavior: smooth;
      will-change: scroll-position;
    }
    .lens-carousel::-webkit-scrollbar { display: none; }

    .lens-ring {
      flex-shrink: 0;
      scroll-snap-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      transition: transform 0.25s ease;
    }

    .lens-ring__circle {
      width: 58px;
      height: 58px;
      border-radius: 50%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(
        circle at 35% 35%,
        rgba(255,255,255,0.08),
        rgba(10,5,2,0.88)
      );
      transition:
        transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1),
        opacity 0.25s ease,
        box-shadow 0.28s ease;
      will-change: transform, opacity, box-shadow;
    }

    .lens-ring__img {
      width: 68%;
      height: 68%;
      object-fit: contain;
      pointer-events: none;
      transition: filter 0.25s ease;
    }

    /* ── ACTIVE state ── */
    .lens-ring--active .lens-ring__circle {
      transform: scale(1.15);
      box-shadow:
        0 0 0 2.5px #E87F24,
        0 0 0 5px rgba(232,127,36,0.20),
        0 0 24px rgba(232,127,36,0.55),
        0 0 44px rgba(245,166,35,0.18);
    }
    .lens-ring--active .lens-ring__img {
      filter:
        drop-shadow(0 0 8px rgba(232,127,36,0.80))
        brightness(1.05);
    }

    /* ── INACTIVE state ── */
    .lens-ring--inactive .lens-ring__circle {
      transform: scale(0.88);
      opacity: 0.55;
      box-shadow:
        0 0 0 1px rgba(255,255,255,0.12),
        0 2px 8px rgba(0,0,0,0.35);
    }
    .lens-ring--inactive .lens-ring__img {
      filter: brightness(0.55) saturate(0.55);
    }

    /* ── Click feedback ── */
    .lens-ring__circle:active {
      transform: scale(0.82) !important;
      transition: transform 0.10s ease !important;
    }

    /* ── GLOW RING (spinning conic border) ── */
    .lens-ring__glow-ring {
      position: absolute;
      inset: -3px;
      border-radius: 50%;
      padding: 2px;
      pointer-events: none;
      background: conic-gradient(
        from 0deg,
        #F5A623,
        #E87F24,
        #FF6B35,
        #F5A623
      );
      opacity: 0;
      transition: opacity 0.25s ease;
      -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      animation: spinRing 2s linear infinite;
    }
    .lens-ring--active .lens-ring__glow-ring {
      opacity: 1;
    }

    @keyframes spinRing {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }

    /* ── Label ── */
    .lens-ring__label {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.4px;
      text-align: center;
      max-width: 64px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: color 0.25s ease, opacity 0.25s ease;
      pointer-events: none;
    }
    .lens-ring--active .lens-ring__label {
      color: #F5A623;
      opacity: 1;
    }
    .lens-ring--inactive .lens-ring__label {
      color: rgba(255,255,255,0.40);
      opacity: 1;
    }

    /* ── Active dot indicator ── */
    .lens-ring__dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #E87F24;
      transition: opacity 0.25s ease, transform 0.25s ease;
    }
    .lens-ring--active .lens-ring__dot {
      opacity: 1;
      transform: scale(1);
      box-shadow: 0 0 8px #E87F24;
    }
    .lens-ring--inactive .lens-ring__dot {
      opacity: 0;
      transform: scale(0);
    }

    .frame-scroller { scroll-behavior: smooth; -webkit-overflow-scrolling: touch; scrollbar-width: none; -ms-overflow-style: none; }
    .frame-scroller::-webkit-scrollbar { display: none; }
    .frame-card { transition: transform 0.2s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s ease; -webkit-tap-highlight-color: transparent; }
    .frame-card:hover { transform: translateY(-2px) scale(1.03); }
    .frame-card:active { transform: scale(0.96); }
    .frame-card:focus-visible { outline: 2px solid #E87F24; outline-offset: 2px; }
    @keyframes spin   { to { transform: rotate(360deg); } }
    @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
    @keyframes pulse  { 0%,100%{ opacity:0.55 } 50%{ opacity:1 } }
    .spinner {
      width: 44px; height: 44px; border-radius: 50%;
      border: 2px solid rgba(115,165,202,0.20);
      border-top-color: #E87F24;
      animation: spin 0.85s linear infinite;
    }
    .spinner-inner {
      width: 30px; height: 30px; border-radius: 50%;
      border: 1.5px solid rgba(232,127,36,0.15);
      border-bottom-color: #F5A623;
      animation: spin 1.2s linear infinite reverse;
      position: absolute; top: 7px; left: 7px;
    }
    .ar-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: #73A5CA;
      box-shadow: 0 0 8px rgba(115,165,202,0.70);
      animation: pulse 2s ease infinite;
      display: inline-block; margin-right: 6px; flex-shrink: 0;
    }
  `;

  if (mpError) return (
    <div role="alert" style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      height: "100vh", background: C.bg, color: "#c2410c",
      fontFamily: "monospace", padding: 24, textAlign: "center", fontSize: 13,
    }}>
      ⚠️ {mpError}
    </div>
  );

  const currentGlass = GLASS_OPTIONS.find(g => g.id === glasses);
  const curAdj       = adjUIState;

  // ══════════════════════════════════════════════════════════════
  // MOBILE LAYOUT
  // ══════════════════════════════════════════════════════════════
  if (isMobile) {
    const idx = GLASS_OPTIONS.findIndex(g => g.id === glasses);
    const { canvasW, canvasH } = mobileSizes;

    const CIRCLE_SIZE_ACTIVE   = 58;
    const CIRCLE_SIZE_INACTIVE = 50;

    const onTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e) => {
      if (touchStartX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
      if (Math.abs(dx) > 50 && Math.abs(dx) > dy) {
        const cur = GLASS_OPTIONS.findIndex(g => g.id === glassesRef.current);
        if (dx < 0 && cur < GLASS_OPTIONS.length - 1) setGlasses(GLASS_OPTIONS[cur + 1].id);
        if (dx > 0 && cur > 0)                        setGlasses(GLASS_OPTIONS[cur - 1].id);
      }
      touchStartX.current = null;
      touchStartY.current = null;
    };

    return (
      <div
        style={{ position:"fixed", inset:0, background:"#000", fontFamily:"'Space Grotesk',sans-serif", color:"#fff", overflow:"hidden", touchAction:"pan-y" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <style>{css}</style>
        <video ref={videoRef} style={{ position:"absolute", left:"-100%", top:"-100%", width:"1px", height:"1px", opacity:0, pointerEvents:"none" }} autoPlay playsInline muted />

        <canvas
          ref={canvasRef}
          width={canvasW}
          height={canvasH}
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", display:"block" }}
          aria-label="AR glasses try-on camera view"
        />

        {/* Top vignette */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"22%", background:"linear-gradient(to bottom, rgba(0,0,0,0.50), transparent)", pointerEvents:"none" }} aria-hidden="true" />

        {/* AR tracking indicator */}
        {cameraReady && (
          <div role="status" aria-live="polite" style={{
            position:"absolute", top:18, left:16, zIndex:20,
            display:"flex", alignItems:"center",
            background:"rgba(0,0,0,0.42)", ...glassPill,
            border:`1px solid rgba(115,165,202,0.30)`,
            padding:"5px 12px", animation:"fadeIn 0.35s ease",
          }}>
            <span className="ar-dot" aria-hidden="true" />
            <span style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,0.80)", letterSpacing:"0.5px" }}>Tracking</span>
          </div>
        )}

        {/* Frame name + price */}
        {cameraReady && currentGlass && (
          <div aria-live="polite" style={{
            position:"absolute", bottom:158, left:"50%", transform:"translateX(-50%)",
            zIndex:20, whiteSpace:"nowrap",
            background:"rgba(0,0,0,0.48)", ...glassPill,
            border:`1px solid ${C.primary25}`,
            padding:"7px 20px",
            display:"flex", alignItems:"center", gap:10,
            animation:"fadeIn 0.3s ease",
            boxShadow:`0 4px 20px rgba(0,0,0,0.25), 0 0 20px ${C.primary12}`,
          }}>
            <span style={{ fontSize:13, fontWeight:700, color:"rgba(254,253,223,0.95)" }}>{currentGlass.name}</span>
            <span aria-hidden="true" style={{ width:1, height:11, background:C.primary30, display:"inline-block" }} />
            <span style={{ fontSize:13, fontWeight:700, background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              {currentGlass.price}
            </span>
          </div>
        )}

        {/* Progress dots */}
        {cameraReady && (
          <div aria-hidden="true" style={{ position:"absolute", bottom:140, left:"50%", transform:"translateX(-50%)", display:"flex", gap:4, zIndex:20 }}>
            {GLASS_OPTIONS.map((g, i) => (
              <div key={g.id} style={{
                width: i === idx ? 14 : 4, height:4, borderRadius:3,
                background: i === idx ? C.primary : C.white15,
                transition:"all 0.25s ease",
              }} />
            ))}
          </div>
        )}

        {/* ── Snapchat-style ring carousel ── */}
        <div style={{
          position:"absolute", bottom:0, left:0, right:0, zIndex:20,
          paddingBottom:"env(safe-area-inset-bottom, 10px)",
          background:"linear-gradient(to top, rgba(8,4,1,0.97) 50%, rgba(8,4,1,0.80) 75%, transparent 100%)",
        }}>
          {/* Header row */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 20px 2px" }}>
            <span style={{ fontSize:9, fontWeight:700, letterSpacing:"2px", color:"rgba(254,253,223,0.30)", textTransform:"uppercase" }}>Frames</span>
            <span style={{ fontSize:9, color:"rgba(254,253,223,0.25)" }} aria-live="polite">{idx + 1} / {GLASS_OPTIONS.length}</span>
          </div>

          {/* Ring carousel */}
          <div
            className="lens-carousel"
            role="listbox"
            aria-label="Select glasses frame"
          >
            {GLASS_OPTIONS.map((g, i) => {
              const isA = glasses === g.id;
              const circleSize = isA ? CIRCLE_SIZE_ACTIVE : CIRCLE_SIZE_INACTIVE;

              return (
                <div
                  key={g.id}
                  className={`lens-ring ${isA ? "lens-ring--active" : "lens-ring--inactive"}`}
                  role="option"
                  aria-selected={isA}
                  tabIndex={0}
                  onClick={() => setGlasses(g.id)}
                  onKeyDown={e => (e.key === "Enter" || e.key === " ") && setGlasses(g.id)}
                  style={{ minWidth: CIRCLE_SIZE_ACTIVE + 2 }}
                >
                  {/* Circle */}
                  <div
                    className="lens-ring__circle"
                    style={{
                      width:  circleSize,
                      height: circleSize,
                      background: isA
                        ? "radial-gradient(circle at 35% 35%, rgba(232,127,36,0.22), rgba(10,5,2,0.90))"
                        : "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.07), rgba(10,5,2,0.82))",
                    }}
                  >
                    {/* Spinning conic glow ring */}
                    <div className="lens-ring__glow-ring" aria-hidden="true" />

                    {/* Glasses image */}
                    <img
                      src={g.id}
                      alt={g.name}
                      loading="lazy"
                      className="lens-ring__img"
                    />
                  </div>

                  {/* Label */}
                  <span className="lens-ring__label">{g.name}</span>

                  {/* Active dot */}
                  <div className="lens-ring__dot" aria-hidden="true" />
                </div>
              );
            })}
          </div>
        </div>

        {!cameraReady && (
          <div role="status" aria-label="Initializing camera" style={{
            position:"absolute", inset:0, zIndex:50,
            background:`radial-gradient(ellipse 120% 80% at 55% 30%, rgba(232,127,36,0.08) 0%, rgba(10,5,2,0.99) 60%)`,
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:24,
          }}>
            <div style={{ position:"relative", width:44, height:44 }}>
              <div className="spinner" />
              <div className="spinner-inner" />
            </div>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:22, fontWeight:800, marginBottom:6, background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                VR.OPTICS
              </div>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:"3px", color:C.primary, marginBottom:8 }}>INITIALIZING</div>
              <div style={{ fontSize:10, color:"rgba(254,253,223,0.40)" }}>Allow camera access to continue</div>
            </div>
            <div style={{ fontSize:9, color:"rgba(254,253,223,0.22)", border:`0.5px solid rgba(255,255,255,0.10)`, borderRadius:100, padding:"4px 14px" }}>
              ← Swipe to browse frames →
            </div>
          </div>
        )}
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════
  // DESKTOP LAYOUT
  // ══════════════════════════════════════════════════════════════
  return (
    <div style={{ fontFamily:"'Space Grotesk', sans-serif", background:C.gradBg, color:C.text, height:"100vh", display:"flex", overflow:"hidden" }}>
      <style>{css}</style>

      {/* Ambient glow */}
      <div aria-hidden="true" style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
        <div style={{ position:"absolute", top:"-15%", right:"-8%", width:"52vw", height:"52vw", borderRadius:"50%",
          background:`radial-gradient(circle, rgba(232,127,36,0.14) 0%, rgba(232,127,36,0.04) 45%, transparent 70%)` }} />
        <div style={{ position:"absolute", bottom:"-20%", left:"-12%", width:"48vw", height:"48vw", borderRadius:"50%",
          background:`radial-gradient(circle, rgba(115,165,202,0.12) 0%, rgba(115,165,202,0.03) 45%, transparent 70%)` }} />
      </div>

      {/* ── LEFT: Camera (75%) ── */}
      <div style={{ position:"relative", zIndex:1, flex:"0 0 75%", maxWidth:"75%", padding:20, display:"flex", flexDirection:"column" }}>
        <div style={{
          flex:1, position:"relative", borderRadius:22, overflow:"hidden",
          border:`1px solid ${C.glassBorder}`, background:"#000",
          boxShadow:`inset 0 0 60px rgba(0,0,0,0.40), 0 0 0 1px rgba(232,127,36,0.08), 0 8px 40px rgba(30,41,59,0.12)`,
        }}>
          {cameraReady && (
            <div role="status" aria-live="polite" style={{
              position:"absolute", top:16, right:16, zIndex:5,
              display:"flex", alignItems:"center",
              background:"rgba(0,0,0,0.42)", ...glassPill,
              border:`1px solid rgba(115,165,202,0.28)`,
              padding:"5px 14px", animation:"fadeIn 0.3s ease",
            }}>
              <span className="ar-dot" aria-hidden="true" />
              <span style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,0.80)", letterSpacing:"0.5px" }}>Face Tracking Active</span>
            </div>
          )}

          {/* Selected frame badge */}
          <div style={{ position:"absolute", bottom:16, left:16, zIndex:5 }}>
            <div aria-live="polite" style={{
              background:"rgba(0,0,0,0.52)", ...glassPill,
              border:`0.5px solid ${C.primary25}`, padding:"8px 20px",
              boxShadow:`0 4px 20px rgba(0,0,0,0.25), 0 0 16px ${C.primary12}`,
              display:"flex", alignItems:"center", gap:12,
            }}>
              <span style={{ fontSize:9, fontWeight:700, color:"rgba(254,253,223,0.50)", letterSpacing:"1.5px" }}>SELECTED</span>
              <span aria-hidden="true" style={{ width:1, height:11, background:C.primary30, display:"inline-block" }} />
              <span style={{ fontSize:13, fontWeight:700, color:"rgba(254,253,223,0.95)" }}>{currentGlass?.name}</span>
              <span style={{ fontSize:13, fontWeight:700, background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                {currentGlass?.price}
              </span>
            </div>
          </div>

          <video ref={videoRef} style={{ position:"absolute", left:"-100%", top:"-100%", width:"1px", height:"1px", opacity:0, pointerEvents:"none" }} autoPlay playsInline muted />
          <canvas
            ref={canvasRef}
            width={DESKTOP_CANVAS_W}
            height={DESKTOP_CANVAS_H}
            aria-label="AR glasses try-on camera view"
            style={{ display:"block", width:"100%", height:"100%", objectFit:"cover" }}
          />

          {!cameraReady && (
            <div role="status" aria-label="Initializing camera" style={{
              position:"absolute", inset:0, borderRadius:22, zIndex:30,
              background:`radial-gradient(ellipse 100% 60% at 55% 30%, rgba(232,127,36,0.08) 0%, rgba(254,253,223,0.97) 55%)`,
              display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:28,
            }}>
              <div style={{ position:"relative", width:50, height:50 }}>
                <div className="spinner" />
                <div className="spinner-inner" />
              </div>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, fontWeight:700, letterSpacing:"3px",
                  background:C.gradPrimary, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:8 }}>
                  INITIALIZING CAMERA
                </div>
                <div style={{ fontSize:12, color:C.text55 }}>Please allow camera access to continue</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── RIGHT: Controls panel (25%) ── */}
      <div
        className="right-panel"
        role="complementary"
        aria-label="Frame selection and controls"
        style={{
          position:"relative", zIndex:1,
          flex:"0 0 25%", maxWidth:"25%",
          overflowY:"auto",
          padding:"20px 16px 20px 4px",
          display:"flex", flexDirection:"column", gap:12,
          borderLeft:`1px solid ${C.glassBorder}`,
          background:`linear-gradient(180deg, rgba(245,243,199,0.60) 0%, rgba(254,253,223,0.80) 100%)`,
          backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
        }}
      >
        <div style={{ padding:"4px 4px 2px" }}>
          <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:18, fontWeight:700, color:C.text, marginBottom:3 }}>
            Choose Frame
          </div>
          <div style={{ fontSize:10, letterSpacing:"1.5px", color:C.text30, fontWeight:600, textTransform:"uppercase" }}>
            {GLASS_OPTIONS.length} styles available
          </div>
        </div>

        <div role="listbox" aria-label="Select glasses frame" style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:8 }}>
          {GLASS_OPTIONS.map(g => {
            const isA = glasses === g.id;
            return (
              <div
                key={g.id}
                className="frame-card"
                role="option"
                aria-selected={isA}
                tabIndex={0}
                onClick={() => setGlasses(g.id)}
                onKeyDown={e => (e.key === "Enter" || e.key === " ") && setGlasses(g.id)}
                style={{
                  borderRadius:14,
                  background: isA ? C.primary12 : "rgba(254,253,223,0.55)",
                  border:`1px solid ${isA ? C.primary : C.surfaceBorder}`,
                  padding:"10px 6px",
                  display:"flex", flexDirection:"column", alignItems:"center", gap:5,
                  cursor:"pointer",
                  boxShadow: isA ? `0 0 20px rgba(232,127,36,0.20), 0 4px 12px rgba(30,41,59,0.08)` : `0 1px 4px ${C.text06}`,
                  transition:"all 0.22s cubic-bezier(0.22,1,0.36,1)",
                  backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)",
                }}
              >
                <div style={{
                  width:"100%", height:48,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  borderRadius:10, overflow:"hidden",
                  background: isA ? C.primary12 : C.text06,
                }}>
                  <img
                    src={g.id}
                    alt={g.name}
                    loading="lazy"
                    crossOrigin="anonymous"
                    style={{
                      width:"90%", height:"90%", objectFit:"contain",
                      filter: isA ? `drop-shadow(0 0 5px rgba(232,127,36,0.55))` : "brightness(0.80) saturate(0.75)",
                      transition:"filter 0.2s ease",
                    }}
                  />
                </div>
                <div style={{ fontSize:9, fontWeight:700, textAlign:"center", lineHeight:1.2, color: isA ? C.text : C.text55 }}>
                  {g.name}
                </div>
                <div style={{
                  fontSize:8, fontWeight:700,
                  background: isA ? C.gradPrimary : "none",
                  WebkitBackgroundClip: isA ? "text" : "unset",
                  WebkitTextFillColor: isA ? "transparent" : C.primary,
                  color: isA ? "transparent" : C.primary,
                }}>
                  {g.price}
                </div>
              </div>
            );
          })}
        </div>

        <Section title="FRAME CALIBRATION" icon="⚙️">
          <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:14 }}>
            <button
              onClick={resetAdj}
              aria-label="Reset frame calibration to defaults"
              style={{
                fontSize:9, fontWeight:700, color:C.primary,
                background:C.primary12, border:`0.5px solid ${C.primary25}`,
                padding:"5px 14px", borderRadius:100, cursor:"pointer",
                letterSpacing:"0.5px", transition:"background 0.15s",
              }}
            >Reset</button>
          </div>
          <SliderRow label="WIDTH"    value={curAdj.scaleW}  min={0.3}  max={3}   step={0.05} onChange={v => setAdj("scaleW",  v)} fmt={v => `${v.toFixed(2)}×`} />
          <SliderRow label="HEIGHT"   value={curAdj.scaleH}  min={0.3}  max={3}   step={0.05} onChange={v => setAdj("scaleH",  v)} fmt={v => `${v.toFixed(2)}×`} />
          <SliderRow label="MOVE L/R" value={curAdj.offsetX} min={-150} max={150} step={1}    onChange={v => setAdj("offsetX", v)} fmt={v => `${v > 0 ? "+" : ""}${v}px`} />
          <SliderRow label="MOVE U/D" value={curAdj.offsetY} min={-150} max={150} step={1}    onChange={v => setAdj("offsetY", v)} fmt={v => `${v > 0 ? "+" : ""}${v}px`} />
          <SliderRow label="ROTATION" value={curAdj.rotate}  min={-30}  max={30}  step={0.5}  onChange={v => setAdj("rotate",  v)} fmt={v => `${v > 0 ? "+" : ""}${v.toFixed(1)}°`} />
        </Section>

        <Section title="SCENE FILTERS" icon="🎨">
          <SliderRow label="BRIGHTNESS" value={brightness} min={50}  max={160} step={1} onChange={setBrightness} fmt={v => `${v}%`} />
          <SliderRow label="CONTRAST"   value={contrast}   min={60}  max={160} step={1} onChange={setContrast}   fmt={v => `${v}%`} />
          <SliderRow label="SATURATION" value={saturate}   min={50}  max={160} step={1} onChange={setSaturate}   fmt={v => `${v}%`} />
        </Section>
      </div>
    </div>
  );
};

export default TryOn;