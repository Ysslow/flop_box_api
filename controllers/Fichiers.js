'use strict';

var utils = require('../utils/writer.js');
var Fichiers = require('../service/FichiersService');

module.exports.deleteFile = function deleteFile (req, res, next, alias, filename, ftp_username, ftp_password) {
    Fichiers.deleteFile(alias, filename, ftp_username, ftp_password)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.downloadFile = function downloadFile (req, res, next, alias, filename, ftp_username, ftp_password) {
    Fichiers.downloadFile(alias, filename, ftp_username, ftp_password)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.listFTPFiles = function listFTPFiles (req, res, next, alias, ftp_username, ftp_password) {
    Fichiers.listFTPFiles(alias, ftp_username, ftp_password)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.renameFile = function renameFile (req, res, next, body, ftp_username, ftp_password, alias, filename, newFilename) {
    Fichiers.renameFile(body, ftp_username, ftp_password, alias, filename, newFilename)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.uploadFile = function uploadFile (req, res, next, body, ftp_username, ftp_password, alias, filename, filepath) {
    Fichiers.uploadFile(body, ftp_username, ftp_password, alias, filename, filepath)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.createFile = function createFile (req, res, next, alias, filename, ftp_username, ftp_password) {
    Fichiers.createFile(alias, filename, ftp_username, ftp_password)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.searchFile = function searchFile (req, res, next, filename, ftp_username, ftp_password) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return utils.writeJson(res, { message: 'Token manquant ou mal formaté' }, 400);
    }

    const token = authHeader.split(' ')[1];

    Fichiers.searchFile(filename, token)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
}