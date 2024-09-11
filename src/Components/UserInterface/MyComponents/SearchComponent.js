import * as React from 'react';
import { useEffect,useState } from "react"
import {Box,Divider,List,Paper, TextField} from '@mui/material';
import { LocationOn } from "@mui/icons-material";

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { getData} from '../../Services/FetchNodeServices';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker} from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DateDiff from 'date-diff';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function SearchComponent(props){
  const [selectedCity,setSelectedCity]=useState('Gwalior')
  const [cities,setCities]=useState([])
  const [startTime,setStartTime]=useState('')
  const [endTime,setEndTime]=useState('')
  const [open, setOpen] =useState(false);
  const [daysTime,setDaysTime]=useState('')
  var dispatch=useDispatch()
  var navigate=useNavigate()

  const fetchAllCities=async()=>{
    var response= await getData('user/display_all_cities')
    setCities(response.data)
  }

  const handleCitySelect=(cityselected)=>{
    setSelectedCity(cityselected)
    setOpen(false)
   }
 
   const showTopCity=()=>{
     return cities.map((item)=>{
       return (<>
             {item.status==='Top City'?<ListItem button>
              <ListItemText primary={<span style={{fontSize:18,fontWeight:'bold'}}>{item.cityname}</span>} onClick={()=>handleCitySelect(item.cityname)}/>
              </ListItem>:<></>}</>)
     })
   }
   const showOtherCity=()=>{
     return cities.map((item)=>{
       return (<>
             {item.status==='Other City'?<ListItem button>
              <ListItemText primary={<span style={{fontSize:18,fontWeight:'bold'}}>{item.cityname}</span>} onClick={()=>handleCitySelect(item.cityname)}/>
              </ListItem>:<></>}</>)
     })
   }
  useEffect(function(){
  fetchAllCities()
  },[])

  const handleCityDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const handleSetStartTimeValue=(newValue)=>{
    setStartTime(newValue)
  }
  const handleSetEndTimeValue=(newValue)=>{
    setEndTime(newValue)
    dateDiff(newValue)
  }

  const dateDiff=(et)=>{
     /*var startDay = new Date(start);
     var endDay = new Date(end);
     var millisecondsPerDay = 1000 * 60 * 60 * 24;

     var millisBetween = endDay.getTime() - startDay.getTime();
     var days = millisBetween / millisecondsPerDay;
    */
    var startDay = new Date(startTime);
    var endDay = new Date(et);
    if(endDay>startDay){
    var diff = new DateDiff(endDay, startDay);
    setDaysTime("Duration:"+parseInt(diff.days())+" Days "+Math.ceil(diff.hours()%24)+" Hrs");
  }
  else{
    setDaysTime("Invalid End Time")}
 }



 const handleSearch=()=>{
  dispatch({type:'ADD_BOOKING',payload:{city:selectedCity,starttime:startTime,endtime:endTime}})
  navigate('/vehicledetails')
 }



  const cityDialog=()=>{
    return (
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{style:{borderRadius:15}}}
        >
           <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Select your city
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      
          <Divider/>
          <DialogContent style={{width:300}}>
          <List>
             <div>Top Cities</div>
             {showTopCity()}
             <div>Other Cities</div>
             {showOtherCity()}
          </List>
          </DialogContent>
         
        </Dialog>
      </React.Fragment>
    );
  }




    return(
    <div style={{position:'relative'}}>
      <img src="/assets/slide1.png" alt="" style={{width:'100%'}} />
        
        <div style={{position:'absolute',left:'7%',top:12}}>
         <Paper elevation={3} style={{display:'flex',flexDirection:'column',alignItems:'center',padding:20,borderRadius:15,width:450,height:450}}>
          <div style={{position:'relative',background:'#f0932b',width:480,height:90,borderRadius:15}}>
            
            <div style={{position:'absolute',left:'5%',top:'15%'}}>
            <div style={{position:'relative'}}>
            <img src="/assets/message.png" alt="" style={{width:200,height:80}}/>
            <div style={{position:'absolute',left:'30%',top:0,fontSize:24,fontWeight:'bolder'}}>Rentals</div>
            <div style={{position:'absolute',left:'22%',top:'32%',fontSize:16,fontWeight:'500',color:'#7f8c8d'}}>for hours & days</div>
            </div>
            </div>

            <div style={{position:'absolute',left:'50%',top:'1%'}}>
            <div style={{width:220,height:85,padding:5,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <div style={{cursor:'pointer',fontSize:24,fontWeight:'bolder',color:'#FFF'}}>Subscriptions</div>
            <div style={{fontSize:16,fontWeight:'500',color:'#FFF'}}>for months & year</div>
            </div>
            </div>

          </div>

          <div>
            <img src="/assets/Rentals2.png" style={{width:120,marginTop:'20%'}}/>
          </div>
          <div style={{fontSize:20,fontWeight:600,color:'#7f8c8d',marginTop:'1%'}}>
            Self drice car rentals in india
          </div>
          <div onClick={handleCityDialog} style={{cursor:'pointer',marginTop:'5%',padding:10,alignItems:'center',display:'flex',width:400,height:40,borderRadius:15,border:'1px solid #bdc3c7'}}>
            <LocationOn/>
            <span style={{paddingLeft:20,fontSize:20,fontWeight:600}}>{selectedCity}</span>
          </div>
          <div style={{display:'flex',width:420,justifyContent:'space-between'}}>
            <div style={{cursor:'pointer',marginTop:'5%',padding:10,alignItems:'center',display:'flex',width:180,height:40,borderRadius:15,border:'1px solid #bdc3c7'}}>
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
             
             <MobileDateTimePicker  
             
             label={<span style={{color:'#7f8c8d',fontSize:18,fontWeight:600}}>Start Time</span>}
             InputProps={{disableUnderline:true}}
             value={startTime}
             onChange={(newValue)=>{handleSetStartTimeValue(newValue)}} 
            
             
             renderInput={(params) =><TextField variant='standard' {...params}/>}
             />
             
          </LocalizationProvider>
         
            </div>
            <div style={{cursor:'pointer',marginTop:'5%',padding:10,alignItems:'center',display:'flex',width:180,height:40,borderRadius:15,border:'1px solid #bdc3c7'}}>
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
             
             <MobileDateTimePicker  
             
             label={<span style={{color:'#7f8c8d',fontSize:18,fontWeight:600}}>End Time</span>}
             InputProps={{disableUnderline:true}}
             value={endTime}
             onChange={(newValue)=>{handleSetEndTimeValue(newValue)}} 
            
             
             renderInput={(params) =><TextField variant='standard' {...params}/>}
             />
             
          </LocalizationProvider>
         
            </div>
          </div>

          <div style={{color:'#7f8c8d',fontWeight:600,fontSize:16,marginTop:5}}>
              {daysTime}
          </div>

          <div onClick={handleSearch} style={{cursor:'pointer',background:'#f39c12',marginTop:'5%',padding:10,alignItems:'center',justifyContent:'center',display:'flex',width:400,height:40,borderRadius:15}}>
            <span style={{fontSize:24,fontWeight:'bolder',color:'#FFF'}}>Search</span>
          </div>

         </Paper>
        </div> 
        {cityDialog()}  

    </div>
    )
}