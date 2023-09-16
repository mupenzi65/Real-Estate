const asyncHandler = require('express-async-handler')
const prisma = require('../config/prismaConfig')

const createResidency = asyncHandler(async (req, res) => {
    const { title, description, price, address, country, city, facilities, image, userEmail } = req.body.data
    try{
        const residency=await prisma.residency.create({
            data:{
                title, description, price, address, country, city, facilities, image, owner:{connect:{email:userEmail}}
            }
        })
        res.send({msg:"Residency created successfull",residency})

    }catch(err){
        if(err.code==="P2002"){
            throw new Error('A residency with address already there')
        }
        throw new Error(err.message); 

    }
})


const getAllResidencies=asyncHandler(async(req,res)=>{
    const residencies=await prisma.residency.findMany({
        orderBy:{
            createdAt:"desc"
        }
    });
    res.send(residencies)
})
// to get single residency
const getResidency=asyncHandler(async(req,res)=>{
    const {id}=req.params
    
    try{
    const residency=await prisma.residency.findUnique({where:{id}})
    res.send(residency)
    }catch(err){
        console.log(err.message)
    }
})












module.exports = {
    createResidency,getAllResidencies,getResidency
}