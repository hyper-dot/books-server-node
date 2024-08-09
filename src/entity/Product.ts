import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  batch_no: string

  @Column()
  qty: number

  @Column()
  reorder_qty: number

  @Column()
  selling_price: number

  @Column()
  cost_price: number

  @ManyToOne(() => User, (user) => user.products)
  user: User

  @Column({ default: new Date(Date.now()) })
  createdAt: Date
}
