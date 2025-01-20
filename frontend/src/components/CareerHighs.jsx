import React, { useEffect, useState } from "react";

const CareerHighs = () => {
  const [careerHighs, setCareerHighs] = useState([]);
  const [hoveredGame, setHoveredGame] = useState(null); 
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 }); 

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/game-highs");
        const data = await response.json();

        // Obdelava career highs
        const playerHighs = {};
        data.forEach((game) => {
          const player = game.Player;
          if (!playerHighs[player]) {
            playerHighs[player] = {
              name: player,
              points_high: game.PTS || 0,
              points_game: game,
              rebounds_high: game.TRB || 0,
              rebounds_game: game,
              assists_high: game.AST || 0,
              assists_game: game,
              steals_high: game.STL || 0,
              steals_game: game,
              blocks_high: game.BLK || 0,
              blocks_game: game,
              turnovers_high: game.TOV || 0,
              turnovers_game: game,
            };
          } else {
            if (game.PTS > playerHighs[player].points_high) {
              playerHighs[player].points_high = game.PTS;
              playerHighs[player].points_game = game;
            }
            if (game.TRB > playerHighs[player].rebounds_high) {
              playerHighs[player].rebounds_high = game.TRB;
              playerHighs[player].rebounds_game = game;
            }
            if (game.AST > playerHighs[player].assists_high) {
              playerHighs[player].assists_high = game.AST;
              playerHighs[player].assists_game = game;
            }
            if (game.STL > playerHighs[player].steals_high) {
              playerHighs[player].steals_high = game.STL;
              playerHighs[player].steals_game = game;
            }
            if (game.BLK > playerHighs[player].blocks_high) {
              playerHighs[player].blocks_high = game.BLK;
              playerHighs[player].blocks_game = game;
            }
            if (game.TOV > playerHighs[player].turnovers_high) {
              playerHighs[player].turnovers_high = game.TOV;
              playerHighs[player].turnovers_game = game;
            }
          }
        });

        setCareerHighs(Object.values(playerHighs));
      } catch (error) {
        console.error("Error fetching career highs:", error);
      }
    };

    fetchData();
  }, []);

  // Function for handling popups
  const handleMouseEnter = (game, event) => {
    setHoveredGame(game);
    const rect = event.target.getBoundingClientRect();
    setPopupPosition({
      x: rect.left + window.scrollX + rect.width / 2 - 20,
      y: rect.top + window.scrollY - 250,
    });
  };

  // Function for closing popups
  const handleMouseLeave = () => {
    setHoveredGame(null);
  };

  return (
    <div className="p-6 relative">
      <h2 className="text-center text-3xl font-bold mb-6">Career Highs</h2>
      <ul className="space-y-4">
        {careerHighs.map((player) => (
          <li
            key={player.name}
            className="p-4 bg-gray-800 text-white rounded shadow-md"
          >
            <h3 className="text-xl font-semibold">{player.name}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p
                  className="hover:underline cursor-pointer"
                  onMouseEnter={(e) =>
                    handleMouseEnter(player.points_game, e)
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  Points: {player.points_high}
                </p>
                <p
                  className="hover:underline cursor-pointer"
                  onMouseEnter={(e) =>
                    handleMouseEnter(player.rebounds_game, e)
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  Rebounds: {player.rebounds_high}
                </p>
                <p
                  className="hover:underline cursor-pointer"
                  onMouseEnter={(e) =>
                    handleMouseEnter(player.assists_game, e)
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  Assists: {player.assists_high}
                </p>
              </div>
              <div>
                <p
                  className="hover:underline cursor-pointer"
                  onMouseEnter={(e) =>
                    handleMouseEnter(player.steals_game, e)
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  Steals: {player.steals_high}
                </p>
                <p
                  className="hover:underline cursor-pointer"
                  onMouseEnter={(e) =>
                    handleMouseEnter(player.blocks_game, e)
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  Blocks: {player.blocks_high}
                </p>
                <p
                  className="hover:underline cursor-pointer"
                  onMouseEnter={(e) =>
                    handleMouseEnter(player.turnovers_game, e)
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  Turnovers: {player.turnovers_high}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Popup for hover data */}
      {hoveredGame && (
        <div
          className="absolute bg-gray-700 text-white p-4 rounded shadow-md z-50"
          style={{
            top: `${popupPosition.y}px`,
            left: `${popupPosition.x}px`,
          }}
        >
          <h4 className="text-lg font-bold mb-2">{hoveredGame.Player}</h4>
          <p>
            <strong>Season:</strong> {hoveredGame.Season}
          </p>
          <p>
            <strong>Team:</strong> {hoveredGame.Tm}
          </p>
          <p>
            <strong>Points:</strong> {hoveredGame.PTS}
          </p>
          <p>
            <strong>Rebounds:</strong> {hoveredGame.TRB}
          </p>
          <p>
            <strong>Assists:</strong> {hoveredGame.AST}
          </p>
          <p>
            <strong>Steals:</strong> {hoveredGame.STL}
          </p>
          <p>
            <strong>Blocks:</strong> {hoveredGame.BLK}
          </p>
          <p>
            <strong>Turnovers:</strong> {hoveredGame.TOV}
          </p>
        </div>
      )}
    </div>
  );
};

export default CareerHighs;
