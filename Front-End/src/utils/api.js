import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "http://localhost:3500/api",
});

export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/allresd", {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`, {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const createUser = async (email) => {
  try {
    await api.post(`/user/register`, { email });
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const bookVisit = async (date, propertyId, email) => {
  try {
    await api.post(`/user/bookVisit/${propertyId}`, {
      email,
      id: propertyId,
      date: dayjs(date).format("DD/MM/YYYY"),
    });
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const removeBooking=async(id,email)=>{
    try {
        await api.post(`/user/cancelBooking/${id}`,{email})
        
    } catch (error) {
        toast.error("Something went wrong")
        throw error
    }
}

export const toFav=async(id,email)=>{
  try {
    await api.post(`/user/favorite/${id}`,{email})
   
   
    
  } catch (error) {
    toast.error("Something went wrong")
    throw error
  }
}

export const getAllFav=async(email)=>{
  try {
    const res=await api.post('/user/allfavorite',{email})
    return res.data["favResidenciesId"]
  } catch (error) {
    toast.error("Something went wrong")
    throw error
  }
}

export const createResidency=async(data)=>{
  try {
    const res=await api.post('/residency/register',{data})
    
  } catch (error) {
    throw error
  }
}

export const getAllBookings=async(email)=>{
  try {
    const res=await api.post('/user/allBooking',{email})
    return res.data["bookedVisits"]
  } catch (error) {
    toast.error("Something went wrong")
    throw error
  }
}