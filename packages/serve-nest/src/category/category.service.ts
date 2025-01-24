import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Category } from './entities/category.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ApiException } from '../common/filter/http-exception/api.exception'
import { ApiResponseCode } from '../common/enums/api-response-code.enum'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find({ where: { isDeleted: false } })
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: number): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOneBy({
        id,
        isDeleted: false,
      })
      if (!category) {
        throw new ApiException('分类不存在', ApiResponseCode.COMMON_CODE)
      }
      return category
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const newCategory = new Category()
      newCategory.name = createCategoryDto.name
      newCategory.description = createCategoryDto.description
      newCategory.parentId = createCategoryDto.parentId

      return await this.categoryRepository.save(newCategory)
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({ where: { id } })
      if (!category) {
        throw new ApiException('分类不存在', ApiResponseCode.COMMON_CODE)
      }

      await this.categoryRepository.update(id, updateCategoryDto)
      return await this.categoryRepository.findOne({ where: { id } })
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const category = await this.categoryRepository.findOne({ where: { id } })
      if (!category) {
        throw new ApiException('分类不存在', ApiResponseCode.COMMON_CODE)
      }

      await this.categoryRepository.update(id, { isDeleted: true })
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async restore(id: number): Promise<void> {
    try {
      const category = await this.categoryRepository.findOne({ where: { id } })
      if (!category) {
        throw new ApiException('分类不存在', ApiResponseCode.COMMON_CODE)
      }

      await this.categoryRepository.update(id, { isDeleted: false })
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
