const path=require('path');
const ip=require('ip');

module.exports={
    PORT:3000,
    DATABASE:"mongodb+srv://justorder:justorder@cluster0.ff5ml.mongodb.net/justorder?retryWrites=true&w=majority",
    tokenDuration: "90d",
    HOST:ip.address(),
    VERSION:"v1",
    secret: "Pings:TakingYourExperienceToANewLevel.",
    imagePath:path.join(__dirname,'../api/uploads'),
    filePath:'http://18.219.1.237:80/api/public'
}
