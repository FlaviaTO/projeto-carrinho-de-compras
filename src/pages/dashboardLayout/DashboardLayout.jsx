import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const userName = localStorage.getItem("userName") || "Usuário";
  const initial = userName.charAt(0).toUpperCase();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="user-info">
          <div className="user-icon">{initial}</div>
          <p>{userName}</p>
        </div>
        <nav className="menu">
          <ul>
            <li>
              <Link to="/produtos">Produtos</Link>
            </li>
            <li>
              <Link to="/criar-produto">Criar</Link>
            </li>
            <li>
              <Link to="/listar-produtos">Listar</Link>
            </li>
          </ul>
        </nav>
        <button className="logout-button" onClick={handleLogout}>
          Sair
        </button>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
