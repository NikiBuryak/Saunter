import { TPosition } from "./TPosition"

export interface IPath{
    title:string,
    shortDescr:string|undefined,
    fullDescr:string|undefined,
    paths:TPosition[]
    isFavorite:number
    distance:number
}