"use client";

import React, { useState, useEffect, useRef } from 'react';

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <style>{`
        .user-dropdown {
          position: relative;
          display: inline-flex;
          align-items: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          user-select: none;
          z-index: 1100;
          cursor: pointer;
        }

        .user-dropdown-toggle {
          display: flex;
          align-items: center;
          gap: 12px;
          background: transparent;
          padding: 8px 16px;
          border-radius: 9999px;
          color: #333;
          font-weight: 600;
          font-size: 15px;
          transition: color 0.3s ease, background-color 0.3s ease;
          border: 1px solid transparent;
          box-shadow: none;
          user-select: none;
        }
        .user-dropdown-toggle:hover,
        .user-dropdown-toggle:focus {
          color: #e55353;
          background-color: rgba(229, 83, 83, 0.1);
          outline: none;
          border-color: #e55353;
          box-shadow: 0 0 8px rgba(229, 83, 83, 0.3);
        }

        .user-avatar {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, #ff6b6b, #e55353);
          color: white;
          font-weight: 700;
          font-size: 18px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 0 10px rgba(229, 83, 83, 0.6);
          flex-shrink: 0;
          user-select: none;
          transition: box-shadow 0.3s ease;
        }

        .arrow {
          margin-left: auto;
          width: 12px;
          height: 12px;
          border: solid currentColor;
          border-width: 0 3px 3px 0;
          display: inline-block;
          padding: 3px;
          transform: rotate(45deg);
          transition: transform 0.3s ease;
          user-select: none;
        }
        .arrow.open {
          transform: rotate(-135deg);
        }

        .user-dropdown-menu {
          position: absolute;
          right: 0;
          top: calc(100% + 12px);
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 12px 30px rgba(229, 83, 83, 0.15);
          min-width: 210px;
          padding: 10px 0;
          font-size: 15px;
          color: #444;
          user-select: none;
          animation: dropdownFadeIn 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          backdrop-filter: saturate(180%) blur(8px);
          -webkit-backdrop-filter: saturate(180%) blur(8px);
          list-style: none;
          z-index: 2000;
        }

        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-header {
          font-weight: 700;
          color: #e55353;
          padding: 0 24px 10px 24px;
          font-size: 16px;
          user-select: none;
          border-bottom: 1px solid #f5cccc;
          margin-bottom: 10px;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 24px;
          text-decoration: none;
          color: #555;
          transition: background-color 0.25s ease, color 0.25s ease;
          cursor: pointer;
          user-select: none;
          border-radius: 8px;
          list-style: none;
        }
        .dropdown-item:hover,
        .dropdown-item:focus {
          background-color: #ffe6e6;
          color: #e55353;
          outline: none;
        }

        /* Bootstrap Icons */
        .bi {
          font-size: 20px;
          color: inherit;
          user-select: none;
          flex-shrink: 0;
        }

        /* ESCONDER NO MOBILE */
        @media (max-width: 767px) {
          .user-dropdown {
            display: none !important;
          }
        }
      `}</style>

      <div className="user-dropdown" ref={dropdownRef}>
        <div
          className="user-dropdown-toggle"
          onClick={() => setOpen(!open)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setOpen(!open);
            }
          }}
          aria-haspopup="true"
          aria-expanded={open}
          aria-label="Menu usuário"
        >
          <div className="user-avatar">C</div>
          <span className="user-name">Convidado</span>
          <span className={`arrow ${open ? 'open' : ''}`} />
        </div>

        {open && (
          <ul className="user-dropdown-menu" role="menu" tabIndex={-1}>
            <li className="dropdown-header" role="presentation">
              Olá, Convidado!
            </li>
            <li role="none">
              <a href="/Login" className="dropdown-item" role="menuitem" tabIndex={0}>
                <i className="bi bi-box-arrow-in-right" aria-hidden="true"></i>
                Entrar
              </a>
            </li>
            <li role="none">
              <a href="#" className="dropdown-item" role="menuitem" tabIndex={0}>
                <i className="bi bi-pencil-square" aria-hidden="true"></i>
                Cadastrar
              </a>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
