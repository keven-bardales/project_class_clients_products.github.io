/*ELEMENTOS HTML*/
const inicioSesionAdmin = document.getElementById('inicioSesionAdmin');
const admin_sesion_inputs = document.querySelectorAll(
  '#form_sesion_admin input'
);
const pagina_admin = document.getElementById('pagina_admin');
const pagina_form_registrar = document.getElementById('pagina_form_registrar');
const form_registrar = document.getElementById('form_registrar');
const inputs_registrar_usuario = document.querySelectorAll(
  '#form_registrar input'
);
const pagina_editar_usuario = document.getElementById('pagina_editar_usuario');

/*FIN ELEMENTOS HTML*/

/*VALOR INICIAL DISPLAY DE LAS PAGINAS*/
cambiarDisplay(pagina_admin, disp.none);
cambiarDisplay(pagina_form_registrar, disp.none);
cambiarDisplay(pagina_editar_usuario, disp.none);
/*DISPLAY INITIAL ENDS*/

/**FUNCION PARA OBTENER TODOS LOS USUARIOS RECIBE COMO PARAMETRO
 * LA SECCION DONDE SE MOSTRARA LA TABLA */
getusuarios('inicioSesionAdmin');

/**EL BOTON LOGIN LLAMA UNA FUNCION VALIDAR USUARIO
 * RECIBE COMO PARAMETRO UN OBJETO CON USUARIO Y CONTRASENA
 * ESA FUNCION NOS LLEVA AL INICIO SI EL USUARIO EXISTE
 */

/**LOGIN BUTTON */
document
  .getElementById('admin_sesion_boton')
  .addEventListener('click', (event) => {
    event.preventDefault();
    let username = admin_sesion_inputs[0].value;
    let password = admin_sesion_inputs[1].value;
    let credenciales = { username, password };
    validarUsuario(credenciales);
  });

let registrarUsuario = document.getElementById('registrarUsuario');

/*AL SELECCIONAR LA OPCION DE REGISTRAR NOS LLEVA A ESA PAGINA*/
registrarUsuario.addEventListener('click', function () {
  cambiarDisplay(pagina_form_registrar, disp.block, pagina_admin, disp.none);
});

let register_button = document.getElementById('boton_registrar');

register_button.addEventListener('click', function (event) {
  event.preventDefault();
  let usuario = {
    username: undefined,
    password: undefined,
    nombre: undefined,
    email: undefined,
    cargo: undefined,
  };
  let keys = Object.keys(usuario);
  register_form_inputs.forEach((input, index) => {
    usuario[keys[index]] = input.value;
  });
  crearUsuario(user);
});

let editarUsuario = document.getElementById('editarUsuario');

editarUsuario.addEventListener('click', function () {
  cambiarDisplay(pagina_admin, disp.none, pagina_editar_usuario, disp.block);
});

/* let user = {
  nombre: 'keven nuevo',
  email: 'newemail@gmail.com',
  cargo: '1',
  id: 707,
};

updateUser(user); */
