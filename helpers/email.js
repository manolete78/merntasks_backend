import nodemailer from "nodemailer"

export const emailRegistro = async (datos) => {
    const  {email, nombre, token} = datos

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
    });

    //Informacion del email
    const info = await transport.sendMail({
        from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Confirma tu cuenta",
        text: "Confirma tu cuenta en UpTask",
        html: `
            <p>Hola: ${nombre}. Confirma tu cuenta en UpTask</p>
            <p>
                Tu cuenta ya esta casi lista, solo debes confirmarla en el siguiente enlace:
                <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar Cuenta</a>
                <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
            </p>
        `
    })
}

export const emailOlvidePassword = async (datos) => {
    const  {email, nombre, token} = datos
    
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
    });

    //Informacion del email
    const info = await transport.sendMail({
        from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Reestablece tu password",
        text: "Reestablece tu password",
        html: `
            <p>Hola: ${nombre}. Has solicitado reestablecer tu password</p>
            <p>
                Sigue el siguiente enlace para generar un nuevo password:
                <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a>
                <p>Si tu no solicitaste reestablecer tu password, puedes ignorar el mensaje</p>
            </p>
        `
    })
}