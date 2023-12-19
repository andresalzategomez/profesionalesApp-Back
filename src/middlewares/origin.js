const checkSession = (req, res, next) =>{
    const headerAuth = req.headers.authorization || '';
    const token = headerAuth.split(' ').pop()
    console.log("token origin", token);
    console.log("token process", process.env.TOKEN);
    if(!token){
        res.status(402)
        res.send({ error: 'No existe Token'})
    }else if(token.toString() == process.env.TOKEN){
            next()
        }else{
            res.status(402)
            res.send({ error: 'Token incorrecto'})
        }
}

module.exports = {checkSession}