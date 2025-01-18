import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Graph from './components/Graph.jsx';
import SpiderChart from './components/SpiderChart.jsx';
import SeasonStatsChart from './components/SeasonStatsChart.jsx';

function App() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <Hero />
      <div className="py-10">
        <SeasonStatsChart />
      </div>
      <div className="py-10">
        <Graph />
      </div>
      <div className="py-10">
        <SpiderChart />
      </div>
    </div>
  );
}

export default App;
