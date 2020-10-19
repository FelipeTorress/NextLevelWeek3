//importar dependencia
const express = require('express');
const { dirname } = require('path');
const path = require('path')
const pages = require('./pages.js')

//iniciando o express
const server = express()
server
    //utilizar body do req
    .use(express.urlencoded({ extended: true }))
    //utilizando arquivos estaticos
    .use(express.static('public'))

    //configurar o templeta engine
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'hbs')
    
    //criar uma rota
    .get('/', pages.index)
    .get('/orphanage', pages.orphanage)
    .get('/orphanages', pages.orphanages)
    .get('/create-orphanage', pages.createOrphanage)
    .post('/save-orphanages', pages.saveOrphanage)

//ligar o servidor
server.listen(5500)