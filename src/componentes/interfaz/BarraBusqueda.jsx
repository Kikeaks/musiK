import React, { useState, useEffect, useContext } from "react";
import { useCanciones } from "../../hooks/useCanciones.js";

const BarraBusqueda = () => {
  const [busqueda, setBusqueda] = useState(""); // Estado para almacenar el término de búsqueda
  const { cargarCanciones } = useCanciones();

  // Función que se ejecuta cada vez que cambia el valor de la barra de búsqueda
  const handleChange = (e) => {
    setBusqueda(e.target.value);
  };

  // Función para cargar canciones cuando cambia la búsqueda
  useEffect(() => {
    const cargarCancionesPorBusqueda = async () => {
      // Limita las consultas a 10 si el término de búsqueda es mayor que 2 caracteres
      if (busqueda.length > 2) {
        await cargarCanciones(busqueda);
      }
    };

    cargarCancionesPorBusqueda();
  }, [busqueda, cargarCanciones]);

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar canciones..."
        value={busqueda}
        onChange={handleChange}
      />
    </div>
  );
};

export default BarraBusqueda;
