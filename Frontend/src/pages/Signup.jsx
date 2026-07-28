import { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
     const res = await fetch("https://sigmagpt-snv0.onrender.com/api/auth/signup", {
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

      alert(data.message);

      // Redirect to Login page
      navigate("/login");

    } catch (err) {
      console.log(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="signupPage">
      <div className="signupCard">

        <h1>SigmaGPT</h1>
        <p>Create your account</p>

        <form onSubmit={handleSignup}>

          <div className="inputGroup">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
            />
          </div>

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

          <button className="signupBtn" type="submit">
            Sign Up
          </button>
          <div className="bottomText">
  Already have an account?{" "}
  <span
    onClick={() => navigate("/login")}
    style={{ cursor: "pointer", color: "#10a37f" }}
  >
    Login
  </span>
</div>

        </form>

      </div>
    </div>
  );
}

export default Signup;