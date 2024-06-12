import { AppDataSource } from './src/config/db'
import { User } from './src/entity'

export const UserRepository = AppDataSource.getRepository(User)
