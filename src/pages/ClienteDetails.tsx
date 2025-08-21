import { useParams } from "react-router-dom";
import { Button, Card } from "../components/ui";
import { useCliente } from "../hooks/useCliente";
import { useModal } from "../context/ModalContext";

export function ClienteDetails() {
  const { id } = useParams();
  const { data: cliente, loading, error } = useCliente(id);
  const { showModal } = useModal();

  // Mostrar erro em modal
  if (error || (!loading && !cliente)) {
    showModal("error", {
      title: "Erro ao carregar",
      message: error ?? "Cliente não encontrado.",
    });
  }

  if (loading) {
    return <p className="text-gray-400">Carregando detalhes do cliente...</p>;
  }

  if (!cliente) return null; // já mostramos o erro acima

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Detalhes do Cliente</h1>

        <Card>
          <p>
            <strong>Nome:</strong> {cliente.nome}
          </p>
          <p>
            <strong>CPF/CNPJ:</strong> {cliente.cpf_cnpj}
          </p>
          <p>
            <strong>Email:</strong> {cliente.email}
          </p>
          <p>
            <strong>Telefone:</strong> {cliente.telefone ?? "Não informado"}
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
        </Card>

        <div className="flex gap-2">
          <Button onClick={() => window.history.back()}>Voltar</Button>
        </div>
      </div>
    </div>
  );
}
