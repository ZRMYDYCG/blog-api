import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger'
import { Category } from './entities/category.entity'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { ApiException } from '../common/filter/http-exception/api.exception'
import { ApiResponseCode } from '../common/enums/api-response-code.enum'
import { Public } from '../public/public.decorator'

@ApiTags('分类管理')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Public()
  @ApiOperation({ summary: '获取所有分类' })
  @ApiResponse({
    status: 200,
    description: '成功获取分类列表',
    type: [Category],
  })
  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll()
  }

  @Public()
  @ApiOperation({ summary: '获取单个分类' })
  @ApiResponse({ status: 200, description: '成功获取分类', type: Category })
  @ApiResponse({ status: 404, description: '分类不存在', type: ApiException })
  @ApiParam({ name: 'id', description: '分类ID', type: Number })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Category> {
    return await this.categoryService.findOne(id)
  }

  @Public()
  @ApiOperation({ summary: '创建新分类' })
  @ApiResponse({ status: 201, description: '成功创建分类', type: Category })
  @ApiBody({ type: CreateCategoryDto })
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.create(createCategoryDto)
  }

  @Public()
  @ApiOperation({ summary: '更新分类' })
  @ApiResponse({ status: 200, description: '成功更新分类', type: Category })
  @ApiResponse({ status: 404, description: '分类不存在', type: ApiException })
  @ApiParam({ name: 'id', description: '分类ID', type: Number })
  @ApiBody({ type: UpdateCategoryDto })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.update(id, updateCategoryDto)
  }

  @Public()
  @ApiOperation({ summary: '删除分类' })
  @ApiResponse({ status: 200, description: '成功删除分类' })
  @ApiResponse({ status: 404, description: '分类不存在', type: ApiException })
  @ApiParam({ name: 'id', description: '分类ID', type: Number })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.categoryService.delete(id)
  }

  @Public()
  @ApiOperation({ summary: '恢复分类' })
  @ApiResponse({ status: 200, description: '成功恢复分类' })
  @ApiResponse({ status: 404, description: '分类不存在', type: ApiException })
  @ApiParam({ name: 'id', description: '分类ID', type: Number })
  @Put(':id/restore')
  async restore(@Param('id') id: number): Promise<void> {
    return await this.categoryService.restore(id)
  }
}
