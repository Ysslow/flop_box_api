const fs = require('fs');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

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

function saveUsers(users) {
  return new Promise((resolve, reject) => {
    fs.writeFile('FlopBox_users.json', JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

exports.createUser = function(body) {
  return new Promise((resolve, reject) => {
    loadUsers().then(users => {
      const existingUser = users.find(u => u.username === body.username);
      if (existingUser) {
        return reject({ message: 'Nom d\'utilisateur déjà pris' });
      }

      bcrypt.hash(body.password, 10, (err, hashedPassword) => {
        if (err) return reject(err);

        const newUser = {
          id: uuidv4(),
          username: body.username,
          password: hashedPassword
        };

        users.push(newUser);
        saveUsers(users).then(() => {
          resolve({ message: 'Utilisateur créé', user: newUser });
        }).catch(reject);
      });
    }).catch(reject);
  });
};

exports.deleteUser = function(id) {
  return new Promise((resolve, reject) => {
    loadUsers().then(users => {
      const index = users.findIndex(user => user.id === id);
      if (index === -1) return reject({ message: 'Utilisateur non trouvé' });

      users.splice(index, 1);
      saveUsers(users).then(() => {
        resolve({ message: 'Utilisateur supprimé' });
      }).catch(reject);
    }).catch(reject);
  });
};

exports.getUser = function(id) {
  return new Promise((resolve, reject) => {
    loadUsers().then(users => {
      const user = users.find(u => u.id === id);
      if (!user) return reject({ message: 'Utilisateur non trouvé' });

      resolve(user);
    }).catch(reject);
  });
};

exports.listUsers = function() {
  return new Promise((resolve, reject) => {
    loadUsers().then(users => {
      resolve(users);
    }).catch(reject);
  });
};

exports.updateUser = function(body, id) {
  return new Promise((resolve, reject) => {
    loadUsers().then(users => {
      const userIndex = users.findIndex(user => user.id === id);
      if (userIndex === -1) return reject({ message: 'Utilisateur non trouvé' });
      if (body.password) {
        bcrypt.hash(body.password, 10, (err, hashedPassword) => {
          if (err) return reject(err);

          users[userIndex].password = hashedPassword;
          users[userIndex].username = body.username || users[userIndex].username;

          saveUsers(users).then(() => {
            resolve({ message: 'Utilisateur mis à jour' });
          }).catch(reject);
        });
      } else {
        users[userIndex].username = body.username || users[userIndex].username;
        saveUsers(users).then(() => {
          resolve({ message: 'Utilisateur mis à jour' });
        }).catch(reject);
      }
    }).catch(reject);
  });
};