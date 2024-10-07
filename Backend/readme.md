# API de Facturation Cogip

## Description
Ce projet est une API de facturation , elle permet de créer, lire, mettre à jour et supprimer des factures.

## Fonctionnalités
 - Factures : Créer, lire, mettre à jour et supprimer des factures.
 - Compagnies : Créer, lire, mettre à jour et supprimer des compagnies.
 - Contacts : Créer, lire, mettre à jour et supprimer des contacts.

## Prérequis
- Node.js (version 16 ou supérieure)
- npm (Node Package Manager)
- MySQL
- Docker

## Technologies Utilisées

- Node.js : Exécution du code JavaScript côté serveur
- Express.js (v5) : Framework pour la création d'API
- TypeScript : Superset de JavaScript avec typage statique
- Joi : Validation des données
- MySQL & MySQL2 : Connecteurs pour la base de données MySQL
- Swagger : Documentation de l'API (via swagger-jsdoc et swagger-ui-express)
- dotenv : Gestion des variables d'environnement
### Outils de développement
- ts-node : Exécution directe de fichiers TypeScript sans les compiler
- @types/express, @types/node : Types pour Express et Node.js

## Installation

Suivez ces étapes pour installer et configurer le projet localement :

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/votre-repo/backend.git
   cd backend
   ```
2. **Installer les dépendances** :

```bash
    	npm install
```
3. **Configurer les variables d'environnement** : 
Créez un fichier .env à la racine du projet et ajoutez les variables nécessaires, comme la configuration de la base de données MySQL :

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=yourdatabase
```

4. **Compiler le projet TypeScript** :

```bash
npm run build
```
5. **Démarrer le serveur** :

- En production :
```bash
npm start
```

- En mode développement :
```bash
npm run dev
```

- Le serveur sera disponible à l'adresse http://localhost:3000.