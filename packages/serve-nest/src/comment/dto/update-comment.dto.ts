import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator'

export class UpdateCommentDto {
  @IsString()
  @IsOptional()
  author?: string

  @IsString()
  @IsOptional()
  content?: string

  @IsOptional()
  isActive?: boolean

  @IsOptional()
  @IsNumber()
  parentId?: number
}
