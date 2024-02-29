import React, { Fragment } from "react";

// Componente para la página de inicio.
const Inicio = () => {
  return (
    <Fragment>
      <div className="backdrop-blur-md p-4 mt-3">
        <h1 className="font-bold text-center mb-3">¡Bienvenid@ a musiK!</h1>
        <p className="mb-3">
          ¡Bienvenido a nuestra plataforma de música, donde la melodía encuentra
          su hogar y tus oídos son los invitados de honor!
        </p>
        <p className="mb-3">
          Imagina un lugar donde puedas sumergirte en un océano de sonidos,
          explorar nuevos ritmos y redescubrir tus canciones favoritas, todo
          ello con la facilidad de un clic. Bien, deja de imaginar, ¡porque eso
          es exactamente lo que te ofrecemos!
        </p>
        <p className="mb-3">
          Con nuestra aplicación, el mundo de la música está literalmente al
          alcance de tus dedos. ¿Buscas una canción en particular? No hay
          problema, nuestro potente motor de búsqueda te ayudará a encontrarla
          en un abrir y cerrar de ojos. ¿Quieres crear la banda sonora perfecta
          para tu próxima fiesta? ¡Te tenemos cubierto! Con nuestras
          herramientas de creación de listas de reproducción, podrás organizar
          tus pistas favoritas en playlists personalizadas que se adaptan a
          cualquier estado de ánimo o situación.
        </p>
        <p className="mb-3">
          Así que, ¿a qué estás esperando? Únete a nosotros y comienza tu viaje
          musical hoy mismo. Desde los clásicos atemporales hasta las últimas
          tendencias, desde melodías relajantes hasta ritmos que te harán
          moverte, aquí encontrarás todo lo que necesitas para satisfacer tus
          necesidades auditivas. ¡Vamos, la música te está esperando!
        </p>
      </div>
    </Fragment>
  );
};

export default Inicio;
