import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { Comment } from './entities/comment.entity'
import { Article } from '../article/entities/article.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ApiException } from '../common/filter/http-exception/api.exception'
import { ApiResponseCode } from '../common/enums/api-response-code.enum'

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async findAll(articleId: number): Promise<Comment[]> {
    try {
      const article = await this.articleRepository.findOne({
        where: {
          id: articleId,
          isDeleted: false,
        },
      })
      if (!article) {
        throw new ApiException('文章不存在', ApiResponseCode.COMMON_CODE)
      }

      return await this.commentRepository.find({
        where: { article: { id: articleId }, isDeleted: false },
        order: { createdAt: 'ASC' },
      })
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: number): Promise<Comment> {
    try {
      const comment = await this.commentRepository.findOne({
        where: {
          id,
          isDeleted: false,
        },
      })
      if (!comment) {
        throw new ApiException('评论不存在', ApiResponseCode.COMMON_CODE)
      }
      return comment
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      const article = await this.articleRepository.findOne({
        where: {
          id: createCommentDto.articleId,
          isDeleted: false,
        },
      })
      if (!article) {
        throw new ApiException('文章不存在', ApiResponseCode.COMMON_CODE)
      }

      const newComment = new Comment()
      newComment.article = article
      newComment.author = createCommentDto.author
      newComment.content = createCommentDto.content
      newComment.parentId = createCommentDto.parentId

      return await this.commentRepository.save(newComment)
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    try {
      const comment = await this.commentRepository.findOne({
        where: { id, isDeleted: false },
      })
      if (!comment) {
        throw new ApiException('评论不存在', ApiResponseCode.COMMON_CODE)
      }

      await this.commentRepository.update(id, updateCommentDto)
      return await this.commentRepository.findOne({
        where: { id, isDeleted: false },
      })
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const comment = await this.commentRepository.findOne({
        where: { id, isDeleted: false },
      })
      if (!comment) {
        throw new ApiException('评论不存在', ApiResponseCode.COMMON_CODE)
      }

      await this.commentRepository.update(id, { isDeleted: true })
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async restore(id: number): Promise<void> {
    try {
      const comment = await this.commentRepository.findOne({
        where: { id, isDeleted: true },
      })
      if (!comment) {
        throw new ApiException(
          '评论不存在或未删除',
          ApiResponseCode.COMMON_CODE,
        )
      }

      await this.commentRepository.update(id, { isDeleted: false })
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
