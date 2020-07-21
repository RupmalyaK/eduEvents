import jwt from "jsonwebtoken";
import {check} from "express-validator";

global.teacherPostingTask = {

};




const notAuthorizedErrorThrow = (res) => {
  return res
           .status(401)
           .send({ error: 'You are not authorized to make this request' });
}

const getAuthToken = (req, res, next) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      req.authToken = req.headers.authorization.split(' ')[1];
    } else {
      req.authToken = null;
    }
    next();
  };

   export const isAuthenticated  = (req, res, next) => { 
     getAuthToken(req, res, async () => {
       try{
          const user = await jwt.verify(req.token, process.env.JWT_SECRET);
          req.user = user;
          next();
       }
       catch(error)
        {
          notAuthorizedErrorThrow(res);
        }
     });
   }

   export const signUpValidationMiddlewaresArr = [
    check("email").isEmail().withMessage("Must be a valid email address"),
    
    check("password")
    .isLength({ min: 5}).withMessage("Password must be at least 5 character long")
    .isLength({ max: 32}).withMessage("Password must be less than 32 characters long")
    .matches(/\d/).withMessage('password must contain at least a single digit')
    .matches(/[\W_]/).withMessage("password must contain at least a single special character"),

    check("displayName")
    .isLength({ min: 6}).withMessage("Display name must be at least 5 character long")
    .isLength({ max: 32}).withMessage("Display name must be less than 32 characters long"),

    check("role")
    .matches(/^teacher$|^student$/i).withMessage("Role must be either student or teacher")
 ]
 /*   const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
*/
   export const limitRequestFromTheUser = (req,res,next) => {
    const {teacherId} = req.body; 
    if(!usersReviewing[teacherId]) 
        {
          global.teacherPostingTask[teacherId] = true;
            next();
        }
        else{
            res.status(400).send({error: "Previous request is still executing"});
            console.log("Previous request is still executing");
        }
    
  }