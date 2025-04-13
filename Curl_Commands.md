Créer un utilisateur :

```bash
curl -X POST "http://localhost:8080/v2/users" \
  -H "Content-Type: application/json" \
  -d '{"username": "user6", "password": "password123"}'
```

Créer un token d'authentification FlopBox :

```bash
curl -X POST "http://localhost:8080/v2/auth?flopbox_username=Lucas&flopbox_password=Nox" \
-H "Content-Type: application/json"
```

Lister les utilisateurs :

```bash
curl -X GET "http://localhost:8080/v2/users" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1Y2FzIiwiaWQiOiI1ZTZhMTAwZi1iOThkLTRhMzktYTg1Zi0zYTk3OTIzNDUzZjciLCJpYXQiOjE3NDI5MzkwNDQsImV4cCI6MTc0Mjk0MjY0NH0.BWW0OStcsfa3QkKidJPwk2FTO17dSvbKvLkKpJpyGSw"
```

Récupérer un utilisateur par ID :

```bash
curl -X GET "http://localhost:8080/v2/users/8a60d972-f463-4e67-b46a-28bf99b03aef" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1Y2FzIiwiaWQiOiI1ZTZhMTAwZi1iOThkLTRhMzktYTg1Zi0zYTk3OTIzNDUzZjciLCJpYXQiOjE3NDI5MzkwNDQsImV4cCI6MTc0Mjk0MjY0NH0.BWW0OStcsfa3QkKidJPwk2FTO17dSvbKvLkKpJpyGSw"
```

Mettre à jour un utilisateur :

```bash
curl -X PUT "http://localhost:8080/v2/users/c067d953-a20c-4f74-9909-f3b61e8a4265" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1Y2FzIiwiaWQiOiI1ZTZhMTAwZi1iOThkLTRhMzktYTg1Zi0zYTk3OTIzNDUzZjciLCJpYXQiOjE3NDI5MzkwNDQsImV4cCI6MTc0Mjk0MjY0NH0.BWW0OStcsfa3QkKidJPwk2FTO17dSvbKvLkKpJpyGSw" \
  -d '{"username": "user3_updated", "password": "newpassword123"}'
```

Supprimer un utilisateur :

```bash
curl -X DELETE "http://localhost:8080/v2/users/c067d953-a20c-4f74-9909-f3b61e8a4265" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1Y2FzIiwiaWQiOiI1ZTZhMTAwZi1iOThkLTRhMzktYTg1Zi0zYTk3OTIzNDUzZjciLCJpYXQiOjE3NDI5MzkwNDQsImV4cCI6MTc0Mjk0MjY0NH0.BWW0OStcsfa3QkKidJPwk2FTO17dSvbKvLkKpJpyGSw"
```

Ajouter un serveur FTP :

```bash
curl -X POST "http://localhost:8080/v2/ftp-servers" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1Y2FzIiwiaWQiOiI1ZTZhMTAwZi1iOThkLTRhMzktYTg1Zi0zYTk3OTIzNDUzZjciLCJpYXQiOjE3NDI5MzkwNDQsImV4cCI6MTc0Mjk0MjY0NH0.BWW0OStcsfa3QkKidJPwk2FTO17dSvbKvLkKpJpyGSw" \
  -d '{
    "alias": "monserveur",
    "host": "ftp.monserveur.com",
    "port": 21
  }'
```

Lister les serveurs FTP (appartenant au user du token):

```bash
curl -X GET "http://localhost:8080/v2/ftp-servers" \
-H "Content-Type: application" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1Y2FzIiwiaWQiOiI1ZTZhMTAwZi1iOThkLTRhMzktYTg1Zi0zYTk3OTIzNDUzZjciLCJpYXQiOjE3NDI5MzkwNDQsImV4cCI6MTc0Mjk0MjY0NH0.BWW0OStcsfa3QkKidJPwk2FTO17dSvbKvLkKpJpyGSw"
```

