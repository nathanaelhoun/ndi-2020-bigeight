# SurfClean, par l'équipe BigEight

![surfCleanLogo](public/images/surfCleanLogo.png)

## SurfClean, l'application pour les surfeurs qui veulent être propres

Cette application leur permet, depuis un téléphone ou un ordinateur,

- de s'inscrire et de se connecter,
- de se divertir en jouant à un jeu similaire à Among Us, customisé selon leur thème préféré et avec une musique spécialement composée
- de consulter des statistiques sur la qualité de l'eau de leur plage préférée\* ,
- de consulter les produits récupérés par les autres utilisateurs de Surfclean
- (non fonctionnel) d'enregistrer une activité via un formulaire, et de déclarer les produits détectés.

\* (à Saint-Malo uniquement)

L'application est disponible ici : [ndi-2020-bigeight.nathanaelhoun.fr](https://ndi-2020-bigeight.nathanaelhoun.fr).

## L'équipe BigEight

Fière de représenter la région bisontine, l'équipe Big Eight est composée d'une bande de joyeux lurons :

- [Nathanaël Houn](https://nathanaelhoun.fr)
- [Cynthia Maillard](https://www.linkedin.com/in/cynthia-maillard/)
- [François Poguet](https://francois.poguet.com)
- Lancelot Vega
- Éléa Jacquin
- Marie-Almina Gindre
- Loïc Grandperrin
- [Jérémy Thiébaud](https://www.linkedin.com/in/j%C3%A9r%C3%A9my-thi%C3%A9baud-60b9281b8/)

## Installation

- Installer `node` (v >= 14) et `mysql`
- Créer la base de données mysql (possibilité de créer un mode de passe avec `openssl rand -base64 16`
  ```
  CREATE USER 'bigeight'@'localhost' IDENTIFIED BY 'PASSWORD_HERE';
  # si mysql v >= 8.0: ALTER USER 'bigeight'@'localhost' IDENTIFIED WITH mysql_native_password BY 'PASSWORD_HERE'
  CREATE DATABASE bigeight;
  GRANT ALL PRIVILEGES ON bigeight.* TO 'bigeight'@'localhost';
  ```
- Créer le fichier de configuration `.env` à la racine du project
  ```
  PORT=12000
  DB_HOST=localhost
  DB_USER=bigeight
  DB_PASSWORD=PASSWORD_HERE
  DB_DATABASE=bigeight
  ```
- Démarrer le projet avec `node .`
