import express from 'express';
import cors from 'cors';

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
};

const app = express();

app.use(cors(corsOptions));

app.get('/api', (req, res) => {
    res.send('Server is running');
    console.log('Server is running');
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});