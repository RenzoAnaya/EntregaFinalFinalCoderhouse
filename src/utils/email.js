import nodemailer  from 'nodemailer'
import config from '../config/config.js'

const TEST_EMAIL = 'Dolce@ethereal.email'    

const transporter = nodemailer.createTransport({
    host: config.EMAIL_ETH_HOST,
    port: config.EMAIL_ETH_PORT,
    auth: {
        user: config.EMAIL_ETH_USER,
        pass: config.EMAIL_ETH_PASS,
    },
});

export async function  signUpEmail(newUser){
    const mailOptions = {
          from:'Wiqli <news@wiqli.com>',
          to: `${newUser.email}`,
          subject: "Wiqli: Creación de cuenta exitosa",
          html: `
            <h1>Hola ${newUser. fullname}</h1> 
            <p>Bienvenido a Wiqli</p>
            <p>Haz tus compras sin preocupaciones con nosotros</p>
            <p>Confirmamos tu correo: ${newUser.email}</p>
            `
    };
        try{
            await transporter.sendMail(mailOptions);
        }catch(error){
            console.log(`Error al enviar correo: ${error}`);
        }
    };

    export async function checkOutEMail(newOrder){
        const mailOptions = {
            from:'Wiqli <news@wiqli.com>',
            to: TEST_EMAIL,
            subject: `Nuevo pedido de ${newOrder.userName}, ${newOrder.userEmail}`,
            html: `<h2>Tu pedido ha sido confirmado:</h2>
            ${newOrder.products.map(x=>`<li>${x.products}, cantidad: ${x.quantity}</li>`)}
            `,
        }
        try {
          await transporter.sendMail(mailOptions);
        } catch (error) {
          console.log(`Error al enviar correo de confirmación de pedido ${error}`)
        }
    }