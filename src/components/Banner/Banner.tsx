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
  {
    src: "/img/banner01.png",
    alt: "banner",
    ctaText: "Surpreenda quem você ama com nossos produtos temáticos!",
    ctaLink: "#dia-dos-namorados",
  },
  {
    src: "/img/banner02.png",
    alt: "banner",
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
    <div className="banner-wrapper" role="region" aria-label="Banner rotativo de promoções">
      <div className="slide-wrapper">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`slide ${index === current ? "active" : ""}`}
            aria-hidden={index !== current}
          >
            <img
              src={banner.src}
              alt={banner.alt}
              className="slide-image"
              loading="lazy"
            />
            <div
              className={`cta-box ${index === current ? "visible" : ""}`}
              role="region"
              aria-live="polite"
              aria-atomic="true"
            >
              <p>{banner.ctaText}</p>
              <a href={banner.ctaLink} className="cta-button" tabIndex={index === current ? 0 : -1}>
                Ver presentes
              </a>
            </div>
          </div>
        ))}

        <button
          className="control prev"
          onClick={prevSlide}
          aria-label="Anterior"
          type="button"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="#333"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          className="control next"
          onClick={nextSlide}
          aria-label="Próximo"
          type="button"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="#333"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="indicators">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir para slide ${index + 1}`}
            aria-current={index === current}
            type="button"
          />
        ))}
      </div>

      <style jsx>{`
        .banner-wrapper {
          width: 100%;
          position: relative;
          font-family: "Poppins", sans-serif;
          user-select: none;
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
          pointer-events: none;
          transition: opacity 1s ease-in-out;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        .slide.active {
          opacity: 1;
          pointer-events: auto;
          z-index: 1;
        }

        .slide-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          display: block;
          user-select: none;
        }

        .cta-box {
          position: absolute;
          left: 50%;
          top: 75%;
          transform: translate(-50%, -50%);
          max-width: 380px;
          background: rgba(255 255 255 / 0.45);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 22px 32px;
          box-shadow: 0 8px 30px rgb(0 0 0 / 0.1);
          color: #333;
          font-weight: 700;
          text-align: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.8s ease;
          user-select: none;
        }

        .cta-box.visible {
          opacity: 1;
          pointer-events: auto;
        }

        .cta-box p {
          font-size: 1.4rem;
          margin: 0 0 14px;
          color: #ff4081;
          text-shadow: 0 1px 4px rgba(255, 64, 129, 0.6);
          line-height: 1.3;
        }

        .cta-button {
          display: inline-block;
          background-color: #ff4081;
          color: white;
          font-weight: 600;
          padding: 12px 26px;
          border-radius: 30px;
          text-align: center;
          text-decoration: none;
          font-size: 1.1rem;
          box-shadow: 0 6px 20px rgba(255, 64, 129, 0.5);
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          user-select: none;
          outline-offset: 4px;
        }

        .cta-button:hover,
        .cta-button:focus {
          background-color: #e91e63;
          box-shadow: 0 9px 28px rgba(233, 30, 99, 0.7);
          outline: 2px solid #fff;
          outline-offset: 2px;
        }

        .control {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(255, 255, 255, 0.8);
          border: none;
          padding: 0.5rem;
          cursor: pointer;
          border-radius: 50%;
          z-index: 2;
          transition: background-color 0.3s;
          user-select: none;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        }

        .control:hover,
        .control:focus {
          background-color: rgba(255, 255, 255, 0.95);
          outline: 2px solid #ff4081;
          outline-offset: 2px;
        }

        .control.prev {
          left: 12px;
        }

        .control.next {
          right: 12px;
        }

        .indicators {
          display: flex;
          justify-content: center;
          gap: 14px;
          margin-top: 1rem;
          user-select: none;
        }

        .dot {
          width: 14px;
          height: 14px;
          background-color: #ccc;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }

        .dot:hover,
        .dot:focus {
          background-color: #ff77a0;
          outline: none;
          transform: scale(1.15);
        }

        .dot.active {
          background-color: #ff4f81;
          box-shadow: 0 0 10px #ff4f81;
          transform: scale(1.3);
          pointer-events: none;
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
            padding: 0.4rem;
          }

          .cta-box {
            max-width: 90vw;
            padding: 16px 24px;
            top: 80%;
            border-radius: 12px;
          }

          .cta-box p {
            font-size: 1.1rem;
          }

          .cta-button {
            font-size: 1rem;
            padding: 10px 20px;
          }

          .dot {
            width: 12px;
            height: 12px;
          }
        }
      `}</style>
    </div>
  );
}
