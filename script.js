/*ELEMENTOS HTML*/

/**FORMULARIOS */
const inicioSesionAdmin = document.getElementById('inicioSesionAdmin');
const admin_sesion_inputs = document.querySelectorAll(
  '#form_sesion_admin input'
);
const form_registrar = document.getElementById('form_registrar');
const inputs_registrar_usuario = document.querySelectorAll(
  '#form_registrar input'
);
const update_usuario_inputs = document.querySelectorAll(
  '#form_actualizar_usuario input'
);
const crear_categoria_inputs = document.querySelectorAll(
  '#form_crear_categoria input'
);

const crear_producto_inputs = document.querySelectorAll(
  '#form_crear_producto input, #form_crear_producto textarea'
);
const editar_chat_inputs = document.querySelectorAll(
  '#form_editar_palabra input'
);
const crear_chat_inputs = document.querySelectorAll(
  '#form_crear_palabra input'
);
const editar_productos_inputs = document.querySelectorAll(
  '#form_editar_producto input, #form_editar_producto textarea'
);

console.log(crear_producto_inputs);
/**PAGINAS */
const pagina_admin = document.getElementById('pagina_admin');
const pagina_form_registrar = document.getElementById('pagina_form_registrar');
const pagina_crear_categoria = document.getElementById(
  'pagina_crear_categoria'
);
const pagina_editar_categoria = document.getElementById(
  'pagina_editar_categoria'
);
const pagina_editar_usuario = document.getElementById('pagina_editar_usuario');
const pagina_crear_producto = document.getElementById('pagina_crear_producto');
const pagina_editar_producto = document.getElementById(
  'pagina_editar_producto'
);
const pagina_mostrar_pedidos = document.getElementById(
  'pagina_mostrar_pedidos'
);
const pagina_crear_palabras = document.getElementById('pagina_crear_palabras');
const pagina_editar_palabras = document.getElementById(
  'pagina_editar_palabras'
);
/**PAGINAS FINAL*/

/**Contador Pagina Navegacion */
var sectionAtras;
var sectionActual;

/**Secciones para tablas */
const editarUsuarioTabla = document.getElementById('editarUsuarioTabla');
const mostrarPedidosTabla = document.getElementById('mostrarPedidosTabla');
const editarChatTabla = document.getElementById('editarChatTabla');
const editarProductoTabla = document.getElementById('editarProductoTabla');
const editarCategoriaTabla = document.getElementById('editarCategoriaTabla');

const botonesAtras = document.querySelectorAll('.botonAtras');

botonesAtras.forEach((boton) => {
  boton.addEventListener('click', function () {
    cambiarDisplay(sectionActual, disp.none, sectionAtras, disp.block);
  });
});

/**Termina contador */

/*VALOR INICIAL DISPLAY DE LAS PAGINAS*/
cambiarDisplay(pagina_admin, disp.none);
cambiarDisplay(pagina_form_registrar, disp.none);
cambiarDisplay(pagina_editar_usuario, disp.none);
cambiarDisplay(pagina_crear_categoria, disp.none);
cambiarDisplay(pagina_editar_categoria, disp.none);
cambiarDisplay(pagina_crear_producto, disp.none);
cambiarDisplay(pagina_editar_producto, disp.none);
cambiarDisplay(pagina_mostrar_pedidos, disp.none);
cambiarDisplay(pagina_crear_palabras, disp.none);
cambiarDisplay(pagina_editar_palabras, disp.none);
/*DISPLAY INITIAL ENDS*/

/**EMPIEZA opcion/pagina INICIAR SESION USUARIO */
const iniciarSesion = document.getElementById('admin_sesion_boton');
iniciarSesion.addEventListener('click', (event) => {
  event.preventDefault();
  let username = admin_sesion_inputs[0].value;
  let password = admin_sesion_inputs[1].value;
  let credenciales = { username, password };
  validarUsuario(credenciales);
});

/**TERMINA opcion/pagina INICIAR SESION USUARIO */

