import React, { useState, useEffect, useContext, Fragment } from "react";
import { useCanciones } from "../../hooks/useCanciones.js";

// Componente para la barra de búsqueda de canciones y álbumes.
const BarraBusqueda = ({ onSearch }) => {
  // Estado para almacenar el término de búsqueda.
  const [busqueda, setBusqueda] = useState("");
  // Hook personalizado para cargar canciones.
  const { cargarCanciones } = useCanciones();

  // Función que se ejecuta cada vez que cambia el valor de la barra de búsqueda.
  const handleChange = (e) => {
    setBusqueda(e.target.value);
  };

  // Función para cargar canciones cuando cambia la búsqueda.
  useEffect(() => {
    const cargarCancionesPorBusqueda = async () => {
      // Limita las consultas a 10 si el término de búsqueda es mayor que 2 caracteres.
      if (busqueda.length > 2) {
        await cargarCanciones(busqueda);
      }
    };

    cargarCancionesPorBusqueda();
    onSearch(busqueda); // Llama a la función de búsqueda de álbumes
  }, [busqueda]);

  return (
    <Fragment>
      <div className="mx-4 w-full">
        {/* Input para la búsqueda de canciones y álbumes */}
        <input
          type="text"
          placeholder="Buscar canciones y álbumes..."
          className="border-cards text-sm rounded hover:border-white block w-full p-2.5 bg-cards placeholder-neutral-600 text-white duration-300 ease-in focus:outline-none"
          value={busqueda}
          onChange={handleChange}
        />
      </div>
    </Fragment>
  );
};

export default BarraBusqueda;
