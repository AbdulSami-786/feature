

// // final product

// import React, { useRef, useEffect, useState, useCallback } from "react";

// // ─── Per-frame defaults ────────────────────────────────────────────────────────
// const DEFAULT_ADJ = { scaleW: 1, scaleH: 1, offsetX: 0, offsetY: 0, rotate: 0 };
// const AVIATOR_ADJ = { scaleW: 1, scaleH: 1.18, offsetX: 0, offsetY: 10, rotate: 0 };
// const ROUND_ADJ = { scaleW: 1, scaleH: 0.85, offsetX: 0, offsetY: 4, rotate: 0 };

// const GLASS_OPTIONS = [
//   { id: "/glass1.png", name: "Classic", price: "PKR 4,500", emoji: "👓", sizes: [{ label: "XL", scale: 1.10, mobileScale: 0.65 }] },
//   { id: "/glass2.png", name: "Aviator", price: "PKR 5,200", emoji: "🕶️", sizes: [{ label: "L", scale: 1.15, mobileScale: 1.00 }] },
//   { id: "/glass3.png", name: "Sport", price: "PKR 3,800", emoji: "🥽", sizes: [{ label: "L", scale: 1.15, mobileScale: 1.00 }] },
//   { id: "/glass4.png", name: "Round", price: "PKR 4,900", emoji: "⭕", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
//   { id: "/glass5.png", name: "Wayfarer", price: "PKR 4,900", emoji: "🕶️", sizes: [{ label: "L", scale: 1.25, mobileScale: 0.98 }] },
//   { id: "/glass6.png", name: "Vintage", price: "PKR 4,900", emoji: "🪩", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
//   { id: "/glass7.png", name: "Clubmaster", price: "PKR 4,900", emoji: "🔲", sizes: [{ label: "XL", scale: 1.30, mobileScale: 1.10 }] },
//   { id: "/glass8.png", name: "Cat Eye", price: "PKR 4,900", emoji: "😼", sizes: [{ label: "XL", scale: 1.30, mobileScale: 1.10 }] },
//   { id: "/glass9.png", name: "Shield", price: "PKR 4,900", emoji: "🛡️", sizes: [{ label: "M", scale: 1.00, mobileScale: 0.75 }] },
//   { id: "/glass10.png", name: "Oval", price: "PKR 4,900", emoji: "🥚", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
//   { id: "/glass11.png", name: "Square", price: "PKR 4,900", emoji: "⬛", sizes: [{ label: "S", scale: 0.75, mobileScale: 0.50 }] },
//   { id: "/glass12.png", name: "Hexagonal", price: "PKR 4,900", emoji: "⬡", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
//   { id: "/glass13.png", name: "Geometric", price: "PKR 4,900", emoji: "🔷", sizes: [{ label: "M", scale: 1.00, mobileScale: 0.75 }] },
//   { id: "/glass14.png", name: "Steampunk", price: "PKR 4,900", emoji: "⚙️", sizes: [{ label: "S", scale: 0.95, mobileScale: 0.50 }] },
//   { id: "/glass15.png", name: "Sports Pro", price: "PKR 4,900", emoji: "🏃", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
//   { id: "/glass16.png", name: "Retro", price: "PKR 4,900", emoji: "🎞️", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
//   { id: "/glass17.png", name: "Modern", price: "PKR 4,900", emoji: "✨", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
//   { id: "/glass18.png", name: "Luxury", price: "PKR 4,900", emoji: "💎", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
//   { id: "/glass19.png", name: "Designer", price: "PKR 4,900", emoji: "🎨", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
//   { id: "/glass20.png", name: "Classic II", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
//   { id: "/glass21.png", name: "Classic III", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "M", scale: 1.00, mobileScale: 0.75 }] },
//   { id: "/glass22.png", name: "Classic IV", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.05, mobileScale: 0.95 }] },
//   { id: "/glass23.png", name: "Classic V", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
//   { id: "/glass24.png", name: "Classic VI", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "S", scale: 0.85, mobileScale: 0.50 }] },
//   { id: "/glass25.png", name: "Classic VII", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
//   { id: "/glass26.png", name: "Classic VIII", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
//   { id: "/glass27.png", name: "Classic IX", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
//   { id: "/glass28.png", name: "Classic X", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "M", scale: 1.00, mobileScale: 0.75 }] },
//   { id: "/glass29.png", name: "Classic XI", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.25, mobileScale: 0.95 }] },
//   { id: "/glass30.png", name: "Classic XII", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
//   { id: "/glass31.png", name: "Classic 31", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
//   { id: "/glass32.png", name: "Classic 32", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
//   { id: "/glass33.png", name: "Classic 33", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
//   { id: "/glass34.png", name: "Classic 34", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
//   { id: "/glass35.png", name: "Classic 35", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "M", scale: 1.10, mobileScale: 0.75 }] },
//   { id: "/glass36.png", name: "Classic 36", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
//   { id: "/glass37.png", name: "Classic 37", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
//   { id: "/glass38.png", name: "Classic 38", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "XL", scale: 1.30, mobileScale: 1.10 }] },
//   { id: "/glass39.png", name: "Classic 39", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
//   { id: "/glass40.png", name: "Classic 40", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "M", scale: 1.00, mobileScale: 0.75 }] },
//   { id: "/glass41.png", name: "Classic 41", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
//   { id: "/glass42.png", name: "Classic 42", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "S", scale: 0.95, mobileScale: 0.50 }] },
//   { id: "/glass43.png", name: "Classic 43", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
//   { id: "/glass44.png", name: "Classic 44", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
//   { id: "/glass45.png", name: "Classic 45", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "XL", scale: 1.30, mobileScale: 1.10 }] },
//   { id: "/glass46.png", name: "Classic 46", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "XL", scale: 1.40, mobileScale: 1.10 }] },
//   { id: "/glass47.png", name: "Classic 47", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "XL", scale: 1.20, mobileScale: 1.10 }] },
//   { id: "/glass48.png", name: "Classic 48", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "M", scale: 1.00, mobileScale: 0.75 }] },
//   { id: "/glass49.png", name: "Classic 49", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
// ];

// // ─── Device helpers ────────────────────────────────────────────────────────────
// const getIsMobile = () =>
//   typeof window !== "undefined" &&
//   (window.innerWidth < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

// const getMobileSizes = () => {
//   const landscape = typeof window !== "undefined" && window.innerWidth > window.innerHeight;
//   // Based on the provided image, the aspect ratio is approximately 3:4.
//   // We will scale down the resolution while maintaining this ratio for performance,
//   // especially on lower-end devices. 360x480 or 480x640 is a good balance.
//   return landscape
//     ? { camW: 640, camH: 480, canvasW: 640, canvasH: 480 }
//     : { camW: 480, camH: 640, canvasW: 480, canvasH: 640 };
// };

// const getSizeScale = (sizeObj, mobile) =>
//   sizeObj ? (mobile ? (sizeObj.mobileScale ?? sizeObj.scale) : sizeObj.scale) : 1;

// // ─── Timing constants ──────────────────────────────────────────────────────────
// const MOBILE_FPS = 30;
// const MOBILE_FRAME_INT = 1000 / MOBILE_FPS;

// const DESKTOP_CAM_W = 1280;
// const DESKTOP_CAM_H = 720;
// const DESKTOP_CANVAS_W = 1280;
// const DESKTOP_CANVAS_H = 720;

// // ─── Beauty passthrough (neutral) ─────────────────────────────────────────────
// const BEAUTY_B = 100, BEAUTY_C = 100, BEAUTY_S = 100;

// // ─── Landmark indices ─────────────────────────────────────────────────────────
// const LANDMARKS = {
//   LEFT_IRIS_CENTER: 468,
//   RIGHT_IRIS_CENTER: 473,
//   LEFT_EYE_OUTER: 33,
//   RIGHT_EYE_OUTER: 263,
//   LEFT_EYE_INNER: 133,
//   RIGHT_EYE_INNER: 362,
//   LEFT_EYE_TOP: [159, 160, 161],
//   RIGHT_EYE_TOP: [386, 387, 388],
//   LEFT_EYEBROW_LOWER: [70, 63, 105, 66, 107],
//   RIGHT_EYEBROW_LOWER: [300, 293, 334, 296, 336],
//   NOSE_BRIDGE_TOP: 6,
//   LEFT_FACE_EDGE: 234,
//   RIGHT_FACE_EDGE: 454,
// };

