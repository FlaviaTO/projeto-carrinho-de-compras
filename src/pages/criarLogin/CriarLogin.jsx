import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./CriarLogin.css";

function CriarLogin() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [mensagemTipo, setMensagemTipo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Tela de Cadastro";
  }, []);

  const senhasIguais = senha === confirmarSenha;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setMensagem("O email deve conter '@'");
      setMensagemTipo("erro");
      return;
    }

    if (senha.trim() === "") {
      setMensagem("A senha não pode estar vazia.");
      setMensagemTipo("erro");
      return;
    }

    if (!senhasIguais) {
      setMensagem("As senhas não coincidem.");
      setMensagemTipo("erro");
      return;
    }

    setMensagem("Cadastro realizado com sucesso!");
    setMensagemTipo("sucesso");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Criar Conta</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              required
              placeholder="Informe o seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
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
                placeholder="Crie uma senha"
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
          <div className="form-group senha-group">
            <label>Confirmar Senha</label>
            <div className="senha-wrapper">
              <input
                type={mostrarConfirmacao ? "text" : "password"}
                required
                placeholder="Repita a senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
              <span
                className="icone-senha"
                onClick={() => setMostrarConfirmacao(!mostrarConfirmacao)}
              >
                {mostrarConfirmacao ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
            {!senhasIguais && confirmarSenha && (
              <p className="erro-mensagem">As senhas não coincidem.</p>
            )}
          </div>
          <button className="btn-roxa" type="submit" disabled={!senhasIguais}>
            Cadastrar
          </button>
        </form>

        {mensagem && <p className={`mensagem ${mensagemTipo}`}>{mensagem}</p>}

        <p className="auth-link">
          Já tem uma conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
}

export default CriarLogin;
