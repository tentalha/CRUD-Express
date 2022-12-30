require('./db/dbConfig');
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require('./routes/rootRoute');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/backend/api/", routes);


const port = 3005;

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})

