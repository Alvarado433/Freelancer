"use client";
import React from "react";
import { FaCopy, FaTruck, FaPercent, FaGift } from "react-icons/fa";

const cupons = [
  {
    valor: "R$150",
    codigo: "FRETEGRATIS",
    descricao: "Frete grátis para compras acima de R$150",
    destaque: true,
    cor: "#d81b60",
    icone: <FaTruck />,
  },
  {
    valor: "10%",
    codigo: "10%OFF",
    descricao: "10% de desconto no pagamento via Pix",
    destaque: false,
    cor: "#ec407a",
    icone: <FaPercent />,
  },
  {
    valor: "5%",
    codigo: "BOASVINDAS",
    descricao: "5% OFF na sua primeira compra",
    destaque: false,
    cor: "#f48fb1",
    icone: <FaGift />,
  },
];

export default function BannerCupons() {
  const copiarCupom = (codigo: string) => {
    navigator.clipboard.writeText(codigo);
    alert(`🎉 Cupom "${codigo}" copiado com sucesso!`);
  };

  return (
    <section className="banner-cupons">
      <h2>Cupons e Promoções Especiais</h2>
      <div className="container">
        {cupons.map(({ valor, codigo, descricao, destaque, cor, icone }) => (
          <div
            key={codigo}
            className={`cupom ${destaque ? "destaque" : ""}`}
            style={{ borderColor: cor }}
            role="region"
            aria-label={`Cupom ${codigo}`}
          >
            <div className="valor" style={{ backgroundColor: cor }}>
              {icone}
              <span className="valor-texto">{valor}</span>
            </div>
            <div className="detalhes">
              <h3>{codigo}</h3>
              <p>{descricao}</p>
              <button
                onClick={() => copiarCupom(codigo)}
                aria-label={`Copiar cupom ${codigo}`}
              >
                <FaCopy /> Copiar
              </button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .banner-cupons {
          background: #fff0f6;
          padding: 3rem 1rem 2rem;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          user-select: none;
          text-align: center;
        }

        .banner-cupons h2 {
          color: #880e4f;
          margin-bottom: 1.8rem;
          font-weight: 900;
          font-size: 2rem;
          text-shadow: 1px 1px 2px rgba(216, 27, 96, 0.3);
        }

        .container {
          max-width: 960px;
          margin: 0 auto;
          display: flex;
          gap: 1.8rem;
          flex-wrap: wrap;
          justify-content: center;
          align-items: stretch;
        }

        .cupom {
          flex: 1 1 280px;
          display: flex;
          border: 3px solid;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(216, 27, 96, 0.1);
          background: #fff;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          outline-offset: 4px;
          outline-color: transparent;
          outline-style: solid;
        }

        .cupom:focus-visible {
          outline-color: #d81b60;
          box-shadow: 0 0 8px #d81b60;
        }

        .cupom:hover {
          transform: translateY(-6px);
          box-shadow: 0 14px 32px rgba(216, 27, 96, 0.3);
        }

        .valor {
          min-width: 110px;
          background-color: #d81b60;
          color: white;
          font-weight: 900;
          font-size: 2.2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem 1.5rem;
          user-select: text;
          border-top-left-radius: 16px;
          border-bottom-left-radius: 16px;
          gap: 0.6rem;
        }

        .valor svg {
          font-size: 2.8rem;
          filter: drop-shadow(0 0 3px rgba(255 255 255 / 0.8));
        }

        .destaque .valor {
          font-size: 2.8rem;
          background: linear-gradient(135deg, #d81b60 0%, #f48fb1 100%);
          box-shadow: 0 6px 22px rgba(216, 27, 96, 0.4);
        }

        .valor-texto {
          user-select: text;
        }

        .detalhes {
          padding: 1rem 1.8rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
        }

        .detalhes h3 {
          margin: 0 0 0.3rem;
          font-weight: 900;
          font-size: 1.3rem;
          color: #880e4f;
          user-select: text;
        }

        .detalhes p {
          margin: 0 0 1rem;
          font-size: 1rem;
          color: #ad1457;
          line-height: 1.4;
          user-select: text;
        }

        .detalhes button {
          align-self: flex-start;
          background-color: #d81b60;
          border: none;
          padding: 0.5rem 1.3rem;
          color: white;
          font-weight: 700;
          font-size: 1rem;
          border-radius: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: background-color 0.25s ease, box-shadow 0.25s ease;
          user-select: none;
          box-shadow: 0 3px 8px rgba(216, 27, 96, 0.3);
        }

        .detalhes button:hover,
        .detalhes button:focus-visible {
          background-color: #b0144c;
          box-shadow: 0 6px 14px rgba(176, 20, 76, 0.5);
          outline: none;
        }

        @media (max-width: 600px) {
          .container {
            flex-direction: column;
            gap: 1.5rem;
          }
          .cupom {
            flex: 1 1 100%;
          }
        }
      `}</style>
    </section>
  );
}
