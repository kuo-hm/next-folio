import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: NextRequest) {
  const { subject, message, type, email } = await request.json();
  const transport = nodemailer.createTransport({
    service: 'gmail',

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: subject,
    text: message,
    html: `
      <h1>${type} from ${email}</h1>
      <p>${message}</p>
    `,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Email sent');
        } else {
          console.log(err.message);
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: 'Email sent' });
  } catch (err) {
    console.log('json', subject, message, type, email);

    console.error('error', err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
