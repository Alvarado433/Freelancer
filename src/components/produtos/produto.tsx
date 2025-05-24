"use client";
import React, { useEffect, useState } from "react";

const produtos = [
  { id: 1, nome: "Camiseta Premium", preco: 79.9, imagem: "/img/camiseta.jpg", parcelas: "6x R$ 13,31 sem juros" },
  { id: 2, nome: "Tênis Confortável", preco: 199.99, imagem: "/img/tenis.jpg", parcelas: "6x R$ 33,33 sem juros" },
  { id: 3, nome: "Relógio Moderno", preco: 299.9, imagem: "/img/relogio.jpg", parcelas: "6x R$ 49,98 sem juros" },
  { id: 4, nome: "Mochila Casual", preco: 149.5, imagem: "/img/mochila.jpg", parcelas: "6x R$ 24,91 sem juros" },
  { id: 5, nome: "Jaqueta Estilosa", preco: 249.99, imagem: "/img/jaqueta.jpg", parcelas: "6x R$ 41,66 sem juros" },
  { id: 6, nome: "Boné Fashion", preco: 59.99, imagem: "/img/bone.jpg", parcelas: "6x R$ 10,00 sem juros" },
];

function chunkArray<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}

export default function Produtos() {
  const [itemsPorSlide, setItemsPorSlide] = useState(3);
  const [grupos, setGrupos] = useState(chunkArray(produtos, itemsPorSlide));

  useEffect(() => {
    function atualizarItemsPorSlide() {
      const largura = window.innerWidth;
      if (largura < 576) {
        setItemsPorSlide(1);
      } else if (largura < 992) {
        setItemsPorSlide(2);
      } else {
        setItemsPorSlide(3);
      }
    }

    atualizarItemsPorSlide();
    window.addEventListener("resize", atualizarItemsPorSlide);
    return () => window.removeEventListener("resize", atualizarItemsPorSlide);
  }, []);

  useEffect(() => {
    setGrupos(chunkArray(produtos, itemsPorSlide));
  }, [itemsPorSlide]);

  return (
    <section className="produtos">
      <h2 className="section-title">Melhores Produtos</h2>

      <div id="carouselProdutos" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {grupos.map((grupo, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <div className="row justify-content-center g-4">
                {grupo.map((produto) => (
                  <div key={produto.id} className="col-10 col-sm-6 col-md-4 d-flex justify-content-center">
                    <div className="produto-card">
                      <img src={produto.imagem} alt={produto.nome} className="produto-img" />
                      <div className="produto-info">
                        <div className="estrelas">★★★★★</div>
                        <h5>{produto.nome}</h5>
                        <div className="preco">R$ {produto.preco.toFixed(2).replace(".", ",")}</div>
                        <div className="parcelas">{produto.parcelas}</div>
                        <button className="btn-sacola">ADICIONAR À SACOLA</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselProdutos" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselProdutos" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
          <span className="visually-hidden">Próximo</span>
        </button>
      </div>

      <div className="ver-todos">
        <a href="/Produtos" className="btn btn-outline-danger">
          Ver todos os produtos
        </a>
      </div>

      <style jsx>{`
        .produtos {
          padding: 4rem 1rem;
          background: #fff;
        }

        .section-title {
          text-align: center;
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 3rem;
        }

        .produto-card {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s;
          padding: 1rem;
          width: 100%;
          max-width: 280px;
          text-align: center;
        }

        .produto-card:hover {
          transform: translateY(-5px);
        }

        .produto-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 8px;
        }

        .produto-info {
          margin-top: 1rem;
        }

        .estrelas {
          color: #f5a623;
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        .produto-info h5 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .preco {
          font-size: 1.3rem;
          font-weight: bold;
          color: #e60023;
        }

        .parcelas {
          font-size: 0.9rem;
          color: #555;
          margin-bottom: 0.8rem;
        }

        .btn-sacola {
          background-color: #e60023;
          color: #fff;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .btn-sacola:hover {
          background-color: #c1001b;
        }

        .ver-todos {
          text-align: center;
          margin-top: 2rem;
        }
      `}</style>
    </section>
  );
}
