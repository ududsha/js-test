import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Game = () => {
  const { parameter } = useParams();
  useEffect(() => {
    comeon.game.launch(parameter);
  }, []);
  const navigate = useNavigate();
  return (
    <div className="ingame">
      <div className="ui grid centered">
        <div className="three wide column">
          <div className="ui right floated secondary button inverted" onClick={() => {navigate('/games')}}>
            <i className="left chevron icon"></i>Back
          </div>
        </div>
        <div className="ten wide column">
          <div id="game-launch"></div>
        </div>
        <div className="three wide column"></div>
      </div>
    </div>
  );
};

export default Game;
