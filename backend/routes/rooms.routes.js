// Importation du module Express
const express = require("express");

// Importation du contrôleur des produits
const roomController = require("../controllers_server/rooms.controllers");
//const loginMiddelware = require("../middelwares/login.middelware");

const router = express.Router();
const multer=require("multer");

const storage=multer.diskStorage({
       destination:(req,file,cb)=>{
              cb(null,"C:/Users/nouhaila/Desktop/NodeJs/reservation_hotel_projet/backend/uploads");
              
       },
       filename:(req,file,cb)=>{
              cb(null,file.originalname);
       }
});

const upload = multer({ storage: storage });

     

router.route("/")
  .get(roomController.getAllRooms)
  .post(upload.array("roomImages", 5), roomController.addRoom); // "5" is the maximum number of images

router.route("/:id")
  .get(roomController.getRoomById)
  .delete(roomController.deleteRoomById)
  .put(upload.array('roomImages'),roomController.updateRoom)
  .patch(roomController.updateRoomWithBooking);

  
module.exports = router;
