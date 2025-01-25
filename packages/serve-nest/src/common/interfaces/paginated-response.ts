export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number // 总数
    size: number // 每页大小
    current: number // 当前页码
    totalPages: number // 总页数
  }
}
