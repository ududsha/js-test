import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setLoading(true);
    axios
      .post(`${API_URL}login`, {
        username: data.username,
        password: data.password,
      })
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response.data.status === "success") {
          localStorage.setItem("player", JSON.stringify(response.data.player));
          localStorage.setItem(
            "auth",
            JSON.stringify({ username: data.username })
          );
          navigate("/games");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
        setError(error);
      });
  };

  console.log("errors", errors);
  return (
    <div>
      {error && (
        <div className="ui negative message ">
          <i className="close icon" onClick={() => setError(null)}></i>
          <div className="header">Login failed</div>
          <p>{error.response.data.error}</p>
        </div>
      )}
      <br />
      <div className="login">
        <div className={`ui ${loading ? "active" : ""} loader`}></div>
        <div className="ui grid centered">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="fields">
              <div className="required field">
                <div className="ui icon input">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    {...register("username", { required: true })}
                  />
                  <i className="user icon"></i>
                </div>
                {errors.username?.type === "required" && (
                  <div className="ui left pointing red basic label">
                    Username is required!
                  </div>
                )}
              </div>
              <div className="required field">
                <div className="ui icon input">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                  <i className="lock icon"></i>
                </div>
                {errors.password?.type === "required" && (
                  <div className="ui left pointing red basic label">
                    Password is required!
                  </div>
                )}
              </div>

              <div className="field">
                <div className="ui icon input">
                  <input type="submit" value="Login" />
                  <i className="right chevron icon"></i>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
