import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm'
import * as bcrypt from 'bcrypt'

import { OTP } from './OTP'
import { Product } from './Product'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ default: false })
  verified: boolean

  @Column()
  email: string

  @Column({ nullable: true })
  salt: string

  @Column({ nullable: true })
  hash: string

  @Column({ nullable: true })
  googleId: string

  @Column({ nullable: true })
  picture: string

  @Column({ nullable: true })
  refreshToken: string

  @OneToOne(() => OTP, (otp) => otp.user, { eager: true })
  otp: OTP

  @OneToMany(() => Product, (product) => product.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  products: Product[]

  async validatePassword(password: string) {
    return await bcrypt.compare(password + this.salt, this.hash)
  }
}
