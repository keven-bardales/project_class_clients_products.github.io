/**
 * este objeto se utliza para acceder a el valor indicado de la propiedad
 * display puede ser flex, block, o none
 */
const disp = { none: 'none', block: 'block', flex: 'flex' };
const modalMensaje = document.getElementById('mensajeUsuario');

/**GENERAL FUNCTIONS */

/**
 *Esta funcion retorna true si el valor del display del elemento es 
 distinto de noe
 * @param {HTMLElement} elemento
 * @returns {boolean}
 */
function displayState(elemento) {
  if (elemento.style.display != 'none') {
    return true;
  } else {
    return false;
  }
}
/**
 * Esta funcion puede recibir dos elementos y cambiarles su valor utilizando
 * el objeto disp y su valor (block, none, flex) o puede pasarse el valor en string
 * @param {HTMLElement} elemento
 * @param {string} value
 * @param {HTMLElement} elemento2
 * @param {string} value2
 */
function cambiarDisplay(elemento, value, elemento2, value2) {
  elemento.style.display = value;
  if (elemento2 && value2) {
    elemento2.style.display = value2;
  }
}

/**
 * Esta funcion retorna el fetch de la api Recibiendo como parametros
 * el objeto y la funcion a utilizar de ese objeto EJEMPLOS:
 * usuariosFunc.validar(credenciales), categoriasFunc.crear(categoria),
 * tambien recibe el motodo http a utilizar para el llamado a la api
 * @param {Function} apiFuncion
 * @param {string} metodo
 * @returns
 */
function llamadoApi(apiFuncion, metodo) {
  return fetch(`${apiUrl}${token}${apiFuncion}`, {
    method: metodo,
  });
}

/**Esta funcion solo recibe un JSON desde la apiResponse saca su arreglo e itera sobre cada objeto
 *  y lo muestra en una tabla tambien recibe la seccion o elemento html donde se mostrara
 * la tabla
 * @param {JSON} apiResponse
 * @param {HTMLElement} sectionToAppend
 */
function cargaTablaObjeto(apiResponse, sectionToAppend) {
  sectionToAppend.innerHTML = '';
  /**Obtenemos el valor de las llaves de la respuesta de la api */
  let keysApiResponse = Object.keys(apiResponse);
  /**Asignamos a una variable el valor de la primera llave que contiene el arreglo de objetos */
  let responsePrimeraLlave = keysApiResponse[0];
  /**Asignamos en una variable ese arreglo de objetos */
  const arrayApiResponse = apiResponse[responsePrimeraLlave];
  //Obtenemos las llaves del primer objeto
  const keys = Object.keys(arrayApiResponse[0]);
  //Creamos elementos de la tabla
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tr = document.createElement('tr');
  let tbody = document.createElement('tbody');

  keys.forEach((key) => {
    let th = document.createElement('th');
    th.textContent = key;
    tr.append(th);
  });

  thead.append(tr);

  table.append(thead);

  arrayApiResponse.forEach((object, index) => {
    let tr = document.createElement('tr');

    keys.forEach((key) => {
      let td = document.createElement('td');

      if (key == 'imagen') {
        td.textContent = '';
        let img = document.createElement('img');
        img.src = object[key];

        td.append(img);
      } else {
        td.textContent = object[key];
      }
      tr.append(td);
    });
    tbody.append(tr);
  });

  table.append(tbody);

  sectionToAppend.append(table);
}

function obtenerValoresDeInputs(objeto, inputs) {
  let keys = Object.keys(objeto);
  inputs.forEach((input, index) => {
    objeto[keys[index]] = input.value;
  });

  return objeto;
}

function mostrarMensaje(mensaje) {
  let mensajeModal = document.querySelector('#mensajeUsuario p');
  mensajeModal.innerHTML = mensaje;
  console.log(mensajeModal);
  modalMensaje.showModal();
}

/**Recibe la respuesta de la api si el usuario isValidated osea si la response es distinto de 0
 * la variable es true y se muestra mensaje de bienvenida sino el usuario no existe
 * @param {JSON} usuarioApiResponse
 */
