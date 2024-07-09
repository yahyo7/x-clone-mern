import express from 'express'
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary';
import connectMongoDB from './db/connectMongoDB.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import postRoutes from './routes/post.routes.js'

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();
const PORT = process.env.PORT || 7777;

app.use(express.json()); // to parse req,body
app.use(express.urlencoded({extended: true})) // to parse from data

app.use(cookieParser()); // help to get cookies

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
    connectMongoDB();
})