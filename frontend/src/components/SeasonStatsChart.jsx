import React, { useEffect, useState } from "react";
import Sketch from "react-p5";

const SeasonStatsChart = () => {
  const [seasonStats, setSeasonStats] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState("LeBron James");
  const [selectedStats, setSelectedStats] = useState(["PTS"]);

  // Pridobi podatke iz API-ja
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/season-stats");
        const data = await response.json();

        setSeasonStats(data);
      } catch (error) {
        console.error("Error fetching season stats:", error);
      }
    };

    fetchData();
  }, []);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(800, 400).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(20);
    p5.translate(50, p5.height - 50);

    const playerStats = seasonStats
      .filter((stat) => stat.Player === selectedPlayer)
      .sort((a, b) => a.Season.localeCompare(b.Season));

    if (playerStats.length === 0) return;

    // Osnovne dimenzije
    const maxStatValue = Math.max(
      ...playerStats.map((season) =>
        selectedStats.reduce((max, stat) => Math.max(max, season[stat] || 0), 0)
      )
    );

    const xStep = (p5.width - 100) / playerStats.length;

    // Nariši osi
    p5.stroke(150);
    p5.line(0, 0, 0, -300); // Y-os
    p5.line(0, 0, p5.width - 100, 0); // X-os

    // Oznake osi
    p5.fill(255);
    p5.noStroke();
    p5.textAlign(p5.CENTER, p5.CENTER);
    for (let i = 0; i < playerStats.length; i++) {
      const x = i * xStep;
      p5.text(playerStats[i].Season, x, 20);
    }
    for (let i = 0; i <= 5; i++) {
      const y = -300 * (i / 5);
      p5.text(Math.round((maxStatValue / 5) * i), -30, y);
      p5.stroke(50);
      p5.line(0, y, p5.width - 100, y);
    }

    // Nariši grafe za izbrane statistike
    selectedStats.forEach((stat, statIndex) => {
      p5.stroke(255 - statIndex * 50, 100 + statIndex * 50, 200);
      p5.strokeWeight(2);
      p5.noFill();
      p5.beginShape();
      for (let i = 0; i < playerStats.length; i++) {
        const x = i * xStep;
        const y = -((playerStats[i][stat] || 0) / maxStatValue) * 300;
        p5.vertex(x, y);

        // Prikaži vrednosti kot točke
        p5.ellipse(x, y, 5, 5);
        p5.textSize(12);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.text(Math.round(playerStats[i][stat] || 0), x, y - 10);
      }
      p5.endShape();
    });
  };

  return (
    <div>
      <h2 className="text-center text-3xl font-bold mb-6">Season Stats Over Time</h2>
      <div className="flex justify-center space-x-4 mb-4">
        <select
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(e.target.value)}
          className="p-2 bg-gray-800 text-white rounded"
        >
          {[...new Set(seasonStats.map((stat) => stat.Player))].map((player) => (
            <option key={player} value={player}>
              {player}
            </option>
          ))}
        </select>
        {["PTS", "TRB", "AST"].map((stat) => (
          <label key={stat} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={stat}
              checked={selectedStats.includes(stat)}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedStats((prev) =>
                  prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
                );
              }}
              className="form-checkbox text-blue-500"
            />
            <span>{stat}</span>
          </label>
        ))}
      </div>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default SeasonStatsChart;
