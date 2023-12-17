const express = require('express')
const cors = require('cors')
var jwt = require('jsonwebtoken');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors({
  origin : ['http://localhost:5173'],
  credentials : true
})) // allow cross-origin requests
app.use(express.json())

// custom json data 
const brands = [
  {
    "id": 1,
    "brand_name": "LOreal",
    "brand_logo": "https://i.ibb.co/X7rbdRg/6670e3d671398b842511a522ae879a0a.jpg"
  },
  {
    "id": 2,
    "brand_name": "EsteeLauder",
    "brand_logo": "https://i.ibb.co/71tG36P/f86838237e982a69bf124314930402b6.jpg"
  },
  {
    "id": 3,
    "brand_name": "Chanel",
    "brand_logo": "https://i.ibb.co/sPF7s5k/Rewrite-Chanel-Logo-Design-History-Evolution-0-1024x1024.webp"
  },
  {
    "id": 4,
    "brand_name": "Dior",
    "brand_logo": "https://i.ibb.co/nnWnc0d/christian-dior-new3874.jpg"
  },
  {
    "id": 5,
    "brand_name": "Urban Decay",
    "brand_logo": "https://i.ibb.co/njB1txS/urban-decay-logo.png"
  },
  {
    "id": 6,
    "brand_name": "Revlon",
    "brand_logo": "https://i.ibb.co/4pcm5gR/7c8ef2cbc069de2afb3d99e62f23b910.jpg"
  }
]
app.get('/brands' , async(req,res) => {
  res.send(brands);
})

// database

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jsqvega.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const productCollection = client.db("productDB").collection("product");
    const cartCollection = client.db("productDB").collection("cart");
    const ReviewCollection = client.db("productDB").collection("review");

    // auth related api
    app.post('/jwt', (req,res) => {
      const user = req.body;
      console.log(user)

      const token = jwt.sign(user , process.env.ACCESS_TOKEN_SECRET , {expiresIn : '1hr'})
      res
      .cookie('token', token, {
        httpOnly : true,
        secure : false,
        // sameSite : 'none'
      })
      .send({success : true})
    })


    app.get('/product' , async(req,res) => {
        const cursor = productCollection.find()
        const result = await cursor.toArray();
        res.send(result);
    })
    app.get('/cart' , async(req,res) => {
        const cursor = cartCollection.find()
        const result = await cursor.toArray();
        res.send(result);
    });

    app.get('/review' , async(req,res) => {
        const cursor = ReviewCollection.find()
        const result = await cursor.toArray();
        res.send(result);
        // console.log(result)
    });
    // problem
    app.get('/cart/:id' , async(req,res) => {
      const id = req.params.id;
      const filter = { _id : id }
      const result = await cartCollection.findOne(filter)
      console.log(result)
      res.send(result)
      
    });
  

    app.get('/product/:id', async(req,res) => {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const result = await productCollection.findOne(query)
      res.send(result)
    })

  

    app.post('/product', async(req,res) => {
        const newProduct = req.body;
        const result = await productCollection.insertOne(newProduct)
        res.send(result)
        console.log(result)
    })
    app.post('/review', async(req,res) => {
        const newReview = req.body;
        const result = await ReviewCollection.insertOne(newReview)
        res.send(result)
        console.log(result)
    })

    app.put('/product/:id' , async(req,res) => {
      const id = req.params.id;
      const updatedData = req.body;
      const filter = {_id : new ObjectId(id)}
      const optional = {upsert : true}
      const updateProduct = {
        $set: {
          name : updatedData.name,
          price : updatedData.price,
          description : updatedData.description,
          photo : updatedData.photo,
          category : updatedData.category,
          brand : updatedData.brand,
          rating : updatedData.rating,

        }
      }
      const result = await productCollection.updateOne(filter,updateProduct,optional)
      res.send(result)
      console.log(result)
    })

    app.delete('/product/:id', async(req,res) => {
      const id = req.params.id;
      const filter = {_id : new ObjectId(id)}
      const result = await productCollection.deleteOne(filter);
      console.log(result)
      res.send(result)
    })

    app.post('/cart', async(req,res)=> {
      const newCartItem = req.body;
      const result = await cartCollection.insertOne(newCartItem)
      res.send(result)
      console.log(result)
    })

    

    // delete
    app.delete('/cart/:id', async(req,res) => {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await cartCollection.deleteOne(query)
      res.send(result)
      console.log(result)
    })


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req,res) => {
    res.send('Cosmetics making server is running!')
})
app.listen(port, () => {
    console.log(`Server started on ${port}`)
})


