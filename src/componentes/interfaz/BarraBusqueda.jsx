import React, { useState, useEffect } from "react";

// Componente para la barra de búsqueda de canciones y álbumes.
const BarraBusqueda = ({ onSearch }) => {
  // Estado para almacenar el término de búsqueda.
  const [busqueda, setBusqueda] = useState("");

  // Función que se ejecuta cada vez que cambia el valor de la barra de búsqueda.
  const handleChange = (e) => {
    setBusqueda(e.target.value);
  };

  // Función para cargar canciones cuando cambia la búsqueda.
  useEffect(() => {

      onSearch(busqueda);

  }, [busqueda]);

  return (
    <div className="mx-4 w-full">
      {/* Input para la búsqueda de canciones y álbumes */}
      <input
        type="text"
        placeholder="Busca cualquier canción, artista..."
        className="border-cards text-sm rounded focus:ring-highlight hover:border-white focus:border-highlight block w-full p-2.5 bg-cards placeholder-neutral-600 text-white duration-300 ease-in"
        value={busqueda}
        onChange={handleChange}
      />
    </div>
  );
};

export default BarraBusqueda;
