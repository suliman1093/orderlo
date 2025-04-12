const nodemailer = require('nodemailer');

const sendEmail = async(options)=>{
    // 1)- create transporter
    const transporter =nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth:{
            user:'zobayoussef@gmail.com',
            pass:'bkvlnsjoshhnrewf',
        }
    })
    // 2)- define email options 
    const mailOptions = {
        from: '"OrderLo" <zobayoussef@gmail.com>',
        to:options.email,
        subject:options.subject,
        text:options.message
    }
    // 3)- send email
    await transporter.sendMail(mailOptions);
    
}




module.exports = sendEmail;