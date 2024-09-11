import { useEffect,useState } from "react";
import VehicleComponent from "./MyComponents/VehicleComponent";
import {getData} from "../Services/FetchNodeServices";
import { Grid } from "@material-ui/core";
import Filter from "./MyComponents/Filter";
import Header from "./MyComponents/Header";
import SecondHeader from "./MyComponents/SecondHeader";  

export default function VehicleDetails(props){
    
    const [vehicleList,setVehicleList]=useState([])
    const fetchAllVehicle=async()=>{
        var result=await getData('user/display_all_vehicle')
        setVehicleList(result.data)
    }
    useEffect(function(){
        fetchAllVehicle()
    },[])
    const listVehicle=()=>{
        return vehicleList.map((item)=>{
            return(<div style={{padding:5,margin:5}}>
                  <VehicleComponent item={item}/>
              
            </div>)
        })
    } 



    return(
        <div style={{display:'flex',flexDirection:'column'}}>
            <div>
                <Header />
            </div>
            <div style={{marginBottom:20}}>
                <SecondHeader />
            </div>

        <Grid container spacing={4}>
            <Grid item xs={3}>
              <Filter />
            </Grid>

            <Grid item xs={9} style={{background:'#f1f4f8'}}>
        <div style={{margin:20,display:'flex',flexWrap:'wrap'}}>
            {listVehicle()}
        </div>
            </Grid>
        </Grid>
        </div>
    )
}