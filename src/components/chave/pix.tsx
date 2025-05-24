"use client";

import React, { useState } from "react";
import QRCode from "react-qr-code";

interface PixPaymentProps {
  chavePix: string;
}

export default function PixPayment({ chavePix }: PixPaymentProps) {
  const [copiado, setCopiado] = useState(false);

  const copiarChavePix = () => {
    navigator.clipboard.writeText(chavePix).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    });
  };

  return (
    <div className="mb-4 text-center">
      <h5>Chave Pix</h5>
      <p className="mb-2 fw-bold">{chavePix}</p>
      <button
        className="btn btn-outline-primary mb-3"
        onClick={copiarChavePix}
        type="button"
        aria-label="Copiar chave Pix"
      >
        {copiado ? "Copiado!" : "Copiar chave Pix"}
      </button>

      <div style={{ maxWidth: 200, margin: "0 auto" }}>
        <QRCode value={chavePix} size={200} />
      </div>

      <p className="text-muted mt-3">
        Escaneie o QR Code com seu app bancário para pagar
      </p>
    </div>
  );
}
