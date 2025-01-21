import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ApiException } from '../common/filter/http-exception/api.exception'
import { HttpExceptionFilter } from '../common/filter/http-exception/http-exception.filter'
import { ApiResponseCode } from '../common/enums/api-response-code.enum'
import { LoginDto } from './dto/login.dto'
import encry from '../utils/crypto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
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
  async login(loginDto: LoginDto) {
    const { username, password } = loginDto
    const user = await this.userRepository.findOne({
      where: { username },
    })
    if (!user) {
      throw new ApiException('用户不存在', ApiResponseCode.USER_NOT_EXIST)
    }
    if (user.password !== encry(password, user.salt)) {
      throw new ApiException('密码错误', ApiResponseCode.PASSWORD_ERR)
    }
    const payload = { username: user.username, sub: user.id }
    return await this.jwtService.signAsync(payload)
  }
}
