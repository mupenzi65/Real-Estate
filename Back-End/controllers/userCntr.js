const asyncHandler = require('express-async-handler')
const prisma = require('../config/prismaConfig')

const createUser = asyncHandler(async (req, res) => {
  let { email } = req.body
  const userExist = await prisma.user.findUnique({ where: { email: email } })
  if (!userExist) {
    const user = await prisma.user.create({ data: req.body })
    return res.send({ message: 'User registered successfull', user })
  }
  res.status(201).send({ message: 'User arleady exists' })
})

const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body
  const { id } = req.params

  try {

    const arleadyBooked = await prisma.user.findUnique({
      where: { email }, select: { bookedVisits: true }
    })
    if (arleadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res
        .status(400)
        .json({ msg: "This residency is already booked by you" })
    } else {
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: { push: { id, date } }
        }
      })
      res.send("Your visit is booked successfully")
    }

  } catch (err) {
    throw new Error(err.message)
  }
})


const getAllBookings=asyncHandler(async(req,res)=>{
  const {email}=req.body

  try{
    const bookings=await prisma.user.findUnique({
      where:{email},
      select:{bookedVisits:true}
    })
    res.status(200).send(bookings)

  }catch(err){
    throw new Error(err.message)
  }
})

// to cancel a booking

const cancelBooking=asyncHandler(async(req,res)=>{
  const {email}=req.body
  const {id}=req.params

  try{
    const user=await prisma.user.findUnique({
      where:{email:email},
      select:{bookedVisits:true}
    })

    const index=user.bookedVisits.findIndex((visit)=>visit.id===id)
    if(index===-1){
      res.status(404).json({msg:"Booking not found"})
    }else{
      user.bookedVisits.splice(index,1)
      await prisma.user.update({
        where:{email},
        data:{
          bookedVisits:user.bookedVisits
        }
      })
      res.send("Booking cancelled successfully")
    }
     
  }catch(err){
    throw new Error(err.message)
  }
})

// to add favorite residency of user
const toFav=asyncHandler(async(req,res)=>{
  const {email}=req.body
  const {rid}=req.params

  try{
    const user=await prisma.user.findUnique({
      where:{email}
    })
    if(user.favResidenciesId.includes(rid)){
      const updateUser=await prisma.user.update({
        where:{email},
        data:{
          favResidenciesId:{
            set:user.favResidenciesId.filter((id)=>id !==rid)
          }
        }
      })
      res.send({msg:"favorite removed successfully",user:updateUser})
    }else{
      const updateUser=await prisma.user.update({
        where:{email},
        data:{
          favResidenciesId:{
            push:rid
          }
        }
      })
      res.send({msg:"updated favorite",user:updateUser})
    }

  }catch(err){
    throw new Error(err.message)
  }
})

const allFav=asyncHandler(async(req,res)=>{
  const {email}=req.body
  try{
    const favResd=await prisma.user.findUnique({
      where:{email},
      select:{favResidenciesId:true}
    })
    res.status(200).send(favResd)
  }catch(err){
    throw new Error(err.message)
  }
})




module.exports = {
  createUser, bookVisit,getAllBookings,cancelBooking,toFav,allFav
}