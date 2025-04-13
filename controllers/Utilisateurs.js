'use strict';

var utils = require('../utils/writer.js');
var Utilisateurs = require('../service/UtilisateursService');

module.exports.createUser = function createUser (req, res, next, body) {
    Utilisateurs.createUser(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.deleteUser = function deleteUser (req, res, next, id) {
    Utilisateurs.deleteUser(id)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getUser = function getUser (req, res, next, id) {
    Utilisateurs.getUser(id)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.listUsers = function listUsers (req, res, next) {
    Utilisateurs.listUsers()
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.updateUser = function updateUser (req, res, next, body, id) {
    Utilisateurs.updateUser(body, id)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};