"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaUser,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import CarrinhoDrawer from "../Carrinho/Compra";
import DropdownUsuario from "../User/DropdownUsuario";
import DropdownCategorias from "../User/DropdownCategorias";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarDropdownOpen, setSidebarDropdownOpen] = useState(false);
  const [isCarrinhoOpen, setIsCarrinhoOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const categorias = ["Feminino", "Masculino", "Calçados", "Infantil", "Acessórios"];

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light px-3 d-flex align-items-center justify-content-between">
        <button
          className="btn d-lg-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <Link
          href="/"
          className={`navbar-brand ${menuOpen ? "mx-auto" : "mx-lg-0"} d-flex justify-content-center flex-grow-1`}
          style={{ maxWidth: 120 }}
          aria-label="Página inicial"
        >
          <Image src="/img/Logotipo.png" alt="Logotipo" width={120} height={60} />
        </Link>

        {/* Barra de busca desktop com estilo rosa queimado */}
        <form
          className="search-group-desktop d-none d-md-flex mx-auto flex-grow-1 justify-content-center"
          role="search"
          style={{ maxWidth: 500 }}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="form-control custom-search-input"
            type="search"
            placeholder="Buscar produtos..."
          />
          <button className="btn custom-search-button" type="submit" aria-label="Buscar">
            <FaSearch />
          </button>
        </form>

        <div className="d-flex align-items-center gap-3 position-relative">
          <DropdownUsuario />

          <button
            className="btn d-lg-none text-dark"
            aria-label={searchOpen ? "Fechar busca" : "Abrir busca"}
            onClick={() => setSearchOpen((open) => !open)}
          >
            <FaSearch size={20} />
          </button>

          <button
            className="btn text-dark d-flex align-items-center"
            aria-label="Abrir carrinho"
            onClick={() => setIsCarrinhoOpen(true)}
          >
            <FaShoppingCart size={24} />
          </button>
        </div>
      </nav>

      {/* Barra de busca mobile (visível quando searchOpen) */}
      {searchOpen && (
        <div className="search-mobile-overlay d-lg-none">
          <form
            className="search-mobile-form d-flex align-items-center px-3"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              ref={searchInputRef}
              type="search"
              className="form-control me-2"
              placeholder="Buscar produtos..."
              aria-label="Buscar produtos"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              aria-label="Fechar busca"
              onClick={() => setSearchOpen(false)}
            >
              <FaTimes />
            </button>
          </form>
        </div>
      )}

      {/* Dropdown Categorias */}
      <DropdownCategorias />

      {/* Sidebar */}
      <aside className={`sidebar-menu ${menuOpen ? "open" : ""}`}>
        <div className="text-center py-3 border-bottom mb-3 bg-white">
          <FaUser size={22} className="mb-2 text-danger" />
          <p className="mb-1 fw-bold text-dark">
            Olá,
            <br />
            Convidado
          </p>
          <div className="d-flex justify-content-center gap-2 mt-2">
            <button className="btn btn-outline-danger btn-sm">Entrar</button>
            <button className="btn btn-danger btn-sm">Criar Conta</button>
          </div>
        </div>
        <nav className="nav flex-column">
          
          <div className="sidebar-dropdown">
            <button
              type="button"
              className="categoria-toggle-sidebar"
              onClick={() => setSidebarDropdownOpen((open) => !open)}
              aria-haspopup="true"
              aria-expanded={sidebarDropdownOpen}
            >
              Categorias <FaChevronDown className={`icon-sidebar ${sidebarDropdownOpen ? "rotated" : ""}`} />
            </button>
            <div className={`dropdown-categorias-sidebar ${sidebarDropdownOpen ? "show" : ""}`}>
              {categorias.map((categoria) => (
                <Link key={categoria} href={`/categoria/${categoria.toLowerCase()}`} legacyBehavior>
                  <a
                    className="dropdown-link-sidebar"
                    onClick={() => {
                      setSidebarDropdownOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    {categoria}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </aside>

      {(menuOpen || searchOpen) && (
        <div
          onClick={() => {
            setMenuOpen(false);
            setSearchOpen(false);
            setSidebarDropdownOpen(false);
          }}
          className="sidebar-overlay"
        />
      )}

      {/* Carrinho Drawer */}
      <CarrinhoDrawer isOpen={isCarrinhoOpen} onClose={() => setIsCarrinhoOpen(false)} />
    </>
  );
}
