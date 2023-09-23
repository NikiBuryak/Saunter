import { IPosition } from "./IPosition"

export interface IPath{
    id:string,
    title:string,
    shortDescr:string|undefined,
    fullDescr:string|undefined,
    paths:IPosition[]
    isFavorite:number
    distance:number|undefined
}