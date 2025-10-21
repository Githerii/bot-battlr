import React from "react";
import BotCard from "./BotCard";

function BotCollection({ bots, onSelect }) {
  return (
    <div className="bot-collection">
      {bots.map((bot) => (
        <BotCard key={bot.id} bot={bot} handleClick={() => onSelect(bot)} />
      ))}
    </div>
  );
}

export default BotCollection;
