import { ClienteForm } from "../components/ClienteForm";
import { useEffect, useState } from "react";
import { getCliente, updateCliente } from "../api/cliente";
import { useParams } from "react-router-dom";
import type { Cliente } from "../types/cliente";

export function ClienteEdit() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [cliente, setCliente] = useState<Cliente | null>(null);

  useEffect(() => {
    async function fetchCliente() {
      if (!id) {
        return <div>ID do cliente não fornecido</div>;
      }
      const data = await getCliente(id);
      setCliente(data);
    }
    fetchCliente();
  }, [id]);

  const handleUpdate = async (data: Partial<Cliente>) => {
    setLoading(true);
    try {
      if (!id) {
        return alert("ID do cliente não fornecido");
      }

      // Campos que o backend aceita
      const allowedFields = [
        "cpf_cnpj",
        "nome",
        "email",
        "telefone",
        "cep",
        "numero",
        "complemento",
      ];

      // Cria um objeto só com os campos permitidos e que tenham valor definido
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(
          ([key, value]) => allowedFields.includes(key) && value !== undefined
        )
      );

      console.log("Atualizando cliente com dados filtrados:", filteredData);

      await updateCliente(id, filteredData);
      alert("Cliente atualizado com sucesso!");
    } catch (err: any) {
      alert("Erro ao atualizar cliente: " + (err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  if (!cliente) return <div>Carregando...</div>;

  return (
    <ClienteForm
      initialData={cliente}
      onSubmit={handleUpdate}
      loading={loading}
    />
  );
}
