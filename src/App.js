import AdminLogin from "./Components/Administrator/Administrator/AdminLogin"
import Dashboard from "./Components/Administrator/Administrator/Dashboard";
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Home from "./Components/UserInterface/Home";
import VehicleDetails from "./Components/UserInterface/VehicleDetails";
import ToggleColorMode from './Components/UserInterface/MyComponents/ToggleColorMode';
function App() {
  return (     // * represents what we have open inside dashboard
    <div>   
      <Router>
        <Routes>
          <Route element={<VehicleDetails/>} path="/vehicledetails" />  
          <Route element={<Home/>} path="/home" />    
          <Route element={<AdminLogin/>} path="/adminlogin" />
          <Route element={<Dashboard/>} path="/dashboard/*" />   
          <Route element={<ToggleColorMode/>} path="/toggle" />
         </Routes>
      </Router>
    </div>   
  );
}

export default App;
