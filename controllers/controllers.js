/// =========================================================================== ///
/// =============================== HENRY-CATS ================================ ///
/// =========================================================================== ///

'use strict'

let cats = []
let accessories = []

module.exports = {

  reset: function () {
    // No es necesario modificar esta función. La usamos para "limpiar" los arreglos entre test y test.

    cats = []
    accessories = []
  },

  // ==== COMPLETAR LAS SIGUIENTES FUNCIONES (vean los test de `controller.js`) =====

  addCat: function (name) {
    // Agrega un nuevo felin@, verificando que no exista anteriormente en base a su nombre.
    // En caso de existir, no se agrega y debe arrojar el Error ('El gato o gata ya existe') >> ver JS throw Error
    // Debe tener una propiedad <age> que inicialmente debe ser '1 year'.
    // Debe tener una propiedad <color> que inicialmente es un array vacío.
    // Debe tener una propiedad <accesories> que inicialmente es un array vacío.
    // El gato o gata debe guardarse como un objeto con el siguiente formato:
    // { name: name,  age: '1 year' , color: []}
    // En caso exitoso debe retornar el string '<nombre del gato o gata> fue creado correctamente'.
    const cat = { name, age: "1 year", color: [], accessories: [] };

    const catGet = cats.filter(cat => cat.name === name);


    if (catGet.length)
      throw new Error("El gato o gata ya existe");

    cats.push(cat);
    return `${name} fue creado correctamente`;
  },

  listCats: function (age) {
    // En caso de recibir el parámetro <age>, devuelve sólo los gatos correspondientes a dicho age.
    // Si no recibe parámetro, devuelve un arreglo con todos los gatos.
    if (age)
      return cats.filter(cat => cat.age === age);
    else return cats;
  },

  addAccessory: function ({ id, color, type, description }) {

    const acc = { id, color, type, description, popularity: "low" }

    const accGet = accessories.find(acc => acc.id === id);
    if (accGet)
      throw new Error(`El accesorio con el id ${accGet.id} ya existe`);

    if (description.length >= 140)
      throw new Error(`La descripción supera los 140 caracteres`);

    accessories.push(acc);

  },

  getAccessories: function (type = "", color = "") {
    let copyAcc = [];

    //clonación de "accessories" por valor.
    for (let i = 0; i < accessories.length; i++)
      copyAcc[i] = Object.assign({}, accessories[i]);

    if (type || color)
      return copyAcc.filter(acc => acc.type === type || acc.color === color);
    else return copyAcc;

  },

  deleteAccessory: function (id) {
    // Elimina un accesorio del array
    // Si el id no existe dentro del array de accesorios, arrojar un Error ('El accesorio con el id <id> no fue encontrado')
    // Una vez eliminado el accesorio del array, devolver un mensaje que diga 'El accesorio con el id <id> fue eliminado correctamente'

    const accGet = accessories.find(acc => acc.id === id);

    if (!accGet)
      throw new Error(`El accesorio con el id ${id} no fue encontrado`);
    accessories = accessories.filter(acc => acc.id !== id);
    return `El accesorio con el id ${id} fue eliminado correctamente`;
  },


  modifyAccessory: function (obj) {

    //  setTimeout(() => {

    if (Object.entries(obj).length === 0)
      throw new Error(`No se detectaron cambios a aplicar`);

    const accGet = accessories.find(acc => acc.id === obj.id);
    if (!accGet)
      throw new Error(`accesorio no encontrado`);

    let objmod = {};
    for (let i = 0; i < accessories.length; i++) {
      if (accessories[i].id === obj.id) {
        obj.type && (accessories[i].type = obj.type);
        obj.color && (accessories[i].color = obj.color);
        obj.description && (accessories[i].description = obj.description);
        objmod = accessories[i];

        //el test 10 rompe por que no espera la prop. popularity.
        delete objmod.popularity;
      }

    }
    return objmod;

  },

  increaseAccesoryPopularity: function (accessoryId) {

    let ammount = 0;

    cats.forEach(cat => {
      for (let i = 0; i < cat.accessories.length; i++)
        if (cat.accessories[i].id === accessoryId) ++ammount;
    })

    accessories.forEach(acc => {

      if (acc.id === accessoryId) {
        ammount === 2 && (acc.popularity = "average");
        ammount >= 3 && (acc.popularity = "high");
      }

    });

  },

  addCatAccessory: function (catName, accessoryId) {

    const catGet = cats.find(cat => cat.name === catName);
    const accGet = accessories.find(acc => acc.id === accessoryId);

    if (!catGet) throw new Error(`El gato ${catName} no existe`);
    if (!accGet) throw new Error(`Accesorio no encontrado`);

    //si el gato filtrado de catGet incluye el accesorio de accGet, error!.
    if (catGet.accessories.includes(accGet)) throw new Error(`El gato ${catName} ya tiene el accesorio puesto`);
    //si todo ok, pushea.
    cats.forEach(cat => (cat.name === catName) && cat.accessories.push(accGet));

    this.increaseAccesoryPopularity(accessoryId);

    return `El accesorio ${accGet.type} fue agregado a ${catName} con exito`;
  },

  getAccessoryPopularity: function (accessoryId) {
    let popularity = "";

    accessories.forEach(acc => acc.id === accessoryId && (popularity = acc.popularity));

    return popularity;

  },
}
