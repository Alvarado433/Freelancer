import {
  FaCreditCard,
  FaBarcode,
  FaQrcode,
  FaTag,
  FaMoneyBillWave,
} from "react-icons/fa";

interface ResumoPedidoProps {
  subtotal: number;
  valorDesconto: number;
  descontoAplicado: boolean;
  frete: number | null;
  totalComDesconto: number;
  pagamentoSelecionado: string;
  parcelas?: number | null;
}

export function ResumoPedido({
  subtotal,
  valorDesconto,
  descontoAplicado,
  frete,
  totalComDesconto,
  pagamentoSelecionado,
  parcelas = null,
}: ResumoPedidoProps) {
  const formatarValor = (valor: number) =>
    valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const valorTotal = totalComDesconto + (frete ?? 0);

  const valorParcela = parcelas && parcelas > 1
    ? valorTotal / parcelas
    : null;

  const renderPagamento = () => {
    switch (pagamentoSelecionado) {
      case "Cartão":
        return (
          <>
            <FaCreditCard className="me-2 text-primary" />
            {parcelas && parcelas > 1
              ? `Cartão - ${parcelas}x de ${formatarValor(valorParcela!)} sem juros`
              : `Cartão - À vista`}
          </>
        );
      case "Pix":
        return (
          <>
            <FaQrcode className="me-2 text-success" />
            Pix - Pagamento instantâneo
          </>
        );
      case "Boleto":
        return (
          <>
            <FaBarcode className="me-2 text-warning" />
            Boleto bancário - Pagamento em até 2 dias úteis
          </>
        );
      case "Dinheiro":
        return (
          <>
            <FaMoneyBillWave className="me-2 text-success" />
            Dinheiro - Pagamento na entrega
          </>
        );
      default:
        return "Nenhuma forma de pagamento selecionada";
    }
  };

  return (
    <aside className="col-md-5">
      <div className="card shadow-sm border-0 rounded-4 p-4 bg-white">
        <h5 className="fw-bold mb-4">Resumo do Pedido</h5>

        <ul className="list-group mb-4">
          <li className="list-group-item d-flex justify-content-between">
            <span>Subtotal:</span>
            <span>{formatarValor(subtotal)}</span>
          </li>

          {descontoAplicado && (
            <li className="list-group-item d-flex justify-content-between text-success">
              <span>
                <FaTag className="me-2" />
                Desconto:
              </span>
              <span>-{formatarValor(valorDesconto)}</span>
            </li>
          )}

          <li className="list-group-item d-flex justify-content-between">
            <span>Frete:</span>
            <span>{frete !== null ? formatarValor(frete) : "-"}</span>
          </li>

          <li className="list-group-item d-flex justify-content-between fw-bold fs-5 bg-light">
            <span>Total:</span>
            <span>{formatarValor(valorTotal)}</span>
          </li>

          {parcelas && parcelas > 1 && (
            <li className="list-group-item text-muted small text-end">
              {parcelas}x de {formatarValor(valorParcela!)} sem juros
            </li>
          )}
        </ul>

        <div className="border-top pt-3">
          <h6 className="fw-semibold mb-2">Forma de Pagamento</h6>
          <div className="d-flex align-items-center fs-6 gap-2">
            {renderPagamento()}
          </div>
        </div>
      </div>
    </aside>
  );
}
