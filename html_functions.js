const disp = { none: 'none', block: 'block', flex: 'flex' };

/**GENERAL FUNCTIONS */
function displayState(element) {
  if (element.style.display != 'none') {
    return true;
  } else {
    return false;
  }
}

function displayChange(element, value, element2, value2) {
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

function loadUsersTable(GetUsersResponse, sectionToAppend) {
  const users = GetUsersResponse.usuarios;
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

function userLoginLoad(userApiResponse) {
  let isValidated = userApiResponse != 0 ? true : false;
  if (isValidated) {
    let message = `Bienvenido ${userApiResponse.username}`;
    console.log(message);
    displayChange(loginAdminSection, disp.none, admin_Page, disp.block);
  } else {
    form_login_inputs[0].setCustomValidity('user does not exist');
    form_login_inputs[0].reportValidity();
    console.log('no existe');
  }
}

/**This function receives the api response if it exists it shows api response
 * if it does not exist console logs negation of it
 */
function registerUserConfirmation(userApiResponse) {
  let userNotExists = userApiResponse != 0 ? true : false;
  if (userNotExists) {
    console.log(userApiResponse);
    register_form.reset();
  } else {
    console.log('usuario ya existe');
  }
}

/**If the response is not 0 prints a  confirmation message */
function updateUserConfirmation(userApiResponse) {
  let userWasUpdated = userApiResponse != 0 ? true : false;
  if (userWasUpdated) {
    console.log('user has been updated succesfully');
  } else {
    console.log('user could not be updated');
  }
}
