import { HttpException, HttpStatus } from '@nestjs/common'
import { ApiResponseCode } from '../../enums/api-response-code.enum'

export class ApiException extends HttpException {
  private errorMessage: string
  private errorCode: ApiResponseCode

  constructor(
    errorMessage: string,
    errorCode: ApiResponseCode,
    statusCode: HttpStatus = HttpStatus.OK,
  ) {
    super(errorMessage, statusCode)
    this.errorMessage = errorMessage
    this.errorCode = errorCode
  }

  getErrorCode(): ApiResponseCode {
    return this.errorCode
  }

  getErrorMessage(): string {
    return this.errorMessage
  }
}
