import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { MenuService } from './menu.service'
import { CreateMenuDto } from './dto/create-menu.dto'
import { UpdateMenuDto } from './dto/update-menu.dto'
import { Public } from '../public/public.decorator'
import { ApiOperation, ApiParam } from '@nestjs/swagger'

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
}
