import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { AppDataSourceOptions, ensureEnvVariables } from "./data-source";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    ensureEnvVariables();
    return { ...AppDataSourceOptions };
  }
}
