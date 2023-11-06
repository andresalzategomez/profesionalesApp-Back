const express = require ("express") // importar metodos para creación de api
const helmet = require('helmet') // metodo en conjunto de express para proteger el consumo de api
const bodyParser = require('body-parser') // metodo para asignar cuerpo de una petición mediante JSON
const cors = require('cors') // metodo para proteger y permitir recursos mediante HTTP
const port = process.env.PORT || 3000 // condicionar la varibale port para que se obtenga primero el valor en las variables de entorno


//asignar ruta a una variable
const profesionalRoute = require('./routes/profesional.routes')
const usuarioRoute = require('./routes/usuario.routes')
const fileRoute = require('./routes/file.routes')
// const typeRoute = require('./routes/type.routes')
// const featureRoute = require('./routes/feature.routes')

const app = express()
app.use(helmet())
app.use(cors())

// cambiar body-parser por express.bodyparser 
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

app.use(express.static('./public'))

app.get("/", (req, res) =>{
    res.send("Hello Word!")
})


// habilitar y unir las rutas
app.use('/v1/api/prof', profesionalRoute)
app.use('/v1/api/usuario', usuarioRoute)
app.use('/v1/api/file', fileRoute)
// app.use('/v1/api/type', typeRoute)
// app.use('/v1/api/feature', featureRoute)

// escuchar el puerto de conexión e imprimirlo por consola
app.listen(port, ()=> {
    console.log("server running on port", port)
})  

module.exports = app