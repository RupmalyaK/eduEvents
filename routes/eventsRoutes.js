import EventModel from "../model/EventModel";
import {isAuthenticated,limitRequestFromTheUser} from "../controller/authController.js";
import UserModel from "../model/UserModel";
import { errors } from "stripe";



const eventsRoutes = (pathStr,app,admin) => {
   app.route(pathStr)
   .get(isAuthenticated, async (req, res, next) => {
    
        const date = new Date (req.query.date);
        try{
            const events = await EventModel.find({date}).sort({time:"asc"}).exec();
            res.status(200).json(events);
        } 
        catch(error)
            {
                res.error = error;
                next();        
            }
       
   })
   .post(isAuthenticated,limitRequestFromTheUser, async (req, res,next) => {
     const {teacherId,task,taskTitle,time} = req.body;
     const date = new Date(req.body.date);
     try{
        const user = await UserModel.findById(teacherId);
        const {displayName, role} = user;
        const errorsArr = []; 

        if(taskTitle <= 5 || taskTitle <=24)
            {
                errorsArr.push("Title must be between 5 to 13 characters"); 
            }

        if(task.length <= 20)
        {
            errorsArr.push("Task must be between 10 to 120 characters"); 
        }
        
        if(role.toLowerCase() !== "teacher")
        {
            errorsArr.push("You are unauthorized to make this request"); 
        }
        if(errorsArr.length !== 0)
            {
                throw errorsArr;
            }

        await EventModel.create({
            teacherId,
            date,
            task,
            time,
            title:taskTitle,
            displayName,
        });
        const events = await EventModel.find({date}).sort({time:"asc"}).exec();
        res.status(200).json(events);
        delete global.teacherPostingTask[teacherId];
     }
     catch(error)
     {
         delete global.teacherPostingTask[teacherId];
         res.errors = error;
         next();   
           
     }
   });

   app.route(pathStr + "/all")
    .get(async (req,res) => {
        console.log(hello);
       const events = EventModel.find({});
       res.status(200).json(events);
   });
}


export default eventsRoutes;

/*(async () => {
    await EventModel.deleteMany({});
})();*/