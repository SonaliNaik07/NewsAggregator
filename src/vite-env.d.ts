interface ImportMetaEnv {
  readonly VITE_NEWS_API_KEY: string;
  // add other env variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}