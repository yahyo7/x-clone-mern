import express from 'express'
import authRoutes from './routes/auth.routes.js'
import dotenv from 'dotenv'
import connectMongoDB from './db/connectMongoDB.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7777;

app.use(express.json()); // to parse req,body
app.use(express.urlencoded({extended: true})) // to parse from data

app.use(cookieParser()); // help to get cookies

app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
    connectMongoDB();
})