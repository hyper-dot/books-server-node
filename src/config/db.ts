import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { OTP, User } from '../entity'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: 'rosan',
  password: process.env.DB_PASSWORD,
  database: 'mydb',
  ssl: process.env.ENV === 'development',
  synchronize: process.env.ENV === 'development',
  // logging: true,
  entities: [User, OTP],
  migrations: [],
  subscribers: [],
})
