import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiResponse extends HttpException {
  test = false;
  constructor(response: any, status: HttpStatus) {
    response = { customResponse: true, response };
    super(response, status);
  }
}
