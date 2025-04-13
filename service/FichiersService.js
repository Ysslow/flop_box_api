'use strict';

const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const FILE_PATH = 'FlopBox_servers.json';
const secretKey = 'Sr2RimeAvecFabuleux';

/**
 * Lire le fichier JSON et retourner les données
 */
function readFTPServers() {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      fs.writeFileSync(FILE_PATH, '[]', 'utf8');
    }
    return JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
  } catch (error) {
    console.error("Erreur lors de la lecture du fichier JSON", error);
    return [];
  }
}

const ftpServers = readFTPServers();

/**
 * Récupérer les informations d'un serveur FTP par son alias
 * @param {string} alias L'alias du serveur FTP
 * @returns {object} Informations sur le serveur FTP
 */
function getServerInfoByAlias(alias) {
  return ftpServers.find((server) => server.alias === alias);
}

/**
 * Se connecter à un serveur FTP
 * @param {string} ftp_username Nom d'utilisateur FTP
 * @param {string} ftp_password Mot de passe FTP
 * @param {string} alias Alias du serveur FTP
 * @returns {Promise<{client: ftp.Client, server: object}>} Client FTP connecté et infos du serveur
 */
async function connectToFTP(ftp_username, ftp_password, alias) {
  const client = new ftp.Client();
  const server = getServerInfoByAlias(alias);

  if (!server) {
    throw new Error("Serveur non trouvé");
  }

  try {
    await client.access({
      host: server.host,
      port: server.port,
      user: ftp_username,
      password: ftp_password,
    });

    return { client, server };
  } catch (error) {
    client.close();
    throw new Error("Échec de connexion au serveur FTP");
  }
}

/**
 * Lister les fichiers d’un serveur FTP
 *
 * alias String
 * ftp_username String
 * ftp_password String
 * no response value expected for this operation
 **/
exports.listFTPFiles = async function(ftp_username, ftp_password, alias) {
  try {
    const { client } = await connectToFTP(ftp_username, ftp_password, alias);
    const fileList = await client.list();
    client.close();
    return { message: "Liste des fichiers récupérée avec succès", files: fileList };
  } catch (error) {
    throw { message: "Erreur lors de la récupération des fichiers", error };
  }
};


/**
 * Supprimer un fichier d’un serveur FTP
 *
 * alias String
 * filename String
 * ftp_username String
 * ftp_password String
 * no response value expected for this operation
 **/
exports.deleteFile = async function(ftp_username, ftp_password, alias, filename) {
  try {
    const { client } = await connectToFTP(ftp_username, ftp_password, alias);
    await client.remove(filename);
    client.close();
    return { message: `Fichier '${filename}' supprimé avec succès` };
  } catch (error) {
    throw { message: `Erreur lors de la suppression du fichier '${filename}'`, error };
  }
};


/**
 * Download un fichier depuis un serveur FTP
 *
 * alias String
 * filename String
 * ftp_username String
 * ftp_password String
 * no response value expected for this operation
 **/
exports.downloadFile = async function(ftp_username, ftp_password, alias, filename, localPath = `./FtpServers/LocalServer/${filename}`) {
  try {
    const { client } = await connectToFTP(ftp_username, ftp_password, alias);
    await client.downloadTo(localPath, filename);
    client.close();
    return { message: `Fichier '${filename}' téléchargé avec succès` };
  } catch (error) {
    throw { message: `Erreur lors du téléchargement du fichier '${filename}'`, error };
  }
};

/**
 * Upload un fichier vers un serveur FTP
 *
 * body Object  (optional)
 * ftp_username String
 * ftp_password String
 * alias String
 * filename String
 * no response value expected for this operation
 **/
exports.uploadFile = async function(ftp_username, ftp_password, localFilePath, alias, remoteFilename) {
  try {
    if (!fs.existsSync(localFilePath)) {
      throw new Error(`Le fichier local '${localFilePath}' n'existe pas.`);
    }

    const { client } = await connectToFTP(ftp_username, ftp_password, alias);
    await client.uploadFrom(localFilePath, remoteFilename);
    client.close();

    return { message: `Fichier '${localFilePath}' uploadé avec succès sous '${remoteFilename}'` };
  } catch (error) {
    throw { message: `Erreur lors de l'upload du fichier '${localFilePath}'`, error: error.message };
  }
};

/**
 * Renommer un fichier d’un serveur FTP
 *
 * body Files_filename_body  (optional)
 * ftp_username String
 * ftp_password String
 * alias String
 * filename String
 * no response value expected for this operation
 **/
exports.renameFile = async function(newFilename,ftp_username, ftp_password, alias, oldFilename) {
  try {
    const { client } = await connectToFTP(ftp_username, ftp_password, alias);
    await client.rename(oldFilename, newFilename);
    client.close();
    return { message: `Fichier '${oldFilename}' renommé en '${newFilename}' avec succès` };
  } catch (error) {
    throw { message: `Erreur lors du renommage du fichier '${oldFilename}'`, error };
  }
};

/**
 * Créer un fichier vide sur un serveur FTP
 *
 * alias String
 * filename String
 * ftp_username String
 * ftp_password String
 * no response value expected for this operation
 **/
exports.createFile = async function(ftp_username, ftp_password, alias, filename) {
  try {
    const { client } = await connectToFTP(ftp_username, ftp_password, alias);

    const tempFilePath = path.join(__dirname, 'temp_empty_file.txt');
    fs.writeFileSync(tempFilePath, ''); // Créer un fichier vide
    await client.uploadFrom(tempFilePath, filename);
    fs.unlinkSync(tempFilePath);

    client.close();
    return { message: `Fichier '${filename}' créé avec succès sur le serveur FTP` };
  } catch (error) {
    throw { message: `Erreur lors de la création du fichier '${filename}'`, error };
  }
};

/**
 * Extraire l'owner_id depuis le token
 */
function getOwnerIdFromToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded.username;
  } catch (error) {
    throw new Error("Token invalide");
  }
}

/**
 * Récupérer les alias des serveurs FTP d'un utilisateur
 * @param {string} username L'username de l'utilisateur
 * @returns {object} Informations sur le serveur FTP
 */
function getAllServerAliasByUser(username) {
    return ftpServers.filter((server) => server.owner_id === username);
}

/**
 * Rechercher un fichier sur les serveurs FTP d'un utilisateur
 *
 * alias String
 * filename String
 * ftp_username String
 * ftp_password String
 * no response value expected for this operation
 **/
exports.searchFile = async function(filename, token) {
    try {
      const ftp_username = getOwnerIdFromToken(token);
      const aliases = getAllServerAliasByUser(ftp_username);
      const files = [];
      for (const alias of aliases) {
          const { client } = await connectToFTP("anonymous", "anonymous", alias.alias);
          const fileList = await client.list();
          client.close();
          const foundFile = fileList.find((file) => file.name === filename);
          if (foundFile) {
              files.push({ server: alias.alias, file: foundFile });
          }
      }
      return { message: `Fichier '${filename}' trouvé sur les serveurs FTP`, files };
    }
    catch (error) {
        throw { message: `Erreur lors de la recherche du fichier '${filename}'`, error };
    }
}