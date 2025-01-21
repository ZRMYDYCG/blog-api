import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger'
import { CreateUserVo } from './vo/create-user.vo'
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '创建用户' })
  @ApiOkResponse({ description: '返回示例', type: CreateUserVo })
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto)
    return this.userService.create(createUserDto)
  }
}
