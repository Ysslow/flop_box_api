'use strict';

var utils = require('../utils/writer.js');
var Authentification = require('../service/AuthentificationService');

module.exports.authenticateUser = function authenticateUser (req, res, next, flopbox_username, flopbox_password) {
    Authentification.authenticateUser(flopbox_username, flopbox_password)
        .then(function (response) {
            // Répondre avec les données du token et un message
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            // En cas d'erreur (mauvais identifiants)
            utils.writeJson(res, response, 401);
        });
};