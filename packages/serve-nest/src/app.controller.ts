import { Body, Controller, Get, HttpException, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiException } from './common/filter/http-exception/api.exception'
import { ApiResponseCode } from './common/enums/api-response-code.enum'

interface CreateCatDto {}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    throw new ApiException('该用户不存在', ApiResponseCode.USER_NOT_EXIST)
  }
}
