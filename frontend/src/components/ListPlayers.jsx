import { useEffect, useState } from 'react';

function Players() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/players');
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">GOAT Debate Players</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {players.map((player) => (
          <div
            key={player._id}
            className="bg-white shadow-md p-4 rounded-lg text-center border border-gray-200"
          >
            <h2 className="text-xl font-semibold">{player.name}</h2>
            <p className="text-gray-600">{player.position}</p>
            <p className="text-gray-600">{player.team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Players;
