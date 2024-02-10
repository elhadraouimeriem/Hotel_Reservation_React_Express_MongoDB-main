import React, { useEffect, useState } from "react";
import { getRoom } from "../../sevices/room.services";
import { Link } from "react-router-dom";
import { Modal , Carousel } from 'react-bootstrap';  // Importez le composant Modal et Button de React Bootstrap
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;


export function Reservation() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);  // Ajoutez un état pour stocker les détails de la chambre sélectionnée
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [show, setShow] = useState(false);
  const[fromdate,setFromdate]=useState();
  const[todate,setTodate]=useState();
  const [duplicateRooms, setDuplicateRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, [query,type]);

  async function fetchRooms() {
    try {
      const res = await getRoom(query,type);
      setRooms(res.data);
      setDuplicateRooms(res.data);
      console.log("Data from DB:", res.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  }

  const handleShow = (room) => {
    setSelectedRoom(room);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  function filterByDate(dates) {
      const fd=(dates[0]).format('DD-MM-YYYY');
      const td=(dates[1]).format('DD-MM-YYYY');

      setFromdate(fd);
      setTodate(td);

      var temprooms = [];
      var availability = false;

      for(const room of duplicateRooms){
        if(room.currentbookings.length > 0){
             for(const booking of room.currentbookings){

                if(
                  !(fd >= booking.fromdate && fd <= booking.todate)  
                  &&
                  !(td >= booking.fromdate && td <= booking.todate)
                ){
                      if(
                        fd !== booking.fromdate  && fd !== booking.todate
                        && td !== booking.fromdate && td !== booking.todate
                        )
                         {
                              availability=true;

                        }
                      
                }
             }
        }

        if(availability === true || room.currentbookings.length===0){
                  temprooms.push(room);
        }

        setRooms(temprooms);
      }
    
  }


  return (
    <section className="reservation py-5">
      <div className="container">
        <div className="text-center">
          <h3 className="">
            <a className="text-uppercase text-dark text-decoration-none ls-3 text-muted">
              Reservation
            </a>
          </h3>
          <h5>Rooms are available for reservation</h5>
        </div>
        <form action="reservation">
              <div className="card shadow border-0 rounded mb-4 mt-4">
              <div className="row p-2">

              <div className="col m-3 rounded-2">
              <RangePicker format='DD-MM-YYYY' onChange={filterByDate}/>
              </div>

              <div className="col m-3 rounded-2">
              <input type="text" className="form-control" placeholder="search rooms" onChange={e=>setQuery(e.target.value)}/>
              </div>

              <div className="col m-3 rounded-2">
              <select className="form-control" value={type} onChange={e=>setType(e.target.value)}>
                <option value="all"> All</option>
                <option value="Single"> Single</option>
                <option value="Double"> Double</option>
                <option value="Suite"> Suite</option>

              </select>
              </div>        
              </div>
              </div>
        </form>


        {rooms.map((room) => (
          <div key={room._id} className="card bg-white rounded overflow-hidden mb-4">
            <div className="row">
              <div className="col-md-2 p-0">
                <img src={`http://localhost:5000${room.image[0]}`} className="img-fluid h-100 w-100" alt="" />
              </div>
              <div className="col-md-6 p-3 m-auto">
                <h3>{room.name}</h3>
                <p className="text-warning">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <a href="" className="text-primary text-decoration-none">
                    (5 Reviews)
                  </a>
                </p>
                <p className="mb-0">
                  <strong>Max Count:</strong> {room.maxcount}
                </p>
                <p className="mb-0">
                  <strong>Phone Number:</strong> {room.phoneNumber}
                </p>
                <p className="mb-0">
                  <strong>Type:</strong> {room.type}
                </p>
              </div>
              <div className="col-md-3 text-end offset-md-1 p-3 m-auto">
                <p>
                  Starting from <span className="fw-bold text-success">{room.rentperday} MAD</span>
                </p>
                {(fromdate && todate) && (

                 (localStorage.getItem("jwtToken"))?
                            <Link to={`/reservation/checkout/${room._id}?fromdate=${fromdate}&todate=${todate}`} className="btn btn-success rounded-0">
                            Book Now
                            </Link>:
                              <Link to="/login" className="btn btn-success rounded-0">
                              Book Now
                            </Link>
                              

                )}
                
                

                <button className="btn btn-dark rounded-0 m-2" onClick={() => handleShow(room)}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Modal */}
        <Modal show={show} onHide={handleClose}>
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
      </div>
    </section>
         
  );
}
