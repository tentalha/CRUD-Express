const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/practiceDb";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).catch(error => console.log(error));
const db = mongoose.connection;

db.on("error", () => console.log("mongodb connection error!"));