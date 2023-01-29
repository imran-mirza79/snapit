import express from "express";
import {signin, signup, googleSignin, googleSignup} from '../controllers/user.js'

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post("/googlesignin", googleSignin);
router.post("/googlesignup", googleSignup);

export default router;