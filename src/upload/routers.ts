import { Router } from "express"
import verifyToken from "../middleware/auth"
import { downloadFile, getFileList, uploadFile, uploadFileMultiple } from "./uploadControler"
const router: Router = Router()
router.get("/files", getFileList)
router.get("/file/:id", downloadFile)
router.post("/upload", verifyToken, uploadFile)
router.post("/upload/multiple", verifyToken,uploadFileMultiple)

export default router