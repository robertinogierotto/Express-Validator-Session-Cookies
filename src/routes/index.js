var express = require('express');
var router = express.Router();

const controller = require('../controllers/mainController');

const { check } = require ('express-validator');
const mainController = require('../controllers/mainController');

const validateForm = [

    check('name').notEmpty().withMessage('Debe introducir un nombre'),
    check('color').notEmpty().withMessage('Debe seleccionar un color'),
    check('email').notEmpty().withMessage('Debe introducir un email').bail().isEmail().withMessage('Debe introducir un email valido'),
    check('edad')
    .optional({ checkFalsy: true })
    .isNumeric().withMessage('Debe ingresar un numero en el campo "edad"')
];


router.get('/', controller.index);
router.post('/', validateForm, controller.store);
router.get ('/otraVista', mainController.otraVista);

module.exports = router;
