/// <reference types="vite/client" />

declare module '*.json' {
  const value: Record<string, unknown>;
  export default value;
}

interface ImportMetaEnv {
  readonly VITE_GITHUB_PAGES?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
