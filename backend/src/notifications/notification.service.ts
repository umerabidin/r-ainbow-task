import { Injectable, OnModuleInit } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class NotificationService implements OnModuleInit {
  private transporter: nodemailer.Transporter;

  async onModuleInit() {
    try {
      this.transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      console.log("🚀 Ethereal SMTP ready");
      console.log(`👤 User: ${process.env.SMTP_USER}`);
      console.log(`🔑 Pass: ${process.env.SMTP_PASS}`);
    } catch (error) {
      console.log(error);
    }
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        from: '"Birthday Bot" <no-reply@example.com>',
        to,
        subject,
        html: body,
      });

      console.log("📬 Message sent:", info.messageId);
      console.log("📬 Preview URL:", nodemailer.getTestMessageUrl(info)); // <-- View email here
    } catch (error) {
      console.log(error);
    }
  }
}
