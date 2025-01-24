import { IsString, IsOptional } from 'class-validator'

export class UpdateArticleDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  content?: string

  @IsString()
  @IsOptional()
  author?: string

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
