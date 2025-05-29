const API_URL = 'http://localhost:3000/api/produtos';

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : { "Content-Type": "application/json" };
}

export async function listarProdutos() {
  const res = await fetch(API_URL, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Erro ao listar produtos');
  return res.json();
}

export async function criarProduto(produto) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(produto),
  });
  if (!res.ok) throw new Error('Erro ao criar produto');
  return res.json();
}

export async function editarProduto(id, produto) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(produto),
  });
  if (!res.ok) throw new Error('Erro ao editar produto');
  return res.json();
}

export async function removerProduto(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Erro ao remover produto');
  return res.json();
}
