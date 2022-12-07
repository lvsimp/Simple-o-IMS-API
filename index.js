require('dotenv').config();
const express = require('express');
const cors =  require('cors');
const {PORT} = process.env;
const port = PORT || 8080;
const app = express();

const userRoutes = require('./router/usersRoute');
const categoryRoutes = require('./router/categoryRoute');
const supplierRoutes = require('./router/supplierRoute');
const warehouseRoutes = require('./router/warehouseRoute');

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/category' , categoryRoutes );
app.use('/supplier', supplierRoutes);
app.use('/warehouse', warehouseRoutes);

app.listen(port, ()=>console.log(`🚀Server running at http://localhost:${port} 🚀`));