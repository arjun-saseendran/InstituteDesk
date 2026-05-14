import nodemailer from "nodemailer";

export const sendPaymenEmail = async (
  studentEmail,
  className,
  amount,
  paymentUrl,
) => {
  try {
    // configure the transporter with your SMTP details
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // format the email content
    const mailOptions = {
      from: `"Academy Name " <${process.env.EMAIL_USER}>`,
      to: studentEmail,
      subject: `Payment Link for ${className}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>Complete Your Registration</h2>
          <p>Hi there,</p>
          <p>Please complete your payment of <strong>₹${amount}</strong> for the class: <strong>${className}</strong>.</p>
          <p>Click the button below to pay securely via Stripe:</p>
          <a href="${paymentUrl}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #635bff; text-decoration: none; border-radius: 5px;">
            Pay Now
          </a>
          <p><em>Note: This link will expire in 24 hours.</em></p>
          <p>Thank you!</p>
        </div>
      `,
    };

    // send the email
    await transporter.sendMail(mailOptions);
    console.log("Payment email sent successfully to", studentEmail);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send email");
  }
};
