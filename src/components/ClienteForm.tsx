import React, { useState } from "react";
import type { Cliente } from "../types/cliente";
import { FormField, Button } from "./ui";

type ClienteFormProps = {
  initialData?: Partial<Cliente>;
  onSubmit: (data: Partial<Cliente>) => void;
  loading?: boolean;
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField
        name="cpf_cnpj"
        label="CPF/CNPJ"
        placeholder="Digite o CPF ou CNPJ"
        value={formData.cpf_cnpj}
        onChange={handleChange}
        required
      />
      <FormField
        name="nome"
        label="Nome"
        placeholder="Digite o nome"
        value={formData.nome}
        onChange={handleChange}
        required
      />
      <FormField
        name="email"
        label="Email"
        type="email"
        placeholder="Digite o email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <FormField
        name="telefone"
        label="Telefone"
        placeholder="Digite o telefone"
        value={formData.telefone}
        onChange={handleChange}
      />
      <FormField
        name="cep"
        label="CEP"
        placeholder="Digite o CEP"
        value={formData.cep}
        onChange={handleChange}
      />
      <FormField
        name="numero"
        label="Número"
        placeholder="Digite o número"
        value={formData.numero}
        onChange={handleChange}
      />
      <FormField
        name="complemento"
        label="Complemento"
        placeholder="Digite o complemento"
        value={formData.complemento}
        onChange={handleChange}
      />

      <Button type="submit" variant="primary" fullWidth isLoading={loading}>
        Salvar
      </Button>
    </form>
  );
}