Récupérer un serveur FTP par alias :

```bash
curl -X GET "http://localhost:8080/v2/ftp-servers/serv1" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1Y2FzIiwiaWQiOiI1ZTZhMTAwZi1iOThkLTRhMzktYTg1Zi0zYTk3OTIzNDUzZjciLCJpYXQiOjE3NDI5MzkwNDQsImV4cCI6MTc0Mjk0MjY0NH0.BWW0OStcsfa3QkKidJPwk2FTO17dSvbKvLkKpJpyGSw"
```

Mettre à jour un serveur FTP :

```bash
curl -X PUT "http://localhost:8080/v2/ftp-servers/monserveur" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1Y2FzIiwiaWQiOiI1ZTZhMTAwZi1iOThkLTRhMzktYTg1Zi0zYTk3OTIzNDUzZjciLCJpYXQiOjE3NDI5MzkwNDQsImV4cCI6MTc0Mjk0MjY0NH0.BWW0OStcsfa3QkKidJPwk2FTO17dSvbKvLkKpJpyGSw" \
-d '{
  "host": "nouveau.ftp.monserveuràjour.com",
  "port": 22
}'
```

Supprimer un serveur FTP :

```bash
curl -X DELETE "http://localhost:8080/v2/ftp-servers/monserveur" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1Y2FzIiwiaWQiOiI1ZTZhMTAwZi1iOThkLTRhMzktYTg1Zi0zYTk3OTIzNDUzZjciLCJpYXQiOjE3NDI5MzkwNDQsImV4cCI6MTc0Mjk0MjY0NH0.BWW0OStcsfa3QkKidJPwk2FTO17dSvbKvLkKpJpyGSw"
```

Lister les fichiers sur un serveur FTP :

```bash
curl -X GET "http://localhost:8080/v2/ftp-servers/serv1/files?ftp_username=user1&ftp_password=password123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1Y2FzIiwiaWQiOiI1ZTZhMTAwZi1iOThkLTRhMzktYTg1Zi0zYTk3OTIzNDUzZjciLCJpYXQiOjE3NDI5MzkwNDQsImV4cCI6MTc0Mjk0MjY0NH0.BWW0OStcsfa3QkKidJPwk2FTO17dSvbKvLkKpJpyGSw"
```

Supprimer un fichier sur un serveur FTP :

```bash
curl -X DELETE "http://localhost:8080/v2/ftp-servers/serv1/files/test.txt?ftp_username=user1&ftp_password=password123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1Y2FzIiwiaWQiOiI1ZTZhMTAwZi1iOThkLTRhMzktYTg1Zi0zYTk3OTIzNDUzZjciLCJpYXQiOjE3NDI5MzkwNDQsImV4cCI6MTc0Mjk0MjY0NH0.BWW0OStcsfa3QkKidJPwk2FTO17dSvbKvLkKpJpyGSw"
```

Download un fichier sur un serveur FTP :

```bash
curl -X GET "http://localhost:8080/v2/ftp-servers/serv1/files/test2.txt?ftp_username=user1&ftp_password=password123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1Y2FzIiwiaWQiOiI1ZTZhMTAwZi1iOThkLTRhMzktYTg1Zi0zYTk3OTIzNDUzZjciLCJpYXQiOjE3NDI5MzkwNDQsImV4cCI6MTc0Mjk0MjY0NH0.BWW0OStcsfa3QkKidJPwk2FTO17dSvbKvLkKpJpyGSw"
  
curl -X GET "http://localhost:8080/v2/ftp-servers/serv1/files/SR1-TreeFTP.mov?ftp_username=user1&ftp_password=password123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1Y2FzIiwiaWQiOiI1ZTZhMTAwZi1iOThkLTRhMzktYTg1Zi0zYTk3OTIzNDUzZjciLCJpYXQiOjE3NDI5MzkwNDQsImV4cCI6MTc0Mjk0MjY0NH0.BWW0OStcsfa3QkKidJPwk2FTO17dSvbKvLkKpJpyGSw"
```

