const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// nsAdmin
// LoQ8vcLmtgOGhRmC
// 9d1e1906b3fc5c2f4c167339fead3761f454c3df9993fe55414fd258133d8d6bbd3b8bbb719926257a3a38940baec392da8cce4407b658d5dc141d4f55c76b0b

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hd1os.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "UnAuthorized access" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: "Forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
}

async function run() {
  try {
    await client.connect();
    const productCollection = client.db("ns_industries").collection("products");    
    const userCollection = client.db('ns_industries').collection('users');

    // GET API for product
    app.get("/product", async (req, res) => {
      const services = await productCollection.find().toArray();
      res.send(services);
    });

    // GET API for user 
    app.get('/user', verifyJWT, async (req, res) => {
        const users = await userCollection.find().toArray();
        res.send(users);
      });
      
  } finally {

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
