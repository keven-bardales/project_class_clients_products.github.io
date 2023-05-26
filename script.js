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

/* llamadoApi(usuariosFunc.listaUsuarios(), 'GET')
  .then((response) =>
    response.json().then((response) => {
      cargaTablaObjeto(response, inicioSesionAdmin);
      return llamadoApi(categoriasFunc.listaCategorias(), 'GET');
    })
  )
  .then((response) => response.json())
  .then((response) => {
    cargaTablaObjeto(response, inicioSesionAdmin);
    console.log(response);
  }); */

/*VALOR INICIAL DISPLAY DE LAS PAGINAS*/
cambiarDisplay(pagina_admin, disp.none);
cambiarDisplay(pagina_form_registrar, disp.none);
cambiarDisplay(pagina_editar_usuario, disp.none);
/*DISPLAY INITIAL ENDS*/

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

let boton_registrar = document.getElementById('boton_registrar');

boton_registrar.addEventListener('click', function (event) {
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

let boton_editar_Usuario = document.getElementById('boton_editar_Usuario');

boton_editar_Usuario.addEventListener('click', function () {
  cambiarDisplay(pagina_admin, disp.none, pagina_editar_usuario, disp.block);
});

llamadoApi(productosFunc.listaProductos()).then((productosResponse) => {
  productosResponse.json().then((productosResponse) => {
    console.log('productos');
    console.log(productosResponse.productos);
  });
});

llamadoApi(pedidosFunc.listaPedidos()).then((pedidosResponse) => {
  pedidosResponse.json().then((pedidosResponse) => {
    console.log('pedidos');
    console.log(pedidosResponse.pedidos);
  });
});

llamadoApi(chatBotFunc.listaChats()).then((chatsResponse) => {
  chatsResponse.json().then((chatsResponse) => {
    console.log('chats');
    console.log(chatsResponse);
  });
});
