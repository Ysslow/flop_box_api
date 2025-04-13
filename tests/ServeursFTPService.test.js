const ServeursFTPService = require('../service/ServeursFTPService');
const jwt = require('jsonwebtoken');
const secretKey = 'Sr2RimeAvecFabuleux';

describe('ServeursFTPService', () => {
    let validToken;
    let invalidToken;

    // Token valide pour un utilisateur
    beforeAll(() => {
        validToken = jwt.sign({username: 'user1'}, secretKey, {expiresIn: '1h'});
        invalidToken = 'invalidToken'; // Token invalide
    });

    // Test de récupération d'un serveur FTP par alias
    it('Récupérer un serveur FTP par alias', async () => {
        const serversMock = [
            {alias: 'server1', host: 'ftp.example.com', port: 21, owner_id: 'user1'}
        ];

        jest.spyOn(ServeursFTPService, 'readFTPServers').mockResolvedValue(serversMock);
        const result = await ServeursFTPService.getFTPServer('server1', validToken);
        expect(result).toEqual(serversMock[0]);
    });

// Test d'échec de récupération d'un serveur FTP par alias si le serveur n'existe pas
    it('Ne peut pas récupérer un serveur inexistant', async () => {
        const serversMock = [
            { alias: 'server1', host: 'ftp.example.com', port: 21, owner_id: 'user1' }
        ];

        jest.spyOn(ServeursFTPService, 'readFTPServers').mockReturnValue(serversMock);

        await expect(ServeursFTPService.getFTPServer('server2', validToken))
            .rejects.toEqual({ message: 'Aucun serveur trouvé avec cet alias pour cet utilisateur' });
    });

    // Test d'ajout d'un serveur avec un alias existant
    it('Ne peut pas ajouter un serveur avec un alias existant', async () => {
        const existingServer = { alias: 'server1', host: 'ftp.example.com', port: 21 };
        const serversMock = [
            { alias: 'server1', host: 'ftp.example.com', port: 21, owner_id: 'user1' }
        ];

        jest.spyOn(ServeursFTPService, 'readFTPServers').mockReturnValue(serversMock);
        jest.spyOn(ServeursFTPService, 'writeFTPServers').mockImplementation(() => {});

        await expect(ServeursFTPService.addFTPServer(existingServer, validToken))
            .rejects.toEqual({ message: 'Un serveur avec cet alias existe déjà pour cet utilisateur' });
    });

    // Test d'ajout d'un serveur avec un alias valide
    it('Peut ajouter un serveur FTP avec un alias valide', async () => {
        const newServer = { alias: 'server2', host: 'ftp2.example.com', port: 22 };
        const serversMock = [
            { alias: 'server1', host: 'ftp.example.com', port: 21, owner_id: 'user1' }
        ];

        jest.spyOn(ServeursFTPService, 'readFTPServers').mockReturnValue(serversMock);
        jest.spyOn(ServeursFTPService, 'writeFTPServers').mockImplementation(() => {});

        const result = await ServeursFTPService.addFTPServer(newServer, validToken);
        expect(result).toEqual({ message: 'Serveur FTP ajouté avec succès', server: newServer });
    });

    // Test de suppression d'un serveur FTP
    it('Supprimer un serveur FTP existant', async () => {
        const serversMock = [
            { alias: 'server1', host: 'ftp.example.com', port: 21, owner_id: 'user1' }
        ];

        jest.spyOn(ServeursFTPService, 'readFTPServers').mockReturnValue(serversMock);
        jest.spyOn(ServeursFTPService, 'writeFTPServers').mockImplementation(() => {});

        const result = await ServeursFTPService.deleteFTPServer('server1', validToken);
        expect(result).toEqual({ message: 'Serveur FTP supprimé avec succès' });
    });

    // Test d'échec de suppression d'un serveur FTP si le serveur n'existe pas
    it('Ne peut pas supprimer un serveur inexistant', async () => {
        const serversMock = [
            { alias: 'server1', host: 'ftp.example.com', port: 21, owner_id: 'user1' }
        ];

        jest.spyOn(ServeursFTPService, 'readFTPServers').mockReturnValue(serversMock);
        jest.spyOn(ServeursFTPService, 'writeFTPServers').mockImplementation(() => {});

        await expect(ServeursFTPService.deleteFTPServer('server2', validToken))
            .rejects.toEqual({ message: 'Aucun serveur trouvé avec cet alias pour cet utilisateur' });
    });

    // Test de mise à jour d'un serveur FTP existant
    it('Mettre à jour un serveur FTP existant', async () => {
        const serversMock = [
            { alias: 'server1', host: 'ftp.example.com', port: 21, owner_id: 'user1' }
        ];

        const updatedServer = { alias: 'server1', host: 'ftp.updated.com', port: 22, owner_id: 'user1'};

        jest.spyOn(ServeursFTPService, 'readFTPServers').mockReturnValue(serversMock);
        jest.spyOn(ServeursFTPService, 'writeFTPServers').mockImplementation(() => {});

        const result = await ServeursFTPService.updateFTPServer(updatedServer, 'server1', validToken);
        expect(result).toEqual({ message: 'Serveur FTP mis à jour avec succès', server: updatedServer });
    });

    // Test d'échec de mise à jour d'un serveur FTP inexistant
    it('Ne peut pas mettre à jour un serveur FTP inexistant', async () => {
        const serversMock = [
            { alias: 'server1', host: 'ftp.example.com', port: 21, owner_id: 'user1' }
        ];

        jest.spyOn(ServeursFTPService, 'readFTPServers').mockReturnValue(serversMock);

        const updatedServer = { alias: 'server2', host: 'ftp.updated.com', port: 22 };

        await expect(ServeursFTPService.updateFTPServer(updatedServer, 'server2', validToken))
            .rejects.toEqual({ message: 'Aucun serveur trouvé avec cet alias pour cet utilisateur' });
    });

    // Test de liste des serveurs FTP pour un utilisateur
    it('Lister les serveurs FTP d\'un utilisateur', async () => {
        const serversMock = [
            { alias: 'server1', host: 'ftp.example.com', port: 21, owner_id: 'user1' },
            { alias: 'server2', host: 'ftp2.example.com', port: 22, owner_id: 'user1' }
        ];

        jest.spyOn(ServeursFTPService, 'readFTPServers').mockReturnValue(serversMock);

        const result = await ServeursFTPService.listFTPServers(validToken);
        expect(result).toEqual(serversMock);
    });

    // Test d'échec de liste des serveurs FTP pour un utilisateur (aucun serveur)
    it('Ne retourne pas de serveurs si l\'utilisateur n\'en a pas', async () => {
        jest.spyOn(ServeursFTPService, 'readFTPServers').mockReturnValue([]);

        const result = await ServeursFTPService.listFTPServers(validToken);
        expect(result).toEqual([]);
    });
});
