/**
 * este objeto se utliza para acceder a el valor indicado de la propiedad
 * display puede ser flex, block, o none
 */
const disp = { none: 'none', block: 'block', flex: 'flex' };

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
 * @param {HTMLElement} element
 * @param {string} value
 * @param {HTMLElement} element2
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

/**Recibe la respuesta de la api si el usuario isValidated osea si la response es distinto de 0
 * la variable es true y se muestra mensaje de bienvenida sino el usuario no existe
 * @param {JSON} usuarioApiResponse
 */
function usuarioCargarInicioSesion(usuarioApiResponse) {
  console.log(usuarioApiResponse);
  let isValidated = usuarioApiResponse != 0 ? true : false;
  if (isValidated) {
    let mensaje = `Bienvenido ${usuarioApiResponse.username}`;
    console.log(mensaje);
    cambiarDisplay(inicioSesionAdmin, disp.none, pagina_admin, disp.block);
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
    console.log('usuario actualizado con exito');
  } else {
    console.log('el usuario no pudo ser actualizado');
  }
}
