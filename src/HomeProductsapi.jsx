import axios from "axios";
export const HomeItems=async()=>{
    try{
        const res=await axios.get("https://dummyjson.com/products?limit=1000")
        return res.data.products
    }
    catch(error){
        console.log(error)
    }
}