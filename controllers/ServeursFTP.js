'use strict';

var utils = require('../utils/writer.js');
var ServeursFTP = require('../service/ServeursFTPService');

module.exports.addFTPServer = function addFTPServer(req, res, next, body) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return utils.writeJson(res, { message: 'Token manquant ou mal formaté' }, 400);
    }

    const token = authHeader.split(' ')[1];

    ServeursFTP.addFTPServer(body, token)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.deleteFTPServer = function deleteFTPServer(req, res, next, alias) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return utils.writeJson(res, { message: 'Token manquant ou mal formaté' }, 400);
    }

    const token = authHeader.split(' ')[1];

    ServeursFTP.deleteFTPServer(alias, token)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getFTPServer = function getFTPServer(req, res, next, alias) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return utils.writeJson(res, { message: 'Token manquant ou mal formaté' }, 400);
    }

    const token = authHeader.split(' ')[1];

    ServeursFTP.getFTPServer(alias, token)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.listFTPServers = function listFTPServers(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return utils.writeJson(res, { message: 'Token manquant ou mal formaté' }, 400);
    }

    const token = authHeader.split(' ')[1];

    ServeursFTP.listFTPServers(token)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.updateFTPServer = function updateFTPServer(req, res, next, body, alias) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return utils.writeJson(res, { message: 'Token manquant ou mal formaté' }, 400);
    }

    const token = authHeader.split(' ')[1];

    ServeursFTP.updateFTPServer(body, alias, token)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};