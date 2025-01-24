import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateMenuDto } from './dto/create-menu.dto'
import { UpdateMenuDto } from './dto/update-menu.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Menu } from './entities/menu.entity'
import { Repository } from 'typeorm'
import { User } from '../user/entities/user.entity'
import { ApiException } from '../common/filter/http-exception/api.exception'

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
}
