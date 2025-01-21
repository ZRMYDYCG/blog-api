import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ApiException } from '../common/filter/http-exception/api.exception'
import { HttpExceptionFilter } from '../common/filter/http-exception/http-exception.filter'
import { ApiResponseCode } from '../common/enums/api-response-code.enum'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto
    const existUser = await this.userRepository.findOne({
      where: { username },
    })
    if (existUser) {
      throw new ApiException('用户已经存在', ApiResponseCode.USER_EXIST)
    }
    try {
      const newUser = new User()
      newUser.username = username
      newUser.password = password
      await this.userRepository.save(newUser)
      return '注册成功'
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
