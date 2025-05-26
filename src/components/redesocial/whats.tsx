"use client";

import React, { useState, useRef } from "react";

export default function Whatsapp() {
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const phoneNumber = "5511999999999"; // Seu telefone
  const message = encodeURIComponent(
    "Olá! Gostaria de saber mais sobre os produtos e formas de pagamento."
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  // Mostrar tooltip com delay para toque (mobile)
  const handleTouchStart = () => {
    setShowTooltip(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowTooltip(false), 2000);
  };

  return (
    <>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
        aria-describedby="whatsapp-tooltip"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        onTouchStart={handleTouchStart}
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
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          cursor: "pointer",
          zIndex: 10000,
          textDecoration: "none",
          transition: "background-color 0.3s ease",
          outline: "none",
          border: "none",
        }}
        onMouseDown={(e) => e.preventDefault()} // evita foco estranho no clique
      >
        {/* SVG oficial WhatsApp */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="white"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M20.52 3.48A11.859 11.859 0 0012 0C5.373 0 0 5.373 0 12a11.91 11.91 0 001.624 6.002L0 24l6.232-1.595A11.951 11.951 0 0012 24c6.627 0 12-5.373 12-12a11.85 11.85 0 00-3.48-8.52zM12 21.5c-1.799 0-3.565-.498-5.08-1.437l-.363-.22-3.7.948.988-3.6-.236-.376A8.457 8.457 0 013.5 12c0-4.694 3.806-8.5 8.5-8.5 2.276 0 4.41.89 6.002 2.504a8.44 8.44 0 012.5 6.002c0 4.694-3.806 8.5-8.5 8.5z" />
          <path d="M17.548 14.174c-.297-.148-1.758-.867-2.031-.967-.273-.1-.472-.148-.67.149-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.148-1.255-.463-2.39-1.48-.883-.787-1.48-1.76-1.654-2.057-.173-.297-.018-.458.13-.606.134-.134.297-.347.446-.52.149-.173.198-.297.298-.495.1-.198.05-.371-.025-.52-.075-.148-.67-1.611-.916-2.203-.242-.579-.488-.5-.67-.51l-.57-.01c-.198 0-.52.074-.792.371s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.148.198 2.095 3.2 5.077 4.487.709.306 1.26.489 1.69.625.71.227 1.356.195 1.867.118.57-.085 1.758-.719 2.006-1.412.248-.694.248-1.288.173-1.412-.075-.124-.273-.198-.57-.347z" />
        </svg>

        {/* Tooltip */}
        {showTooltip && (
          <div
            id="whatsapp-tooltip"
            role="tooltip"
            style={{
              position: "absolute",
              bottom: 70,
              right: "50%",
              transform: "translateX(50%)",
              backgroundColor: "rgba(0,0,0,0.85)",
              color: "#fff",
              padding: "8px 14px",
              borderRadius: 6,
              fontSize: 14,
              whiteSpace: "nowrap",
              userSelect: "none",
              pointerEvents: "none",
              opacity: showTooltip ? 1 : 0,
              transition: "opacity 0.3s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              zIndex: 10001,
              fontWeight: "500",
            }}
          >
            Fale conosco pelo WhatsApp!
          </div>
        )}
      </a>
    </>
  );
}