/**EMPIEZA opcion/pagina REGISTRAR USUARIO */
const registrarUsuario = document.getElementById('registrarUsuario');
/*AL SELECCIONAR LA OPCION DE REGISTRAR NOS LLEVA A ESA PAGINA*/
registrarUsuario.addEventListener('click', function () {
  cambiarDisplay(pagina_admin, disp.none, pagina_form_registrar, disp.block);
  actualizarSeccionActual(pagina_admin, pagina_form_registrar);
});

const boton_registrar = document.getElementById('boton_registrar');

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
  inputs_registrar_usuario.forEach((input, index) => {
    usuario[keys[index]] = input.value;
  });
  crearUsuario(usuario);
});
/**TERMINA opcion/pagina REGISTRAR USUARIO */

/**EMPIEZA opcion/pagina EDITAR USUARIO */
const editarUsuario = document.getElementById('editarUsuario');

editarUsuario.addEventListener('click', function () {
  llamadoApi(usuariosFunc.listaUsuarios()).then((data) => {
    data.json().then((data) => {
      cargaTablaObjeto(data, editarUsuarioTabla);
    });
  });
  cambiarDisplay(pagina_admin, disp.none, pagina_editar_usuario, disp.block);
  actualizarSeccionActual(pagina_admin, pagina_editar_usuario);
});

const boton_editar_Usuario = document.getElementById('boton_editar_Usuario');

boton_editar_Usuario.addEventListener('click', function (event) {
  event.preventDefault();
  let usuario = {
    nombre: undefined,
    email: undefined,
    cargo: undefined,
    id: undefined,
  };
  let keys = Object.keys(usuario);

  update_usuario_inputs.forEach((input, index) => {
    usuario[keys[index]] = input.value;
  });
  actualizarUsuario(usuario);
});

/**TERMINA opcion/pagina EDITAR USUARIO */

/**EMPIEZA opcion/pagina CREAR CATEGORIAS */
const crearCategorias = document.getElementById('crearCategorias');

crearCategorias.addEventListener('click', function () {
  cambiarDisplay(pagina_admin, disp.none, pagina_crear_categoria, disp.block);
  actualizarSeccionActual(pagina_admin, pagina_crear_categoria);
});

const botonCrearCategorias = document.getElementById('boton_crear_categoria');

botonCrearCategorias.addEventListener('click', function (event) {
  event.preventDefault();
  let categoria = {
    nombre: undefined,
    url: undefined,
  };
  let keys = Object.keys(categoria);

  crear_categoria_inputs.forEach((input, index) => {
    categoria[keys[index]] = input.value;
  });

  crearCategoria(categoria);
});
/**TERMINA opcion/pagina CREAR CATEGORIAS */

/**EMPIEZA opcion/pagina EDITAR CATEGORIAS */
const editarCategorias = document.getElementById('editarCategorias');

editarCategorias.addEventListener('click', function () {
  cambiarDisplay(pagina_admin, disp.none, pagina_editar_categoria, disp.block);
  actualizarSeccionActual(pagina_admin, pagina_editar_categoria);
  llamadoApi(categoriasFunc.listaCategorias()).then((categoriaApiResponse) => {
    categoriaApiResponse.json().then((categoriaApiResponse) => {
      cargaTablaObjeto(categoriaApiResponse, editarCategoriaTabla);
    });
  });
});

const botonEditarCategorias = document.getElementById('boton_editar_categoria');

botonEditarCategorias.addEventListener('click', function (event) {
  event.preventDefault();
  let categoria = {
    nombre: undefined,
    url: undefined,
    id: 1,
  };
  actualizarCategoria(categoria);
});
/**TERMINA opcion/pagina EDITAR CATEGORIAS */

/**EMPIEZA opcion/pagina CREAR PRODUCTOS */
const crearProductos = document.getElementById('crearProductos');

crearProductos.addEventListener('click', function () {
  cambiarDisplay(pagina_admin, disp.none, pagina_crear_producto, disp.block);
  actualizarSeccionActual(pagina_admin, pagina_crear_producto);
});

const botonCrearProductos = document.getElementById('boton_crear_producto');

