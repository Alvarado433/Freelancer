import React, { useState } from "react";
import { ShoppingCart, X, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

type ItemCarrinho = {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  quantidade: number;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CarrinhoDrawer({ isOpen, onClose }: Props) {
  const [itens, setItens] = useState<ItemCarrinho[]>([
    {
      id: 1,
      nome: "CARREGADOR SEM FIO POR INDUÇÃO BEATLES HELP",
      preco: 89.9,
      imagem: "/img/beatles-help.png",
      quantidade: 1,
    },
  ]);

  const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  const alterarQuantidade = (id: number, delta: number) => {
    setItens(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantidade: Math.max(1, item.quantidade + delta) }
          : item
      )
    );
  };

  const removerItem = (id: number) => {
    // Confirmação simples
    if (window.confirm("Tem certeza que deseja remover este item do carrinho?")) {
      setItens(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <>
      <div className={`overlay ${isOpen ? "show" : ""}`} onClick={onClose}></div>

      <aside className={`drawer ${isOpen ? "open" : ""}`}>
        <header className="drawer-header">
          <h2><ShoppingCart size={22} /> Carrinho</h2>
          <button className="btn-close" onClick={onClose}><X size={24} /></button>
        </header>

        <div className="drawer-body">
          {itens.length === 0 ? (
            <p className="empty">Seu carrinho está vazio.</p>
          ) : (
            itens.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.imagem} alt={item.nome} />
                <div className="details">
                  <span className="title">{item.nome}</span>
                  <div className="controls">
                    <div className="qty">
                      <button onClick={() => alterarQuantidade(item.id, -1)} aria-label="Diminuir quantidade"><Minus size={16} /></button>
                      <span>{item.quantidade}</span>
                      <button onClick={() => alterarQuantidade(item.id, 1)} aria-label="Aumentar quantidade"><Plus size={16} /></button>
                    </div>
                    <span className="price">R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                  </div>
                </div>
                <button
                  className="btn-remove"
                  onClick={() => removerItem(item.id)}
                  aria-label={`Remover ${item.nome} do carrinho`}
                  title="Remover item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        <footer className="drawer-footer">
          <div className="summary">
            <div className="line"><span>Subtotal</span><span>R$ {total.toFixed(2)}</span></div>
            <div className="line total"><strong>Total</strong><strong>R$ {total.toFixed(2)}</strong></div>
          </div>
          <Link href="/Compras">
  <button className="btn-primary">Finalizar Compra</button>
</Link>
          <button className="btn-link" onClick={onClose}>Continuar Comprando</button>
        </footer>
      </aside>

      
    </>
  );
}
