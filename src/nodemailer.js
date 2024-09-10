"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    service: 'gmail', // ou outro serviço de e-mail que você esteja usando
    auth: {
        user: 'doarpontocom@gmail.com', // Substitua pelo seu e-mail institucional
        pass: 'ggja rljq erih smnp', // Substitua pela senha do seu e-mail
    },
});
exports.default = transporter;
