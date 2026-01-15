FROM node:20-alpine

WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm ci

# Copier le code
COPY . .

# Exposer le port de l'API
EXPOSE 3000

# Lancer l'application
CMD ["npm", "start"]
