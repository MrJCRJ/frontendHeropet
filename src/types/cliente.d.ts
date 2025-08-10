export interface Cliente {
  id: string;
  cpf_cnpj: string;
  nome: string;
  email: string;
  telefone?: string;
  cep?: string;
  numero?: string;
  complemento?: string;
}
