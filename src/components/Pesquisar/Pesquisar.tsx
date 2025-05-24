"use client";
import React, { useState, useRef, useEffect } from "react";

export default function Pesquisar() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".btn-search-mobile")
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <div className="position-relative d-md-none" style={{ minWidth: "fit-content" }}>
      <button
        className="btn btn-outline-primary btn-search-mobile"
        type="button"
        aria-label="Abrir busca"
        onClick={() => setOpen(!open)}
      >
        <i className="bi bi-search fs-4"></i>
      </button>

      <div
        className={`search-dropdown position-absolute mt-2 shadow ${
          open ? "show" : "hide"
        }`}
        style={{
          zIndex: 1100,
          minWidth: "247px",
          maxWidth: "316px",
          left: "-224px",
          right: "auto",
          borderRadius: "93px",
          backgroundColor: "white",
        }}
      >
        <form
          className="d-flex p-2"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            alert(`Buscando por: ${inputRef.current?.value}`);
          }}
        >
          <input
            ref={inputRef}
            type="search"
            className="form-control"
            placeholder="Buscar produtos..."
            aria-label="Buscar produtos"
          />
          <button className="btn btn-primary ms-2" type="submit" aria-label="Buscar">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div>

      <style jsx>{`
        .search-dropdown {
          transition: max-height 0.3s ease, opacity 0.3s ease;
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          display: none;
          padding: 0;
        }
        .search-dropdown.show {
          display: block;
          max-height: 70px;
          opacity: 1;
          padding: 0.5rem 1rem;
        }
        .search-dropdown.hide {
          display: none;
          max-height: 0;
          opacity: 0;
          padding: 0;
        }
        form.d-flex > input {
          flex: 1 1 auto;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
}