function usuarioCargarInicioSesion(usuarioApiResponse) {
  console.log(usuarioApiResponse);
  let isValidated = usuarioApiResponse != 0 ? true : false;
  if (isValidated) {
    mostrarMensaje(`Bienvenido ${usuarioApiResponse.username}`); // crear en localstorage el cargo
    let tipoUsuario = usuarioApiResponse.cargo;

    if (tipoUsuario == 3) {
      mostrarMensaje('es un cliente no tiene permisos para iniciar sesion');
      return;
    }

    console.log(tipoUsuario);
    if (tipoUsuario != 1) {
      ocultarOpcionesAdmin();
    }
    document.getElementById('form_sesion_admin').reset();
    cambiarDisplay(inicioSesionAdmin, disp.none, pagina_admin, disp.block);

    actualizarSeccionActual(inicioSesionAdmin, pagina_admin);
  } else {
    admin_sesion_inputs[0].setCustomValidity(
      'usuario o contraseña incorrectos'
    );
    admin_sesion_inputs[0].reportValidity();
    console.log('no existe');
  }
}

/**Esta funcion recibe como parametro la respuesta de la api en formato JSON si
 * la respuesta es distinto  0 usuarioNoexiste = true y se procede sino el usuario ya existe
 * no se puede registrar
 * @param {JSON} usuarioApiResponse
 */
function registrarUsuarioConfirmar(usuarioApiResponse) {
  let usuarioNoExiste = usuarioApiResponse != 0 ? true : false;
  if (usuarioNoExiste) {
    //El usuario no existe por entonces fue creado
    mostrarMensaje('Usuario creado con exito' + usuarioApiResponse);
    console.log(usuarioApiResponse);
    form_registrar.reset();
  } else {
    console.log('usuario ya existe');
  }
}

/**
 * Esta funcion recibe la respuesta de la api si es distinto de 0
 * quiere decir que el usuario fue actualizado
 * @param {JSON} usuarioApiResponse - Respuesta de la api
 */
function actualizarUsuarioConfirmar(usuarioApiResponse) {
  let usuarioActualizado = usuarioApiResponse != 0 ? true : false;
  if (usuarioActualizado) {
    mostrarMensaje('usuario actualizado con exito');
  } else {
    mostrarMensaje('el usuario no pudo ser actualizado');
  }
}

function actualizarSeccionActual(sectionAntes, sectionDespues) {
  sectionAtras = sectionAntes;
  sectionActual = sectionDespues;
}

function crearCategoriaConfirmar(usuarioApiResponse) {
  let categoriaCreada = usuarioApiResponse != 0 ? true : false;
  if (categoriaCreada) {
    mostrarMensaje('Categoria Creada con Exito');
    crear_categoria_inputs[0].parentElement.parentElement.reset();
  } else {
    mostrarMensaje('Categoria no pudo ser creada');
  }
}

function ActualizarCategoriaConfirmar(categoriaApiResponse) {
  let categoriaActualizada = categoriaApiResponse != 0 ? true : false;
  if (categoriaActualizada) {
    mostrarMensaje('categoria actualizada con exito');
    document.getElementById('form_editar_categoria').reset();
  } else {
    mostrarMensaje('categoria no ha sido actualizada');
  }
}

function actualizarChatConfirmar(chatApiResponse) {
  let chatActualizado = chatApiResponse != 0 ? true : false;
  if (chatActualizado) {
    mostrarMensaje('chat actualizado con exito');
    document.getElementById('form_editar_palabra').reset();
  } else {
    mostrarMensaje('no se puedo actualizar el chat');
  }
}

function crearChatConfirmar(chatApiResponse) {
  let chatCreado = chatApiResponse != 0 ? true : false;
  if (chatCreado) {
    mostrarMensaje('El chat ha sido creado con exito');
    document.getElementById('form_crear_palabra').reset();
  } else {
    mostrarMensaje('el chat no se ha podido crear');
  }
}

function actualizarProductoConfirmar(productoApiResponse) {
  let productoActualizado = productoApiResponse != 0 ? true : false;
  if (productoActualizado) {
    mostrarMensaje('producto actualizado con exito');
    document.getElementById('form_crear_palabra').reset();
  } else {
    mostrarMensaje('el producto no ha sido actualizado');
  }
}

function crearProductoConfirmar(productoApiResponse) {
  let productoCreado = productoApiResponse != 0 ? true : false;
  if (productoCreado) {
    mostrarMensaje('producto crado con exito');
    document.getElementById('form_crear_producto').reset();
  } else {
    mostrarMensaje('hubo un problema al crear el producto');
  }
}

function ocultarOpcionesAdmin() {
  let opcionesAdmin = document.querySelectorAll('.opcionAdmin');
  opcionesAdmin.forEach((opcionAdmin) => {
    cambiarDisplay(opcionAdmin, disp.none);
  });
}

const terminarSesion = document.getElementById('terminarSesion');

terminarSesion.addEventListener('click', () => {
  document.getElementById('pagina_admin').style.display = 'none';
  document.getElementById('inicioSesionAdmin').style.display = 'block';
});
