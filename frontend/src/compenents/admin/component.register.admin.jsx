import React, { useState } from 'react';
import '../../main.css';
import { useNavigate } from 'react-router-dom';
import { addUser, userLogin } from '../../sevices/login.services';


export function SignUpForm() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate = useNavigate();

  async function handlForm(event){
    event.preventDefault(); 
    const user={"name":name,"email":email,"password":password, "isAdmin": true}
    try {
      await addUser(user);
      const response = await userLogin({ "email": email, "password": password, "isAdmin": true });
      const { userId, token, username } = response.data;
      // Store the token and user ID in localStorage
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      localStorage.setItem("isAdmin", true);
      window.alert("Admin ajouter avec succès !");
      navigate("/admin/dashboard");
      window.location.reload();
    } catch (error) {
      window.alert("Une erreur s'est produite lors de l'ajout de l'admin.");
    }
  }

  return (
    <section id="signup-form">
      <div className="auth--wrapper">
        <div className="form-wrapper">
          <div className="form-card">
            <h2>Sign up</h2>
            <form action="" method="post" className="form">
              <div className="part part-3">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    className="form-control"
                    value={name} onChange={(e)=>{setName(e.target.value)}}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="form-control"
                    value={email} onChange={(e)=>{setEmail(e.target.value)}}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="form-control"
                    value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>

                <div className="form-group">
                  <button type="submit"  onClick={(e) => handlForm(e)} name="login-user" className="btn">
                  Signup
                  </button>
                 
                </div>
              </div>
              <div className="alternate-auth">
                <span>
                  Already have an account?
                  <a href="/admin/signin">&nbsp;Login here</a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

