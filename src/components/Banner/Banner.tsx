"use client";
import React, { useState, useEffect, JSX } from "react";

interface BannerItem {
  src: string;
  alt: string;
}

const banners: BannerItem[] = [
  { src: "/img/logotipo2.jpeg", alt: "Banner 1" },
  { src: "/img/logotipo3.jpeg", alt: "Banner 2" },
  { src: "https://picsum.photos/id/1019/1200/500", alt: "Banner 3" },
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
              <img src={banner.src} alt={banner.alt} className="slide-image" />
            )}
          </div>
        ))}
        <button
          className="control prev"
          onClick={prevSlide}
          aria-label="Anterior"
        >
          &#10094;
        </button>
        <button
          className="control next"
          onClick={nextSlide}
          aria-label="Próximo"
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
          padding-bottom: 40%;
          background-color: #f7f7f7;
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
        }

        .control:hover {
          background-color: rgba(255, 255, 255, 0.9);
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
        }

        .dot {
          width: 10px;
          height: 10px;
          background-color: #ccc;
          border-radius: 50%;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .dot.active {
          background-color: #ff4f81;
        }

        @media (max-width: 768px) {
          .slide-wrapper {
            padding-bottom: 60%;
          }

          .control {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
