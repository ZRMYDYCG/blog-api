import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number
  @Column({
    length: 20,
  })
  title: string // 标题
  @Column()
  order_num: number // 排序
  @Column({ nullable: true })
  parent_id: number // 父级菜单id
  @Column()
  menu_type: number // 菜单类型 1.目录 2.菜单 3.按钮
  @Column({
    length: 50,
    nullable: true,
  })
  icon: string // 图标
  @Column({
    length: 50,
    nullable: false,
  })
  content: string // 组件路径
  @Column({
    length: 50,
    nullable: true,
  })
  permission: string // 权限标识
  @Column({
    length: 50,
  })
  path: string // 路由
  @Column({
    type: 'bigint',
  })
  created_by: number // 创建人
  @Column({
    default: 1,
  })
  status: number
  @CreateDateColumn()
  created_time: Date // 创建时间
  @UpdateDateColumn()
  updated_time: Date // 更新时间
}
