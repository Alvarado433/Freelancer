import Navbar from "../menus/navbar";

export default function Header() {
  return (
    <>
      <header>
        {/* Mensagem de promoção */}
        <div className="mensagem-promocional">
          <p>
            Faltam <strong>R$ 199,90</strong> para o{" "}
            <strong>FRETE GRÁTIS</strong>!{" "}
            <a href="#regulamento" className="link-regulamento">
              REGULAMENTO
            </a>
          </p>
        </div>
        <Navbar />
      </header>
    </>
  );
}
