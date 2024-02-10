import React, { useState } from "react";
import '../../login_admin.css';
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../sevices/login.services";

export function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate = useNavigate();

  async function handlForm(event) {
    event.preventDefault();
    try {
        const response = await userLogin({ "email": email, "password": password });

        const { userId, token, username } = response.data;
        // Store the token and user ID in localStorage
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        console.log(userId);
        
        window.alert("Connexion réussie !");  
        navigate("/reservation");

    } catch (error) {
      if (error.message === "Mot de passe incorrect") {
        window.alert("Mot de passe incorrect. Veuillez réessayer.");
      } else if (error.message === "L'utilisateur n'existe pas") {
        window.alert("L'utilisateur n'existe pas. Veuillez vérifier votre email.");
      } else {
        window.alert("Email or Password incorrect !!");}
    }

  }
  
  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  };

  const globalStyles = {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    fontFamily: 'Raleway, sans-serif',
  };
  const handleBackToHome = () => {
    navigate('/home'); // Update the path accordingly
  };

  const GoToSignUp = () => {
    navigate('/register'); // Update the path accordingly
  };
  return (
    <div style={globalStyles}>
    <button className="back-arrow m-2 custom-button" onClick={handleBackToHome}>
      <span>Back to Home</span>
    </button>
    <button className="back-arrow m-2 custom-button" onClick={GoToSignUp}>
      <span>Create an account</span>
    </button>
    <div className="container" style={containerStyles}>
      <div className="screen">
        <div className="screen__content">
          <form className="login">
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input type="text" className="login__input" placeholder="Email" 
               onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input type="password" className="login__input" placeholder="Password" 
               onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <button className="button login__submit" onClick={(e) => handlForm(e)}>
              <span className="button__text">Log In Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          <div className="social-login">
            <h3>log in via</h3>
            <div className="social-icons">
              <a href="#" className="social-login__icon fab fa-instagram"></a>
              <a href="#" className="social-login__icon fab fa-facebook"></a>
              <a href="#" className="social-login__icon fab fa-twitter"></a>
            </div>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>

    
     
    </div>
  );
}
