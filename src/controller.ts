import data from "./data"
import { Request, Response } from "express"
import Dog, { IDog } from "./dog"

export const run = (_req: Request, res: Response) => {
    res.status(200).send("A szerver fut")
}

export const getALLData = (_req: Request, res: Response) => {
    res.status(200).send(data)
}

export const getDataFromId = (req: Request, res: Response) => {
    let id: number = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send("Hibás paraméter!")
        return
    }
    const dog: IDog | undefined = data.find((i: IDog) => i.id === id)
    if (!dog) {
        res.status(404).send("Nem található a törlendő index!")
        return
    }
    res.status(201).send(dog)
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


    dog.id = Math.max(...data.map((d: IDog) => d.id)) + 1
    data.push(dog)
    res.status(201).send(dog)
}
export const deleteDataFromId = (req: Request, res: Response) => {

    let id: number = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send("Hibás paraméter!")
        return
    }
    const index: number = data.findIndex((i: IDog) => i.id === id)
    if (index === -1) {
        res.status(404).send("Nem található a törlendő index!")
        return
    }
    data.splice(index, 1)
    res.status(204).send()
}

export const putData = (req: Request, res: Response) => {
    let id: number = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send("Hibás paraméter!")
        return
    }
    const index: number = data.findIndex((i: IDog) => i.id === id)
    if (index === -1) {
        insertData(req, res)
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
    reqDog.id = id
    data[index] = reqDog
    res.status(201).send(data)
}



export const patchData = (req: Request, res: Response) => {
    let id: number = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send("Hibás paraméter!")
        return
    }
    const index: number = data.findIndex((i: IDog) => i.id === id)
    if (index === -1) {
        res.status(404).send("A megadott id nem létezik")
        return
    }

    if (!req.body) {
        res.status(400).send("Nem adott meg adatokat!")
        return
    }

    let reqDog: Dog = new Dog(req.body as unknown as IDog)

    // for (const key in reqDog) {
    //     const k = key as keyof Dog
    //     if (reqDog[k]) {
    //         data[index][key] = reqDog[k]
    //     }
    // }

    Object.assign(data[index], {
        nev: reqDog.nev || data[index].nev,
        fajta: reqDog.fajta || data[index].fajta,
        eletkor: reqDog.eletkor || data[index].eletkor,
        nem: reqDog.nem || data[index].nem,
        kepUrl: reqDog.kepUrl || data[index].kepUrl
    })


    // data[index].nev  = reqDog.nev || data[index].nev
    // data[index].fajta  = reqDog.fajta || data[index].fajta
    // data[index].eletkor  = reqDog.eletkor || data[index].eletkor
    // data[index].nem  = reqDog.nem || data[index].nem
    // data[index].kepUrl  = reqDog.kepUrl || data[index].kepUrl
    res.status(201).send(data)
}







