
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

export const getDataFromId = (req: Request, res: Response) => {
    let id: number = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send("Hibás paraméter!")
        return
    }

    res.status(201).send()
}


export const insertData = (req: Request, res: Response) => {

    if (!req.body) {
        res.status(400).send("Nem adott meg adatokat!")
        return
    }


    let dog: Dog = new Dog(req.body as unknown as IDog)

    if (dog.nev === "" || dog.fajta === "") {
        res.status(400).send("Nem adott meg adatokat!")
        return
    }



}
export const deleteDataFromId = (req: Request, res: Response) => {

    let id: number = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send("Hibás paraméter!")
        return
    }

}

export const putData = (req: Request, res: Response) => {
    let id: number = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send("Hibás paraméter!")
        return
    }


    if (!req.body) {
        res.status(400).send("Nem adott meg adatokat!")
        return
    }


    let reqDog: Dog = new Dog(req.body as unknown as IDog)

    if (reqDog.nev === "" || reqDog.fajta === "") {
        res.status(400).send("Nem adott meg adatokat!")
        return
    }

}



export const patchData = (req: Request, res: Response) => {
    let id: number = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send("Hibás paraméter!")
        return
    }


    if (!req.body) {
        res.status(400).send("Nem adott meg adatokat!")
        return
    }

    //let reqDog: Dog = new Dog(req.body as unkown as Dog)

    // for (const key in reqDog) {
    //     const k = key as keyof Dog
    //     if (reqDog[k]) {
    //         data[index][key] = reqDog[k]
    //     }
    // }

    // Object.assign(data[index], {
    //     nev: reqDog.nev || data[index].nev,
    //     fajta: reqDog.fajta || data[index].fajta,
    //     eletkor: reqDog.eletkor || data[index].eletkor,
    //     nem: reqDog.nem || data[index].nem,
    //     kepUrl: reqDog.kepUrl || data[index].kepUrl
    // })


    // data[index].nev  = reqDog.nev || data[index].nev
    // data[index].fajta  = reqDog.fajta || data[index].fajta
    // data[index].eletkor  = reqDog.eletkor || data[index].eletkor
    // data[index].nem  = reqDog.nem || data[index].nem
    // data[index].kepUrl  = reqDog.kepUrl || data[index].kepUrl

}



// function applyPatch<T extends object>(target: T, patch: Partial<T>) {
//   (Object.keys(patch) as Array<keyof T>).forEach((k) => {
//     const v = patch[k];
//     if (v !== undefined && v !== null && v !== '') {
//       target[k] = v as T[typeof k];
//     }
//   });
// }






