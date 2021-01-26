const express=require('express');
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes=require("./api/routes/appRoute");
const config = require('config'); 
const readXlsxFile = require('read-excel-file/node');
const city=require('./api/models/city');
const ip=require('ip');

const PORT=process.env.PORT||config.PORT;
app.use(cors());
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('./api/database/database');
app.use(`/api/${config.VERSION}`, routes);

// Serve Static files
 app.use(express.static(__dirname+"/api/uploads/"));

// apply the routes to our application with the prefix /api


// use morgan to log requests to the console
app.use(morgan('dev'));
console.log(__dirname);

// readXlsxFile('./b.xlsx').then((rows) => {
//    for (let index = 34; index <rows.length; index++) {
//        const element = rows[index];      
//         let payload={
//             'createdby':'5fe0a454037d2b1647e0eb19',
//             'region':element[1], 
//             'cityname':element[0],           
//             'country':"Bangladesh",            
//         };
//         //console.log(payload);
//         city.create(payload,(error,res)=>{
//             if(error){
//                 console.log(error);
//             }
//             else{
//                 console.log(res);
//             }
//         });
        
//     }
//   });


//app.listen(PORT,ip.address(),() => console.log(`Example app listening at ${ip.address()}:${config.PORT}/api/${config.VERSION}`));
app.listen(process.env.PORT,()=>console.log("Server is running"));



