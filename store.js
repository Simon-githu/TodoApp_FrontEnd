import {configureStore} from "@reduxjs/toolkit";
import todoAppSlice from "./slices/todoAppSlice";

export const store = configureStore({
    reducer:{
        todoApp:todoAppSlice,
    }
})