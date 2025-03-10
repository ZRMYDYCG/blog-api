import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger'
import { Article } from './entities/article.entity'
import { ArticleService } from './article.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { ApiException } from '../common/filter/http-exception/api.exception'
import { ApiResponseCode } from '../common/enums/api-response-code.enum'
import { Public } from '../public/public.decorator'
import { PaginatedResponse } from '../common/interfaces/paginated-response'
import { PaginationDto } from './dto/article-pagination.dto'

@ApiTags('文章管理')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Public()
  @ApiOperation({ summary: '获取所有文章' })
  @ApiResponse({
    status: 200,
    description: '成功获取文章列表',
  })
  @ApiQuery({
    name: 'page',
    description: '当前页码',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'size',
    description: '每页大小',
    required: false,
    type: Number,
  })
  @Get()
  async findAll(
    @Query() params: PaginationDto,
  ): Promise<PaginatedResponse<Article>> {
    return await this.articleService.findAll(params)
  }

  @Public()
  @ApiOperation({ summary: '获取单篇文章' })
  @ApiResponse({ status: 200, description: '成功获取文章', type: Article })
  @ApiResponse({ status: 404, description: '文章不存在', type: ApiException })
  @ApiParam({ name: 'id', description: '文章ID', type: Number })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Article> {
    return await this.articleService.findOne(id)
  }

  @Public()
  @ApiOperation({ summary: '创建新文章' })
  @ApiResponse({ status: 201, description: '成功创建文章', type: Article })
  @ApiBody({ type: CreateArticleDto })
  @Post()
  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.articleService.create(createArticleDto)
  }

  @Public()
  @ApiOperation({ summary: '删除文章' })
  @ApiResponse({ status: 200, description: '成功删除文章' })
  @ApiResponse({ status: 404, description: '文章不存在', type: ApiException })
  @ApiParam({ name: 'id', description: '文章ID', type: Number })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.articleService.delete(id)
  }

  @Public()
  @ApiOperation({ summary: '恢复文章' })
  @ApiResponse({ status: 200, description: '成功恢复文章' })
  @ApiResponse({ status: 404, description: '文章不存在', type: ApiException })
  @ApiParam({ name: 'id', description: '文章ID', type: Number })
  @Put(':id/restore')
  async restore(@Param('id') id: number): Promise<void> {
    await this.articleService.restore(id)
  }
}
