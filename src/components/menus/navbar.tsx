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
import CarrinhoDrawer from "../Carrinho/Compra"; // ajuste conforme seu projeto

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarDropdownOpen, setSidebarDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isCarrinhoOpen, setIsCarrinhoOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const categorias = ["Feminino", "Masculino", "Calçados", "Infantil", "Acessórios"];
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchTerm = (e.currentTarget as HTMLFormElement).querySelector("input")?.value;
    if (searchTerm) {
      window.location.href = `/buscar?termo=${encodeURIComponent(searchTerm)}`;
    }
  };

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
          onSubmit={handleSearchSubmit}
          style={{ maxWidth: 500 }}
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Buscar produtos..."
            name="search"
          />
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
              <a className="dropdown-link" onClick={() => setDropdownOpen(false)}>
                {categoria}
              </a>
            </Link>
          ))}
        </div>
      </div>

      {/* Busca flutuante mobile */}
      {searchOpen && (
        <div className="floating-search-container">
          <form className="floating-search-form" onSubmit={handleSearchSubmit}>
            <input
              ref={searchInputRef}
              className="floating-search-input"
              type="text"
              placeholder="Buscar produtos..."
              name="search"
            />
            <button type="submit" className="floating-search-btn" aria-label="Buscar">
              <FaSearch />
            </button>
            <button
              type="button"
              className="floating-search-btn"
              onClick={() => setSearchOpen(false)}
              aria-label="Fechar"
            >
              <FaTimes />
            </button>
          </form>
        </div>
      )}

      {/* Drawer do carrinho */}
      <CarrinhoDrawer isOpen={isCarrinhoOpen} onClose={() => setIsCarrinhoOpen(false)} />
    </>
  );
}
