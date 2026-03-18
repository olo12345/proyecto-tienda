import React from "react";

function FilterBar({ filter, setFilter }) {
  return (
    <div style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <input
        type="text"
        placeholder="Autor"
        value={filter.author}
        onChange={(e) => setFilter({ ...filter, author: e.target.value })}
      />

      <input
        type="number"
        placeholder="Precio mínimo"
        value={filter.minPrice}
        onChange={(e) => setFilter({ ...filter, minPrice: e.target.value })}
      />

      <input
        type="number"
        placeholder="Precio máximo"
        value={filter.maxPrice}
        onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })}
      />

      <input
        type="text"
        placeholder="Categoría"
        value={filter.category}
        onChange={(e) => setFilter({ ...filter, category: e.target.value })}
      />
    </div>
  );
}

export default FilterBar;