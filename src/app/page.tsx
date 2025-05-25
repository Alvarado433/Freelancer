import Banner from "@/components/Banner/Banner";
import BannerVantagens from "@/components/BannerVantagens/Vantagens";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/home/home";
import Produtos from "@/components/produtos/produto";
import WhatsApp from "@/components/redesocial/whats";
import FaixaDePrecos from "@/components/Vendidos/Cupons";
import Cupons from "@/components/Vendidos/Cupons";
import Vendidos from "@/components/Vendidos/vendidos";


export default function Home() {
  return (
    <div>
     <Header />
     <Banner />
     <FaixaDePrecos />
     <Produtos />
     <BannerVantagens />
     <Vendidos />
     <WhatsApp />
     <Footer />
    </div>
  );
}
