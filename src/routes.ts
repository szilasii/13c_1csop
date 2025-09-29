

import { Router } from "express"
import { deleteDataFromId, getALLData, getDataFromId, insertData, run,  } from "./controller"


const router: Router = Router()

router.get("/", run ) 
router.get("/dogs", getALLData)
router.get("/dogs/:id", getDataFromId)
router.post("/dogs",insertData)
router.delete("/dogs/:id",deleteDataFromId)
export default router
