import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleTogglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <header
      className="relative flex items-center justify-center"
      style={{ backgroundColor: "rgb(50, 49, 56)", height: "120px" }}
    >
      <img
        src="/logo.png"
        alt="GOAT Logo"
        className="h-24 w-auto"
      />

      {/* About Icon */}
      <FaInfoCircle
        className="absolute top-1/2 right-4 text-gray-400 text-3xl cursor-pointer hover:text-white transform -translate-y-1/2"
        title="About"
        onClick={handleTogglePopup}
      />

      {/* Popup */}
      {isPopupOpen && (
        <div className="absolute top-16 right-4 bg-gray-800 text-white p-4 rounded shadow-lg w-80">
          <h2 className="text-xl font-bold mb-2">About</h2>
          <p>
            This site visualizes data for the "Greatest of All Time" (G.O.A.T.) debate, comparing basketball legends across multiple statistics.
          </p>
          <ul className="mt-2 text-sm">
            <li>
              <strong>PTS:</strong> Points
            </li>
            <li>
              <strong>TRB:</strong> Rebounds
            </li>
            <li>
              <strong>AST:</strong> Assists
            </li>
            <li>
              <strong>STL:</strong> Steals
            </li>
            <li>
              <strong>BLK:</strong> Blocks
            </li>
            <li>
              <strong>TOV:</strong> Turnovers
            </li>
          </ul>
          <button
            onClick={handleTogglePopup}
            className="mt-4 bg-blue-600 hover:bg-blue-500 text-white py-1 px-4 rounded"
          >
            Close
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
