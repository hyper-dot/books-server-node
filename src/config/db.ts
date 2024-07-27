import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { OTP, User } from '../entity'
import { Product } from '../entity/Product'
import { Purchase, PurchaseDetail } from '../entity/Purchase'
import { Supplier } from '../entity/Supplier'

import * as dotenv from 'dotenv'
dotenv.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  ssl: process.env.ENV === 'development',
  synchronize: true,
  entities: [User, OTP, Product, Purchase, PurchaseDetail, Supplier],
})
