import { IsString, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsString()
  @IsNotEmpty()
  author: string

  @IsString()
  @IsOptional()
  coverImage?: string

  @IsOptional()
  categories?: any[]

  @IsOptional()
  tags?: any[]

  @IsOptional()
  comments?: any[]
}
