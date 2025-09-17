import { User } from '../../users/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  
  @Entity('orders')
  export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    total: number;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  
    @ManyToOne(() => User, (user) => user.orders, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @Column({ name: 'user_id' })
    userId: string;
  
    @Column({ name: 'establishment_id', type: 'uuid' })
    establishmentId: string;
  
    @Column({ type: 'varchar', length: 50, default: 'Pending' })
    status: string;
  
    @Column({ name: 'canceled_at', type: 'timestamp', nullable: true })
    canceledAt: Date;
  
    @Column({ name: 'reason_canceled', type: 'text', nullable: true })
    reasonCanceled: string;
  
    @Column({ name: 'payment_method', type: 'varchar', length: 50, nullable: true })
    paymentMethod: string;
  
    @Column({ type: 'text', nullable: true })
    observation: string;
  
  }
  