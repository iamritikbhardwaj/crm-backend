import express from 'express';
import cors from 'cors';
import router from './routes/userRouter.js';
import { DBConnect } from './dbConfig/dbConfig.js';
import { CLIENT_URL } from './constants.js';

DBConnect();
const app = express();

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

const corsOptions = {
    origin: CLIENT_URL,  // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
