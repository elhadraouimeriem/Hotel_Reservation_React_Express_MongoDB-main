// Importez React
import React, { useEffect, useState } from "react";
import { getRooms } from "../../sevices/room.services";

// Composant Rooms
export function Rooms() {

    const [rooms, setRooms] = useState([]);
    const query=''

    useEffect(() => {
        fetchRooms();
      }, [query]);
    
      async function fetchRooms() {
        try {
          const res = await getRooms(query);
          setRooms(res.data);
          console.log("Data from DB:", res.data);
        } catch (error) {
          console.error("Error fetching rooms:", error);
        }
      }

  return (
    <section className="gallery py-5">
      <div className="container">
        <h3 className="text-center mb-4">
          <a className="text-uppercase text-dark text-decoration-none ls-3 text-muted">
            Available Rooms
          </a>
        </h3>
        <div class="gallery-grid">
        {rooms.map((room) => (
           <div key={room._id}  class="img-holder position-relative overflow-hidden">
           <img src={`http://localhost:5000${room.image[0]}`} class="img-fluid h-100 w-100 " alt="" />

           <div class="info">
              
               <p class="text-white">{room.rentperday} MAD/Night</p>
               <div class="d-flex mb-2 justify-content-start align-items-center hotel-icons text-white">
                   <span class="d-inline-block me-3">
                       <i class="fa fa-bed"></i> {room.type}
                   </span>
                   <span class="d-inline-block me-3">
                       <i class="fa fa-users"></i> {room.maxcount}
                   </span>
               </div>
               <a href="reservation" class="btn btn-light btn-sm mt-4">
                   Book Now
               </a>
           </div>
       </div>
        ))}
                
            </div>
      </div>
    </section>
  );
}
