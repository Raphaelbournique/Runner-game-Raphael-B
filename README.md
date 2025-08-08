
# Runner Parallax Game

Bienvenue dans **Runner Parallax Game**, un jeu de type *infinite runner* inspiré du célèbre jeu **T-Rex Runner** de Google, avec un fond en **parallax** et un personnage animé. Le jeu a été réalisé avec **HTML, CSS, JavaScript**, sans bibliothèque externe.

---

## Objectif du jeu

Le joueur contrôle un blob vert qui court sans fin à travers une ville la nuit. Le but est de **survivre le plus longtemps possible** en **évitant les obstacles** qui apparaissent aléatoirement.

Le score augmente automatiquement avec le temps, et la difficulté devient progressivement plus élevée :
- La vitesse du jeu augmente
- Les obstacles apparaissent plus fréquemment

---

## Contrôles

| Action | Touche |
|--------|--------|
| Sauter | `Espace` ou `Flèche haut ↑` |
| Rejouer | Bouton `Restart` après Game Over |

---

## Mécaniques principales

✅ Parallax avec 9 couches (layers)  
✅ Personnage animé via **sprite sheet**  
✅ Animation de saut  
✅ Obstacles aléatoires de 3 types différents  
✅ Collision avec Game Over  
✅ Écran de démarrage et d’échec  
✅ Score affiché à l'écran  
✅ Difficulté croissante (obstacles + vitesse)

---

## Arborescence des fichiers

```
📁 assets
│
├── 📁 background
│   ├── layer_1_ground.png
│   ├── layer_2_stars.png
│   ├── layer_3_moon.png
│   ├── layer_4_clouds_1.png
│   ├── layer_5_clouds_2.png
│   ├── layer_6_far_buildings.png
│   ├── layer_7_bg_buildings.png
│   ├── layer_8_fg_buildings.png
│   └── layer_9_wall.png
│
├── 📁 player
│   ├── Green-Blob-Run.png  (sprite de course)
│   └── Green-Blob-Jump.png (image de saut)
│
└── 📁 obstacles
    ├── Obstacle_1.png
    ├── Obstacle_2.png
    └── Obstacle_3.png

📄 index.html
📄 style.css
📄 script.js
📄 README.md
```

---

## Lancer le jeu

1. Télécharge ou clone le projet
2. Ouvre le fichier `index.html` dans ton navigateur
3. Clique sur **"Start"** pour commencer à jouer !

---

## Auteurs & crédits

- Réalisé par : [Ton prénom ou pseudo ici]
- Inspiré de : Google T-Rex Runner
- Design du personnage & sprites : fournis par l’utilisateur

---

## À venir (idées d’amélioration)

- Système de bonus à collecter
- Ajout de sons ou musique
- Stockage du meilleur score (localStorage)
