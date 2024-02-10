import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_CODE, ErrorCode } from './message';

export { HttpException } from '@nestjs/common';

export type Locale = 'vi' | 'en';

function convertErrorCodeToMessage(errorCode: ErrorCode | string, locale: string): string {
  if (typeof errorCode === 'string' || !errorCode) {
    return errorCode as string;
  }

  if (typeof locale === 'string') {
    locale = locale?.toLowerCase();
  }

  if (locale) {
    return errorCode[locale];
  }

  return errorCode['en'] || errorCode['vi'];
}

export class HttpError extends HttpException {
  public constructor(
    errorCode: ErrorCode | string,
    locale?: Locale,
    status = 'Failed',
    data?: any,
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    const message = convertErrorCodeToMessage(errorCode, locale);
    super({ message, status, data, statusCode }, statusCode);
  }
}

export class ValidationError extends HttpError {
  public constructor(locale?: Locale, status?: string, data?: any);
  public constructor(errorCode?: ErrorCode, locale?: Locale, status?: string, data?: any);
  public constructor(...args: any[]) {
    if (args[0]?.vi || args[0]?.en) {
      const [errorCode, locale, status = 'Failed', data] = args;
      super(errorCode, locale, status, data, HttpStatus.BAD_REQUEST);
    } else {
      const [locale, status = 'Failed', data] = args;
      super(ERROR_CODE.ValidationError, locale, status, data, HttpStatus.BAD_REQUEST);
    }
  }
}

export class UnauthorizedError extends HttpError {
  public constructor(locale?: Locale, status?: string, data?: any);
  public constructor(errorCode?: ErrorCode, locale?: Locale, status?: string, data?: any);
  public constructor(...args: any[]) {
    if (args[0]?.vi || args[0]?.en) {
      const [errorCode, locale = 'en', status = 'Failed', data] = args;
      super(errorCode, locale, status, data, HttpStatus.UNAUTHORIZED);
    } else {
      const [locale, status = 'Failed', data] = args;
      super(ERROR_CODE.UnauthorizedError, locale, status, data, HttpStatus.UNAUTHORIZED);
    }
  }
}

export class PermissionDeniedError extends HttpError {
  public constructor(locale?: Locale, status?: string, data?: any);
  public constructor(errorCode?: ErrorCode, locale?: Locale, status?: string, data?: any);
  public constructor(...args: any[]) {
    if (args[0]?.vi || args[0]?.en) {
      const [errorCode, locale = 'en', status = 'Failed', data] = args;
      super(errorCode, locale, status, data, HttpStatus.FORBIDDEN);
    } else {
      const [locale, status = 'Failed', data] = args;
      super(ERROR_CODE.PermissionDeniedError, locale, status, data, HttpStatus.FORBIDDEN);
    }
  }
}

export class NotFoundError extends HttpError {
  public constructor(locale?: Locale, status?: string, data?: any);
  public constructor(errorCode?: ErrorCode, locale?: Locale, status?: string, data?: any);
  public constructor(...args: any[]) {
    if (args[0]?.vi || args[0]?.en) {
      const [errorCode, locale = 'en', status = 'Failed', data] = args;
      super(errorCode || ERROR_CODE.NotFoundError, locale, status, data, HttpStatus.NOT_FOUND);
    } else {
      const [locale, status = 'Failed', data] = args;
      super(ERROR_CODE.NotFoundError, locale, status, data, HttpStatus.NOT_FOUND);
    }
  }
}

export class DuplicateError extends HttpError {
  public constructor(locale?: Locale, status?: string, data?: any);
  public constructor(errorCode?: ErrorCode, locale?: Locale, status?: string, data?: any);
  public constructor(...args: any[]) {
    if (args[0]?.vi || args[0]?.en) {
      const [errorCode, locale = 'en', status = 'Failed', data] = args;
      super(errorCode, locale, status, data, HttpStatus.UNPROCESSABLE_ENTITY);
    } else {
      const [locale, status = 'Failed', data] = args;
      super(ERROR_CODE.ExistError, locale, status, data, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}

export class ConflictError extends HttpError {
  public constructor(locale?: Locale, status?: string, data?: any);
  public constructor(errorCode?: ErrorCode, locale?: Locale, status?: string, data?: any);
  public constructor(...args: any[]) {
    if (args[0]?.vi || args[0]?.en) {
      const [errorCode, locale = 'en', status = 'Failed', data] = args;
      super(errorCode, locale, status, data, HttpStatus.CONFLICT);
    } else {
      const [locale, status = 'Failed', data] = args;
      super(ERROR_CODE.ConflictError, locale, status, data, HttpStatus.CONFLICT);
    }
  }
}

export class InternalServerError extends HttpError {
  public constructor(locale?: Locale, status?: string, data?: any);
  public constructor(errorCode?: ErrorCode, locale?: Locale, status?: string, data?: any);
  public constructor(...args: any[]) {
    if (args[0]?.vi || args[0]?.en) {
      const [errorCode, locale = 'en', status = 'Failed', data] = args;
      super(errorCode, locale, status, data, HttpStatus.INTERNAL_SERVER_ERROR);
    } else {
      const [locale, status = 'Failed', data] = args;
      super(ERROR_CODE.InternalError, locale, status, data, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
