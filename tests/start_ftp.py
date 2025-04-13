from pyftpdlib.authorizers import DummyAuthorizer
from pyftpdlib.handlers import FTPHandler
from pyftpdlib.servers import FTPServer
import os

# Dossier temporaire pour le FTP
FTP_ROOT = "./ftp_test_dir"

# Création du dossier s'il n'existe pas
if not os.path.exists(FTP_ROOT):
    os.makedirs(FTP_ROOT)

authorizer = DummyAuthorizer()
authorizer.add_user("user1", "password123", FTP_ROOT, perm="elradfmw")  # Ajout des droits

handler = FTPHandler
handler.authorizer = authorizer

server = FTPServer(("127.0.0.1", 2121), handler)

print("Serveur FTP de test en cours d'exécution sur 127.0.0.1:2121")
server.serve_forever()
