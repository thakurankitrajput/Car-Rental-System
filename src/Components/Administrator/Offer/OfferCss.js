import { makeStyles } from "@mui/styles";
export const useStyles=makeStyles({
mainContainer:{
    display:'flex',
    paddingLeft:'10%',

    width:'100vw',
    height:'100vh'
},
box:{
    width:'50%',
    height:250,
    padding:15,
    borderRadius:10,
    marginTop:'5%',
    background:'#fff'
},
headingStyle:{
    fontWidth:24,
    fontWeight:'bold',
    letterSpacing:1,
    paddingTop:5,
    paddingBotton:5
},
center:{
    display:'flex',
    justifyContent:'left',
    alignItems:'center',
    flexDirection:'row'
}


})