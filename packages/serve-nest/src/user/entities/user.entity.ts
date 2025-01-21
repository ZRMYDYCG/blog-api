import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number // 标记为主建, 值自动生成
  @Column({ length: 30 })
  username: string // 用户名
  @Column({ nullable: true })
  nickname: string // 昵称
  @Column()
  password: string // 密码
  @Column({ nullable: true })
  avatar: string // 用户头像
  @Column({ nullable: true })
  email: string // 邮箱
  @Column({ nullable: true })
  role: string // 角色
  @Column({ nullable: true })
  salt: string // 密码盐
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date // 创建时间
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date // 更新时间
}
