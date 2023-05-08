const User = require('../models/UserModels');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const index = async (req, res, next)=>{
    try{
        const userList = await User.User.find();
        res.json({
            userList
        })
        
    } catch(err){
        res.json({
            message: `Error!${err}`
        })
    }
    
}

const UserRegister = async (req, res,next)=>{
    try{
        /* 
            -validation 
            -password hash
            -creating token
        */
        const {name, bio, email, phone, password} = req.body
        // create Dynamic secret key
        const JWT_SECRET = "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

       // Check User existence
       const check_email = await User.User.findOne({email})
       const check_phone = await User.User.findOne({phone})

        // if(check_email || check_phone){
        //     return res.status(409).send("User already exists! Please Login!")
        // }

        // Encrypting password
        const encryptedPassword = await bcrypt.hash(password, 10)

        // Getting user data
        const user = await User.User.create({
            name: name,
            bio: bio,
            email: email.toLowerCase(),
            phone: phone,
            password: encryptedPassword
        })

        // Creating User Token
        const token = jwt.sign(
            { user_id: user._id, email},
            JWT_SECRET,
            {
                expiresIn: "5h",
            }
        )
        user.token = token

        res.status(201).json(user)
    }catch(err){
        res.json({
            message: `Error! ${err}`
        })
    }
}
const LoginAuth = async (req, res, next) => {
    const {email, password} = req.body
    const JWT_SECRET = "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";
    // Validating the inputs
    if(!(email || password) ){
        res.status(400).json({message: "All inputs are required!"});
    }
    try{
        // validate if the user exists
        const user = await User.User.findOne({email})
        if(user){
            // Create Token
            const token = jwt.sign(
                {user_id: user._id, email},
                JWT_SECRET,
                {
                    expiresIn: "5h",
                }
            )
            user.token = token;
    
            // user
            return res.status(200).json(user)
        }
    }catch(err){
        return res.status(500).json({message: `Internal Server Error`})
    }
    return res.status(400).json({message: "No user exists, Please check your credentials!"})
}
const welcome = async (req, res)=>{
    console.log(req.body)
    res.status(200).json({"message": "Welcome Praveen"})
}
module.exports = {
    index, UserRegister, LoginAuth, welcome
}