import React, { useEffect, useState } from "react";
import Sketch from "react-p5";

const ComparisonGraph = () => {
  const [playerData, setPlayerData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState("Total Salaries"); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint =
          selectedMetric === "Total Salaries"
            ? "http://localhost:5000/api/salaries"
            : "http://localhost:5000/api/game-stats";
        const response = await fetch(endpoint);
        const data = await response.json();

        // Aggregate data for each player based on selected metric
        const aggregatedData =
          selectedMetric === "Total Salaries"
            ? data.reduce((acc, salary) => {
                const player = salary.Player;
                const rawSalary = salary.Salary || "0";

                // Remove dollar sign and parse to float number
                const numericSalary = parseFloat(rawSalary.replace(/\$/g, ""));
                acc[player] = (acc[player] || 0) + numericSalary;
                return acc;
              }, {})
            : data.reduce((acc, game) => {
                const player = game.Player;

                if (!acc[player]) acc[player] = 0;

                // Logic for Total Games and Total Wins
                if (selectedMetric === "Total Games") {
                  acc[player] += 1; 
                } else if (
                  selectedMetric === "Total Wins" &&
                  game.Result === "W"
                ) {
                  acc[player] += 1;
                } else {
                  // Other metrics
                  const value = parseFloat(game[selectedMetric] || 0);
                  acc[player] += value;
                }
                return acc;
              }, {});

        const players = Object.keys(aggregatedData).map((player) => ({
          name: player,
          total: aggregatedData[player],
        }));

        setPlayerData(players);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedMetric]);

  // Function for formatting numeral values
  const formatNumber = (num) => {
    if (num >= 1e6) {
      return `$${(num / 1e6).toFixed(1)}M`;
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(450, 400).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(20);
    const margin = 50;
    const graphWidth = p5.width - 2 * margin;
    const barWidth = graphWidth / playerData.length - 30;
    const maxTotal = Math.max(...playerData.map((p) => p.total));
    const offsetX = margin + 40;

    // Definitions of player's colors
    const colors = {
      "Michael Jordan": p5.color(200, 75, 75), 
      "Kobe Bryant": p5.color(100, 50, 150), 
      "LeBron James": p5.color(210, 170, 50), 
    };

    // Y-axis with markings and grid
    p5.stroke(100);
    for (let i = 0; i <= 5; i++) {
      const y = p5.map(i, 0, 5, p5.height - margin, margin);
      p5.line(offsetX, y, p5.width - margin, y);
      p5.noStroke();
      p5.fill(200);
      p5.textAlign(p5.RIGHT, p5.CENTER);
      const value = (maxTotal / 5) * i;
      p5.text(
        selectedMetric === "Total Salaries"
          ? formatNumber(value)
          : formatNumber(Math.round(value)),
        offsetX - 10,
        y
      );
    }

    // Colums
    playerData.forEach((player, index) => {
      const x = offsetX + index * (barWidth + 30);
      const barHeight = p5.map(
        player.total,
        0,
        maxTotal,
        0,
        p5.height - 2 * margin
      );

      p5.fill(colors[player.name] || p5.color(150));
      p5.rect(x, p5.height - margin, barWidth, -barHeight);

      // Player name
      p5.fill(200);
      p5.textSize(12);
      p5.textAlign(p5.CENTER, p5.BOTTOM);
      p5.text(player.name, x + barWidth / 2, p5.height - margin + 15);

      // Metric value
      p5.textAlign(p5.CENTER, p5.BOTTOM);
      p5.text(
        formatNumber(player.total),
        x + barWidth / 2,
        p5.height - margin - barHeight - 10
      );
    });

    // X-axis
    p5.stroke(200);
    p5.line(
      offsetX,
      p5.height - margin,
      p5.width - margin + 10,
      p5.height - margin
    );
  };

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mb-4">
        Comparison: {selectedMetric}
      </h2>
      <div className="text-center mb-4">
        <select
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value)}
          className="p-2 bg-gray-800 text-white rounded"
        >
          <option value="Total Salaries">Total Salaries</option>
          <option value="PTS">Total Points</option>
          <option value="AST">Total Assists</option>
          <option value="TRB">Total Rebounds</option>
          <option value="Total Games">Total Games</option>
          <option value="Total Wins">Total Wins</option>
        </select>
      </div>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default ComparisonGraph;
