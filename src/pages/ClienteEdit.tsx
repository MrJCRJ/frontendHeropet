import { ClienteForm } from "../components/ClienteForm";
import { useEffect, useState } from "react";
import { getCliente } from "../api/cliente";
import { useParams } from "react-router-dom";
import type { Cliente } from "../types/cliente";
import { useClienteForm } from "../hooks/useClienteForm";

export function ClienteEdit() {
  const { id } = useParams();
  const { saveCliente, loading } = useClienteForm(id);

  const [cliente, setCliente] = useState<Cliente | null>(null);

  useEffect(() => {
    async function fetchCliente() {
      if (!id) return;
      const data = await getCliente(id);
      setCliente(data);
    }
    fetchCliente();
  }, [id]);

  if (!cliente) return <div>Carregando...</div>;

  return (
    <ClienteForm
      initialData={cliente}
      onSubmit={saveCliente}
      loading={loading}
    />
  );
}
