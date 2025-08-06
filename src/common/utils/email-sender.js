import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD, EMAIL_USERNAME } from '../configs/enviroment.js';
import {createError} from '../utils/create-error.js';

export const sendMailRegister = async (email, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL_USERNAME,
            pass: EMAIL_PASSWORD
        },
    });

    const mailOpiton = {
        from: "hieu 3 dep trai",
        to: email,
        subject: subject,
        html: text,
    };

    try {
        await transporter.sendMail(mailOpiton)
    } catch (error) {
        throw createError(500, `gui email khong thanh cong vi :${error.message}`)
    }
};

export const sendMailForgotPassword = async (email, subject, text) => {
    
}
