"use client";

import { ResumoPedido } from "@/components/Resumo/pedidoresumo";
import React, { useState, useEffect } from "react";

interface FormaPagamentoProps {
  pagamentoSelecionado: string;
  setPagamentoSelecionado: (metodo: string) => void;
  subtotal: number;
  valorDesconto: number;
  descontoAplicado: boolean;
  frete: number | null;
  totalComDesconto: number;
  setEtapa: (etapa: number) => void;
}

export default function FormaPagamento({
  pagamentoSelecionado,
  setPagamentoSelecionado,
  subtotal,
  valorDesconto,
  descontoAplicado,
  frete,
  totalComDesconto,
  setEtapa,
}: FormaPagamentoProps) {
  // Estado para dados do cartão
  const [nomeCartao, setNomeCartao] = useState("");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");
  const [formValido, setFormValido] = useState(false);
  const [parcelas, setParcelas] = useState<number | null>(null);

  // Exemplo simples do código QR Pix (normalmente você receberia esse valor do backend)
  const pixQRCode =
    "00020126580014BR.GOV.BCB.PIX0136your-pix-key-here52040000530398654041.505802BR5925Nome do Recebedor6009Cidade PIX62070503***6304ABCD";

  // Formatação para número do cartão
  const formatarNumeroCartao = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim()
      .slice(0, 19);
  };

  // Formatação para validade MM/AA
  const formatarValidade = (value: string) => {
    const val = value.replace(/\D/g, "").slice(0, 4);
    if (val.length >= 3) {
      return val.slice(0, 2) + "/" + val.slice(2);
    }
    return val;
  };

  // Validação simples do formulário cartão
  useEffect(() => {
    const nomeValido = nomeCartao.trim().length >= 3;
    const numeroLimpo = numeroCartao.replace(/\s/g, "");
    const numeroValido = /^\d{16}$/.test(numeroLimpo);
    const validadeValida = /^(0[1-9]|1[0-2])\/\d{2}$/.test(validade);
    const cvvValido = /^\d{3,4}$/.test(cvv);

    setFormValido(nomeValido && numeroValido && validadeValida && cvvValido);

    // Resetar parcelas quando inválido
    if (!(nomeValido && numeroValido && validadeValida && cvvValido)) {
      setParcelas(null);
    }
  }, [nomeCartao, numeroCartao, validade, cvv]);

  // Opções de parcelas fixas
  const opcoesParcelas = [1, 2, 3, 4, 5, 6];

  return (
    <section className="row gx-5">
      <aside className="col-md-7">
        <div className="card shadow-sm border-0 rounded-4 p-4 bg-white">
          <h3 className="fw-semibold mb-4">Forma de Pagamento</h3>

          {/* Botões de seleção de método */}
          <div className="d-flex gap-3 flex-wrap mb-4">
            {["Pix", "Boleto", "Cartão"].map((metodo) => (
              <button
                key={metodo}
                className={`btn btn-pagamento btn-outline-primary ${
                  pagamentoSelecionado === metodo ? "active" : ""
                }`}
                onClick={() => setPagamentoSelecionado(metodo)}
                aria-pressed={pagamentoSelecionado === metodo}
                type="button"
              >
                {metodo}
              </button>
            ))}
          </div>

          {/* Formulário para Cartão */}
          {pagamentoSelecionado === "Cartão" && (
            <form
              className="mb-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (formValido && parcelas) {
                  setEtapa(3);
                }
              }}
              noValidate
            >
              <div className="mb-3">
                <label htmlFor="nomeCartao" className="form-label">
                  Nome no Cartão
                </label>
                <input
                  type="text"
                  id="nomeCartao"
                  className={`form-control ${
                    nomeCartao && nomeCartao.trim().length < 3 ? "is-invalid" : ""
                  }`}
                  value={nomeCartao}
                  onChange={(e) => setNomeCartao(e.target.value)}
                  placeholder="Nome conforme no cartão"
                  required
                />
                <div className="invalid-feedback">
                  Informe o nome completo (mínimo 3 caracteres).
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="numeroCartao" className="form-label">
                  Número do Cartão
                </label>
                <input
                  type="text"
                  id="numeroCartao"
                  className={`form-control ${
                    numeroCartao &&
                    !/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(numeroCartao)
                      ? "is-invalid"
                      : ""
                  }`}
                  value={numeroCartao}
                  onChange={(e) =>
                    setNumeroCartao(formatarNumeroCartao(e.target.value))
                  }
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  required
                  inputMode="numeric"
                  pattern="\d{4}\s?\d{4}\s?\d{4}\s?\d{4}"
                />
                <div className="invalid-feedback">Número inválido.</div>
              </div>

              <div className="row gx-3 mb-3">
                <div className="col-6">
                  <label htmlFor="validade" className="form-label">
                    Validade (MM/AA)
                  </label>
                  <input
                    type="text"
                    id="validade"
                    className={`form-control ${
                      validade && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(validade)
                        ? "is-invalid"
                        : ""
                    }`}
                    value={validade}
                    onChange={(e) => setValidade(formatarValidade(e.target.value))}
                    placeholder="MM/AA"
                    maxLength={5}
                    required
                    pattern="(0[1-9]|1[0-2])\/\d{2}"
                  />
                  <div className="invalid-feedback">Validade inválida.</div>
                </div>

                <div className="col-6">
                  <label htmlFor="cvv" className="form-label">
                    CVV
                  </label>
                  <input
                    type="password"
                    id="cvv"
                    className={`form-control ${
                      cvv && !/^\d{3,4}$/.test(cvv) ? "is-invalid" : ""
                    }`}
                    value={cvv}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                      setCvv(val);
                    }}
                    placeholder="123"
                    maxLength={4}
                    required
                    pattern="\d{3,4}"
                    inputMode="numeric"
                  />
                  <div className="invalid-feedback">CVV inválido.</div>
                </div>
              </div>

              {/* Parcelas aparecem só se o formulário estiver válido */}
              {formValido && (
                <div className="mb-4">
                  <label htmlFor="parcelas" className="form-label">
                    Escolha a quantidade de parcelas
                  </label>
                  <select
                    id="parcelas"
                    className="form-select"
                    value={parcelas ?? ""}
                    onChange={(e) => setParcelas(Number(e.target.value))}
                    required
                  >
                    <option value="" disabled>
                      Selecione...
                    </option>
                    {opcoesParcelas.map((n) => (
                      <option key={n} value={n}>
                        {n}x {n === 1 ? "(à vista)" : "sem juros"}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-success"
                disabled={!formValido || !parcelas}
                aria-label="Confirmar pedido"
              >
                Confirmar Pedido
              </button>
            </form>
          )}

          {/* Conteúdo para PIX */}
          {pagamentoSelecionado === "Pix" && (
            <div className="mb-4">
              <h5>Pagamento via Pix</h5>
              <p>
                Use o QR Code abaixo para realizar o pagamento. Após a confirmação,
                prossiga para o próximo passo.
              </p>
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  marginBottom: "1rem",
                }}
              >
                {/* Gerar QR code via API externa? 
                    Aqui vai uma imagem placeholder com QR code base64, mas você pode usar
                    um componente de QR code React como 'qrcode.react' */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                    pixQRCode
                  )}`}
                  alt="QR Code Pix"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <button
                className="btn btn-success"
                onClick={() => setEtapa(3)}
                aria-label="Confirmar pedido Pix"
              >
                Confirmar Pedido
              </button>
            </div>
          )}

          {/* Conteúdo para Boleto */}
          {pagamentoSelecionado === "Boleto" && (
            <>
              <p>
                Você escolheu pagar via boleto. Após a confirmação, você receberá
                o boleto para pagamento.
              </p>
              <div className="d-flex justify-content-between mt-5">
                <button
                  className="btn btn-secondary"
                  onClick={() => setEtapa(1)}
                  aria-label="Voltar para o carrinho"
                  type="button"
                >
                  Voltar
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => setEtapa(3)}
                  aria-label="Confirmar pedido Boleto"
                  type="button"
                >
                  Confirmar Pedido
                </button>
              </div>
            </>
          )}
        </div>
      </aside>

     <ResumoPedido
  subtotal={subtotal}
  valorDesconto={valorDesconto}
  descontoAplicado={descontoAplicado}
  frete={frete}
  totalComDesconto={totalComDesconto}
  pagamentoSelecionado={pagamentoSelecionado}
  parcelas={parcelas} // estado do componente cartão, que você deve passar para cá
/>
    </section>
  );
}
