import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './db/db.js';
import Product from './models/Product.js';
import Permission from "./models/Permission.js";
import User from './models/User.js';
import {rcdb} from "./db/db.js";
import cors from 'cors';

// create server
const app = express();

const corsOptions = {
	origin: ['http://localhost:5173','https://basic-ovrridr-client.vercel.app/']
};

// connect to database
connectDB();
// init middleware
app.use(express.json());
app.use(cors(corsOptions));

app.post('/login', async (req, res) => {
    const { dbCommand, password } = req.body;
    try {
        const cursorBatch = await rcdb(dbCommand)
        if (cursorBatch.length > 1 || !cursorBatch.length) {
            return res.status(400).json({message: "user errors"})
        }
        if (!cursorBatch.length) {
            return res.status(404).send();
        }
        const user = cursorBatch[0];
        if (user.password === password) {
            const perms = await Permission.findOne({"user.id": user._id})
            return res.status(200).send(perms);
        } else {
            return res.status(401).send();
        }
    } catch(e) {
        res.status(500)
    }
})


app.post('/', async (req, res) => {
    const {dbCommand} = req.body;
    const result = await rcdb(dbCommand);
    res.status(200).send(result)
});

const PORT = process.env.PORT || 5000;

// listen for server
app.listen(PORT, () => console.log(`Server is up on ${PORT}`));
