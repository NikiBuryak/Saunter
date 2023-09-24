import { IPosition } from "./IPosition"

export interface IPath{
    title:string,
    shortDescr:string|undefined,
    fullDescr:string|undefined,
    paths:IPosition[]
    isFavorite:number
    distance:number|undefined
}