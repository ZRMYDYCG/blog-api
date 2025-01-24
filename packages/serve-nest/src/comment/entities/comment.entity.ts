import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm'
import { Article } from '../../article/entities/article.entity'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne((type) => Article, (article) => article.comments, {
    nullable: false,
  })
  @JoinColumn({ name: 'articleId' })
  article: Article

  @Column()
  author: string

  @Column({ type: 'text' })
  content: string

  @Column({ type: 'boolean', default: true })
  isActive: boolean

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean

  @Column({ nullable: true })
  parentId?: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
