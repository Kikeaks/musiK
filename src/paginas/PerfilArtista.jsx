import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListadoCancionesArtista from "../componentes/canciones/ListadoCancionesArtista.jsx";
import Carga from "../componentes/interfaz/Carga.jsx";
import { useArtistas } from "../hooks/useArtistas.js";
import ArtistaHeader from "../componentes/artistas/ArtistaHeader.jsx";
import AlbumesCuadricula from "../componentes/albumes/AlbumesCuadricula.jsx";
import { useAlbumes } from "../hooks/useAlbumes.js";

const PerfilArtista = () => {
  const { id } = useParams();
  const { obtenerDatosArtistaPorId } = useArtistas();
  const { obtenerAlbumesPorIdArtista } = useAlbumes();
  const [artista, setArtista] = useState(null);
  const [albumes, setAlbumes] = useState(null);

  useEffect(() => {
    const fetchArtista = async () => {
      try {
        const datosArtista = await obtenerDatosArtistaPorId(id);
        const albumesArtista = await obtenerAlbumesPorIdArtista(id);
        setArtista(datosArtista);
        setAlbumes(albumesArtista);
      } catch (error) {
        console.error("Error al obtener datos del artista:", error);
      }
    };

    fetchArtista();
  }, [id, obtenerDatosArtistaPorId, obtenerAlbumesPorIdArtista]);

  return (
    <Fragment>
      {artista ? (
        <div className="perfil-artista">
          <ArtistaHeader
            nombre={artista.name}
            foto={artista.picture_xl}
            fans={artista.nb_fan}
          />
          <div>
            <h2 className="font-bold text-xl mt-6 ml-4 sm:text-2xl">
              Canciones destacadas
            </h2>
            <ListadoCancionesArtista canciones={artista.canciones} />
          </div>
          <div>
            <h2 className="font-bold text-xl sm:text-2xl mt-4 ml-4">Álbumes</h2>
            <AlbumesCuadricula
              albums={albumes.albumes}
              artista={albumes.artista}
            />
          </div>
        </div>
      ) : (
        <Carga />
      )}
    </Fragment>
  );
};

export default PerfilArtista;
