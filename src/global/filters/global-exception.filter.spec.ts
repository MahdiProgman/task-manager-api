import { ArgumentsHost } from '@nestjs/common';
import { GlobalExceptionFilter } from './global-exception.filter';
import { Response } from 'express';
import { AppError } from 'src/common/exceptions/app-error.exception';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

describe('GlobalExceptionFilter', () => {
  let filter: GlobalExceptionFilter;
  let mockResponse: jest.Mocked<Response>;
  let mockGetResponse: jest.Mocked<() => Response>;
  let mockHost: jest.Mocked<ArgumentsHost>;

  beforeEach(() => {
    filter = new GlobalExceptionFilter();

    mockResponse = {
      statusCode: 200,
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<jest.Mocked<Response>> as jest.Mocked<Response>;

    mockGetResponse = jest.fn().mockReturnValue(mockResponse);

    mockHost = {
      switchToHttp: jest.fn(
        () =>
          ({
            getResponse: mockGetResponse,
          }) as HttpArgumentsHost,
      ),
    } as Partial<jest.Mocked<ArgumentsHost>> as jest.Mocked<ArgumentsHost>;
  });

  it('should handle unknown exception as internal server error', () => {
    filter.catch(new Error('Some error'), mockHost);

    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      statusCode: 500,
      message: 'Internal Server Errror',
      errorCode: 'INTERNAL_SERVER_ERROR',
    });
  });

  it('should handle AppError exception', () => {
    const appError = new AppError(418, 'App Error Message', 'MY_APP_ERROR');

    filter.catch(appError, mockHost);

    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      statusCode: 418,
      message: 'App Error Message',
      errorCode: 'MY_APP_ERROR',
    });
  });
});
