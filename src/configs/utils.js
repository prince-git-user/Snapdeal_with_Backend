const transporter = require("./mail")

const sendMail = async ({
    from,
    to,
    subject,
    text,
    html,
})=>{
    await transporter.sendMail({
        from,
        to,
        subject,
        text,
        html,
    });
}

const verificationMail = async({
    from,
    user,
    otp
}) => {
    await sendMail({
        from,
        to: `${user.email}`,
        subject: `Welcome to Snapdeal ${user.email}`,
        text: `Hello, Please confirm your email address`,
        html: `<h1>Hello, Please dont share the credential with anyone. Your OTP is ${otp}</h1>`,
    })
}

module.exports = {verificationMail,sendMail}