/**
 * Objeto que contiene funciones relacionadas con las operaciones de categorías en la API.
 * Cada función recibe un objeto `categoria` con los parámetros respectivos para ejecutar la función en la API.
 */
const categoriasFunc = {
  /**
   * Obtiene la lista de categorías.
   * @returns {string} - La cadena de consulta correspondiente a la operación.
   */
  listaCategorias: function () {
    return `&op=categorias`;
  },
  /**
   * Crea una nueva categoría.
   * @param {objeto} categoria - nombre, img
   * @returns {string} - La cadena de fetch correspondiente a la operación.
   */
  crear: function (categoria) {
    const { nombre, img } = categoria;
    return `&op=create_categoria&nombre=${nombre}&img=${img}`;
  },

  /**
   * Actualiza los detalles de una categoría existente.
   * @param {objeto} categoria -nombre, img, id
   * @returns {string} - La cadena de fetch correspondiente a la operación.
   */
  actualizar: function (categoria) {
    const { nombre, img, id } = categoria;
    return `&op=update_categoria&nombre=${nombre}&img=${img}&id=${id}`;
  },

  /**
   * Activa una categoría.
   * @param {objeto} categoria -id
   * @returns {string} - La cadena de fetch correspondiente a la operación.
   */
  activar: function (categoria) {
    const { id } = categoria;
    return `&op=categoria_alta&id=${id}`;
  },

  /**
   * Desactiva una categoría.
   * @param {objeto} categoria -id
   * @returns {string} - La cadena de fetch correspondiente a la operación.
   */
  desactivar: function (categoria) {
    const { id } = categoria;
    return `&op=categoria_baja&id=${id}`;
  },
};

/**@param {objeto} idHtml */
function getCategorias(idHtml) {
  llamadoApi(categoriasFunc.listaCategorias(), 'GET').then(
    (categoriaApiResponse) => {
      categoriaApiResponse.json().then((categoriaApiResponse) => {
        let sectionToAppend = document.getElementById(idHtml);
        cargaTablaObjeto(categoriaApiResponse, sectionToAppend);
      });
    }
  );
}

/**@param {objeto} categoria -nombre, img */
function crearCategoria(categoria) {
  llamadoApi(categoriasFunc.crear(categoria)).then((categoriaApiResponse) => {
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

/**@param {objeto} categoria -nombre, img, id*/
function actualizarCategoria(categoria) {
  llamadoApi(categoriasFunc.actualizar(categoria)).then(
    (categoriaApiResponse) => {
      categoriaApiResponse
        .json()
        .then((categoriaApiResponse) => {
          console.log(categoriaApiResponse);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  );
}

/**@param {objeto} categoria -id*/
function activarCategoria(categoria) {
  llamadoApi(categoriasFunc.activar(categoria)).then((categoriaApiResponse) => {
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

/**@param {objeto} categoria -id*/
function desactivarCategoria(categoria) {
  llamadoApi(categoriasFunc.desactivar(categoria)).then(
    (categoriaApiResponse) => {
      categoriaApiResponse
        .json()
        .then((categoriaApiResponse) => {
          console.log(categoriaApiResponse);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  );
}
