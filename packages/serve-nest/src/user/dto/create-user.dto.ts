import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({
    example: 'asdf1234',
    description: '\用户名',
  })
  @ApiProperty({
    example: '123456',
    description: '密码',
  })
  password: string
}
