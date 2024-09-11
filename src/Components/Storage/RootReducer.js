const initialState={      //variable  json me hoga
    booking:{}           //yha se keys & values me data jayga DisplaAllEmployee ke andr
    
}

export default function RootReducer(state=initialState,actions)  //reducer ke andr actions hote h
{
    switch(actions.type)
    {
        case 'ADD_BOOKING':
            //state.booking[actions.payload[0]]=actions.payload[1]
            state.booking=actions.payload
            //console.log("REDUX",state.employee)

            return ({booking:state.booking})
        
        /*  
        case 'DELETE_EMPLOYEE':
        delete state.booking[actions.payload[0]]
        return ({booking:state.booking})  
        */
        

        default:
            return state
    }
}