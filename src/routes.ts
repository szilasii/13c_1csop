

import { Router } from "express"
import { valasz, valasz2 } from "./controller"

const router: Router = Router()

router.get("/api", valasz) 
router.post("/api",valasz2)
export default router
