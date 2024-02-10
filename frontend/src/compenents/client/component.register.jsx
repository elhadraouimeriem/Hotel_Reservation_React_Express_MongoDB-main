import React, { useState } from "react";
import '../../login_admin.css';
import { useNavigate } from "react-router-dom";
import { addUser, userLogin } from "../../sevices/login.services";

export function Register() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate = useNavigate();

  async function handlForm(event){
    event.preventDefault(); 
    const user={"name":name,"email":email,"password":password}
    try {
      await addUser(user);
      const response = await userLogin({ "email": email, "password": password });
      const { userId, token, username } = response.data;
      // Store the token and user ID in localStorage
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      window.alert("Utilisateur ajouté avec succès !");
      navigate("/home");
    } catch (error) {
      window.alert("Une erreur s'est produite lors de l'ajout de l'utilisateur.");
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

  const GoToSignIn = () => {
    navigate('/login'); // Update the path accordingly
  };

  return (
       
    <div style={globalStyles}>
      <button className="back-arrow m-2 custom-button" onClick={handleBackToHome}>
      <span>Back to Home</span>
    </button>
    <button className="back-arrow m-2 custom-button" onClick={GoToSignIn}>
      <span>Have an account</span>
    </button>
    <div className="container" style={containerStyles}>
      <div className="screen">
        <div className="screen__content">
          <form className="login">
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input type="text" className="login__input" placeholder="User name" 
              value={name} onChange={(e)=>{setName(e.target.value)}}/>
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-envelope"></i>
              <input type="text" className="login__input" placeholder="Email" 
              value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input type="password" className="login__input" placeholder="Password" 
              value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <button className="button login__submit" onClick={(e) => handlForm(e)}>
              <span className="button__text">Sign Up Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
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

