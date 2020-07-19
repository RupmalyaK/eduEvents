 global.usersReviewing = {

};



export const calculateAverageRating = (reviews) => {
    if(reviews.length <= 2)
        {
            return 0; 
        }
 const total = reviews.reduce((sum,review) => {
    return sum + review.rating;
 }, 0);
 return Math.round(total / reviews.length * 10) / 10; 
}

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