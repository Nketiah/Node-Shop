import express from 'express'
const router = express.Router()

import { register, userLogin, logout } from '../controllers/userController'

router.post("/register", register)
router.post("/login", userLogin)
router.get("/logout", logout)



export default router