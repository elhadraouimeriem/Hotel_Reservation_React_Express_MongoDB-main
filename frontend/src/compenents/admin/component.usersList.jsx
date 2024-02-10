import React, { useEffect, useState } from 'react';
import { NavBar } from './component.nav';
import { AdminSidebar } from './component.sidebar';
import { Link } from 'react-router-dom';
import { deleteUserById, getUsers } from '../../sevices/login.services';
import Swal from 'sweetalert2';

export function UserList() {
  const [users, setUsers] = useState([]);
  const [isAdminQuery, setIsAdminQuery] = useState("");
  const [isUserQuery, setIsUserQuery] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [isAdminQuery, isUserQuery]);

  async function fetchUsers() {
    try {
      // Fetch admin users
      const adminUsers = await getUsers(isAdminQuery, true);

      // Fetch regular users
      const regularUsers = await getUsers(isUserQuery, false);

      setUsers({
        adminUsers: adminUsers.data.filter((user) => user.isAdmin),
        regularUsers: regularUsers.data.filter((user) => !user.isAdmin),
      });

    } catch (error) {
      console.error("Error fetching users:", error);
      Swal.fire('Oops', '  User has active bookings and cannot be deleted', 'error');
    }
  }

  

  async function deleteUser(id) {
    try {
      const res = await deleteUserById(id);
      fetchUsers();
    } catch (error) {
      window.alert("You can't delete this user, they have some bookings!");
      console.error("Error deleting user:", error);
    }
  }

  return (
    <>
      <NavBar />
      <AdminSidebar />

      <main id="main" className="flexbox-col p-5">
        <div className="d-flex">
          <div className="mr-5">
            <h2>Admin Users</h2>
            <input
              type="search"
              className="form-control mb-2"
              onChange={(e) => setIsAdminQuery(e.target.value)}
              placeholder="Search Admin Users"
            />
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.adminUsers && 
                  users.adminUsers.map((user, index) => (
                    <tr key={user._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                      <button className="custom-button2" onClick={() => deleteUser(user._id)}>
                  Supprimer
                </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div>
            <h2>Regular Users</h2>
            <input
              type="search"
              className="form-control mb-2"
              onChange={(e) => setIsUserQuery(e.target.value)}
              placeholder="Search Regular Users"
            />
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.regularUsers &&
                  users.regularUsers.map((user, index) => (
                    <tr key={user._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                      <button className="custom-button2" onClick={() => deleteUser(user._id)}>
                  Supprimer
                </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
