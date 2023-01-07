require('dotenv').config();
const express = require('express');
const cors =  require('cors');
const {PORT} = process.env;
const port = PORT || 8080;
const app = express();
const {verify} = require('./auth');
const bodyParser = require('body-parser');

const userRoutes = require('./router/usersRoute');
const categoryRoutes = require('./router/categoryRoute');
const supplierRoutes = require('./router/supplierRoute');
const warehouseRoutes = require('./router/warehouseRoute');
const inventoryRoutes = require('./router/inventoryRoute');

const {loginUser, registerUser, getUserProfile} = require('./controllers/usersController')

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
app.use('/users', userRoutes);
app.use('/category' , categoryRoutes );
app.use('/supplier', supplierRoutes);
app.use('/warehouse', warehouseRoutes);
app.use('/items' ,inventoryRoutes);

app.post('/login' , loginUser);
app.post('/register', registerUser);
app.get('/user-profile',verify, getUserProfile);

app.listen(port, ()=>console.log(`🚀Server running at http://localhost:${port} 🚀`));