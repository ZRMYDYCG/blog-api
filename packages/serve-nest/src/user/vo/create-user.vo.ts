import { ApiProperty } from '@nestjs/swagger'

export class CreateUserVo {
  @ApiProperty({ example: '200' })
  code: number
  @ApiProperty({ example: 'Success' })
  data: string
  @ApiProperty({ example: 'User created successfully' })
  description: string
}