// class FaceGeoSmoother {
//   constructor({ posAlpha, scaleAlpha, rotAlpha, maxPosDelta = 60, maxScaleDelta = 0.15 }) {
//     this.posAlpha = posAlpha;
//     this.scaleAlpha = scaleAlpha;
//     this.rotAlpha = rotAlpha;
//     this.maxPosDelta = maxPosDelta;
//     this.maxScaleDelta = maxScaleDelta;
//     this.prev = null;
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
//       cx: this._step(p.cx, cur.cx, this.posAlpha, this.maxPosDelta, deadzone),
//       cy: this._step(p.cy, cur.cy, this.posAlpha, this.maxPosDelta, deadzone),
//       gw: this._step(p.gw, cur.gw, this.scaleAlpha, this.maxPosDelta, 0),
//       gh: this._step(p.gh, cur.gh, this.scaleAlpha, this.maxPosDelta, 0),
//       angle: this._step(p.angle, cur.angle, this.rotAlpha, 0.18, 0),
//       ds: this._step(p.ds, cur.ds, this.scaleAlpha, this.maxScaleDelta, 0),
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

//   const leftEyeOut = px(LANDMARKS.LEFT_EYE_OUTER);
//   const rightEyeOut = px(LANDMARKS.RIGHT_EYE_OUTER);
//   const leftEyeIn = px(LANDMARKS.LEFT_EYE_INNER);
//   const rightEyeIn = px(LANDMARKS.RIGHT_EYE_INNER);
//   const noseBridgeTop = px(LANDMARKS.NOSE_BRIDGE_TOP);
//   const leftBrowLower = avgPx(LANDMARKS.LEFT_EYEBROW_LOWER);
//   const rightBrowLower = avgPx(LANDMARKS.RIGHT_EYEBROW_LOWER);

//   let leftIris, rightIris;
//   if (useIris && lm.length > 473) {
//     leftIris = px(LANDMARKS.LEFT_IRIS_CENTER);
//     rightIris = px(LANDMARKS.RIGHT_IRIS_CENTER);
//   } else {
//     leftIris = {
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

//   const irisY = (leftIris.y + rightIris.y) / 2;
//   const centerX = (leftIris.x + rightIris.x) / 2;
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
//   const glassesWidth = eyeSpan * 1.60 * spanMult;
//   const glassesHeight = eyeSpan * 0.90 * spanMult;

//   const avgZ = (leftIris.z + rightIris.z + (noseBridgeTop.z ?? 0)) / 3;

//   // Strong dynamic scaling
// const depthScale = Math.max(
//   0.65,
//   Math.min(
//     1.70,
//     1 + (-avgZ * 3.2)
//   )
// );
//   return { centerX, centerY, angle, glassesWidth, glassesHeight, depthScale };
// }

// // ─── Theme ────────────────────────────────────────────────────────────────────
// const C = {
//   primary: "#E87F24",
//   accent: "#73A5CA",
//   bg: "#FEFDDF",
//   surface: "#F5F3C7",
//   text: "#1E293B",
//   primary12: "rgba(232,127,36,0.12)",
//   primary20: "rgba(232,127,36,0.20)",
//   primary25: "rgba(232,127,36,0.25)",
//   primary30: "rgba(232,127,36,0.30)",
//   primary40: "rgba(232,127,36,0.40)",
//   accent12: "rgba(115,165,202,0.12)",
//   accent20: "rgba(115,165,202,0.20)",
//   accent28: "rgba(115,165,202,0.28)",
//   text55: "rgba(30,41,59,0.55)",
//   text30: "rgba(30,41,59,0.30)",
//   text12: "rgba(30,41,59,0.12)",
//   text06: "rgba(30,41,59,0.06)",
//   glassBg: "rgba(254,253,223,0.65)",
//   glassBorder: "rgba(255,255,255,0.70)",
//   surfaceBorder: "rgba(255,255,255,0.85)",
//   white15: "rgba(255,255,255,0.15)",
//   white08: "rgba(255,255,255,0.08)",
//   gradPrimary: "linear-gradient(135deg, #E87F24, #F5A623)",
//   gradPrimaryTx: "linear-gradient(135deg, #F5A623, #E87F24)",
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
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const imgRef = useRef(new Image());
//   const rafIdRef = useRef(null);
//   const lastFrameRef = useRef(0);
//   const touchStartX = useRef(null);
//   const touchStartY = useRef(null);
//   const cameraRdyRef = useRef(false);
//   const glassesRef = useRef("/glass1.png");
//   const adjRef = useRef({});
//   const pendingResultRef = useRef(null);
//   const camStreamRef = useRef(null);
//   const camInstanceRef = useRef(null);
//   const cachedGlassRef = useRef(null);
//   const ctxRef = useRef(null);
//   const resultVersionRef = useRef(0);
//   const lastDrawnVersionRef = useRef(-1);

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
//         posAlpha: 0.38,
//         scaleAlpha: 1.0,
//         rotAlpha: 0.22,
//         maxPosDelta: 48,
//         maxScaleDelta: 5.0,
//       })
//       : new FaceGeoSmoother({
//         posAlpha: 0.45,
//         scaleAlpha: 1.0,
//         rotAlpha: 0.30,
//         maxPosDelta: 60,
//         maxScaleDelta: 5.0,
//       });
//   }

//   const [glasses, setGlasses] = useState("/glass1.png");
//   const [cameraReady, setCameraReady] = useState(false);
//   const [brightness, setBrightness] = useState(100);
//   const [contrast, setContrast] = useState(100);
//   const [saturate, setSaturate] = useState(100);
//   const [mpError, setMpError] = useState(null);

//   const brightnessRef = useRef(100);
//   const contrastRef = useRef(100);
//   const saturateRef = useRef(100);
//   useEffect(() => { brightnessRef.current = brightness; }, [brightness]);
//   useEffect(() => { contrastRef.current = contrast; }, [contrast]);
//   useEffect(() => { saturateRef.current = saturate; }, [saturate]);

//   const adjustmentsRef = useRef(
//     Object.fromEntries(GLASS_OPTIONS.map(g => {
//       if (g.id === "/glass2.png") return [g.id, { ...AVIATOR_ADJ }];
//       if (g.id === "/glass4.png") return [g.id, { ...ROUND_ADJ }];
//       return [g.id, { ...DEFAULT_ADJ }];
//     }))
//   );
//   const [adjUIState, setAdjUIState] = useState(() => adjustmentsRef.current["/glass1.png"]);

//   useEffect(() => {
//     glassesRef.current = glasses;
//     adjRef.current = adjustmentsRef.current;
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
//         id === "/glass4.png" ? { ...ROUND_ADJ } : { ...DEFAULT_ADJ };
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
//     const now = performance.now();
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

//     const lm = result.multiFaceLandmarks[0];
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
//     const sSc = glassObj?.sizes?.[0] ? getSizeScale(glassObj.sizes[0], mobile) : 1.0;
//     const adj = adjRef.current[glassesRef.current] || DEFAULT_ADJ;

//     let w = sm.gw * adj.scaleW;
//     let h = sm.gh * adj.scaleH;
//     w *= geo.depthScale;
//     h *= geo.depthScale;

//     w *= sSc; h *= sSc;

//     w = Math.max(20, Math.min(W * 0.95, w));
//     h = Math.max(8, Math.min(H * 0.60, h));

//     const mirroredAngle = -sm.angle;

//     const halfW = w * 0.5;
//     const halfH = h * 0.5;
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
//       canvasRef.current.width = canvasW;
//       canvasRef.current.height = canvasH;
//       ctxRef.current = null;
//     }

//     const faceMesh = new window.FaceMesh({
//       locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/${file}`,
//     });
//     faceMesh.setOptions({
//       maxNumFaces: 1,
//       refineLandmarks: !mobile,
//       minDetectionConfidence: mobile ? 0.40 : 0.50,
//       minTrackingConfidence: mobile ? 0.35 : 0.50,
//     });
//     faceMesh.onResults(onResults);

//     rafIdRef.current = requestAnimationFrame(drawLoop);

//     navigator.mediaDevices.getUserMedia({
//       video: {
//         facingMode: "user",
//         width: { ideal: camW },
//         height: { ideal: camH },
//         frameRate: { ideal: mobile ? 30 : 60 },
//       },
//       audio: false,
//     })
//       .then(stream => {
//         camStreamRef.current = stream;
//         const video = videoRef.current;
//         if (!video) return;
//         video.srcObject = stream;
//         video.onloadedmetadata = () => {
//           video.play().then(() => {
//             cameraRdyRef.current = true;
//             setCameraReady(true);

