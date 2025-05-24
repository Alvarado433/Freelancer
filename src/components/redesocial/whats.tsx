"use client";

import React, { useState } from "react";

export default function Whatsapp() {
  const [showTooltip, setShowTooltip] = useState(false);

  const phoneNumber = "5511999999999"; // Coloque o telefone com DDD e código do país (ex: 55 para Brasil)
  const message = encodeURIComponent(
    "Olá! Gostaria de saber mais sobre os produtos e formas de pagamento."
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "#25D366",
          borderRadius: "50%",
          width: 60,
          height: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
          cursor: "pointer",
          zIndex: 1000,
          textDecoration: "none",
        }}
      >
        {/* Ícone WhatsApp via Bootstrap Icons */}
        <i
          className="bi bi-whatsapp"
          style={{ color: "white", fontSize: 32 }}
          aria-hidden="true"
        ></i>

        {/* Tooltip */}
        {showTooltip && (
          <div
            style={{
              position: "absolute",
              bottom: 70,
              right: 0,
              backgroundColor: "#333",
              color: "white",
              padding: "6px 12px",
              borderRadius: 4,
              fontSize: 14,
              whiteSpace: "nowrap",
              userSelect: "none",
              pointerEvents: "none",
              opacity: 0.9,
            }}
          >
            Fale conosco pelo WhatsApp!
          </div>
        )}
      </a>
    </>
  );
}
