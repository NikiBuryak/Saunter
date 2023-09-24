import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react"
import { collection, getDocs, addDoc,updateDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
import {db} from "./FireBase"
import { IPath } from "../models/IPath";
import { string } from "yargs";

interface IFavorite{
  id:string
  isFavorite:number
}

type TListReturn = Error


export const pathsApi = createApi({
  reducerPath:  'pathsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes:['Paths'],
  endpoints:(build)=>({
    getPaths: build.query({
        queryFn:async()=>{
           try {
            const col = collection(db, "paths");
            const pathsSnapshot = await getDocs(col);
            const pathList = pathsSnapshot.docs.map((doc) =>({...doc.data() as IPath, id:doc.id}));
            pathList.sort((a,b)=>b.isFavorite - a.isFavorite)
            return{
                data: pathList
            }
            
           } catch (error) {
            return {error:error}
           }
        },
        providesTags:result=>["Paths"]
    }),
    getSinglePath: build.query({
      queryFn:async(id:string)=>{
         try {
          
          const col = doc(db, "paths", id);
          const pathsSnapshot = await getDoc(col);
          return{
            data:pathsSnapshot.data()
             }
         } catch (error) {
          return {error}
         }
      },
      providesTags:result=>["Paths"]
  }),
    addPath: build.mutation({
      queryFn: async(path:IPath)=>{
        try {
          const col = collection(db, "paths");
          const pathsSnapshot = await addDoc(col, path);
          return {data:pathsSnapshot}
        } catch (error) {
            return{error}
        }
      },
      invalidatesTags:result=>["Paths"]
    }),
    changeFavorite: build.mutation({
      queryFn: async({id,isFavorite}:IFavorite) =>{
          try {
            const pathDoc = doc(db, 'paths', id);

            const newField = {isFavorite: isFavorite === 1 ? 0 : 1};
            const updPath = await updateDoc(pathDoc,newField)
            
            return {data:updPath}
          } catch (error) {
            return {error}
          }
      },
      invalidatesTags:result=>["Paths"]
    }),
    deletePath : build.mutation({
      queryFn: async (id:string)=>{
        try {
          const pathDoc = doc(db,'paths', id);
          const resp = await deleteDoc (pathDoc);
          return {data:resp}
        } catch (error) {
          return {error}
        }
      },
      invalidatesTags:result=>["Paths"]
    })
  })
})