import {Body, Controller, Get, HttpException, Post} from '@nestjs/common';
import { AppService } from './app.service';

interface CreateCatDto {
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}



  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    throw new HttpException('Forbidden', 403);
  }
}
