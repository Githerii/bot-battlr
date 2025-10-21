import React from "react";

const BOT_CLASSES = ["Support", "Medic", "Assault", "Defender", "Captain", "Witch"];

function SortBar({ sortBy, onSortChange, filters, onFilterChange }) {
  return (
    <div className="sort-bar">
      <h3>Sort & Filter</h3>

      <div className="sort-section">
        <label>Sort by:</label>
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="">None</option>
          <option value="health">Health</option>
          <option value="damage">Damage</option>
          <option value="armor">Armor</option>
        </select>
      </div>

      <div className="filter-section">
        {BOT_CLASSES.map((cls) => (
          <label key={cls}>
            <input
              type="checkbox"
              checked={filters.includes(cls)}
              onChange={() => onFilterChange(cls)}
            />
            {cls}
          </label>
        ))}
      </div>
    </div>
  );
}

export default SortBar;
