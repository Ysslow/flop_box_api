const bcrypt = require('bcryptjs');
const fs = require('fs');
const AuthentificationService = require('../service/AuthentificationService');
const UtilisateursService = require('../service/UtilisateursService');
const { v4: uuidv4 } = require('uuid');

jest.mock('fs');

const mockUsers = [
    { id: '1', username: 'testuser', password: bcrypt.hashSync('password123', 10) }
];

fs.readFile.mockImplementation((path, callback) => {
    callback(null, JSON.stringify(mockUsers));
});

fs.writeFile.mockImplementation((path, data, callback) => callback(null));

describe('Services Tests', () => {
    describe('AuthentificationService', () => {
        test('Authentification réussie avec un utilisateur valide', async () => {
            const res = await AuthentificationService.authenticateUser('testuser', 'password123');

            expect(res).toHaveProperty('token');
            expect(res.message).toBe('Connexion réussie');
        });

        test('Échec d\'authentification avec un mot de passe incorrect', async () => {
            await expect(AuthentificationService.authenticateUser('testuser', 'wrongpassword'))
                .rejects.toEqual({ message: 'Mot de passe incorrect' });
        });

        test('Échec d\'authentification avec un utilisateur inexistant', async () => {
            await expect(AuthentificationService.authenticateUser('unknownUser', 'password123'))
                .rejects.toEqual({ message: 'Utilisateur non trouvé' });
        });

        test('Erreur lors du chargement des utilisateurs', async () => {
            fs.readFile.mockImplementationOnce((path, callback) => callback(new Error('Erreur de lecture du fichier')));
            await expect(AuthentificationService.authenticateUser('testuser', 'password123'))
                .rejects.toThrow('Erreur de lecture du fichier');
        });
    });

    describe('UtilisateursService', () => {
        test('Création d\'un nouvel utilisateur', async () => {
            const newUser = { username: 'newuser', password: 'newpassword' };
            const res = await UtilisateursService.createUser(newUser);

            expect(res.message).toBe('Utilisateur créé');
            expect(res.user).toHaveProperty('id');
            expect(res.user.username).toBe(newUser.username);
        });

        test('Suppression d\'un utilisateur existant', async () => {
            const userId = '1';
            const res = await UtilisateursService.deleteUser(userId);

            expect(res.message).toBe('Utilisateur supprimé');
        });

        test('Récupération d\'un utilisateur existant', async () => {
            const userId = '1';
            const res = await UtilisateursService.getUser(userId);

            expect(res.username).toBe('testuser');
        });

        test('Liste des utilisateurs', async () => {
            const res = await UtilisateursService.listUsers();

            expect(res).toHaveLength(1);
            expect(res[0].username).toBe('testuser');
        });

        test('Mise à jour d\'un utilisateur existant', async () => {
            const userId = '1';
            const updatedUser = { username: 'updateduser', password: 'updatedpassword' };
            const res = await UtilisateursService.updateUser(updatedUser, userId);

            expect(res.message).toBe('Utilisateur mis à jour');
        });
    });
});