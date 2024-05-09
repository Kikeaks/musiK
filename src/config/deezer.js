// Importa la librería Axios.
import axios from "axios";

// URL base de la API de Deezer (pasándola previamente por CORS Proxy, si no da error de CORS).
const DEEZER_API_BASE_URL = 'https://corsproxy.io/?' + encodeURIComponent('https://api.deezer.com');

// Crea una instancia de Axios con la URL base de Deezer.
const deezerAPI = axios.create({
  baseURL: DEEZER_API_BASE_URL,
});

// Exporta la instancia de Axios configurada para Deezer.
export { deezerAPI };
