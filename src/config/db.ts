import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { OTP, User } from '../entity'
import { Product } from '../entity/Product'
import { Purchase, PurchaseDetail } from '../entity/Purchase'
import { Supplier } from '../entity/Supplier'

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: 'postgres://roshanpaudel:@localhost:5432/mydb',
  ssl: process.env.ENV === 'development',
  synchronize: process.env.ENV === 'development',
  entities: [User, OTP, Product, Purchase, PurchaseDetail, Supplier],
  migrations: [],
  subscribers: [],
})
