import EventModel from "../model/eventModel";
import {isAuthenticated,limitRequestFromTheUser} from "../controller/authController.js";



const eventsRoutes = (pathStr,app,admin) => {
   app.route(`${pathStr}/events`)
   .get(isAuthenticated, async (req, res, next) => {
    
        const date = new Date (req.query.date);
        try{
            const events = await EventModel.find({date}).sort({time:"asc"}).exec();
            res.status(200).json(events);
        } 
        catch(error)
            {
                res.status(500);
                console.log(error);
                next(error);      
            }
       
   })
   .post(isAuthenticated,limitRequestFromTheUser, async (req, res,next) => {
     const {teacherId,task,taskTitle,time} = req.body;
     const date = new Date(req.body.date);
     const db = admin.firestore();
     

     try{
        const userRef = await db.collection("users").doc(teacherId)
        const userDoc = await userRef.get();
        const {displayName, role} = userDoc.data(); 
        if(task.length <= 20 || taskTitle <= 5)
        {
            throw new Error("Invalid request data"); 
        }
        if(role !== "teacher")
        {
            throw new Error("You are unauthorized to make this request"); 
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
         res.status(500);
         delete global.teacherPostingTask[teacherId];
         next(error);      
     }
   });
}


export default eventsRoutes;

/*(async () => {
    await EventModel.deleteMany({});
})();*/