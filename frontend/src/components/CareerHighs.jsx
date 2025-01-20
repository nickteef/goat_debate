import React, { useEffect, useState } from "react";

const CareerHighs = () => {
  const [careerHighs, setCareerHighs] = useState([]);

  // Pridobi podatke iz API-ja in obdelaj career highs
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
              rebounds_high: game.TRB || 0,
              assists_high: game.AST || 0,
            };
          } else {
            playerHighs[player].points_high = Math.max(
              playerHighs[player].points_high,
              game.PTS || 0
            );
            playerHighs[player].rebounds_high = Math.max(
              playerHighs[player].rebounds_high,
              game.TRB || 0
            );
            playerHighs[player].assists_high = Math.max(
              playerHighs[player].assists_high,
              game.AST || 0
            );
          }
        });

        // Pretvori objekt v seznam
        setCareerHighs(Object.values(playerHighs));
      } catch (error) {
        console.error("Error fetching career highs:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-center text-3xl font-bold mb-6">Career Highs</h2>
      <ul className="space-y-4">
        {careerHighs.map((player) => (
          <li
            key={player.name}
            className="p-4 bg-gray-800 text-white rounded shadow-md"
          >
            <h3 className="text-xl font-semibold">{player.name}</h3>
            <p>Points: {player.points_high}</p>
            <p>Rebounds: {player.rebounds_high}</p>
            <p>Assists: {player.assists_high}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CareerHighs;
