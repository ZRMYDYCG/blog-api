import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Category } from '../../category/entities/category.entity'
import { Tag } from '../../tag/entities/tag.entity'
import { Comment } from '../../comment/entities/comment.entity'

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ type: 'text' })
  content: string

  @Column()
  author: string

  @Column({ nullable: true })
  coverImage?: string

  @Column({ type: 'boolean', default: true })
  isActive: boolean

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean

  @ManyToMany((type) => Category, (category) => category.articles)
  @JoinTable()
  categories: Category[]

  @ManyToMany((type) => Tag, (tag) => tag.articles)
  @JoinTable()
  tags: Tag[]

  @OneToMany((type) => Comment, (comment) => comment.article, { cascade: true })
  comments: Comment[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
