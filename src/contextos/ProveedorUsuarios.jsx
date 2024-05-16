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
      const { error } = await supabaseConexion.auth.signUp({
        email: infoSesion.email,
        password: infoSesion.password,
      });

      // Si hay un error, se lanza una excepción.
      if (error) {
        throw error;
      } else {
        // Si no hay error, se muestra un mensaje al usuario.
        console.error("Recibirás un correo para la confirmación del registro.");

        limpiarCampos();
      }
    } catch (error) {
      console.error("Error al crear la cuenta: " + error.message);
    }
  };

  // Función para iniciar sesión.
  const iniciarSesion = async () => {
    try {
      // Se inicia sesión en Supabase.
      const { error } = await supabaseConexion.auth.signInWithPassword({
        email: infoSesion.email,
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
    }, 5000);
  };

  // Función para cerrar la sesión de usuario.
  const cerrarSesion = async () => {
    try {
      // Se cierra la sesión en Supabase.
      await supabaseConexion.auth.signOut();
      // Se redirige la aplicación a la página de inicio.
      setSesionIniciada(false);
    } catch (error) {
      console.error("Error al cerrar sesión:" + error.message);
    }
  };

  // Función para obtener los datos del usuario.
  const obtenerUsuario = async () => {
    try {
      // Se obtiene la información del usuario que tiene sesión iniciada.
      const { data, error } = await supabaseConexion.auth.getUser();

      if (error) {
        throw error;
      }
      // Se actualiza el estado del usuario.
      setUsuario(data.user);
    } catch (error) {
      console.error("Error al obtener el usuario:" + error.message);
    }
  };

  // Función para actualizar los datos de sesión del usuario.
  const actualizarDato = (e) => {
    const { name, value } = e.target;
    setInfoSesion({ ...infoSesion, [name]: value });
  };

  // Función para limpiar los campos del formulario de registro/login.
  const limpiarCampos = () => {
    setInfoSesion(datosSesionInicial);
  };

  useEffect(() => {
    const suscripcion = supabaseConexion.auth.onAuthStateChange(
      (e, session) => {
        if (session) {
          navigate("/"); // Redirige a la página principal.
          setSesionIniciada(true); // Cambia el estado de la sesión a "iniciada".
          obtenerUsuario(); // Obtiene los datos del usuario.
        } else {
          navigate("/"); // Redirige a la página principal.
          setSesionIniciada(false); // Cambia el estado de la sesión a "no iniciada".
        }
      }
    );
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
    confirmarLogin,
    infoSesion,
    confirmacionLogin,
    limpiarCampos,
  };

  // Renderiza el proveedor con el contexto y sus hijos.
  return (
    <CtxUsuarios.Provider value={exports}>{children}</CtxUsuarios.Provider>
  );
};

// Exporta el proveedor y el contexto para su uso.
export default ProveedorUsuarios;
export { CtxUsuarios };
