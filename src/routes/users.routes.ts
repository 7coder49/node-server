import { Router } from "express";
import pool from "../config/db.ts";

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
    pool.query('insert into users(name, age, dept) values ($1, $2, $3)', [name, age, dept], (err, result)=>{
        if(err){
            console.log('eeeeeeeeeeeeee',err);
            return res.status(500).json({
                data: null,
                success: false,
                message: "Error while creating user"
            })
        }
        res.json({
            message: "Users created successfully",
            data: result.rows,
            success: true
        })
    })
});

export default router;