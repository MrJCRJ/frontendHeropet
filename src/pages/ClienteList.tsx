import React, { useEffect, useState, useMemo } from "react";
import { getClientes, deleteCliente } from "../api/cliente";
import type { Cliente } from "../types/cliente";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Card, Pagination } from "../components/ui";

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

  const filteredClientes = useMemo(
    () =>
      clientes.filter((c) =>
        c.nome.toLowerCase().includes(search.toLowerCase())
      ),
    [clientes, search]
  );

  const paginatedClientes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredClientes.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredClientes, currentPage]);

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-8">
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
            aria-label="Buscar cliente"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Lista */}
        {loading && (
          <p className="text-gray-400" role="status">
            Carregando clientes...
          </p>
        )}
        {error && (
          <p className="text-red-400" role="alert">
            {error}
          </p>
        )}
        {!loading && !error && paginatedClientes.length === 0 && (
          <p className="text-gray-400" role="status">
            Nenhum cliente encontrado.
          </p>
        )}

        {!loading && !error && paginatedClientes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedClientes.map((cliente) => (
              <Card
                key={cliente.id}
                onClick={() => navigate(`/clientes/${cliente.id}`)}
                clickable
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
