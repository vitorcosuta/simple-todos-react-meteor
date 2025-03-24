import { Meteor } from "meteor/meteor";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = ({ currentUser }) => {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
      
  const submit = (e) => {
    e.preventDefault();
    setLoading(true);

    Meteor.loginWithPassword(username, password, (err) => {
      setLoading(false);
      if(err){
        console.error("ERRO", err);
      }
    });
  };

  useEffect(() => {
    if(currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <form onSubmit={submit} className="login-form">
        <div>
            <label htmlFor="username">Username</label>

            <input
            type="text"
            placeholder="Username"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
            />
        </div>

        <div>
            <label htmlFor="password">Password</label>

            <input
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <div>
            <button type="submit">Log In</button>
        </div>
    </form>
  );
};