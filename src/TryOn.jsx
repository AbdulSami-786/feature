import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

const FACE_MESH_SCRIPT =
  "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js";

const FACE_MESH_ASSET_PATH =
  "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh";

const LENS_OPTIONS = [
  {
    id: "natural-hazel",
    name: "Natural Hazel",
    color: "#9b6a2f",
    ring: "#3a2414",
    price: "PKR 4,800",
  },
  {
    id: "crystal-gray",
    name: "Crystal Gray",
    color: "#aeb6bd",
    ring: "#35404a",
    price: "PKR 5,200",
  },
  {
    id: "ocean-blue",
    name: "Ocean Blue",
    color: "#4aa3ff",
    ring: "#123455",
    price: "PKR 5,500",
  },
  {
    id: "emerald-green",
    name: "Emerald Green",
    color: "#2fbf71",
    ring: "#0d3b24",
    price: "PKR 5,900",
  },
  {
    id: "honey-brown",
    name: "Honey Brown",
    color: "#c9822b",
    ring: "#4a2b10",
    price: "PKR 4,900",
  },
  {
    id: "violet-dream",
    name: "Violet Dream",
    color: "#8f65ff",
    ring: "#302050",
    price: "PKR 6,300",
  },
];

const LEFT_IRIS = [468, 469, 470, 471, 472];
const RIGHT_IRIS = [473, 474, 475, 476, 477];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const oldScript = document.querySelector(`script[src="${src}"]`);
    if (oldScript) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

function getIrisData(landmarks, irisIndexes, width, height) {
  const points = irisIndexes
    .map((index) => landmarks[index])
    .filter(Boolean)
    .map((point) => ({
      x: point.x * width,
      y: point.y * height,
    }));

  if (points.length < 4) return null;

  const center = points.reduce(
    (acc, point) => ({
      x: acc.x + point.x / points.length,
      y: acc.y + point.y / points.length,
    }),
    { x: 0, y: 0 }
  );

  const maxDistance = points.reduce((max, point) => {
    const dx = point.x - center.x;
    const dy = point.y - center.y;
    return Math.max(max, Math.sqrt(dx * dx + dy * dy));
  }, 0);

  return {
    x: center.x,
    y: center.y,
    radius: clamp(maxDistance * 1.9, 9, 38),
  };
}

