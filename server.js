import express from "express"; 
import cors from "cors";
import bodyParser from "body-parser"; 
import path from "path";
import dotEnv from "dotenv";
import mongoose from "mongoose";
import eventsRoutes from "./routes/eventsRoutes.js";
import authRoutes from "./routes/authRoutes.js";



if(process.env.NODE_ENV !== "production")
    {
        dotEnv.config(); 
    }




const app = express(); 
const port = process.env.PORT || 5000; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended":true}));
app.use(cors());


/*EXPRESS ROUTES */
authRoutes("/api/auth", app)
eventsRoutes("/api/", app);


/*PRODUCTION CONFIG*/

if(process.env.NODE_ENV ==="production")
    {   
        app.use(express.static(path.join(__dirname, "client/build")));

       app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, "client/build" , "index.html"));
        });
    }

/*STARTING APP*/    
app.listen(port , err => {
    if(err)
        {
            throw err; 
        }
     console.log("server running on port ", + port);     
});  

/*MONGOOSE CONFIG*/
(async () => {
    try {
    await mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true, dbName: "snatchkart-db"});
    const db = mongoose.connection; 
    db.on("error", err => {
        throw error; 
    });
    }
    catch(error)
        {
            console.log("MONGODB ERROR: ",error);
        }
})();









