import { AppDataSource } from './src/config/db'
import {
  User,
  Product,
  Purchase,
  PurchaseDetail,
  Supplier,
  OTP,
} from './src/entity'

export const UserRepository = AppDataSource.getRepository(User)
export const OTPRepo = AppDataSource.getRepository(OTP)
export const ProductRepo = AppDataSource.getRepository(Product)
export const SupplierRepo = AppDataSource.getRepository(Supplier)
export const PurchaseRepo = AppDataSource.getRepository(Purchase)
export const PurchaseDetailRepo = AppDataSource.getRepository(PurchaseDetail)
