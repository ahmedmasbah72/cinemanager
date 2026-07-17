# 🚀 Installation et Exécution - CinéManager

Guide complet pour installer et exécuter CinéManager sur VS Code ou tout autre éditeur.

## ✅ Prérequis

- **Node.js 18+** ([télécharger ici](https://nodejs.org/))
- **npm** (inclus avec Node.js) ou **yarn** ou **bun**
- Un éditeur de code (VS Code recommandé)

## 📥 Installation

### 1. Cloner ou télécharger le projet

```bash
# Si vous avez le projet sur GitHub
git clone <URL_DU_REPO>
cd cine-manager

# Ou simplement ouvrir le dossier dans VS Code
```

### 2. Installer les dépendances

Ouvrez un terminal dans VS Code (`Terminal > Nouveau Terminal`) et exécutez :

```bash
npm install
```

**Alternatives :**
```bash
# Avec Yarn
yarn install

# Avec Bun
bun install
```

Cette commande installera toutes les dépendances nécessaires listées dans `package.json`.

## 🎯 Lancer l'application

### Option 1 : Sur votre téléphone (RECOMMANDÉ)

C'est la méthode la plus simple et la plus fiable !

**Étape 1 : Installer Expo Go**
- **iOS** : [App Store - Expo Go](https://apps.apple.com/app/expo-go/id982107779)
- **Android** : [Google Play - Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent)

**Étape 2 : Démarrer le serveur**

Dans le terminal de VS Code :
```bash
npm start
```

**Étape 3 : Scanner le QR code**
- Un QR code apparaîtra dans votre terminal
- **iOS** : Ouvrez l'appareil photo et scannez
- **Android** : Ouvrez Expo Go et scannez

### Option 2 : Dans le navigateur web

Pour tester rapidement dans Chrome/Firefox/Safari :

```bash
npm start -- --web
```

Ou simplement :
```bash
npx expo start --web
```

L'application s'ouvrira automatiquement dans votre navigateur par défaut.

### Option 3 : Sur un simulateur/émulateur

**Pour iOS (nécessite macOS + Xcode) :**
```bash
npm start -- --ios
```

**Pour Android (nécessite Android Studio) :**
```bash
npm start -- --android
```

## 🔍 Commandes utiles

```bash
# Démarrer avec cache nettoyé
npm start -- --clear

# Démarrer en mode tunnel (si problème de réseau)
npm start -- --tunnel

# Voir les logs détaillés
npm start -- --dev-client

# Lancer uniquement web
npx expo start --web

# Vérifier les erreurs TypeScript
npx tsc --noEmit
```

## 📱 Tester l'application

Une fois l'application lancée, vous pouvez :

1. **Explorer les films** - Onglet Accueil
2. **Chercher et filtrer** - Par genre, note, statut
3. **Voir les détails** - Cliquez sur un film
4. **Ajouter aux favoris** - Bouton coeur
5. **Réserver des places** - Choisir séance → sièges
6. **Voir vos tickets** - Onglet Tickets avec QR codes

## 🛠️ Structure des données

L'application utilise des **données mock locales** (pas de backend requis) :

- **Films** : `/data/movies.ts`
- **Cinémas et salles** : `/data/cinemas.ts`
- **Séances** : `/data/showtimes.ts`

Les réservations et favoris sont sauvegardés localement avec AsyncStorage.

## 🎨 Personnalisation

### Modifier le thème
Éditez `/constants/theme.ts` pour changer les couleurs.

### Ajouter des films
Éditez `/data/movies.ts` et ajoutez vos films.

### Modifier les cinémas
Éditez `/data/cinemas.ts` pour ajouter/modifier des cinémas.

## ❌ Dépannage

### "npm: command not found"
➡️ Installez Node.js depuis [nodejs.org](https://nodejs.org/)

### "Module not found"
```bash
rm -rf node_modules
npm install
```

### L'app ne se connecte pas sur le téléphone
- Vérifiez que téléphone et PC sont sur le même WiFi
- Essayez avec mode tunnel : `npm start -- --tunnel`
- Désactivez temporairement votre pare-feu/VPN

### Erreur de port déjà utilisé
```bash
# Tue le processus sur le port 8081
npx kill-port 8081
npm start
```

### Cache problématique
```bash
npm start -- --clear
```

### Erreurs TypeScript
```bash
npm install
npx tsc --noEmit
```

## 📦 Dépendances principales

Cette application est **100% standalone** et ne nécessite aucun service externe :

✅ **Pas de backend requis**  
✅ **Pas de compte Rork nécessaire**  
✅ **Pas de base de données externe**  
✅ **Pas de variables d'environnement requises**  

Toutes les dépendances sont dans `package.json` et installées avec `npm install`.

## 🚀 Prêt pour VS Code

### Extensions VS Code recommandées

1. **ES7+ React/Redux/React-Native snippets**
2. **TypeScript and JavaScript Language Features**
3. **Prettier - Code formatter**
4. **ESLint**

### Ouvrir dans VS Code

```bash
# Depuis le terminal
code .

# Ou File > Open Folder dans VS Code
```

## 📚 Technologies utilisées

- React Native 0.81
- Expo SDK 54
- TypeScript
- Expo Router (navigation)
- AsyncStorage (stockage local)
- React Native SVG (QR codes)
- Lucide Icons

## 💡 Conseils

1. **Toujours** démarrer avec `npm start` d'abord
2. Garder le terminal ouvert pendant le développement
3. Les changements de code rechargent automatiquement l'app
4. Appuyez sur `r` dans le terminal pour recharger manuellement
5. Appuyez sur `m` pour ouvrir le menu développeur

## 🎓 Ressources

- [Documentation Expo](https://docs.expo.dev/)
- [Documentation React Native](https://reactnative.dev/)
- [Documentation TypeScript](https://www.typescriptlang.org/)

---

**Besoin d'aide ?** Ouvrez un terminal dans VS Code et tapez `npm start` pour commencer ! 🎬
