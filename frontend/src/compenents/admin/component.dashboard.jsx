import React, { useEffect, useState } from 'react';
import { NavBar } from './component.nav';
import { AdminSidebar } from './component.sidebar';
import '../../main.css';
import { getUsers } from '../../sevices/login.services';
import { getRooms } from '../../sevices/room.services';
import { getBooking } from '../../sevices/booking.services';

export function Dashboard() {
  const [query, setQuery] = useState('');

  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookedCount, setBookedCount] = useState(0);
  const [canceledCount, setCanceledCount] = useState(0);

  useEffect(() => {
    fetchBookings();
    fetchUsers();
    fetchRooms();
  }, []);

  async function fetchBookings() {
    const response = await getBooking(query);
    setBookings(response.data);
  }

  async function fetchUsers() {
    const response = await getUsers(query);
    setUsers(response.data);
  }

  async function fetchRooms() {
    const res = await getRooms(query);
    setRooms(res.data);
  }

  useEffect(() => {
    // Calculate booked and canceled counts
    const bookedCount = bookings.filter(booking => booking.status === 'booked').length;
    const canceledCount = bookings.filter(booking => booking.status === 'canceled').length;

    setBookedCount(bookedCount);
    setCanceledCount(canceledCount);
  }, [bookings]);

  return (
    <>
      <NavBar />
      <AdminSidebar />

      <main id="main" className="flexbox-col">
        <h1 className="mb-4">DASHBOARD</h1>

        <div className="row">
          <div className="col-md-4">
            <div className="card bg-primary text-white p-4 shadow">
              <div className="card-header">
                 <i className="fa fa-home"></i>
                  <div className="info">
                    <div className="number h2">{rooms.length}</div>
                    <div className="label">Rooms</div>
                  </div>
                </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-success text-white p-4 shadow">
              <div className="card-header">
                    <i className="fa fa-users"></i>
                  <div className="info">
                    <div className="number h2">{users.length}</div>
                    <div className="label">Users</div>
                  </div>
                </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-info text-white p-4 shadow">
              <div className="card-header">
                    <i className="fa fa-bookmark"></i>
                  </div>
                  <div className="info">
                    <div className="number h2">{bookings.length}</div>
                    <div className="label">Reservations</div>
                  </div>
                </div>
          </div>
        </div>
        {/* End of row COUNT */}
      </main>
    </>
  );
}
