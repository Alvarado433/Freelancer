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

      <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 2000;
        }
        .overlay.show {
          opacity: 1;
          pointer-events: all;
        }
        .drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 380px;
          max-width: 100%;
          height: 100%;
          background: #fff;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.3s ease;
          z-index: 2001;
          box-shadow: -6px 0 20px rgba(0, 0, 0, 0.15);
          border-radius: 0 0 0 12px;
        }
        .drawer.open {
          transform: translateX(0);
        }
        .drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #ddd;
          font-size: 1.25rem;
          font-weight: 700;
          background: #f8f9fa;
          border-radius: 0 0 12px 0;
        }
        .btn-close {
          background: none;
          border: none;
          cursor: pointer;
          color: #555;
          transition: color 0.2s ease;
        }
        .btn-close:hover {
          color: #d9534f;
        }
        .drawer-body {
          flex: 1;
          overflow-y: auto;
          padding: 1rem 1.5rem;
          background: #fafafa;
        }
        .empty {
          text-align: center;
          margin-top: 4rem;
          color: #999;
          font-size: 1.1rem;
          font-style: italic;
        }
        .cart-item {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: #fff;
          border-radius: 12px;
          margin-bottom: 1rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
          position: relative;
          align-items: center;
        }
        .cart-item img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 10px;
          flex-shrink: 0;
          box-shadow: 0 0 8px rgba(0,0,0,0.05);
        }
        .details {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-width: 0;
        }
        .title {
          font-size: 1rem;
          font-weight: 600;
          color: #333;
          line-height: 1.2;
          margin-bottom: 0.5rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .qty {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #e4e6eb;
          padding: 4px 10px;
          border-radius: 20px;
        }
        .qty button {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 4px;
          border-radius: 50%;
          transition: background-color 0.2s ease;
          color: #444;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .qty button:hover {
          background-color: #d1d5db;
          color: #222;
        }
        .qty span {
          min-width: 20px;
          text-align: center;
          font-weight: 600;
          font-size: 1rem;
          color: #222;
        }
        .price {
          font-weight: 700;
          color: #222;
          font-size: 1.05rem;
          min-width: 80px;
          text-align: right;
          white-space: nowrap;
        }
        .btn-remove {
          background: transparent;
          border: none;
          color: #c0392b;
          cursor: pointer;
          margin-left: 12px;
          padding: 6px;
          border-radius: 50%;
          transition: background-color 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .btn-remove:hover {
          background-color: #e74c3c;
          color: white;
        }
        .drawer-footer {
          padding: 1.5rem;
          border-top: 1px solid #ddd;
          background: #f8f9fa;
          border-radius: 12px 0 0 12px;
        }
        .summary .line {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.6rem;
          font-size: 1rem;
          color: #444;
        }
        .summary .total {
          font-size: 1.3rem;
          font-weight: 700;
          color: #111;
        }
        .btn-primary {
          width: 100%;
          background: #ffca28;
          border: none;
          padding: 0.85rem;
          border-radius: 10px;
          font-weight: 700;
          font-size: 1.1rem;
          margin-top: 1rem;
          cursor: pointer;
          color: #222;
          box-shadow: 0 4px 10px rgba(255, 202, 40, 0.6);
          transition: background-color 0.3s ease;
        }
        .btn-primary:hover {
          background: #ffb300;
        }
        .btn-link {
          display: block;
          width: 100%;
          background: none;
          border: none;
          text-align: center;
          margin-top: 0.7rem;
          color: #6f42c1;
          font-size: 1rem;
          cursor: pointer;
          font-weight: 600;
          transition: color 0.2s ease;
        }
        .btn-link:hover {
          color: #54278f;
          text-decoration: underline;
        }

        /* Scrollbar personalizado */
        .drawer-body::-webkit-scrollbar {
          width: 8px;
        }
        .drawer-body::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .drawer-body::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        .drawer-body::-webkit-scrollbar-thumb:hover {
          background: #a0a0a0;
        }
      `}</style>
    </>
  );
}
