//const Booking=require("../models/Booking")
const bookingServices=require("../services/booking.services")
const catalogServices=require("../services/catalog.services")
const userServices=require("../services/login.services")


const stripe=require('stripe')('sk_test_51OW3wPD5AzRLCc0eXrdNWVJFC9s3jjh432KnE5IbmrLnkFy1cfnRLtLbGswTcaNARXC1sO0qHu01ScMkE17xFLHq00yPAxRd68');


async function addBooking (req,res){
       try{
              console.log(req.body);
              const token = req.body.token;
              console.log("token :"+ token.id);
              const customer = await stripe.customers.create({
                     email : token.email,
                     source : token.id
              })
              console.log(customer.email);
              /*
              const paymentIntent = await stripe.paymentIntents.create({
                     amount: req.body.totalamount * 100,
                     currency: 'mad',
                     customer: customer.id,
                     receipt_email: token.email,
                     payment_method: req.body.token.id, // Utilisez l'ID du jeton actuel comme méthode de paiement
                   });*/
              
              if (token.id) {
                     try {
                       const booking = await bookingServices.saveBooking(req.body);
                       res.status(201).json(booking);
                     } catch (error) {
                       console.error("Erreur d'ajout : ", error);
                       res.status(500).json({ error: error.message });
                     }
                   } else {
                     // Échec du paiement
                     res.status(400).json({ error: 'Échec du paiement' });
                   }

        } catch (error) {
              console.error("Erreur lors de la création du paiement : ", error);
              res.status(500).json({ error: error.message });
          }
       
    }



async function getAllBookings(req, res) {
  let bookingsWithRooms=[];
       try{
              console.log(req.headers);
              let bookings=[];
          if(req.query.keyword){
              bookings = await bookingServices.findBookingByQuery(req.query.keyword);
              bookingsWithRooms = await Promise.all(bookings.map(async (booking) => {
                const room = await catalogServices.findRoomById(booking.room);
                const user = await userServices.findUserById(booking.user);
                return { ...booking.toObject(), room, user };
         }));
         
          }
          else{
              bookings = await bookingServices.findBookings();
              bookingsWithRooms = await Promise.all(bookings.map(async (booking) => {
                const room = await catalogServices.findRoomById(booking.room);
                const user = await userServices.findUserById(booking.user);
                return { ...booking.toObject(), room, user };
              }));
          }

          res.json(bookingsWithRooms);
       }catch(error){
       res.status(500).send("Erreur dans le serveur");
      }
}

async function cancelBooking(req, res) {
       const bookingId = req.params.id;
      
       try {
         const booking = await bookingServices.findBookingById(bookingId);
         const roomId = booking.room;
         console.log("Booking ID:", bookingId);
         console.log("Room ID:", roomId);
         await bookingServices.editBooking(bookingId, { status: "canceled" });
         await bookingServices.removeBookingFromCurrentBookings(roomId, bookingId);
         res.json({ message: "Booking canceled successfully." });
       } catch (error) {
         console.error("Error canceling booking:", error);
         res.status(500).json({ error: error.message });
       }
     }
     

async function getBookingById(req,res){
       const idB=req.params.id;
       try{
       const booking = await bookingServices.findBookingById(idB);
       res.json(booking);
       }catch(error){
       res.status(500).send("Erreur dans le serveur");
       }

}

async function getUserBookings(req, res) {
       try {
         const userId = req.params.userId;
         const userBookings = await bookingServices.findBookingsByUserId(userId);

       const bookingsWithRooms = await Promise.all(userBookings.map(async (booking) => {
              const room = await catalogServices.findRoomById(booking.room);
              return { ...booking.toObject(), room };
       }));
       res.json(bookingsWithRooms);

       } catch (error) {
         console.error("Error fetching user bookings:", error);
         res.status(500).json({ error: error.message });
       }
     }


async function deleteBookingById(req,res){
       const idB = req.params.id;
       try{
       await bookingServices.removeBookingById(idB);
       res.send("Booking a était bien supprimé");
       }catch(error){
       res.status(500).send("Erreur dans la suppression de booking");
       }
      
}

async function updateBooking(req,res){
       const idB = req.params.id;
       try{
       await bookingServices.editBooking(idB,req.body);
       res.send("Booking a était bien modifié");
       }catch(error){
       res.status(500).send("Erreur dans la modification de booking");
       }
       
}

module.exports={cancelBooking, getAllBookings,getUserBookings, getBookingById, addBooking, deleteBookingById, updateBooking}
