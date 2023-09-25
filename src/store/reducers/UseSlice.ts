import {createSlice,PayloadAction} from "@reduxjs/toolkit"
import { TPosition } from "../../models/TPosition";

interface PathState {
    paths: TPosition[];
    isDialogOpened:boolean;
}

const initialState:PathState ={
    paths:[],
    isDialogOpened:false,
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
        setMarkers(state,action: PayloadAction<TPosition[]>){
            const {payload} = action;
            state.paths = [...payload]
        },
    }
})


export default pathSlice.reducer;
