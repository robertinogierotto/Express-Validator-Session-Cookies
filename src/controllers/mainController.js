const { validationResult } = require ('express-validator');

module.exports = {
    index (req, res) {
        let colorDeFondo = '';
        if (req.cookies.color) {
            colorDeFondo = req.cookies.color;
        }
        res.render('index', {colorDeFondo});
    },
    store (req, res) {

        //guardamos los errors del validationResult(req) en una constante
        const errors = validationResult (req);

        //Preguntamos si esta vacio errors
        if (!errors.isEmpty()) {
            //si hay errores mandar todos los errores al ejs y mostrarlas
            console.log(errors.errors)
            res.render ('index', { errors: errors.errors, old: req.body })
        } else {
            //si no vienen errores renderiza la vista index con el mensaje y
            //los valores que hayan puesto en el formulario
            let frase = ('Hola ' +  req.body.name + ', elegiste el color: ' + req.body.color + ', tu email es: ' + req.body.email + ' y tu edad es: ' + req.body.edad);
            let colorDeFondo = '';
            if (req.body.recordar_color) {
                res.cookie('color', req.body.color);
                colorDeFondo = req.cookies.color;
            } else {
                req.session.color = req.body.color;
                colorDeFondo = req.session.color;
            }
            req.session.nombre = req.body.name;
            res.render ('index', { frase, colorDeFondo });
        }
    
    },
    otraVista (req, res) {
        let colorDeFondo = '';
        let nombre = req.session.nombre;
        if (req.cookies.color) {
            colorDeFondo = req.cookies.color;
        }
        res.render('otraVista', {colorDeFondo, nombre});
    }
}