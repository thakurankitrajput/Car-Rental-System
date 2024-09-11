import * as React from 'react';
import { useEffect,useState } from "react"
import {Divider,List, TextField,Box,AppBar,Toolbar} from '@mui/material';
import { LocationOn } from "@mui/icons-material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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
import { useSelector } from 'react-redux';

export default function SecondHeader(props){
  
  var bookingDetails=useSelector(state=>state.booking)
  // console.log("BOOKING:",new Date(bookingDetails.starttime))
  const [selectedCity,setSelectedCity]=useState(bookingDetails.city)
  const [cities,setCities]=useState([])
  const [startTime,setStartTime]=useState(bookingDetails.starttime)
  const [endTime,setEndTime]=useState(bookingDetails.endtime)
  const [open, setOpen] =useState(false);
  const [daysTime,setDaysTime]=useState('')
  
  
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
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" color="inherit">
      <Toolbar>
  <div style={{padding:10,margin:8,paddingLeft:'10%',fontFamily:'Poppins',color:'#59646f',fontSize:12,fontWeight:600}}>
    Modify Search
    <div style={{display:'flex',flexDirection:'row'}}>
        <div style={{display:'flex',flexDirection:'row',marginRight:'2%'}}>
          <div onClick={handleCityDialog} style={{cursor:'pointer',padding:10,alignItems:'center',display:'flex',width:200,height:25,borderRadius: "5px 0px 0px 5px",border:'1px solid #e5e7ea',background:'#f1f4f8'}}>
            <LocationOn style={{color: "#1c7fab"}}/>
            <span style={{paddingLeft:20,fontSize:15,fontWeight:600}}>{selectedCity}</span>
            <KeyboardArrowDownIcon style={{
                    marginLeft: "auto",
                    color: "#1c7fab",
                    fontWeight: 400,
                  }} />
          </div>
          
            <div style={{cursor:'pointer',padding:10,alignItems:'center',display:'flex',width:200,height:25,borderRadius: "0px 0px 0px 0px",border:'1px solid #e5e7ea',background:'#f1f4f8'}}>
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
             
             <MobileDateTimePicker
             
             label={<span style={{color:"#1c7fab",fontSize:14,fontWeight:600}}>Start Time</span>}
             InputProps={{disableUnderline:true}}
             value={startTime}
             onChange={(newValue)=>{handleSetStartTimeValue(newValue)}} 
            
             
             renderInput={(params) =><TextField variant='standard' {...params}/>}
             />
             
          </LocalizationProvider>
          <KeyboardArrowDownIcon
                style={{ marginLeft: 15, color: "#1c7fab" }}
              />
         
            </div>
            <div style={{cursor:'pointer',padding:10,alignItems:'center',display:'flex',width:200,height:25,borderRadius: "0px 5px 5px 0px",border:'1px solid #e5e7ea',background:'#f1f4f8'}}>
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
             
             <MobileDateTimePicker  
             
             label={<span style={{color:"#1c7fab",fontSize:14,fontWeight:600}}>End Time</span>}
             InputProps={{disableUnderline:true}}
             value={endTime}
             onChange={(newValue)=>{handleSetEndTimeValue(newValue)}} 
            
             
             renderInput={(params) =><TextField variant='standard' {...params}/>}
             />
             
          </LocalizationProvider>
          <KeyboardArrowDownIcon
                style={{ marginLeft: 15, color: "#1c7fab" }}
              />
            </div>
          
          </div>
          <div style={{cursor:'pointer',background:'linear-gradient(270deg, #1caba2 20%, #1c7fab)',padding:10,alignItems:'center',justifyContent:'center',display:'flex',width:150,height:25,borderRadius:5}}>
          <span  style={{fontSize:18,fontWeight:'bold',color:'#FFF'}}>Search</span>
          </div>

         
    
        {cityDialog()}  

    </div></div>
    </Toolbar>
    </AppBar>
    </Box>
    )
}