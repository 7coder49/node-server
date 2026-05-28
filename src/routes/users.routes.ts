import { Router } from "express";
import pool from "../config/db.ts";

const router = Router();

router.get('/getAllUsers', async(req, res)=>{
    const users = await pool.query('select id, name, age, dept from users');

    res.json({
        data: users,
        success: true,
        message: "Users retrieved sucessfully"
    })
})

export default router;