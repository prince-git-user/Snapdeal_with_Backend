const nodemailer = require("nodemailer")

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
    user: "8e6a39316e52bb", // generated ethereal user
    pass: "c1033295acafd5", // generated ethereal password
    },
});