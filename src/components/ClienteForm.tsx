import React, { useState } from "react";
import type { Cliente } from "../types/cliente";

type ClienteFormProps = {
  initialData?: Partial<Cliente>; // dados iniciais para edição
  onSubmit: (data: Partial<Cliente>) => void; // callback quando o formulário for enviado
  loading?: boolean; // opcional para mostrar loading
};

export function ClienteForm({
  initialData = {},
  onSubmit,
  loading = false,
}: ClienteFormProps) {
  const [formData, setFormData] = useState({
    cpf_cnpj: "",
    nome: "",
    email: "",
    telefone: "",
    cep: "",
    numero: "",
    complemento: "",
    ...initialData,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="cpf_cnpj"
        value={formData.cpf_cnpj}
        onChange={handleChange}
        placeholder="CPF/CNPJ"
        required
      />
      <input
        name="nome"
        value={formData.nome}
        onChange={handleChange}
        placeholder="Nome"
        required
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        name="telefone"
        value={formData.telefone}
        onChange={handleChange}
        placeholder="Telefone"
      />
      <input
        name="cep"
        value={formData.cep}
        onChange={handleChange}
        placeholder="CEP"
      />
      <input
        name="numero"
        value={formData.numero}
        onChange={handleChange}
        placeholder="Número"
      />
      <input
        name="complemento"
        value={formData.complemento}
        onChange={handleChange}
        placeholder="Complemento"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
