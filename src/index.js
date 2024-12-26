import express from 'express';
import cors from 'cors';
import router from './routes/userRouter.js';
import { DBConnect } from './dbConfig/dbConfig.js';



DBConnect();
const app = express();


app.use(express.json());
app.use("/api/users", router);

app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
    allowedHeaders: '*', // Allowed headers
    credentials: true, // Allow cookies/credentials
  }));

app.get('/api', (req, res) => {
    res.send('Server is running');
    console.log('Server is running');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});