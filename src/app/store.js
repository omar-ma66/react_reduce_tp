import { configureStore } from "@reduxjs/toolkit";
import  mySliceReducer  from "../features/Slice/mySlice.js";

export const store = configureStore({
    reducer:{
        sliceTiroir : mySliceReducer,
    },
                                    })