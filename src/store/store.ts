import { combineReducers,configureStore } from "@reduxjs/toolkit";
import { type } from "os";
import pathsReducer from './reducers/UseSlice'; 

const rootReducer = combineReducers({
    pathsReducer
})

export const setupStore = ()=>{
    return configureStore({
        reducer:rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']