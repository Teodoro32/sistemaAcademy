const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, "cadastroFuncionarios.html");

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end("Erro interno do servidor");
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content);
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
