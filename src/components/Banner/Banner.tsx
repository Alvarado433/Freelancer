"use client";
import React, { useState, useEffect, JSX } from "react";

interface BannerItem {
  src: string;
  alt: string;
  ctaText: string;
  ctaLink: string;
}

const banners: BannerItem[] = [
  {
    src: "/img/logotipo2.jpeg",
    alt: "Banner 1",
    ctaText: "Escolha o presente ideal para o seu amor!",
    ctaLink: "#dia-dos-namorados",
  },
  {
    src: "/img/logotipo3.jpeg",
    alt: "Banner 2",
    ctaText: "Presentes especiais para momentos inesquecíveis!",
    ctaLink: "#dia-dos-namorados",
  },
  {
    src: "https://picsum.photos/id/1019/1200/500",
    alt: "Banner 3",
    ctaText: "Surpreenda quem você ama com nossos produtos temáticos!",
    ctaLink: "#dia-dos-namorados",
  },
];

export default function Banner(): JSX.Element {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => setCurrent(index);
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev + 1) % banners.length);

  return (
    <div className="banner-wrapper">
      <div className="slide-wrapper">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`slide ${index === current ? "active" : ""}`}
          >
            {index === current && (
              <>
                <img src={banner.src} alt={banner.alt} className="slide-image" />
                <div className="cta-box" role="region" aria-label="Chamada para ação">
                  <p>{banner.ctaText}</p>
                  <a href={banner.ctaLink} className="cta-button" tabIndex={0}>
                    Ver presentes
                  </a>
                </div>
              </>
            )}
          </div>
        ))}

        <button
          className="control prev"
          onClick={prevSlide}
          aria-label="Anterior"
          type="button"
        >
          &#10094;
        </button>
        <button
          className="control next"
          onClick={nextSlide}
          aria-label="Próximo"
          type="button"
        >
          &#10095;
        </button>
      </div>

      <div className="indicators">
        {banners.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            role="button"
            tabIndex={0}
            aria-label={`Ir para slide ${index + 1}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") goToSlide(index);
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .banner-wrapper {
          width: 100%;
          position: relative;
        }

        .slide-wrapper {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 65%;
          background-color: #f7f7f7;
          overflow: hidden;
          border-radius: 12px;
        }

        .slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.6s ease-in-out;
        }

        .slide.active {
          opacity: 1;
          z-index: 1;
        }

        .slide-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          display: block;
        }

        /* CTA Box centralizado na parte inferior/média do banner */
        .cta-box {
          position: absolute;
          left: 50%;
          top: 75%;
          transform: translate(-50%, -50%);
          max-width: 360px;
          background: rgba(255 255 255 / 0.75);
          border-radius: 12px;
          padding: 18px 28px;
          box-shadow: 0 4px 15px rgb(0 0 0 / 0.15);
          color: #333;
          font-family: "Poppins", sans-serif;
          user-select: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: center;
        }

        .cta-box p {
          font-size: 1.3rem;
          font-weight: 700;
          line-height: 1.3;
          margin: 0;
          color: #ff4081;
          text-shadow: 0 1px 3px rgba(255, 64, 129, 0.5);
        }

        .cta-button {
          background-color: #ff4081;
          color: white;
          font-weight: 600;
          padding: 10px 22px;
          border-radius: 24px;
          text-align: center;
          text-decoration: none;
          font-size: 1rem;
          box-shadow: 0 5px 15px rgba(255, 64, 129, 0.5);
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          user-select: none;
        }

        .cta-button:hover,
        .cta-button:focus {
          background-color: #e91e63;
          box-shadow: 0 8px 20px rgba(233, 30, 99, 0.7);
          outline: none;
        }

        .control {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 2rem;
          background-color: rgba(255, 255, 255, 0.7);
          color: #333;
          border: none;
          padding: 0.4rem 0.8rem;
          cursor: pointer;
          border-radius: 50%;
          z-index: 2;
          transition: background-color 0.3s;
          user-select: none;
        }

        .control:hover,
        .control:focus {
          background-color: rgba(255, 255, 255, 0.9);
          outline: none;
        }

        .control.prev {
          left: 10px;
        }

        .control.next {
          right: 10px;
        }

        .indicators {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 0.8rem;
          user-select: none;
        }

        .dot {
          width: 10px;
          height: 10px;
          background-color: #ccc;
          border-radius: 50%;
          cursor: pointer;
          transition: background-color 0.3s ease;
          display: inline-block;
        }

        .dot.active {
          background-color: #ff4f81;
        }

        @media (max-width: 768px) {
          .slide-wrapper {
            padding-bottom: 65%;
          }

          .slide-image {
            object-fit: contain;
            background-color: white;
          }

          .control {
            font-size: 1.5rem;
          }

          .cta-box {
            left: 50%;
            top: 80%;
            max-width: 90vw;
            padding: 14px 18px;
            text-align: center;
          }

          .cta-box p {
            font-size: 1rem;
          }

          .cta-button {
            font-size: 0.95rem;
            padding: 10px 16px;
          }
        }
      `}</style>
    </div>
  );
}
