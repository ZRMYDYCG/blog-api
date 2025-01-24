import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Article } from './entities/article.entity'
import { ArticleService } from './article.service'
import { ArticleController } from './article.controller'
import { CategoryModule } from '../category/category.module'
import { TagModule } from '../tag/tag.module'

@Module({
  imports: [TypeOrmModule.forFeature([Article]), CategoryModule, TagModule],
  providers: [ArticleService],
  controllers: [ArticleController],
  exports: [TypeOrmModule],
})
export class ArticleModule {}
