const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// nsAdmin
// LoQ8vcLmtgOGhRmC


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hd1os.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        await client.connect();
        console.log('db connected');
    }
    finally{

    }
}
run().catch(console.dir);


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("NS Industries Server is Running!");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
