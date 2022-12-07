require('dotenv').config();
const express = require('express');
const cors =  require('cors');
const {PORT} = process.env;
const port = PORT || 8080;
const app = express();

const userRoutes = require('./router/usersRoute');

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);

app.listen(port, ()=>console.log(`🚀Server running at http://localhost:${port} 🚀`));