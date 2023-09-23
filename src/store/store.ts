import { combineReducers,configureStore } from "@reduxjs/toolkit";
import { type } from "os";
import pathsReducer from './reducers/UseSlice'; 
import { pathsApi } from "../services/PathService";

const rootReducer = combineReducers({
    pathsReducer,
    [pathsApi.reducerPath]: pathsApi.reducer
})

export const setupStore = ()=>{
    return configureStore({
        reducer:rootReducer,
        middleware:(getDefaultMiddleware)=> 
        getDefaultMiddleware({  serializableCheck: false,}).concat(pathsApi.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']