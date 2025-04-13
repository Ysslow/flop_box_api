const ftp = require("basic-ftp");
const { spawn } = require("child_process");
const fs = require("fs");

const FTP_HOST = "127.0.0.1";
const FTP_PORT = 2121;
const FTP_USER = "user1";
const FTP_PASS = "password123";

let ftpServerProcess;

async function waitForFTPReady(retries = 5, delay = 2000) {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    for (let i = 0; i < retries; i++) {
        try {
            await client.access({
                host: FTP_HOST,
                port: FTP_PORT,
                user: FTP_USER,
                password: FTP_PASS,
            });
            client.close();
            return;
        } catch (error) {
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }

    throw new Error("Impossible de se connecter au serveur FTP !");
}

async function setupTestFTP() {
    const client = new ftp.Client();
    await client.access({
        host: FTP_HOST,
        port: FTP_PORT,
        user: FTP_USER,
        password: FTP_PASS,
    });

    fs.writeFileSync("test.txt", "Hello World!");
    await client.uploadFrom("test.txt", "test.txt");
    fs.unlinkSync("test.txt"); // Nettoyage du fichier temporaire
    await client.ensureDir("test_folder");
    client.close();
}

describe("Tests du serveur FTP", () => {
    beforeAll(async () => {
        ftpServerProcess = spawn("python3", ["tests/start_ftp.py"]);
        await waitForFTPReady();
        await setupTestFTP();
    });

    afterAll(() => {
        if (ftpServerProcess) {
            ftpServerProcess.kill();
        }
    });

    describe("Gestion des fichiers", () => {
        test("Lister les fichiers", async () => {
            const client = new ftp.Client();
            await client.access({
                host: FTP_HOST,
                port: FTP_PORT,
                user: FTP_USER,
                password: FTP_PASS,
            });

            const list = await client.list();
            client.close();

            expect(list.some(file => file.name === "test.txt")).toBeTruthy();
        });

        test("Télécharger un fichier", async () => {
            const client = new ftp.Client();
            await client.access({
                host: FTP_HOST,
                port: FTP_PORT,
                user: FTP_USER,
                password: FTP_PASS,
            });

            await client.downloadTo("downloaded_test.txt", "test.txt");
            const content = fs.readFileSync("downloaded_test.txt", "utf8");
            fs.unlinkSync("downloaded_test.txt"); // Nettoyage

            client.close();
            expect(content).toBe("Hello World!");
        });

        test("Renommer un fichier", async () => {
            const client = new ftp.Client();
            await client.access({
                host: FTP_HOST,
                port: FTP_PORT,
                user: FTP_USER,
                password: FTP_PASS,
            });

            await client.rename("test.txt", "renamed.txt");
            const list = await client.list();
            client.close();

            expect(list.some(file => file.name === "renamed.txt")).toBeTruthy();
        });

        test("Supprimer un fichier", async () => {
            const client = new ftp.Client();
            await client.access({
                host: FTP_HOST,
                port: FTP_PORT,
                user: FTP_USER,
                password: FTP_PASS,
            });

            await client.remove("renamed.txt");
            const list = await client.list();
            client.close();

            expect(list.some(file => file.name === "renamed.txt")).toBeFalsy();
        });
    });
});
