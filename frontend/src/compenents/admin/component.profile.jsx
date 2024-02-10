import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { NavBar } from './component.nav';
import { AdminSidebar } from './component.sidebar';
import { updatePassword } from '../../sevices/login.services';

export function ProfileAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setNewPassword('');
  };

  const handleChangePassword = async () => {
    try {
      const userId=localStorage.getItem('userId');
      const confirmChange = window.confirm('Are you sure you want to change your password?');
      if (confirmChange) {
        const response = await updatePassword(userId, newPassword);
        console.log(response.message);
        handleClose();
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };


  return (
    <>
      <NavBar />
      <AdminSidebar />

      <div className="container mt-4 mb-5 p-5">
        <h1 className="mb-5">My Profile</h1>
        <div className="card shadow border-0 rounded mb-5 p-5">
          <div className="row">
            <div className="col-md-6 mb-5">
              <h5 className="card-subtitle mb-2 text-muted">Name</h5>
              <p className="card-text">{localStorage.getItem('username')}</p>
            </div>
            <div className="col-md-6">
              <h5 className="card-subtitle mb-2 text-muted">Email</h5>
              <p className="card-text">{localStorage.getItem('email')}</p>
            </div>
          </div>
          <div className="col"></div>
          <Button variant="primary" onClick={handleShow}>
            Change Password
          </Button>
        </div>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>New Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
            />
            <div className="form-check mt-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label className="form-check-label" htmlFor="showPassword">
                Show Password
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleChangePassword}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
