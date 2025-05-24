"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import FormaPagamento from "@/components/pagamentos/Pix/pix";
import Footer from "@/components/Footer/Footer";
import FooterPagamento from "@/components/Footer/rodape";

export default function Pagamentos() {
  const [etapa, setEtapa] = useState(1);
  const [pagamentoSelecionado, setPagamentoSelecionado] = useState("");
  const [cupom, setCupom] = useState("");
  const [descontoAplicado, setDescontoAplicado] = useState(false);
  const [valorTotal, setValorTotal] = useState(200.0);
  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState<number | null>(null);
  const [mensagemFrete, setMensagemFrete] = useState("");

  const produtos = [
    {
      id: 1,
      nome: "Produto A",
      preco: 50.0,
      imagem: "https://via.placeholder.com/80?text=Produto+A",
    },
    {
      id: 2,
      nome: "Produto B",
      preco: 70.0,
      imagem: "https://via.placeholder.com/80?text=Produto+B",
    },
  ];

  const etapas = [
    { label: "Carrinho", icon: "bi-cart-check-fill" },
    { label: "Pagamento", icon: "bi-credit-card-2-front-fill" },
    { label: "Confirmação", icon: "bi-check-circle-fill" },
  ];

  // Calcula subtotal
  const subtotal = produtos.reduce((acc, p) => acc + p.preco, 0);
  // Calcula valor do desconto em reais
  const valorDesconto = descontoAplicado ? subtotal * 0.1 : 0;
  // Calcula total após desconto
  const totalComDesconto = subtotal - valorDesconto;

  const aplicarCupom = () => {
    if (cupom.toUpperCase() === "DESCONTO10" && !descontoAplicado) {
      setValorTotal(totalComDesconto);
      setDescontoAplicado(true);
    }
  };

  useEffect(() => {
    if (cep.length === 8 || cep.length === 9) {
      if (cep.endsWith("0")) {
        setFrete(0);
        setMensagemFrete("Frete grátis para seu CEP!");
      } else {
        const valorFreteSimulado = 15.0;
        setFrete(valorFreteSimulado);
        setMensagemFrete(`Frete: R$ ${valorFreteSimulado.toFixed(2)}`);
      }
    } else {
      setFrete(null);
      setMensagemFrete("");
    }
  }, [cep]);

  // Atualiza valor total quando desconto é aplicado
  useEffect(() => {
    if (descontoAplicado) {
      setValorTotal(totalComDesconto);
    } else {
      setValorTotal(subtotal);
    }
  }, [descontoAplicado, subtotal, totalComDesconto]);

  return (
    <>
      <style>
        {`
          .etapa-pill {
            cursor: pointer;
            transition: background-color 0.3s ease, color 0.3s ease;
            user-select: none;
          }
          .etapa-pill:hover:not(.active) {
            background-color: #e9f0ff;
          }
          .etapa-pill.active {
            background-color: #0d6efd;
            color: white;
            box-shadow: 0 4px 10px rgb(13 110 253 / 0.3);
          }
          .produto-item {
            transition: box-shadow 0.3s ease;
            border-radius: 12px;
            padding: 12px;
            margin-bottom: 16px;
            background-color: #fff;
          }
          .produto-item:hover {
            box-shadow: 0 8px 16px rgb(0 0 0 / 0.1);
          }
          .btn-pagamento {
            min-width: 140px;
            transition: background-color 0.3s ease, border-color 0.3s ease;
          }
          .btn-pagamento:hover {
            filter: brightness(0.9);
          }
          input.form-control {
            border-radius: 0.375rem;
            border: 1.5px solid #0d6efd;
            transition: border-color 0.3s ease;
          }
          input.form-control:focus {
            border-color: #084298;
            box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 0.25);
          }
          .btn-primary, .btn-success {
            border-radius: 50px;
            padding-left: 1.6rem;
            padding-right: 1.6rem;
          }
          .btn-primary:disabled, .btn-success:disabled {
            cursor: not-allowed;
            opacity: 0.6;
          }
          footer {
            font-size: 0.9rem;
          }
          footer i, footer img {
            transition: transform 0.3s ease;
          }
          footer i:hover, footer img:hover {
            transform: scale(1.2);
          }
          .forma-selecionada {
            margin-top: 12px;
            font-weight: 600;
            color: #0d6efd;
          }
          .resumo-pedido li {
            font-size: 1.05rem;
          }
          .resumo-pedido li strong {
            font-weight: 700;
          }
        `}
      </style>

      <div
        className="container-fluid p-0"
        style={{ fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif" }}
      >
        <header className="bg-primary text-white py-3 shadow-sm">
          <div className="container d-flex justify-content-between align-items-center">
            <a
              href="/"
              className="text-white text-decoration-none fw-bold d-flex align-items-center gap-2"
            >
              <i className="bi bi-arrow-left-circle-fill fs-4"></i>
              Voltar
            </a>
            <h5 className="m-0 d-flex align-items-center gap-2 fw-semibold">
              <i className="bi bi-shield-lock-fill fs-5"></i> Checkout 100%
              Seguro
            </h5>
          </div>
        </header>

        <div className="container mt-5">
          {/* Etapas */}
          <div className="row mb-5 text-center">
            {etapas.map((et, index) => (
              <div key={index} className="col">
                <div
                  className={`etapa-pill p-3 fw-semibold shadow-sm rounded-pill ${
                    etapa === index + 1 ? "active" : "bg-light"
                  }`}
                  onClick={() => setEtapa(index + 1)}
                  role="button"
                  aria-current={etapa === index + 1 ? "step" : undefined}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setEtapa(index + 1);
                  }}
                >
                  <i className={`bi ${et.icon} me-2 fs-5`}></i>
                  {index + 1}. {et.label}
                </div>
              </div>
            ))}
          </div>
          {etapa === 1 && (
            <div className="row gy-4 gx-md-5">
              {/* Carrinho */}
              <div className="col-md-7">
                <div className="card shadow-sm border-0 rounded-4">
                  <div className="card-header bg-white border-bottom-0 px-4 pt-4">
                    <h4 className="fw-bold mb-0">Seu Carrinho</h4>
                  </div>
                  <div className="card-body bg-white px-4">
                    {produtos.length === 0 ? (
                      <p className="text-muted">Seu carrinho está vazio.</p>
                    ) : (
                      produtos.map((produto) => (
                        <div
                          key={produto.id}
                          className="produto-item d-flex justify-content-between align-items-center py-3 border-bottom"
                        >
                          <div className="d-flex align-items-center gap-4">
                            <img
                              src={produto.imagem}
                              alt={produto.nome}
                              width={80}
                              height={80}
                              className="rounded-3 shadow-sm"
                            />
                            <div>
                              <h6 className="mb-1 fw-semibold">
                                {produto.nome}
                              </h6>
                              <small className="text-muted">
                                Produto #{produto.id}
                              </small>
                            </div>
                          </div>
                          <span className="text-primary fw-bold fs-5">
                            R$ {produto.preco.toFixed(2)}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Cupom + Frete + Resumo */}
              <div className="col-md-5">
                <div className="card shadow-sm border-0 rounded-4 p-4 bg-white">
                  <h5 className="fw-semibold mb-4">Frete e Cupom</h5>

                  {/* CEP */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      CEP para cálculo de frete
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={cep}
                      onChange={(e) =>
                        setCep(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="Digite seu CEP (somente números)"
                      maxLength={9}
                    />
                    {mensagemFrete && (
                      <small
                        className={`mt-2 d-block ${
                          frete === 0 ? "text-success" : "text-info"
                        } fw-semibold`}
                      >
                        {mensagemFrete}
                      </small>
                    )}
                  </div>

                  {/* Cupom */}
                  <label className="form-label fw-semibold">
                    Cupom de Desconto
                  </label>
                  <div className="input-group mb-4 shadow-sm">
                    <input
                      type="text"
                      className="form-control rounded-start"
                      value={cupom}
                      onChange={(e) => setCupom(e.target.value.toUpperCase())}
                      placeholder="Digite seu cupom"
                    />
                    <button
                      className="btn btn-primary rounded-end"
                      onClick={aplicarCupom}
                    >
                      Aplicar
                    </button>
                  </div>

                  {descontoAplicado && (
                    <div className="alert alert-success py-2" role="alert">
                      Cupom aplicado! Você recebeu 10% de desconto.
                    </div>
                  )}

                  {/* Resumo */}
                  <ul className="list-group mb-4">
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Subtotal:</span>
                      <strong>R$ {subtotal.toFixed(2)}</strong>
                    </li>
                    {descontoAplicado && (
                      <li className="list-group-item d-flex justify-content-between text-success">
                        <span>Desconto (10%):</span>
                        <strong>- R$ {valorDesconto.toFixed(2)}</strong>
                      </li>
                    )}
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Frete:</span>
                      <strong>
                        {frete !== null ? `R$ ${frete.toFixed(2)}` : "-"}
                      </strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between fw-bold fs-5 bg-light">
                      <span>Total:</span>
                      <strong>
                        R$ {(totalComDesconto + (frete ?? 0)).toFixed(2)}
                      </strong>
                    </li>
                  </ul>

                  {/* Próximo */}
                  <button
                    className="btn btn-primary w-100 fw-semibold"
                    onClick={() => setEtapa(2)}
                  >
                    Próximo: Pagamento
                  </button>
                </div>
              </div>
            </div>
          )}

          {etapa === 2 && (
            <FormaPagamento
              pagamentoSelecionado={pagamentoSelecionado}
              setPagamentoSelecionado={setPagamentoSelecionado}
              subtotal={subtotal}
              valorDesconto={valorDesconto}
              descontoAplicado={descontoAplicado}
              frete={frete}
              totalComDesconto={totalComDesconto}
              setEtapa={setEtapa}
            />
          )}
          {etapa === 3 && (
            <section className="d-flex flex-column align-items-center justify-content-center">
              <div className="alert alert-success w-100 text-center py-5">
                <i className="bi bi-check-circle-fill fs-1 mb-3 text-success"></i>
                <h2>Pedido Confirmado!</h2>
                <p className="lead">Obrigado pela sua compra.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setEtapa(1);
                    setPagamentoSelecionado("");
                    setCupom("");
                    setDescontoAplicado(false);
                    setFrete(null);
                    setMensagemFrete("");
                  }}
                >
                  Fazer nova compra
                </button>
              </div>
            </section>
          )}
        </div>

        <FooterPagamento />
      </div>
    </>
  );
}
