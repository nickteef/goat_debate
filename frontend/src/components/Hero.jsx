import React, { useState, useEffect } from "react";

function Hero() {
  const [votes, setVotes] = useState({});
  const [totalVotes, setTotalVotes] = useState(0);
  const [userVote, setUserVote] = useState(null);

  // Fetch current votes
  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/votes");
        const data = await response.json();
        setVotes(data);
        setTotalVotes(Object.values(data).reduce((acc, val) => acc + val, 0));
      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    };

    fetchVotes();
  }, []);

  // Submit a vote
  const handleVote = async (player) => {
    try {
      const response = await fetch("http://localhost:5000/api/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ player }),
      });
      const data = await response.json();
      setVotes(data); 
      setTotalVotes(Object.values(data).reduce((acc, val) => acc + val, 0));
      setUserVote(player);
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <section className="text-center py-10 bg-black text-white">
      <h2 className="text-5xl font-bold mb-12 tracking-wider">
        WHO IS YOUR G.O.A.T.?
      </h2>
      <div className="flex justify-center gap-16">
        {["Kobe Bryant", "LeBron James", "Michael Jordan"].map((player) => (
          <div
            key={player}
            onClick={() => handleVote(player)}
            className={`flex flex-col items-center cursor-pointer transition-transform ${
              userVote === player
                ? "scale-110 border-blue-500"
                : "hover:scale-105"
            }`}
          >
            <div
              className={`border-4 rounded-lg p-2 transition-all ${
                userVote === player
                  ? "border-blue-500"
                  : "border-gray-700 hover:border-gray-500"
              }`}
            >
              <img
                src={`/${player.toLowerCase().replace(" ", "")}.png`}
                alt={player}
                className="w-52 h-80 object-contain"
              />
            </div>
            <p className="mt-6 text-2xl font-semibold">{player}</p>
            {userVote && (
              <p className="text-lg text-gray-400">
                {votes[player]
                  ? `${((votes[player] / totalVotes) * 100).toFixed(1)}%`
                  : "0%"}
              </p>
            )}
          </div>
        ))}
      </div>
      <p className="mt-8 text-lg">
        Total Votes: <span className="font-bold">{totalVotes}</span>
      </p>
    </section>
  );
}

export default Hero;
