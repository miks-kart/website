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
    to: req.body.email,
    subject: `Заказ МИКС КАРТ`,
    text: "Спасибо, что выбрали МИКС КАРТ!\nВ приложении к письму Вы найдете детали вашего заказа.",
    html: `<p style="white-space: pre-line;">Спасибо, что выбрали МИКС КАРТ!\nВ приложении к письму Вы найдете детали вашего заказа. Наш менеджер свяжется с вами для его подтверждения.</p><br/><a href="tel:+79262447083">+7 926 244 70 83</a><br/><a href="mailto:manager@miks-kart.ru">manager@miks-kart.ru</a>`,
    attachments: [
      {
        filename: `Заказ ${req.body.name}.pdf`,
        content: await renderToStream(
          <PDF
            sport={req.body.sport}
            dzhunior={req.body.dzhunior}
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
