import React, { useEffect, useState } from "react";
import Sketch from "react-p5";

const SpiderChart = () => {
  const [careerHighs, setCareerHighs] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectedStats, setSelectedStats] = useState(["Points", "Rebounds", "Assists"]);

  // Pridobi podatke iz API-ja
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
              Points: game.PTS || 0,
              Rebounds: game.TRB || 0,
              Assists: game.AST || 0,
            };
          } else {
            playerHighs[player].Points = Math.max(playerHighs[player].Points, game.PTS || 0);
            playerHighs[player].Rebounds = Math.max(playerHighs[player].Rebounds, game.TRB || 0);
            playerHighs[player].Assists = Math.max(playerHighs[player].Assists, game.AST || 0);
          }
        });

        setCareerHighs(Object.values(playerHighs));
        setSelectedPlayers(Object.values(playerHighs).map((player) => player.name)); // Privzeto vsi igralci
      } catch (error) {
        console.error("Error fetching career highs:", error);
      }
    };

    fetchData();
  }, []);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(600, 600).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(20);
    p5.translate(p5.width / 2, p5.height / 2);

    const maxRadius = 250;
    const numAxes = selectedStats.length;
    const angleStep = (2 * Math.PI) / numAxes;

    // Nariši mrežo (5 nivojev)
    p5.stroke(100);
    p5.strokeWeight(1);
    for (let level = 1; level <= 5; level++) {
      const radius = (maxRadius / 5) * level;
      p5.beginShape();
      for (let i = 0; i < numAxes; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        p5.vertex(x, y);
      }
      p5.endShape(p5.CLOSE);
    }

    // Nariši osi in oznake
    selectedStats.forEach((stat, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const x = maxRadius * Math.cos(angle);
      const y = maxRadius * Math.sin(angle);
      p5.stroke(150);
      p5.line(0, 0, x, y);
      p5.noStroke();
      p5.fill(255);
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.textSize(14);
      p5.text(stat, x * 1.2, y * 1.2);
    });

    // Nariši podatke za izbrane igralce
    const colors = [
      p5.color(66, 135, 245, 150),
      p5.color(245, 66, 87, 150),
      p5.color(66, 245, 137, 150),
    ];

    selectedPlayers.forEach((playerName, playerIndex) => {
      const player = careerHighs.find((p) => p.name === playerName);
      if (!player) return;

      p5.stroke(colors[playerIndex]);
      p5.strokeWeight(2);
      p5.fill(colors[playerIndex]);
      p5.beginShape();
      selectedStats.forEach((stat, i) => {
        const value = player[stat] || 0;
        const normalizedValue = value / 100; // Normaliziraj vrednosti
        const angle = i * angleStep - Math.PI / 2;
        const x = maxRadius * normalizedValue * Math.cos(angle);
        const y = maxRadius * normalizedValue * Math.sin(angle);
        p5.vertex(x, y);

        // Oznake vrednosti
        p5.noStroke();
        p5.fill(255);
        p5.textSize(12);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.text(Math.round(value), x * 1.1, y * 1.1);
      });
      p5.endShape(p5.CLOSE);
    });
  };

  return (
    <div>
      <h2 className="text-center text-3xl font-bold mb-6">Interactive Spider Chart</h2>
      <div className="flex justify-center space-x-4 mb-6">
        {careerHighs.map((player) => (
          <label key={player.name} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={player.name}
              checked={selectedPlayers.includes(player.name)}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedPlayers((prev) =>
                  prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
                );
              }}
              className="form-checkbox text-blue-500"
            />
            <span>{player.name}</span>
          </label>
        ))}
      </div>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default SpiderChart;
