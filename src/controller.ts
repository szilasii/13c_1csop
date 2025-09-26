import data from "./data"

export const run = (_req:any,res:any) => {
 res.status(200).send("A szerver fut")
}

export const getALLData = (_req:any,res:any) => {
 res.status(200).send(data)
}
export const insertData = (req:Request,res:any) => {
    
    const dog:any = req.body
    console.log(req.body)
    res.status(200).send(dog)
}