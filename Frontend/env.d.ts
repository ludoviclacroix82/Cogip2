/// <reference types="vite/client" />

declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
  }
  
  declare namespace NodeJS {
    interface ProcessEnv {
      VUE_APP_URL_API: string;
    }
  }