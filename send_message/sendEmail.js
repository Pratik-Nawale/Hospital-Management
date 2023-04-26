const nodemailer = require("nodemailer");

// const email = "pratiknawale03@gmail.com";

module.exports = function send_Email(to, message, button="Visit Website", link="https://hospital-management-seven.vercel.app/") {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: to,
      subject: "Regarding Doctors Appointment",
      html: `<html style="background-color: #959595;
    background-image: -webkit-linear-gradient(65deg, #646464 50%, #b3b3b3 50%);
    min-height: 1000px;
    font-family: Arial, Helvetica, sans-serif;">
        <div class="box" style="max-width: 400px;
    margin: 50px auto;
    background: white;
    border-radius: 10px;
    box-shadow: 5px 5px 15px -5px rgba(0, 0, 0, 0.3);">
        <h1 id="heading" style="color: #fff;
        padding: 10px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-color: #646464;
            text-align: center;">
    
            DOC App</h1>
        <p class="item" style="min-height: 70px;
        display: flex;
        align-items: center;
        text-align: center;
        border-bottom: 1px solid #f1f1f1;
        margin: 0;
            padding: 20px;
            font-size: 20px;
            font-weight: 200;
            color: #00204a;">${message}
        </p>
        <a href=${link} style="margin: auto;
        display: inherit;
        text-decoration: none;">
            <button style="border-radius: 5%;
        border-color: transparent;
        background-color: #646464;
        color: #fff;
        font-size: 30px;
        border-width: 0;
        margin: auto;
        display: inherit;
        transition: 0.3s;
        cursor: pointer;">${button}</button>
        </a>
    </div>
    </html>
    `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error" + error);
      } else {
        console.log("Email sent:" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
  } catch (error) {
    console.log("Error" + error);
    res.status(401).json({ status: 401, error });
  }
};