//             const sendFrame = async () => {
//               if (!cameraRdyRef.current) return;
//               try {
//                 if (video.readyState >= 2) await faceMesh.send({ image: video });
//               } catch (_) { /* ignore send errors on cleanup */ }
//               if (cameraRdyRef.current) {
//                 camInstanceRef.current = requestAnimationFrame(sendFrame);
//               }
//             };
//             camInstanceRef.current = requestAnimationFrame(sendFrame);
//           }).catch(err => {
//             console.error("Video play failed:", err);
//             setMpError("Could not start video playback. Please reload and allow camera access.");
//           });
//         };
//       })
//       .catch(err => {
//         console.error("Camera failed:", err);
//         setMpError("Camera access denied or not available. Please allow camera permissions and reload.");
//       });

//     return () => {
//       cameraRdyRef.current = false;
//       if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
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

//     /* ───────────────── SNAPCHAT STYLE LENS UI ───────────────── */

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
//       scroll-behavior: smooth;
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
//       user-select: none;
//       -webkit-tap-highlight-color: transparent;
//       transition: transform 0.25s ease;
//     }

//     .lens-ring__circle {
//       width: 58px;
//       height: 58px;
//       border-radius: 50%;
//       position: relative;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       background: radial-gradient(
//         circle at 35% 35%,
//         rgba(255,255,255,0.08),
//         rgba(10,5,2,0.88)
//       );
//       transition:
//         transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1),
//         opacity 0.25s ease,
//         box-shadow 0.28s ease;
//       will-change: transform, opacity, box-shadow;
//     }

//     .lens-ring__img {
//       width: 68%;
//       height: 68%;
//       object-fit: contain;
//       pointer-events: none;
//       transition: filter 0.25s ease;
//     }

//     /* ── ACTIVE state ── */
//     .lens-ring--active .lens-ring__circle {
//       transform: scale(1.15);
//       box-shadow:
//         0 0 0 2.5px #E87F24,
//         0 0 0 5px rgba(232,127,36,0.20),
//         0 0 24px rgba(232,127,36,0.55),
//         0 0 44px rgba(245,166,35,0.18);
//     }
//     .lens-ring--active .lens-ring__img {
//       filter:
//         drop-shadow(0 0 8px rgba(232,127,36,0.80))
//         brightness(1.05);
//     }

//     /* ── INACTIVE state ── */
//     .lens-ring--inactive .lens-ring__circle {
//       transform: scale(0.88);
//       opacity: 0.55;
//       box-shadow:
//         0 0 0 1px rgba(255,255,255,0.12),
//         0 2px 8px rgba(0,0,0,0.35);
//     }
//     .lens-ring--inactive .lens-ring__img {
//       filter: brightness(0.55) saturate(0.55);
//     }

//     /* ── Click feedback ── */
//     .lens-ring__circle:active {
//       transform: scale(0.82) !important;
//       transition: transform 0.10s ease !important;
//     }

//     /* ── GLOW RING (spinning conic border) ── */
//     .lens-ring__glow-ring {
//       position: absolute;
//       inset: -3px;
//       border-radius: 50%;
//       padding: 2px;
//       pointer-events: none;
//       background: conic-gradient(
//         from 0deg,
//         #F5A623,
//         #E87F24,
//         #FF6B35,
//         #F5A623
//       );
//       opacity: 0;
//       transition: opacity 0.25s ease;
//       -webkit-mask:
//         linear-gradient(#fff 0 0) content-box,
//         linear-gradient(#fff 0 0);
//       -webkit-mask-composite: xor;
//       mask-composite: exclude;
//       animation: spinRing 2s linear infinite;
//     }
//     .lens-ring--active .lens-ring__glow-ring {
//       opacity: 1;
//     }

//     @keyframes spinRing {
//       from { transform: rotate(0deg); }
//       to   { transform: rotate(360deg); }
//     }

//     /* ── Label ── */
//     .lens-ring__label {
//       font-size: 9px;
//       font-weight: 700;
//       letter-spacing: 0.4px;
//       text-align: center;
//       max-width: 64px;
//       white-space: nowrap;
//       overflow: hidden;
//       text-overflow: ellipsis;
//       transition: color 0.25s ease, opacity 0.25s ease;
//       pointer-events: none;
//     }
//     .lens-ring--active .lens-ring__label {
//       color: #F5A623;
//       opacity: 1;
//     }
//     .lens-ring--inactive .lens-ring__label {
//       color: rgba(255,255,255,0.40);
//       opacity: 1;
//     }

//     /* ── Active dot indicator ── */
//     .lens-ring__dot {
//       width: 4px;
//       height: 4px;
//       border-radius: 50%;
//       background: #E87F24;
//       transition: opacity 0.25s ease, transform 0.25s ease;
//     }
//     .lens-ring--active .lens-ring__dot {
//       opacity: 1;
//       transform: scale(1);
//       box-shadow: 0 0 8px #E87F24;
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
//   const curAdj = adjUIState;

//   // ══════════════════════════════════════════════════════════════
//   // MOBILE LAYOUT
//   // ══════════════════════════════════════════════════════════════
//   if (isMobile) {
//     const idx = GLASS_OPTIONS.findIndex(g => g.id === glasses);
//     const { canvasW, canvasH } = mobileSizes;

//     const CIRCLE_SIZE_ACTIVE = 58;
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
//         if (dx > 0 && cur > 0) setGlasses(GLASS_OPTIONS[cur - 1].id);
//       }
//       touchStartX.current = null;
//       touchStartY.current = null;
//     };

//     return (
//       <div
//         style={{ position: "fixed", inset: 0, background: "#000", fontFamily: "'Space Grotesk',sans-serif", color: "#fff", overflow: "hidden", touchAction: "pan-y" }}
//         onTouchStart={onTouchStart}
//         onTouchEnd={onTouchEnd}
//       >
//         <style>{css}</style>
//         <video ref={videoRef} style={{ position: "absolute", left: "-100%", top: "-100%", width: "1px", height: "1px", opacity: 0, pointerEvents: "none" }} autoPlay playsInline muted />

//         <canvas
//           ref={canvasRef}
//           width={canvasW}
//           height={canvasH}
//           style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", display: "block", background: "black" }}
//           aria-label="AR glasses try-on camera view"
//         />

//         {/* Top vignette */}
//         <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "22%", background: "linear-gradient(to bottom, rgba(0,0,0,0.50), transparent)", pointerEvents: "none" }} aria-hidden="true" />

//         {/* AR tracking indicator */}
//         {cameraReady && (
//           <div role="status" aria-live="polite" style={{
//             position: "absolute", top: 18, left: 16, zIndex: 20,
//             display: "flex", alignItems: "center",
//             background: "rgba(0,0,0,0.42)", ...glassPill,
//             border: `1px solid rgba(115,165,202,0.30)`,
//             padding: "5px 12px", animation: "fadeIn 0.35s ease",
//           }}>
//             <span className="ar-dot" aria-hidden="true" />
//             <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.80)", letterSpacing: "0.5px" }}>Tracking</span>
//           </div>
//         )}

//         {/* Frame name + price */}
//         {cameraReady && currentGlass && (
//           <div aria-live="polite" style={{
//             position: "absolute", bottom: 158, left: "50%", transform: "translateX(-50%)",
//             zIndex: 20, whiteSpace: "nowrap",
//             background: "rgba(0,0,0,0.48)", ...glassPill,
//             border: `1px solid ${C.primary25}`,
//             padding: "7px 20px",
//             display: "flex", alignItems: "center", gap: 10,
//             animation: "fadeIn 0.3s ease",
//             boxShadow: `0 4px 20px rgba(0,0,0,0.25), 0 0 20px ${C.primary12}`,
//           }}>
//             <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(254,253,223,0.95)" }}>{currentGlass.name}</span>
//             <span aria-hidden="true" style={{ width: 1, height: 11, background: C.primary30, display: "inline-block" }} />
//             <span style={{ fontSize: 13, fontWeight: 700, background: C.gradPrimary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
//               {currentGlass.price}
//             </span>
//           </div>
//         )}

//         {/* Progress dots */}
//         {cameraReady && (
//           <div aria-hidden="true" style={{ position: "absolute", bottom: 140, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 4, zIndex: 20 }}>
//             {GLASS_OPTIONS.map((g, i) => (
//               <div key={g.id} style={{
//                 width: i === idx ? 14 : 4, height: 4, borderRadius: 3,
//                 background: i === idx ? C.primary : C.white15,
//                 transition: "all 0.25s ease",
//               }} />
//             ))}
//           </div>
//         )}

