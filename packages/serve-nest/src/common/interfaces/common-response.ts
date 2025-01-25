import { PaginatedResponse } from './paginated-response'

export interface CommonResponse<T> {
  code: number
  data: T | T[] | PaginatedResponse<T>
  describe: string
}
