import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
// import axios from "axios";
// axios.defaults.withCredentials=true;
// axios.defaults.baseURL = import.meta.env.VITE_CLIENT_URL;

// export const AppContext = createContext(null);

// AppContext.jsx
import axios from 'axios';

axios.defaults.withCredentials = true; // ✅ Add this here
axios.defaults.baseURL = import.meta.env.VITE_CLIENT_URL || "http://localhost:5000";

export const AppContext = createContext(null);

// ...rest of the AppContext code


const AppContextProvider = ({ children}) =>{
    const navigate = useNavigate();
    const [user,setUser] = useState(null);
    const [isSeller,setIsSeller] = useState(null);
    const [showUserLogin,setShowUserLogin] = useState(false);
    const [products,setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    console.log(cartItems)
    const [searchQuery, setSearchQuery] = useState({});
    //  const [cartItems, setCartItems] = useState({});

    //chek seller status
    const fetchSeller = async()=>{
        try {
            const {data} = await axios.get('http://localhost:5000/api/seller/is-auth')
            if(data.success){
                setIsSeller(true)
            }
            else{
                setIsSeller(false)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //check user stattus

    const fetchUser=async()=>{
        try {
            const {data} = await axios.get(`http://localhost:5000/api/user/is-auth`)
            if(data.success){
                setUser(data.user)
                setCartItems(data.user.cart)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //fetch all products data
    const fetchProducts = async()=>{
     try {
        const {data} = await axios.get('http://localhost:5000/api/product/list')

        if(data.success){
            setProducts(data.products)
            // console.log(data)
        }
        else{
            toast.error(data.message)
        }
     } catch (error) {
            toast.error(error.message)
        
     }
    }
    
   
    
    // product add to card
    const addToCard=(itemId)=>{
        let cardData=structuredClone(cartItems||{});
        if(cardData[itemId]){
            cardData[itemId]+=1;
        }else{
            cardData[itemId]=1;
        }
        setCartItems(cardData); 
        toast.success("added to card");
    };

    //update card item quality
    const updateCardItem=(itemId,quantity)=>{
        let cardData = structuredClone(cartItems);
        cardData[itemId] = quantity;
        setCartItems(cardData);
        toast.success("card updated")
    };

    // total card item
    const cardCount=()=>{
        let totalCount=0;
        for(const item in cartItems){
            totalCount+=cartItems[item];
        }
        return totalCount;
    };

    //total card amount
    const totalCardAmount=()=>{
        let totalAmount=0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=>product._id===items);
            if(cartItems[items]>0){
                totalAmount+=cartItems[items]*itemInfo.offerPrice;
            }
        }
        return Math.floor(totalAmount*100)/100;
    };

    //remove card item
    const removeFromCard = (itemId)=>{
        let cardData = structuredClone(cartItems);
        if(cardData[itemId]){
            cardData[itemId]-=1;
            if(cardData[itemId]===0){
                delete cardData[itemId];
            }
            toast.success("remove fron card");
            setCartItems(cardData);
    }
}   
 useEffect(()=>{
   const updateCart = async()=>{
    try {
        const {data} = await axios.post(`http://localhost:5000/api/cart/update`,{cartItems})
        if(!data.success){
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
   }
   if(user){
    updateCart()
   }
},[cartItems])

    useEffect(()=>{
        fetchProducts();
        fetchSeller();
        fetchUser();
    },[])
    const value = {
        navigate,
        user,
        setUser,
        isSeller,
        setIsSeller,
        showUserLogin,
        setShowUserLogin,
        products,
        addToCard,
        updateCardItem,
        cardCount,
        totalCardAmount,
        removeFromCard,
        cartItems,
        searchQuery,
        setSearchQuery,
        axios,
        fetchProducts,
        setCartItems,
        
    };
    return <AppContext.Provider value ={value}>{children}</AppContext.Provider>
};

export default AppContextProvider;


