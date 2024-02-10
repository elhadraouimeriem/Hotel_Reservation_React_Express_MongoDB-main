import React, { useEffect, useState } from 'react';
import { getRooms } from '../../sevices/room.services';

export function Gallery() {

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
    <>
      <section className="gallery">
        <div className="container">
          <h3 className="mb-4">
            <a className="text-uppercase text-dark text-decoration-none ls-3 text-muted">
              Gallery
            </a>
          </h3>
          <div className="gallery-grid">

          {rooms.map((room) => (
            <div  key={room._id} class="img-holder position-relative overflow-hidden">
            <img src={`http://localhost:5000${room.image[0]}`} class="img-fluid h-100 w-100 " alt="" />

            <div class="info">
                <h5 class="text-white mt-2" >{room.name}</h5>
  
                <p class="text-white">{room.rentperday} MAD/Night</p>
            </div>
            </div>
        ))}
          </div>
        </div>
      </section>
    </>
  );
}
