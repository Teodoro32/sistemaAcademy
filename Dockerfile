# Usa imagem base oficial do Node.js
FROM node:18

# Define a pasta de trabalho dentro do container
WORKDIR /app

# Copia todos os arquivos do projeto para dentro do container
COPY . .

# Expõe a porta que o server.js vai usar
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "server.js"]