const disp = { none: 'none', block: 'block', flex: 'flex' };

/**GENERAL FUNCTIONS */
function displayState(element) {
  if (element.style.display != 'none') {
    return true;
  } else {
    return false;
  }
}

function cambiarDisplay(element, value, element2, value2) {
  element.style.display = value;
  if (element2 && value2) {
    element2.style.display = value2;
  }
}

function checkStatus() {
  console.log(displayState(admin_Page));
  if (displayState(admin_Page)) {
    console.log('la pagina admin esta activa');
  } else {
    console.log('no activa');
  }
}

/**GENERAL FUNCTIONS ENDS*/

/*This function receives the api response that is 0 if its an error
or it receivs the user if it exists */

function loadTablaUsuarios(GetResponseUsuarios, sectionToAppend) {
  const users = GetResponseUsuarios.usuarios;
  const keys = Object.keys(users[0]);
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tr = document.createElement('tr');
  let tbody = document.createElement('tbody');

  keys.forEach((key) => {
    th = document.createElement('th');
    th.textContent = key;
    tr.append(th);
  });

  thead.append(tr);

  table.append(thead);

  users.forEach((user, index) => {
    let tr = document.createElement('tr');

    keys.forEach((key) => {
      let td = document.createElement('td');
      td.textContent = user[key];
      tr.append(td);
    });
    tbody.append(tr);
  });

  table.append(tbody);

  sectionToAppend.append(table);

  /*  users.forEach((user) => {}); */
}

function usuarioCargarInicioSesion(usuarioApiResponse) {
  console.log(usuarioApiResponse);
  let isValidated = usuarioApiResponse != 0 ? true : false;
  if (isValidated) {
    let mensaje = `Bienvenido ${usuarioApiResponse.username}`;
    console.log(mensaje);
    cambiarDisplay(inicioSesionAdmin, disp.none, pagina_admin, disp.block);
  } else {
    admin_sesion_inputs[0].setCustomValidity('user does not exist');
    admin_sesion_inputs[0].reportValidity();
    console.log('no existe');
  }
}

/**This function receives the api response if it exists it shows api response
 * if it does not exist console logs negation of it
 */
function registrarUsuarioConfirmar(usuarioApiResponse) {
  let usuarioNoExiste = usuarioApiResponse != 0 ? true : false;
  if (usuarioNoExiste) {
    console.log(usuarioApiResponse);
    form_registrar.reset();
  } else {
    console.log('usuario ya existe');
  }
}

/**If the response is not 0 prints a  confirmation message */
function actualizarUsuarioConfirmar(usuarioApiResponse) {
  let usuarioActualizado = usuarioApiResponse != 0 ? true : false;
  if (usuarioActualizado) {
    console.log('user has been updated succesfully');
  } else {
    console.log('user could not be updated');
  }
}
