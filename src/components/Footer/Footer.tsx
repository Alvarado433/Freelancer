import React from 'react';


const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="container py-5">
        <div className="row text-light">
          {/* Sobre Nós */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h6 className="footer-heading">Sobre Nós</h6>
            <p className="footer-text">
              Produtos com amor, estilo e oportunidade de renda extra. Moda, festas e presentes especiais em um só lugar!
            </p>
          </div>

          {/* Links Úteis */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h6 className="footer-heading">📬 Links Úteis</h6>
            <ul className="footer-list">
              <li><a href="#">Política de Privacidade</a></li>
              <li><a href="#">Trocas e Devoluções</a></li>
              <li><a href="#">Termos de Uso</a></li>
              <li><a href="#">Contato</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h6 className="footer-heading">Fale Conosco</h6>
            <p className="footer-text"><i className="bi bi-whatsapp"></i> (11) 99999-9999</p>
            <p className="footer-text"><i className="bi bi-envelope"></i> contato@imperio.com</p>
            <p className="footer-text"><i className="bi bi-geo-alt"></i> São Paulo - SP</p>
          </div>

          {/* Redes Sociais */}
          <div className="col-md-3 col-sm-6 mb-4 text-md-start text-center">
            <h6 className="footer-heading">Siga-nos</h6>
            <div className="social-icons">
              <a
                href="https://www.instagram.com/imperio_festas12"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom text-center py-3 text-light">
        © {new Date().getFullYear()} Império. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
