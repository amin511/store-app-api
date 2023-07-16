const mongoose = require('mongoose')
const url = "mongodb://amindarmouni3:amino0192@ac-guheq1d-shard-00-00.omczp0d.mongodb.net:27017,ac-guheq1d-shard-00-01.omczp0d.mongodb.net:27017,ac-guheq1d-shard-00-02.omczp0d.mongodb.net:27017/?ssl=true&replicaSet=atlas-l61bei-shard-0&authSource=admin&retryWrites=true&w=majority"
const connectDB = () => {
  return mongoose.connect(url)
}

module.exports = connectDB
