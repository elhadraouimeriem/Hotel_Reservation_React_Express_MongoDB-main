import React, { useEffect, useState } from 'react';
import { NavBar } from './component.nav';
import { AdminSidebar } from './component.sidebar';
import { addRoom, deleteRoomByID, getRooms, updateRoom } from '../../sevices/room.services';
import { Modal, Carousel, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';


export function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [showEditRoom, setShowEditRoom] = useState(false);

  //*****************************Fetch Rooms**********************************/

  useEffect(() => {
    fetchRooms();
  }, [query]);

  async function fetchRooms() {
    try {
      const res = await getRooms(query);
      setRooms(res.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  }

  //*****************************New Room**********************************/
  const [newRoomData, setNewRoomData] = useState({
    name: "",
    maxcount: 0,
    phoneNumber: 0,
    rentperday: 0,
    image: [],
    type: "",
    description: "",
  });
  
  const handleShowAddRoom = () => {
    setShowAddRoom(true);
  };

  const handleCloseAddRoom = () => {
    setShowAddRoom(false);
  };

  const handleFormFieldChange = (e) => {
    const { name, value } = e.target;
    setNewRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { files } = e.target;
    // Convert FileList to an array of file objects
    const imagesArray = Array.from(files);
    setNewRoomData((prevData) => ({
      ...prevData,
      image: imagesArray,
    }));
  };

  const handleAddRoomSubmit = async () => {
    try {
      if (!newRoomData.type) {
        console.error("Error adding room: Type is required");
        return;
      }
      const formData = new FormData();
      formData.append("roomData", JSON.stringify(newRoomData));
  
      newRoomData.image.forEach((image, index) => {
        formData.append("roomImages", image);
      });
  
      await addRoom(formData);
      fetchRooms();
      setShowAddRoom(false);
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };
  
  

  //*****************************Delete Room**********************************/


  async function deleteRoom(id) {
    try {
      await deleteRoomByID(id);
      fetchRooms();
      Swal.fire('Congrats', 'The room has been daleted Successfully', 'success').then(result => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error deleting room:", error);
      Swal.fire('Oops', 'The room has active bookings, you cannot delete it', 'error');
    }
  }

  //*****************************Details Room**********************************/
  const handleShowDetails = (room) => {
    setSelectedRoom(room);
    setShowDetails(true);
  };
  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  //*****************************Edit Room**********************************/

  const handleCloseEditRoom = () => {
    setShowEditRoom(false);
  };

  
  const [editRoomData, setEditRoomData] = useState({
    name: "",
    maxcount: 0,
    phoneNumber: 0,
    rentperday: 0,
    image: [],     // Nouvelles images
    type: "",
    description: "",
  });
  
  
  const handleEditImageChange = (e) => {
    const { files } = e.target;
    // Convert FileList to an array of file objects
    const imagesArray = Array.from(files);
    setEditRoomData((prevData) => ({
      ...prevData,
      image: imagesArray,
    }));
  };
  

const handleShowEditRoom = (room) => {
  console.log("Room ID nouhaila:", room._id);
  if (!room._id) {
    console.error("Room ID is undefined.");
    return;
  }

  setSelectedRoom(room);
  setEditRoomData({
    name: room.name,
    maxcount: room.maxcount,
    phoneNumber: room.phoneNumber,
    rentperday: room.rentperday,
    image: Array.isArray(room.image) ? room.image : [room.image], // Anciennes images
    type: room.type,
    description: room.description,
  });
  setShowEditRoom(true);
};


const handleEditFormFieldChange = (e) => {
  const { name, value, files } = e.target;

  if (name === 'image') {
    const imagesArray = Array.from(files);
    setEditRoomData((prevData) => ({
      ...prevData,
      image: imagesArray,
    }));
  } else {
    setEditRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
};

const handleEditRoomSubmit = async () => {
  try {
    const formData = new FormData();

    // Append other fields individually
    formData.append("name", editRoomData.name);
    formData.append("maxcount", editRoomData.maxcount);
    formData.append("phoneNumber", editRoomData.phoneNumber);
    formData.append("rentperday", editRoomData.rentperday);
    formData.append("type", editRoomData.type);
    formData.append("description", editRoomData.description);

    // Append each file individually
    editRoomData.image.forEach((image, index) => {
      formData.append(`roomImages`, image);
    });

    const response = await updateRoom(selectedRoom._id, formData);
    console.log('Update Room Response:', response);

    fetchRooms();
    setShowEditRoom(false);
  } catch (error) {
    console.error("Error updating room:", error);
  }
};

  
  


  return (
    <>
      <NavBar />
      <AdminSidebar />

      <main id="main" className="flexbox-col p-5">
        <h2 className="mb-2 ml-5">Rooms List</h2>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button variant="success" onClick={handleShowAddRoom} className="custom-button">Add Room</Button>
          <Form.Control type="search" className="w-50 ml-3" onChange={e => setQuery(e.target.value)} placeholder="Write a keyword" />
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Capacity</th>
              <th>Phone Number</th>
              <th>Price per day</th>
              <th>Type</th>
              <th>Actions</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr key={room._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td>{room.name}</td>
                <td><img height={100} width={100} src={`http://localhost:5000${room.image[0]}`} alt={`${room.name} Image`} /></td>
                <td>{room.maxcount}</td>
                <td>{room.phoneNumber}</td>
                <td>{room.rentperday}</td>
                <td>{room.type}</td>
                <td>
                    <button className="custom-button1" onClick={() => handleShowEditRoom(room)}>
                      Edit
                    </button>
                  <button className="custom-button2" onClick={() => deleteRoom(room._id)}>
                    Delete
                  </button>
                </td>
                <td>
                  <button className="custom-button" onClick={() => handleShowDetails(room)}>
                    See Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal show={showDetails} onHide={handleCloseDetails} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedRoom && selectedRoom.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedRoom && (
              <div>
                <Carousel>
                  {selectedRoom.image.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img className="d-block w-100" src={`http://localhost:5000${image}`} alt={`Slide ${index}`} />
                    </Carousel.Item>
                  ))}
                </Carousel>
                <p><strong>Description:</strong> {selectedRoom.description}</p>
              </div>
            )}
          </Modal.Body>
        </Modal>



        <Modal show={showAddRoom} onHide={handleCloseAddRoom} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter room name"
                name="name"
                value={newRoomData.name}
                onChange={handleFormFieldChange}
              />
            </Form.Group>

            <Form.Group controlId="maxcount">
              <Form.Label>Max Count</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter max count"
                name="maxcount"
                value={newRoomData.maxcount}
                onChange={handleFormFieldChange}
              />
            </Form.Group>

            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter phone number"
                name="phoneNumber"
                value={newRoomData.phoneNumber}
                onChange={handleFormFieldChange}
              />
            </Form.Group>

            <Form.Group controlId="rentperday">
              <Form.Label>Rent per Day</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter rent per day"
                name="rentperday"
                value={newRoomData.rentperday}
                onChange={handleFormFieldChange}
              />
            </Form.Group>

            <Form.Group controlId="images">
              <Form.Label>Images</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={handleImageChange}
              />
            </Form.Group>

            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={newRoomData.type}
                onChange={handleFormFieldChange}
              >
                <option value="">--</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Suite">Suite</option>
              </Form.Control>
            </Form.Group>


            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter room description"
                name="description"
                value={newRoomData.description}
                onChange={handleFormFieldChange}
              />
            </Form.Group>

            <Button variant="primary mt-4" onClick={handleAddRoomSubmit}>
              Add Room
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showEditRoom} onHide={handleCloseEditRoom} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Edit Room</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <Form enctype="multipart/form-data">
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter room name"
          name="name"
          value={editRoomData.name} 
          onChange={handleEditFormFieldChange}
        />
      </Form.Group>

      <Form.Group controlId="maxcount">
        <Form.Label>Max Count</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter max count"
          name="maxcount"
          value={editRoomData.maxcount}
          onChange={handleEditFormFieldChange}
        />
      </Form.Group>

      <Form.Group controlId="phoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter phone number"
          name="phoneNumber"
          value={editRoomData.phoneNumber}
          onChange={handleEditFormFieldChange}
        />
      </Form.Group>

      <Form.Group controlId="rentperday">
        <Form.Label>Rent per Day</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter rent per day"
          name="rentperday"
          value={editRoomData.rentperday}
          onChange={handleEditFormFieldChange}
        />
      </Form.Group>
      <Form.Group controlId="images">
        <Form.Label>Images</Form.Label>
        <Form.Control
          type="file"
          multiple
          onChange={handleEditImageChange}
        />
      </Form.Group>

      <Form.Group controlId="type">
        <Form.Label>Type</Form.Label>
        <Form.Control
          as="select"
          name="type"
          value={editRoomData.type}
          onChange={handleEditFormFieldChange}
        >
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Suite">Suite</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter room description"
          name="description"
          value={editRoomData.description}
          onChange={handleEditFormFieldChange}
        />
      </Form.Group>

      <Button variant="primary mt-4" onClick={handleEditRoomSubmit}>
        Save Changes
      </Button>
    </Form>
  </Modal.Body>
</Modal>

      </main>
    </>
  );
}
