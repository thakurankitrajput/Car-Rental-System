import Header from "./MyComponents/Header";
import SearchComponent from "./MyComponents/SearchComponent";
import FeaturedComponent from "./MyComponents/FeaturedComponent";
import OfferComponent from "./MyComponents/OfferComponent";
import { getData } from "../Services/FetchNodeServices";
import { useEffect, useState } from "react";
import WhyComponent from "./MyComponents/WhyComponent";

export default function Home(props){
    const [features,setFeatures]=useState([])
    const [offers,setOffers]=useState([])
    const [whypnp,setWhyPnp]=useState([])

    const getAllFeature=async()=>{
        var result=await getData('user/all_features')
      //console.log("RESSSSULTT:",result)
        setFeatures(result.data)
    }
    const getAllOffer=async()=>{
        var result=await getData('user/all_offers')
        setOffers(result.data)
    }
    const getAllWhypnp=async()=>{
        var result=await getData('user/all_whypnp')
        setWhyPnp(result.data)
    }
    useEffect(function(){
       getAllFeature()
       getAllOffer()
       getAllWhypnp()
    },[])



    return(
        <div style={{display:'flex',flexDirection:'column',background:'#dcdde1'}}>
            <Header/>
            <div>
                <SearchComponent/>    
            </div>
           <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
             <div style={{width:'90%'}}>
                 <FeaturedComponent title="Featured" images={features}/>
             </div>
             <div style={{width:'90%'}}>
                 <OfferComponent title="Offers" images={offers}/>
             </div>
             <div style={{width:'90%'}}>
                 <WhyComponent title="WhyPnp" images={whypnp}/>
             </div>
           </div>
           
        </div>
    )
}