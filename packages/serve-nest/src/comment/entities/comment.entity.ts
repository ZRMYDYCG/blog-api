import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Article } from '../../article/entities/article.entity'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne((type) => Article, (article) => article.comments)
  @JoinColumn({ name: 'articleId' })
  article: Article

  @Column()
  author: string

  @Column({ type: 'text' })
  content: string

  @Column({ nullable: true })
  parentId?: number

  @Column({ type: 'boolean', default: true })
  isActive: boolean

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
