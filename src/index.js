import express from 'express';
import cors from 'cors';
import router from './routes/userRouter.js';
import { DBConnect } from './dbConfig/dbConfig.js';
import { CLIENT_URL, PROD_URL } from './constants.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import {dbInit} from './dbConfig/dbInit.js';
import resetDatabase from './dbConfig/resetDatabase.js';

// Define __dirname for ES modules

(async () => {
  // await resetDatabase()
  await dbInit()
  await DBConnect()
}
)()

const app = express();

const corsOptions = {
    origin: ['http://crm.tomatotrails.com', 'http://91.205.105.35:63193','http://91.205.105.35:5001', "http://localhost:3000"] ,  // Allow only this origin
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['content-Type', 'Authorization', 'credentials'],
    credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", router);

app.set('view engine', 'ejs');
app.set('views', path.resolve('../public/temp'));

const __dirname = path.resolve();

// Serve frontend build files in production
if (process.env.ENVIRONMENT === 'PRODUCTION') {
  // Serve static files from the frontend build directory
  app.use(express.static(path.join(__dirname, 'build')));
  // All unknown routes should serve the frontend's index.html file
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  );
} else {
  // For development, just respond with a simple message
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
