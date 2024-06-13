import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'
import { Purchase } from './Purchase'

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.suppliers)
  user: User

  @Column()
  phone: string

  @Column()
  address: string

  @OneToMany(() => Purchase, (purchase) => purchase.supplier)
  purchases: Purchase[]

  @Column({ default: Date.now() })
  createdAt: Date
}
