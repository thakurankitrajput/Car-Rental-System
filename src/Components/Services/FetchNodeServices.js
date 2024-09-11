import axios from "axios"
const ServerURL="http://localhost:5000"

const getData=async(url)=>{                    //get is used to  retrieve the data.
 try{
  var response=await fetch(`${ServerURL}/${url}`)
  var result=await response.json()
  return (result)
  }
  catch(e){
   return(null)
   }
}

const postData=async(url,body)=>{                // jb hme picture upload krenge tb post use krenge
    try{
    
    var response=await axios.post(`${ServerURL}/${url}`,body)    
    var result=await response.data
    return (result)
    }
    catch (error)
    {console.log(error)
    return (false)
    }
}    
    
export {ServerURL,postData,getData}