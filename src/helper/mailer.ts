import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const hash = await bcrypt.hash(userId.toString(), 10);
    // configur eamil for sending the email
    if (emailType == "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hash,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hash,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "316bcfcf2961db", // all this type of the thins are need to bi in env file
        pass: "610ad13970464a",
      },
    });

    const mailOpt = {
      from: "someone@gmail.com",
      to: email,
      subject:
        emailType == "VERIFY" ? "verification email" : "forgot pass email",
      html: `<p>click <a href="${
        process.env.DOMAIN
      }/verifyemail?Token=${hash} ">here</a> to ${
        emailType == "VERIFY" ? "verify your email" : "reset your password"
      }  or copy pasete the link below in your browser. <br>
      "${process.env.DOMAIN}/verifyemail?Token=${hash} "
      </p> `,
    };

    const info = await transport.sendMail(mailOpt);
    return info;
  } catch (error: any) {
    throw new error();
  }
};
