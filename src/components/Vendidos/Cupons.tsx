"use client";
import React from "react";
import { FaHeart, FaCopy } from "react-icons/fa";

const cupons = [
  { valor: "R$150", codigo: "FRETEGRATIS", descricao: "Frete grátis em compras acima de R$150", cor: "#ec407a" },
  { valor: "10%", codigo: "10%OFF", descricao: "10% de desconto à vista no Pix", cor: "#f06292" },
  { valor: "5%", codigo: "BOASVINDAS", descricao: "5% OFF na sua primeira compra", cor: "#f48fb1" },
];

const faixas = [
  { texto: "Até", preco: "R$49,90" },
  { texto: "Até", preco: "R$99,90" },
  { texto: "Até", preco: "R$159,90" },
  { texto: "Até", preco: "R$199,90" },
  { texto: "A partir de", preco: "R$219,90" },
  { texto: "Não achou?", preco: "VALE-PRESENTE", subtitulo: "Clique aqui" },
];

export default function Cupons() {
  const copiar = (codigo: string) => {
    navigator.clipboard.writeText(codigo);
    alert(`💖 Cupom ${codigo} copiado! 💖`);
  };

  return (
    <section className="cupons">
      <div className="cupons-lista">
        {cupons.map((cupom, index) => (
          <div key={index} className="heart-container">
            {/* Faixa flutuante */}
            <div className="floating-badge">
              <span className="badge-text">
                {faixas[index]?.texto} <strong>{faixas[index]?.preco}</strong>
              </span>
            </div>

            <div className="heart" style={{ backgroundColor: cupom.cor }}>
              <FaHeart className="heart-icon" />
              <span className="valor">{cupom.valor}</span>
              <div className="popup">
                <strong>{cupom.codigo}</strong>
                <p>{cupom.descricao}</p>
                <button onClick={() => copiar(cupom.codigo)}>
                  <FaCopy style={{ marginRight: "0.3rem" }} /> Copiar Cupom
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .cupons {
          background: #fff0f6;
          padding: 3rem 1rem;
          text-align: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .cupons-lista {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          justify-content: center;
        }

        .heart-container {
          position: relative;
          width: 180px;
          height: 160px;
        }

        .floating-badge {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%) rotateX(20deg);
          background: #fff;
          color: #880e4f;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          font-size: 0.85rem;
          font-weight: bold;
          z-index: 3;
        }

        .badge-text strong {
          color: #d81b60;
        }

        .heart {
          width: 100%;
          height: 100%;
          clip-path: path("M90 130 L30 70 A30 30 0 1 1 90 40 A30 30 0 1 1 150 70 Z");
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: transform 0.3s ease;
          cursor: pointer;
        }

        .heart:hover {
          transform: rotate(-2deg) scale(1.05);
        }

        .heart-icon {
          position: absolute;
          font-size: 1.5rem;
          color: white;
          top: 10px;
          left: 10px;
        }

        .valor {
          font-size: 1.8rem;
          font-weight: 800;
          color: white;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
          z-index: 1;
        }

        .popup {
          position: absolute;
          bottom: -110px;
          left: 50%;
          transform: translateX(-50%);
          width: 220px;
          background: white;
          color: #880e4f;
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 2;
        }

        .heart:hover .popup {
          opacity: 1;
          pointer-events: auto;
        }

        .popup strong {
          display: block;
          font-size: 1rem;
          margin-bottom: 0.4rem;
        }

        .popup p {
          font-size: 0.9rem;
          margin-bottom: 0.6rem;
        }

        .popup button {
          background: #e91e63;
          color: white;
          border: none;
          border-radius: 20px;
          padding: 0.4rem 1rem;
          font-weight: bold;
          font-size: 0.85rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.3rem;
          transition: background-color 0.3s ease;
        }

        .popup button:hover {
          background-color: #ad1457;
        }

        @media (max-width: 576px) {
          .cupons-lista {
            flex-direction: column;
            align-items: center;
          }

          .popup {
            bottom: -120px;
          }
        }
      `}</style>
    </section>
  );
}
