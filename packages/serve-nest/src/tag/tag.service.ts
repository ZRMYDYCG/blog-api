import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'
import { Tag } from './entities/tag.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ApiException } from '../common/filter/http-exception/api.exception'
import { ApiResponseCode } from '../common/enums/api-response-code.enum'

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll(): Promise<Tag[]> {
    try {
      return await this.tagRepository.find({ where: { isDeleted: false } })
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: number): Promise<Tag> {
    try {
      const tag = await this.tagRepository.findOneBy({ id, isDeleted: false })
      if (!tag) {
        throw new ApiException('标签不存在', ApiResponseCode.COMMON_CODE)
      }
      return tag
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    try {
      const newTag = new Tag()
      newTag.name = createTagDto.name
      newTag.description = createTagDto.description

      return await this.tagRepository.save(newTag)
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: number, updateTagDto: UpdateTagDto): Promise<Tag> {
    try {
      const tag = await this.tagRepository.findOne({ where: { id } })
      if (!tag) {
        throw new ApiException('标签不存在', ApiResponseCode.COMMON_CODE)
      }

      await this.tagRepository.update(id, updateTagDto)
      return await this.tagRepository.findOne({ where: { id } })
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const tag = await this.tagRepository.findOne({ where: { id } })
      if (!tag) {
        throw new ApiException('标签不存在', ApiResponseCode.COMMON_CODE)
      }

      await this.tagRepository.update(id, { isDeleted: true })
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async restore(id: number): Promise<void> {
    try {
      const tag = await this.tagRepository.findOne({ where: { id } })
      if (!tag) {
        throw new ApiException('标签不存在', ApiResponseCode.COMMON_CODE)
      }

      await this.tagRepository.update(id, { isDeleted: false })
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
