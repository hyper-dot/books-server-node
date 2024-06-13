import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  batch_no: number

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
}
