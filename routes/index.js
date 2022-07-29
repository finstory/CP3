'use strict'

const express = require('express')
const controller = require('../controllers/controllers')
const router = express.Router()

// Escriban sus rutas acá
// Siéntanse libres de dividir entre archivos si lo necesitan

//test 07
router.get('/cats', (req, res) => {

    res.status(200).json(controller.listCats());

});

//test 08
router.post('/cats', (req, res) => {

    const { name } = req.body || {};

    new Promise((resolved) => { resolved(controller.addCat(name)) })
        .then(() => {
            //como el cat que agrego siempre está a lo último, lo envió.
            const lastCat = controller.listCats();
            res.status(201).json({ msg: "Exito", data: lastCat[lastCat.length - 1] })
        })
        //si salta una error, devuelve un error 400.
        .catch(() => res.status(400).json({ error: `${name} already exists` }));

});

//test 09
router.get('/accessories', (req, res) => {
    const { type, color } = req.query || {};
    res.status(200).json(controller.getAccessories(type, color));

});

//test 10
router.put('/accessories/:id', (req, res) => {
    const id = parseInt(req.params.id) || {};

    try {
        res.status(200).json(
            //armamos el objeto necesesario con los props a midificar y nos retorna el acc modificado.
            controller.modifyAccessory({ id, ...req.body }))

    } catch (error) { res.status(404).json({ error: error.message }); }

});
//test 11
router.post('/accessories', (req, res) => {
    const { id, color, type, description } = req.body || {};

    if (description.length >= 140) {

        res.status(400).json(({ error: 'La descripción supera los 140 caracteres' }))

    } else {

        try {
            controller.addAccessory(req.body);
            res.status(201).json({ message: `El accesorio ${color} ${type} fue agregado correctamente` })
        } catch (err) {
            res.status(400).json({ error: err.message })
        }

    }
})

//test 12
router.delete('/accessories/:id', (req, res) => {
    const id = parseInt(req.params.id) || {};
    try {
        res.status(200).json({ message: controller.deleteAccessory(id) })
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
})

//test 13 y 14
router.post('/cats/accessories', (req, res) => {
    const { catName } = req.body || {};
    const catAccessoryId = parseInt(req.body.catAccessoryId) || {};
    try {
        controller.addCatAccessory(catName, catAccessoryId)
        res.status(200).json({ msg: 'Exito' })
    } catch (error) {

        //todo: (Yo plantearía crear class throw personalizados, así el switch no se basca en un string del error.message)
        switch (error.message) {
            case `El gato ${catName} no existe`:
                res.status(404).json({ error: error.message })
                break;
            case "Accesorio no encontrado":
                res.status(404).json({ error: "accesorio no encontrado" })
                break;
            default:
                res.status(400).json({ error: error.message })
                break;
        }

    }

})

// Hint:  investigá las propiedades del objeto Error en JS para acceder al mensaje en el mismo.
module.exports = router


