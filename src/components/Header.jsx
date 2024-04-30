import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../constants";

const Header = ({ setSearchTerm }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth"));
  const player = JSON.parse(localStorage.getItem("player"));

  const debounce = (func, delay) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const onLogout = () => {
    setLoading(true);
    axios
      .post(`${API_URL}logout`, {
        username: auth.username,
      })
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response.data.status === "success") {
          localStorage.removeItem("player");
          localStorage.removeItem("auth");
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
        setError(error);
      });
  };

  const onSearch = (e) => {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
  };

  const debouncedSearch = debounce(onSearch, 300);
  return (
    <>
      <div className={`ui ${loading ? "active" : ""} loader`}></div>
      {error && (
        <div className="ui negative message ">
          <i className="close icon" onClick={() => setError(null)}></i>
          <div className="header">Logout failed</div>
          <p>{error.response.data.error}</p>
        </div>
      )}
      <div className="ui grid centered">
        <div className="twelve wide column">
          <div className="ui list">
            {/*<--player item template -->*/}
            <div className="player item">
              <img
                className="ui avatar image"
                src="/images/avatar/eric.jpg"
                alt="avatar"
              />
              <div className="content">
                <div className="header">
                  <b className="name">{player?.name}</b>
                </div>
                <div className="description event">{player?.event}</div>
              </div>
            </div>
            {/*<--end player item template -->*/}
          </div>
          <div
            className="logout ui left floated secondary button inverted"
            onClick={() => onLogout()}
          >
            <i className="left chevron icon"></i>Log Out
          </div>
        </div>
        <div className="four wide column">
          <div className="search ui small icon input ">
            <input
              type="text"
              placeholder="Search Game"
              onChange={(e) => debouncedSearch(e)}
            />
            <i className="search icon"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
