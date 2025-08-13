import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Cliente } from "../types/cliente";
import { getCliente } from "../api/cliente";
import { Card, Button } from "../components/ui";

export function ClienteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCliente() {
      if (!id) {
        setError("ID do cliente não fornecido.");
        setLoading(false);
        return;
      }
      try {
        const data = await getCliente(id);
        setCliente(data);
      } catch {
        setError("Cliente não encontrado ou erro ao buscar dados.");
      } finally {
        setLoading(false);
      }
    }

    fetchCliente();
  }, [id]);

  if (loading)
    return (
      <p className="text-gray-400" role="status">
        Carregando detalhes do cliente...
      </p>
    );

  if (error)
    return (
      <div className="flex flex-col gap-4">
        <p className="text-red-400" role="alert">
          {error}
        </p>
        <Button variant="primary" onClick={() => navigate("/clientes")}>
          Voltar para lista
        </Button>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Detalhes do Cliente</h1>

        <Card>
          <p>
            <strong>Nome:</strong> {cliente?.nome}
          </p>
          <p>
            <strong>CPF/CNPJ:</strong> {cliente?.cpf_cnpj}
          </p>
          <p>
            <strong>Email:</strong> {cliente?.email}
          </p>
          <p>
            <strong>Telefone:</strong> {cliente?.telefone ?? "Não informado"}
          </p>
          <p>
            <strong>CEP:</strong> {cliente?.cep ?? "Não informado"}
          </p>
          <p>
            <strong>Número:</strong> {cliente?.numero ?? "Não informado"}
          </p>
          <p>
            <strong>Complemento:</strong>{" "}
            {cliente?.complemento ?? "Não informado"}
          </p>
        </Card>

        <Button variant="primary" onClick={() => navigate("/clientes")}>
          Voltar para lista
        </Button>
      </div>
    </div>
  );
}