//         {/* ── Snapchat-style ring carousel ── */}
//         <div style={{
//           position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 20,
//           paddingBottom: "env(safe-area-inset-bottom, 10px)",
//           background: "linear-gradient(to top, rgba(8,4,1,0.97) 50%, rgba(8,4,1,0.80) 75%, transparent 100%)",
//         }}>
//           {/* Header row */}
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 20px 2px" }}>
//             <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "2px", color: "rgba(254,253,223,0.30)", textTransform: "uppercase" }}>Frames</span>
//             <span style={{ fontSize: 9, color: "rgba(254,253,223,0.25)" }} aria-live="polite">{idx + 1} / {GLASS_OPTIONS.length}</span>
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
//                   {/* Circle */}
//                   <div
//                     className="lens-ring__circle"
//                     style={{
//                       width: circleSize,
//                       height: circleSize,
//                       background: isA
//                         ? "radial-gradient(circle at 35% 35%, rgba(232,127,36,0.22), rgba(10,5,2,0.90))"
//                         : "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.07), rgba(10,5,2,0.82))",
//                     }}
//                   >
//                     {/* Spinning conic glow ring */}
//                     <div className="lens-ring__glow-ring" aria-hidden="true" />

//                     {/* Glasses image */}
//                     <img
//                       src={g.id}
//                       alt={g.name}
//                       loading="lazy"
//                       className="lens-ring__img"
//                     />
//                   </div>

//                   {/* Label */}
//                   <span className="lens-ring__label">{g.name}</span>

