"use client";
import React from "react";

const cupons = [
  { codigo: "FRETEGRATIS", descricao: "Frete grátis em compras acima de R$150", cor: "#d32f2f" },
  { codigo: "10%OFF", descricao: "10% de desconto à vista no Pix", cor: "#e91e63" },
  { codigo: "BOASVINDAS", descricao: "5% OFF na sua primeira compra", cor: "#c2185b" },
];

export default function Cupons() {
  const copiar = (codigo: string) => {
    navigator.clipboard.writeText(codigo);
    alert(`💖 Cupom ${codigo} copiado! 💖`);
  };

  return (
    <section className="cupons">
      <h2 className="titulo">Cupons para Celebrar o Amor 💌</h2>
      <div className="cupons-lista">
        {cupons.map((cupom, index) => (
          <div key={index} className="cupom-card" style={{ borderColor: cupom.cor }}>
            <div className="cupom-topo" style={{ backgroundColor: cupom.cor }}>
              <span className="icone-coracao" role="img" aria-label="coração">❤️</span>
              <strong>{cupom.codigo}</strong>
              <span className="icone-coracao" role="img" aria-label="coração">❤️</span>
            </div>
            <p>{cupom.descricao}</p>
            <button onClick={() => copiar(cupom.codigo)}>Copiar Cupom</button>
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

        .titulo {
          font-size: 2rem;
          color: #b71c1c;
          margin-bottom: 2.5rem;
          text-shadow: 1px 1px 3px #f8bbd0;
          font-weight: 700;
        }

        .cupons-lista {
          display: flex;
          flex-wrap: wrap;
          gap: 1.8rem;
          justify-content: center;
        }

        .cupom-card {
          background: #ffe6eb;
          border: 3px dashed;
          border-radius: 20px 20px 40px 20px;
          padding: 1.8rem 1.5rem 2.5rem;
          width: 280px;
          box-shadow: 0 8px 15px rgba(233, 30, 99, 0.3);
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .cupom-card:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 12px 20px rgba(233, 30, 99, 0.5);
        }

        .cupom-topo {
          background-color: #e91e63;
          color: white;
          font-size: 1.6rem;
          font-weight: 900;
          border-radius: 18px 18px 0 0;
          padding: 0.8rem 0;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.6rem;
          user-select: none;
        }

        .icone-coracao {
          font-size: 1.4rem;
          animation: batida 1.5s infinite ease-in-out;
        }

        @keyframes batida {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }

        p {
          margin: 1.5rem 0 2rem;
          font-size: 1rem;
          color: #880e4f;
          font-weight: 600;
          user-select: none;
        }

        button {
          background: #b71c1c;
          color: white;
          border: none;
          border-radius: 30px;
          padding: 0.6rem 1.6rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          transition: background-color 0.3s ease;
          cursor: pointer;
          user-select: none;
          box-shadow: 0 4px 8px rgba(183, 28, 28, 0.6);
        }

        button:hover {
          background-color: #f50057;
          box-shadow: 0 6px 12px rgba(245, 0, 87, 0.8);
        }

        @media (max-width: 576px) {
          .cupons-lista {
            flex-direction: column;
            align-items: center;
          }
          .cupom-card {
            width: 90%;
          }
        }
      `}</style>
    </section>
  );
}
