

import { Router } from "express"
import { getALLData, insertData, run,  } from "./controller"


const router: Router = Router()

router.get("/", run ) 
router.get("/dog", getALLData)
router.post("/dog",insertData)
export default router
