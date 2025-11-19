export interface FailedResponse {
  success: false;
  statusCode: number;
  message: string;
  errorCode: string;
}
