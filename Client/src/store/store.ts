
import {configureStore} from "@reduxjs/toolkit";
import book_slice from "./slice/bookSlice"

export const store =configureStore({
    reducer:{
        books:book_slice
    }
})

    