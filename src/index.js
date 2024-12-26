import express from 'express';
import cors from 'cors';
import router from './routes/userRouter.js';
import { DBConnect } from './dbConfig/dbConfig.js';



DBConnect();
const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };

app.use(express.json());
app.use("/api/users", router);

app.use(cors(corsOptions));

app.get('/api', (req, res) => {
    res.send('Server is running');
    console.log('Server is running');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});