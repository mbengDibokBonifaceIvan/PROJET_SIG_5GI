# Guide de démarrage pour l'application SIG

## Configuration initiale
1. Lancez XAMPP pour démarrer les services nécessaires(Apache et Mysql).
* NB: On suppose que vous venez de dezipper le fichier zippe SIG.zip et que vous avez tape cd SIG dans le terminal pour acceder au projet de l'application

## Démarrage du backend
1. Exécutez le fichier `BACK_END\SIG\src\main\java\com\example\SIG\SigApplication.java` pour lancer le backend de l'application.

## Démarrage du frontend
1. Dans la racine du projet créer le fichier .env et insérer ceci: `OPENWEATHERMAP_API_KEY=4bafd5735d1d9807cbbe6df96016ef9f`.
2. Accédez au dossier `FRONT_END` de l'application.
3. Installez toutes les dépendances nécessaires en exécutant `npm i`.
4. Lancez l'application en tapant `npm run dev`.

## Connexion à l'application
1. Accédez à la page d'accueil de l'application. 
2. Cliquez sur le bouton "Connexion" en haut à droite de l'écran.
3. Connectez-vous en utilisant les informations suivantes :
   - **Super Administrateur** :
     - Nom d'utilisateur : Mbeng
     - Mot de passe : 12345678
   - **Scrutateur** :
     - Nom d'utilisateur : Lashu
     - Mot de passe : afoncraft
4. Vous serez redirigé vers la page appropriée en fonction du rôle choisi.
