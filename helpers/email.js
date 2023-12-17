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
        <p style="font-size: 1.5rem; font-family: monospace;">
            Hola: . Confirma tu cuenta en UpTask
        </p>
        <p style="font-family: monospace; font-size: 0.875rem;">
            Tu cuenta ya está casi lista, solo debes confirmarla en el siguiente enlace:
            <a style="color: #007BFF; text-decoration: none;" href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar Cuenta</a>
            <p style="font-family: monospace; margin-top: 0.5rem; color: #828282">Si tú no creaste esta cuenta, puedes ignorar el mensaje</p>
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
            <p style="font-size: 1.5rem; font-family: monospace;">
                Hola: <span style="font-weight: bold; color: #31C5FD;">${nombre}</span>. Has solicitado reestablecer tu password
            </p>
            <p style="font-family: monospace; font-size: 0.875rem;">
                Sigue el siguiente enlace para generar un nuevo password:
                <a style="color: #007BFF; text-decoration: none;" href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a>
                <p style="font-family: monospace; margin-top: 0.5rem; color: #828282">Si tu no solicitaste reestablecer tu password, puedes ignorar el mensaje</p>
            </p>
        `
    })
}