import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { authRoutes } from '../ROUTES/UserRoutes.js'

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use('/api/v1/auth', authRoutes)

export const server = app
