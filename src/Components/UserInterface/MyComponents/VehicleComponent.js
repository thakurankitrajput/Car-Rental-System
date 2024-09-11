import { useEffect,useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { ServerURL } from "../../Services/FetchNodeServices";

export default function VehicleComponent(props){

    var item=props.item
    return(     
    <div style={{width:230,display:'flex',flexDirection:"column",background:'#fff',borderRadius:20,padding:20}}>
        <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
            <img src={`${ServerURL}/images/${item.icon}`} width='60%' />

        </div>
        <div style={{display:'flex',flexDirection:'column',padding:10}}>
           <div style={{color:'#59646f',fontSize:11,fontWeight:600}}>
            {item.companyname}
           </div>
           <div style={{fontSize:14,fontWeight:600,color:'#122232',marginTop:8}}>
            {item.modelname}
           </div>
           <div style={{display:'flex',flexDirection:'row',marginTop:8,fontFamily:'Poppins',fontSize:12,fontWeight:400,color:'#59646f'}}>
             <div><span style={{marginRight:3}}><img src="/assets/icondiesel.svg"/></span>{item.fueltype}</div>
             <div style={{marginLeft:7}}><span style={{marginRight:3}} ><img src="/assets/icontransmission.svg"/></span>Manual</div> 
             <div style={{marginLeft:7}}><span style={{marginRight:3}}><img src="/assets/iconseat.svg"/></span>{item.capacity} Seater</div>  
           </div>

           <div style={{display:'flex',flexDirection:'row',marginTop:10,alignItems:'baseline',justifyContent:'space-between',height:30}}>
            <div>
            <span style={{fontSize:20,fontWeight:'bolder',marginRight:5}}>&#8377;</span>
            <span style={{fontSize:28,fontWeight:'bolder'}}>25,674</span>
            </div>
            <span><Button variant="contained" style={{background:'linear-gradient(270deg, #1caba2 20%, #1c7fab)'}}>Book &gt;</Button> </span>
           </div>

           <div style={{display:'flex',flexDirection:'row',marginTop:15}}>
             <span style={{fontSize:12,color:'#59646f'}}>Prices <b>exclude</b> fuel cost</span>
           </div>

        </div>
    </div>)
}