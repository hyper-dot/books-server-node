import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { User } from './User'

@Entity()
export class OTP {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  otp: string

  @OneToOne(() => User)
  @JoinColumn()
  user: User

  @Column()
  userId: number
}
