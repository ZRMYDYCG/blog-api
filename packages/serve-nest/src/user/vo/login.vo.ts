import { ApiProperty } from '@nestjs/swagger'

export class LoginVo {
  @ApiProperty({ example: 200 })
  code: number
  @ApiProperty({ example: 'fake-token' })
  data: string
  @ApiProperty({ example: '登录成功' })
  description: string
}
