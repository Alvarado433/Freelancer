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
import CarrinhoDrawer from "../Carrinho/Compra"; // ajuste o caminho conforme seu projeto

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarDropdownOpen, setSidebarDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Estado para abrir/fechar carrinho
  const [isCarrinhoOpen, setIsCarrinhoOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const categorias = ["Feminino", "Masculino", "Calçados", "Infantil", "Acessórios"];
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Fecha dropdown categorias desktop clicando fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    if (dropdownOpen || userDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen, userDropdownOpen]);

  // Focar input ao abrir busca flutuante
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

        <form
          className="search-group-desktop d-none d-md-flex mx-auto flex-grow-1 justify-content-center"
          role="search"
          style={{ maxWidth: 500 }}
        >
          <input className="form-control me-2" type="search" placeholder="Buscar produtos..." />
          <button className="btn btn-primary" type="submit">
            <FaSearch />
          </button>
        </form>

        <div className="d-flex align-items-center gap-3 position-relative">
          {/* Ícone usuário com dropdown */}
          <div className="user-dropdown" ref={userDropdownRef}>
            <button
              onClick={() => setUserDropdownOpen((open) => !open)}
              aria-haspopup="true"
              aria-expanded={userDropdownOpen}
              aria-label="Menu usuário"
              className="btn text-dark p-0 d-none d-md-flex align-items-center"
            >
              <FaUser size={20} />
            </button>

            {userDropdownOpen && (
              <div className="dropdown-user-menu shadow rounded bg-white">
                <p className="mb-2 px-3 pt-3 text-dark fw-bold">Olá, Convidado</p>
                <div className="px-3 pb-3 d-flex flex-column gap-2">
                  <Link href="/login" legacyBehavior>
                    <a className="btn btn-outline-danger btn-sm w-100">Entrar</a>
                  </Link>
                  <Link href="/criar-conta" legacyBehavior>
                    <a className="btn btn-danger btn-sm w-100">Criar Conta</a>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Ícone lupa mobile */}
          <button
            className="btn d-lg-none text-dark"
            aria-label="Abrir busca"
            onClick={() => setSearchOpen(true)}
          >
            <FaSearch size={20} />
          </button>

          {/* Ícone do carrinho - abre o drawer */}
          <button
            className="btn text-dark d-flex align-items-center"
            aria-label="Abrir carrinho"
            onClick={() => setIsCarrinhoOpen(true)}
          >
            <FaShoppingCart size={24} />
          </button>
        </div>
      </nav>

      {/* Menu de Categorias desktop */}
      <div className="categorias-container d-none d-md-flex" ref={dropdownRef}>
        <button
          type="button"
          className="categoria-toggle"
          onClick={() => setDropdownOpen((open) => !open)}
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
        >
          Categorias <FaChevronDown className={`icon ${dropdownOpen ? "rotated" : ""}`} />
        </button>

        <div className={`dropdown-categorias ${dropdownOpen ? "show" : ""}`}>
          {categorias.map((categoria) => (
            <Link key={categoria} href={`/categoria/${categoria.toLowerCase()}`} legacyBehavior>
              <a
                className="dropdown-link"
                onClick={() => setDropdownOpen(false)}
              >
                {categoria}
              </a>
            </Link>
          ))}
        </div>
      </div>

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
          <Link href="/" legacyBehavior>
            <a className="nav-link mb-3">Home</a>
          </Link>
          <Link href="/produtos" legacyBehavior>
            <a className="nav-link mb-3">Produtos</a>
          </Link>
          <Link href="/contato" legacyBehavior>
            <a className="nav-link mb-3">Contato</a>
          </Link>
          {/* Dropdown de categorias no sidebar mobile */}
          <div className="sidebar-dropdown">
            <button
              type="button"
              className="categoria-toggle-sidebar"
              onClick={() => setSidebarDropdownOpen((open) => !open)}
              aria-haspopup="true"
              aria-expanded={sidebarDropdownOpen}
            >
              Categorias{" "}
              <FaChevronDown className={`icon-sidebar ${sidebarDropdownOpen ? "rotated" : ""}`} />
            </button>
            <div className={`dropdown-categorias-sidebar ${sidebarDropdownOpen ? "show" : ""}`}>
              {categorias.map((categoria) => (
                <Link
                  key={categoria}
                  href={`/categoria/${categoria.toLowerCase()}`}
                  legacyBehavior
                >
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
            setDropdownOpen(false);
            setSidebarDropdownOpen(false);
            setUserDropdownOpen(false);
          }}
          className="sidebar-overlay"
        />
      )}

      {searchOpen && (
        <div className="floating-search-container">
          <form
            className="floating-search-form"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              ref={searchInputRef}
              type="search"
              className="form-control"
              placeholder="Buscar produtos..."
              aria-label="Buscar produtos"
            />
            <button
              type="button"
              className="btn-close"
              aria-label="Fechar busca"
              onClick={() => setSearchOpen(false)}
            />
          </form>
        </div>
      )}

      {/* Aqui chamamos o CarrinhoDrawer */}
      <CarrinhoDrawer isOpen={isCarrinhoOpen} onClose={() => setIsCarrinhoOpen(false)} />
    </>
  );
}
