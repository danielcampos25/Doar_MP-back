import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // ou outro serviço de e-mail que você esteja usando
  auth: {
    user: 'doarpontocom@gmail.com', // Substitua pelo seu e-mail institucional
    pass: 'ggja rljq erih smnp', // Substitua pela senha do seu e-mail
  },
});

export default transporter;
