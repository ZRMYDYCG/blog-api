import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Menu } from '../../menu/entities/menu.entity'

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number
  @Column({
    length: 20,
  })
  role_name: string // 角色名
  @Column()
  role_sort: number // 角色排序
  @Column({
    default: 1,
  })
  status: number // 角色状态（1正常 0停用）
  @Column({
    length: 100,
    nullable: true,
  })
  remark: string // 角色备注
  @Column({
    type: 'bigint',
  })
  update_by: number // 更新者Id
  @CreateDateColumn()
  create_time: Date // 创建时间
  @ManyToMany(() => Menu)
  @JoinTable({
    name: 'role_menu_relation',
  })
  menus: Menu[]
}
