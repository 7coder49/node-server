import { createClient } from "redis";

const redisClient = createClient({
    socket:{
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
    }
})


redisClient.on('error', (err)=>{
    console.log('Error on Redis Client', err)
})

export default redisClient;