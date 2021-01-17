const express=require('express');
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes=require("./api/routes/appRoute");
const config = require('config'); 
const readXlsxFile = require('read-excel-file/node');

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

// readXlsxFile('./city.xlsx').then((rows) => {
//    for (let index = 0; index < rows.length; index++) {
//        const element = rows[index];      
//         let payload={
//             'cityname':element[0],
//             'region':element[1],
//             'created':Date.now(),
//             'country':"Pakistan"
//         };
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


app.listen(PORT,() => console.log(`Example app listening at ${config.HOST}:${config.PORT}/api/${config.VERSION}`));
//app.listen(PORT,'192.168.1.15');



