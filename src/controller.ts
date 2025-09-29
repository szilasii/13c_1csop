import data from "./data"
import Dog, { IDog } from "./dog"

export const run = (_req: any, res: any) => {
    res.status(200).send("A szerver fut")
}

export const getALLData = (_req: any, res: any) => {
    res.status(200).send(data)
}

export const getDataFromId = (req: any, res: any) => {
    let id = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send("Hibás paraméter!")
        return
    }
    const dog: IDog  = data.find((i: any) => i.id === id)
    if (!dog) {
        res.status(404).send("Nem található a törlendő index!")
        return
    }
    res.status(201).send(dog)
}


export const insertData = (req: Request, res: any) => {
   
    if (!req.body) {
        res.status(400).send("Nem adott meg adatokat!")
        return
    }
    
    
    let dog: Dog = new Dog(req.body as unknown as IDog)
    
    if (dog.nev === "" || dog.fajta === "") {
         res.status(400).send("Nem adott meg adatokat!")
     return
    }

    
    dog.id = Math.max(...data.map((d:any) => d.id)) + 1
    data.push(dog)
    res.status(201).send(dog)
}
export const deleteDataFromId = (req: any, res: any) => {

    let id = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send("Hibás paraméter!")
        return
    }
    const index = data.findIndex((i: any) => i.id === id)
    if (index === -1) {
        res.status(404).send("Nem található a törlendő index!")
        return
    }
    data.splice(index, 1)
    res.status(204).send()
}









