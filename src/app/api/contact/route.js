import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    // Dynamic import for nodemailer (recommended for Next.js app directory)
    const nodemailer = (await import('nodemailer')).default;

    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing email credentials');
      return Response.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter
    await transporter.verify();

    // Email options with improved formatting
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📬 New Portfolio Contact from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #222; background: #f9f9f9; padding: 24px;">
          <h2 style="color: #00fff7; margin-bottom: 8px;">New Contact Form Submission</h2>
          <table style="width: 100%; max-width: 500px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); padding: 16px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Name:</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #007aff;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 8px 0; white-space: pre-line;">${message.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; color: #888; font-size: 13px;">This message was sent from your portfolio contact form.</p>
        </div>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return Response.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Detailed email error:', error);
    return Response.json(
      { success: false, message: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}
