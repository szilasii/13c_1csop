export interface IFile {
    fileId? : string
    fileName? : string
    uploadTime?: Date
    fileSize?: number
}

export class File implements IFile {
    fileId? : string
    fileName? : string
    uploadTime?: Date
    fileSize?: number

    getalldata = () => {
        return this
    }

    // constructor (file:any, userId: number) {

    // }

}

