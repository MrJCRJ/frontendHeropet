/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // pode adicionar outras variáveis do .env aqui
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
