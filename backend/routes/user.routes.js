import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getUserProfile, followUnfollowUser, getSuggestedUser, updateUser } from "../controllers/user.controller.js";

const router = express.Router()

router.get("/profile/:username", protectRoute, getUserProfile)
router.get("/suggested", protectRoute, getSuggestedUser)
router.post("/follow/:id", protectRoute, followUnfollowUser)
router.post("/update", protectRoute, updateUser)

export default router