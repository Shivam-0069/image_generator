import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';

dotenv.config(); // ✅ required

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());

await connectDB();

app.get('/', (req, res) => {
    res.send("API Working  Fine");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ` + PORT);
});
