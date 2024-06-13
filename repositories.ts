import { AppDataSource } from './src/config/db'
import { User } from './src/entity'
import { Product } from './src/entity/Product'
import { Purchase, PurchaseDetail } from './src/entity/Purchase'
import { Supplier } from './src/entity/Supplier'

export const UserRepository = AppDataSource.getRepository(User)
export const ProductRepo = AppDataSource.getRepository(Product)
export const SupplierRepo = AppDataSource.getRepository(Supplier)
export const PurchaseRepo = AppDataSource.getRepository(Purchase)
export const PurchaseDetailRepo = AppDataSource.getRepository(PurchaseDetail)
