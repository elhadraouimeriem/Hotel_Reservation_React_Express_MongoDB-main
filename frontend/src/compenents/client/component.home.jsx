// HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';


export function Home() {
  const navigate = useNavigate();

  const handleCheckAvailabilityClick = () => {
    // Navigate to the reservation page
    navigate('/reservation');
  };
  
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="offer bg-white d-inline-flex m-auto">
            <p className="mb-0 lead text-uppercase">
              <span className="bg-orange fw-bold d-inline-block p-3">
                Promo
              </span>
              <span className="d-inline-block p-3">
                Get 20% off on your first booking
              </span>
            </p>
          </div>
          <button className="btn rounded-0 w-200 ml-2"    onClick={handleCheckAvailabilityClick}
 style={{ backgroundColor: "#FFA500", color: "white" }}>
                        CHECK AVAILABILITY
                      </button>
          <div className="availability mt-4">
            <form action="reservation">
              <div className="card shadow border-0 rounded-0">
                <div className="card-body">
                    <div className="col-md-3 p-4 m-auto">
                      
                    </div>
                  </div>
                </div>
            </form>
          </div>
          {/* Check availability */}
        </div>
      </section>
      {/* Hero */}

      {/* About us */}
      <section className="about py-5">
        <div className="container">
          <div className="text-center">
            <h4>Little About Us</h4>
            <p class="lead">
            Bienvenue à l'hôtel N&M

            Découvrez le luxe ultime au cœur de notre oasis exclusive, l'hôtel N&M. Niché dans un environnement paisible, notre établissement vous offre une expérience exceptionnelle alliant élégance, confort et service exceptionnel.

            Les chambres spacieuses et élégamment décorées vous accueillent dans un havre de détente, offrant une vue imprenable sur les environs pittoresques. Chaque détail a été soigneusement pensé pour créer une atmosphère chaleureuse et accueillante, vous permettant de vous évader du quotidien.

            Notre équipe dévouée est prête à rendre votre séjour inoubliable. Profitez de notre service de conciergerie haut de gamme pour organiser des excursions, des repas gastronomiques ou des expériences uniques. Que vous voyagiez pour affaires ou pour le plaisir, nous sommes là pour répondre à tous vos besoins.
            </p>
                <p class="lead">
            Notre restaurant primé propose une cuisine raffinée mettant en valeur des ingrédients locaux de première qualité. Détendez-vous au bar avec une sélection exclusive de vins, de cocktails artisanaux et de rafraîchissements.

            Explorez les environs enchanteurs, découvrez des paysages spectaculaires et imprégnez-vous de la tranquillité qui caractérise notre établissement. N&M est bien plus qu'un simple hôtel, c'est une destination où vos rêves prennent vie.

            Réservez dès maintenant et plongez dans une expérience de luxe incomparable à l'hôtel N&M. Nous sommes impatients de vous accueillir dans notre refuge exclusif où le confort et l'élégance se rencontrent harmonieusement.


                </p>
            <a href="about" className="btn btn-orange mt-5 w-200"   style={{ backgroundColor: "#FFA500", color: "white" }}>
              Read More
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
