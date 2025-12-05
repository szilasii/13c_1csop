import config from "../config/config"
import mysql from "mysql2/promise"
import fs from "fs"
export interface IFile {
    fileId? : string
    fileName? : string
    uploadTime?: Date
    mimeType?:string
    fileSize?: number
    userId?:number
}

export interface IMulterFile {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number
}
export class File implements IFile {
    fileId? : string
    fileName? : string
    uploadTime?: Date
    mimeType?: string
    fileSize?: number
    userId?: number

    getalldata = () => {
        return this
    }

    constructor (file:IMulterFile, userId: number) {
            this.fileId = file.filename
            this.fileName = file.originalname
            this.mimeType = file.mimetype
            this.fileSize = file.size
            this.userId = userId
    }
    async saveToDatabase () {
       
      const connection = await mysql.createConnection(config.database)
    

        try {
            await connection.beginTransaction()
            let [result]:any = await connection.query(
                 "insert into files (fileId,fileName,mimeType,fileSize) values (?,?,?,?)", [this.fileId,this.fileName,this.mimeType,this.fileSize]
            );
            if (result.affectedRows === 0) {
                throw "Hiba Fájl táblába történő beszúráskor"
            }    
             [result] = await connection.query(
                 "insert into userFiles values (?,?)", [this.userId,this.fileId]
              )

             if (result.affectedRows === 0) {
                throw "Hiba az userfile táblába történő beszúráskor"
            }   
            await connection.commit()
        } catch(err) {
            await connection.rollback() 
            await this.deleteFileDir()
            throw err
        }
    }
     async deleteFileDir () {
       
            fs.unlink(config.baseDir + config.uploadDir + this.fileId, (err) => {
                if (err) {
                    throw err
                }
             })
      
        }

}

