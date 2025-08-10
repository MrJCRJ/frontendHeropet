import React, { useEffect, useState } from "react";
import { getClientes, deleteCliente } from "../api/cliente";
import type { Cliente } from "../types/cliente";
import { Link, useNavigate } from "react-router-dom";

export const ClienteList: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchClientes() {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (err) {
        setError("Erro ao carregar clientes");
      } finally {
        setLoading(false);
      }
    }
    fetchClientes();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Confirma a exclusão deste cliente?")) return;

    try {
      await deleteCliente(id);
      setClientes(clientes.filter((c) => c.id !== id));
    } catch {
      alert("Erro ao excluir cliente");
    }
  };

  if (loading) return <p>Carregando clientes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Clientes</h1>
      <Link to="/clientes/novo">Novo Cliente</Link>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            <Link to={`/clientes/${cliente.id}`}>{cliente.nome}</Link> (
            <button onClick={() => navigate(`/clientes/${cliente.id}/editar`)}>
              Editar
            </button>{" "}
            <button onClick={() => handleDelete(cliente.id)}>Excluir</button>)
          </li>
        ))}
      </ul>
    </div>
  );
};
