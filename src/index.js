import express from 'express';
import cors from 'cors';

app.use(cors());

const app = express();

app.get('/', (req, res) => {
    res.send('Server is running');
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});