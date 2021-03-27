const express=require('express');
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes=require("./api/routes/appRoute");
const foodRoutes=require('./api/routes/foodRoute');
const config = require('config'); 
const ip=require('ip');

const PORT=process.env.PORT||config.PORT;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('./api/database/database');
app.use(`/api/${config.VERSION}`, routes);
app.use(`/api/${config.VERSION}`,foodRoutes)
app.use('/api/public',express.static(__dirname+"/api/uploads/"));
app.use(morgan('dev'));
console.log(__dirname);
//app.listen(80);
app.listen(PORT,ip.address(),() => console.log(`Example app listening at ${ip.address()}:${config.PORT}/api/${config.VERSION}`));
//app.listen(process.env.PORT,()=>console.log("Server is running"));



