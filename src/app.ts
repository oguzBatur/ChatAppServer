console.clear();

import express, {Request, Response} from 'express';
import {Server} from 'socket.io';
import jwt, { Secret } from 'jsonwebtoken';
import cors from 'cors';

const PORT = 3004;
const SECRET:Secret = 'The Secret Key for the Chat APP'
const app = express();

app.use(express.json());
app.use(cors());

app.post('/setUser', async(req:Request,res:Response) =>{
    try {
        const {name} = req.body;
        const token = jwt.sign(name, SECRET);
        res.status(200).json({
            token: token,
        });

    } catch (error) {
        res.status(400).json({
            token: null
        });
        
    }
})

app.get('/auth', async(req:Request, res:Response) => {
    try {
        const token = req.headers.authorization;
        if(token)
        {
            const verifyTheToken = jwt.verify(token, SECRET);
            res.status(200).json({
                name: verifyTheToken
            })
        }
    
    } catch (error) {
        res.status(400).json({
            token: null
        })
    }
})

const server = app.listen(PORT, () => {
    console.log('The server is running on ', PORT);
})
const io = new Server(server,{
    cors:{
        origin: ["http://localhost:3000", "https://oguzbatur.github.io/Socket.io-Chat-App"]
    },
    transports:['websocket', 'polling'],
    allowEIO3: true
});

io.on('connection', async(socket) => {
    socket.on('send-chat-message', message => {
        console.log('Got Message');
        socket.broadcast.emit('receive-chat-message', {...message});
        socket.emit('receive-chat-message', {...message})
    })

})