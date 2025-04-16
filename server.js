// const http = require("http");
// const fs = require("fs");
// const path = require("path");

// const server = http.createServer((req, res) => {
//     // Caminho padrão: se a URL for "/", carregamos o HTML principal
//     let filePath = req.url === "/" ? "cadastroFuncionarios.html" : req.url;

//     // Cria o caminho absoluto
//     filePath = path.join(__dirname, filePath);

//     // Determina o tipo de conteúdo com base na extensão do arquivo
//     const extname = path.extname(filePath);
//     let contentType = "text/html";

//     switch (extname) {
//         case ".js":
//             contentType = "text/javascript";
//             break;
//         case ".css":
//             contentType = "text/css";
//             break;
//         case ".json":
//             contentType = "application/json";
//             break;
//         case ".png":
//             contentType = "image/png";
//             break;
//         case ".jpg":
//         case ".jpeg":
//             contentType = "image/jpeg";
//             break;
//     }

//     // Lê o arquivo e responde
//     fs.readFile(filePath, (err, content) => {
//         if (err) {
//             if (err.code === "ENOENT") {
//                 res.writeHead(404, { "Content-Type": "text/html" });
//                 res.end("<h1>404 - Página não encontrada</h1>");
//             } else {
//                 res.writeHead(500);
//                 res.end(`Erro interno do servidor: ${err.code}`);
//             }
//         } else {
//             res.writeHead(200, { "Content-Type": contentType });
//             res.end(content);
//         }
//     });
// });

// const PORT = 3000;
// server.listen(PORT, () => {
//     console.log(`Servidor rodando em http://localhost:${PORT}`);
// });

// const http = require("http");
// const fs = require("fs");
// const path = require("path");

// const funcionariosFilePath = path.join(__dirname, "funcionarios.json");

// const server = http.createServer((req, res) => {
//     let filePath = req.url === "/" ? "cadastroFuncionarios.html" : req.url;

//     filePath = path.join(__dirname, filePath);

//     const extname = path.extname(filePath);
//     let contentType = "text/html";

//     switch (extname) {
//         case ".js":
//             contentType = "text/javascript";
//             break;
//         case ".css":
//             contentType = "text/css";
//             break;
//         case ".json":
//             contentType = "application/json";
//             break;
//         case ".png":
//             contentType = "image/png";
//             break;
//         case ".jpg":
//         case ".jpeg":
//             contentType = "image/jpeg";
//             break;
//     }

//     if (req.url === "/api/funcionarios" && req.method === "GET") {
//         // Lê os dados do arquivo JSON
//         fs.readFile(funcionariosFilePath, (err, content) => {
//             if (err) {
//                 res.writeHead(500, { "Content-Type": "text/html" });
//                 res.end("Erro ao ler arquivo de funcionários");
//             } else {
//                 res.writeHead(200, { "Content-Type": "application/json" });
//                 res.end(content);
//             }
//         });
//     } else if (req.url === "/api/funcionarios" && req.method === "POST") {
//         let body = "";
//         req.on("data", chunk => {
//             body += chunk;
//         });

//         req.on("end", () => {
//             const novoFuncionario = JSON.parse(body);

//             // Lê os dados existentes
//             fs.readFile(funcionariosFilePath, (err, content) => {
//                 let funcionarios = [];
//                 if (content) {
//                     funcionarios = JSON.parse(content);
//                 }

//                 // Adiciona o novo funcionário
//                 funcionarios.push(novoFuncionario);

//                 // Salva de volta no arquivo JSON
//                 fs.writeFile(funcionariosFilePath, JSON.stringify(funcionarios, null, 2), (err) => {
//                     if (err) {
//                         res.writeHead(500, { "Content-Type": "text/html" });
//                         res.end("Erro ao salvar funcionário");
//                     } else {
//                         res.writeHead(201, { "Content-Type": "application/json" });
//                         res.end(JSON.stringify(novoFuncionario));
//                     }
//                 });
//             });
//         });
//     } else {
//         fs.readFile(filePath, (err, content) => {
//             if (err) {
//                 if (err.code === "ENOENT") {
//                     res.writeHead(404, { "Content-Type": "text/html" });
//                     res.end("<h1>404 - Página não encontrada</h1>");
//                 } else {
//                     res.writeHead(500);
//                     res.end(`Erro interno do servidor: ${err.code}`);
//                 }
//             } else {
//                 res.writeHead(200, { "Content-Type": contentType });
//                 res.end(content);
//             }
//         });
//     }
// });

// const PORT = 3000;
// server.listen(PORT, () => {
//     console.log(`Servidor rodando em http://localhost:${PORT}`);
// });

const http = require("http");
const fs = require("fs");
const path = require("path");

const funcionariosFilePath = path.join(__dirname, "funcionarios.json");

const server = http.createServer((req, res) => {
  // Define o caminho do arquivo a ser servido
  let filePath = req.url === "/" ? "cadastroFuncionarios.html" : req.url;
  filePath = path.join(__dirname, filePath);

  // Determina o tipo de conteúdo com base na extensão do arquivo
  const extname = path.extname(filePath);
  let contentType = "text/html";

  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
    case ".jpeg":
      contentType = "image/jpeg";
      break;
  }

  // Verifica a requisição GET para /api/funcionarios
  if (req.url === "/api/funcionarios" && req.method === "GET") {
    // Verifica se o arquivo existe
    fs.access(funcionariosFilePath, fs.constants.F_OK, (err) => {
      if (err) {
        // Se o arquivo não existir, cria um arquivo vazio
        fs.writeFile(funcionariosFilePath, JSON.stringify([]), (err) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/html" });
            res.end("Erro ao criar arquivo de funcionários");
          } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end("[]"); // Retorna um array vazio
          }
        });
      } else {
        // Se o arquivo existe, lê e retorna seu conteúdo
        fs.readFile(funcionariosFilePath, (err, content) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/html" });
            res.end("Erro ao ler arquivo de funcionários");
          } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(content);
          }
        });
      }
    });
  } else if (req.url === "/api/funcionarios" && req.method === "POST") {
    // Lê o corpo da requisição POST
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const novoFuncionario = JSON.parse(body);

        // Lê os dados existentes do arquivo
        fs.readFile(funcionariosFilePath, (err, content) => {
          let funcionarios = [];
          if (content) {
            funcionarios = JSON.parse(content);
          }

          // Adiciona o novo funcionário
          funcionarios.push(novoFuncionario);

          // Salva de volta no arquivo JSON
          fs.writeFile(
            funcionariosFilePath,
            JSON.stringify(funcionarios, null, 2),
            (err) => {
              if (err) {
                res.writeHead(500, { "Content-Type": "text/html" });
                res.end("Erro ao salvar funcionário");
              } else {
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify(novoFuncionario));
              }
            }
          );
        });
      } catch (err) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end("Dados inválidos");
      }
    });
  } else {
    // Serve arquivos estáticos (HTML, JS, CSS, etc.)
    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === "ENOENT") {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end("<h1>404 - Página não encontrada</h1>");
        } else {
          res.writeHead(500);
          res.end(`Erro interno do servidor: ${err.code}`);
        }
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content);
      }
    });
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
