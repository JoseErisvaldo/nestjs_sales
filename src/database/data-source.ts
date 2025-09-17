import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
import * as path from "path";

config({ path: path.resolve(process.cwd(), ".env") });

const requiredEnvVars = [
  "TYP_DB_HOST",
  "TYP_DB_PORT",
  "TYP_DB_USERNAME",
  "TYP_DB_PASSWORD",
  "TYP_DB_NAME",
];

export function ensureEnvVariables(): void {
  const missing = requiredEnvVars.filter((varName) => !process.env[varName]);
  if (missing.length) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }
}

export const AppDataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.TYP_DB_HOST,
  port: Number(process.env.TYP_DB_PORT) || 5432,
  username: process.env.TYP_DB_USERNAME,
  password: process.env.TYP_DB_PASSWORD,
  database: process.env.TYP_DB_NAME,
  entities: [path.resolve(__dirname, '..', '**/*.entity.{ts,js}')],
  migrations: [path.join(__dirname, "./migrations/**/*.{ts,js}")],
  synchronize: true,
  logging: process.env.NODE_ENV === "development",
};

export const AppDataSource = new DataSource(AppDataSourceOptions);
