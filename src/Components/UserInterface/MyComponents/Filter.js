import { useEffect,useState } from "react";
import {useStyles} from "./FilterCss";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { getData } from "../../Services/FetchNodeServices";

export default function Filter(props){
    const classes=useStyles()
    var selectedSegment={}

    const [segment,setSegment]=useState([])
    const [brand,setBrand]=useState([])

    const fetchAllSegment=async()=>{
        var response=await getData('user/display_all_company')
        setSegment(response.data)
    }
    useEffect(function(){
        fetchAllSegment()
        fetchAllBrand()
    },[])

    const handleSegmentChange=(event)=>{

      //alert(event.target.value)
      if(event.target.checked)
        selectedSegment[event.target.value]=event.target.value
      else
       delete selectedSegment[event.target.value]

       alert(JSON.stringify(selectedSegment))
    }

        const displaySegment=()=>{
        return segment.map((item)=>{
            return(           
                     <FormControlLabel control={<Checkbox value={item.companyid}/>} onChange={handleSegmentChange} label={<span style={{fontFamily:'Poppins'}}>{item.companyname}</span>} />
                )
        })

    }
    const fetchAllBrand = async () => {
        var response=await getData('user/display_all_model')
        setBrand(response.data);
      };
      const displayBrand = () => {
        return brand.map((item) => {
          return (
              <FormControlLabel control={<Checkbox />} label={<span style={{fontFamily:'Poppins'}}>{item.modelname}</span>} />
          )    
        });
      };
      

      

  return (
    <div className={classes.filters}><span style={{paddingLeft:15}}> FILTERS</span><span style={{paddingLeft:120}}>RESET ALL</span>
    <div >
       <div className={classes.filters}>Segment</div>
       <div className={classes.items}>
        {displaySegment()}
       </div>

       <div className={classes.filters}>Brand</div>
       <div className={classes.items}>
        {displayBrand()}
       </div>
       
       <div className={classes.filters}>Fuel Type</div>
       <div className={classes.items}>
        <FormControlLabel control={<Checkbox />} label={<span style={{fontFamily:'Poppins'}}>Petrol</span>} />
        <FormControlLabel control={<Checkbox />} label={<span style={{fontFamily:'Poppins'}}>Diesel</span>} />
        <FormControlLabel control={<Checkbox />} label={<span style={{fontFamily:'Poppins'}}>CNG</span>} />
       </div>
       
       <div className={classes.filters}>Transmission</div>
       <div className={classes.items}>
        <FormControlLabel control={<Checkbox />} label={<span style={{fontFamily:'Poppins'}}>Automatic</span>} />
        <FormControlLabel control={<Checkbox />} label={<span style={{fontFamily:'Poppins'}}>Manual</span>} />

       </div>
       
       <div className={classes.filters}>Seating Capacity</div>
       <div className={classes.items}>
        <FormControlLabel control={<Checkbox />} label={<span style={{fontFamily:'Poppins'}}>5 Seater</span>} />
        <FormControlLabel control={<Checkbox />} label={<span style={{fontFamily:'Poppins'}}>5 Seater</span>} />
       </div>
    </div>
    </div>
  )
}