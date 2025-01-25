/**
 * @description: 响应结果拦截器
 * */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { CommonResponse } from '../../interfaces/common-response'
import { PaginatedResponse } from '../../interfaces/paginated-response'

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, CommonResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<CommonResponse<T>> {
    return next.handle().pipe(
      map((data: T | PaginatedResponse<T>) => {
        if (typeof data === 'object' && data !== null && 'meta' in data) {
          // 如果是分页返回的数据结构
          const paginatedData = data as PaginatedResponse<T>
          return {
            code: 200,
            data: paginatedData.data,
            describe: '请求成功',
          }
        } else {
          // 如果是普通的数据结构
          return {
            code: 200,
            data: data,
            describe: '请求成功',
          }
        }
      }),
    )
  }
}
