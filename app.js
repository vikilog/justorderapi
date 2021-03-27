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

//app.listen(80);
app.listen(PORT,ip.address(),() => console.log(`Example app listening at ${ip.address()}:${config.PORT}/api/${config.VERSION}`));
//app.listen(process.env.PORT,()=>console.log("Server is running"));



