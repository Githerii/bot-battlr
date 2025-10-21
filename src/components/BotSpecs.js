import React from "react";

function BotSpecs({ bot, onBack, onEnlist }) {
  return (
    <div className="bot-specs">
      <img src={bot.avatar_url} alt={bot.name} />
      <h2>{bot.name}</h2>
      <p>{bot.catchphrase}</p>
      <p><strong>Class:</strong> {bot.bot_class}</p>
      <p>💖 Health: {bot.health}</p>
      <p>⚔️ Damage: {bot.damage}</p>
      <p>🛡️ Armor: {bot.armor}</p>
      <div className="buttons">
        <button onClick={onBack}>Back</button>
        <button onClick={() => onEnlist(bot)}>Enlist</button>
      </div>
    </div>
  );
}

export default BotSpecs;
