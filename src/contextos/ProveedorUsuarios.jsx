import React, { useState, useEffect, createContext } from "react";
import { supabaseConexion } from "../config/supabase.js";
import { useNavigate } from "react-router-dom";

// Contexto para los usuarios.
const CtxUsuarios = createContext();

const ProveedorUsuarios = ({ children }) => {
  // Hook para la redirección de páginas.
  const navigate = useNavigate();

  // Valores iniciales.
  const sesionInicial = false;
  const usuarioInicial = {};
  const confirmacionLoginInicial = false;
  const datosSesionInicial = {
    email: "",
    password: "",
  };

  // Estados del contexto.
  const [infoSesion, setInfoSesion] = useState(datosSesionInicial);
  const [usuario, setUsuario] = useState(usuarioInicial);
  const [sesionIniciada, setSesionIniciada] = useState(sesionInicial);
  const [confirmacionLogin, setConfirmacionLogin] = useState(
    confirmacionLoginInicial
  );

  // Función para crear una cuenta de usuario.
  const registrarUsuario = async () => {
    try {
      // Se crea la cuenta en Supabase.
      const { data, error } = await supabaseConexion.auth.signUp({
        email: infoSesion.email,
        password: infoSesion.password,
      });

      if (error) {
        throw error;
      }

      // Inserta el nuevo usuario en la tabla `usuarios`.
      const { user } = data;
      const { error: insertError } = await supabaseConexion
        .from("usuarios")
        .insert([
          { id: user.id, email: user.email, nombre: infoSesion.nombre },
        ]);

      if (insertError) {
        throw insertError;
      }

      console.error("Recibirás un correo para la confirmación del registro.");
      limpiarCampos();
    } catch (error) {
      console.error("Error al crear la cuenta: " + error.message);
    }
  };

  // Función para iniciar sesión a través del username.
  const iniciarSesion = async () => {
    try {
      // Busca al usuario por su nombre de usuario en la tabla de usuarios.
      const { data: userData, error: userError } = await supabaseConexion
        .from("usuarios")
        .select("*")
        .eq("nombre", infoSesion.nombre); // Busca al usuario por su nombre de usuario

      if (userError) {
        throw userError;
      }

      if (!userData) {
        throw new Error("Usuario no encontrado");
      }

      // Utiliza el correo electrónico del usuario encontrado.
      const { email } = userData[0];

      // Se inicia sesión.
      const { error } = await supabaseConexion.auth.signInWithPassword({
        email,
        password: infoSesion.password,
      });

      if (error) {
        throw error;
      }

      confirmarLogin();
      limpiarCampos();
    } catch (error) {
      console.error("Error al iniciar sesión: " + error.message);
    }
  };

  // Función para mostrar al usuario que se ha iniciado sesión.
  const confirmarLogin = () => {
    setConfirmacionLogin(true);
    setTimeout(() => {
      setConfirmacionLogin(false);
      navigate("/explorar");
    }, 5000);
  };

  // Función para cerrar la sesión de usuario.
  const cerrarSesion = async () => {
    try {
      // Se cierra la sesión en Supabase.
      await supabaseConexion.auth.signOut();
      // Se redirige la aplicación a la página de inicio.
      setSesionIniciada(false);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:" + error.message);
    }
  };

  // Función para obtener los datos del usuario.
  const obtenerUsuario = async () => {
    try {
      // Se obtiene la información del usuario autenticado.
      const { data: authData, error: authError } =
        await supabaseConexion.auth.getUser();

      if (authError) {
        throw authError;
      }

      // Se obtiene la información adicional del usuario desde la tabla `usuarios`.
      const { data: userData, error: userError } = await supabaseConexion
        .from("usuarios")
        .select("*")
        .eq("id", authData.user.id)
        .single();

      if (userError) {
        throw userError;
      }

      // Se actualiza el estado del usuario.
      setUsuario(userData);
    } catch (error) {
      console.error("Error al obtener el usuario:", error.message);
    }
  };

  const obtenerDatosUsuarioPorId = async (usuarioId) => {
    try {
      const { data: usuarioData, error: usuarioError } = await supabaseConexion
        .from("usuarios")
        .select("*")
        .eq("id", usuarioId)
        .single();
  
      if (usuarioError) {
        throw usuarioError;
      }
  
      // Obtener las listas de reproducción del usuario
      const { data: listasData, error: listasError } = await supabaseConexion
        .from("playlists")
        .select("*")
        .eq("usuario", usuarioId);
  
      if (listasError) {
        throw listasError;
      }

      // Obtener las listas de reproducción del usuario
      const { data: seguidosData, error: seguidosError } = await supabaseConexion
        .from("seguidores")
        .select("*")
        .eq("id_seguidor", usuarioId);
  
      if (seguidosError) {
        throw seguidosError;
      }

      // Obtener las listas de reproducción del usuario
      const { data: seguidoresData, error: seguidoresError } = await supabaseConexion
        .from("seguidores")
        .select("*")
        .eq("id_seguido", usuarioId);
  
      if (seguidoresError) {
        throw seguidoresError;
      }
  
      const usuarioCompleto = {
        ...usuarioData,
        playlists: listasData,
        seguidos: seguidosData,
        seguidores: seguidoresData
      };
  
      return usuarioCompleto;
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error.message);
      return null;
    }
  };

  // Función para obtener los seguidores de un usuario
