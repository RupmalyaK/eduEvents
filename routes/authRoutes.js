import UserModel from "../model/UserModel";
import bcrypt from "bcrypt";
import {isAuthenticated,limitRequestFromTheUser, signUpValidationMiddlewaresArr} from "../controller/authController.js";
import jwt from "jsonwebtoken";
import {validationResult} from "express-validator";


const authRoutes = (pathStr,app) => {
   app.route(`${pathStr}/signup`)
   .get(async (req, res) => {
       const users = await UserModel.find({});
       res.status(200).json(users);
   })

   .post(signUpValidationMiddlewaresArr,async (req, res, next) => {
        const {email, password, displayName, role} = req.body;
        console.log("HELLO");
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        try{
            const user = await UserModel.findOne({email});
            if(user)
                {
                    throw new Error("User already exist with that username");
                    return;
                }
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = await UserModel.create({email,password:hashPassword,displayName,role});
            const accessToken = jwt.sign({ email,password },  process.env.JWT_SECRET, {
                expiresIn: "365d"
            });
            const doc = newUser._doc;
            doc.accessToken = accessToken;
            delete doc.password;
            res.status(200).json(doc);    
           }
        catch(error)
            {
                res.status(500);
                res.error = error;
                next();   
            }
   });

   app.route(`${pathStr}/signin`)
   .post(async(req, res, next) => {
        const {email , password} = req.body;
        try{
            const user = await UserModel.findOne({email});
            if(!user)
                {
                    throw "User with that email does not exist";
                }
           const isPasswordRight = await bcrypt.compare(password, user.password);
           if(!isPasswordRight)
            {
                throw "Wrong password";
            }     
            const doc = user._doc;
            const accessToken = await jwt.sign({ email,password},  process.env.JWT_SECRET,  {
                expiresIn: "365d"
            });
            doc.accessToken = accessToken;
            delete doc.password;
            res.status(200).json(doc);
        }
        catch(error)
            {
                res.status(500);
                res.errors = error;
                next();   
             
            }
   });
}



export default authRoutes;

/*(async () => {
    await UserModel.deleteMany({});
})();*/