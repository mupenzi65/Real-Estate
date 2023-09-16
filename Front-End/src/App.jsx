import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Website from "./pages/Website";
import Layout from "./components/layout/Layout";
import Properties from "./pages/properties/Properties";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools} from 'react-query/devtools'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Property from "./pages/property/Property";
import { useState } from "react";
import UserDetailContext from "./context/UserContext";
import Bookings from "./components/Bookings/Bookings";
import Favourites from "./components/Favourite/Favourite";


function App() {
  const queryClient=new QueryClient()
  const [userDetails,setUserDetails]=useState({
    favourites:[],
    bookings:[],
    email:null,

  })
  return (
    <UserDetailContext.Provider value={{userDetails,setUserDetails}}>

    
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>
      
        < Route element={<Layout />}>
        < Route path="/" element={<Website />} />
        <Route path='/properties' >
          <Route index element={<Properties />}/>
          <Route path=':propertId' element={<Property />}/>
        </Route>
        <Route path="/bookings" element={<Bookings />}/>
        <Route path="/favourites" element={<Favourites />}/>
      </Route>
     
     
    </Routes>
    </BrowserRouter>
    <ToastContainer />
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </UserDetailContext.Provider>
  
  )
}

export default App;
