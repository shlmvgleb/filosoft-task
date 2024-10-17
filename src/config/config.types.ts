export interface NatsConfig {
  url: string;
}

export interface GeneralConfig {
  port: number;
  nats: NatsConfig;
}
