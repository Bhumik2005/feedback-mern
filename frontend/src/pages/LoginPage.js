import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      const { token, role } = res.data;

      // save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      alert("Login successful!");

      // redirect based on role
      if (role === "admin") navigate("/admin-dashboard");
      else navigate("/user-dashboard");
    } catch (err) {
      console.error(err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h2>College Feedback Portal</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter your ID / Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
  Don’t have an account? <a href="/register">Register here</a>
</p>

    </div>
  );
};

export default LoginPage;
<p>
  Don’t have an account? <a href="/register">Register here</a>
</p>
