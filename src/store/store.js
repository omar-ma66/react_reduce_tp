import { configureStore } from "@reduxjs/toolkit";
import  mySliceReducer  from "../features/Slice/mySlice.js";
import  fightReducer from "../features/fight/fightSlice.js"

export const store = configureStore({
    reducer:{
        sliceTiroir : mySliceReducer,
        fight: fightReducer ,
    },
                                    })