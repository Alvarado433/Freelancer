"use client";

import React from "react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDinersClub,
  FaCcDiscover,
  FaCcJcb,
  FaCcPaypal,
  FaCcApplePay,
  FaLock,
  FaShieldAlt,
} from "react-icons/fa";

export default function FooterPagamento() {
  return (
    <footer className="bg-white border-top py-4 mt-5 shadow-sm">
      <div className="container">
        <div className="row align-items-center gy-4">
          {/* Bandeiras aceitas */}
          <div className="col-12 col-md-6">
            <h6 className="text-muted fw-semibold mb-3">Formas de pagamento</h6>
            <div className="d-flex flex-wrap gap-3 fs-4 text-secondary">
              <FaCcVisa className="hover-scale" />
              <FaCcMastercard className="hover-scale" />
              <FaCcAmex className="hover-scale" />
              <FaCcDinersClub className="hover-scale" />
              <FaCcDiscover className="hover-scale" />
              <FaCcJcb className="hover-scale" />
              <FaCcPaypal className="hover-scale" />
              <FaCcApplePay className="hover-scale" />
            </div>
          </div>

          {/* Segurança e links */}
          <div className="col-12 col-md-6 text-md-end">
            <div className="d-flex flex-column align-items-start align-items-md-end">
              <p className="mb-1 text-muted small">
                <FaLock className="me-1 text-success" />
                Ambiente 100% seguro com criptografia
              </p>
              <p className="mb-2 text-muted small">
                <FaShieldAlt className="me-1 text-primary" />
                Garantia de proteção dos seus dados
              </p>
              <div className="d-flex gap-3 mt-1">
                <a href="/privacidade" className="text-decoration-none text-muted small">
                  Política de Privacidade
                </a>
                <a href="/termos" className="text-decoration-none text-muted small">
                  Termos de Uso
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estilo adicional */}
      <style jsx>{`
        .hover-scale {
          transition: transform 0.2s ease;
        }
        .hover-scale:hover {
          transform: scale(1.15);
          color: #000;
        }
      `}</style>
    </footer>
  );
}
