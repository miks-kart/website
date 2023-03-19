import PDF from "@components/PDF";
import { renderToStream } from "@react-pdf/renderer";

export default async function handler(req, res) {
  let nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "noreply.miks@gmail.com",
      pass: process.env.GMAIL_PASSWORD,
    },
    secure: true,
  });

  const mailData = {
    from: "noreply.miks@gmail.com",
    // to: "manager@miks-kart.ru",
    // to: req.body.email,
    to: `victor@miks-karting.ru, evgen@miks-karting.ru, info@miks-karting.ru, manager@miks-karting.ru`,
    subject: `Заказ ${req.body.name}`,
    text: req.body.message + " | Отправлено от: " + req.body.email,
    html: `<p style="white-space: pre-line;">${req.body.message}</p><p>Телефон: ${req.body.phone}</p><p>Email: ${req.body.email}</p>`,
    attachments: [
      {
        filename: `Заказ ${req.body.name}.pdf`,
        content: await renderToStream(
          <PDF
            name={req.body.name}
            data={req.body.data}
            pdf={req.body.pdf}
            shoppingCart={req.body.shoppingCart}
          />
        ),
      },
    ],
  };

  transporter.sendMail(mailData, (err) => {
    if (err) {
      console.log("Error " + err);
      res.statusCode = 500;
      res.send();
    } else {
      res.send();
    }
  });
}
