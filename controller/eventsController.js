

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

