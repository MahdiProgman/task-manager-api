import { CallHandler, ExecutionContext } from '@nestjs/common';
import { SuccessResponseHandlerInterceptor } from './success-response-handler.interceptor';
import { Response } from 'express';
import { of } from 'rxjs';
import { SuccessResponse } from 'src/common/types';

describe('SuccessResponseHandlerInterceptor', () => {
  let mockContext: jest.Mocked<ExecutionContext>;
  let mockResponse: jest.Mocked<Response>;
  let mockGetResponse: jest.Mocked<() => Response>;

  let interceptor: SuccessResponseHandlerInterceptor;

  beforeEach(() => {
    mockResponse = {
      statusCode: 200,
      status: jest.fn(),
    } as Partial<jest.Mocked<Response>> as jest.Mocked<Response>;

    mockGetResponse = jest.fn().mockReturnValue(mockResponse);

    mockContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: mockGetResponse,
      }),
    } as Partial<
      jest.Mocked<ExecutionContext>
    > as jest.Mocked<ExecutionContext>;

    interceptor = new SuccessResponseHandlerInterceptor();
  });

  it('should be handle given object and return correct object for resolve request', () => {
    const response: SuccessResponse = {
      statusCode: 201,
      data: {
        name: 'Mahdi',
        createdAt: new Date(),
      },
    };

    const mockCallHandler: CallHandler = {
      handle: () => of(response),
    };

    interceptor.intercept(mockContext, mockCallHandler).subscribe({
      next: (expectedResponse: SuccessResponse) => {
        expect(expectedResponse).toEqual(response);
      },
    });
  });
});
