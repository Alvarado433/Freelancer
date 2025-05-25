"use client";
import React from "react";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
};

const products: Product[] = [
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

const chunkArray = (arr: Product[], size: number): Product[][] => {
  const result: Product[][] = [];
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
          data-bs-interval="6000"
        >
          <div className="carousel-inner">
            {slides.map((group, idx) => (
              <div
                key={idx}
                className={`carousel-item${idx === 0 ? " active" : ""}`}
              >
                <div className="row justify-content-center g-5">
                  {group.map((product) => (
                    <div
                      key={product.id}
                      className="col-lg-5 col-md-6 col-sm-10 d-flex align-items-stretch"
                    >
                      <div className="card product-card d-flex flex-column shadow-sm">
                        <div className="img-wrapper">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={400}
                            height={220}
                            className="card-img-top"
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                              borderTopLeftRadius: "16px",
                              borderTopRightRadius: "16px",
                            }}
                          />
                        </div>
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title">{product.name}</h5>
                          <p className="card-text">{product.description}</p>
                          <span className="price-tag">{product.price}</span>
                          <button className="btn btn-buy mt-auto" aria-label={`Comprar ${product.name}`}>
                            Comprar
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="buy-icon"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m5-9l-1.35 6.75a2 2 0 01-1.99 1.5H9.35a2 2 0 01-1.99-1.5L6 8"
                              />
                            </svg>
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
          background: linear-gradient(135deg, #fafafa 0%, #ffffff 100%);
          padding: 5rem 0 6rem;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
            sans-serif;
          color: #222;
        }

        .container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .section-title {
          text-align: center;
          font-weight: 900;
          font-size: 2.9rem;
          color: #1a1a1a;
          margin-bottom: 3rem;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.07);
        }

        .product-card {
          border-radius: 16px;
          background: #fff;
          border: 1px solid #e3e3e3;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 28px 40px rgba(0, 0, 0, 0.12);
          border-color: #0d6efd;
          background: #fefefe;
        }

        .img-wrapper {
          overflow: hidden;
          border-bottom: 1px solid #eaeaea;
          height: 220px;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          background: #f8f8f8;
          box-shadow: inset 0 0 10px #f0f0f0;
        }

        .card-img-top {
          transition: transform 0.4s ease;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
        }

        .product-card:hover .card-img-top {
          transform: scale(1.12);
        }

        .card-body {
          padding: 1.8rem 2rem 2rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .card-title {
          font-weight: 800;
          font-size: 1.6rem;
          color: #0d6efd;
          margin-bottom: 0.7rem;
          letter-spacing: -0.02em;
        }

        .card-text {
          font-size: 1.05rem;
          color: #6c757d;
          margin-bottom: 1.25rem;
          flex-grow: 1;
          line-height: 1.4;
        }

        .price-tag {
          font-weight: 900;
          font-size: 1.5rem;
          color: #198754;
          margin-bottom: 2rem;
          display: block;
          letter-spacing: 0.02em;
        }

        .btn-buy {
          background-color: #0d6efd;
          color: white;
          border: none;
          border-radius: 50px;
          padding: 0.75rem 2.25rem;
          font-weight: 700;
          font-size: 1.15rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.7rem;
          cursor: pointer;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 6px 12px rgba(13, 110, 253, 0.35);
          user-select: none;
        }

        .btn-buy:hover {
          background-color: #0843c9;
          box-shadow: 0 10px 18px rgba(8, 67, 201, 0.55);
        }

        .buy-icon {
          width: 1.25rem;
          height: 1.25rem;
          stroke-width: 2.5;
          stroke: white;
          transition: transform 0.3s ease;
        }

        .btn-buy:hover .buy-icon {
          transform: translateX(4px);
        }

        .btn-more-sellers {
          background-color: #0d6efd;
          color: white;
          border: none;
          border-radius: 50px;
          padding: 1rem 3.5rem;
          font-size: 1.3rem;
          font-weight: 800;
          transition: box-shadow 0.3s ease, background-color 0.3s ease;
          box-shadow: 0 8px 22px rgba(13, 110, 253, 0.4);
          user-select: none;
        }

        .btn-more-sellers:hover {
          box-shadow: 0 14px 45px rgba(8, 67, 201, 0.6);
          background-color: #0843c9;
        }

        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.25));
          width: 3rem;
          height: 3rem;
        }

        @media (max-width: 991px) {
          .img-wrapper {
            height: 180px;
          }
          .card-title {
            font-size: 1.45rem;
          }
          .price-tag {
            font-size: 1.3rem;
          }
          .btn-buy {
            font-size: 1.05rem;
            padding: 0.65rem 2rem;
          }
        }

        @media (max-width: 575px) {
          .img-wrapper {
            height: 140px;
          }
          .card-title {
            font-size: 1.15rem;
          }
          .price-tag {
            font-size: 1.15rem;
          }
          .btn-buy {
            padding: 0.55rem 1.5rem;
            font-size: 1rem;
          }
          .carousel-control-prev-icon,
          .carousel-control-next-icon {
            width: 2.2rem;
            height: 2.2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Vendidos;
