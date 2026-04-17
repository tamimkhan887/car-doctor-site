const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
require('dotenv').config()
const cors = require('cors');
const port = 5000;
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')


// middleware

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

const uri = `mongodb://${process.env.DB_user}:${process.env.DB_Pass}@ac-owba27t-shard-00-00.mrwdf0b.mongodb.net:27017,ac-owba27t-shard-00-01.mrwdf0b.mongodb.net:27017,ac-owba27t-shard-00-02.mrwdf0b.mongodb.net:27017/?ssl=true&replicaSet=atlas-ijpwm3-shard-0&authSource=admin&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//  middlewares

const logger = async (req, res, next) => {
  console.log('called:', req.host, req.originalUrl)
  next()
}

const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: 'not authorized' })
  }
  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    console.log(decoded)
    req.user = decoded ;
    next()

  })

}

async function run() {
  try {
    await client.connect();

    const dataBase = client.db("carDoctor")
    const db_col_services = dataBase.collection("services")
    const db_col_bookings = dataBase.collection("booking")

    app.post("/jwt", logger, (req, res) => {
      const user = req.body
      const token = jwt.sign({
        user
      }, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '1h' });
      res.cookie('token', token, {
        httpOnly: true,
        secure: false
      })
      res.send({ success: true })
    })


    app.get("/services", logger, async (req, res) => {
      const result = await db_col_services.find().toArray();
      res.send(result);
    })

    app.get("/services/:id", logger, async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const projectFields = { _id: 1, title: 1, price: 1, img: 1 };
      const result = await db_col_services.findOne(query, { projection: projectFields })
      res.send(result)
    })

    app.get("/bookings", logger, verifyToken, async (req, res) => {
      let query = {}
      console.log("from Booking Site",req.user)
      if(req?.user.user.email != req?.query.email){
        return res.status(403).send({message : "Forbidden"})
      }
      if (req.query?.email) {
        query = { email: req.query.email }
      }
      const result = await db_col_bookings.find(query).toArray();
      res.send(result)
    })

    app.post("/bookings", logger, async (req, res) => {
      const booking = req.body;
      console.log(req.cookies.token)
      const result = await db_col_bookings.insertOne(booking)
      res.send(result)
    })

    app.delete("/bookings/:id", logger, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await db_col_bookings.deleteOne(query)
      res.send(result)
    })

    app.patch("/bookings/:id", logger, async (req, res) => {
      const id = req.params.id
      console.log(id)
      const updateBooking = req.body
      const filter = { _id: new ObjectId(id) }
      const updateDocument = {
        $set: {
          status: updateBooking.status,
        },
      };
      const result = await db_col_bookings.updateOne(filter, updateDocument)
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})