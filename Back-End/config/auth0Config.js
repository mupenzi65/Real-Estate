const { auth } = require("express-oauth2-jwt-bearer");


const jwtCheck=auth({
    audience:"http://localhost:3500",
    issuerBaseURL:"https://real-estate21.us.auth0.com",
    tokenSigningAlg:"RS256"
})

module.exports=jwtCheck