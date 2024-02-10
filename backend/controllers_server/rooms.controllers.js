//const Room=require("../models/Room")
const catalogServices=require("../services/catalog.services")

async function getAllRooms(req, res) {
       try{
              console.log(req.headers);
              let rooms=[];
          if(req.query.keyword){
              rooms = await catalogServices.findRoomByQuery(req.query.keyword);
          }
          
          else if(req.query.type){
              console.log(req.query.type);
              rooms = await catalogServices.findRoomByType(req.query.type);
          }
          else{
              rooms = await catalogServices.findRooms();
          }
       res.json(rooms);
       }catch(error){
       res.status(500).send("Erreur dans le serveur");
      }
}


async function getRoomById(req,res){
       const idR=req.params.id;
       try{
       const room = await catalogServices.findRoomById(idR);
       res.json(room);
       }catch(error){
       res.status(500).send("Erreur dans le serveur");
       }

}

async function addRoom (req, res){
       try {
         const roomData = JSON.parse(req.body.roomData);
         
         const images = req.files.map((file) => `/uploads/${file.filename}`);
         roomData.image = images;
         console.log('Room Data nouhaila test:', roomData);

         await catalogServices.saveRoom(roomData);
     
         res.status(201).json("Ajout réussi");
       } catch (error) {
         console.error("Erreur d'ajout : ", error);
         res.status(500).send("Erreur d'ajout : " + error.message);
       }
     };
     

    
async function deleteRoomById(req,res){
       const idR = req.params.id;
       try{
       await catalogServices.removeRoomById(idR);
       res.send("Room a était bien supprimé");
       }catch(error){
       res.status(500).send("Erreur dans la suppression de room");  
  }
}


async function updateRoom(req, res) {
  const roomId = req.params.id;
  try {
    const formData = new FormData();
    formData.append('roomData', JSON.stringify(req.body));

    const images = req.files.map((file) => `/uploads/${file.filename}`);
  
      formData.append('image', images);


    console.log('FormData nouhaila test:', formData);

    await catalogServices.editRoom(roomId, formData);
    res.send('Room a été bien modifié');
  } catch (error) {
    console.error("Erreur dans la modification de la chambre :", error);
    res.status(500).send("Erreur dans la modification de la chambre");
  }
}

async function updateRoomWithBooking(req, res) {
  const idR = req.params.id;
  try {
    console.log('Id Room:', idR);
    console.log('Request Body:', req.body);
    await catalogServices.editRoomWithBooking(idR, req.body);
    res.send("Current Booking a été bien modifié");
  } catch (error) {
    console.error('Error in updateRoomWithBooking:', error);
    res.status(500).send("Erreur dans la modification de la chambre");
  }
}


module.exports={getAllRooms, getRoomById, addRoom,updateRoomWithBooking, deleteRoomById, updateRoom}
