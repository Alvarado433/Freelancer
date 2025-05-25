"use client";

import { useRef } from "react";
import { FaSearch } from "react-icons/fa";

export default function Pesquisar() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const termo = inputRef.current?.value.trim();
    if (termo) {
      window.location.href = `/buscar?termo=${encodeURIComponent(termo)}`;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-none d-md-flex align-items-center border border-2 border-danger rounded"
      role="search"
      aria-label="Pesquisar produtos"
      style={{ maxWidth: 400, flexGrow: 1, marginLeft: "1rem" }}
    >
      <input
        ref={inputRef}
        type="search"
        placeholder="Buscar produtos..."
        aria-label="Buscar produtos"
        className="form-control border-0"
        style={{ boxShadow: "none" }}
      />
      <button
        type="submit"
        className="btn btn-danger"
        aria-label="Buscar"
        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
      >
        <FaSearch />
      </button>
    </form>
  );
}