Upload un fichier sur un serveur FTP :

```bash
curl -X POST "http://localhost:8080/v2/ftp-servers/serv1/files/test.txt?ftp_username=user1&ftp_password=password123&filepath=%2FUsers%2Fldeloiso%2FIdeaProjects%2Fsr2-flopboxp1%2FFtpServers%2FLocalServer%2Ftest.txt" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1Y2FzIiwiaWQiOiI1ZTZhMTAwZi1iOThkLTRhMzktYTg1Zi0zYTk3OTIzNDUzZjciLCJpYXQiOjE3NDI5MzkwNDQsImV4cCI6MTc0Mjk0MjY0NH0.BWW0OStcsfa3QkKidJPwk2FTO17dSvbKvLkKpJpyGSw" \
  --data-binary "@/Users/ldeloiso/IdeaProjects/sr2-flopboxp1/FtpServers/LocalServer/test.txt" \
  -H "Content-Type: application/octet-stream"
  
curl -X POST "http://localhost:8080/v2/ftp-servers/serv1/files/test_video.mov?ftp_username=user1&ftp_password=password123&filepath=%2FUsers%2Fldeloiso%2FIdeaProjects%2Fsr2-flopboxp1%2FFtpServers%2FLocalServer%2Ftest-mov.mov" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1Y2FzIiwiaWQiOiI1ZTZhMTAwZi1iOThkLTRhMzktYTg1Zi0zYTk3OTIzNDUzZjciLCJpYXQiOjE3NDI5MzkwNDQsImV4cCI6MTc0Mjk0MjY0NH0.BWW0OStcsfa3QkKidJPwk2FTO17dSvbKvLkKpJpyGSw" \
  --data-binary "@/Users/ldeloiso/IdeaProjects/sr2-flopboxp1/FtpServers/LocalServer/test-mov.mov" \
  -H "Content-Type: application/octet-stream"

```

Renommer un fichier sur un serveur FTP :

```bash
curl -X PATCH "http://localhost:8080/v2/ftp-servers/serv1/files/test.txt/rename?ftp_username=user1&ftp_password=password123&new_filename=test_rename.txt" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1Y2FzIiwiaWQiOiI1ZTZhMTAwZi1iOThkLTRhMzktYTg1Zi0zYTk3OTIzNDUzZjciLCJpYXQiOjE3NDI5MzkwNDQsImV4cCI6MTc0Mjk0MjY0NH0.BWW0OStcsfa3QkKidJPwk2FTO17dSvbKvLkKpJpyGSw"
```

Créer un fichier sur un serveur FTP :

```bash
curl -X POST "http://localhost:8080/v2/ftp-servers/serv1/files/test_create2.txt/create?ftp_username=user1&ftp_password=password123" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1Y2FzIiwiaWQiOiI1ZTZhMTAwZi1iOThkLTRhMzktYTg1Zi0zYTk3OTIzNDUzZjciLCJpYXQiOjE3NDI5MzkwNDQsImV4cCI6MTc0Mjk0MjY0NH0.BWW0OStcsfa3QkKidJPwk2FTO17dSvbKvLkKpJpyGSw"
```

Chercher un fichier sur les serveurs FTP d'un user :

```bash
curl -X GET "http://localhost:8080/v2/ftp-servers/search?ftp_username=user1&ftp_password=password123&filename=test2.txt" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1Y2FzIiwiaWQiOiI1ZTZhMTAwZi1iOThkLTRhMzktYTg1Zi0zYTk3OTIzNDUzZjciLCJpYXQiOjE3NDI5MzkwNDQsImV4cCI6MTc0Mjk0MjY0NH0.BWW0OStcsfa3QkKidJPwk2FTO17dSvbKvLkKpJpyGSw"
``` 