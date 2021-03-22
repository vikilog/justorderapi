const express=require("express");
const appRoute=express.Router();
const controller=require("../controller");
const checkImage=require("../controller/hotel/checkimage");


appRoute.post("/signup",controller.auth.signup);
appRoute.post("/login",controller.auth.login);
appRoute.get('/currentuser',controller.auth.current_user);
appRoute.post("/hotel/login",controller.hotelauth.login);
appRoute.get("/view/hotel/booking",controller.booking.list_booking);
appRoute.get("/view/hotel/services",controller.hotel.services.list_service);
appRoute.post('/restaurant/login',controller.restaurant.auth.login);
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
appRoute.get('/view/city/:region',controller.city.getcity);
appRoute.post("/add/country",controller.region.addcountry);
appRoute.get("/view/countries",controller.region.country);
appRoute.get("/view/country/region/:countryname",controller.region.find_region);
appRoute.post("/add/hotel/booking",controller.booking.add_booking);
appRoute.post("/delete/hotel/booking",controller.booking.delete_booking);
appRoute.post("/update/hotel/booking/:bookingId",controller.booking.update_booking);
appRoute.get("/hotel/check/booking/:roomtype",controller.booking.check_booking);
appRoute.get("/update/device/token/:deviceId",controller.hotel.device);
appRoute.post("/hotel/add/service",controller.hotel.services.add_service);

appRoute.get("/delete/hotel/services/:serviceId",controller.hotel.services.delete_service);
appRoute.post("/update/hotel/services/:serviceId",controller.hotel.services.update_services);
appRoute.get("/hotel/service/analytic",controller.hotel.services.analytic);
appRoute.post("/hotel/password/change",controller.hotelauth.change_password);

appRoute.get('/restaurant/list',controller.restaurant.list);
appRoute.post('/restaurant/signup',controller.restaurant.auth.signup);
appRoute.get("/areacode/list/:regionname",controller.restaurant.areacode.list_areacode);
appRoute.post("/areacode/add",controller.restaurant.areacode.add_areacode);
appRoute.post("/areacode/update/:codeId",controller.restaurant.areacode.update_areacode);
appRoute.get("/areacode/delete/:codeId",controller.restaurant.areacode.delete_areacode);

module.exports=appRoute;