import { ClienteForm } from "../components/ClienteForm";
import { useClienteForm } from "../hooks/useClienteForm";

export function ClienteCreate() {
  const { saveCliente, loading } = useClienteForm();

  return <ClienteForm onSubmit={saveCliente} loading={loading} />;
}
