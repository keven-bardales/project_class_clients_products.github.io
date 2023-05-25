const apiUrl = 'https://apipw1.myferby.com/ws.php?';
const token = 'tk=t308218823';

/*Object for returning the different api functions and its parameters */
const usuarioFunc = {
  obtenerLista: '&op=usuarios',
  validar: function (credenciales) {
    const { username, password } = credenciales;
    return `&op=login&username=${username}&password=${password}`;
  },
  crear: function (usuario) {
    const { username, password, nombre, email, cargo } = usuario;
    return `&op=create_usuario&username=${username}&password=${password}&nombre=${nombre}&email=${email}&cargo=${cargo}`;
  },
  update: function (usuario) {
    const { nombre, email, cargo, id } = usuario;
    return `&op=update_usuario&nombre=${nombre}&email=${email}&cargo=${cargo}&id=${id}`;
  },
};

/*API FUNCTIONS FETCH*/
function apiGetusuarios() {
  return fetch(`${apiUrl}${token}${usuarioFunc.obtenerLista}`, {
    method: 'GET',
  });
}

/**FETCH TO validar LOGIN */
function apiValidarUsuario(credenciales) {
  return fetch(`${apiUrl}${token}${usuarioFunc.validar(credenciales)}`, {
    method: 'GET',
  });
}

function apiCrearUsuario(usuario) {
  return fetch(`${apiUrl}${token}${usuarioFunc.crear(usuario)}`, {
    method: 'POST',
  });
}

function apiActualizarUsuario(usuario) {
  return fetch(`${apiUrl}${token}${usuarioFunc.update(usuario)}`, {
    method: 'POST',
  });
}

/*API FUNCTIONS FETCH ENDS*/

function getusuarios(id) {
  apiGetusuarios().then((GetusuariosResponse) =>
    GetusuariosResponse.json().then((GetusuariosResponse) => {
      let sectionToAppend = document.getElementById(id);
      loadTablaUsuarios(GetusuariosResponse, sectionToAppend);
    })
  );
}

console.log('hola mundo');
/**FUNCTION para validar LOGIN */

function validarUsuario(credenciales) {
  apiValidarUsuario(credenciales).then((usuarioApiResponse) =>
    usuarioApiResponse
      .json()
      .then((usuarioApiResponse) => {
        usuarioCargarInicioSesion(usuarioApiResponse);
      })
      .catch((error) => {
        alert(error + ' usuario no existe');
      })
  );
}

function crearUsuario(usuario) {
  apiCrearUsuario(usuario).then((usuarioApiResponse) =>
    usuarioApiResponse.json().then((usuarioApiResponse) => {
      registrarUsuarioConfirmar(usuarioApiResponse);
    })
  );
}

function actualizarUsuario(usuario) {
  apiActualizarUsuario(usuario).then((usuarioApiResponse) =>
    usuarioApiResponse.json().then((usuarioApiResponse) => {
      actualizarUsuarioConfirmar(usuarioApiResponse);
    })
  );
}
