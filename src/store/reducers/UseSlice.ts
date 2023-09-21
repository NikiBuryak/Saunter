import {createSlice} from "@reduxjs/toolkit"

interface PathState {
    paths: Array<number>
    isLoading:boolean
    isDialogOpened:boolean
    error: string
}

const initialState ={
    paths:[],
    isLoading:false,
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
        }
    }
})


export default pathSlice.reducer;
