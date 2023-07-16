require('dotenv').config();

const connectDB = require('./db/connect')
const productModel = require('./models/product')
const product = require('./products.json');

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        await productModel.deleteMany();
        await productModel.create(product)
        console.log("sucess");

        process.exit(0);
    }

    catch (EROOR) {
        console.log(ERROE)
        process.exit(1);
    }
}
start()