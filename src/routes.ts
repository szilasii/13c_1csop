

import { Router } from "express"
import { deleteDataFromId, getALLData, getDataFromId, insertData, patchData, putData, run,  } from "./controller"
import verifyToken from "./auth"

const router: Router = Router()

router.get("/", run ) 
router.get("/dogs", verifyToken, getALLData)
router.get("/dogs/:id", getDataFromId)
router.post("/dogs",insertData)
router.delete("/dogs/:id",deleteDataFromId)
router.put("/dogs/:id",putData)
router.patch("/dogs/:id",patchData)


export default router
