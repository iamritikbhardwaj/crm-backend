import express from 'express';
import cors from 'cors';
import router from './routes/userRouter.js';
import { DBConnect } from './dbConfig/dbConfig.js';
import { CLIENT_URL } from './constants.js';
import cookieParser from 'cookie-parser';
// import dbInit from './dbConfig/dbInit.js';
import resetDatabase from './dbConfig/resetDatabase.js';

// dbInit();
// resetDatabase();
DBConnect();


const app = express();
const corsOptions = {
    origin: CLIENT_URL,  // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials', 'credentials'],
    credentials: true
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());
app.use("/api/users", router);

app.get('/api', (req, res) => {
    res.send('Server is running');
    console.log('Server is running');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});


