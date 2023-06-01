/**
 * Objeto que contiene funciones relacionadas con las operaciones de productos en la API.
 * Cada función recibe un objeto `producto` con los parámetros respectivos para ejecutar la función en la API.
 */
const productosFunc = {
  /**
   * Obtiene la lista de productos y retorna el fetch.
   * @returns {string} - La cadena de fetch correspondiente a la operación.
   */
  listaProductos: function () {
    return '&op=productos';
  },
  /**
   * Crea una nueva producto.
   * @param {objeto} producto - sku, nombre, desc, precio,inv, img , cat
   * @returns {string} - La cadena de fetch correspondiente a la operación.
   */
  crear: function (producto) {
    const { sku, nombre, desc, precio, inv, img, cat } = producto;
    return `&op=create_producto&sku=${sku}&nombre=${nombre}&desc=${desc}&precio=${precio}&inv=${inv}&img=${img}&cat=${cat}`;
  },

  /**
   * Actualiza los detalles de un producto existente.
   * @param {objeto} producto -nombre, desc, precio, img, id
   * @returns {string} - La cadena de fetch correspondiente a la operación.
   */
  actualizar: function (producto) {
    const { nombre, desc, precio, img, id } = producto;
    return `&op=update_producto&nombre=${nombre}&desc=${desc}&precio=${precio}&img=${img}&id=${id}`;
  },

  /**
   * Activa una producto.
   * @param {objeto} producto -id
   * @returns {string} - La cadena de fetch correspondiente a la operación.
   */
  activar: function (producto) {
    const { id } = producto;
    return `&op=producto_alta&id=${id}`;
  },
  /**
   * Desactiva una producto.
   * @param {objeto} producto -id
   * @returns {string} - La cadena de fetch correspondiente a la operación.
   */
  desactivar: function (producto) {
    const { id } = producto;
    return `&op=producto_baja&id=${id}`;
  },
};

/**
 * Objeto que contiene funciones relacionadas con las operaciones de pedidos en la API.
 * Cada función recibe un objeto `pedido` con los parámetros respectivos para ejecutar la función en la API.
 */
const pedidosFunc = {
  /**
   * Obtiene la lista de pedido y retorna el fetch.
   * @returns {string} - La cadena de consulta correspondiente a la operación.
   */
  listaPedidos: function () {
    return '&op=pedidos';
  },
};

/**
 * Objeto que contiene funciones relacionadas con las operaciones de productos en la API.
 * Cada función recibe un objeto `producto` con los parámetros respectivos para ejecutar la función en la API.
 */
const chatBotFunc = {
  /**
   * Obtiene la lista de chats y retorna el fetch.
   * @returns {string} - La cadena de consulta correspondiente a la operación.
   */
  listaChats: function () {
    return '&op=chats';
  },
  /**
   * Crea una nueva categoría.
   * @param {objeto} chat - sku, nombre, desc, precio,inv, img , cat
   * @returns {string} - La cadena de fetch correspondiente a la operación.
   */
  crear: function (chat) {
    const { palabra, respuesta } = chat;
    return `&op=create_chat&palabra=${palabra}&respuesta=${respuesta}`;
  },

  /**
   * Actualiza los detalles de una chat existente.
   * @param {objeto} chat -palabra, respuesta, id
   * @returns {string} - La cadena de fetch correspondiente a la operación.
   */
  actualizarChat: function (chat) {
    const { palabra, respuesta, id } = chat;
    return `&op=update_chat&palabra=${palabra}&respuesta=${respuesta}&id=${id}`;
  },
};

function getProductos() {
  llamadoApi(productosFunc.listaProductos(), 'GET').then(
    (productoApiResponse) =>
      productoApiResponse.json().then((productoApiResponse) => {
        console.log(productoApiResponse);
      })
  );
}

function crearProducto(producto) {
  llamadoApi(productosFunc.crear(producto))
    .then((productoApiResponse) => {
      productoApiResponse.json().then((productoApiResponse) => {
        crearProductoConfirmar(productoApiResponse);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function actualizarProductos(producto) {
  llamadoApi(productosFunc.actualizar(producto)).then((productoApiResponse) => {
    productoApiResponse.json().then((productoApiResponse) => {
      actualizarProductoConfirmar(productoApiResponse);
    });
  });
}

/** EJEMPLO DE PRODUCTO
 * 0: Object { id: "1", sku: "P001", nombre: "El principito", … }
​​​
categoria: "11"
​​​
descripcion: "Es el libro de un principito"
​​​
estado: "1"
​​​
id: "1"
​​​
imagen: "https://m.media-amazon.com/images/I/71AVK5VIAzL._AC_UF1000,1000_QL80_.jpg"
​​​
inventario: "60"
​​​
nombre: "El principito"
​​​
precio: "199"
​​​
sku: "P001"
 */

function getPedidos() {
  llamadoApi(pedidosFunc.listaPedidos()).then((pedidosApiResponse) => {
    pedidosApiResponse.json((pedidosApiResponse) => {
      console.log(pedidosApiResponse);
    });
  });
}

function actualizarChat(chat) {
  llamadoApi(chatBotFunc.actualizarChat(chat)).then((chatApiResponse) => {
    chatApiResponse.json().then((chatApiResponse) => {
      actualizarChatConfirmar(chatApiResponse);
    });
  });
}

function crearChat(chat) {
  llamadoApi(chatBotFunc.crear(chat)).then((chatApiResponse) => {
    chatApiResponse.json().then((chatApiResponse) => {
      crearChatConfirmar(chatApiResponse);
    });
  });
}
