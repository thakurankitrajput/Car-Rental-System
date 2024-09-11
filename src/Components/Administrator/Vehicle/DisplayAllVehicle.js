import MaterialTable from "@material-table/core";
import { useState,useEffect } from "react"
import { getData,postData,ServerURL} from "../../Services/FetchNodeServices";
import { Avatar,Button,TextField,Grid,styled} from "@material-ui/core";
import { useStyles } from "./DisplayAllVehicleCss";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { upload } from "@testing-library/user-event/dist/upload";
import {  useNavigate } from "react-router-dom";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function DisplayAllVehicle(props){
  var classes=useStyles()
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
   const [subcategory,setSubCategory]=useState([])
   var [icon,setIcon]=useState({filename:'/assets/defaultcar.png',bytes:''})
    var [prevIcon,setPrevIcon]=useState('')
    var [oldIcon,setOldIcon]=useState('')
    var [vehicle,setVehicle]=useState([])
    var [modelID,setModelID]=useState('')
    var [modelName,setModelName]=useState('')
    var [modelList,setModelList]=useState([])
    var [vehicleID,setVehicleID]=useState('')
    var [vendorid,setVendorId]=useState('')
    var [registrationno,setRegistrationNo]=useState('')
    var [color,setColor]=useState('')
    var [fueltype,setFueltype]=useState('')
    var [ratings,setRatings]=useState('')
    var [average,setAverage]=useState('')
    var [remarks,setRemarks]=useState('')
    var [capacity,setCapacity]=useState('')
    var [status,setStatus]=useState('')
    var [feature,setFeature]=useState('')
    var [companyList,setCompanyList]=useState([])
    var [companyID,setCompanyID]=useState('')
    var [companyName,setCompanyName]=useState([])
   var [subcategoryName,setSubCategoryName]=useState('')
   var [categoryName,setCategoryName]=useState('')
   var [categoryID,setCategoryID]=useState('')
   var [categoryList,setCategoryList]=useState([])
    var [subcategoryID,setSubCategoryID]=useState('')
    const [subCategoryList,setSubCategoryList]=useState([])
    var [buttonStatus,setButtonStatus]=useState({upload:true})          //buttonStatus is made for upload/save/discard buttons.
                                                                        // agr buttonStatus me false hoga toh uplaod button show ni hoga button pr click rne pr.otherwise show hoga.
   const [open,setOpen]=useState(false)  //setOpen is made for opening and closing functionality of anything.

   const fetchAllVehicle=async()=>{
    var result=await getData('vehicle/display_all_vehicle')
    setVehicle(result.data)
   }
   const fetchAllModel=async()=>{
    var result=await getData('model/display_all_model')
    setModelList(result.data)
   }
   const fetchAllCompany=async()=>{
    var result=await getData('company/display_all_company')
    setCompanyList(result.data)
   }
   const fetchAllCategory=async()=>{
    var result=await getData('category/display_all_category')
    setCategoryList(result.data)
   }
   const fetchAllSubCategory=async()=>{
    var result=await getData('subcategory/display_all_subcategory')
    setSubCategoryList(result.data)
   }
   useEffect(function(){            //useEffect is for page rendering or state change
    
    fetchAllVehicle()
   },[])

   const fillCategoryDropDown=()=>{
    return categoryList.map((item)=>{         //categoryList.map  array bnake dega or array json me hoga.
    return(                                  //ye wla return is for jo new array return hoke ayga 
        <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem> 
     )
    })
   } 

   const fetchAllSubCategoryByCategory=async(category_id)=>{
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
        var response=await postData('subcategory/fetch_all_company_by_subcategory',body);
        setCompanyList(response.results)
       }
       const fillCompanyDropDown=()=>{
        return companyList.map((item)=>{
            return(
                <MenuItem value={item.companyid}>{item.companyname}</MenuItem>
            )
        })
    }  
    const fetchAllModelByCompany=async(company_id)=>{
      var body={companyid:company_id}
      var response=await postData('model/fetch_all_model_by_company',body);
      setModelList(response.results1)
    }
    const fillModelDropDown=()=>{
      return modelList.map((item)=>{
        return(
            <MenuItem value={item.modelid}>{item.modelname}</MenuItem>
        )
    })
    }
   
  const handleChange=(event)=>{
    setCategoryID(event.target.value)
    fetchAllSubCategoryByCategory(event.target.value)
  }
  const handleSubCategoryChange=(event)=>{
    setSubCategoryID(event.target.value)
    fetchAllCompanyBySubCategory(event.target.value)
    }
    const handleCompanyChange=(event)=>{
        setCompanyID(event.target.value)
        fetchAllModelByCompany(event.target.value)
    }
    const handleModelChange=(event)=>{
      setModelID(event.target.value)
    }

   const handleSetDataForDialog=(rowData)=>{
    fetchAllSubCategory()
    fetchAllCategory()
    fetchAllModel()
    fetchAllCompany()
    fetchAllVehicle()
    setVehicleID(rowData.vehicleid)
    setAverage(rowData.average)
    setCapacity(rowData.capacity)
    setColor(rowData.color)
    setFeature(rowData.feature)
    setFueltype(rowData.fueltype)
    setRatings(rowData.ratings)
    setRegistrationNo(rowData.registrationno)
    setRemarks(rowData.remarks)
    setVendorId(rowData.vendorid)
    setStatus(rowData.status)
    setModelID(rowData.modelid)
    setModelName(rowData.modelname)
    setCompanyID(rowData.companyid)
    setCompanyName(rowData.companyname)
    setCategoryID(rowData.categoryid)
    setCategoryName(rowData.categoryname)
    setSubCategoryID(rowData.subcategoryid)
    setSubCategoryName(rowData.subcategoryname)
    setOldIcon(rowData.icon)
    setIcon({filename:`${ServerURL}/images/${rowData.icon}`,bytes:''})
    setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
    setOpen(true)   //true in setOpen fn is for opening of any button in the page.
   }

   const handleDiscard=()=>{
    setIcon({filename:prevIcon,bytes:''})
    setButtonStatus({upload:true})
   }

   const handleSavePicture=async()=>{
    var formData=new FormData()        //formData ka use kebal picture ke liye use kiya jata h.
    formData.append('vehicleid',vehicleID)
    formData.append('oldicon',oldIcon)
    formData.append('icon',icon.bytes)
    var response=await postData('vehicle/edit_picture',formData)
    if(response.status)
    {
    Swal.fire({
        icon: "success",
        title: "Done",
        text: "Icon updated  successfully",
        
      });
    }
    else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            });
    }
    setButtonStatus({upload:true})  //for showing upload button again after clicking save/discard button.
    setOpen(false)      //inside setOpen fn false is for closing after clicking discard button in dialog.
    fetchAllVehicle()   //for  automatically refreshing the page just after updating the picture.
   }


   const handleEditData=async()=>{
    var body={vehicleid:vehicleID}
    var response=await postData('vehicle/edit_data',body)
    if(response.status)
    {
    Swal.fire({
        icon: "success",
        title: "Done",
        text: "Vehicle updated successfully",
        
      });
    }
    else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            });
    }
    setOpen(false)      //inside setOpen fn false is for closing after clicking discard button in dialog.
    fetchAllVehicle()   //for  automatically refreshing the page just after updating the picture.
   }


   const handleDelete=async()=>{
    var body={vehicleid:vehicleID,oldicon:oldIcon}
    var response=await postData('vehicle/delete_data',body)
    if(response.status)
    {
    Swal.fire({
        icon: "success",
        title: "Done",
        text: "Vehicle deleted  successfully",
        
      });
    }
    else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            });
    }
    setOpen(false)      //inside setOpen fn false is for closing after clicking discard button in dialog.
    fetchAllVehicle()   //for  automatically refreshing the page just after updating the picture.
   }





   const showHidePictureButtons=()=>{
    return(<div>
          {buttonStatus.upload?<><Button fullWidth
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              >Upload 
        
              <VisuallyHiddenInput onChange={handlePicture} type="file" />
              </Button></>:<><Button onClick={handleSavePicture} color="primary">Save</Button><Button onClick={handleDiscard}  color="secondary">Discard</Button></>}
    </div>)
   }

   const handleFuelTypeChange=(event)=>{
    setFueltype(event.target.value)
  }
  const handleRatingsChange=(event)=>{
    setRatings(event.target.value)
  }
  const handleStatusChange=(event)=>{
    setStatus(event.target.value)
  }




    function displayVehicle() {
        return (
          <MaterialTable
            title="List of Vehicles"
            columns={[
              { title: 'Vehicle', field: 'vehicleid', render:(rowData=><div>{rowData.vehicleid}/{rowData.vendorid}<br/>{rowData.status}</div>)},
              { title: 'Company', render:(rowData)=><div>{rowData.companyid}<br/>{rowData.modelid}/{rowData.capacity}</div>},
              { title: 'Category', field:'categoryid', render:(rowData)=><div>{rowData.categoryid}<br/>{rowData.subcategoryid}</div>},
              { title: 'Registrationno', render:(rowData)=><div>{rowData.registrationno}/{rowData.color}<br/>{rowData.fueltype}/{rowData.average}</div> },
              { title: 'Ratings', field: 'ratings' },
              { title: 'Remarks', field: 'remarks' },
              { title: 'Feature', field: 'feature' },
              { title: 'Icon', field: 'icon', render:(rowData)=><Avatar src={`${ServerURL}/images/${rowData.icon}`} style={{width:50,height:40}} variant="rounded" />},
            ]}
            data={vehicle}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Vehicle',
                onClick: (event, rowData) => handleSetDataForDialog(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add Vehicle',
                isFreeAction: true,
                onClick: (event) => navigate('/dashboard/vehicle')
              }
            ]}
          />
        )
      }

      const handleClose=()=>{
        setOpen(false)
      }


      const handlePicture=(event)=>{
        setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setButtonStatus(true)
      }

      const showDialog=()=>{
        return(
          <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       
        <DialogContent>
        
        <div className={classes.box}>
        <Grid container spacing={2}>
        <Grid item xs={12} className={classes.headingStyle}>
                Vehicle Interface

            </Grid>
            <Grid item xs={3}>
            <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                           id="demo-simple-select"
                           value={categoryID}
                           label="Select Category"
                           onChange={handleChange}
                          >
                            {fillCategoryDropDown()}
                        </Select>
                      </FormControl>
            </Grid>
            <Grid item xs={3}>
            <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Select SubCategory</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                           id="demo-simple-select"
                           value={subcategoryID}
                           label="Select SubCategory"
                           onChange={handleSubCategoryChange}
                          >
                            {fillSubCategoryDropDown()}
                        </Select>
                      </FormControl>
            </Grid>
             
            <Grid item xs={3}>
            <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Select Company</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                           id="demo-simple-select"
                           value={companyID}
                           label="Select Company"
                           onChange={handleCompanyChange}
                          >
                            {fillCompanyDropDown()}
                        </Select>
                      </FormControl>
            </Grid>

            <Grid item xs={3}>
            <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Select Model</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                           id="demo-simple-select"
                           value={modelID}
                           label="Select Model"
                           onChange={handleModelChange}
                          >
                            {fillModelDropDown()}
                        </Select>
                      </FormControl>
            </Grid>
            
            <Grid item xs={3}>
               <TextField value={vendorid} onChange={(event)=>setVendorId(event.target.value)}  label="Vendor Id" fullWidth/>
            </Grid>
            <Grid item xs={3}>
               <TextField value={registrationno} onChange={(event)=>setRegistrationNo(event.target.value)}  label="RegistrationNo" fullWidth/>
            </Grid>
            <Grid item xs={3}>
               <TextField value={color} onChange={(event)=>setColor(event.target.value)}  label="Color" fullWidth/>
            </Grid>
            <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Fueltype</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={fueltype}
                label="Select Fueltype"
                onChange={handleFuelTypeChange}
              >
              <MenuItem value="Petrol">Petrol</MenuItem>
              <MenuItem value="Diesel">Diesel</MenuItem>
              <MenuItem value="CNG">CNG</MenuItem>
              </Select>
            </FormControl>
            </Grid>

            <Grid item xs={3}>
          <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Ratings
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ratings}
                label="Select Ratings"
                onChange={handleRatingsChange}
              >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem><MenuItem value={4}>4</MenuItem><MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
          </Grid>


            <Grid item xs={3}>
               <TextField value={average} onChange={(event)=>setAverage(event.target.value)}  label="Average" fullWidth/>
            </Grid>
            <Grid item xs={3}>
               <TextField value={remarks} onChange={(event)=>setRemarks(event.target.value)}  label="Remarks" fullWidth/>
            </Grid>
            <Grid item xs={3}>
               <TextField value={capacity} onChange={(event)=>setCapacity(event.target.value)}  label="Capacity" fullWidth/>
            </Grid>

            <Grid item xs={6}>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Status
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={status}
                onChange={handleStatusChange}
              >
                <FormControlLabel
                  value="continue"
                  control={<Radio />}
                  label="Continue"
                />
                <FormControlLabel
                  value="discontinue"
                  control={<Radio />}
                  label="Discontinue"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

            <Grid item xs={6}>
               <TextField value={feature} onChange={(event)=>setFeature(event.target.value)}  label="Feature" fullWidth/>
            </Grid>

            <Grid item xs={6}>
            {showHidePictureButtons()}
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
                <Button onClick={handleEditData} variant="contained" fullWidth>
                    Edit Data
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={handleDelete} variant="contained" fullWidth>
                    Delete
                </Button>
            </Grid>


        </Grid>
        </div>
    
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </div>
        )
      }

    return( 
        <div className={classes.dialogContainer}>
          <div className={classes.dialogBox}>

           {displayVehicle()}
           </div>
           {showDialog()}
        </div>
    )

}