require('dotenv').config();
// async errors
require('express-async-errors');

const express = require("express");
const app = express();
const PrduuctsRouter = require('./routes/products')
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.json())


// routes :
app.use('/api/v1/products', PrduuctsRouter)


app.use(notFound);
app.use(errorHandlerMiddleware);

const port = 5000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`server is listening port ${port} `)
        })
    } catch (error) {
        console.log(error)
    }
}

start();





