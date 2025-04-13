'use strict';

const fs = require('fs');
const jwt = require('jsonwebtoken');
const secretKey = 'Sr2RimeAvecFabuleux';

const FILE_PATH = 'FlopBox_servers.json';

/**
 * Lire le fichier JSON et retourner les données
 */
exports.readFTPServers = function () {
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

/**
 * Écrire les données dans le fichier JSON
 */
exports.writeFTPServers = function (data) {
  try {
    // console.log ("Data:", data); // Debug
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error("Erreur lors de l'écriture du fichier JSON", error);
  }
}

/**
 * Extraire l'owner_id depuis le token
 */
function getOwnerIdFromToken(token) {
  // console.log("Token:", token); // Debug

  try {
    const decoded = jwt.verify(token, secretKey);
    // console.log("Decoded Token:", decoded); // Debug
    return decoded.username;
  } catch (error) {
    throw new Error("Token invalide");
  }
}

/**
 * Ajouter un serveur FTP (l'owner_id est extrait du token)
 */
exports.addFTPServer = function (body, token) {
  return new Promise((resolve, reject) => {
    let servers = exports.readFTPServers();

    try {
      const owner_id = getOwnerIdFromToken(token);
      body.owner_id = owner_id;

      // Vérifier si le même alias existe déjà pour cet owner_id
      const exists = servers.some(server => server.alias === body.alias && server.owner_id === owner_id);
      // console.log("Exists:", exists); // Debug
      if (exists) {
        return reject({ message: "Un serveur avec cet alias existe déjà pour cet utilisateur" });
      }

      servers.push(body);
      exports.writeFTPServers(servers);
      resolve({ message: "Serveur FTP ajouté avec succès", server: body });

    } catch (error) {
      reject({ message: error.message });
    }
  });
};

/**
 * Supprimer un serveur FTP (seul l'owner peut le faire)
 */
exports.deleteFTPServer = function (alias, token) {
  return new Promise((resolve, reject) => {
    let servers = exports.readFTPServers();

    try {
      const owner_id = getOwnerIdFromToken(token);
      const initialLength = servers.length;

      servers = servers.filter(server => !(server.alias === alias && server.owner_id === owner_id));

      if (servers.length === initialLength) {
        return reject({ message: "Aucun serveur trouvé avec cet alias pour cet utilisateur" });
      }

      exports.writeFTPServers(servers);
      resolve({ message: "Serveur FTP supprimé avec succès" });

    } catch (error) {
      reject({ message: error.message });
    }
  });
};

/**
 * Récupérer un serveur FTP par alias (uniquement pour l'owner)
 */
exports.getFTPServer = function (alias, token) {
  return new Promise(async (resolve, reject) => {

    const servers = await exports.readFTPServers();

    // console.log("Servers:", servers); // Debug

    try {
      const owner_id = getOwnerIdFromToken(token);
      const server = servers.find(server => server.alias === alias && server.owner_id === owner_id);

      // console.log("Server:", server); // Debug
      // console.log("Owner ID:", owner_id); // Debug

      if (!server) {
        return reject({message: "Aucun serveur trouvé avec cet alias pour cet utilisateur"});
      }

      resolve(server);

    } catch (error) {
      reject({message: error.message});
    }
  });
};

/**
 * Lister tous les serveurs d'un utilisateur
 */
exports.listFTPServers = function (token) {
  return new Promise(async(resolve, reject) => {
    try {
      const owner_id = getOwnerIdFromToken(token);
      const servers = exports.readFTPServers().filter(server => server.owner_id === owner_id);
      resolve(servers);

    } catch (error) {
      reject({ message: error.message });
    }
  });
};

/**
 * Mettre à jour un serveur FTP (seul l'owner peut modifier)
 */
exports.updateFTPServer = function (body, alias, token) {
  return new Promise((resolve, reject) => {
    let servers = exports.readFTPServers();

    try {
      const owner_id = getOwnerIdFromToken(token);
      const index = servers.findIndex(server => server.alias === alias && server.owner_id === owner_id);

      if (index === -1) {
        return reject({ message: "Aucun serveur trouvé avec cet alias pour cet utilisateur" });
      }

      servers[index] = { ...servers[index], ...body };
      exports.writeFTPServers(servers);
      resolve({ message: "Serveur FTP mis à jour avec succès", server: servers[index] });

    } catch (error) {
      reject({ message: error.message });
    }
  });
};
