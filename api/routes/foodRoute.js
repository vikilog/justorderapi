const express=require("express");
const foodRoute=express.Router();
const controller=require("../controller");
const checkImage=require("../controller/hotel/checkimage");
const multer=require('multer')
const config=require('config');
const path=require('path');
const p=path.join(__dirname+"/../uploads/");

var storage=multer.diskStorage({
    destination:(req,res,cb)=>{cb(null,p)},
    filename:(req,file,cb)=>{
        let ext=file.originalname.split(".");
        cb(null,Date.now()+"."+ext[ext.length-1])
    }
});
var upload=multer({storage:storage});

foodRoute.post('/file/upload',upload.single('file'),controller.file.upload)
foodRoute.post('/category/add',controller.restaurant.profile.category.add_category);
foodRoute.get('/category/list',controller.restaurant.profile.category.list_category);
foodRoute.post('/category/update',controller.restaurant.profile.category.update_category);
foodRoute.get('/category/remove',controller.restaurant.profile.category.remove_category);

foodRoute.post('/menu/add',controller.restaurant.profile.menu.add_menu);
foodRoute.get('/menu/list',controller.restaurant.profile.menu.list_menu);
foodRoute.post('/menu/remove',controller.restaurant.profile.menu.remove_menu);
foodRoute.post('/menu/update',controller.restaurant.profile.menu.update_menu);

foodRoute.post('/size/add',controller.restaurant.profile.size.add_size);
foodRoute.post('/size/remove',controller.restaurant.profile.size.remove_size);
foodRoute.get('/size/list/:menuId',controller.restaurant.profile.size.list_size);

foodRoute.get('/option/list/:menuId',controller.restaurant.profile.option.list_option);
foodRoute.post('/option/add/:menuId',controller.restaurant.profile.option.add_option);
foodRoute.post('/option/remove',controller.restaurant.profile.option.remove_option);
foodRoute.post('/menu/option/add',controller.restaurant.profile.option.push_option);
foodRoute.post('/menu/option/remove',controller.restaurant.profile.option.pull_option);

foodRoute.post('/coupon/add',controller.restaurant.profile.coupon.add_coupon);
foodRoute.get('/coupon/remove/:couponId',controller.restaurant.profile.coupon.remove_coupon);
foodRoute.get('/coupon/list',controller.restaurant.profile.coupon.list_coupon);

foodRoute.get('/charges/list',controller.restaurant.profile.charges.list_charge);
foodRoute.post('/charges/add',controller.restaurant.profile.profile.update_profile);

foodRoute.get('/time/list',controller.restaurant.profile.time.list_time);
foodRoute.post('/time/add',controller.restaurant.profile.time.add_time);
foodRoute.get('/time/remove/:timeId',controller.restaurant.profile.time.remove_time);
foodRoute.post('/time/update/:timeId',controller.restaurant.profile.time.update_time)

foodRoute.get('/restaurant/info',controller.restaurant.profile.profile.general_info);
foodRoute.post('/update/image',controller.file.upload_file_to_aws);





module.exports=foodRoute;