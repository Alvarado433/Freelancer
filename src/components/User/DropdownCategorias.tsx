import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

const categorias = ["Feminino", "Masculino", "Calçados", "Infantil", "Acessórios"];

export default function DropdownCategorias() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
    <div className="categorias-container d-none d-md-flex" ref={dropdownRef} style={{ alignItems: "center", gap: "1.5rem" }}>
      {/* Dropdown Categorias */}
      <div>
        <button
          type="button"
          className="categoria-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="true"
          aria-expanded={open}
        >
          Categorias <FaChevronDown className={`icon ${open ? "rotated" : ""}`} />
        </button>

        <div className={`dropdown-categorias ${open ? "show" : ""}`}>
          {categorias.map((categoria) => (
            <Link key={categoria} href={`/categoria/${categoria.toLowerCase()}`} legacyBehavior>
              <a className="dropdown-link" onClick={() => setOpen(false)}>
                {categoria}
              </a>
            </Link>
          ))}
        </div>
      </div>

      {/* Link Cursos com mesma classe sem ícone */}
      <Link href="/Cursos" legacyBehavior>
        <a className="categoria-toggle">
          Cursos
        </a>
      </Link>
    </div>
  );
}
