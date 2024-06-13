import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { OTP, User } from '../entity'
import { Product } from '../entity/Product'

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: 'postgres://roshanpaudel:@localhost:5432/mydb',
  ssl: process.env.ENV === 'development',
  synchronize: process.env.ENV === 'development',
  entities: [User, OTP, Product],
  migrations: [],
  subscribers: [],
})
