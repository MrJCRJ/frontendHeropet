import { ClienteForm } from "../components/ClienteForm";
import { useState } from "react";
import { createCliente } from "../api/cliente";
import type { Cliente } from "../types/cliente";

export function ClienteCreate() {
  const [loading, setLoading] = useState(false);

  const handleCreate = async (data: Partial<Cliente>) => {
    setLoading(true);
    try {
      await createCliente(data as Cliente);
      alert("Cliente criado com sucesso!");
      // redirecionar ou limpar formulário
    } catch (err: any) {
      alert("Erro ao criar cliente: " + (err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  return <ClienteForm onSubmit={handleCreate} loading={loading} />;
}
