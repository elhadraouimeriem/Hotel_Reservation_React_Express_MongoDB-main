import React, { useEffect, useState } from "react";
import { getRoomByID, updateRoom2 } from "../../sevices/room.services";
import { useLocation, useParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import moment from 'moment';
import { addBooking } from "../../sevices/booking.services";
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';



export function Checkout() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const fromdate = searchParams.get('fromdate');
  const todate = searchParams.get('todate');
  const totaldays = moment(todate, 'DD-MM-YYYY').diff(moment(fromdate, 'DD-MM-YYYY'), 'days')+1;
  useEffect(() => {
    async function fetchRoomDetails() {
      try {
        console.log("Fetching room details for roomId:", id);
        const response = await getRoomByID(id);
        setRoom(response.data);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    }

    fetchRoomDetails();
  }, [id]);

 
  
  async function addCurrentBooking(roomId, bookingId, userId, status) {
    try {
      const response = await getRoomByID(roomId);
      const room = response.data;
      console.log(bookingId);
  
      room.currentbookings.push({
        bookingId: bookingId,
        fromdate: fromdate,
        todate: todate,
        userId: userId,
        status: status
      });
  
      await updateRoom2(roomId, room);
      console.log(room);
    } catch (error) {
      console.error('Error updating room with new booking:', error);
    }
  }
  
 

  async function onToken(token, roomId) {
    try {
      const userId = await localStorage.getItem("userId");
      console.log('User ID:', userId);
      console.log('Room ID:', roomId);
  
      if (!room) {
        console.error("Error: Room details not available");
        return;
      }
  
      const bookingDetails = {
        "room": roomId,
        "user": userId,
        "fromdate": fromdate,
        "todate": todate,
        "totalamount": totaldays * room.rentperday,
        "totaldays": totaldays,
        "transactionId": token.id,
        "token": token  
      };
    
      const response = await addBooking(bookingDetails);
      const bookingId = response.data._id;
      const status = response.data.status;
      console.log("Booking Response:", response.data);
      addCurrentBooking(roomId, bookingId, userId, status);

      Swal.fire('Congratulations', 'Your room Booked Successfully' , 'success').then(result=>{
        window.location.href='/bookings'
      });
    } catch (error) {
      console.error("Error booking room:", error);
      Swal.fire('Sorry', 'Something went wrong' , 'error');

    }
  }
  

  return (
    <div className="container mt-3 mb-5">
      {room ? (
        <div className="row bs" style={{ border: "2px solid #ddd", borderRadius: "8px", padding: "20px" }}>
          <div className="col-md-6">
            <h2>{room.name}</h2>
             <Carousel>
                  {room.image.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img className="d-block w-100" src={`http://localhost:5000${image}`} alt={`Slide ${index}`} />
                    </Carousel.Item>
                  ))}
                </Carousel>
          </div>
          <div className="col-md-6">
            <div>
              <h2>Booking Details</h2>
              <hr />
              <b>
                <p>Username: {localStorage.getItem("username")}</p>
                <p>Email: {localStorage.getItem("email")}</p>
                <p>From Date:  {fromdate} </p>
                <p>To Date:  {todate}</p>
                <p>Max Count:  {room.maxcount} </p>
              </b>
            </div>
            <div className="mt-4">
              <b>
                <h2>Amount</h2>
                <hr />
                <p>Total days: {totaldays} </p>
                <p>Rent per day:  {room.rentperday} MAD</p>
                <p>Total Amount: {totaldays * room.rentperday} MAD</p>
              </b>
            </div>
            <div className="mt-4" style={{float:'right'}}>
            <StripeCheckout
        token={(token) => onToken(token, room._id)}
        stripeKey="pk_test_51OW3wPD5AzRLCc0e2n6shH4EROBYaS95nrU51sWDuyHTdrxtKAYawNSDEpPcH24lhbUwLMO6goroK8tfxvLX7VIu00yEeYztor"
      >
            <button className="btn btn-dark">Pay Now</button>

      </StripeCheckout>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
