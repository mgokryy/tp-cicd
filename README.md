# TP CI/CD API Shop

## Objectif

Ce projet met en place une chaîne CI/CD complète permettant de tester,
dockeriser et déployer automatiquement une application web sur une VM Azure.

Chaque push sur la branche `main` déclenche automatiquement l’ensemble du pipeline,
sans aucune action manuelle.

## Application

L’application est une API **Node.js / Express** simulant un mini système de gestion
de produits (shop).

### Endpoints disponibles

- `GET /health`  
  Permet de vérifier que l’application fonctionne correctement.

- `GET /products`  
  Retourne la liste des produits disponibles.

- `POST /products`  
Permet d’ajouter un nouveau produit via un corps JSON contenant :

```json
{
  "name": "Product name",
  "price": 100
}
```

## Fonctionnement du pipeline CI/CD

Le pipeline est implémenté avec **GitHub Actions** et s’exécute automatiquement
à chaque push sur la branche `main`.

### Étapes du pipeline

1. **Tests unitaires**
   - Installation des dépendances
   - Exécution des tests unitaires avec Jest et Supertest
   - Le pipeline échoue si un test échoue

2. **Tests E2E**
   - Démarrage de l’application
   - Exécution des tests End-to-End avec Cypress
   - Vérification de la disponibilité de l’application (`/health`)
   - Vérification d’une fonctionnalité métier (`/products`)

3. **Build et push Docker**
   - Construction de l’image Docker
   - Push de l’image sur Docker Hub

4. **Déploiement sur Azure**
   - Connexion à la VM Azure via SSH
   - Récupération de l’image Docker depuis Docker Hub
   - Arrêt et suppression du conteneur existant
   - Redémarrage du conteneur (déploiement idempotent)
   - Vérification finale via l’endpoint `/health`

## Déclenchement du déploiement

Le déploiement est déclenché automatiquement par la commande suivante :

```
git push origin main
```

Ce push lance automatiquement le workflow GitHub Actions jusqu’au
déploiement final sur la VM Azure.

## Choix techniques réalisés

- **Node.js / Express** : application simple et légère pour démontrer la CI/CD
- **Jest & Supertest** : tests unitaires rapides et fiables
- **Cypress** : tests End-to-End simulant un parcours réel
- **Docker** : standardisation et portabilité de l’application
- **Docker Hub** : stockage et distribution des images Docker
- **GitHub Actions** : automatisation complète de la chaîne CI/CD
- **Azure VM** : déploiement sur une machine virtuelle accessible publiquement
- **GitHub Secrets** : gestion sécurisée des identifiants (Docker Hub, SSH)

## Preuve de déploiement

Des captures d’écran montrant l’application accessible via l’IP publique de la VM Azure
sont disponibles dans le dossier **`screensh/`**.

Ces captures prouvent que l’application est correctement déployée et accessible depuis l’extérieur.

## Vérification

L’application déployée est accessible via l’IP publique de la VM Azure: 4.178.61.225
L’endpoint `/health` permet de vérifier le bon fonctionnement de l’application: [endpoint](http://4.178.61.225/health)

**OKRY Marie-Grâce**