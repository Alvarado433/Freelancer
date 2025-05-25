"use client";

import Image from "next/image";
import Link from "next/link";
import { FaUser, FaShoppingCart, FaBars, FaTimes, FaSearch, FaChevronDown } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";



export default function DropdownUsuario() {
  const [open, setOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="user-dropdown" ref={userDropdownRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Menu usuário"
        className="btn text-dark p-0 d-none d-md-flex align-items-center"
      >
        <FaUser size={20} />
      </button>
      {open && (
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
  );
}
