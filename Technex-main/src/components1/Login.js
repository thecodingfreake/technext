import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState,useEffect } from "react";
import "../App.css"
// import { useDispatch,useSelector } from "react-redux";
import { dashContext } from "../userContext";
import { useContext } from "react";
export default function Login() {
  
  const {userstate,setUserstate}=useContext(dashContext)
  // const id_u = useSelector((state) => state.id);
  // const email_u = useSelector((state) => state.email);
  // const dispatch = useDispatch();
  // // dispatch(logout);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data === "no match" || response.data === "NOT exists") {
        alert("Incorrect login credentials");
      } else if(response.data=="admin"){
        const Newitem2={
          email:response.data[0].email,
          loggedin:true,
          admin:true
        }
        localStorage.setItem('user',JSON.stringify(Newitem2))
      setUserstate({
        email:response.data[0].email,
        loggedin:true,
        admin:true
      })
      console.log(userstate.email)
      navigate("/admin")
      }
      else{
        const Newitem2={
          email:response.data[0].email,
          loggedin:true,
          admin:false
        }
        localStorage.setItem('user',JSON.stringify(Newitem2))
      setUserstate({
        email:response.data[0].email,
        loggedin:true,
        admin:false
      })
      console.log(userstate.email)
      navigate("/")
      } 
    } catch (error) {
      console.error("Error logging in:", error);
    }


  };

  return (
    <div className="loginContainer">
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <button className="close-button">
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            X
          </Link>
        </button>
        <h1 style={{ margin: "10px 0" }}>Let's Sign you in</h1>
        <p style={{ margin: "10px 0" }}>
          Welcome Back,
          <br />
          You have been missed
        </p>
        <input
          type="text"
          placeholder="Email or Register number"
          className="username"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <a href="/" style={{ textDecoration: "none" }}>
          Forgot Password?
        </a>
        <button className="loginButton" type="submit">
          Sign in
        </button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <hr style={{ flex: 1, marginRight: "10px" }} />
          <p>OR</p>
          <hr style={{ flex: 1, marginLeft: "10px" }} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <a href="/">
            <img
              src="https://banner2.cleanpng.com/20180324/ote/kisspng-google-logo-g-suite-google-search-chrome-5ab6e608a40b46.8129931915219358806719.jpg"
              alt="Google Logo"
              style={{ width: "30px", marginRight: "5px" }}
            />
          </a>
          <a href="/">
            <img
              src="https://1000logos.net/wp-content/uploads/2017/02/Facebook-Logosu.png"
              alt="Facebook Logo"
              style={{ width: "59px", marginRight: "5px" }}
            />
          </a>
        </div>
        <p style={{ marginTop: 10 }}>
          Don't have an account ?{" "}
          <b>
            <Link to="/signup">Register Now</Link>
          </b>
        </p>
      </form>
    </div>
  );
}