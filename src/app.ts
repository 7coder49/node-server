import express from 'express';
import cors from 'cors';
import pool from './config/db.ts';
import userRouter from './routes/users.routes.ts'
import redisClient from './config/redis.ts';

const app = express();

app.use(cors());
app.use(express.json())
app.use(userRouter)

app.get("/", (req, res)=>{
    res.send({
        id: 1,
        name: 'Greeting',
        from: 'Ayyanar',
        message: "Hello World!"
    });
})

const startServer = async()=>{
    try{
        await Promise.all([
            pool.connect(),
            redisClient.connect()
        ])

        app.listen(3000, ()=>{
            console.log(`Server is listening on port 3000`);
        })
    }catch(e){
        console.log(e)
    }
}

startServer();
