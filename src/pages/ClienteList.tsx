import React, { useEffect, useState } from "react";
import { getClientes, deleteCliente } from "../api/cliente";
import type { Cliente } from "../types/cliente";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { Pagination } from "../components/ui/Pagination";

export const ClienteList: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchClientes() {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch {
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

  const filteredClientes = clientes.filter((c) =>
    c.nome.toLowerCase().includes(search.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClientes = filteredClientes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="min-h-screen bg-[#0f1115] text-white px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold tracking-tight">
            📋 Lista de Clientes
          </h1>
          <Link to="/clientes/novo">
            <Button variant="primary">+ Novo Cliente</Button>
          </Link>
        </div>

        {/* Busca */}
        <div className="mb-6">
          <Input
            placeholder="Buscar cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Lista */}
        {loading && <p className="text-gray-400">Carregando clientes...</p>}
        {error && <p className="text-red-400">{error}</p>}
        {!loading && !error && paginatedClientes.length === 0 && (
          <p className="text-gray-400">Nenhum cliente encontrado.</p>
        )}

        {!loading && !error && paginatedClientes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedClientes.map((cliente) => (
              <Card
                key={cliente.id}
                onClick={() => navigate(`/clientes/${cliente.id}`)}
              >
                <div className="mb-3">
                  <h2 className="text-lg font-semibold group-hover:text-blue-400 transition-colors">
                    {cliente.nome}
                  </h2>
                  <p className="text-sm text-gray-400">{cliente.email}</p>
                  <p className="text-sm text-gray-500">{cliente.telefone}</p>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="warning"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/clientes/${cliente.id}/editar`);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(cliente.id);
                    }}
                  >
                    Excluir
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Paginação */}
        <Pagination
          totalItems={filteredClientes.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};
