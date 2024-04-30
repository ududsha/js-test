import React from "react";
import { useNavigate } from "react-router-dom";

const Games = ({ games }) => {
  const navigate = useNavigate();
  return (
    <div className="twelve wide column">
      <h3 className="ui dividing header">Games</h3>
      <div className="ui relaxed divided game items links">
        {/*<--game item template -->*/}
        {games.map((game, index) => {
          return (
            <div key={index} className="game item">
              <div className="ui small image">
                <img src={game.icon} alt="game-icon" />
              </div>
              <div className="content">
                <div className="header">
                  <b className="name">{game.name}</b>
                </div>
                <div className="description">{game.description}</div>
                <div className="extra">
                  <div
                    className="play ui right floated secondary button inverted"
                    onClick={() => navigate(`/game/${game.code}`)}
                  >
                    Play
                    <i className="right chevron icon"></i>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/*<--end game item template -->*/}
      </div>
    </div>
  );
};

export default Games;
