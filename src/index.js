import express from 'express';
import cors from 'cors';
import router from './routes/userRouter.js';
import { DBConnect } from './dbConfig/dbConfig.js';
import { CLIENT_URL } from './constants.js';
import cookieParser from 'cookie-parser';
import path from 'path';
// import dbInit from './dbConfig/dbInit.js';
import resetDatabase from './dbConfig/resetDatabase.js';

// Define __dirname for ES modules

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

const __dirname = path.resolve();

// Serve frontend build files in production
if (process.env.ENVIRONMENT === 'PRODUCTION') {
  // Serve static files from the frontend build directory
  app.use(express.static(path.join(__dirname, 'frontend')));
  // All unknown routes should serve the frontend's index.html file
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'))
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
