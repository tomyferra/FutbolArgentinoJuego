import { Routes, Route } from "react-router-dom";
import Base from "./components/Base";
import './App.css';
import LeaderBoard from "./components/Leaderboard";
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  return (
      <div className="App mt-auto d-flex flex-column min-vh-100">
        <SpeedInsights />
        <Routes>
          <Route path="/" element={<Base />} />
          <Route path="leaderboard" element={<LeaderBoard />} />
        </Routes>
      </div>
  );
}

export default App;