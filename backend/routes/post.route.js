import { protectRoute } from "../middleware/protectRoute.js"
import express from 'express'
import { commentOnPost, createPost, deletePost, getAllPosts, getFollowingPosts, getLikedPosts, getUserPosts, likeUnlikePost } from "../controllers/post.controllers.js"

const router = express.Router()

router.get('/all', protectRoute, getAllPosts)
router.get('/user/:username', protectRoute, getUserPosts)
router.get('/following', protectRoute, getFollowingPosts)
router.get('/likes/:id', protectRoute, getLikedPosts)
router.post('/create', protectRoute, createPost)
router.delete('/:id', protectRoute, deletePost)
router.post('/like/:id', protectRoute, likeUnlikePost)
router.post('/comment/:id', protectRoute, commentOnPost)

export default router;