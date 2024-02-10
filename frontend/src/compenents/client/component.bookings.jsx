import React, { useState, useEffect } from 'react';
import { cancelBooking, getBookings } from '../../sevices/booking.services';
import Swal from 'sweetalert2';
import { Divider, Space, Tag } from 'antd';


export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchUserBookings();
  }, [userId]);

  async function fetchUserBookings() {
    try {
      const response = await getBookings(userId);
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
    }
  }


  async function handleCancelBooking(bookingId) {
    try {
      await cancelBooking(bookingId);
      fetchUserBookings();
      Swal.fire('Congrats', 'Your Booking has been cancelled Successfully' , 'success').then(result=>{
        window.location.reload()
      });
    } catch (error) {
      console.error("Error booking room:", error);
      Swal.fire('Oops', 'Something went wrong' , 'error');
  }
}

  return (
    <div className="container mt-4">
      <h4 className="mb-3">User Bookings</h4>
      {bookings.map((booking) => (
        <div key={booking._id} className="card shadow rounded mb-4">
          <div className="card-body">
            <h5 className="card-title">{booking.room.name}</h5>
            <p><strong>Booking ID:</strong> {booking._id}</p>
            <p><strong>Check In:</strong> {booking.fromdate}</p>
            <p><strong>Check Out:</strong> {booking.todate}</p>
            <p><strong>Total Amount:</strong> {booking.totalamount} MAD</p>
            <p><strong>Status: </strong>
             {(booking.status === 'booked') ?  <Tag color="green">CONFIRMED</Tag> : <Tag color="red">CANCELED</Tag>}</p>
          </div>
          {booking.status !== 'canceled' && (
            <div className='text-right mr-4 mb-4'>
            <button className="btn btn-danger" onClick={() => {handleCancelBooking(booking._id)}}>Cancel Booking</button>
          </div>
          )}
        </div>
      ))}
    </div>
  );
}
