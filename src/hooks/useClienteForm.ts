// src/hooks/useClienteForm.ts
import { useState } from "react";
import type { Cliente } from "../types/cliente";
import { createCliente, updateCliente } from "../api/cliente";
import { useModal } from "../context/ModalContext";

export function useClienteForm(id?: string) {
  const { showModal } = useModal();
  const [loading, setLoading] = useState(false);

  const saveCliente = async (
    data: Partial<Cliente>
  ): Promise<Cliente | null> => {
    setLoading(true);
    try {
      let result: Cliente;
      if (id) {
        // Atualiza cliente e pega o objeto completo do backend
        result = await updateCliente(id, data);
        showModal("success", {
          title: "Sucesso!",
          message: "Cliente atualizado com sucesso!",
        });
      } else {
        // Cria cliente
        result = await createCliente(data as Cliente);
        showModal("success", {
          title: "Sucesso!",
          message: "Cliente criado com sucesso!",
        });
      }
      return result;
    } catch (err: any) {
      showModal("error", {
        title: "Ops...",
        message: err?.message || "Erro ao salvar cliente",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { saveCliente, loading };
}
