export interface IKutya {
    id : number | null;
    nev : string;
    fajta : string;
    nem: boolean;
    eletkor: number;
    kepUrl: string | null; 
}

class Valami {
  name! : string;

  x : number;
  y : number;
  constructor (y:number,x=0) {
    this.x = x;
    this.y = y;
  }
}

const valami = new Valami(5)

console.log(`${valami.x} ${valami.y}`)

export default class Kutya implements IKutya {

    constructor(dog: IKutya) {
    this.id = dog.id || null;
    this.nev = dog.nev;
    this.fajta = dog.fajta;
    this.nem = dog.nem;
    this.eletkor = dog.eletkor;
    this.kepUrl = dog.kepUrl || null;
  }
  id: number | null;
  nev: string;
  fajta: string;
  nem: boolean;
  eletkor: number;
  kepUrl: string | null;
   get Id() {
    return this.id;
  }
  set Id(id: number | null) {
    this.id = id;
  }
  public dog(): IKutya {
    const dog: IKutya = {
      id: this.id,
      nev: this.nev,
      fajta: this.fajta,
      nem: this.nem,
      eletkor: this.eletkor,
      kepUrl: this.kepUrl,
    };
    return dog;
  }
  public dogs(kutyak:IKutya[]): IKutya[] {
    const dogs: IKutya[]=[]; 
    dogs.push(...kutyak)
    return dogs;
  }
}