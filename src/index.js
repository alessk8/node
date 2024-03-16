const express = require('express')
const morgan = require('morgan')
const app = express();

const {createReadStream} = require('node:fs')
const {createServer} = require('node:http');
const path = require('node:path');

const port = 3000

const HTML_CONTENT_TYPE = 'text/html'
const CSS_CONTENT_TYPE = 'text/css'
const JS_CONTENT_TYPE = 'text/javascript'
const JPEG_CONTENT_TYPE = 'image/jpeg'

const requestListener = (req, res) => {
    //desestructuracion de objeto req
    const {url} = req
    let statusCode = 200 
    let contentType = HTML_CONTENT_TYPE
    let stream

    console.log('new request')
    console.log(url)
    console.log(__dirname)


    stream = createReadStream(path('.\views\index.html'))

    // cabecera
    res.writeHead(statusCode, { 'Content-Type': contentType })
    // si tengo un stream, lo enviamos a la respuesta
    if (stream) stream.pipe(res)
    // si no, devuelvo un h1 diciendo q es un 404
    else{
        res.writeHead(statusCode, {'Content-Type': 'text/html'})
        return res.end('<h1> ERROR 404 NOT FOUND <h1>')
    }
}


app.get('/', (req, res) => {
    res.status(200).type('.html').sendFile(path.join(__dirname, 'views', 'index.html'))
    
})

app.use(morgan('dev'))
app.listen(port, () => {
    console.log('Server up, listening in port: %d', port)
})