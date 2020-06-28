import { House } from "../House";
import { createTransport } from 'nodemailer';

export const SendMail = async ({ title, description }: House): Promise<void> => {
    if(process.env.SEND_MAIL !== 'true') return;
    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    await transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: process.env.MAIL_TO,
        subject: 'New House Found',
        text: `title: ${title}\ndescription: ${description}`,
    })
}
