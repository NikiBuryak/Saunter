import {createSlice,PayloadAction} from "@reduxjs/toolkit"
import { IPath } from "../../models/IPath"
import { IPosition } from "../../models/IPosition";
import { stat } from "fs";

interface PathState {
    paths: IPosition[];
    activePath:IPath|null;
    isDialogOpened:boolean;
    error: string;
}

const initialState:PathState ={
    paths:[],
    activePath:null,
    isDialogOpened:false,
    error:''
}


export const pathSlice = createSlice({
    name:'paths',
    initialState,
    reducers:{
        openDialog(state){
            state.isDialogOpened=true
        },
        closeDialog(state){
            state.isDialogOpened=false
        },
        setMarkers(state,action: PayloadAction<IPosition[]>){
            const {payload} = action;
            state.paths = [...payload]
        },
        setActivePath(state, action:PayloadAction<IPath>){
            const {payload} = action;
            state.activePath = {...payload}
        }
    }
})


export default pathSlice.reducer;
