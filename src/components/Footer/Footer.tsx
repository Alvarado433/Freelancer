'use client';
import React from 'react';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="content-wrapper">
        <div className="info-block">
          <h6>Sobre Nós</h6>
          <p>
            Produtos com amor, estilo e oportunidade de renda extra. Moda, festas e presentes especiais em um só lugar!
          </p>
        </div>

        <div className="info-block">
          <h6>📬 Links Úteis</h6>
          <ul>
            <li><a href="#">Política de Privacidade</a></li>
            <li><a href="#">Trocas e Devoluções</a></li>
            <li><a href="#">Termos de Uso</a></li>
            <li><a href="#">Contato</a></li>
          </ul>
        </div>

        <div className="info-block">
          <h6>Fale Conosco</h6>
          <p><FaWhatsapp className="icon" /> (11) 99148-3834</p>
          <p><FaEnvelope className="icon" /> imperiofestasecestas@gmail.com</p>
          <p><FaMapMarkerAlt className="icon" /> Rua Manoel Fernandes, Jundiapeba, Mogi das Cruzes - SP</p>
        </div>

        <div className="info-block social-block">
          <h6>Siga-nos</h6>
          <a
            href="https://www.instagram.com/imperio_festas12"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Império das Cestas Atacado – Todos os direitos reservados.
      </div>

      <style jsx>{`
        .footer-container {
          background-color: #b33951; /* rosa queimado */
          color: #fff0f6;
          padding: 4rem 1rem 2rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          box-shadow: inset 0 8px 10px -8px rgba(0,0,0,0.3);
        }

        .content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          justify-content: space-between;
          text-align: left;
        }

        .info-block {
          flex: 1 1 220px;
          min-width: 220px;
        }

        h6 {
          font-weight: 700;
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #ffe6f0;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }

        p {
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1rem;
          color: #ffd6e8;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        li {
          margin-bottom: 0.5rem;
        }

        a {
          color: #ffd6e8;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        a:hover {
          color: #ff85a2;
          text-decoration: underline;
        }

        .icon {
          margin-right: 0.6rem;
          color: #ffb3cc;
          vertical-align: middle;
        }

        .social-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .social-block a {
          font-size: 2.2rem;
          color: #ffd6e8;
          margin-top: 0.3rem;
          transition: color 0.3s ease;
        }

        .social-block a:hover {
          color: #ff85a2;
        }

        .footer-bottom {
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid #9b2e44;
          text-align: center;
          font-size: 0.9rem;
          color: #ffd6e8;
          user-select: none;
        }

        @media (max-width: 992px) {
          .content-wrapper {
            justify-content: center;
            text-align: center;
          }
          .info-block {
            min-width: 100%;
            max-width: 400px;
          }
          .social-block {
            align-items: center;
          }
        }

        @media (max-width: 480px) {
          .footer-container {
            padding: 3rem 1rem 1.5rem;
          }
          h6 {
            font-size: 1.1rem;
          }
          .social-block a {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
