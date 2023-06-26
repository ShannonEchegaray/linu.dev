/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
interface ImportMetaEnv {
    readonly GITHUB_TOKEN: string;
    readonly PUBLIC_ENV: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
