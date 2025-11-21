import { Router } from "express"
import { signIn } from "./userController"

const router: Router = Router()
router.post("/user/signin", signIn ) 
export default router