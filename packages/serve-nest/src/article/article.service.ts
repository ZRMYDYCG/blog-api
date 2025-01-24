import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { Article } from './entities/article.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ApiException } from '../common/filter/http-exception/api.exception'
import { ApiResponseCode } from '../common/enums/api-response-code.enum'

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async findAll(): Promise<Article[]> {
    try {
      return await this.articleRepository.find({ where: { isDeleted: false } })
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
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

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    try {
      const newArticle = new Article()
      newArticle.title = createArticleDto.title
      newArticle.content = createArticleDto.content
      newArticle.author = createArticleDto.author
      newArticle.coverImage = createArticleDto.coverImage
      newArticle.categories = createArticleDto.categories
      newArticle.tags = createArticleDto.tags
      newArticle.comments = createArticleDto.comments

      return await this.articleRepository.save(newArticle)
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    try {
      const article = await this.articleRepository.findOne({ where: { id } })
      if (!article) {
        throw new ApiException('文章不存在', ApiResponseCode.COMMON_CODE)
      }

      await this.articleRepository.update(id, updateArticleDto)
      return await this.articleRepository.findOne({ where: { id } })
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
