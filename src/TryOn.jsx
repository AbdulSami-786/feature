import React, { useRef, useEffect, useState } from "react";

const TryOn = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(new Image());

  const [glasses, setGlasses] = useState("/glass1.png");
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);

  const glassOptions = [
    { id: "/glass1.png", name: "Classic", price: "PKR 4,500", emoji: "👓" },
    { id: "/glass2.png", name: "Aviator", price: "PKR 5,200", emoji: "🕶️" },
    { id: "/glass3.png", name: "Sport",   price: "PKR 3,800", emoji: "🥽" },
    { id: "/glass4.png", name: "Round",   price: "PKR 4,900", emoji: "🪬" },
  ];

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
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%)`;
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      if (results.multiFaceLandmarks?.length > 0) {
        const landmarks = results.multiFaceLandmarks[0];
        const leftEye  = landmarks[33];
        const rightEye = landmarks[263];

        const centerX = ((leftEye.x + rightEye.x) / 2) * canvas.width;
        const centerY = ((leftEye.y + rightEye.y) / 2) * canvas.height;

        const dx = (rightEye.x - leftEye.x) * canvas.width;
        const dy = (rightEye.y - leftEye.y) * canvas.height;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        const img = imgRef.current;
        if (img.complete) {
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(angle);
          const width  = distance * 1.8;
          const height = width / 2.5;
          ctx.drawImage(img, -width / 2, -height / 2, width, height);
          ctx.restore();
        }
      }

      ctx.filter = "none";
    }
  }, [brightness, contrast, saturate]);

  useEffect(() => {
    imgRef.current.src = glasses;
  }, [glasses]);

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
        /* corner brackets */
        .opt-corner {
          position: absolute;
          width: 16px;
          height: 16px;
          border-color: rgba(201,168,76,0.6);
          border-style: solid;
          z-index: 2;
        }
        .opt-corner.tl { top: 10px; left: 10px;  border-width: 1.5px 0 0 1.5px; }
        .opt-corner.tr { top: 10px; right: 10px;  border-width: 1.5px 1.5px 0 0; }
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
          z-index: 2;
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
        /* filter pills */
        .opt-pills {
          position: absolute;
          bottom: 12px;
          left: 12px;
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          z-index: 2;
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
        }
        .opt-glass-card:hover { border-color: rgba(201,168,76,0.3); }
        .opt-glass-card.active {
          border-color: rgba(201,168,76,0.55);
          background: #1b1810;
        }
        .opt-glass-emoji { font-size: 22px; line-height: 1; }
        .opt-glass-name  { font-size: 11px; color: rgba(232,228,220,0.55); letter-spacing: 0.06em; }
        .opt-glass-price { font-size: 12px; color: #c9a84c; font-weight: 500; }

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
        .opt-capture-btn:hover { background: rgba(201,168,76,0.08); }
        .opt-capture-btn:active { background: rgba(201,168,76,0.14); }

        /* responsive */
        @media (max-width: 720px) {
          .opt-body { grid-template-columns: 1fr; }
          .opt-cam-panel { padding: 16px; border-right: none; border-bottom: 0.5px solid rgba(201,168,76,0.1); }
          .opt-sidebar { padding: 20px 16px; }
        }
      `}</style>

      <div className="opt-root">
        {/* Header */}
        <div className="opt-header">
          <div className="opt-brand">VR<span>.</span>OPTICS</div>
          <div className="opt-badge">LIVE PREVIEW</div>
        </div>

        <div className="opt-body">
          {/* Camera / Canvas */}
          <div className="opt-cam-panel">
            <div className="opt-canvas-wrap">
              <div className="opt-corner tl" />
              <div className="opt-corner tr" />
              <div className="opt-corner bl" />
              <div className="opt-corner br" />

              <div className="opt-live">
                <div className="opt-dot" />
                LIVE
              </div>

              <div className="opt-pills">
                <span className="opt-pill">BRIGHT {brightness}%</span>
                <span className="opt-pill">CONTRAST {contrast}%</span>
                <span className="opt-pill">SAT {saturate}%</span>
              </div>

              <video ref={videoRef} style={{ display: "none" }} />
              <canvas ref={canvasRef} width={640} height={480} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="opt-sidebar">
            {/* Frame selection */}
            <div>
              <div className="opt-section-label">SELECT FRAME</div>
              <div className="opt-glass-grid">
                {glassOptions.map((g) => (
                  <div
                    key={g.id}
                    className={`opt-glass-card ${glasses === g.id ? "active" : ""}`}
                    onClick={() => setGlasses(g.id)}
                  >
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
                  type="range"
                  className="opt-range"
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
                  type="range"
                  className="opt-range"
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
                  type="range"
                  className="opt-range"
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