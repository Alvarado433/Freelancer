"use client";
import React from "react";

type User = {
  name: string | null;
  loggedIn: boolean;
};

type Category = {
  id: number;
  name: string;
  icon: string;
  subcategories: string[];
};

type SidebarProps = {
  user: User;
  categories: Category[];
  sidebarOpen: boolean;
  expandedCategory: number | null;
  toggleSidebar: () => void;
  toggleCategory: (id: number) => void;
};

export default function Sidebar({
  user,
  categories,
  sidebarOpen,
  expandedCategory,
  toggleSidebar,
  toggleCategory,
}: SidebarProps) {
  return (
    <>
      <div
        className={`overlay ${sidebarOpen ? "visible" : ""}`}
        onClick={toggleSidebar}
        aria-label="Fechar menu"
        tabIndex={-1}
      ></div>

      <aside
        className={`custom-sidebar ${sidebarOpen ? "open" : ""}`}
        role="navigation"
        aria-label="Menu lateral"
      >
        {/* Bloco de usuário */}
        <div className="sidebar-user p-3 border-bottom d-flex flex-column gap-2">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-person-circle user-icon" aria-hidden="true"></i>
            <div>
              <div className="user-greeting">Olá,</div>
              <div className="user-name fw-bold">
                {user.loggedIn ? user.name : "Convidado"}
              </div>
            </div>
          </div>

          {/* Se não logado, mostrar links Entrar / Criar Conta */}
          {!user.loggedIn && (
            <div className="user-actions d-flex gap-3 mt-2">
              <a href="/login" className="btn btn-outline-danger btn-sm flex-grow-1">
                Entrar
              </a>
              <a href="/register" className="btn btn-danger btn-sm flex-grow-1">
                Criar Conta
              </a>
            </div>
          )}
        </div>

        {/* Categorias */}
        <div className="sidebar-header d-flex justify-content-between align-items-center p-3 border-bottom">
          <h5 className="mb-0">Categorias</h5>
          <button
            className="btn-close"
            onClick={toggleSidebar}
            aria-label="Fechar menu"
          ></button>
        </div>

        <div className="sidebar-body p-3">
          <ul className="list-unstyled ps-0">
            {categories.map((cat) => (
              <li key={cat.id} className="category-item mb-2">
                <button
                  className="category-toggle d-flex justify-content-between align-items-center w-100 btn btn-link p-0 text-start"
                  onClick={() => toggleCategory(cat.id)}
                  aria-expanded={expandedCategory === cat.id}
                  aria-controls={`subcat-${cat.id}`}
                >
                  <span>
                    <i className={`bi ${cat.icon} me-2`}></i> {cat.name}
                  </span>
                  <i
                    className={`bi ${
                      expandedCategory === cat.id
                        ? "bi-caret-up-fill"
                        : "bi-caret-down-fill"
                    }`}
                  />
                </button>

                <ul
                  id={`subcat-${cat.id}`}
                  className={`subcategory-list list-unstyled ps-4 mt-1 mb-0 ${
                    expandedCategory === cat.id ? "expanded" : "collapsed"
                  }`}
                  aria-hidden={expandedCategory !== cat.id}
                >
                  {cat.subcategories.map((sub, i) => (
                    <li key={i} className="mb-1">
                      <a href="#" className="text-decoration-none text-dark">
                        {sub}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <style jsx>{`
        .custom-sidebar {
          background: #fff;
          width: 280px;
          max-width: 100vw;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          overflow-y: auto;
          box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
          z-index: 1200;
          display: flex;
          flex-direction: column;
        }
        .custom-sidebar.open {
          transform: translateX(0);
        }

        .overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.4);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 1100;
        }
        .overlay.visible {
          opacity: 1;
          pointer-events: auto;
        }

        .sidebar-user {
          background-color: #ffe6e6;
          color: #e55353;
          border-radius: 0 0 14px 14px;
        }
        .user-icon {
          font-size: 36px;
          color: #e55353;
          flex-shrink: 0;
        }
        .user-greeting {
          font-size: 14px;
          opacity: 0.8;
        }
        .user-name {
          font-size: 18px;
        }
        .user-actions a {
          font-weight: 600;
          text-align: center;
          border-radius: 6px;
        }

        .btn-close {
          background: transparent;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .category-toggle {
          font-weight: 600;
          color: #333;
          border: none;
        }
        .category-toggle:hover,
        .category-toggle:focus {
          color: #e55353;
          text-decoration: none;
          outline: none;
        }

        .subcategory-list.collapsed {
          display: none;
        }
        .subcategory-list.expanded {
          display: block;
        }

        /* Exemplo para esconder avatar/botão no header no mobile
           (Se você tem um header separado, faça essa regra lá) */
        @media (max-width: 767px) {
          /* Exemplo:
          .header-user-avatar,
          .header-login-button {
            display: none !important;
          }
          */
        }
      `}</style>
    </>
  );
}
