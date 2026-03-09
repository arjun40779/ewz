'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  formEmail: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid recipient email'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export async function submitContactForm(formData: ContactFormData) {
  try {
    // Validate form data
    const validatedData = contactFormSchema.parse(formData);

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error(
        'RESEND_API_KEY is not configured in environment variables',
      );
      return {
        success: false,
        message: 'Email service is not configured. Please contact support.',
      };
    }

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: process.env.RESEND_FROM_DOMAIN
        ? `Contact Form <noreply@${process.env.RESEND_FROM_DOMAIN}>`
        : 'Contact Form <onboarding@resend.dev>',
      to: [validatedData.formEmail],
      replyTo: validatedData.email,
      subject: `New Contact Form Submission from ${validatedData.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contact Form Submission</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 24px; text-align: center;">New Contact Form Submission</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #495057; margin-top: 0;">Contact Details</h2>
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${validatedData.email}" style="color: #667eea;">${validatedData.email}</a></p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString(
              'en-US',
              {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short',
              },
            )}</p>
          </div>

          <div style="background: white; padding: 25px; border: 1px solid #e9ecef; border-radius: 8px;">
            <h2 style="color: #495057; margin-top: 0;">Message</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 4px solid #667eea;">
              ${validatedData.message.replaceAll('\n', '<br>')}
            </div>
          </div>

          <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
            <p style="margin: 0; color: #6c757d; font-size: 14px;">
              This email was sent from your website's contact form. 
              <br>Please reply directly to <strong>${validatedData.email}</strong> to respond to ${validatedData.name}.
            </p>
          </div>
        </body>
        </html>
      `,
      text: `
New Contact Form Submission

From: ${validatedData.name} (${validatedData.email})
Submitted: ${new Date().toLocaleString()}

Message:
${validatedData.message}

----
This email was sent from your website's contact form.
Please reply directly to ${validatedData.email} to respond to ${validatedData.name}.
      `,
    });

    console.log('Email sent successfully:', emailResponse);

    return {
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    };
  } catch (error) {
    console.error('Contact form error:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Please check your form data and try again.',
        errors: 'Invalid form data',
      };
    }

    // Handle Resend API errors
    if (error && typeof error === 'object' && 'message' in error) {
      return {
        success: false,
        message:
          'Failed to send email. Please try again or contact us directly.',
      };
    }

    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}

