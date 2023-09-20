import {createSlice} from "@reduxjs/toolkit"

interface PathState {
    paths: Array<number>
    isLoading:boolean
    error: string
}

const initialState ={
    paths:[],
    isLoading:false,
    error:''
}


export const userSlice = createSlice({
    name:'paths',
    initialState,
    reducers:{
        
    }
})


export default userSlice.reducer;
