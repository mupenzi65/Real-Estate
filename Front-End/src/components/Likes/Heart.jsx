import React, { useContext, useEffect, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import useAuthCheck from '../../hooks/useAuthCheck'
import { useMutation } from 'react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { checkFavourites, updateFavourites } from '../../utils/common'
import { toFav } from '../../utils/api'
import UserDetailContext from '../../context/UserContext'

const Heart = ({id}) => {
    const [heartColor,setHeartColor]=useState("white")
    const {validateLogin}=useAuthCheck()
    const {
        userDetails: { favourites },
        setUserDetails,
      } = useContext(UserDetailContext);

    useEffect(()=>{
        setHeartColor(()=>checkFavourites(id,favourites))
    },[favourites])


    const{user}=useAuth0()
  
    const{mutate}=useMutation({
        mutationFn:()=>toFav(id,user?.email),
        onSuccess:()=>{
            
            setUserDetails((prev)=>({
                ...prev,favourites:updateFavourites(id,prev.favourites)
            }))
           
        }
    })

 




    const handleLike=()=>{
        if(validateLogin()){
            mutate()
           
        }

    }

  return (
    <AiFillHeart size={24} color={heartColor} onClick={(e)=> {
        e.stopPropagation()
         handleLike()
        }} />
  )
}

export default Heart