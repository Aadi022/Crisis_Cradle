const jwt= require("jsonwebtoken");
const access_secret= process.env.JWTSECRET_ACCESS;
const refresh_secret= process.env.JWTSECRET_REFRESH;

const access_exp= '60m';  //The access token expires in 60 minutes
const refresh_exp= '7d';  //The refresh token expires in 7 days

//function to generate access token
function generateAccessToken(username){   //signing the jwt token using the username
    const token= jwt.sign({username: username},access_secret,{expiresIn: access_exp});
    return token;
}

//function to generate refresh token
function generateRefreshToken(username){
    const token= jwt.sign({username:username},refresh_secret,{expiresIn: refresh_exp});
    return token;
}

module.exports={
    genaccess: generateAccessToken,
    genrefresh: generateRefreshToken
}
