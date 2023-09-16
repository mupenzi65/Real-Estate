const express=require('express')
const {createResidency,getAllResidencies,getResidency}=require('../controllers/residencyCntr')
const router=express.Router()

router.post('/register',createResidency)
router.get('/allresd',getAllResidencies)
router.get('/:id',getResidency)
module.exports=router