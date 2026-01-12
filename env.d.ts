declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      SOCKS_PROXY: string;
      BOT_TOKEN: string;
      SAUCENAO_API_KEY: string;
      MONGODB_URI: string;
      GELBOORU_API_KEY: string;
      GELBOORU_USER_ID: string;
      RULE34_API_KEY: string;
      RULE34_USER_ID: string;
    }
  }
}

export {};
