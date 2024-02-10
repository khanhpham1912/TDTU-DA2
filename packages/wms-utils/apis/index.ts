import { HttpStatus } from '@nestjs/common';

export interface IResponse<T> {
  status: ResponseStatus;
  message: string;
  statusCode?: HttpStatus;
  data?: T;
}

export enum ResponseStatus {
  Success = 'Success',
  Failed = 'Failed',
}

export function resFailed<T>(message: string, data?: T): IResponse<T> {
  return {
    status: ResponseStatus.Failed,
    message,
    data,
  };
}

export function resOk<T>(message: string, data?: T): IResponse<T> {
  return {
    status: ResponseStatus.Success,
    message,
    data,
  };
}
