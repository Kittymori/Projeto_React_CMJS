import { Injectable } from '@nestjs/common';

@Injectable()
export class SendEmailService {
  async sendEmail(email: string): Promise<void> {}
}
