import React, { useEffect, useState } from "react";
import BotCollection from "./components/BotCollection";
import YourBotArmy from "./components/YourBotArmy";
import SortBar from "./components/SortBar";
import BotSpecs from "./components/BotSpecs";

function App() {
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [filters, setFilters] = useState([]);

  // Fetch bots
  useEffect(() => {
    fetch("http://localhost:8001/bots")
      .then((res) => res.json())
      .then((data) => setBots(data));
  }, []);

  // === Logic Functions ===

  const handleSelectBot = (bot) => setSelectedBot(bot);
  const handleBack = () => setSelectedBot(null);

  const handleAddToArmy = (bot) => {
    // Only one bot per class
    if (army.find((b) => b.bot_class === bot.bot_class)) {
      alert(`You already have a ${bot.bot_class} in your army!`);
      return;
    }

    // Add to army and remove from BotCollection
    setArmy([...army, bot]);
    setBots(bots.filter((b) => b.id !== bot.id));
    setSelectedBot(null);
  };

  const handleRemoveFromArmy = (bot) => {
    setArmy(army.filter((b) => b.id !== bot.id));
    setBots([...bots, bot]); // Return to collection
  };

  const handleDeleteBot = (bot) => {
    fetch(`http://localhost:8001/bots/${bot.id}`, { method: "DELETE" })
      .then(() => {
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

  // === Derived Data ===

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

  // === Render ===

  return (
    <div className="App">
      <h1>🤖 Bot Battlr</h1>
      <YourBotArmy
        bots={army}
        onRemove={handleRemoveFromArmy}
        onDelete={handleDeleteBot}
      />

      <SortBar
        sortBy={sortBy}
        onSortChange={handleSortChange}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {selectedBot ? (
        <BotSpecs
          bot={selectedBot}
          onBack={handleBack}
          onEnlist={handleAddToArmy}
        />
      ) : (
        <BotCollection bots={displayedBots} onSelect={handleSelectBot} />
      )}
    </div>
  );
}

export default App;
