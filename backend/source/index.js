import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import statisticRoutes from './routes/statisticRoutes.js'
import bodyParser from "body-parser"
dotenv.config()
// connect database
connectDB()
// instance express
const app = express()
// middleware body-parser for req.body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/product', productRoutes)
app.use('/api/user', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/statistic', statisticRoutes)

// listen PORT
const PORT = process.env.PORT || 5000
URL = process.env.URL
app.listen(PORT, () => {
  console.log(`Example app listening at ${URL}:${PORT}`)
})