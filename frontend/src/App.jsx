import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import CareerHighs from "./components/CareerHighs.jsx";
import ComparisonGraph from "./components/ComparisonGraph.jsx";
import SpiderChart from "./components/SpiderChart.jsx";
import SeasonStatsChart from "./components/SeasonStatsChart.jsx";
import AllStarStatsChart from "./components/AllStarStatsChart.jsx";

function App() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <div className="flex justify-between items-center py-10 px-4">
        <div className="w-1/4">
          <CareerHighs />
        </div>
        <div className="w-1/2 text-center">
          <Hero />
        </div>
        <div className="w-1/4">
          <ComparisonGraph />
        </div>
      </div>
      <div className="py-10 flex flex-wrap justify-center space-x-4">
        <SeasonStatsChart />
        <AllStarStatsChart />
      </div>
      {/* <div className="py-10">
        <SpiderChart />
      </div> */}
    </div>
  );
}

export default App;
