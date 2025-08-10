import axios from "axios";
import type { Cliente } from "../types/cliente";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getClientes = async (): Promise<Cliente[]> => {
  const { data } = await api.get("/clientes");
  return data;
};

export const getCliente = async (id: string): Promise<Cliente> => {
  const { data } = await api.get(`/clientes/${id}`);
  return data;
};

export const createCliente = async (
  cliente: Omit<Cliente, "id">
): Promise<Cliente> => {
  const { data } = await api.post("/clientes", cliente);
  return data;
};

export const updateCliente = async (
  id: string,
  cliente: Partial<Cliente>
): Promise<Cliente> => {
  const { data } = await api.patch(`/clientes/${id}`, cliente);
  return data;
};

export const deleteCliente = async (id: string): Promise<void> => {
  await api.delete(`/clientes/${id}`);
};
