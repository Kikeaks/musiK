import React from "react";
import musiK from "../assets/musik.png";
import gente from "../assets/gente.png";
import playlists from "../assets/playlists.png";
import ritmo from "../assets/ritmo.png";
import corazon from "../assets/corazon.png";
import comentarios from "../assets/comentarios.png";
import { useNavigate } from "react-router-dom";
import Pie from "../componentes/estructura/Pie";

// Componente para la página de inicio.
const Inicio = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-fondo min-h-screen flex flex-col items-center">
      <img className="size-32 md:size-44 m-12" src={musiK} />
      <p className="text-center text-neutral-400 mb-8 max-w-2xl">
        Una plataforma donde la melodía encuentra su hogar y tus oídos son los
        invitados de honor.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <div className="flex flex-col items-center bg-cards p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <img className="size-40" src={ritmo} />
          <h2 className="text-2xl font-semibold text-white mb-4">
            Explora nuevos ritmos
          </h2>
          <p className="text-neutral-300 my-4">
            Imagina un lugar donde puedas sumergirte en un océano de sonidos,
            explorar nuevos ritmos y redescubrir tus canciones favoritas, todo
            ello con la facilidad de un clic.
          </p>
        </div>
        <div className="flex flex-col items-center bg-cards p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <img className="size-40" src={playlists} />
          <h2 className="text-2xl font-semibold text-white my-4">
            Crea playlists personalizadas
          </h2>
          <p className="text-neutral-400 mb-4">
            Con nuestras herramientas de creación de listas de reproducción,
            podrás organizar tus pistas favoritas en playlists personalizadas
            que se adaptan a cualquier estado de ánimo o situación.
          </p>
        </div>
      </div>
      <div className="mt-8 w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">
          Funcionalidades sociales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center bg-cards p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <img className="size-32" src={gente} />
            <h3 className="text-xl font-semibold text-white my-4">
              Seguimientos
            </h3>
            <p className="text-neutral-400 mb-4">
              Sigue a tus artistas favoritos y amigos para no perderte ninguna
              de sus actualizaciones musicales.
            </p>
          </div>
          <div className="flex flex-col items-center bg-cards p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <img className="size-32" src={corazon} />
            <h3 className="text-xl font-semibold text-white my-4">Likes</h3>
            <p className="text-neutral-400 mb-4">
              Da like a las canciones y playlists que más te gusten y
              compártelas con tus amigos.
            </p>
          </div>
          <div className="flex flex-col items-center bg-cards p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <img className="size-32" src={comentarios} />
            <h3 className="text-xl font-semibold text-white my-4">
              Comentarios
            </h3>
            <p className="text-neutral-400 mb-4">
              Comenta en playlists para compartir tu opinión y descubrir las
              recomendaciones de otros.
            </p>
          </div>
        </div>
        <div className="mt-8 p-6 flex flex-col items-center">
          <h3 className="text-xl text-center font-semibold text-white mb-4">
            ¿A qué estás esperando? Entra y disfruta :)
          </h3>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="text-white py-2 px-4 rounded hover:bg-pink-600 transition-colors duration-300"
          >
            Comienza tu aventura musical
          </button>
        </div>
      </div>
      <Pie />
    </div>
  );
};

export default Inicio;
