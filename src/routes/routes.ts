
import { Router } from "express"
import { run } from "../dog/dog_controller"
const router: Router = Router()
router.get("/", run ) 
export default router