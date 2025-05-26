"use client";

import { useState, useRef, useEffect } from "react";

export default function DropdownUsuario() {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<"login" | "signup" | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Fecha dropdown ao clicar fora
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

  // Abre modal login e fecha dropdown
  const openLoginModal = () => {
    setOpen(false);
    setModalType("login");
  };

  // Abre modal criar conta e fecha dropdown
  const openSignupModal = () => {
    setOpen(false);
    setModalType("signup");
  };

  // Fecha modal (login ou signup)
  const closeModal = () => {
    setModalType(null);
    setShowPassword(false);
  };

  return (
    <div className="user-dropdown" ref={userDropdownRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Menu usuário"
        className="btn text-dark p-0 d-none d-md-flex align-items-center"
      >
        <i className="bi bi-person-circle fs-4" />
      </button>

      {open && (
        <div className="dropdown-user-menu shadow rounded bg-white">
          <p className="mb-2 px-3 pt-3 text-dark fw-bold">Olá, Convidado</p>
          <div className="px-3 pb-3 d-flex flex-column gap-2">
            <button onClick={openLoginModal} className="btn btn-outline-danger btn-sm w-100">
              Entrar
            </button>
            <button onClick={openSignupModal} className="btn btn-danger btn-sm w-100">
              Criar Conta
            </button>
          </div>
        </div>
      )}

      {(modalType === "login" || modalType === "signup") && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalType === "login" ? "modalLoginTitle" : "modalSignupTitle"}
          >
            <button type="button" className="btn-close" aria-label="Fechar" onClick={closeModal} />

            {modalType === "login" && (
              <>
                <h2 id="modalLoginTitle">Entrar na sua conta</h2>

                <button
                  type="button"
                  className="btn-google"
                  onClick={() => alert("Aqui você pode iniciar login com Google")}
                >
                  <i className="bi bi-google fs-5 me-2" />
                  Entrar com Google
                </button>

                <div className="divider">ou</div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Login enviado!");
                    closeModal();
                  }}
                >
                  <label htmlFor="inputEmail" className="form-label">
                    Email
                  </label>
                  <div className="input-icon-wrapper">
                    <i className="bi bi-envelope-fill input-icon" />
                    <input
                      type="email"
                      id="inputEmail"
                      className="form-input"
                      placeholder="seuemail@exemplo.com"
                      required
                      autoFocus
                    />
                  </div>

                  <label htmlFor="inputPassword" className="form-label mt-3">
                    Senha
                  </label>
                  <div className="input-icon-wrapper">
                    <i className="bi bi-lock-fill input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="inputPassword"
                      className="form-input"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      className="btn-show-password"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                      <i className={showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"} />
                    </button>
                  </div>

                  <button type="submit" className="btn-submit">
                    Entrar
                  </button>
                </form>

                <p className="signup-text">
                  Não tem uma conta?{" "}
                  <button type="button" className="link-button" onClick={() => setModalType("signup")}>
                    Crie aqui
                  </button>
                </p>
              </>
            )}

            {modalType === "signup" && (
              <>
                <h2 id="modalSignupTitle">Criar uma nova conta</h2>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Cadastro enviado!");
                    closeModal();
                  }}
                >
                  <label htmlFor="signupName" className="form-label">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    id="signupName"
                    className="form-input"
                    placeholder="Seu nome"
                    required
                    autoFocus
                  />

                  <label htmlFor="signupEmail" className="form-label mt-3">
                    Email
                  </label>
                  <input
                    type="email"
                    id="signupEmail"
                    className="form-input"
                    placeholder="seuemail@exemplo.com"
                    required
                  />

                  <label htmlFor="signupPassword" className="form-label mt-3">
                    Senha
                  </label>
                  <input
                    type="password"
                    id="signupPassword"
                    className="form-input"
                    placeholder="••••••••"
                    required
                  />

                  <button type="submit" className="btn-submit">
                    Criar Conta
                  </button>
                </form>

                <p className="signup-text">
                  Já tem uma conta?{" "}
                  <button type="button" className="link-button" onClick={() => setModalType("login")}>
                    Entre aqui
                  </button>
                </p>
              </>
            )}
          </div>

          <style jsx>{`
            .modal-backdrop {
              position: fixed;
              inset: 0;
              background-color: rgba(0, 0, 0, 0.6);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 1050;
              padding: 1rem;
            }
            .modal-content {
              background: #fff;
              border-radius: 12px;
              box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
              max-width: 400px;
              width: 100%;
              padding: 2rem 2.5rem;
              position: relative;
              box-sizing: border-box;
            }
            .btn-close {
              position: absolute;
              top: 1rem;
              right: 1rem;
              background: transparent;
              border: none;
              font-size: 1.5rem;
              cursor: pointer;
            }
            h2 {
              margin-bottom: 1rem;
              font-weight: 700;
              color: #222;
              text-align: center;
            }
            .btn-google {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 0.5rem;
              width: 100%;
              padding: 0.6rem 0;
              margin-bottom: 1rem;
              border: none;
              border-radius: 8px;
              background-color: #db4437;
              color: white;
              font-weight: 600;
              cursor: pointer;
              transition: background-color 0.3s ease;
            }
            .btn-google:hover {
              background-color: #b33c2f;
            }
            .divider {
              text-align: center;
              margin-bottom: 1rem;
              font-size: 0.9rem;
              color: #888;
              position: relative;
            }
            .divider::before,
            .divider::after {
              content: "";
              position: absolute;
              top: 50%;
              width: 40%;
              height: 1px;
              background: #ddd;
            }
            .divider::before {
              left: 0;
            }
            .divider::after {
              right: 0;
            }
            form {
              display: flex;
              flex-direction: column;
              gap: 1rem;
            }
            .form-label {
              font-weight: 600;
              color: #555;
              margin-bottom: 0.3rem;
            }
            .input-icon-wrapper {
              position: relative;
              display: flex;
              align-items: center;
            }
            .input-icon {
              position: absolute;
              left: 12px;
              color: #999;
              pointer-events: none;
              font-size: 1.2rem;
            }
            .form-input {
              width: 100%;
              padding: 0.75rem 2.8rem 0.75rem 2.8rem;
              border-radius: 8px;
              border: 1.5px solid #ccc;
              font-size: 1rem;
              transition: border-color 0.3s ease;
              outline-offset: 2px;
            }
            .form-input:focus {
              border-color: #dc3545;
              outline: none;
              box-shadow: 0 0 5px rgba(220, 53, 69, 0.5);
            }
            .btn-show-password {
              position: absolute;
              right: 10px;
              background: transparent;
              border: none;
              cursor: pointer;
              color: #666;
              font-size: 1.3rem;
              padding: 0;
              display: flex;
              align-items: center;
              user-select: none;
            }
            .btn-submit {
              margin-top: 1rem;
              padding: 0.75rem 0;
              background-color: #dc3545;
              border: none;
              border-radius: 8px;
              color: white;
              font-weight: 700;
              font-size: 1.1rem;
              cursor: pointer;
              transition: background-color 0.3s ease;
            }
            .btn-submit:hover {
              background-color: #b02a37;
            }
            .signup-text {
              margin-top: 1rem;
              font-size: 0.9rem;
              text-align: center;
              color: #666;
            }
            .signup-text a,
            .link-button {
              color: #dc3545;
              font-weight: 600;
              text-decoration: none;
              background: none;
              border: none;
              padding: 0;
              cursor: pointer;
              font-size: 0.9rem;
              font-family: inherit;
            }
            .signup-text a:hover,
            .link-button:hover {
              text-decoration: underline;
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
