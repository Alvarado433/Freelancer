"use client";

import React, { useState, useEffect } from "react";

const vantagens = [
  "🚚 Frete para todo Brasil",
  "💳 Parcelamento em até 12x sem juros",
  "💬 Atendimento via WhatsApp",
  "🎁 Produtos exclusivos para alunas",
];

export default function BannerVantagens() {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((antigo) => (antigo + 1) % vantagens.length);
    }, 4000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="vantagens-banner" aria-live="polite" aria-atomic="true">
      <div className="vantagens-container">
        <strong className="titulo">Vantagens para Clientes:</strong>
        <p key={indice} className="mensagem" role="alert">
          {vantagens[indice]}
        </p>
      </div>

      <style jsx>{`
        .vantagens-banner {
          background: linear-gradient(90deg, #e0f3ff, #f0f8ff);
          padding: 1rem 0.5rem;
          width: 100%;
          text-align: center;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          box-shadow: 0 2px 6px rgba(0, 123, 255, 0.15);
        }

        .vantagens-container {
          max-width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        .titulo {
          color: #0d6efd;
          font-size: 1.1rem;
          font-weight: 700;
        }

        .mensagem {
          font-size: 1.1rem;
          color: #333;
          transition: opacity 0.4s ease;
          min-height: 1.5em;
        }

        @media (max-width: 575px) {
          .titulo,
          .mensagem {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
