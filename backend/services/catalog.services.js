const { Types } = require("mongoose");
const Room = require("../models/room");
const Booking = require("../models/booking");

async function findRooms() {
       return await Room.find();

}

async function findRoomById(idR){
       return await Room.findById(idR);

}

async function findRoomByQuery(query){
       return await Room.find({name:{$regex:query,$options:"i"}});
}

async function findRoomByType(type){
       if(type=='all'){return await Room.find();}
       else{return await Room.find({type : type});
}

}


async function saveRoom(r){
       
       return await Room.create(r);
      
}

async function removeRoomById(idR) {
       try {
         const room = await Room.findById(idR);
     
         if (!room) {
           throw new Error('Room not found');
         }

         const booking = await Booking.findOne({ "room": idR });

       if (!booking) {
              return Room.findByIdAndDelete(idR);  
              
       } else {

              throw new Error('Room has active bookings and cannot be deleted');
       }

       } catch (error) {
         throw new Error(`Error removing room: ${error.message}`);
       }
     }
     
     async function editRoom(idR, formData) {
       try {
              let images=[];
         const roomData = JSON.parse(formData.get('roomData'));
     
         const { name, maxcount, phoneNumber, rentperday, type, description, roomImages } = roomData;
     
         // Obtenez les anciennes images à partir de la base de données
         const room = await Room.findById(idR);
         if (formData.has('image') && formData.get('image').trim() !== '')
         {
               images = formData.get('image').split(',') ;
         }
          else{
              images = roomImages;
          } 
         console.log(images);
      
         // Mettez à jour le champ image avec les nouvelles images combinées
         await Room.findByIdAndUpdate(idR, {
           name,
           maxcount,
           phoneNumber,
           rentperday,
           image: images,
           type,
           description,
         });
     
         return "Room a été bien modifié";
       } catch (error) {
         console.error("Erreur dans la modification de la chambre :", error);
         throw new Error("Erreur dans la modification de la chambre");
       }
     }
     
     
     async function editRoomWithBooking(idR, room) {
       const updatedRoom = await Room.findById(idR);
       
       updatedRoom.currentbookings = room.currentbookings;
     
       await updatedRoom.save();
       console.log("rooooom:" , updatedRoom);
       
       return updatedRoom;
     }
     
     
module.exports={findRooms,editRoomWithBooking,findRoomById,findRoomByQuery,findRoomByType,saveRoom,removeRoomById,editRoom}