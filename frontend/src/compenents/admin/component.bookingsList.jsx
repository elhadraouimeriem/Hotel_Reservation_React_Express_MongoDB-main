import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { cancelBooking, deleteBookingByID, getBooking } from '../../sevices/booking.services';
import { NavBar } from './component.nav';
import { AdminSidebar } from './component.sidebar';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';


export function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchBookings();
  }, [query]);

  async function fetchBookings(){
    try {
      const response = await getBooking(query);
      setBookings(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des bookings', error);
    }
  };

  async function handleCancelBooking(bookingId) {
    try {
      await cancelBooking(bookingId);
      Swal.fire('Congrats', 'This Booking has been cancelled Successfully', 'success').then(result => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Error booking room:', error);
      Swal.fire('Oops', 'Something went wrong', 'error');
    }
  }

  async function deleteBooking(id) {
    try {
      const res = await deleteBookingByID(id);
      fetchBookings();
      Swal.fire('Congrats', 'This Booking has been deleted Successfully', 'success').then(result => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error deleting Booking:", error);
      Swal.fire('Oops', 'Something went wrong', 'error');

    }
  }

  return (
    <>
      <NavBar />
      <AdminSidebar />

      <main id="main" className="flexbox-col p-5">
        <h2 className="center mb-2 ml-5">Bookings List</h2>
        <Form.Control type="search" className="w-50 m-3" onChange={e => setQuery(e.target.value)} placeholder="Write a keyword" />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Room</th>
              <th>Image</th>
              <th>User</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Total Amount</th>
              <th>Total Days</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td>{booking.room.name}</td>
                <td><img height={100} width={100} src={`http://localhost:5000${booking.room.image[0]}`}/></td>
                <td>{booking.user.name}</td>
                <td>{booking.fromdate}</td>
                <td>{booking.todate}</td>
                <td>{booking.totalamount}</td>
                <td>{booking.totaldays}</td>
                <td>
                  {booking.status}
                </td>
                <td>
                <div >
                  {booking.status === 'booked' && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleCancelBooking(booking._id)}
                    >
                      Cancel
                    </button>
                  )}

<button className="btn btn-danger btn-sm ml-3" onClick={() => deleteBooking(booking._id)}>
                  Supprimer
                </button>
                </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
