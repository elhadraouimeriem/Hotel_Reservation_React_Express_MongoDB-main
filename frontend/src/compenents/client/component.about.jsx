import React from 'react';
import { Gallery } from './component.gallery';

export function About() {

  return (
    <>
      <section className="about py-5">
        <div className="container">
          <div className="text-center">
            <h3 className="text-decoration-underline">
              <a href="about" className="text-uppercase text-dark text-decoration-none ls-3 text-muted">
                About Our Hotel
              </a>
            </h3>
          </div>

          <div className="row mt-5">
            <div className="col-md-5 p-3">
              <img src="img/hotel.jpg" className="img-fluid w-100" alt="" />
            </div>
            <div className="col-md-7 p-3">
              <h4>Hotel Name</h4>
              <p className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, veniam, dolor quam ipsam amet
                doloremque omnis molestias nemo dignissimos ut sunt laboriosam pariatur mollitia accusantium!
                Eveniet voluptatem, exercitationem voluptates optio nobis ipsum at voluptate odio quasi ad rerum
              </p>
              <p className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, veniam, dolor quam ipsam amet
                doloremque omnis molestias nemo dignissimos ut sunt laboriosam pariatur mollitia accusantium!
                Eveniet voluptatem, exercitationem voluptates optio nobis ipsum at voluptate odio quasi ad rerum
              </p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-7 p-3">
              <h4>Success History</h4>
              <p className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, veniam, dolor quam ipsam amet
                doloremque omnis molestias nemo dignissimos ut sunt laboriosam pariatur mollitia accusantium!
                Eveniet voluptatem, exercitationem voluptates optio nobis ipsum at voluptate odio quasi ad rerum
              </p>
              <p className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, veniam, dolor quam ipsam amet
                doloremque omnis molestias nemo dignissimos ut sunt laboriosam pariatur mollitia accusantium!
                Eveniet voluptatem, exercitationem voluptates optio nobis ipsum at voluptate odio quasi ad rerum
              </p>
            </div>
            <div className="col-md-5 p-3">
              <img src="img/hotel-2.jpg" className="img-fluid w-100" alt="" />
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-5 p-3">
              <img src="img/chairperson.jpg" className="img-fluid w-100" alt="" />
            </div>
            <div className="col-md-7 p-3">
              <h4>Chairperson's Message</h4>
              <p className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, veniam, dolor quam ipsam amet
                doloremque omnis molestias nemo dignissimos ut sunt laboriosam pariatur mollitia accusantium!
                Eveniet voluptatem, exercitationem voluptates optio nobis ipsum at voluptate odio quasi ad rerum
              </p>
              <p className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, veniam, dolor quam ipsam amet
                doloremque omnis molestias nemo dignissimos ut sunt laboriosam pariatur mollitia accusantium!
                Eveniet voluptatem, exercitationem voluptates optio nobis ipsum at voluptate odio quasi ad rerum
              </p>
            </div>
          </div>
        </div>
      </section>
       <div className='py-5'>
       <Gallery/>
       </div>
    </>
  );
}
