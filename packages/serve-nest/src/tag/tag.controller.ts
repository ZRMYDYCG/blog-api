import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger'
import { Tag } from './entities/tag.entity'
import { TagService } from './tag.service'
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'
import { ApiException } from '../common/filter/http-exception/api.exception'
import { ApiResponseCode } from '../common/enums/api-response-code.enum'

@ApiTags('标签管理')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiOperation({ summary: '获取所有标签' })
  @ApiResponse({ status: 200, description: '成功获取标签列表', type: [Tag] })
  @Get()
  async findAll(): Promise<Tag[]> {
    return await this.tagService.findAll()
  }

  @ApiOperation({ summary: '获取单个标签' })
  @ApiResponse({ status: 200, description: '成功获取标签', type: Tag })
  @ApiResponse({ status: 404, description: '标签不存在', type: ApiException })
  @ApiParam({ name: 'id', description: '标签ID', type: Number })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Tag> {
    return await this.tagService.findOne(id)
  }

  @ApiOperation({ summary: '创建新标签' })
  @ApiResponse({ status: 201, description: '成功创建标签', type: Tag })
  @ApiBody({ type: CreateTagDto })
  @Post()
  async create(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return await this.tagService.create(createTagDto)
  }

  @ApiOperation({ summary: '更新标签' })
  @ApiResponse({ status: 200, description: '成功更新标签', type: Tag })
  @ApiResponse({ status: 404, description: '标签不存在', type: ApiException })
  @ApiParam({ name: 'id', description: '标签ID', type: Number })
  @ApiBody({ type: UpdateTagDto })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<Tag> {
    return await this.tagService.update(id, updateTagDto)
  }

  @ApiOperation({ summary: '删除标签' })
  @ApiResponse({ status: 200, description: '成功删除标签' })
  @ApiResponse({ status: 404, description: '标签不存在', type: ApiException })
  @ApiParam({ name: 'id', description: '标签ID', type: Number })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.tagService.delete(id)
  }

  @ApiOperation({ summary: '恢复标签' })
  @ApiResponse({ status: 200, description: '成功恢复标签' })
  @ApiResponse({ status: 404, description: '标签不存在', type: ApiException })
  @ApiParam({ name: 'id', description: '标签ID', type: Number })
  @Put(':id/restore')
  async restore(@Param('id') id: number): Promise<void> {
    return await this.tagService.restore(id)
  }
}
