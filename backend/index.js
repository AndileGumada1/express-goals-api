const express = require('express')
const dotevn = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 8000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/goals',require('./routes/goalRoutes'))
app.use(errorHandler)

app.listen(port,()=>console.log(`Server start on port ${port}`))


