import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      // Save user
      localStorage.setItem("user", JSON.stringify(data.user));

      alert(data.message);

      // Redirect to chatbot
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Something went wrong.");
    }
  };

  return (
  <div className="loginPage">
    <div className="loginCard">

      <h1>SigmaGPT</h1>
      <p>Welcome back! Sign in to continue.</p>

      <form onSubmit={handleLogin}>

        <div className="inputGroup">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </div>

        <div className="inputGroup">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>

        <button className="loginBtn" type="submit">
          Login
        </button>

      </form>

      <div className="bottomText">
        Don't have an account?{" "}
        <span
          style={{ cursor: "pointer", color: "#10a37f" }}
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </span>
      </div>

    </div>
  </div>
);
}

export default Login;