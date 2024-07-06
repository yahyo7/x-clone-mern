import express from 'express'
import dotenv from 'dotenv'
import connectMongoDB from './db/connectMongoDB.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7777;

app.use(express.json()); // to parse req,body
app.use(express.urlencoded({extended: true})) // to parse from data

app.use(cookieParser()); // help to get cookies

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
    connectMongoDB();
})