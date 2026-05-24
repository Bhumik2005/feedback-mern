import React, { useState } from "react";
import API from "../utils/api";

const UserDashboard = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: "",
    comments: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/feedback", form);
      setMessage("✅ Feedback submitted successfully!");
      setForm({ name: "", email: "", rating: "", comments: "" });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to submit feedback.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <div className="feedback-form">
      <h2>Student Feedback Form 🧑‍🎓</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="rating"
          placeholder="Rate 1 - 5"
          value={form.rating}
          onChange={handleChange}
          required
          min="1"
          max="5"
        />
        <textarea
          name="comments"
          placeholder="Your Feedback"
          rows="4"
          value={form.comments}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Submit Feedback</button>
      </form>
      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
      <button style={{ marginTop: "20px", background: "gray" }} onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default UserDashboard;
