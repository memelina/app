import React, { useState, useEffect } from "react";
import { getProducts, decrementProduct, assignPrizeToPlayer } from "./api.js";
import { useNavigate } from "react-router-dom";

export default function ChoosePrize({ playerData, setPlayerData, setGameActive }) {
  const [products, setProducts] = useState([]);
  const [hasChosen, setHasChosen] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts);
    };
    fetchProducts();
  }, []);

  const handleChoose = async (id) => {
    if (hasChosen) return;

    const updated = await decrementProduct(id);
    if (!updated) {
      alert("Stoc epuizat!");
      return;
    }

    setProducts(prev => prev.map(p => p.id === id ? updated : p));
    setHasChosen(true);
    setSelectedPrize(updated);

    if (playerData?.id) {
      await assignPrizeToPlayer(playerData.id, updated.name);
    }
  };

  const handleRestart = () => {
    setPlayerData(null);
    setGameActive(false);
    navigate("/");
  };

  const availableProducts = products.filter(p => p.quantity > 0);
  const rows = [3, 2, 3];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "1rem",
        boxSizing: "border-box",
        backgroundColor: "#cc2632",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          padding: "2rem",
          borderRadius: "1rem",
          backgroundColor: "white",
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          boxSizing: "border-box",
        }}
      >
       <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "#cc2632" }}>
  Felicitări!
  <br />
  Alege-ți premiul:
</h2>


        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
          {(() => {
            let startIndex = 0;
            return rows.map((count, rowIndex) => {
              const rowProducts = availableProducts.slice(startIndex, startIndex + count);
              startIndex += count;
              return (
                <div
                  key={rowIndex}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "0rem",
                    flexWrap: "wrap",
                  }}
                >
                  {rowProducts.map(p => (
                   <button
  key={p.id}
  onClick={() => handleChoose(p.id)}
  disabled={hasChosen}
  style={{
    width: "100%",
    maxWidth: "180px",
    aspectRatio: "1 / 1",
    border: "4px solid #cc2632",
    borderRadius: "1rem",
    backgroundColor: "white",
    cursor: hasChosen ? "not-allowed" : "pointer",
    opacity: hasChosen ? 0.5 : 1,
    transform: "scale(0.75)",     // micșorat la 75%
    transformOrigin: "center",    // centrul rămâne fix
  }}
>
  
  <img
    src={`/prizes/${p.name}.png`}
    alt={p.name}
    style={{ maxWidth: "100%", maxHeight: "100%" }}
  />
</button>

                  ))}
                </div>
              );
            });
          })()}
        </div>


        {/* Popup premiu */}
        {selectedPrize && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: "1rem",
              boxSizing: "border-box",
            }}
            onClick={() => setSelectedPrize(null)}
          >
            <div
              style={{
                background: "white",
                borderRadius: "1rem",
                width: "100%",
                maxWidth: "300px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 0 30px rgba(0,0,0,0.3)",
                cursor: "default",
              }}
              onClick={e => e.stopPropagation()}
            >
              <h2 style={{ marginBottom: "10px", color: "#cc2632" }}>Felicitări!</h2>
              <p style={{ marginBottom: "15px" }}>
                Ai câștigat un premiu de la <strong>{selectedPrize.store}</strong> 🎉
              </p>
              <img
                src={`/prizes/${selectedPrize.name}.png`}
                alt={selectedPrize.name}
                style={{ maxWidth: "80%", height: "auto", marginBottom: "15px" }}
              />
              <button
                  onClick={() => {
    setSelectedPrize(null);
    handleRestart();
  }}
                style={{
                  padding: "8px 16px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#cc2632",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Închide
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
