import { useEffect,useState } from "react";
import { Grid,TextField,Button,Avatar,styled } from "@mui/material";
import {useStyles} from "./SubCategoryCss"
import Swal from "sweetalert2";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ServerURL,postData ,getData} from "../../Services/FetchNodeServices";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Margin } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SubCategory(props){
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
    var [categoryId,setCategoryId]=useState('')
    var [subcategoryName,setSubCategoryName]=useState('')
    var [priority,setPriority]=useState('')
    var [categoryList,setCategoryList]=useState([])
    
    const fetchAllCategory=async()=>{
        var result=await getData('category/display_all_category')
        setCategoryList(result.data)
       }
       useEffect(function(){            //useEffect is for page rendering or state change 
                                        //jb hm program run krte h toh sbse phle useEffect sbse phle call hota h
        fetchAllCategory()
       },[])

       const fillCategoryDropDown=()=>{
        return categoryList.map((item)=>{         //categoryList.map  array bnake dega or array json me hoga.
        return(                                  //ye wla return is for jo new array return hoke ayga 
            <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            
        )
       })
    }   


const handleChange=(event)=>{
setCategoryId(event.target.value)
}

const handleShowSubCategoryList=()=>{
    navigate('/dashboard/Displayallsubcategory')
   } 

    const handlePicture=(event)=>{
        setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }
    //cretateobjectURL - ye local folder se image ka actual path deta h.
    //event.target.files - jo file choose ki h uska address/poori info provide krega.
    //cretateobjectURL files[0] me se path utha lega.

  const handleSubmit=async()=>{
  var formData=new FormData()     
  formData.append('categoryid',categoryId)
  formData.append('subcategoryname' , subcategoryName)
  formData.append('priority',priority)
  formData.append('icon',icon.bytes)
  var response=await postData('subcategory/subcategorysubmit',formData);  //from this line it will jump to the const postData in FetchNodeServices.js file 
  if(response.status)
    {
    Swal.fire({
        icon: "success",
        title: "Done",
        text: "Category submitted successfully",
        
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
    setCategoryId('')
    setPriority('')
    setSubCategoryName('')
    setIcon({filename:'/assets/defaultcar.png',bytes:''})
}



    return(<div className={classes.mainContainer}>
        <div className={classes.box}>
        <Grid container spacing={2}>
            <Grid item xs={12} className={classes.headingStyle}>
            <div className={classes.center}>
                <ListAltIcon onClick={handleShowSubCategoryList} />
                    
                <div style={{marginLeft:5}}>
                 SubCategory Interface
                </div>
                </div>

            </Grid>
            <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                           id="demo-simple-select"
                           value={categoryId}
                           label="Select Category"
                           onChange={handleChange}
                          >
                            {fillCategoryDropDown()}
                        </Select>
                      </FormControl>
            </Grid>


            <Grid item xs={12}>
               <TextField onChange={(event)=>setSubCategoryName(event.target.value)} label="SubCategory Name" fullWidth/>
            </Grid>


            <Grid item xs={12}>
               <TextField onChange={(event)=>setPriority(event.target.value)} label="Priority" fullWidth/>
            </Grid>

            <Grid item xs={6}>
              <Button fullWidth
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              >Upload 
        
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

