import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getUserProfile, followUnfollowUser, getSuggestedUser } from "../controllers/user.controller.js";

const router = express.Router()

router.get("/profile/:username", protectRoute, getUserProfile)
router.get("/suggested", protectRoute, getSuggestedUser)
router.post("/follow/:id", protectRoute, followUnfollowUser)
// router.post("/update", protectRoute, updateUserProfile)

export default router