const obtenerSeguidores = async (usuarioId) => {
  try {
    const { data, error } = await supabaseConexion
      .from("seguidores")
      .select("*")
      .eq("id_seguido", usuarioId);

    if (error) {
      throw error;
    }

    // Obtén los datos de los seguidores
    const seguidores = data.map((seguidor) => seguidor.id_seguidor);
    // Obtén la información completa de los seguidores desde la tabla de usuarios
    const seguidoresInfo = await Promise.all(
      seguidores.map(async (seguidorId) => {
        return await obtenerDatosUsuarioPorId(seguidorId);
      })
    );

    return seguidoresInfo;
  } catch (error) {
    console.error("Error al obtener los seguidores:", error.message);
    return [];
  }
};

// Función para obtener los seguidos por un usuario
const obtenerSeguidos = async (usuarioId) => {
  try {
    const { data, error } = await supabaseConexion
      .from("seguidores")
      .select("*")
      .eq("id_seguidor", usuarioId);

    if (error) {
      throw error;
    }

    // Obtén los datos de los seguidos
    const seguidos = data.map((seguido) => seguido.id_seguido);
    // Obtén la información completa de los seguidos desde la tabla de usuarios
    const seguidosInfo = await Promise.all(
      seguidos.map(async (seguidoId) => {
        return await obtenerDatosUsuarioPorId(seguidoId);
      })
    );

    return seguidosInfo;
  } catch (error) {
    console.error("Error al obtener los seguidos:", error.message);
    return [];
  }
};

  const actualizarDato = (e) => {
    const { name, value } = e.target;
    setInfoSesion((prevState) => ({ ...prevState, [name]: value }));
  };

  // Función para limpiar los campos del formulario de registro/login.
  const limpiarCampos = () => {
    setInfoSesion(datosSesionInicial);
  };

  // Función para seguir a un usuario.
  const seguirUsuario = async (usuarioId) => {
    try {
      // Insertar el nuevo registro en la tabla de seguidores.
      await supabaseConexion
        .from("seguidores")
        .insert([{ id_seguidor: usuario.id, id_seguido: usuarioId }]);

      // Puedes realizar alguna acción adicional después de seguir al usuario, si es necesario.
    } catch (error) {
      console.error("Error al seguir al usuario:", error.message);
    }
  };

  // Función para dejar de seguir a un usuario.
  const dejarDeSeguirUsuario = async (usuarioId) => {
    try {
      // Eliminar el registro correspondiente en la tabla de seguidores.
      await supabaseConexion
        .from("seguidores")
        .delete()
        .eq("id_seguidor", usuario.id)
        .eq("id_seguido", usuarioId);

      // Puedes realizar alguna acción adicional después de dejar de seguir al usuario, si es necesario.
    } catch (error) {
      console.error("Error al dejar de seguir al usuario:", error.message);
    }
  };

  // Verifica si el usuario es seguido.
  const verificarSeguimiento = async (idSeguido) => {
    if (!sesionIniciada) {
      return false;
    }

    try {
      const { data, error } = await supabaseConexion
        .from("seguidores")
        .select("*")
        .eq("id_seguidor", usuario.id)
        .eq("id_seguido", idSeguido)
        .single();

      if (error && error.details !== "No rows found") {
        throw error;
      }

      return !!data; // Devuelve true si sigue al usuario, false en caso contrario
    } catch (error) {
      console.error("Error al verificar el seguimiento:", error.message);
      return false;
    }
  };

  useEffect(() => {
    const { data: authListener } = supabaseConexion.auth.onAuthStateChange(
      (e, sesion) => {
        if (sesion) {
          setSesionIniciada(true);
          obtenerUsuario();
        } else {
          setSesionIniciada(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Objeto con los estados/funciones a proveer por el contexto.
  const exports = {
    sesionIniciada,
    registrarUsuario,
    iniciarSesion,
    cerrarSesion,
    actualizarDato,
    usuario,
    obtenerUsuario,
    obtenerDatosUsuarioPorId,
    confirmarLogin,
    infoSesion,
    confirmacionLogin,
    limpiarCampos,
    seguirUsuario,
    dejarDeSeguirUsuario,
    verificarSeguimiento,
    obtenerSeguidores,
    obtenerSeguidos,
  };

  // Renderiza el proveedor con el contexto y sus hijos.
  return (
    <CtxUsuarios.Provider value={exports}>{children}</CtxUsuarios.Provider>
  );
};

// Exporta el proveedor y el contexto para su uso.
export default ProveedorUsuarios;
export { CtxUsuarios };
