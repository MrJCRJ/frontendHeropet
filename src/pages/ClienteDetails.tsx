import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Cliente } from "../types/cliente"; // Ajuste o caminho conforme seu projeto
import { getCliente } from "../api/cliente"; // Função que busca cliente pela API

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
      } catch (err) {
        setError("Cliente não encontrado ou erro ao buscar dados.");
      } finally {
        setLoading(false);
      }
    }

    fetchCliente();
  }, [id]);

  if (loading) return <div>Carregando detalhes do cliente...</div>;

  if (error)
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => navigate("/clientes")}>Voltar para lista</button>
      </div>
    );

  return (
    <div>
      <h2>Detalhes do Cliente</h2>
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
        <strong>Complemento:</strong> {cliente?.complemento ?? "Não informado"}
      </p>

      <button onClick={() => navigate("/clientes")}>Voltar para lista</button>
    </div>
  );
}
