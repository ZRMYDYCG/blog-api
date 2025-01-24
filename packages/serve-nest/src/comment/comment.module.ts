import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Comment } from './entities/comment.entity'
import { CommentService } from './comment.service'
import { CommentController } from './comment.controller'
import { ArticleModule } from '../article/article.module'

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), ArticleModule],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
