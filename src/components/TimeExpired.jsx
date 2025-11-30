import React from "react";

export default function WinMessage({ show }) {
  if (!show) return null;

  const popupStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#cc2632", // rozul tău
    color: "white",
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    padding: "2rem 3rem",
    borderRadius: "50%",
    boxShadow: "0 0 20px rgba(0,0,0,0.3)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "popupScale 0.3s ease-in-out"
  };

  const keyframes = `
    @keyframes popupScale {
      0% { transform: translate(-50%, -50%) scale(0); }
      80% { transform: translate(-50%, -50%) scale(1.1); }
      100% { transform: translate(-50%, -50%) scale(1); }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={popupStyle}>
        TIMPUL A EXPIRAT!
      </div>
    </>
  );
}
