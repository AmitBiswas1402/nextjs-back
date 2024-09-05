import User from '@/models/user.model';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'

export const sendEmail = async({email, emailType, userId}: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            const updatedUser = await User.findByIdAndUpdate(userId, 
                {
                    $set: {
                        verifyToken: hashedToken, verifyTokenExpiry: new Date(Date.now() + 3600000)
                    }
                })
                console.log("Updated for user verify", updatedUser);
                
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {
                    $set: {
                        forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry:new Date(Date.now() + 3600000)
                    }
                }
            )
        }

        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "88cdb26591aa45", // credentials
              pass: "734e8f557341c2" // credentials
            }
          });

        const mailOptions = {
            from: 'amit@amit.com', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password", // Subject line
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType==="VERIFY" ? "verify your email" : "reset your password"} 
            or copy the link to your browser 
            <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, // html body
        }

        const mailResponse = await transporter.sendMail(mailOptions)

        return mailResponse
        
    } catch (error: any) {
        throw new Error(error.message)
    }
}