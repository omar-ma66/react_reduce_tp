import { createSlice } from "@reduxjs/toolkit"; 


// mySlice a definir plus tard 
export const mySlice = createSlice({
    name: "sliceTiroire",
    initialState : {
        data_name:  "data_val_origine",  // a modiffier plus tard  
    },
    reducers:{
        function1 : (state) => {state.data_name = "nouvelle valeur 1" } , // ajuster plus tard 
        function2 : (state) => {state.data_name = "nouvelle valeur 2" } , // ajuster plus tard 
        function3  :(state,action) =>{state.data_name = action.payload } 
    }
})

// nom des fonction a definir plus tard
export const  { function1,function2,function3 } = mySlice.actions ;  
export default mySlice.reducer ;