import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async(email, verificationToken) => {
    try {
        const verificationUrl = `${process.env.CLIENT_URL}/verify/${verificationToken}`;

        const { data, error } = await resend.emails.send({
            from: 'Workout Buddy <onboarding@resend.dev>',
            to: email,
            subject: 'Verify Your Email',
            html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Welcome to Workout Buddy!</h1>
            <p>Please verify your email by clicking the button below:</p>
            <a href="${verificationUrl}" 
               style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; 
                      text-decoration: none; border-radius: 6px; margin: 16px 0;">
              Verify Email
            </a>
            <p style="color: #666;">This link will expire in 24 hours.</p>
            <p style="color: #666;">If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
          </div>
        `
        });

        if (error) {
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        console.error('Email sending failed:', error);
        throw error;
    }
};

// export const sendPasswordResetEmail = async(email, resetToken) => {
//     try {
//         const { data, error } = await resend.emails.send({
//             from: 'Workout Buddy <onboarding@resend.dev>',
//             to: email,
//             subject: 'Reset Your Password',
//             html: `
//         <h1>Password Reset Request</h1>
//         <p>You requested to reset your password. Click the link below to proceed:</p>
//         <a href="${process.env.CLIENT_URL}/reset-password/${resetToken}">
//           Reset Password
//         </a>
//         <p>This link will expire in 1 hour.</p>
//         <p>If you didn't request this, please ignore this email.</p>
//       `
//         });

//         if (error) {
//             throw new Error(error.message);
//         }

//         return data;
//     } catch (error) {
//         console.error('Email sending failed:', error);
//         throw error;
//     }
// };