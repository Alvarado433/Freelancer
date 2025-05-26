"use client";

const produtosMaisVendidos = [
  {
    id: 1,
    name: "Produto A",
    description: "Descrição do Produto A, muito legal e útil.",
    price: "R$ 99,90",
    image: "https://via.placeholder.com/300x200?text=Produto+A",
  },
  {
    id: 2,
    name: "Produto B",
    description: "Descrição do Produto B, excelente qualidade.",
    price: "R$ 149,90",
    image: "https://via.placeholder.com/300x200?text=Produto+B",
  },
  {
    id: 3,
    name: "Produto C",
    description: "Descrição do Produto C, super recomendado.",
    price: "R$ 79,90",
    image: "https://via.placeholder.com/300x200?text=Produto+C",
  },
  {
    id: 4,
    name: "Produto D",
    description: "Descrição do Produto D, muito popular.",
    price: "R$ 119,90",
    image: "https://via.placeholder.com/300x200?text=Produto+D",
  },
  {
    id: 5,
    name: "Produto E",
    description: "Descrição do Produto E, qualidade premium.",
    price: "R$ 199,90",
    image: "https://via.placeholder.com/300x200?text=Produto+E",
  },
];

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export default function Vendidos() {
  const slides = chunkArray(produtosMaisVendidos, 3);

  return (
    <>
      <section className="section-container">
        <div className="container">
          <h2 className="section-title">Mais Vendidos da Semana</h2>

          <div
            id="carouselVendidos"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            {/* Indicadores */}
            <div className="carousel-indicators">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  data-bs-target="#carouselVendidos"
                  data-bs-slide-to={i}
                  className={i === 0 ? "active" : ""}
                  aria-current={i === 0 ? "true" : undefined}
                  aria-label={`Slide ${i + 1}`}
                ></button>
              ))}
            </div>

            {/* Slides */}
            <div className="carousel-inner">
              {slides.map((grupo, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <div className="slide-wrapper">
                    {grupo.map((product) => (
                      <article
                        key={product.id}
                        className="card product-card"
                        tabIndex={0}
                        aria-label={`${product.name} - ${product.price}`}
                      >
                        <div className="card-img-container">
                          <img
                            src={product.image}
                            className="card-img-top"
                            alt={product.name}
                            loading="lazy"
                          />
                        </div>
                        <div className="card-body">
                          <h3 className="card-title">{product.name}</h3>
                          <p className="card-text">{product.description}</p>
                          <span className="price-tag">{product.price}</span>
                          <button
                            className="btn btn-buy"
                            aria-label={`Comprar ${product.name}`}
                          >
                            Comprar
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Controles */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselVendidos"
              data-bs-slide="prev"
              aria-label="Slide anterior"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselVendidos"
              data-bs-slide="next"
              aria-label="Próximo slide"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .section-title {
          text-align: center;
          color: #ff4081;
          margin-bottom: 40px;
          font-weight: 900;
          font-size: 2.5rem;
          font-family: "Poppins", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          letter-spacing: 0.05em;
        }

        .section-container {
          padding: 50px 15px;
          background: #fff0f6;
        }

        .container {
          max-width: 960px;
          margin: 0 auto;
        }

        /* Wrapper do grupo de cards no slide */
        .slide-wrapper {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: nowrap;
          padding-bottom: 10px;
        }

        /* Card do produto */
        .product-card {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          border: 1px solid #e0e0e0;
          width: 250px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
          cursor: pointer;
          outline-offset: 3px;
        }

        .product-card:focus,
        .product-card:hover {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          border-color: #ff4081;
          transform: translateY(-4px);
          outline: none;
        }

        .card-img-container {
          height: 140px;
          overflow: hidden;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
          background: #fafafa;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .card-img-top {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .product-card:hover .card-img-top,
        .product-card:focus .card-img-top {
          transform: scale(1.05);
        }

        .card-body {
          padding: 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex-grow: 1;
        }

        .card-title {
          font-weight: 700;
          font-size: 1.2rem;
          color: #222;
          margin: 0;
          font-family: "Poppins", sans-serif;
          text-transform: capitalize;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-text {
          font-size: 0.9rem;
          color: #555;
          flex-grow: 1;
          margin: 0;
          font-family: "Open Sans", sans-serif;
          line-height: 1.3;
          height: 36px; /* limita a 2 linhas, com overflow */
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .price-tag {
          font-weight: 700;
          font-size: 1.3rem;
          color: #e91e63;
          font-family: "Poppins", sans-serif;
        }

        .btn-buy {
          margin-top: auto;
          background: #ff4081;
          border: none;
          color: white;
          font-weight: 600;
          padding: 10px 0;
          border-radius: 24px;
          box-shadow: 0 4px 12px rgba(255, 64, 129, 0.5);
          transition: background 0.3s ease, box-shadow 0.3s ease;
          font-size: 1rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          width: 100%;
          cursor: pointer;
        }

        .btn-buy:hover,
        .btn-buy:focus {
          background: #e91e63;
          box-shadow: 0 6px 18px rgba(233, 30, 99, 0.7);
          outline: none;
        }

        /* Carousel controls custom */
        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.3));
          width: 40px;
          height: 40px;
        }

        /* Responsividade */

        @media (max-width: 991px) {
          .slide-wrapper {
            gap: 18px;
          }

          .product-card {
            width: 45vw;
          }
        }

        @media (max-width: 576px) {
          .slide-wrapper {
            gap: 14px;
          }

          .product-card {
            width: 80vw;
          }

          /* Remove os indicadores para tela mobile para simplificar */
          .carousel-indicators {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
