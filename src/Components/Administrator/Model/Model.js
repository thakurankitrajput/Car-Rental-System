import { useEffect,useState } from "react";
import { Grid,TextField,Button,Avatar,styled } from "@mui/material";
import {useStyles} from "./ModelCss"
import Swal from "sweetalert2";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ServerURL,postData ,getData} from "../../Services/FetchNodeServices";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from "react-router-dom";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Model(props){
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
    var [subCategoryId,setSubCategoryId]=useState('')
    var [companyId,setCompanyId]=useState('')
    var [modelName,setModelName]=useState('')
    var [year,setYear]=useState('')
    var [categoryList,setCategoryList]=useState([])
    var [subCategoryList,setSubCategoryList]=useState([])
    var [companyList,setCompanyList]=useState([])

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

    const fetchAllSubcategoryByCategory=async(category_id)=>{
         var body={categoryid:category_id}
         var response=await postData('subcategory/fetch_all_subcategory_by_category',body);
         setSubCategoryList(response.result)
        }

    const fillSubCategoryDropDown=()=>{
        return subCategoryList.map((item)=>{
            return(
                <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
            )
        })
    }

    const fetchAllCompanyBySubCategory=async(subcategory_id)=>{
        var body={subcategoryid:subcategory_id}
        var response=await postData('company/fetch_all_company_by_subcategory',body);
        setCompanyList(response.results)
    }
    const fillCompanyDropDown=()=>{
        return companyList.map((item)=>{
            return(
                <MenuItem value={item.companyid}>{item.companyname}</MenuItem>
            )
        })
    }


        const handleChange=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubcategoryByCategory(event.target.value)
        
        }

        const handleSubCategoryChange=(event)=>{
            setSubCategoryId(event.target.value)
            fetchAllCompanyBySubCategory(event.target.value)
            }

        const handleCompanyChange=(event)=>{
            setCompanyId(event.target.value)
        }

        const handleShowModelList=()=>{
            navigate('/dashboard/Displayallmodel')
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
  formData.append('subcategoryid' , subCategoryId)
  formData.append('companyid',companyId)
  formData.append('modelname',modelName)
  formData.append('year',year)
  formData.append('icon',icon.bytes)
  var response=await postData('model/modelsubmit',formData)  //from this line it will jump to the const postData in FetchNodeServices.js file 
  if(response.status)
    {
    Swal.fire({
        icon: "success",
        title: "Done",
        text: "Model submitted successfully",
        
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
    setSubCategoryId('')
    setCompanyId('')
    setModelName('')
    setYear('')
    setIcon({filename:'/assets/defaultcar.png',bytes:''})
}

    return(<div className={classes.mainContainer}>
        <div className={classes.box}>
        <Grid container spacing={2}>
        <Grid item xs={12} className={classes.headingStyle}>
            <div className={classes.center}>
                <ListAltIcon onClick={handleShowModelList} />
                    
                <div style={{marginLeft:5}}>
                 Model Interface
                </div>
                </div>

            </Grid>
            <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                           id="demo-simple-select"
                           value={categoryId}
                           label="Category"
                           onChange={handleChange}
                          >
                            {fillCategoryDropDown()}
                        </Select>
                      </FormControl>
            </Grid>


            <Grid item xs={4}>
            <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Select SubCategory</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                           id="demo-simple-select"
                           value={subCategoryId}
                           label="SubCategory"
                           onChange={handleSubCategoryChange}
                          >
                            {fillSubCategoryDropDown()}
                        </Select>
                      </FormControl>

            </Grid>

            <Grid item xs={4}>
            <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Select Company</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                           id="demo-simple-select"
                           value={companyId}
                           label="Company"
                           onChange={handleCompanyChange}
                          >
                            {fillCompanyDropDown()}
                        </Select>
                      </FormControl>

            </Grid>



            <Grid item xs={6}>
               <TextField onChange={(event)=>setModelName(event.target.value)} label="Model Name" fullWidth/>
            </Grid>

            <Grid item xs={6}>
               <TextField onChange={(event)=>setYear(event.target.value)} label="Year" fullWidth/>
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

