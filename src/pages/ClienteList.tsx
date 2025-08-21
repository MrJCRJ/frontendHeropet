// src/pages/ClienteList.tsx
import React, { useEffect, useState, useMemo } from "react";
import { getClientes, deleteCliente } from "../api/cliente";
import type { Cliente } from "../types/cliente";
import { Button, Input, Card, Pagination } from "../components/ui";
import { useModal } from "../context/ModalContext";
import { ClienteForm } from "../components/ClienteForm";
import { useClienteForm } from "../hooks/useClienteForm";

export const ClienteList: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { showModal, closeModal } = useModal();
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);

  const { saveCliente, loading: saving } = useClienteForm(selectedCliente?.id);

  // Carregar clientes
  useEffect(() => {
    async function fetchClientes() {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch {
        setError("Erro ao carregar clientes");
        showModal("error", {
          title: "Erro",
          message: "Falha ao carregar clientes.",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchClientes();
  }, []);

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

  // Excluir cliente
  const handleDelete = (cliente: Cliente) => {
    showModal("confirm", {
      title: "Confirma exclusão?",
      message: `Deseja realmente excluir o cliente "${cliente.nome}"?`,
      onConfirm: async () => {
        try {
          await deleteCliente(cliente.id);
          setClientes((prev) => prev.filter((c) => c.id !== cliente.id));
          showModal("success", {
            title: "Cliente excluído!",
            message: `"${cliente.nome}" foi removido.`,
          });
        } catch (err: any) {
          showModal("error", {
            title: "Ops...",
            message: err?.message || "Erro ao excluir cliente",
          });
        }
      },
    });
  };

  // Abrir modal para criar, editar ou ver detalhes
  const openClienteModal = (
    cliente?: Cliente,
    mode: "edit" | "view" | "new" = "new"
  ) => {
    setSelectedCliente(cliente ?? null);

    if (mode === "view" && cliente) {
      showModal("custom", {
        title: `Detalhes de ${cliente.nome}`,
        content: (
          <div className="space-y-2">
            <p>
              <strong>Nome:</strong> {cliente.nome}
            </p>
            <p>
              <strong>Email:</strong> {cliente.email}
            </p>
            <p>
              <strong>Telefone:</strong> {cliente.telefone ?? "Não informado"}
            </p>
            <p>
              <strong>CPF/CNPJ:</strong> {cliente.cpf_cnpj}
            </p>
            <p>
              <strong>CEP:</strong> {cliente.cep ?? "Não informado"}
            </p>
            <p>
              <strong>Número:</strong> {cliente.numero ?? "Não informado"}
            </p>
            <p>
              <strong>Complemento:</strong>{" "}
              {cliente.complemento ?? "Não informado"}
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={closeModal}>Fechar</Button>
              <Button
                variant="warning"
                onClick={() => openClienteModal(cliente, "edit")}
              >
                Editar
              </Button>
            </div>
          </div>
        ),
      });
    } else {
      // Criação ou edição
      showModal("custom", {
        title: mode === "edit" ? `Editar ${cliente?.nome}` : "Novo Cliente",
        content: (
          <ClienteForm
            initialData={cliente ?? {}}
            loading={saving}
            onSubmit={async (data) => {
              await saveCliente(data);
              // Atualiza lista local
              if (cliente) {
                setClientes((prev) =>
                  prev.map((c) => (c.id === cliente.id ? { ...c, ...data } : c))
                );
              } else {
                setClientes((prev) => [...prev, data as Cliente]);
              }
              closeModal();
            }}
          />
        ),
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold tracking-tight">
            📋 Lista de Clientes
          </h1>
          <Button
            variant="primary"
            onClick={() => openClienteModal(undefined, "new")}
          >
            + Novo Cliente
          </Button>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Buscar cliente..."
            aria-label="Buscar cliente"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading && <p className="text-gray-400">Carregando clientes...</p>}
        {error && <p className="text-red-400">{error}</p>}
        {!loading && !error && paginatedClientes.length === 0 && (
          <p className="text-gray-400">Nenhum cliente encontrado.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedClientes.map((cliente) => (
            <Card
              key={cliente.id}
              clickable
              onClick={() => openClienteModal(cliente, "view")}
            >
              <div className="mb-3">
                <h2 className="text-lg font-semibold">{cliente.nome}</h2>
                <p className="text-sm text-gray-400">{cliente.email}</p>
                <p className="text-sm text-gray-500">{cliente.telefone}</p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="warning"
                  onClick={(e) => {
                    e.stopPropagation();
                    openClienteModal(cliente, "edit");
                  }}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(cliente);
                  }}
                >
                  Excluir
                </Button>
              </div>
            </Card>
          ))}
        </div>

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
