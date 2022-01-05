import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import statisticRoutes from './routes/statisticRoutes.js'
import deliveryAddressRoutes from './routes/deliveryAddressRoutes.js'
import cloudinary from 'cloudinary'
import path from 'path'
import bodyParser from "body-parser"

// config file environment variable
dotenv.config()
cloudinary.v2.config({
  cloud_name: "dflbuw3z5",
  api_key: '887547968379921',
  api_secret: 'Y-4Mn12nTrX5uIzKxWzUP3KAj50',
});


// connect database
connectDB()
// instance express
const app = express()
// middleware body-parser for req.body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var __dirname = path.resolve()

app.use(express.static('uploads'))

// lat xoa
app.get('/createProduct', function (req, res) {
  res.sendFile(__dirname + '/source/createProduct.html');
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/product', productRoutes)
app.use('/api/user', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/statistic', statisticRoutes)
app.use('/api/deliveryAddress', deliveryAddressRoutes)

// listen PORT
const PORT = process.env.PORT || 5000
URL = process.env.URL

app.listen(PORT, () => {
  console.log(`Example app listening at ${URL}:${PORT}`)
})