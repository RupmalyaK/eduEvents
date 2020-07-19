import INITIAL_SHOP_DATA from "./data/INITIAL_SHOP_DATA.js";
import axios from "axios";
export const toMongoDB = async () => {
    const collections = {...INITIAL_SHOP_DATA}; 
    try{
      Object.keys(collections).forEach(async (key) => {
          const collection = collections[key];
          const {title, routeName} = collection; 
           await axios({
            url:"/api/collections/collection",
            method:"post",
            data:{
                  title,
                  routeName
                }
        });
    
        collection.items.forEach(async (item) => {
          const {name , imageUrl:primaryImageUrl , price} = item;
          const isFeatured = Math.random() >= 0.4; 
          const offers = {
            isOneDayDelivery:Math.random() >= 0.5, 
            isZeroEmi:Math.random() >= 0.5, 
            isFreeShipping:Math.random() >= 0.5, 
            isSameDayDelivery:Math.random() >= 0.5, 
            isTwoDaysDelivery:Math.random() >= 0.5, 
          };
          const sizes = []; 
          if(title === "Hats")
            {
              sizes.push("Kids","Adults");
            }
         else if(title === "Sneakers") 
            {
               const num = Math.random() * 10;
               for(let i =5; i <= num+4; i++)
                {
                  sizes.push(i);
                }
            }
          else
            {
              if(Math.random() >= 0.5)
                {
                  sizes.push('XS');
                }
              if(Math.random() >= 0.5)
                {
                  sizes.push('S');
                }
                if(Math.random() >= 0.5)
                {
                  sizes.push('X');
                } 
                if(Math.random() >= 0.5)
                {
                  sizes.push('XL');
                } 
                if(Math.random() >= 0.5)
                {
                  sizes.push('XLL');
                }    
            }  
           await axios({
            url:"/api/collections/collection/items/",
            method:"post",
            data:{
                  collectionTitle:title, 
                  name,
                  primaryImageUrl,
                  price,
                  isFeatured,
                  offers,
                  sizes,
                  sellerId:"ncchs7JxOVZyA5K7ZSzFR8pXxkq1",

                },   
             });
          
          });  
      });
      }
    catch(error)
      {
        console.log({error});
      }  
  }

export const collectionsArrToObj = (collectionsArr) => {
  
    const newObj = {};
    collectionsArr.forEach(collection => {
        const {title , ...rest} = collection; 
        newObj[title] = {rest}
    });
    return newObj; 
}