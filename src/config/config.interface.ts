export interface Configuration {
  app: AppConfig;
}

export interface AppConfig {
  jwt_secret: string;
  port: number;
}
