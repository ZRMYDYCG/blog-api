import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator'

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  author: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsOptional()
  @IsNumber()
  parentId?: number

  @IsNumber()
  @IsNotEmpty()
  articleId: number
}
