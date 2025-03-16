const { google } = require('googleapis');
const nodemailer = require('nodemailer');
require('dotenv').config();
const OAuth2 = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL);
OAuth2.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

class Email{
    constructor() {
        this._connect();
    }
    _connect() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: "yormesordaniel@gmail.com",
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: "ya29.a0AeXRPp5JO3mGEYCvcA4XfSRczcQuYSBF2OK4w7kdQ0O20ehTkqLTDgiRXZ3nTfIHFgBVHQ3IXv95TzhF5Ls0kET8ZUv16MJVc8YN_Vzn8WrgPNuFg_gbQRGw19HhiPVt_qgmaukMJHCb3cwYQKbI-HcjywMtO8qgHj52QkCBaCgYKAZESARMSFQHGX2Miik8PrOGM2mjHfWUpA-bivg0175"
            }
        });
    }
    sendMail(mailOptions) {
        this.transporter.sendMail(mailOptions, (error, response) => {
            error ? console.log(error) : console.log("Email sent successfully");
            this.transporter.close();
        });
    }
}

module.exports = Email;