import admin from "firebase-admin"; 

global.usersRequesting = {

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

  export const isAuthenticated = (req, res, next) => {
    getAuthToken(req, res, async () => {
       try {
         const { authToken } = req;
         if(authToken === null)
          {
            notAuthorizedErrorThrow(res);
            return;
          }
         const userInfo = await admin
           .auth()
           .verifyIdToken(authToken);
         req.authId = userInfo.uid;
         return next();
       } catch (e) { 
        console.log(e);
        notAuthorizedErrorThrow(res);
        return;
       }
     });
   };

   export const checkIfAdmin = (req, res, next) => {
    getAuthToken(req, res, async () => {
       try {
         const { authToken } = req;
         const userInfo = await admin
           .auth()
           .verifyIdToken(authToken);
   
         if (userInfo.admin === true) {
           req.authId = userInfo.uid;
           return next();
         }
   
         throw new Error('unauthorized')
       } catch (e) {
         return res
           .status(401)
           .send({ error: 'You are not authorized to make this request' });
       }
     });
   };

   export const limitRequestFromTheUser = (req,res,next) => {
    const {userObjectId} = req.body; 
    if(!usersReviewing[userObjectId]) 
        {
            usersReviewing[userObjectId] = true;
            next();
        }
        else{
            res.status(400).send({error: "Previous request is still executing"});
            console.log("Previous request is still executing");
        }
    
  }