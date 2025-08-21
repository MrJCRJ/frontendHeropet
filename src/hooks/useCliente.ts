// src/hooks/useCliente.ts
import { useEffect, useState } from "react";
import type { Cliente } from "../types/cliente";
import { getCliente } from "../api/cliente";

export function useCliente(id?: string) {
  const [data, setData] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function run() {
      if (!id) {
        setError("ID do cliente não fornecido.");
        setLoading(false);
        return;
      }
      try {
        const c = await getCliente(id);
        if (mounted) setData(c);
      } catch {
        if (mounted)
          setError("Cliente não encontrado ou erro ao buscar dados.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    run();
    return () => {
      mounted = false;
    };
  }, [id]);

  return { data, loading, error };
}
