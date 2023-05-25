/**Objeto con las funciones de la api recibe
 * cada una como parametro objeto categoria que vendra
 * con los respectivos parametros para ejecutar la funcion
 * en la api
 */
const categoriasFunc = {
  crear: function (categoria) {
    const { nombre, img } = categoria;
    return `&op=create_categoria&nombre=${nombre}&img=${img}`;
  },
  update: function (categoria) {
    const { nombre, img, id } = categoria;
    return `&op=update_categoria&nombre=${nombre}&img=${img}&id=${id}`;
  },
  activar: function (categoria) {
    const { id } = categoria;
    return `&op=categoria_alta&id=${id}`;
  },
  desactivar: function (categoria) {
    return `&op=categoria_baja&id=${id}`;
  },
};

/**FUNCIONES FETCH PARA CADA FUNCION DE LA API EN CATEGORIAS */

function apiCrearCategoria(categoria) {
  return fetch(`${apiUrl}${token}${categoriasFunc.crear(categoria)}`, {
    method: 'GET',
  });
}

function apiActualizarCategoria(categoria) {
  return fetch(`${apiUrl}${token}${categoriasFunc.update(categoria)}`, {
    method: 'POST',
  });
}

function apiActivarCategoria(categoria) {
  return fetch(`${apiUrl}${token}${categoriasFunc.activar(categoria)}`, {
    method: 'POST',
  });
}

function apiDesactivarCategoria(categoria) {
  return fetch(`${apiUrl}${token}${categoriasFunc.desactivar(categoria)}`, {
    method: 'POST',
  });
}

function crearCategoria(categoria) {
  apiCrearCategoria(categoria).then((categoriaApiResponse) => {
    categoriaApiResponse
      .json()
      .then((categoriaApiResponse) => {
        console.log(categoriaApiResponse);
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
