import { useEffect, useState } from "react";
import { Grid, TextField, Button, Avatar, styled } from "@mui/material";
import { useStyles } from "./VehicleCss";
import Swal from "sweetalert2";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ServerURL, postData, getData } from "../../Services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
import ListAltIcon from '@mui/icons-material/ListAlt';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function Vehicle(props) {
  const classes = useStyles();
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  var navigate=useNavigate()

  var [icon, setIcon] = useState({
    filename: "/assets/defaultcar.png",
    bytes: "",
  });
  var [categoryId, setCategoryId] = useState("");
  var [subCategoryId, setSubCategoryId] = useState("");
  var [companyId, setCompanyId] = useState("");
  var [modelId, setModelId] = useState("");
  var [vendorId, setVendorId] = useState("");
  var [registrationNo, setRegistrationNo] = useState("");
  var [color, setColor] = useState("");
  var [fueltype, setFueltype] = useState("");
  var [ratings, setRatings] = useState("");
  var [average, setAverage] = useState("");
  var [remarks, setRemarks] = useState("");
  var [capacity, setCapacity] = useState("");
  var [status, setStatus] = useState("");
  var [feature, setFeature] = useState("");
  var [categoryList, setCategoryList] = useState([]);
  var [subCategoryList, setSubCategoryList] = useState([]);
  var [companyList, setCompanyList] = useState([]);
  var [modelList, setModelList] = useState([]);

  const fetchAllCategory = async () => {
    var result = await getData("category/display_all_category");
    setCategoryList(result.data);
  };
  useEffect(function () {
    //useEffect is for page rendering or state change
    //jb hm program run krte h toh sbse phle useEffect sbse phle call hota h
    fetchAllCategory();
  }, []);

  const fillCategoryDropDown = () => {
    return categoryList.map((item) => {
      //categoryList.map  array bnake dega or array json me hoga.
      return (
        //ye wla return is for jo new array return hoke ayga
        <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
      );
    });
  };

  const fetchAllSubcategoryByCategory = async (category_id) => {
    var body = { categoryid: category_id };
    var response = await postData(
      "subcategory/fetch_all_subcategory_by_category",
      body
    );
    setSubCategoryList(response.result);
  };

  const fillSubCategoryDropDown = () => {
    return subCategoryList.map((item) => {
      return (
        <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      );
    });
  };

  const fetchAllCompanyBySubCategory = async (subcategory_id) => {
    var body = { subcategoryid: subcategory_id };
    var response = await postData(
      "company/fetch_all_company_by_subcategory",
      body
    );
    setCompanyList(response.results);
  };
  const fillCompanyDropDown = () => {
    return companyList.map((item) => {
      return <MenuItem value={item.companyid}>{item.companyname}</MenuItem>;
    });
  };

  const fetchAllModelByCompany = async (company_id) => {
    var body = { companyid: company_id };
    var response = await postData("model/fetch_all_model_by_company", body);
    setModelList(response.results1);
  };
  const fillModelDropDown = () => {
    return modelList.map((item) => {
      return <MenuItem value={item.modelid}>{item.modelname}</MenuItem>;
    });
  };

  const handleChange = (event) => {
    setCategoryId(event.target.value);
    fetchAllSubcategoryByCategory(event.target.value);
  };

  const handleSubCategoryChange = (event) => {
    setSubCategoryId(event.target.value);
    fetchAllCompanyBySubCategory(event.target.value);
  };

  const handleCompanyChange = (event) => {
    setCompanyId(event.target.value);
    fetchAllModelByCompany(event.target.value);
  };
  const handleModelChange = (event) => {
    setModelId(event.target.value);
  };
  const handleFuelTypeChange=(event)=>{
    setFueltype(event.target.value)
  }
  const handleRatingsChange=(event)=>{
    setRatings(event.target.value)
  }
  const handleStatusChange=(event)=>{
    setStatus(event.target.value)
  }
  
  const handleShowVehicleList=()=>{
    navigate('/dashboard/Displayallvehicle')
   }

  const handlePicture = (event) => {
    setIcon({
      filename: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };
  //cretateobjectURL - ye local folder se image ka actual path deta h.
  //event.target.files - jo file choose ki h uska address/poori info provide krega.
  //cretateobjectURL files[0] me se path utha lega.

  const handleSubmit = async () => {
    var formData = new FormData();
    formData.append("categoryid", categoryId);
    formData.append("subcategoryid", subCategoryId);
    formData.append("companyid", companyId);
    formData.append("modelid", modelId);
    formData.append("vendorid", vendorId);
    formData.append("registrationno", registrationNo);
    formData.append("color", color);
    formData.append("fueltype", fueltype);
    formData.append("ratings", ratings);
    formData.append("average", average);
    formData.append("remarks", remarks);
    formData.append("capacity", capacity);
    formData.append("status", status);
    formData.append("feature", feature);
    formData.append("icon", icon.bytes);
    var response = await postData("vehicle/vehiclesubmit", formData); //from this line it will jump to the const postData in FetchNodeServices.js file
    if (response.status) {
      Swal.fire({
        icon: "success",
        title: "Done",
        text: "Vehicle submitted successfully",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const clearValues = () => {
    setCategoryId("");
    setSubCategoryId("");
    setCompanyId("");
    setModelId("");
    setVendorId("");
    setRegistrationNo("");
    setColor("");
    setFueltype("");
    setRatings("");
    setAverage("");
    setRemarks("");
    setCapacity("");
    setStatus("");
    setFeature("");
    setIcon({ filename: "/assets/defaultcar.png", bytes: "" });
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.box}>
        <Grid container spacing={2}>
        <Grid item xs={12} className={classes.headingStyle}>
            <div className={classes.center}>
                <ListAltIcon onClick={handleShowVehicleList} />
                    
                <div style={{marginLeft:5}}>
                 Vehicle Interface
                </div>
                </div>

            </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Category
              </InputLabel>
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

          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select SubCategory
              </InputLabel>
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

          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Company
              </InputLabel>
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

          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Model
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={modelId}
                label="Model"
                onChange={handleModelChange}
              >
                {fillModelDropDown()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <TextField
              onChange={(event) => setVendorId(event.target.value)}
              label="Vendo Id"
              fullWidth
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              onChange={(event) => setRegistrationNo(event.target.value)}
              label="Registration No"
              fullWidth
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              onChange={(event) => setColor(event.target.value)}
              label="Color"
              fullWidth
            />
          </Grid>

          <Grid item xs={3}>
          <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Fueltype
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={fueltype}
                label="Fueltype"
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
                label="Ratings"
                onChange={handleRatingsChange}
              >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem><MenuItem value={4}>4</MenuItem><MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <TextField
              onChange={(event) => setAverage(event.target.value)}
              label="Select Average"
              fullWidth
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              onChange={(event) => setRemarks(event.target.value)}
              label="Remarks"
              fullWidth
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              onChange={(event) => setCapacity(event.target.value)}
              label="Capacity"
              fullWidth
            />
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
            <TextField
              onChange={(event) => setFeature(event.target.value)}
              label="Feature"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <Button
              fullWidth
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload
              <VisuallyHiddenInput type="file" onChange={handlePicture} />
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
    </div>
  );
}
