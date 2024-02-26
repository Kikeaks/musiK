import React, { Fragment } from "react";

const Login = () => {
  return (
    <Fragment>
      <div className="bg-slate-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a className="flex items-center mb-6 text-2xl font-semibold text-white">
            <img
              className="w-16 h-16"
              src="https://i.ibb.co/PwxgML7/bitmap-bl.png"
              title="musik-w"
            />
          </a>
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-slate-800 border-slate-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                ¡Te echábamos de menos!
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-slate-700 border-slate-600 placeholder-slate-400 text-white focus:ring-indigo-500 focus:border-indigo-600"
                    placeholder="usuario@correo.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    class="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-slate-700 border-slate-600 placeholder-slate-400 text-white focus:ring-indigo-500 focus:border-indigo-600"
                    placeholder="********"
                    required
                  />
                </div>
                <button class="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-indigo-800">
                  Iniciar sesión
                </button>
                <p class="text-sm font-light text-slate-400">
                  ¿Todavía no tienes cuenta?{" "}
                  <a
                    href="#"
                    class="font-medium text-indigo-500 hover:underline"
                  >
                    Regístrate
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
