import Slack from 'node-slack';
import { Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { removeBodyIgnoreFields } from '../log';
import { HttpError } from './error';

export class ErrorCapture {
  static instance: ErrorCapture;
  private appName: string;
  private slack: Slack;
  private logger = new Logger('ErrorCapture');

  private constructor() {
    this.appName = process.env.APP_NAME;

    const slackHook = process.env.SLACK_HOOK;
    if (slackHook) {
      this.slack = new Slack(slackHook);
    }
  }

  public static getInstance() {
    if (!ErrorCapture.instance) {
      ErrorCapture.instance = new ErrorCapture();
    }

    return ErrorCapture.instance;
  }

  /**
   * Only capture unknown error
   * @param exception
   * @param extraData
   * @param tags
   * @returns
   */
  public static capture(exception: any, extraData?: any, tags?: string[]) {
    try {
      // Not capture known exception of message error
      if (
        tags?.includes('MESSAGE_ERROR') &&
        exception?.status &&
        exception?.message &&
        typeof exception?.statusCode === 'number'
      ) {
        return;
      }

      const instance = ErrorCapture.getInstance();

      // Capture everything of event error
      if (tags?.includes('EVENT_ERROR')) {
        return instance.send(exception, extraData, tags);
      }

      // API and other
      if (
        exception instanceof HttpError ||
        exception instanceof NotFoundException ||
        exception instanceof UnauthorizedException
      ) {
        // Nothing to do
      } else {
        return instance.send(exception, extraData, tags);
      }
    } catch (error) {
      this.instance.logger.error('Send to slack error: ,', error);
    }
  }

  private send(exception: any, extraData?: any, tags?: string[]) {
    if (!this.slack) {
      return;
    }

    const message = this.generateMessage(exception, extraData, tags);
    this.logger.warn(message);
    this.slack.send({ text: message });
  }

  private generateMessage(exception: any, extraData?: any, tags?: string[]) {
    const title = `:x: *ERROR NOTIFICATION*`;

    const service = `*Service:* ${this.appName?.toUpperCase()}`;
    const date = `*Date:* ${this.getDate()}`;
    const body: string[] = [title, '\n\n', service, '\n', date];

    if (tags) {
      const tagText = tags?.join(', ') || '';
      const tag = `*Tags:* ${tagText}`;
      body.push('\n', tag);
    }

    const message = `*Message:* ${exception.message}`;
    const stack = `*Stack:* ${exception.stack}`;
    body.push('\n', message, '\n', stack);

    if (extraData) {
      const extraDataText = `*Extra Data:* ${
        typeof extraData === 'string'
          ? extraData
          : JSON.stringify(removeBodyIgnoreFields(extraData))
      }`;
      body.push('\n', extraDataText);
    }

    return body.join('');
  }

  private getDate() {
    const splitDate = new Date()
      .toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })
      .split('/');

    return `${splitDate[1]}/${splitDate[0]}/${splitDate[2]}, VietNam`;
  }
}
