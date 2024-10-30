import { Router } from 'express';
import { sendVerificationCode, verifyCode, logout } from "../controllers/authController.js";
import  {protect}  from "../middlewares/authMiddleware.js"

const authRouter = Router();

authRouter.post('/send-code', sendVerificationCode);
authRouter.post('/verify-code', verifyCode);
authRouter.post('/logout', protect, logout);

export default authRouter;
