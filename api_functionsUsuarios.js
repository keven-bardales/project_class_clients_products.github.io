const apiUrl = 'https://apipw1.myferby.com/ws.php?';
const token = 'tk=t308218823';

/**
 * Objeto que contiene funciones relacionadas con las operaciones de usuarios.
 * Cada una de estas funciones hace un return con su respectivo fetch para utilizarse
 * con la funcion llamadoApi() a la cual le pasariamos como parametro el objeto usariosFunc
 * de esta forma: llamadoApi(usuariosFunc.validar(credenciales))
 */
const usuariosFunc = {
  /**
   * Obtiene la lista de usuarios y retorna el fetch.
   * @returns {string} - La cadena de consulta correspondiente a la operación.
   */
  listaUsuarios: function () {
    return '&op=usuarios';
  },

  /**
   * Crea un nuevo usuario. recibe un objeto como parametro y retorna el fetch
   * @param {objeto} usuario - username, password, nombre, email, cargo
   * @returns {string} - La cadena de fetch correspondiente a la operación.
   */
  crear: function (usuario) {
    const { username, password, nombre, email, cargo } = usuario;
    return `&op=create_usuario&username=${username}&password=${password}&nombre=${nombre}&email=${email}&cargo=${cargo}`;
  },

  /**
   * Actualiza los datos de un usuario existente. recibe un objeto como parametro
   * @param {objeto} usuario - nombre, email, cargo, id
   * @returns {string} - La cadena de fetch correspondiente a la operación.
   */
  actualizar: function (usuario) {
    const { nombre, email, cargo, id } = usuario;
    return `&op=update_usuario&nombre=${nombre}&email=${email}&cargo=${cargo}&id=${id}`;
  },

  /**
   * Valida las credenciales del usuario y retorna el fetch a la api.
   * @param {objeto} credenciales - username, password
   * @returns {string} - La cadena de fetch correspondiente a la operación.
   */
  validar: function (credenciales) {
    const { username, password } = credenciales;
    return `&op=login&username=${username}&password=${password}`;
  },
};
/**Esta funcion recibe como paramtro el id del elemento html donde se mostraran los datos con la funcino
 * cargaTablaObjeto que recibe la respuesta de la api y la seccion donde se hara el append
 * @param {idHtml} id
 */
function getUsuarios(idHtml) {
  llamadoApi(usuariosFunc.listaUsuarios(), 'GET').then((GetusuariosResponse) =>
    GetusuariosResponse.json().then((GetusuariosResponse) => {
      let sectionToAppend = document.getElementById(idHtml);
      cargaTablaObjeto(GetusuariosResponse, 'editarUsuarioTabla');
    })
  );
}

/** @param {objeto} usuario 	username, password, nombre, email, cargo*/
function crearUsuario(usuario) {
  llamadoApi(usuariosFunc.crear(usuario)).then((usuarioApiResponse) =>
    usuarioApiResponse.json().then((usuarioApiResponse) => {
      registrarUsuarioConfirmar(usuarioApiResponse);
    })
  );
}

/**@param  {objeto}  usuario	nombre, email, cargo, id*/
function actualizarUsuario(usuario) {
  console.log('actualizando usuario');
  llamadoApi(usuariosFunc.actualizar(usuario)).then((usuarioApiResponse) =>
    usuarioApiResponse
      .json()
      .then((usuarioApiResponse) => {
        actualizarUsuarioConfirmar(usuarioApiResponse);
      })
      .catch((error) => {
        console.log(error);
      })
  );
}

/** @param {objeto} credenciales username, password*/
function validarUsuario(credenciales) {
  llamadoApi(usuariosFunc.validar(credenciales)).then((usuarioApiResponse) =>
    usuarioApiResponse
      .json()
      .then((usuarioApiResponse) => {
        usuarioCargarInicioSesion(usuarioApiResponse);
      })
      .catch((error) => {
        mostrarMensaje('Usuario no existe');
        console.log(error + ' usuario no existe promesa fallida');
      })
  );
}