botonCrearProductos.addEventListener('click', function (event) {
  event.preventDefault();
  let producto = {
    sku: undefined,
    nombre: undefined,
    desc: undefined,
    precio: undefined,
    inv: undefined,
    img: undefined,
    cat: undefined,
  };
  let keys = Object.keys(producto);
  crear_producto_inputs.forEach((input, index) => {
    producto[keys[index]] = input.value;
  });
  crearProducto(producto);
});
/**TERMINA opcion/pagina CREAR PRODUCTOS */

/**EMPIEZA opcion/pagina EDITAR PRODUCTOS */
const editarProductos = document.getElementById('editarProductos');

editarProductos.addEventListener('click', function () {
  cambiarDisplay(pagina_admin, disp.none, pagina_editar_producto, disp.block);
  actualizarSeccionActual(pagina_admin, pagina_editar_producto);
  llamadoApi(productosFunc.listaProductos()).then((productosApiResponse) => {
    productosApiResponse.json().then((productosApiResponse) => {
      cargaTablaObjeto(productosApiResponse, editarProductoTabla);
    });
  });
});

const boton_editar_producto = document.getElementById('boton_editar_producto');

boton_editar_producto.addEventListener('click', function (event) {
  event.preventDefault();
  let producto = {
    nombre: undefined,
    desc: undefined,
    precio: undefined,
    img: undefined,
    id: undefined,
  };
  producto = obtenerValoresDeInputs(producto, editar_productos_inputs);
  actualizarProductos(producto);
});
/**TERMINA opcion/pagina EDITAR PRODUCTOS */

/**EMPIEZA opcion/pagina MOSTRAR PEDIDDOS */
const mostrarPedidos = document.getElementById('mostrarPedidos');

mostrarPedidos.addEventListener('click', function () {
  llamadoApi(pedidosFunc.listaPedidos()).then((pedidosApiResponse) => {
    pedidosApiResponse.json().then((pedidosApiResponse) => {
      cargaTablaObjeto(pedidosApiResponse, mostrarPedidosTabla);
    });
  });
  cambiarDisplay(pagina_admin, disp.none, pagina_mostrar_pedidos, disp.block);
  actualizarSeccionActual(pagina_admin, pagina_mostrar_pedidos);
});

/**TERMINA opcion/pagina EDITAR PRODUCTOS */

/**EMPIEZA opcion/pagina CREAR PALABRAS */
const crearPalabras = document.getElementById('crearPalabras');

crearPalabras.addEventListener('click', function () {
  cambiarDisplay(pagina_admin, disp.none, pagina_crear_palabras, disp.block);
  actualizarSeccionActual(pagina_admin, pagina_crear_palabras);
});

const boton_crear_palabra = document.getElementById('boton_crear_palabra');

boton_crear_palabra.addEventListener('click', function () {
  let chat = {
    palabra: undefined,
    respuesta: undefined,
  };
  chat = obtenerValoresDeInputs(chat, crear_chat_inputs);
  crearChat(chat);
});

/**TERMINA opcion/pagina CREAR PALABRAS */

/**EMPIEZA opcion/pagina EDITAR PALABRAS */
const EditarPalabrasRespuestas = document.getElementById(
  'EditarPalabrasRespuestas'
);

EditarPalabrasRespuestas.addEventListener('click', function () {
  llamadoApi(chatBotFunc.listaChats()).then((chatApiResponse) => {
    chatApiResponse.json().then((chatApiResponse) => {
      cargaTablaObjeto(chatApiResponse, editarChatTabla);
    });
  });
  cambiarDisplay(pagina_admin, disp.none, pagina_editar_palabras, disp.block);
  actualizarSeccionActual(pagina_admin, pagina_editar_palabras);
});

const boton_editar_chat = document.getElementById('boton_editar_chat');

boton_editar_chat.addEventListener('click', (event) => {
  event.preventDefault();
  let chat = {
    palabra: undefined,
    respuesta: undefined,
    id: undefined,
  };
  chat = obtenerValoresDeInputs(chat, editar_chat_inputs);
  actualizarChat(chat);
});
