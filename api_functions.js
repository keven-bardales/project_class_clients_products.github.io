var apiUrl = 'https://apipw1.myferby.com/ws.php?';
var token = 'tk=t308218823';

/*Object for returning the different api functions and its parameters */
var userFunc = {
  getList: '&op=usuarios',
  validate: function (credentials) {
    const { user, password } = credentials;
    return `&op=login&username=${user}&password=${password}`;
  },
  create: function (user) {
    const { username, password, nombre, email, cargo } = user;
    return `&op=create_usuario&username=${username}&password=${password}&nombre=${nombre}&email=${email}&cargo=${cargo}`;
  },
  update: function (user) {
    const { nombre, email, cargo, id } = user;
    return `&op=update_usuario&nombre=${nombre}&email=${email}&cargo=${cargo}&id=${id}`;
  },
};

var categoriesFunc = {
  create: function (category) {
    const { nombre, img } = category;
    return `&op=create_categoria&nombre=${nombre}&img=${img}`;
  },
};

/*API FUNCTIONS FETCH*/
function apiGetUsers() {
  return fetch(`${apiUrl}${token}${userFunc.getList}`, {
    method: 'GET',
  });
}

/**FETCH TO VALIDATE LOGIN */
function apiValidateUser(credentials) {
  return fetch(`${apiUrl}${token}${userFunc.validate(credentials)}`, {
    method: 'GET',
  });
}

function apiCreateUser(user) {
  return fetch(`${apiUrl}${token}${userFunc.create(user)}`, {
    method: 'POST',
  });
}

function apiUpdateUser(user) {
  return fetch(`${apiUrl}${token}${userFunc.update(user)}`, {
    method: 'POST',
  });
}

/*API FUNCTIONS FETCH ENDS*/

function getUsers(id) {
  apiGetUsers().then((GetUsersResponse) =>
    GetUsersResponse.json().then((GetUsersResponse) => {
      let sectionToAppend = document.getElementById(id);
      loadUsersTable(GetUsersResponse, sectionToAppend);
    })
  );
}
/**FUNCTION TO VALIDATE LOGIN */

function validateUser(credentials) {
  apiValidateUser(credentials).then((userApiResponse) =>
    userApiResponse
      .json()
      .then((userApiResponse) => {
        userLoginLoad(userApiResponse);
      })
      .catch((error) => {
        alert(error + ' usuario no existe');
      })
  );
}

function createUser(user) {
  apiCreateUser(user).then((userApiResponse) =>
    userApiResponse.json().then((userApiResponse) => {
      registerUserConfirmation(userApiResponse);
    })
  );
}

function updateUser(user) {
  apiUpdateUser(user).then((userApiResponse) =>
    userApiResponse.json().then((userApiResponse) => {
      updateUserConfirmation(userApiResponse);
    })
  );
}
