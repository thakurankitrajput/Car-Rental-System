import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { getData, postData, ServerURL } from "../../Services/FetchNodeServices";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function Header(props) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const fetchAllSubCategory=async(cid)=>{
   var body={categoryid:cid}
   var response=await postData("user/fetch_all_subcategory_by_category",body)
   setSubCategories(response.result)
  }

  const handleClick = (event) => {
    fetchAllSubCategory(event.currentTarget.value);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchAllCategory = async () => {
    var response = await getData("user/display_all_category");
    setCategories(response.data);
  };
  const showMainMenu = () => {
    return categories.map((item) => {
      return <Button value={item.categoryid} onClick={handleClick}>{item.categoryname}</Button>;
    });
  };
  const showSubMenu = () => {
    return subCategories.map((item) => {
      return <Button value={item.subcategoryid} onClick={handleClick}>{item.subcategoryname}</Button>;
    });
  };

  useEffect(function () {
    fetchAllCategory()
  },[]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <img src="/assets/Logo1.png" alt="" style={{ width: 70 }} />

          <Box component="div" sx={{ flexGrow: 1 }}></Box>
          <Box>
            {showMainMenu()}
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {showSubMenu()}
            </Menu>
          </Box>

          <Button color="inherit">Login/SignUp</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
