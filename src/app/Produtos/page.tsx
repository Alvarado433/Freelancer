"use client";
import { useState } from "react";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/home/home";

const produtos = [
  { id: 1, nome: "Camisa Polo", preco: 79.9, imagem: "/img/camisa.jpg", categoria: "Camisas", marca: "Reserva", cor: "Branco" },
  { id: 2, nome: "Calça Jeans", preco: 119.9, imagem: "/img/calca.jpg", categoria: "Calças", marca: "Puma", cor: "Azul" },
  { id: 3, nome: "Tênis Esportivo", preco: 199.9, imagem: "/img/tenis.jpg", categoria: "Tênis", marca: "Adidas", cor: "Preto" },
  { id: 4, nome: "Boné Estiloso", preco: 39.9, imagem: "/img/bone.jpg", categoria: "Acessórios", marca: "Nike", cor: "Vermelho" },
  { id: 5, nome: "Relógio Moderno", preco: 299.9, imagem: "/img/relogio.jpg", categoria: "Acessórios", marca: "Reebok", cor: "Cinza" },
  { id: 6, nome: "Mochila Casual", preco: 129.9, imagem: "/img/mochila.jpg", categoria: "Acessórios", marca: "Nike", cor: "Preto" },
];

const categorias = ["Camisas", "Calças", "Tênis", "Acessórios"];
const marcas = ["Nike", "Adidas", "Puma", "Reebok", "Reserva"];
const cores = ["Preto", "Branco", "Vermelho", "Azul", "Cinza"];
const faixasPreco = [
  { id: 1, label: "Até R$50", min: 0, max: 50 },
  { id: 2, label: "R$51 - R$150", min: 51, max: 150 },
  { id: 3, label: "R$151 - R$300", min: 151, max: 300 },
  { id: 4, label: "Acima de R$300", min: 301, max: Infinity },
];

export default function ProdutosPage() {
  const [filtroCategoria, setFiltroCategoria] = useState<string[]>([]);
  const [filtroMarca, setFiltroMarca] = useState<string[]>([]);
  const [filtroCor, setFiltroCor] = useState<string[]>([]);
  const [filtroPreco, setFiltroPreco] = useState<{ min: number; max: number } | null>(null);

  const toggleFiltro = (valor: string, lista: string[], setLista: (lista: string[]) => void) => {
    if (lista.includes(valor)) {
      setLista(lista.filter((item) => item !== valor));
    } else {
      setLista([...lista, valor]);
    }
  };

  const filtrarProdutos = () => {
    return produtos.filter((produto) => {
      const categoriaOk = filtroCategoria.length === 0 || filtroCategoria.includes(produto.categoria);
      const marcaOk = filtroMarca.length === 0 || filtroMarca.includes(produto.marca);
      const corOk = filtroCor.length === 0 || filtroCor.includes(produto.cor);
      const precoOk = !filtroPreco || (produto.preco >= filtroPreco.min && produto.preco <= filtroPreco.max);
      return categoriaOk && marcaOk && corOk && precoOk;
    });
  };

  return (
    <>
      <Header />

      <div className="container my-5">
        <h2>Todos os Produtos</h2>
        <div className="row">
          {/* Filtros */}
          <div className="col-md-3 mb-4">
            <div className="filter-container">
              <h5>Filtrar por:</h5>
              <form>
                <fieldset>
                  <legend>Categorias</legend>
                  {categorias.map((item, idx) => (
                    <div className="form-check" key={idx}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`cat-${item}`}
                        checked={filtroCategoria.includes(item)}
                        onChange={() => toggleFiltro(item, filtroCategoria, setFiltroCategoria)}
                      />
                      <label className="form-check-label" htmlFor={`cat-${item}`}>
                        {item}
                      </label>
                    </div>
                  ))}
                </fieldset>

                <fieldset>
                  <legend>Marcas</legend>
                  {marcas.map((marca, idx) => (
                    <div className="form-check" key={idx}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`marca-${marca}`}
                        checked={filtroMarca.includes(marca)}
                        onChange={() => toggleFiltro(marca, filtroMarca, setFiltroMarca)}
                      />
                      <label className="form-check-label" htmlFor={`marca-${marca}`}>
                        {marca}
                      </label>
                    </div>
                  ))}
                </fieldset>

                <fieldset>
                  <legend>Cores</legend>
                  {cores.map((cor, idx) => (
                    <div className="form-check" key={idx}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`cor-${cor}`}
                        checked={filtroCor.includes(cor)}
                        onChange={() => toggleFiltro(cor, filtroCor, setFiltroCor)}
                      />
                      <label className="form-check-label" htmlFor={`cor-${cor}`}>
                        {cor}
                      </label>
                    </div>
                  ))}
                </fieldset>

                <fieldset>
                  <legend>Faixa de Preço</legend>
                  {faixasPreco.map((faixa) => (
                    <div className="form-check" key={faixa.id}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="faixaPreco"
                        id={`faixa-${faixa.id}`}
                        checked={filtroPreco?.min === faixa.min && filtroPreco?.max === faixa.max}
                        onChange={() => setFiltroPreco({ min: faixa.min, max: faixa.max })}
                      />
                      <label className="form-check-label" htmlFor={`faixa-${faixa.id}`}>
                        {faixa.label}
                      </label>
                    </div>
                  ))}
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="faixaPreco"
                      id="faixa-todos"
                      checked={!filtroPreco}
                      onChange={() => setFiltroPreco(null)}
                    />
                    <label className="form-check-label" htmlFor="faixa-todos">
                      Todas as faixas
                    </label>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>

          {/* Produtos */}
          <div className="col-md-9">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
              {filtrarProdutos().map((produto) => {
                const parcelas = 3;
                const valorParcela = (produto.preco / parcelas).toFixed(2);
                return (
                  <div className="col" key={produto.id}>
                    <div className="card h-100 shadow-sm position-relative">
                      {/* Faixa Promoção PIX */}
                      <div
                        style={{
                          position: "absolute",
                          top: "10px",
                          left: "10px",
                          backgroundColor: "#d32f2f",
                          color: "white",
                          padding: "4px 10px",
                          fontWeight: "600",
                          fontSize: "0.8rem",
                          borderRadius: "20px",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                          zIndex: 10,
                          userSelect: "none",
                        }}
                      >
                        10% OFF no PIX
                      </div>

                      <img src={produto.imagem} className="card-img-top" alt={produto.nome} />
                      <div className="card-body d-flex flex-column">
                        <h6 className="card-title">{produto.nome}</h6>
                        <div className="mb-2">
                          <p className="card-price fw-bold mb-1">R$ {produto.preco.toFixed(2).replace(".", ",")}</p>
                          <p className="installments text-muted">
                            até 3x de R$ {valorParcela.replace(".", ",")} sem juros
                          </p>
                        </div>
                        <button className="btn btn-outline-primary mt-auto w-100">
                          <i className="bi bi-cart-plus-fill me-1"></i>
                          Adicionar ao carrinho
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
