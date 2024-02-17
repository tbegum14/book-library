const express = require('express');
const app = express()
const { createReader, findReaders, findReader, updateReaderById, deletedReaderById } = require('./controllers/reader')
const { Reader } = require('./models')

app.use(express.json())

app.post('/readers', createReader)

app.get('/readers', findReaders)

app.get('/readers/:id', findReader)

app.patch('/readers/:id', updateReaderById)

app.delete('/readers/:id', deletedReaderById)

module.exports = app

