import { data } from "./data.js"
import Kutya from "./kutya.js"

const kutya : Kutya = new Kutya(data[0])
kutya.renderTable("cont",data)
// console.log(kutya.dog())
// console.log(kutya.dogs(data))