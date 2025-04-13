const jwt = require('jsonwebtoken');
const fs = require('fs');
const secretKey = 'Sr2RimeAvecFabuleux';
const bcrypt = require('bcryptjs');

function loadUsers() {
    return new Promise((resolve, reject) => {
        fs.readFile('FlopBox_users.json', (err, data) => {
            if (err) {
                return reject(err);
            }
            try {
                resolve(JSON.parse(data));
            } catch (e) {
                reject(e);
            }
        });
    });
}

/**
 * Authentifier un utilisateur sur FlopBox
 *
 * @param {string} flopbox_username - Nom d'utilisateur de FlopBox
 * @param {string} flopbox_password - Mot de passe de FlopBox
 * @returns {Promise} - Résultat de l'authentification avec un token JWT si valide
 */
exports.authenticateUser = function(flopbox_username, flopbox_password) {
    return new Promise((resolve, reject) => {
        loadUsers().then(users => {
            const user = users.find(u => u.username === flopbox_username);
            if (!user) return reject({ message: 'Utilisateur non trouvé' });

            bcrypt.compare(flopbox_password, user.password, (err, result) => {
                if (err) return reject(err);

                if (result) {
                    const token = jwt.sign({ username: flopbox_username, id: user.id }, secretKey, { expiresIn: '1h' });
                    resolve({ message: 'Connexion réussie', token: token });
                } else {
                    reject({ message: 'Mot de passe incorrect' });
                }
            });
        }).catch(reject);
    });
};