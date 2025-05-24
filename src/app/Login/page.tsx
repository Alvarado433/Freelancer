"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    setErro("");
    alert(`Logado com sucesso!\nEmail: ${email}`);
  };

  return (
    <>
      <style jsx global>{`
        body,
        html {
          margin: 0;
          padding: 0;
          height: 100%;
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #f9f5f5, #ffe8e8);
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx>{`
        .login-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100vh;
        }

        .login-card {
          background: white;
          padding: 3rem;
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(192, 57, 43, 0.15);
          width: 100%;
          max-width: 420px;
          text-align: center;
          border: 1px solid #ffe3e3;
        }

        h2 {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 2rem;
          color: #c0392b;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }

        .input-group {
          position: relative;
        }

        .input-group i {
          position: absolute;
          top: 50%;
          left: 14px;
          transform: translateY(-50%);
          color: #c0392b;
          font-size: 1.2rem;
        }

        .input-group input {
          padding: 12px 12px 12px 42px;
          font-size: 1rem;
          border-radius: 12px;
          border: 2px solid #eaeaea;
          width: 100%;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          background-color: #fafafa;
        }

        .input-group input:focus {
          border-color: #c0392b;
          outline: none;
          background-color: white;
          box-shadow: 0 0 0 4px rgba(192, 57, 43, 0.1);
        }

        .btn-login {
          background-color: #c0392b;
          color: white;
          border: none;
          padding: 14px;
          border-radius: 14px;
          font-weight: 700;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .btn-login:hover {
          background-color: #e74c3c;
          transform: scale(1.02);
          box-shadow: 0 10px 20px rgba(231, 76, 60, 0.3);
        }

        .error {
          color: #e74c3c;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .login-footer {
          margin-top: 1.8rem;
          font-size: 0.95rem;
        }

        .login-footer a {
          color: #c0392b;
          text-decoration: none;
          font-weight: 600;
          margin: 0 0.4rem;
        }

        .login-footer a:hover {
          color: #e74c3c;
        }
      `}</style>

      <div className="login-wrapper">
        <div className="login-card">
          <h2>Entrar no Painel</h2>

          {erro && <div className="error">{erro}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <i className="bi bi-envelope-fill" />
              <input
                type="email"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <i className="bi bi-lock-fill" />
              <input
                type="password"
                placeholder="Sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-login">
              <i className="bi bi-box-arrow-in-right" />
              Entrar
            </button>
          </form>

          <div className="login-footer">
            <a href="#">Esqueci minha senha</a> | <a href="#">Criar conta</a>
          </div>
        </div>
      </div>
    </>
  );
}
