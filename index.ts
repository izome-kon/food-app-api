import express from 'express';
import { AdminRoutes, VandorRoutes } from './routes';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { MONGO_URI, PORT } from './config';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/admin', AdminRoutes);
app.use('/vandor', VandorRoutes);


mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });


app.listen(PORT, () => {
    console.clear();
    console.log(`Server is running on port ${PORT}`);
}
);
