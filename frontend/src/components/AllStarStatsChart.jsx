import React, { useEffect, useState } from "react";
import Sketch from "react-p5";

const AllStarStatsChart = () => {
  const [seasonStats, setSeasonStats] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState("LeBron James");
  const [selectedStats, setSelectedStats] = useState(["PTS"]);

  // Pridobi podatke iz API-ja
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/allstar-stats");
        const data = await response.json();

        setSeasonStats(data);

        // Nastavi privzete vrednosti za igralca
        if (data.length > 0) {
          const defaultPlayer = data[0].Player; // Privzeti prvi igralec v podatkih
          setSelectedPlayer(defaultPlayer);
        }
      } catch (error) {
        console.error("Error fetching season stats:", error);
      }
    };

    fetchData();
  }, []);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(900, 400).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(20);
    p5.translate(50, p5.height - 50);

    let hoveredPoint = null;
    
    if (!selectedPlayer) return;

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
    for (let i = 0; i < playerStats.length; i++) {
      const x = i * xStep;
      p5.push();
      p5.translate(x, 20); // Premakni na pozicijo oznake
      p5.rotate(-p5.PI / 4); // Rotiraj za 45 stopinj (PI/4 radianov)
      p5.text(playerStats[i].Season, 0, 0); // Napiši oznako
      p5.pop();
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
      p5.strokeWeight(1);
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

        // Preveri, ali je miška nad točko
        const mouseX = p5.mouseX - 50; // Prilagodimo, ker smo premaknili koordinatni sistem
        const mouseY = p5.mouseY - (p5.height - 50);

        if (p5.dist(mouseX, mouseY, x, y) < 10) {
          hoveredPoint = {
            season: playerStats[i].Season,
            stat,
            value: playerStats[i][stat],
            x,
            y,
          };
        }
      }
      p5.endShape();
    });

    // Prikaz popupa za hovered točko
    if (hoveredPoint) {
      p5.fill(50);
      p5.stroke(255);
      p5.rect(hoveredPoint.x + 10, hoveredPoint.y - 30, 100, 35, 5); // Okvir popupa

      p5.noStroke();
      p5.fill(255);
      p5.textAlign(p5.LEFT, p5.TOP);
      p5.textSize(12);
      p5.text(
        `${hoveredPoint.stat}: ${hoveredPoint.value}\nSeason: ${hoveredPoint.season}`,
        hoveredPoint.x + 15,
        hoveredPoint.y - 25
      );
    }
  };

  return (
    <div>
      <h2 className="text-center text-3xl font-bold mb-6">
        All-Star Stats Over Time
      </h2>
      <div className="flex justify-center space-x-4 mb-4">
        <select
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(e.target.value)}
          className="p-2 bg-gray-800 text-white rounded"
        >
          {[...new Set(seasonStats.map((stat) => stat.Player))].map(
            (player) => (
              <option key={player} value={player}>
                {player}
              </option>
            )
          )}
        </select>
        {["PTS", "TRB", "AST", "STL", "BLK", "TOV"].map((stat) => (
          <label key={stat} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={stat}
              checked={selectedStats.includes(stat)}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedStats((prev) =>
                  prev.includes(value)
                    ? prev.filter((s) => s !== value)
                    : [...prev, value]
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

export default AllStarStatsChart;
