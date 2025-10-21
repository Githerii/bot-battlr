import React, { useEffect, useState } from "react";
import BotCollection from "./components/BotCollection";
import YourBotArmy from "./components/YourBotArmy";
import SortBar from "./components/SortBar";
import BotSpecs from "./components/BotSpecs";
import "./App.css";

function App() {
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/bots")
      .then((res) => res.json())
      .then((data) => setBots(data));
  }, []);

  const handleSelectBot = (bot) => setSelectedBot(bot);
  const handleBack = () => setSelectedBot(null);

const handleAddToArmy = (bot) => {
  // Prevent enlisting more than one bot per class
  if (army.find((b) => b.bot_class === bot.bot_class)) {
    alert(`You already have a ${bot.bot_class} in your army!`);
    return;
  }

  // Prevent duplicates by ID
  if (army.find((b) => b.id === bot.id)) {
    return;
  }

  setArmy([...army, bot]);
  setSelectedBot(null);
};


 const handleRemoveFromArmy = (bot) => {
  setArmy(army.filter((b) => b.id !== bot.id));
};

  const handleDeleteBot = (bot) => {
    fetch(`http://localhost:8001/bots/${bot.id}`, { method: "DELETE" }).then(() => {
      setArmy(army.filter((b) => b.id !== bot.id));
      setBots(bots.filter((b) => b.id !== bot.id));
    });
  };

  const handleSortChange = (criteria) => setSortBy(criteria);

  const handleFilterChange = (botClass) => {
    if (filters.includes(botClass)) {
      setFilters(filters.filter((cls) => cls !== botClass));
    } else {
      setFilters([...filters, botClass]);
    }
  };

  let displayedBots = [...bots];

  if (filters.length > 0) {
    displayedBots = displayedBots.filter((b) => filters.includes(b.bot_class));
  }

  if (sortBy === "health") {
    displayedBots.sort((a, b) => b.health - a.health);
  } else if (sortBy === "damage") {
    displayedBots.sort((a, b) => b.damage - a.damage);
  } else if (sortBy === "armor") {
    displayedBots.sort((a, b) => b.armor - a.armor);
  }

  return (
    <div className="App">
      <h1>🤖 Bot Battlr</h1>

      <div className="main-layout">
        {/* Left side: bots list/specs */}
        <div className="left-panel">
          <SortBar
            sortBy={sortBy}
            onSortChange={handleSortChange}
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          {selectedBot ? (
            <BotSpecs bot={selectedBot} onBack={handleBack} onEnlist={handleAddToArmy} />
          ) : (
            <BotCollection bots={displayedBots} onSelect={handleSelectBot} />
          )}
        </div>

        {/* Right side: your army */}
        <div className="right-panel">
          <YourBotArmy bots={army} onRemove={handleRemoveFromArmy} onDelete={handleDeleteBot} />
        </div>
      </div>
    </div>
  );
}

export default App;
