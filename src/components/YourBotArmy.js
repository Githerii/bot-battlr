import React from "react";
import BotCard from "./BotCard";

function YourBotArmy({ bots, onRemove, onDelete }) {
  return (
    <div className="your-bot-army">
      <h2>Your Bot Army</h2>
      {bots.map((bot) => (
        <BotCard
          key={bot.id}
          bot={bot}
          handleClick={() => onRemove(bot)}
          handleDelete={() => onDelete(bot)}
        />
      ))}
    </div>
  );
}

export default YourBotArmy;
