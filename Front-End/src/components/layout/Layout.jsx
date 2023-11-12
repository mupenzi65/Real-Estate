import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Website from "../../pages/Website";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserContext";
import { useMutation } from "react-query";
import { createUser } from "../../utils/api";
import jwt_decode from "jwt-decode";
import useFavourites from "../../hooks/useFavourites";
import useBookings from "../../hooks/useBookings";

const Layout = () => {
  useFavourites()
  useBookings()
  const { isAuthenticated, user,getAccessTokenSilently } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: () => createUser(user?.email),
    onSettled:()=>setUserDetails((prev)=>({...prev,email:user.email}))
  });

  useEffect(() => {
    // const getTokenAndRegister=async ()=>{
    //    const res=await getAccessTokenSilently();
    
    //    localStorage.setItem("access_token",res);
    //    
    //    const decoded = jwt_decode(res)
    //    console.log(decoded)
    //  }







    isAuthenticated && mutate();
  }, [isAuthenticated]);
  
  return (
    <>
      <div style={{ background: "var(--fuchsia)", overflow: "hidden" }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
