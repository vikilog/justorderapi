const express=require("express");
const appRoute=express.Router();
const controller=require("../controller");
const checkImage=require("../controller/hotel/checkimage");


appRoute.post("/signup",controller.auth.signup);
appRoute.post("/login",controller.auth.login);
appRoute.post("/hotel/login",controller.hotelauth.login);
appRoute.use(controller.authentication);
appRoute.get("/user",controller.user.userdetails);
appRoute.post("/add/hotel",controller.hotel.addhotel);
appRoute.get("/view/hotels",controller.hotel.viewhotels);
appRoute.get("/view/hotel/:hotelId",controller.hotel.hotels);
appRoute.put("/update/hotel/:hotelId",controller.hotel.update);
appRoute.delete("/delete/hotel/:hotelId",controller.hotel.delete);
appRoute.post("/update/hotel/image/:hotelId",checkImage.single('hotelImage'),controller.hotel.updateimage);
appRoute.get("/view/rooms/:hotelId",controller.rooms.getRooms);
appRoute.post("/add/room",controller.rooms.addRoom);
appRoute.put("/update/rooms/:roomId",controller.rooms.updateRoom);
appRoute.post("/update/rooms/image/:roomId",checkImage.single('roomImage'),controller.rooms.updateRoomImage);
appRoute.get("/view/region",controller.region.regions);
appRoute.post("/create/region",controller.region.addregions);
appRoute.post('/view/city',controller.city.getcity);
appRoute.post("/add/country",controller.region.addcountry);
appRoute.get("/view/countries",controller.region.country);
appRoute.post("/view/country/region",controller.region.find_region);



module.exports=appRoute;