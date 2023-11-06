// const sequelize = require('../conection') // importar la clase par la conexión de la base datos
const connectDB = require('../conection')

let database = connectDB();

// Metodo para obtener de la base de datos todas los profesionales
const getProfesional = async (req, res) =>{
    try {
        database.ref("products").once('value').then(function(snapshot) {
            products = snapshot.val()
            res.status(200).json({
                'response': 'OK',
                products
            })
        })
        // const result = await sequelize.query('SELECT * FROM ship', {type: sequelize.QueryTypes.SELECT})
        
    } catch (error) {
        if (error.name) {
            res.status(404).json({
                error,
                message: 'error en la búsqueda ' + error
            })
        } else {
            res.status(500).json({
                error,
                message : 'Error inesperado ' + error
            })
        }
    }
}

// Metodo para crear un profesional
const createProfesional = async (req, res) =>{
    const {name, date_creation, date_destruction, id_type} = req.body

    let arrayInsertShip = [`${name}`, `${date_creation}`, `${date_destruction}`, `${id_type}`]
    
    try {
        const result = await sequelize.query('INSERT INTO ship (name, date_creation, date_destruction, id_type) VALUES( ?, ?, ?, ?)',
        {replacements: arrayInsertShip , type: sequelize.QueryTypes.INSERT })
        res.status(200).json({
            message: 'Ship Create',
            result
        })
    } catch (error) {
        if (error.name) {
            res.status(400).json({
                error,
                message : 'error en la creación'
            })
        } else {
            res.status(500).json({
                error,
                message : 'Error inesperado'
            })
        }
    }
}

// Metodo para actualizar una nave
const updateShipById = async (req, res) =>{
    const { name, date_creation, date_destruction, id_type } = req.body
    console.log(name)

    try {
        const result = await sequelize.query(`UPDATE ship 
        SET name = "${name}",  
        date_creation = "${date_creation}",
        date_destruction = "${date_destruction}" ,
        id_type = "${id_type}"
        WHERE id = ${req.params.shipId}`,
        { type: sequelize.QueryTypes.INSERT })
        res.status(200).json({
            message: 'Ship Update',
            result,
    })

    } catch (error) {
        if (error.name) {
            res.status(400).json({
                error,
                message: 'error en la actualización'
            })
        } else {
            res.status(500).json({
                error,
                message : 'Error inesperado'
            })
        }
    }
}

// Metodo para eliminar una nave
const deleteShipById = async (req, res) =>{
    try {
        const result = await sequelize.query(`DELETE FROM ship WHERE id = ${req.params.shipId}`)
        res.status(200).json({
            message: 'Ship delete',
            result
        })
    } catch (error) {
        if (error.name) {
            res.status(400).json({
                error,
                message: 'error en la eliminación'
            })
        } else {
            res.status(500).json({
                error,
                message : 'Error inesperado'
            })
        }
    }
}

// exponer los metodos a la clase de routes
exports.getProfesional = getProfesional
// exports.getShipId = getShipId
// exports.getShipName = getShipName
// exports.getShipNameInner = getShipNameInner
exports.createProfesional = createProfesional
// exports.updateShipById = updateShipById
// exports.deleteShipById = deleteShipById