//                   {/* Active dot */}
//                   <div className="lens-ring__dot" aria-hidden="true" />
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {!cameraReady && (
//           <div role="status" aria-label="Initializing camera" style={{
//             position: "absolute", inset: 0, zIndex: 50,
//             background: `radial-gradient(ellipse 120% 80% at 55% 30%, rgba(232,127,36,0.08) 0%, rgba(10,5,2,0.99) 60%)`,
//             display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24,
//           }}>
//             <div style={{ position: "relative", width: 44, height: 44 }}>
//               <div className="spinner" />
//               <div className="spinner-inner" />
//             </div>
//             <div style={{ textAlign: "center" }}>
//               <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 6, background: C.gradPrimary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
//                 VR.OPTICS
//               </div>
//               <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "3px", color: C.primary, marginBottom: 8 }}>INITIALIZING</div>
//               <div style={{ fontSize: 10, color: "rgba(254,253,223,0.40)" }}>Allow camera access to continue</div>
//             </div>
//             <div style={{ fontSize: 9, color: "rgba(254,253,223,0.22)", border: `0.5px solid rgba(255,255,255,0.10)`, borderRadius: 100, padding: "4px 14px" }}>
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
//     <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: C.gradBg, color: C.text, height: "100vh", display: "flex", overflow: "hidden" }}>
//       <style>{css}</style>

//       {/* Ambient glow */}
//       <div aria-hidden="true" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
//         <div style={{
//           position: "absolute", top: "-15%", right: "-8%", width: "52vw", height: "52vw", borderRadius: "50%",
//           background: `radial-gradient(circle, rgba(232,127,36,0.14) 0%, rgba(232,127,36,0.04) 45%, transparent 70%)`
//         }} />
//         <div style={{
//           position: "absolute", bottom: "-20%", left: "-12%", width: "48vw", height: "48vw", borderRadius: "50%",
//           background: `radial-gradient(circle, rgba(115,165,202,0.12) 0%, rgba(115,165,202,0.03) 45%, transparent 70%)`
//         }} />
//       </div>

//       {/* ── LEFT: Camera (75%) ── */}
//       <div style={{ position: "relative", zIndex: 1, flex: "0 0 75%", maxWidth: "75%", padding: 20, display: "flex", flexDirection: "column" }}>
//         <div style={{
//           flex: 1, position: "relative", borderRadius: 22, overflow: "hidden",
//           border: `1px solid ${C.glassBorder}`, background: "#000",
//           boxShadow: `inset 0 0 60px rgba(0,0,0,0.40), 0 0 0 1px rgba(232,127,36,0.08), 0 8px 40px rgba(30,41,59,0.12)`,
//         }}>
//           {cameraReady && (
//             <div role="status" aria-live="polite" style={{
//               position: "absolute", top: 16, right: 16, zIndex: 5,
//               display: "flex", alignItems: "center",
//               background: "rgba(0,0,0,0.42)", ...glassPill,
//               border: `1px solid rgba(115,165,202,0.28)`,
//               padding: "5px 14px", animation: "fadeIn 0.3s ease",
//             }}>
//               <span className="ar-dot" aria-hidden="true" />
//               <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.80)", letterSpacing: "0.5px" }}>Face Tracking Active</span>
//             </div>
//           )}

//           {/* Selected frame badge */}
//           <div style={{ position: "absolute", bottom: 16, left: 16, zIndex: 5 }}>
//             <div aria-live="polite" style={{
//               background: "rgba(0,0,0,0.52)", ...glassPill,
//               border: `0.5px solid ${C.primary25}`, padding: "8px 20px",
//               boxShadow: `0 4px 20px rgba(0,0,0,0.25), 0 0 16px ${C.primary12}`,
//               display: "flex", alignItems: "center", gap: 12,
//             }}>
//               <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(254,253,223,0.50)", letterSpacing: "1.5px" }}>SELECTED</span>
//               <span aria-hidden="true" style={{ width: 1, height: 11, background: C.primary30, display: "inline-block" }} />
//               <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(254,253,223,0.95)" }}>{currentGlass?.name}</span>
//               <span style={{ fontSize: 13, fontWeight: 700, background: C.gradPrimary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
//                 {currentGlass?.price}
//               </span>
//             </div>
//           </div>

//           <video ref={videoRef} style={{ position: "absolute", left: "-100%", top: "-100%", width: "1px", height: "1px", opacity: 0, pointerEvents: "none" }} autoPlay playsInline muted />
//           <canvas
//             ref={canvasRef}
//             width={DESKTOP_CANVAS_W}
//             height={DESKTOP_CANVAS_H}
//             aria-label="AR glasses try-on camera view"
//             style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
//           />

//           {!cameraReady && (
//             <div role="status" aria-label="Initializing camera" style={{
//               position: "absolute", inset: 0, borderRadius: 22, zIndex: 30,
//               background: `radial-gradient(ellipse 100% 60% at 55% 30%, rgba(232,127,36,0.08) 0%, rgba(254,253,223,0.97) 55%)`,
//               display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28,
//             }}>
//               <div style={{ position: "relative", width: 50, height: 50 }}>
//                 <div className="spinner" />
//                 <div className="spinner-inner" />
//               </div>
//               <div style={{ textAlign: "center" }}>
//                 <div style={{
//                   fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "3px",
//                   background: C.gradPrimary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8
//                 }}>
//                   INITIALIZING CAMERA
//                 </div>
//                 <div style={{ fontSize: 12, color: C.text55 }}>Please allow camera access to continue</div>
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
//           position: "relative", zIndex: 1,
//           flex: "0 0 25%", maxWidth: "25%",
//           overflowY: "auto",
//           padding: "20px 16px 20px 4px",
//           display: "flex", flexDirection: "column", gap: 12,
//           borderLeft: `1px solid ${C.glassBorder}`,
//           background: `linear-gradient(180deg, rgba(245,243,199,0.60) 0%, rgba(254,253,223,0.80) 100%)`,
//           backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
//         }}
//       >
//         <div style={{ padding: "4px 4px 2px" }}>
//           <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 3 }}>
//             Choose Frame
//           </div>
//           <div style={{ fontSize: 10, letterSpacing: "1.5px", color: C.text30, fontWeight: 600, textTransform: "uppercase" }}>
//             {GLASS_OPTIONS.length} styles available
//           </div>
//         </div>

//         <div role="listbox" aria-label="Select glasses frame" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
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
//                   borderRadius: 14,
//                   background: isA ? C.primary12 : "rgba(254,253,223,0.55)",
//                   border: `1px solid ${isA ? C.primary : C.surfaceBorder}`,
//                   padding: "10px 6px",
//                   display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
//                   cursor: "pointer",
//                   boxShadow: isA ? `0 0 20px rgba(232,127,36,0.20), 0 4px 12px rgba(30,41,59,0.08)` : `0 1px 4px ${C.text06}`,
//                   transition: "all 0.22s cubic-bezier(0.22,1,0.36,1)",
//                   backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
//                 }}
//               >
//                 <div style={{
//                   width: "100%", height: 48,
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   borderRadius: 10, overflow: "hidden",
//                   background: isA ? C.primary12 : C.text06,
//                 }}>
//                   <img
//                     src={g.id}
//                     alt={g.name}
//                     loading="lazy"
//                     crossOrigin="anonymous"
//                     style={{
//                       width: "90%", height: "90%", objectFit: "contain",
//                       filter: isA ? `drop-shadow(0 0 5px rgba(232,127,36,0.55))` : "brightness(0.80) saturate(0.75)",
//                       transition: "filter 0.2s ease",
//                     }}
//                   />
//                 </div>
//                 <div style={{ fontSize: 9, fontWeight: 700, textAlign: "center", lineHeight: 1.2, color: isA ? C.text : C.text55 }}>
//                   {g.name}
//                 </div>
//                 <div style={{
//                   fontSize: 8, fontWeight: 700,
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
//           <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
//             <button
//               onClick={resetAdj}
//               aria-label="Reset frame calibration to defaults"
//               style={{
//                 fontSize: 9, fontWeight: 700, color: C.primary,
//                 background: C.primary12, border: `0.5px solid ${C.primary25}`,
//                 padding: "5px 14px", borderRadius: 100, cursor: "pointer",
//                 letterSpacing: "0.5px", transition: "background 0.15s",
//               }}
//             >Reset</button>
//           </div>
//           <SliderRow label="WIDTH" value={curAdj.scaleW} min={0.3} max={3} step={0.05} onChange={v => setAdj("scaleW", v)} fmt={v => `${v.toFixed(2)}×`} />
//           <SliderRow label="HEIGHT" value={curAdj.scaleH} min={0.3} max={3} step={0.05} onChange={v => setAdj("scaleH", v)} fmt={v => `${v.toFixed(2)}×`} />
//           <SliderRow label="MOVE L/R" value={curAdj.offsetX} min={-150} max={150} step={1} onChange={v => setAdj("offsetX", v)} fmt={v => `${v > 0 ? "+" : ""}${v}px`} />
//           <SliderRow label="MOVE U/D" value={curAdj.offsetY} min={-150} max={150} step={1} onChange={v => setAdj("offsetY", v)} fmt={v => `${v > 0 ? "+" : ""}${v}px`} />
//           <SliderRow label="ROTATION" value={curAdj.rotate} min={-30} max={30} step={0.5} onChange={v => setAdj("rotate", v)} fmt={v => `${v > 0 ? "+" : ""}${v.toFixed(1)}°`} />
//         </Section>

//         <Section title="SCENE FILTERS" icon="🎨">
//           <SliderRow label="BRIGHTNESS" value={brightness} min={50} max={160} step={1} onChange={setBrightness} fmt={v => `${v}%`} />
//           <SliderRow label="CONTRAST" value={contrast} min={60} max={160} step={1} onChange={setContrast} fmt={v => `${v}%`} />
//           <SliderRow label="SATURATION" value={saturate} min={50} max={160} step={1} onChange={setSaturate} fmt={v => `${v}%`} />
//         </Section>
//       </div>
//     </div>
//   );
// };

// export default TryOn;







// TryOn.jsx - Fixed mobile stretching issue
import React, { useRef, useEffect, useState, useCallback } from "react";

// ─── Per-frame defaults ────────────────────────────────────────────────────────
const DEFAULT_ADJ = { scaleW: 1, scaleH: 1, offsetX: 0, offsetY: 0, rotate: 0 };
const AVIATOR_ADJ = { scaleW: 1, scaleH: 1.18, offsetX: 0, offsetY: 10, rotate: 0 };
const ROUND_ADJ = { scaleW: 1, scaleH: 0.85, offsetX: 0, offsetY: 4, rotate: 0 };

const GLASS_OPTIONS = [
  { id: "/glass1.png", name: "Classic", price: "PKR 4,500", emoji: "👓", sizes: [{ label: "XL", scale: 1.10, mobileScale: 0.65 }] },
  { id: "/glass2.png", name: "Aviator", price: "PKR 5,200", emoji: "🕶️", sizes: [{ label: "L", scale: 1.15, mobileScale: 1.00 }] },
  { id: "/glass3.png", name: "Sport", price: "PKR 3,800", emoji: "🥽", sizes: [{ label: "L", scale: 1.15, mobileScale: 1.00 }] },
  { id: "/glass4.png", name: "Round", price: "PKR 4,900", emoji: "⭕", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
  { id: "/glass5.png", name: "Wayfarer", price: "PKR 4,900", emoji: "🕶️", sizes: [{ label: "L", scale: 1.25, mobileScale: 0.98 }] },
  { id: "/glass6.png", name: "Vintage", price: "PKR 4,900", emoji: "🪩", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
  { id: "/glass7.png", name: "Clubmaster", price: "PKR 4,900", emoji: "🔲", sizes: [{ label: "XL", scale: 1.30, mobileScale: 1.10 }] },
  { id: "/glass8.png", name: "Cat Eye", price: "PKR 4,900", emoji: "😼", sizes: [{ label: "XL", scale: 1.30, mobileScale: 1.10 }] },
  { id: "/glass9.png", name: "Shield", price: "PKR 4,900", emoji: "🛡️", sizes: [{ label: "M", scale: 1.00, mobileScale: 0.75 }] },
  { id: "/glass10.png", name: "Oval", price: "PKR 4,900", emoji: "🥚", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
  { id: "/glass11.png", name: "Square", price: "PKR 4,900", emoji: "⬛", sizes: [{ label: "S", scale: 0.75, mobileScale: 0.50 }] },
  { id: "/glass12.png", name: "Hexagonal", price: "PKR 4,900", emoji: "⬡", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
  { id: "/glass13.png", name: "Geometric", price: "PKR 4,900", emoji: "🔷", sizes: [{ label: "M", scale: 1.00, mobileScale: 0.75 }] },
  { id: "/glass14.png", name: "Steampunk", price: "PKR 4,900", emoji: "⚙️", sizes: [{ label: "S", scale: 0.95, mobileScale: 0.50 }] },
  { id: "/glass15.png", name: "Sports Pro", price: "PKR 4,900", emoji: "🏃", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
  { id: "/glass16.png", name: "Retro", price: "PKR 4,900", emoji: "🎞️", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
  { id: "/glass17.png", name: "Modern", price: "PKR 4,900", emoji: "✨", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
  { id: "/glass18.png", name: "Luxury", price: "PKR 4,900", emoji: "💎", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
  { id: "/glass19.png", name: "Designer", price: "PKR 4,900", emoji: "🎨", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
  { id: "/glass20.png", name: "Classic II", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
  { id: "/glass21.png", name: "Classic III", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "M", scale: 1.00, mobileScale: 0.75 }] },
  { id: "/glass22.png", name: "Classic IV", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.05, mobileScale: 0.95 }] },
  { id: "/glass23.png", name: "Classic V", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
  { id: "/glass24.png", name: "Classic VI", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "S", scale: 0.85, mobileScale: 0.50 }] },
  { id: "/glass25.png", name: "Classic VII", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
  { id: "/glass26.png", name: "Classic VIII", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
  { id: "/glass27.png", name: "Classic IX", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
  { id: "/glass28.png", name: "Classic X", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "M", scale: 1.00, mobileScale: 0.75 }] },
  { id: "/glass29.png", name: "Classic XI", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.25, mobileScale: 0.95 }] },
  { id: "/glass30.png", name: "Classic XII", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
  { id: "/glass31.png", name: "Classic 31", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
  { id: "/glass32.png", name: "Classic 32", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
  { id: "/glass33.png", name: "Classic 33", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
  { id: "/glass34.png", name: "Classic 34", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
  { id: "/glass35.png", name: "Classic 35", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "M", scale: 1.10, mobileScale: 0.75 }] },
  { id: "/glass36.png", name: "Classic 36", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
  { id: "/glass37.png", name: "Classic 37", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
  { id: "/glass38.png", name: "Classic 38", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "XL", scale: 1.30, mobileScale: 1.10 }] },
  { id: "/glass39.png", name: "Classic 39", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
  { id: "/glass40.png", name: "Classic 40", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "M", scale: 1.00, mobileScale: 0.75 }] },
  { id: "/glass41.png", name: "Classic 41", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
  { id: "/glass42.png", name: "Classic 42", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "S", scale: 0.95, mobileScale: 0.50 }] },
  { id: "/glass43.png", name: "Classic 43", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
  { id: "/glass44.png", name: "Classic 44", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
  { id: "/glass45.png", name: "Classic 45", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "XL", scale: 1.30, mobileScale: 1.10 }] },
  { id: "/glass46.png", name: "Classic 46", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "XL", scale: 1.40, mobileScale: 1.10 }] },
  { id: "/glass47.png", name: "Classic 47", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "XL", scale: 1.20, mobileScale: 1.10 }] },
  { id: "/glass48.png", name: "Classic 48", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "M", scale: 1.00, mobileScale: 0.75 }] },
  { id: "/glass49.png", name: "Classic 49", price: "PKR 4,900", emoji: "Glasses", sizes: [{ label: "L", scale: 1.15, mobileScale: 0.95 }] },
];

// ─── Device helpers ────────────────────────────────────────────────────────────
const getIsMobile = () =>
  typeof window !== "undefined" &&
  (window.innerWidth < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

const getSizeScale = (sizeObj, mobile) =>
  sizeObj ? (mobile ? (sizeObj.mobileScale ?? sizeObj.scale) : sizeObj.scale) : 1;

// ─── Timing constants ──────────────────────────────────────────────────────────
const MOBILE_FPS = 30;
const MOBILE_FRAME_INT = 1000 / MOBILE_FPS;

const DESKTOP_CAM_W = 1280;
const DESKTOP_CAM_H = 720;
const DESKTOP_CANVAS_W = 1280;
const DESKTOP_CANVAS_H = 720;

// ─── Beauty passthrough (neutral) ─────────────────────────────────────────────
const BEAUTY_B = 100, BEAUTY_C = 100, BEAUTY_S = 100;

// ─── Landmark indices ─────────────────────────────────────────────────────────
const LANDMARKS = {
  LEFT_IRIS_CENTER: 468,
  RIGHT_IRIS_CENTER: 473,
  LEFT_EYE_OUTER: 33,
  RIGHT_EYE_OUTER: 263,
  LEFT_EYE_INNER: 133,
  RIGHT_EYE_INNER: 362,
  LEFT_EYE_TOP: [159, 160, 161],
  RIGHT_EYE_TOP: [386, 387, 388],
  LEFT_EYEBROW_LOWER: [70, 63, 105, 66, 107],
  RIGHT_EYEBROW_LOWER: [300, 293, 334, 296, 336],
  NOSE_BRIDGE_TOP: 6,
  LEFT_FACE_EDGE: 234,
  RIGHT_FACE_EDGE: 454,
};

class FaceGeoSmoother {
  constructor({ posAlpha, scaleAlpha, rotAlpha, maxPosDelta = 60, maxScaleDelta = 0.15 }) {
    this.posAlpha = posAlpha;
    this.scaleAlpha = scaleAlpha;
    this.rotAlpha = rotAlpha;
    this.maxPosDelta = maxPosDelta;
    this.maxScaleDelta = maxScaleDelta;
    this.prev = null;
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
      cx: this._step(p.cx, cur.cx, this.posAlpha, this.maxPosDelta, deadzone),
      cy: this._step(p.cy, cur.cy, this.posAlpha, this.maxPosDelta, deadzone),
      gw: this._step(p.gw, cur.gw, this.scaleAlpha, this.maxPosDelta, 0),
      gh: this._step(p.gh, cur.gh, this.scaleAlpha, this.maxPosDelta, 0),
      angle: this._step(p.angle, cur.angle, this.rotAlpha, 0.18, 0),
      ds: this._step(p.ds, cur.ds, this.scaleAlpha, this.maxScaleDelta, 0),
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

  const leftEyeOut = px(LANDMARKS.LEFT_EYE_OUTER);
  const rightEyeOut = px(LANDMARKS.RIGHT_EYE_OUTER);
  const leftEyeIn = px(LANDMARKS.LEFT_EYE_INNER);
  const rightEyeIn = px(LANDMARKS.RIGHT_EYE_INNER);
  const noseBridgeTop = px(LANDMARKS.NOSE_BRIDGE_TOP);
  const leftBrowLower = avgPx(LANDMARKS.LEFT_EYEBROW_LOWER);
  const rightBrowLower = avgPx(LANDMARKS.RIGHT_EYEBROW_LOWER);

  let leftIris, rightIris;
  if (useIris && lm.length > 473) {
    leftIris = px(LANDMARKS.LEFT_IRIS_CENTER);
    rightIris = px(LANDMARKS.RIGHT_IRIS_CENTER);
  } else {
    leftIris = {
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

  const irisY = (leftIris.y + rightIris.y) / 2;
  const centerX = (leftIris.x + rightIris.x) / 2;
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
  const glassesWidth = eyeSpan * 1.60 * spanMult;
  const glassesHeight = eyeSpan * 0.90 * spanMult;

  const avgZ = (leftIris.z + rightIris.z + (noseBridgeTop.z ?? 0)) / 3;

  // Slightly reduced depth scaling for mobile to avoid vertical exaggeration
  const depthScale = Math.max(0.70, Math.min(1.55, 1 + (-avgZ * 2.5)));
  return { centerX, centerY, angle, glassesWidth, glassesHeight, depthScale };
}

// ─── Theme ────────────────────────────────────────────────────────────────────
const C = {
  primary: "#E87F24",
  accent: "#73A5CA",
  bg: "#FEFDDF",
  surface: "#F5F3C7",
  text: "#1E293B",
  primary12: "rgba(232,127,36,0.12)",
  primary20: "rgba(232,127,36,0.20)",
  primary25: "rgba(232,127,36,0.25)",
  primary30: "rgba(232,127,36,0.30)",
  primary40: "rgba(232,127,36,0.40)",
  accent12: "rgba(115,165,202,0.12)",
  accent20: "rgba(115,165,202,0.20)",
  accent28: "rgba(115,165,202,0.28)",
  text55: "rgba(30,41,59,0.55)",
  text30: "rgba(30,41,59,0.30)",
  text12: "rgba(30,41,59,0.12)",
  text06: "rgba(30,41,59,0.06)",
  glassBg: "rgba(254,253,223,0.65)",
  glassBorder: "rgba(255,255,255,0.70)",
  surfaceBorder: "rgba(255,255,255,0.85)",
  white15: "rgba(255,255,255,0.15)",
  white08: "rgba(255,255,255,0.08)",
  gradPrimary: "linear-gradient(135deg, #E87F24, #F5A623)",
  gradPrimaryTx: "linear-gradient(135deg, #F5A623, #E87F24)",
  gradBg: `
    radial-gradient(ellipse 60% 50% at 80% 10%, rgba(232,127,36,0.13) 0%, transparent 60%),
    radial-gradient(ellipse 50% 40% at 10% 80%, rgba(115,165,202,0.12) 0%, transparent 55%),
    #FEFDDF
  `,
};

const glassPill = {
  borderRadius: 100,
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
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
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(new Image());
  const rafIdRef = useRef(null);
  const lastFrameRef = useRef(0);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const cameraRdyRef = useRef(false);
  const glassesRef = useRef("/glass1.png");
  const adjRef = useRef({});
  const pendingResultRef = useRef(null);
  const camStreamRef = useRef(null);
  const camInstanceRef = useRef(null);
  const cachedGlassRef = useRef(null);
  const ctxRef = useRef(null);
  const resultVersionRef = useRef(0);
  const lastDrawnVersionRef = useRef(-1);

  const [isMobile, setIsMobile] = useState(() => getIsMobile());
  const isMobileRef = useRef(isMobile);
  const [videoDims, setVideoDims] = useState(null); // for mobile only

  useEffect(() => {
    const onResize = () => {
      const m = getIsMobile();
      isMobileRef.current = m;
      setIsMobile(m);
      ctxRef.current = null;
      // On mobile, when orientation changes, we need to re-read video dimensions
      if (m && videoRef.current && videoRef.current.videoWidth) {
        const vw = videoRef.current.videoWidth;
        const vh = videoRef.current.videoHeight;
        if (canvasRef.current && vw && vh) {
          canvasRef.current.width = vw;
          canvasRef.current.height = vh;
          setVideoDims({ w: vw, h: vh });
          ctxRef.current = null;
        }
      } else if (!m && canvasRef.current) {
        canvasRef.current.width = DESKTOP_CANVAS_W;
        canvasRef.current.height = DESKTOP_CANVAS_H;
        ctxRef.current = null;
      }
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const smootherRef = useRef(null);
  if (!smootherRef.current) {
    smootherRef.current = isMobile
      ? new FaceGeoSmoother({
          posAlpha: 0.38,
          scaleAlpha: 1.0,
          rotAlpha: 0.22,
          maxPosDelta: 48,
          maxScaleDelta: 5.0,
        })
      : new FaceGeoSmoother({
          posAlpha: 0.45,
          scaleAlpha: 1.0,
          rotAlpha: 0.30,
          maxPosDelta: 60,
          maxScaleDelta: 5.0,
        });
  }

  const [glasses, setGlasses] = useState("/glass1.png");
  const [cameraReady, setCameraReady] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [mpError, setMpError] = useState(null);

  const brightnessRef = useRef(100);
  const contrastRef = useRef(100);
  const saturateRef = useRef(100);
  useEffect(() => { brightnessRef.current = brightness; }, [brightness]);
  useEffect(() => { contrastRef.current = contrast; }, [contrast]);
  useEffect(() => { saturateRef.current = saturate; }, [saturate]);

  const adjustmentsRef = useRef(
    Object.fromEntries(GLASS_OPTIONS.map(g => {
      if (g.id === "/glass2.png") return [g.id, { ...AVIATOR_ADJ }];
      if (g.id === "/glass4.png") return [g.id, { ...ROUND_ADJ }];
      return [g.id, { ...DEFAULT_ADJ }];
    }))
  );
  const [adjUIState, setAdjUIState] = useState(() => adjustmentsRef.current["/glass1.png"]);

  useEffect(() => {
    glassesRef.current = glasses;
    adjRef.current = adjustmentsRef.current;
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
      id === "/glass4.png" ? { ...ROUND_ADJ } : { ...DEFAULT_ADJ };
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
    const now = performance.now();
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

    const lm = result.multiFaceLandmarks[0];
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
    const sSc = glassObj?.sizes?.[0] ? getSizeScale(glassObj.sizes[0], mobile) : 1.0;
    const adj = adjRef.current[glassesRef.current] || DEFAULT_ADJ;

    let w = sm.gw * adj.scaleW;
    let h = sm.gh * adj.scaleH;
    w *= geo.depthScale;
    h *= geo.depthScale;

    w *= sSc; h *= sSc;

    w = Math.max(20, Math.min(W * 0.95, w));
    h = Math.max(8, Math.min(H * 0.60, h));

    const mirroredAngle = -sm.angle;

    const halfW = w * 0.5;
    const halfH = h * 0.5;
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

  // ── Camera + FaceMesh init (fixed for mobile) ───────────────────────────────
  useEffect(() => {
    if (!window.FaceMesh) {
      setMpError("MediaPipe FaceMesh not found. Add the MediaPipe <script> tag to index.html.");
      return;
    }

    const mobile = isMobileRef.current;

    const faceMesh = new window.FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/${file}`,
    });
    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: !mobile,
      minDetectionConfidence: mobile ? 0.40 : 0.50,
      minTrackingConfidence: mobile ? 0.35 : 0.50,
    });
    faceMesh.onResults(onResults);

    rafIdRef.current = requestAnimationFrame(drawLoop);

    // Request camera with minimal constraints; we'll read actual dimensions later
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: mobile ? { ideal: 640 } : { ideal: DESKTOP_CAM_W },
        height: mobile ? { ideal: 480 } : { ideal: DESKTOP_CAM_H },
        frameRate: { ideal: mobile ? 30 : 60 },
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

            // --- Set canvas dimensions to actual video source size (critical for mobile) ---
            if (mobile) {
              const vw = video.videoWidth;
              const vh = video.videoHeight;
              if (canvasRef.current && vw && vh) {
                canvasRef.current.width = vw;
                canvasRef.current.height = vh;
                setVideoDims({ w: vw, h: vh });
                ctxRef.current = null;
              }
            } else {
              if (canvasRef.current) {
                canvasRef.current.width = DESKTOP_CANVAS_W;
                canvasRef.current.height = DESKTOP_CANVAS_H;
                ctxRef.current = null;
              }
            }

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
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
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
  }, [drawLoop, onResults]); // no need to re-run on mobile flag change, it's stable after mount

  // ── CSS (unchanged) ─────────────────────────────────────────────────────────
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

    .lens-ring__circle:active {
      transform: scale(0.82) !important;
      transition: transform 0.10s ease !important;
    }

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
  const curAdj = adjUIState;

  // ══════════════════════════════════════════════════════════════
  // MOBILE LAYOUT – FIXED: canvas uses object-fit: contain
  // ══════════════════════════════════════════════════════════════
  if (isMobile) {
    const idx = GLASS_OPTIONS.findIndex(g => g.id === glasses);
    const CIRCLE_SIZE_ACTIVE = 58;
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
        if (dx > 0 && cur > 0) setGlasses(GLASS_OPTIONS[cur - 1].id);
      }
      touchStartX.current = null;
      touchStartY.current = null;
    };

    return (
      <div
        style={{ position: "fixed", inset: 0, background: "#000", fontFamily: "'Space Grotesk',sans-serif", color: "#fff", overflow: "hidden", touchAction: "pan-y" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <style>{css}</style>
        <video ref={videoRef} style={{ position: "absolute", left: "-100%", top: "-100%", width: "1px", height: "1px", opacity: 0, pointerEvents: "none" }} autoPlay playsInline muted />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",   // ← KEY FIX: no stretching
            display: "block",
            background: "black"
          }}
          aria-label="AR glasses try-on camera view"
        />

        {/* Top vignette */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "22%", background: "linear-gradient(to bottom, rgba(0,0,0,0.50), transparent)", pointerEvents: "none" }} aria-hidden="true" />

        {/* AR tracking indicator */}
        {cameraReady && (
          <div role="status" aria-live="polite" style={{
            position: "absolute", top: 18, left: 16, zIndex: 20,
            display: "flex", alignItems: "center",
            background: "rgba(0,0,0,0.42)", ...glassPill,
            border: `1px solid rgba(115,165,202,0.30)`,
            padding: "5px 12px", animation: "fadeIn 0.35s ease",
          }}>
            <span className="ar-dot" aria-hidden="true" />
            <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.80)", letterSpacing: "0.5px" }}>Tracking</span>
          </div>
        )}

        {/* Frame name + price */}
        {cameraReady && currentGlass && (
          <div aria-live="polite" style={{
            position: "absolute", bottom: 158, left: "50%", transform: "translateX(-50%)",
            zIndex: 20, whiteSpace: "nowrap",
            background: "rgba(0,0,0,0.48)", ...glassPill,
            border: `1px solid ${C.primary25}`,
            padding: "7px 20px",
            display: "flex", alignItems: "center", gap: 10,
            animation: "fadeIn 0.3s ease",
            boxShadow: `0 4px 20px rgba(0,0,0,0.25), 0 0 20px ${C.primary12}`,
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(254,253,223,0.95)" }}>{currentGlass.name}</span>
            <span aria-hidden="true" style={{ width: 1, height: 11, background: C.primary30, display: "inline-block" }} />
            <span style={{ fontSize: 13, fontWeight: 700, background: C.gradPrimary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {currentGlass.price}
            </span>
          </div>
        )}

        {/* Progress dots */}
        {cameraReady && (
          <div aria-hidden="true" style={{ position: "absolute", bottom: 140, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 4, zIndex: 20 }}>
            {GLASS_OPTIONS.map((g, i) => (
              <div key={g.id} style={{
                width: i === idx ? 14 : 4, height: 4, borderRadius: 3,
                background: i === idx ? C.primary : C.white15,
                transition: "all 0.25s ease",
              }} />
            ))}
          </div>
        )}

        {/* Snapchat-style ring carousel */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 20,
          paddingBottom: "env(safe-area-inset-bottom, 10px)",
          background: "linear-gradient(to top, rgba(8,4,1,0.97) 50%, rgba(8,4,1,0.80) 75%, transparent 100%)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 20px 2px" }}>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "2px", color: "rgba(254,253,223,0.30)", textTransform: "uppercase" }}>Frames</span>
            <span style={{ fontSize: 9, color: "rgba(254,253,223,0.25)" }} aria-live="polite">{idx + 1} / {GLASS_OPTIONS.length}</span>
          </div>

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
                  <div
                    className="lens-ring__circle"
                    style={{
                      width: circleSize,
                      height: circleSize,
                      background: isA
                        ? "radial-gradient(circle at 35% 35%, rgba(232,127,36,0.22), rgba(10,5,2,0.90))"
                        : "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.07), rgba(10,5,2,0.82))",
                    }}
                  >
                    <div className="lens-ring__glow-ring" aria-hidden="true" />
                    <img
                      src={g.id}
                      alt={g.name}
                      loading="lazy"
                      className="lens-ring__img"
                    />
                  </div>
                  <span className="lens-ring__label">{g.name}</span>
                  <div className="lens-ring__dot" aria-hidden="true" />
                </div>
              );
            })}
          </div>
        </div>

        {!cameraReady && (
          <div role="status" aria-label="Initializing camera" style={{
            position: "absolute", inset: 0, zIndex: 50,
            background: `radial-gradient(ellipse 120% 80% at 55% 30%, rgba(232,127,36,0.08) 0%, rgba(10,5,2,0.99) 60%)`,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24,
          }}>
            <div style={{ position: "relative", width: 44, height: 44 }}>
              <div className="spinner" />
              <div className="spinner-inner" />
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 6, background: C.gradPrimary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                VR.OPTICS
              </div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "3px", color: C.primary, marginBottom: 8 }}>INITIALIZING</div>
              <div style={{ fontSize: 10, color: "rgba(254,253,223,0.40)" }}>Allow camera access to continue</div>
            </div>
            <div style={{ fontSize: 9, color: "rgba(254,253,223,0.22)", border: `0.5px solid rgba(255,255,255,0.10)`, borderRadius: 100, padding: "4px 14px" }}>
              ← Swipe to browse frames →
            </div>
          </div>
        )}
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════
  // DESKTOP LAYOUT (unchanged)
  // ══════════════════════════════════════════════════════════════
  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: C.gradBg, color: C.text, height: "100vh", display: "flex", overflow: "hidden" }}>
      <style>{css}</style>

      {/* Ambient glow */}
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "-15%", right: "-8%", width: "52vw", height: "52vw", borderRadius: "50%",
          background: `radial-gradient(circle, rgba(232,127,36,0.14) 0%, rgba(232,127,36,0.04) 45%, transparent 70%)`
        }} />
        <div style={{
          position: "absolute", bottom: "-20%", left: "-12%", width: "48vw", height: "48vw", borderRadius: "50%",
          background: `radial-gradient(circle, rgba(115,165,202,0.12) 0%, rgba(115,165,202,0.03) 45%, transparent 70%)`
        }} />
      </div>

      {/* ── LEFT: Camera (75%) ── */}
      <div style={{ position: "relative", zIndex: 1, flex: "0 0 75%", maxWidth: "75%", padding: 20, display: "flex", flexDirection: "column" }}>
        <div style={{
          flex: 1, position: "relative", borderRadius: 22, overflow: "hidden",
          border: `1px solid ${C.glassBorder}`, background: "#000",
          boxShadow: `inset 0 0 60px rgba(0,0,0,0.40), 0 0 0 1px rgba(232,127,36,0.08), 0 8px 40px rgba(30,41,59,0.12)`,
        }}>
          {cameraReady && (
            <div role="status" aria-live="polite" style={{
              position: "absolute", top: 16, right: 16, zIndex: 5,
              display: "flex", alignItems: "center",
              background: "rgba(0,0,0,0.42)", ...glassPill,
              border: `1px solid rgba(115,165,202,0.28)`,
              padding: "5px 14px", animation: "fadeIn 0.3s ease",
            }}>
              <span className="ar-dot" aria-hidden="true" />
              <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.80)", letterSpacing: "0.5px" }}>Face Tracking Active</span>
            </div>
          )}

          {/* Selected frame badge */}
          <div style={{ position: "absolute", bottom: 16, left: 16, zIndex: 5 }}>
            <div aria-live="polite" style={{
              background: "rgba(0,0,0,0.52)", ...glassPill,
              border: `0.5px solid ${C.primary25}`, padding: "8px 20px",
              boxShadow: `0 4px 20px rgba(0,0,0,0.25), 0 0 16px ${C.primary12}`,
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(254,253,223,0.50)", letterSpacing: "1.5px" }}>SELECTED</span>
              <span aria-hidden="true" style={{ width: 1, height: 11, background: C.primary30, display: "inline-block" }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(254,253,223,0.95)" }}>{currentGlass?.name}</span>
              <span style={{ fontSize: 13, fontWeight: 700, background: C.gradPrimary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {currentGlass?.price}
              </span>
            </div>
          </div>

          <video ref={videoRef} style={{ position: "absolute", left: "-100%", top: "-100%", width: "1px", height: "1px", opacity: 0, pointerEvents: "none" }} autoPlay playsInline muted />
          <canvas
            ref={canvasRef}
            width={DESKTOP_CANVAS_W}
            height={DESKTOP_CANVAS_H}
            aria-label="AR glasses try-on camera view"
            style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
          />

          {!cameraReady && (
            <div role="status" aria-label="Initializing camera" style={{
              position: "absolute", inset: 0, borderRadius: 22, zIndex: 30,
              background: `radial-gradient(ellipse 100% 60% at 55% 30%, rgba(232,127,36,0.08) 0%, rgba(254,253,223,0.97) 55%)`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28,
            }}>
              <div style={{ position: "relative", width: 50, height: 50 }}>
                <div className="spinner" />
                <div className="spinner-inner" />
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "3px",
                  background: C.gradPrimary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8
                }}>
                  INITIALIZING CAMERA
                </div>
                <div style={{ fontSize: 12, color: C.text55 }}>Please allow camera access to continue</div>
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
          position: "relative", zIndex: 1,
          flex: "0 0 25%", maxWidth: "25%",
          overflowY: "auto",
          padding: "20px 16px 20px 4px",
          display: "flex", flexDirection: "column", gap: 12,
          borderLeft: `1px solid ${C.glassBorder}`,
          background: `linear-gradient(180deg, rgba(245,243,199,0.60) 0%, rgba(254,253,223,0.80) 100%)`,
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div style={{ padding: "4px 4px 2px" }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 3 }}>
            Choose Frame
          </div>
          <div style={{ fontSize: 10, letterSpacing: "1.5px", color: C.text30, fontWeight: 600, textTransform: "uppercase" }}>
            {GLASS_OPTIONS.length} styles available
          </div>
        </div>

        <div role="listbox" aria-label="Select glasses frame" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
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
                  borderRadius: 14,
                  background: isA ? C.primary12 : "rgba(254,253,223,0.55)",
                  border: `1px solid ${isA ? C.primary : C.surfaceBorder}`,
                  padding: "10px 6px",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
                  cursor: "pointer",
                  boxShadow: isA ? `0 0 20px rgba(232,127,36,0.20), 0 4px 12px rgba(30,41,59,0.08)` : `0 1px 4px ${C.text06}`,
                  transition: "all 0.22s cubic-bezier(0.22,1,0.36,1)",
                  backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                }}
              >
                <div style={{
                  width: "100%", height: 48,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 10, overflow: "hidden",
                  background: isA ? C.primary12 : C.text06,
                }}>
                  <img
                    src={g.id}
                    alt={g.name}
                    loading="lazy"
                    crossOrigin="anonymous"
                    style={{
                      width: "90%", height: "90%", objectFit: "contain",
                      filter: isA ? `drop-shadow(0 0 5px rgba(232,127,36,0.55))` : "brightness(0.80) saturate(0.75)",
                      transition: "filter 0.2s ease",
                    }}
                  />
                </div>
                <div style={{ fontSize: 9, fontWeight: 700, textAlign: "center", lineHeight: 1.2, color: isA ? C.text : C.text55 }}>
                  {g.name}
                </div>
                <div style={{
                  fontSize: 8, fontWeight: 700,
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
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
            <button
              onClick={resetAdj}
              aria-label="Reset frame calibration to defaults"
              style={{
                fontSize: 9, fontWeight: 700, color: C.primary,
                background: C.primary12, border: `0.5px solid ${C.primary25}`,
                padding: "5px 14px", borderRadius: 100, cursor: "pointer",
                letterSpacing: "0.5px", transition: "background 0.15s",
              }}
            >Reset</button>
          </div>
          <SliderRow label="WIDTH" value={curAdj.scaleW} min={0.3} max={3} step={0.05} onChange={v => setAdj("scaleW", v)} fmt={v => `${v.toFixed(2)}×`} />
          <SliderRow label="HEIGHT" value={curAdj.scaleH} min={0.3} max={3} step={0.05} onChange={v => setAdj("scaleH", v)} fmt={v => `${v.toFixed(2)}×`} />
          <SliderRow label="MOVE L/R" value={curAdj.offsetX} min={-150} max={150} step={1} onChange={v => setAdj("offsetX", v)} fmt={v => `${v > 0 ? "+" : ""}${v}px`} />
          <SliderRow label="MOVE U/D" value={curAdj.offsetY} min={-150} max={150} step={1} onChange={v => setAdj("offsetY", v)} fmt={v => `${v > 0 ? "+" : ""}${v}px`} />
          <SliderRow label="ROTATION" value={curAdj.rotate} min={-30} max={30} step={0.5} onChange={v => setAdj("rotate", v)} fmt={v => `${v > 0 ? "+" : ""}${v.toFixed(1)}°`} />
        </Section>

        <Section title="SCENE FILTERS" icon="🎨">
          <SliderRow label="BRIGHTNESS" value={brightness} min={50} max={160} step={1} onChange={setBrightness} fmt={v => `${v}%`} />
          <SliderRow label="CONTRAST" value={contrast} min={60} max={160} step={1} onChange={setContrast} fmt={v => `${v}%`} />
          <SliderRow label="SATURATION" value={saturate} min={50} max={160} step={1} onChange={setSaturate} fmt={v => `${v}%`} />
        </Section>
      </div>
    </div>
  );
};

export default TryOn;


