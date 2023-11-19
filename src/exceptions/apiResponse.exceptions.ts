import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiResponse extends HttpException {
  test = false;
  constructor(response: any, status: HttpStatus) {
    super(response, status);
  }
}
