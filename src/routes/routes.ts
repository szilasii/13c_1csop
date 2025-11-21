
import { Router } from "express"
import { run } from "../dog/dogController"
const router: Router = Router()
router.get("/", run ) 
export default router