function drawLens(ctx, iris, lens, settings) {
  if (!iris) return;

  const radius = iris.radius * settings.size;
  const gradient = ctx.createRadialGradient(
    iris.x,
    iris.y,
    radius * 0.08,
    iris.x,
    iris.y,
    radius
  );

  gradient.addColorStop(0, "rgba(255,255,255,0.16)");
  gradient.addColorStop(0.28, lens.color);
  gradient.addColorStop(0.72, lens.color);
  gradient.addColorStop(1, lens.ring);

  ctx.save();
  ctx.globalAlpha = settings.opacity;
  ctx.globalCompositeOperation = "multiply";

  ctx.beginPath();
  ctx.arc(iris.x, iris.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = settings.opacity * 0.75;

  ctx.beginPath();
  ctx.arc(iris.x, iris.y, radius, 0, Math.PI * 2);
  ctx.lineWidth = Math.max(1.5, radius * 0.11);
  ctx.strokeStyle = lens.ring;
  ctx.stroke();

  ctx.globalAlpha = settings.opacity * 0.5;
  for (let i = 0; i < 26; i += 1) {
    const angle = (Math.PI * 2 * i) / 26;
    const inner = radius * 0.28;
    const outer = radius * 0.88;

    ctx.beginPath();
    ctx.moveTo(iris.x + Math.cos(angle) * inner, iris.y + Math.sin(angle) * inner);
    ctx.lineTo(iris.x + Math.cos(angle) * outer, iris.y + Math.sin(angle) * outer);
    ctx.lineWidth = 0.9;
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.stroke();
  }

  ctx.globalAlpha = 0.95;
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(iris.x, iris.y, radius * settings.pupil, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export default function TryOn() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const faceMeshRef = useRef(null);
  const frameRef = useRef(null);
  const latestLandmarksRef = useRef(null);
  const lastSendRef = useRef(0);

  const [cameraReady, setCameraReady] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [selectedLensId, setSelectedLensId] = useState(LENS_OPTIONS[0].id);
  const [settings, setSettings] = useState({
    size: 1,
    opacity: 0.72,
    pupil: 0.34,
    brightness: 100,
    contrast: 108,
    saturation: 112,
  });

  const selectedLens = useMemo(
    () => LENS_OPTIONS.find((lens) => lens.id === selectedLensId) || LENS_OPTIONS[0],
    [selectedLensId]
  );

  const updateSetting = useCallback((key, value) => {
    setSettings((current) => ({
      ...current,
      [key]: Number(value),
    }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings({
      size: 1,
      opacity: 0.72,
      pupil: 0.34,
      brightness: 100,
      contrast: 108,
      saturation: 112,
    });
  }, []);

  const capturePhoto = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `lens-tryon-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, []);

  useEffect(() => {
    let mounted = true;

    async function setup() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: CANVAS_WIDTH },
            height: { ideal: CANVAS_HEIGHT },
            facingMode: "user",
          },
          audio: false,
        });

        if (!mounted) return;

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        setCameraReady(true);
      } catch (error) {
        setCameraError("Camera permission failed. Allow camera access and reload.");
      }

      try {
        await loadScript(FACE_MESH_SCRIPT);

        if (!mounted || !window.FaceMesh) return;

        const faceMesh = new window.FaceMesh({
          locateFile: (file) => `${FACE_MESH_ASSET_PATH}/${file}`,
        });

        faceMesh.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.65,
          minTrackingConfidence: 0.65,
        });

        faceMesh.onResults((results) => {
          latestLandmarksRef.current =
            results.multiFaceLandmarks && results.multiFaceLandmarks.length
              ? results.multiFaceLandmarks[0]
              : null;
        });

        faceMeshRef.current = faceMesh;
        setModelReady(true);
      } catch (error) {
        setCameraError("Face tracking failed to load. Check internet/CDN access.");
      }
    }

    setup();

    return () => {
      mounted = false;

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      if (faceMeshRef.current && faceMeshRef.current.close) {
        faceMeshRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!video || !canvas || !ctx) return;

    let running = true;

    async function render(time) {
      if (!running) return;

      const videoReady = video.readyState >= 2;

      ctx.save();
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      if (videoReady) {
        ctx.translate(CANVAS_WIDTH, 0);
        ctx.scale(-1, 1);
        ctx.filter = `brightness(${settings.brightness}%) contrast(${settings.contrast}%) saturate(${settings.saturation}%)`;
        ctx.drawImage(video, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.filter = "none";
        ctx.restore();

        if (faceMeshRef.current && modelReady && time - lastSendRef.current > 45) {
          lastSendRef.current = time;
          try {
            await faceMeshRef.current.send({ image: video });
          } catch (error) {
            // Ignore dropped frames.
          }
        }

        const landmarks = latestLandmarksRef.current;

        if (landmarks) {
          const mirroredLandmarks = landmarks.map((point) => ({
            ...point,
            x: 1 - point.x,
          }));

          const leftIris = getIrisData(
            mirroredLandmarks,
            LEFT_IRIS,
            CANVAS_WIDTH,
            CANVAS_HEIGHT
          );

          const rightIris = getIrisData(
            mirroredLandmarks,
            RIGHT_IRIS,
            CANVAS_WIDTH,
            CANVAS_HEIGHT
          );

          drawLens(ctx, leftIris, selectedLens, settings);
          drawLens(ctx, rightIris, selectedLens, settings);
        }
      } else {
        ctx.restore();
        ctx.fillStyle = "#07070b";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      }

      frameRef.current = requestAnimationFrame(render);
    }

    frameRef.current = requestAnimationFrame(render);

    return () => {
      running = false;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [modelReady, selectedLens, settings]);

  return (
    <div style={styles.page}>
      <video ref={videoRef} muted playsInline autoPlay style={styles.hiddenVideo} />

      <main style={styles.shell}>
        <section style={styles.previewPanel}>
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            style={styles.canvas}
          />

          <div style={styles.topBar}>
            <div>
              <div style={styles.brand}>Lens Studio</div>
              <div style={styles.subBrand}>Virtual contact lens try-on</div>
            </div>

            <div style={styles.status}>
              <span
                style={{
                  ...styles.statusDot,
                  background: cameraReady && modelReady ? "#36d67a" : "#f4b942",
                }}
              />
              {cameraReady && modelReady ? "Live tracking" : "Loading"}
            </div>
          </div>

          <div style={styles.mobileLensBar}>
            {LENS_OPTIONS.map((lens) => (
              <button
                key={lens.id}
                type="button"
                onClick={() => setSelectedLensId(lens.id)}
                style={{
                  ...styles.mobileLensButton,
                  borderColor: selectedLensId === lens.id ? "#ffffff" : "rgba(255,255,255,.22)",
                }}
              >
                <span style={{ ...styles.colorDot, background: lens.color }} />
              </button>
            ))}
          </div>

          {(!cameraReady || !modelReady || cameraError) && (
            <div style={styles.loadingOverlay}>
              <div style={styles.loaderCard}>
                <div style={styles.spinner} />
                <h2 style={styles.loaderTitle}>
                  {cameraError ? "Setup problem" : "Starting try-on"}
                </h2>
                <p style={styles.loaderText}>
                  {cameraError || "Allow camera access. Keep your face centered."}
                </p>
              </div>
            </div>
          )}
        </section>

        <aside style={styles.controlPanel}>
          <div>
            <p style={styles.eyebrow}>SELECT LENS</p>
            <h1 style={styles.title}>Choose your lens color</h1>
            <p style={styles.description}>
              Clean UI, fast camera preview, adjustable opacity, size, pupil cutout,
              and scene filters.
            </p>
          </div>

          <div style={styles.selectedCard}>
            <div style={{ ...styles.selectedSwatch, background: selectedLens.color }} />
            <div>
              <h2 style={styles.selectedName}>{selectedLens.name}</h2>
              <p style={styles.selectedPrice}>{selectedLens.price}</p>
            </div>
          </div>

          <div style={styles.grid}>
            {LENS_OPTIONS.map((lens) => (
              <button
                key={lens.id}
                type="button"
                onClick={() => setSelectedLensId(lens.id)}
                style={{
                  ...styles.lensCard,
                  borderColor:
                    selectedLensId === lens.id
                      ? "rgba(255,255,255,.95)"
                      : "rgba(255,255,255,.12)",
                  background:
                    selectedLensId === lens.id
                      ? "rgba(255,255,255,.14)"
                      : "rgba(255,255,255,.055)",
                }}
              >
                <span style={{ ...styles.lensSwatch, background: lens.color }} />
                <strong style={styles.lensName}>{lens.name}</strong>
                <span style={styles.lensPrice}>{lens.price}</span>
              </button>
            ))}
          </div>

          <div style={styles.controls}>
            <Slider
              label="Lens size"
              value={settings.size}
              min="0.7"
              max="1.45"
              step="0.01"
              display={`${Math.round(settings.size * 100)}%`}
              onChange={(value) => updateSetting("size", value)}
            />
            <Slider
              label="Lens opacity"
              value={settings.opacity}
              min="0.25"
              max="1"
              step="0.01"
              display={`${Math.round(settings.opacity * 100)}%`}
              onChange={(value) => updateSetting("opacity", value)}
            />
            <Slider
              label="Pupil opening"
              value={settings.pupil}
              min="0.22"
              max="0.5"
              step="0.01"
              display={`${Math.round(settings.pupil * 100)}%`}
              onChange={(value) => updateSetting("pupil", value)}
            />
            <Slider
              label="Brightness"
              value={settings.brightness}
              min="70"
              max="140"
              step="1"
              display={`${settings.brightness}%`}
              onChange={(value) => updateSetting("brightness", value)}
            />
            <Slider
              label="Contrast"
              value={settings.contrast}
              min="70"
              max="150"
              step="1"
              display={`${settings.contrast}%`}
              onChange={(value) => updateSetting("contrast", value)}
            />
            <Slider
              label="Saturation"
              value={settings.saturation}
              min="70"
              max="160"
              step="1"
              display={`${settings.saturation}%`}
              onChange={(value) => updateSetting("saturation", value)}
            />
          </div>

          <div style={styles.actions}>
            <button type="button" onClick={resetSettings} style={styles.secondaryButton}>
              Reset
            </button>
            <button type="button" onClick={capturePhoto} style={styles.primaryButton}>
              Capture
            </button>
          </div>
        </aside>
      </main>

      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

        input[type="range"] {
          width: 100%;
          accent-color: #ffffff;
        }

        button {
          font-family: inherit;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 920px) {
          .desktop-only {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

function Slider({ label, value, min, max, step, display, onChange }) {
  return (
    <label style={styles.sliderWrap}>
      <div style={styles.sliderTop}>
        <span>{label}</span>
        <strong>{display}</strong>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background:
      "radial-gradient(circle at top left, #334155 0%, #0f172a 38%, #020617 100%)",
    color: "#ffffff",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    overflow: "hidden",
  },
  hiddenVideo: {
    display: "none",
  },
  shell: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 420px",
    gap: 20,
    padding: 20,
  },
  previewPanel: {
    position: "relative",
    minHeight: "calc(100vh - 40px)",
    borderRadius: 34,
    overflow: "hidden",
    background: "#000000",
    border: "1px solid rgba(255,255,255,.12)",
    boxShadow: "0 30px 90px rgba(0,0,0,.45)",
  },
  canvas: {
    width: "100%",
    height: "100%",
    minHeight: "calc(100vh - 40px)",
    display: "block",
    objectFit: "cover",
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background:
      "linear-gradient(to bottom, rgba(0,0,0,.68), rgba(0,0,0,.18), transparent)",
  },
  brand: {
    fontSize: 28,
    lineHeight: 1,
    fontWeight: 900,
    letterSpacing: "-0.05em",
  },
  subBrand: {
    marginTop: 8,
    fontSize: 13,
    color: "rgba(255,255,255,.68)",
    fontWeight: 600,
  },
  status: {
    display: "inline-flex",
    alignItems: "center",
    gap: 9,
    padding: "10px 14px",
    borderRadius: 999,
    background: "rgba(0,0,0,.48)",
    border: "1px solid rgba(255,255,255,.14)",
    backdropFilter: "blur(14px)",
    fontSize: 13,
    fontWeight: 800,
  },
  statusDot: {
    width: 9,
    height: 9,
    borderRadius: 999,
    boxShadow: "0 0 18px currentColor",
  },
  mobileLensBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    display: "flex",
    gap: 10,
    overflowX: "auto",
    padding: 12,
    borderRadius: 24,
    background: "rgba(0,0,0,.48)",
    border: "1px solid rgba(255,255,255,.14)",
    backdropFilter: "blur(18px)",
  },
  mobileLensButton: {
    flex: "0 0 auto",
    width: 50,
    height: 50,
    borderRadius: 999,
    border: "2px solid rgba(255,255,255,.22)",
    background: "rgba(255,255,255,.08)",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
  },
  colorDot: {
    width: 28,
    height: 28,
    borderRadius: 999,
    border: "2px solid rgba(255,255,255,.55)",
  },
  loadingOverlay: {
    position: "absolute",
    inset: 0,
    display: "grid",
    placeItems: "center",
    background: "rgba(2,6,23,.84)",
    backdropFilter: "blur(8px)",
  },
  loaderCard: {
    width: "min(360px, calc(100vw - 48px))",
    padding: 28,
    borderRadius: 28,
    textAlign: "center",
    background: "rgba(255,255,255,.08)",
    border: "1px solid rgba(255,255,255,.16)",
  },
  spinner: {
    width: 52,
    height: 52,
    margin: "0 auto 18px",
    borderRadius: "50%",
    border: "4px solid rgba(255,255,255,.18)",
    borderTopColor: "#ffffff",
    animation: "spin .8s linear infinite",
  },
  loaderTitle: {
    margin: 0,
    fontSize: 22,
    fontWeight: 900,
  },
  loaderText: {
    margin: "10px 0 0",
    color: "rgba(255,255,255,.7)",
    lineHeight: 1.5,
  },
  controlPanel: {
    minHeight: "calc(100vh - 40px)",
    maxHeight: "calc(100vh - 40px)",
    overflowY: "auto",
    borderRadius: 34,
    padding: 24,
    background: "rgba(255,255,255,.08)",
    border: "1px solid rgba(255,255,255,.14)",
    backdropFilter: "blur(22px)",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  eyebrow: {
    margin: 0,
    color: "rgba(255,255,255,.55)",
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: 2.6,
  },
  title: {
    margin: "8px 0 0",
    fontSize: 34,
    lineHeight: 1.05,
    letterSpacing: "-0.06em",
  },
  description: {
    margin: "12px 0 0",
    color: "rgba(255,255,255,.68)",
    fontSize: 14,
    lineHeight: 1.6,
  },
  selectedCard: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: 24,
    background: "rgba(255,255,255,.09)",
    border: "1px solid rgba(255,255,255,.14)",
  },
  selectedSwatch: {
    width: 54,
    height: 54,
    borderRadius: 999,
    border: "3px solid rgba(255,255,255,.5)",
    boxShadow: "0 14px 30px rgba(0,0,0,.28)",
  },
  selectedName: {
    margin: 0,
    fontSize: 18,
    fontWeight: 900,
  },
  selectedPrice: {
    margin: "4px 0 0",
    color: "rgba(255,255,255,.62)",
    fontSize: 13,
    fontWeight: 700,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 12,
  },
  lensCard: {
    minHeight: 116,
    padding: 14,
    borderRadius: 22,
    border: "1px solid rgba(255,255,255,.12)",
    color: "#ffffff",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
    textAlign: "left",
  },
  lensSwatch: {
    width: 34,
    height: 34,
    borderRadius: 999,
    border: "2px solid rgba(255,255,255,.48)",
  },
  lensName: {
    fontSize: 13,
    lineHeight: 1.2,
  },
  lensPrice: {
    color: "rgba(255,255,255,.58)",
    fontSize: 12,
    fontWeight: 700,
  },
  controls: {
    display: "grid",
    gap: 16,
    padding: 18,
    borderRadius: 24,
    background: "rgba(0,0,0,.18)",
    border: "1px solid rgba(255,255,255,.1)",
  },
  sliderWrap: {
    display: "grid",
    gap: 8,
  },
  sliderTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    color: "rgba(255,255,255,.72)",
    fontSize: 13,
    fontWeight: 800,
  },
  actions: {
    display: "grid",
    gridTemplateColumns: "1fr 1.5fr",
    gap: 12,
  },
  secondaryButton: {
    border: "1px solid rgba(255,255,255,.18)",
    background: "rgba(255,255,255,.08)",
    color: "#ffffff",
    borderRadius: 999,
    padding: "15px 18px",
    cursor: "pointer",
    fontWeight: 900,
  },
  primaryButton: {
    border: "none",
    background: "#ffffff",
    color: "#020617",
    borderRadius: 999,
    padding: "15px 18px",
    cursor: "pointer",
    fontWeight: 950,
    boxShadow: "0 14px 30px rgba(255,255,255,.18)",
  },
};