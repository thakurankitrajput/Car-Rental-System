import { useEffect,useState } from "react";              //types of hooks-useEffect,useState,useNavigate
import { Grid,TextField,Button,Avatar,styled } from "@mui/material";
import {useStyles} from "./WhyPnpInterfaceCss"
import Swal from "sweetalert2";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ServerURL,postData } from "../../Services/FetchNodeServices";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Margin } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


export default function WhyPnpInterface(props){
    const classes=useStyles()
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });
      




   var navigate=useNavigate()
    var [icon,setIcon]=useState({filename:'/assets/defaultcar.png',bytes:''})
    var [title,setTitle]=useState('')
    var [description,setDescription]=useState('')
    const handlePicture=(event)=>{
        setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }
    //cretateobjectURL - ye local folder se image ka actual path deta h.
    //event.target.files - jo file choose ki h uska address/poori info provide krega.
    //cretateobjectURL files[0] me se path utha lega.

  const handleSubmit=async()=>{
  var formData=new FormData()     //formData is used only data ke sath picture hoti h.
  formData.append('icon',icon.bytes)
  formData.append('title',title)
  formData.append('description',description)
  var response=await postData('whypnp/whypnpsubmit',formData)  //from this line it will jump to the const postData in FetchNodeServices.js file 
  if(response.status)
    {
    Swal.fire({
        icon: "success",
        title: "Done",
        text: "Whypnp submitted successfully",
        
      });
    }
    else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            });
    }
}

const clearValues=()=>{
    setDescription('')
    setTitle('')
    setIcon({filename:'/assets/defaultcar.png',bytes:''})
}

const handleShowOfferList=()=>{
 navigate('/dashboard/Displayalloffer')
}  

    return(<div className={classes.mainContainer}>
        <div className={classes.box}>
        <Grid container spacing={2}>
            <Grid item xs={12} className={classes.headingStyle}>
                <div className={classes.center}>
                <ListAltIcon onClick={handleShowOfferList} />
                    
                <div style={{marginLeft:5}}>
                 WhyPnp Interface
                </div>
                </div>
            </Grid>
            <Grid item xs={12}>
               <TextField onChange={(event)=>setTitle(event.target.value)} label="Title" fullWidth/>
            </Grid>
            <Grid item xs={12}>
               <TextField onChange={(event)=>setDescription(event.target.value)} label="Description" fullWidth/>
            </Grid>

            <Grid item xs={6}>
              <Button fullWidth
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              >Upload File
        
              <VisuallyHiddenInput type="file" onChange={handlePicture}/>
              </Button>
            </Grid>

            <Grid item xs={6} className={classes.center}>
            <Avatar
             alt="Category Icon"
             src={icon.filename}
             variant="rounded"
             sx={{ width: 120, height: 56 }}
            />
            </Grid>

            <Grid item xs={6}>
                <Button onClick={handleSubmit} variant="contained" fullWidth>
                    Submit
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={clearValues} variant="contained" fullWidth>
                    Reset
                </Button>
            </Grid>


        </Grid>
        </div>
    </div>)
}

