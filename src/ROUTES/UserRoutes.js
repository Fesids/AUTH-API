import { Router } from 'express'
import { getUser, login, register } from '../CONTROLLER/UserController.js'

export const route = Router()

route.post('/register', register)
route.post('/login', login)
route.get('', getUser)

export const authRoutes = route
