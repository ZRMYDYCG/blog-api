import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger'
import { Comment } from './entities/comment.entity'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { ApiException } from '../common/filter/http-exception/api.exception'
import { ApiResponseCode } from '../common/enums/api-response-code.enum'

@ApiTags('评论管理')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: '获取所有评论' })
  @ApiResponse({
    status: 200,
    description: '成功获取评论列表',
    type: [Comment],
  })
  @ApiResponse({ status: 404, description: '文章不存在', type: ApiException })
  @ApiParam({ name: 'articleId', description: '文章ID', type: Number })
  @Get(':articleId')
  async findAll(@Param('articleId') articleId: number): Promise<Comment[]> {
    return await this.commentService.findAll(articleId)
  }

  @ApiOperation({ summary: '获取单个评论' })
  @ApiResponse({ status: 200, description: '成功获取评论', type: Comment })
  @ApiResponse({ status: 404, description: '评论不存在', type: ApiException })
  @ApiParam({ name: 'id', description: '评论ID', type: Number })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Comment> {
    return await this.commentService.findOne(id)
  }

  @ApiOperation({ summary: '创建新评论' })
  @ApiResponse({ status: 201, description: '成功创建评论', type: Comment })
  @ApiResponse({ status: 404, description: '文章不存在', type: ApiException })
  @ApiBody({ type: CreateCommentDto })
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return await this.commentService.create(createCommentDto)
  }

  @ApiOperation({ summary: '更新评论' })
  @ApiResponse({ status: 200, description: '成功更新评论', type: Comment })
  @ApiResponse({ status: 404, description: '评论不存在', type: ApiException })
  @ApiParam({ name: 'id', description: '评论ID', type: Number })
  @ApiBody({ type: UpdateCommentDto })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return await this.commentService.update(id, updateCommentDto)
  }

  @ApiOperation({ summary: '删除评论' })
  @ApiResponse({ status: 200, description: '成功删除评论' })
  @ApiResponse({ status: 404, description: '评论不存在', type: ApiException })
  @ApiParam({ name: 'id', description: '评论ID', type: Number })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.commentService.delete(id)
  }

  @ApiOperation({ summary: '恢复评论' })
  @ApiResponse({ status: 200, description: '成功恢复评论' })
  @ApiResponse({
    status: 404,
    description: '评论不存在或未删除',
    type: ApiException,
  })
  @ApiParam({ name: 'id', description: '评论ID', type: Number })
  @Put(':id/restore')
  async restore(@Param('id') id: number): Promise<void> {
    return await this.commentService.restore(id)
  }
}
