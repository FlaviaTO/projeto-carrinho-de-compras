import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Tela de Login";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setMensagem("O email deve conter '@'");
      return;
    }

    if (senha.trim() === "") {
      setMensagem("A senha não pode estar vazia.");
      return;
    }

    setMensagem("");
    navigate("/produtos");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Entrar</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              required
              placeholder="Informe o seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group senha-group">
            <label>Senha</label>
            <div className="senha-wrapper">
              <input
                type={mostrarSenha ? "text" : "password"}
                required
                placeholder="Informe a sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <span
                className="icone-senha"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
          </div>
          <button className="btn-roxa" type="submit">
            Entrar
          </button>
        </form>
        <p className="auth-link">
          Não tem uma conta? <Link to="/criar-login">Criar conta</Link>
        </p>

        {mensagem && <p className="mensagem erro">{mensagem}</p>}
      </div>
    </div>
  );
}

export default Login;
