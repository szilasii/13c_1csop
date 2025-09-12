interface IKutya {
  id: number | null;
  nev: string;
  fajta: string;
  nem: boolean;
  eletkor: number;
  kepUrl: string | null;
}

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
  public dogs(kutyak: IKutya[]): IKutya[] {
    const dogs: IKutya[] = [];
    dogs.push(...kutyak);
    return dogs;
  }
   public renderTable(containerId: string, data:IKutya[]): void {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error("A megadott container nem található!");
    }

    // Táblázat létrehozása
    const table = document.createElement("table");
    table.border = "1";

    // Fejléc generálás (az objektum kulcsai alapján)
    const headerRow = document.createElement("tr");
    if (!data[0]) {
        throw "sdgsdfg"
    }
    Object.keys(data[0]).forEach(key => {
      const th = document.createElement("th");
      th.innerHTML = key;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Adatok feltöltése
    data.forEach(row => {
      const tr = document.createElement("tr");
      Object.values(row).forEach(value => {
        console.log(typeof(value))
        const td = document.createElement("td");
        if (typeof value === "boolean")
          {
            console.log(value)
            if (!value) {
              td.innerHTML="kan"
            }
            else {  
            td.innerHTML= "szuka"
          }
          } 
        else{
          td.innerHTML = String(value);
        }    
        
        
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });
    container.appendChild(table)
  }

}

export { IKutya };
