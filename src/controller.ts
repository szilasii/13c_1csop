
import { Request, Response } from "express"
import Dog, { IDog } from "./dog"
import config from "./config"
import mysql from "mysql2/promise"

export const run = (_req: Request, res: Response) => {
    res.status(200).send("A szerver fut")
}

export const getALLData = async (_req: Request, res: Response) => {
    const connection = await mysql.createConnection(config.database);

    try {
        const [results] = await connection.query(
            'SELECT * FROM dog'
        );
        res.status(200).send(results)
    } catch (err) {
        console.log(err);
    }
}

export const getDataFromId = async (req: Request, res: Response) => {
    let id: number = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send("Hibás paraméter!")
        return
    }
    const connection = await mysql.createConnection(config.database);

    try {
        const [results] = await connection.query(
            'SELECT * FROM dog where id = ?', [id]
        ) as Array<any>

        if (results.length > 0) {
            res.status(200).send(results)
            return
        }
        res.status(404).send("Nincs ilyen adat!")
    } catch (err) {
        console.log(err);
    }

}


export const insertData = async (req: Request, res: Response) => {

    if (!req.body) {
        res.status(400).send("Nem adott meg adatokat!")
        return
    }


    let dog: Dog = new Dog(req.body as unknown as IDog)



    if (dog.name === "" || dog.breed === "") {
        res.status(400).send("Nem adott meg adatokat!")
        return
    }
    const connection = await mysql.createConnection(config.database);

    try {
        const [results] = await connection.query(
            'insert into dog values (null,?,?,?,?,?)', [dog.name,dog.breed, dog.breed ? 1:0,parseInt(dog.age as unknown as string),dog.picurl]
        ) as Array<any>
        res.status(200).send(results.insertId)
    } catch (err) {
        console.log(err);
    }


}
export const deleteDataFromId = async (req: Request, res: Response) => {

    let id: number = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send("Hibás paraméter!")
        return
    }

     const connection = await mysql.createConnection(config.database);

    try {
        const [results] = await connection.query(
            'delete from dog where id = ?',[id]
        ) as Array<any>
        res.status(200).send(results)
    } catch (err) {
        console.log(err);
    }

}

export const putData = async (req: Request, res: Response) => {
    let id: number = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send("Hibás paraméter!")
        return
    }


    if (!req.body) {
        res.status(400).send("Nem adott meg adatokat!")
        return
    }


    let reqDog: any = new Dog(req.body as unknown as IDog)

    if (reqDog.nev === "" || reqDog.fajta === "") {
        res.status(400).send("Nem adott meg adatokat!")
        return
    }
    const allowedFields = ['name','breed','gender','age','picurl']
    const keys = Object.keys(reqDog).filter(key => allowedFields.includes(key))

    if (keys.length === 0) { 
        res.status(400).send({ error: 103, messege: "Nincs frissítendő mező!" })
        return
    }

    const connection = await mysql.createConnection(config.database);

    const updateString = keys.map(key => `${key} = ?`).join(', ')
    const values = keys.map(key => reqDog[key])
    values.push(id)
    
    const sqlCmd:string = `update dog set ${updateString}  where id = ?`

    console.log(sqlCmd)
    
    try {
        const [results] = await connection.query(
            sqlCmd,values
        ) as Array<any>

        if (results.affectedRows !=0) {
             res.status(200).send("Sikeres adatrögzítés")
             return
        }
        insertData(req,res)
       
    } catch (err) {
        console.log(err);
    }

}



export const patchData = async (req: Request, res: Response) => {
   let id: number = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send("Hibás paraméter!")
        return
    }


    if (!req.body) {
        res.status(400).send("Nem adott meg adatokat!")
        return
    }


    let reqDog: any = new Dog(req.body as unknown as IDog)

   
    const allowedFields = ['name','breed','gender','age','picurl']
    const keys = Object.keys(reqDog).filter(key => allowedFields.includes(key))

    if (keys.length === 0) { 
        res.status(400).send({ error: 103, messege: "Nincs frissítendő mező!" })
        return
    }

    const connection = await mysql.createConnection(config.database);

    const updateString = keys.map(key => `${key} = ?`).join(', ')
    const values = keys.map(key => reqDog[key])
    values.push(id)
    
    const sqlCmd:string = `update dog set ${updateString}  where id = ?`

    console.log(sqlCmd)
    
    try {
        const [results] = await connection.query(
            sqlCmd,values
        ) as Array<any>

        if (results.affectedRows !=0) {
             res.status(200).send("Sikeres adatrögzítés")
             return
        }
    res.status(200).send("Adatmódosítás nem történt")
       
    } catch (err) {
        console.log(err);
    }

}








