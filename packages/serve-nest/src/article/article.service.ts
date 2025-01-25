import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { Article } from './entities/article.entity'
import { Category } from '../category/entities/category.entity'
import { Tag } from '../tag/entities/tag.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { ApiException } from '../common/filter/http-exception/api.exception'
import { ApiResponseCode } from '../common/enums/api-response-code.enum'
import { PaginatedResponse } from '../common/interfaces/paginated-response'
import { PaginationDto } from './dto/article-pagination.dto'

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    try {
      // 获取分类
      const category = await this.categoryRepository.findOne({
        where: { id: createArticleDto.categoryId },
      })
      if (!category) {
        throw new ApiException('分类不存在', ApiResponseCode.COMMON_CODE)
      }

      // 获取现有的标签
      const existingTagIds = createArticleDto.tagIds || []
      const existingTags = await this.tagRepository.findBy({
        id: In(existingTagIds),
      })

      // 创建新的标签
      const newTagNames = createArticleDto.newTagNames || []
      const newTags = await Promise.all(
        newTagNames.map(async (name) => {
          const tag = new Tag()
          tag.name = name
          return await this.tagRepository.save(tag)
        }),
      )

      // 合并现有的标签和新创建的标签
      const allTags = [...existingTags, ...newTags]

      // 创建文章实体
      const article = new Article()
      article.title = createArticleDto.title
      article.content = createArticleDto.content
      article.author = createArticleDto.author
      article.coverImage = createArticleDto.coverImage
      article.isActive = createArticleDto.isActive || true
      article.categories = [category] // 用户只能选择一个分类
      article.tags = allTags // 文章可以有多个标签

      // 保存文章
      await this.articleRepository.save(article)

      return article
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<Article>> {
    const { page = 1, size = 10 } = paginationDto
    const [articles, total] = await this.articleRepository.findAndCount({
      where: { isDeleted: false },
      skip: (page - 1) * size,
      take: size,
      relations: ['categories', 'tags'],
    })

    return {
      data: articles,
      meta: {
        total,
        size: Number(size),
        current: Number(page),
        totalPages: Math.ceil(total / size),
      },
    }
  }

  async findOne(id: number): Promise<Article> {
    try {
      const article = await this.articleRepository.findOneBy({
        id: id,
        isDeleted: false,
      })

      if (!article) {
        throw new ApiException('文章不存在', ApiResponseCode.COMMON_CODE)
      }
      return article
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const article = await this.articleRepository.findOne({ where: { id } })
      if (!article) {
        throw new ApiException('文章不存在', ApiResponseCode.COMMON_CODE)
      }

      await this.articleRepository.update(id, { isDeleted: true })
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async restore(id: number): Promise<void> {
    try {
      const article = await this.articleRepository.findOne({ where: { id } })
      if (!article) {
        throw new ApiException('文章不存在', ApiResponseCode.COMMON_CODE)
      }

      await this.articleRepository.update(id, { isDeleted: false })
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
