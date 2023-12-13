import express  from "express";
import dotenv from "dotenv";
import cors from "cors"
import conectarBD from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js"
import proyectoRoutes from "./routes/proyectoRoutes.js"
import tareaRoutes from "./routes/tareaRoutes.js"

const app = express();
app.use(express.json())

dotenv.config()

conectarBD()

//Configurar CORS
const whitelist = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback) {
        if (whitelist.includes(origin)) {
            //Puede consultar la API
            callback(null, true)
        } else {
            //No esta permitido
            callback(new Error("Error de Cors"))
        }
    }
}

app.use(cors(corsOptions))

// Routing
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoutes)
app.use('/api/tareas', tareaRoutes)

const PORT = process.env.PORT || 4000

const servidor = app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`)
})

//Socket.io
import { Server } from "socket.io";

const io = new Server(servidor, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.FRONTEND_URL,
    },
})

io.on("connection", (socket) => {
    console.log("Conectado a socket.io");

    //Definir los eventos de socket.io
    socket.on("abrir proyecto", (proyecto) => {
        socket.join(proyecto)
    })

    socket.on("nueva tarea", (tarea) => {
        socket.to(tarea.proyecto).emit("tarea agregada", tarea);
    });

    socket.on("eliminar tarea", (tarea) => {
        (typeof tarea.proyecto === "string") ? socket.to(tarea.proyecto).emit("tarea eliminada", tarea) :
        socket.to(tarea.proyecto?._id).emit("tarea eliminada", tarea)
    });

    socket.on("actualizar tarea", (tarea) => {
        socket.to(tarea.proyecto._id).emit("tarea actualizada", tarea);
    });

    socket.on("cambiar estado", (tarea) => {
        socket.to(tarea.proyecto._id).emit("nuevo estado", tarea);
    });
})