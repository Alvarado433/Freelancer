"use client";
import React from "react";

const products = [
  {
    id: 1,
    name: "Produto 1",
    description: "Descrição rápida e atrativa do produto 1.",
    price: "R$ 49,90",
    image: "/img/produto1.jpg",
  },
  {
    id: 2,
    name: "Produto 2",
    description: "Descrição rápida e atrativa do produto 2.",
    price: "R$ 79,90",
    image: "/img/produto2.jpg",
  },
  {
    id: 3,
    name: "Produto 3",
    description: "Descrição rápida e atrativa do produto 3.",
    price: "R$ 39,90",
    image: "/img/produto3.jpg",
  },
  {
    id: 4,
    name: "Produto 4",
    description: "Descrição rápida e atrativa do produto 4.",
    price: "R$ 59,90",
    image: "/img/produto4.jpg",
  },
  {
    id: 5,
    name: "Produto 5",
    description: "Descrição rápida e atrativa do produto 5.",
    price: "R$ 69,90",
    image: "/img/produto5.jpg",
  },
  {
    id: 6,
    name: "Produto 6",
    description: "Descrição rápida e atrativa do produto 6.",
    price: "R$ 89,90",
    image: "/img/produto6.jpg",
  },
];

const chunkArray = (arr: any[], size: number) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const Vendidos = () => {
  const slides = chunkArray(products, 2);

  return (
    <section className="section-container">
      <div className="container">
        <h2 className="section-title">Mais Vendidos da Semana</h2>

        <div
          id="carouselVendidos"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="5000"
        >
          <div className="carousel-inner">
            {slides.map((group, idx) => (
              <div
                key={idx}
                className={`carousel-item${idx === 0 ? " active" : ""}`}
              >
                <div className="row justify-content-center g-4">
                  {group.map((product) => (
                    <div
                      key={product.id}
                      className="col-lg-4 col-md-6 col-6 d-flex align-items-stretch"
                    >
                      <div className="card product-card d-flex flex-column shadow-sm">
                        <div className="img-wrapper">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="card-img-top"
                          />
                        </div>
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title">{product.name}</h5>
                          <p className="card-text">{product.description}</p>
                          <span className="price-tag">{product.price}</span>
                          <button className="btn btn-buy mt-auto">
                            Comprar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselVendidos"
            data-bs-slide="prev"
            aria-label="Anterior"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselVendidos"
            data-bs-slide="next"
            aria-label="Próximo"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
          </button>
        </div>

        <div className="text-center mt-5">
          <button className="btn btn-more-sellers shadow">
            Ver todos os mais vendidos
          </button>
        </div>
      </div>

      <style jsx>{`
        .section-container {
          background: #fff;
          padding: 5rem 0 6rem;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
        }

        .container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .section-title {
          text-align: center;
          font-weight: 800;
          font-size: 2.75rem;
          color: #212529;
          margin-bottom: 3rem;
          letter-spacing: -0.02em;
        }

        .product-card {
          border-radius: 16px;
          background: #f9f9f9;
          border: none;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          overflow: hidden;
        }

        .product-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 40px rgba(0, 0, 0, 0.12);
          background: #fff;
        }

        .img-wrapper {
          overflow: hidden;
          border-bottom: 1px solid #eaeaea;
          height: 220px;
        }

        .card-img-top {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .product-card:hover .card-img-top {
          transform: scale(1.08);
        }

        .card-body {
          padding: 1.5rem 1.5rem 2rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .card-title {
          font-weight: 700;
          font-size: 1.5rem;
          color: #0d6efd;
          margin-bottom: 0.6rem;
        }

        .card-text {
          font-size: 1rem;
          color: #6c757d;
          margin-bottom: 1rem;
        }

        .price-tag {
          font-weight: 700;
          font-size: 1.4rem;
          color: #198754;
          margin-bottom: 1.5rem;
          display: block;
        }

        .btn-buy {
          background-color: #0d6efd;
          color: white;
          border: none;
          border-radius: 50px;
          padding: 0.65rem 2rem;
          font-weight: 600;
          font-size: 1.1rem;
          align-self: center;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .btn-buy:hover {
          background-color: #0843c9;
        }

        .btn-more-sellers {
          background-color: #0d6efd;
          color: white;
          border: none;
          border-radius: 50px;
          padding: 0.85rem 3rem;
          font-size: 1.25rem;
          font-weight: 700;
          transition: box-shadow 0.3s ease, background-color 0.3s ease;
        }

        .btn-more-sellers:hover {
          box-shadow: 0 12px 35px rgba(13, 110, 253, 0.4);
          background-color: #0843c9;
        }

        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.3));
          width: 2.5rem;
          height: 2.5rem;
        }

        @media (max-width: 991px) {
          .img-wrapper {
            height: 180px;
          }
          .card-title {
            font-size: 1.35rem;
          }
          .price-tag {
            font-size: 1.2rem;
          }
          .btn-buy {
            font-size: 1rem;
            padding: 0.55rem 1.8rem;
          }
        }

        @media (max-width: 575px) {
          .img-wrapper {
            height: 140px;
          }
          .card-title {
            font-size: 1.1rem;
          }
          .price-tag {
            font-size: 1.1rem;
          }
          .btn-buy {
            padding: 0.5rem 1.3rem;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Vendidos;
