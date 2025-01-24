import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsArray,
} from 'class-validator'

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  content: string

  @IsNotEmpty()
  @IsString()
  author: string

  @IsOptional()
  @IsString()
  coverImage?: string

  @IsOptional()
  @IsBoolean()
  isActive?: boolean

  @IsNotEmpty()
  @IsNumber()
  categoryId: number

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  tagIds: number[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  newTagNames?: string[]
}
