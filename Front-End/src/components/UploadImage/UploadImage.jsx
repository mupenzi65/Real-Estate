import React, { useEffect, useRef, useState } from 'react'
import {AiOutlineCloudUpload } from 'react-icons/ai'
import './Upload.css'
import { Button, Group } from '@mantine/core'
const UploadImage = ({propertyDetails,setPropertyDetails,nextStep,prevStep}) => {
    const [imageURL,setImageURL]=useState(propertyDetails.image)
    const cloudinaryRef=useRef();
    const widgetRef=useRef();
    const handleNext=()=>{
        setPropertyDetails((prev)=>({...prev,image:imageURL}));
        console.log('first')
        nextStep();

     }

    useEffect(()=>{
        cloudinaryRef.current=window.cloudinary;
        widgetRef.current=cloudinaryRef.current.createUploadWidget({
            cloudName:"ddkwz7odf",
            uploadPreset:'y8naxvg3',
            maxFiles:1,

        },
        (err,result)=>{
            if(result.event === 'success'){
                setImageURL(result.info.secure_url)
            }
        }


        )
    },[])

    

  return (
    <div className="flexColCenter uploadWrapper">
        {!imageURL ?(
            <div className="flexColCenter uploadZone "
            onClick={()=>widgetRef.current?.open()}>
                <AiOutlineCloudUpload />
                <span>Upload Image</span>
            </div>
        ):(
            <div className="uploadImage">
                <img src={imageURL} alt="" />
            </div>
        )
        }
         <Group position='center' mt={'xl'}>
            <Button onClick={prevStep} variant='default'>Back</Button>
            <Button onClick={handleNext} disabled={!imageURL}>Next Step</Button>
        </Group>

    </div>
  )
}

export default UploadImage