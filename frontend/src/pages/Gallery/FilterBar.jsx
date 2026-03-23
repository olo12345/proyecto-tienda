import React from "react";

function FilterBar({ filter, setFilter }) {
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value
    });
  };

  return (
    <div style={containerStyle}>
      
      {/* Filtro por Autor */}
      <input
        type="text"
        name="author"
        placeholder="🔍 Buscar por autor..."
        value={filter.author}
        onChange={handleChange}
        style={inputStyle}
        onFocus={(e) => e.target.style.borderColor = "var(--accent-cyan)"}
        onBlur={(e) => e.target.style.borderColor = "var(--bg-border)"}
      />

      {/* Filtro por Categoría */}
      <input
        type="text"
        name="category"
        placeholder="📚 Categoría (ej: Gin, Código)"
        value={filter.category}
        onChange={handleChange}
        style={inputStyle}
        onFocus={(e) => e.target.style.borderColor = "var(--accent-cyan)"}
        onBlur={(e) => e.target.style.borderColor = "var(--bg-border)"}
      />

      {/* Filtro por Precio Mínimo */}
      <input
        type="number"
        name="minPrice"
        placeholder="Min $ (CLP)"
        value={filter.minPrice}
        onChange={handleChange}
        style={{ ...inputStyle, maxWidth: "150px" }}
        onFocus={(e) => e.target.style.borderColor = "var(--accent-cyan)"}
        onBlur={(e) => e.target.style.borderColor = "var(--bg-border)"}
      />

      {/* Filtro por Precio Máximo */}
      <input
        type="number"
        name="maxPrice"
        placeholder="Max $ (CLP)"
        value={filter.maxPrice}
        onChange={handleChange}
        style={{ ...inputStyle, maxWidth: "150px" }}
        onFocus={(e) => e.target.style.borderColor = "var(--accent-cyan)"}
        onBlur={(e) => e.target.style.borderColor = "var(--bg-border)"}
      />

      {/* Botón para limpiar filtros */}
      <button 
        onClick={() => setFilter({ author: "", minPrice: "", maxPrice: "", category: "" })}
        style={resetBtnStyle}
      >
        Limpiar
      </button>
    </div>
    
  );
}

//  ESTILOS
const containerStyle = {
  marginBottom: "30px",
  display: "flex",
  gap: "15px",
  flexWrap: "wrap",
  justifyContent: "center",
  padding: "20px",
  backgroundColor: "var(--bg-card)",
  borderRadius: "8px",
  border: "1px solid var(--bg-border)",
  boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
};

const inputStyle = {
  flex: "1",
  minWidth: "180px",
  padding: "12px",
  backgroundColor: "var(--bg-space)",
  border: "1px solid var(--bg-border)",
  color: "var(--text-light)",
  borderRadius: "4px",
  outline: "none",
  transition: "all 0.3s ease",
  fontSize: "0.9rem"
};

const resetBtnStyle = {
  padding: "12px 20px",
  backgroundColor: "transparent",
  color: "var(--text-muted)",
  border: "1px solid var(--text-muted)",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
  textTransform: "uppercase",
  fontSize: "0.8rem",
  transition: "all 0.2s ease"
};

export default FilterBar;