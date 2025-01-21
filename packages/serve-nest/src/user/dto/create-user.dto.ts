import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Length, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  @ApiProperty({
    example: 'asdf1234',
    description: '用户名',
  })
  username: string
  @IsNotEmpty({
    message: '密码不能为空',
  })
  @MinLength(6, {
    message: '密码长度不能少于6位',
  })
  @ApiProperty({
    example: '123456',
    description: '密码',
  })
  password: string

  @IsNotEmpty({
    message: 'id不能为空',
  })
  @ApiProperty({
    example: '989asdf',
    description: 'id',
  })
  id: string

  @Length(4, 4, { message: '验证码必须4位' })
  @ApiProperty({
    example: 'sdyaa',
    description: '验证码',
  })
  captcha: string
}
