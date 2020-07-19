import express from "express"; 
import cors from "cors";
import bodyParser from "body-parser"; 
import path from "path";
import Stripe from "stripe";
import dotEnv from "dotenv";
import mongoose from "mongoose";
import fireBaseCred from "./fb_keys.json";
;
import admin from "firebase-admin";
import eventsRoutes from "./routes/eventsRoutes.js";



if(process.env.NODE_ENV !== "production")
    {
        dotEnv.config(); 
    }

//initializing firebase 
admin.initializeApp({
    credential: admin.credential.cert(fireBaseCred),
    databaseURL: "https://react-rupkart-d6edf.firebaseio.com"
    });




const app = express(); 
const port = process.env.PORT || 5000; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended":true}));
app.use(cors());


/*EXPRESS ROUTES */
eventsRoutes("/api", app, admin);

/*STRIPE CONFIG*/
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const test = app.post("/api/payment" , (req, res) => { 
    const {token,amount,description} = req.body; 
    const body = {
        source:token.id,
        amount:amount,
        description:description,
        currency:"usd",
    }

    stripe.charges.create(body, (err , result) => {
        if (err)
            {
                res.status(500).send({"error":err});
                return;
            }
            res.status(200).send({"res":result}); 
    });
});

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









