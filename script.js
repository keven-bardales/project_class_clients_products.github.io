/*HTML ELEMENTS*/
const loginAdminSection = document.getElementById('loginAdmin');
const form_login_inputs = document.querySelectorAll('#form_login_admin input');
const admin_Page = document.getElementById('admin_Page');
const register_formPage = document.getElementById('register_formPage');
const register_form = document.getElementById('registerForm');
const register_form_inputs = document.querySelectorAll('#registerForm input');
const update_formPage = document.getElementById('update_formPage');

/*HTML ELEMENTS ENDS*/

/*DISPLAY INITIAL VALUES*/
displayChange(admin_Page, disp.none);
displayChange(register_formPage, disp.none);
displayChange(update_formPage, disp.none);
/*DISPLAY INITIAL ENDS*/

/**FUNCTION TO GET ALL USERS */
getUsers('loginAdmin');

/**LOGIN BUTTON ON CLICK INVOKES VALIDATE USER FUNCTION
 AND CREATES A CREDENTIALS OBJECT TO SEND TO THE FUNCTION AS PARAMETER
 */
document.getElementById('loginButton').addEventListener('click', (event) => {
  event.preventDefault();
  let user = form_login_inputs[0].value;
  let password = form_login_inputs[1].value;
  let credentials = { user, password };
  validateUser(credentials);
});

let optionRegisterUser = document.getElementById('registrarUsuario');

optionRegisterUser.addEventListener('click', function () {
  displayChange(register_formPage, disp.block, admin_Page, disp.none);
});

let register_button = document.getElementById('register_button');

register_button.addEventListener('click', function (event) {
  event.preventDefault();
  let user = {
    username: undefined,
    password: undefined,
    nombre: undefined,
    email: undefined,
    cargo: undefined,
  };
  let keys = Object.keys(user);
  register_form_inputs.forEach((input, index) => {
    user[keys[index]] = input.value;
  });
  createUser(user);
});

/* let user = {
  nombre: 'keven nuevo',
  email: 'newemail@gmail.com',
  cargo: '1',
  id: 707,
};

updateUser(user); */
