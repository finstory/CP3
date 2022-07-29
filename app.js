'use strict'
const express = require('express')
const app = express()
const router = require('./routes/index')
// Acuérdense de agregar su router o cualquier middleware que necesiten acá.
const controller = require('./controllers/controllers');

// const accessories = [
//   { id: 8, color: 'Red', type: 'Necklace', description: 'Golden Necklace'},
//   { id: 3, color: 'Black', type: 'Bun', description: 'Black Bun'},
//   { id: 5, color: 'Grey', type: 'Bracelet', description: 'Silver Bracelet'},
// ];

// controller.addCat('Franco', 'Black')
// controller.addAccessory(accessories[0])


app.use(express.json())
app.use(router)

module.exports = app
