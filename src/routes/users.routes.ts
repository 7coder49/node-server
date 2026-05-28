import { Router } from "express";
import pool from "../config/db.ts";
import redisClient from "../config/redis.ts";

const router = Router();

router.get('/getAllUsers', async(req, res)=>{
    pool.query('select id, name, age, dept from users', async (err, users) => {
        if (err) {
            return res.status(500).json({
                data: null,
                success: false,
                message: "Error retrieving users"
            })
        }
        res.json({
            data: users.rows,
            success: false,
            message: "Error retrieving users"
        })
    })
})

router.post('/createUser', async(req, res)=>{
    console.log('req.body',req.body)
    const {name, age, dept} = req.body;
    pool.query('insert into users(name, age, dept) values ($1, $2, $3) returning id', [name, age, dept], async (err, result)=>{
        if(err){
            console.log('eeeeeeeeeeeeee',err);
            return res.status(500).json({
                data: null,
                success: false,
                message: "Error while creating user"
            })
        }
        console.log('JSON.stringify(result.rows)',result.rows);
        let latestUser = {
            id: 1,
            ...req.body
        }

        console.log('latestUser',latestUser);
        

        
        await redisClient.set('latest-user', `${JSON.stringify(latestUser)}`)
        res.json({
            message: "Users created successfully",
            data: result.rows,
            success: true
        })
    })
});

router.get('/getLatestUser', async(req, res)=>{
    const user = await redisClient.get('latest-user');
    console.log('user',user);
    

    res.json({
        data: JSON.parse(user!),
        message: "Users retrieved successfully",
        success: true
    })
})

export default router;