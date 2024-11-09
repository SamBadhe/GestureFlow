// src/components/HandCanvas.jsx
import React, { useEffect } from "react";

const HandCanvas = () => {
  useEffect(() => {
    const loadScripts = () => {
      if (!document.querySelector("script[src='https://cdn.jsdelivr.net/gh/TSedlar/pseudo-styler@1.0.8/pseudostyler.js']")) {
        const pseudoStylerScript = document.createElement("script");
        pseudoStylerScript.src = "https://cdn.jsdelivr.net/gh/TSedlar/pseudo-styler@1.0.8/pseudostyler.js";
        pseudoStylerScript.async = true;
        document.body.appendChild(pseudoStylerScript);
      }

      const handGestureScript = document.createElement("script");
      handGestureScript.type = "module";
      handGestureScript.src = `${process.env.PUBLIC_URL}/lib/index.js`; // Use PUBLIC_URL for correct path
      handGestureScript.async = true;
      document.body.appendChild(handGestureScript);

      return () => {
        const loadedPseudoStylerScript = document.querySelector("script[src='https://cdn.jsdelivr.net/gh/TSedlar/pseudo-styler@1.0.8/pseudostyler.js']");
        if (loadedPseudoStylerScript) document.body.removeChild(loadedPseudoStylerScript);
        document.body.removeChild(handGestureScript);
      };
    };

    loadScripts();
  }, []);

  return (
    <canvas
      id="hands"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 999,
        display: 'block',
      }}
    ></canvas>
  );
};

export default HandCanvas;
