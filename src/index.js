import express from 'express';
import cors from 'cors';
import router from './routes/user.routes.js';
import { DBConnect } from './dbConfig/dbConfig.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { dbInit } from './dbConfig/dbInit.js';
import { createPaymentLink } from './middlewares/stripe.js';
import flyRouter from './routes/flyremit.routes.js';
import fqRouter from './routes/fq.routes.js';

// Define __dirname for ES modules

(async () => {
  await dbInit()
  await DBConnect()
}
)()

const app = express();

const corsOptions = {
  origin: [
    'https://crm.tomatotrails.com',
    'https://91.205.105.35:63193',
    'https://91.205.105.35:5001',
    'http://localhost:3000',
    'https://91.205.105.35',
    'http://91.205.105.35:63193'
  ],
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};


app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", router);
app.use("/api/flyremit", flyRouter);
app.use("/api/freezequotation", fqRouter);
app.post('/stripe/create-payment-link', createPaymentLink); // stripe route

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
