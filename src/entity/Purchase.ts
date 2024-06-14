import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Supplier } from './Supplier'

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: new Date(Date.now()) })
  createdAt: Date

  @Column()
  amount: number

  @Column()
  discount: number

  @ManyToOne(() => Supplier, (supplier) => supplier.purchases)
  supplier: Supplier

  @OneToMany(() => PurchaseDetail, (detail) => detail.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  purchase_details: PurchaseDetail[]
}

@Entity()
export class PurchaseDetail {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  qty: number

  @Column()
  unit_price: number

  @ManyToOne(() => Purchase, (purchase) => purchase.id)
  purchase: Purchase
}
