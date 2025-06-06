# Culturo Native

A small React Native app built with Expo. It features a quiz game with XP, streak management and simple navigation.

## Installation

1. Ensure you have **Node.js** and **npm** installed. The project was built using Node 18+, but any recent LTS version should work.
2. Install dependencies:

```bash
npm install
```

## Running the application

To start the Expo development server:

```bash
npm run start
```

This is equivalent to running `expo start`. From the Expo CLI you can launch the app on an Android or iOS simulator, a physical device using the Expo Go app, or in the web browser.

## Project structure

```
.
├── assets/       # Application icons and other static assets
├── components/   # Reusable React Native components
├── data/         # Static JSON data used by the quiz
├── logic/        # Custom hooks handling quiz state, XP and streak
├── screens/      # Navigation screens (Home, Quiz, Result)
├── App.tsx       # App component and navigation setup
├── index.ts      # Entry point used by Expo
├── app.json      # Expo configuration
└── package.json  # Project metadata and npm scripts
```

## XP & Leveling

XP is gained by answering questions correctly. Each level requires more XP than
the previous one:

- Level 1: **100 XP**
- Level 2: **150 XP**
- Level 3: **200 XP**
- ... and so on, with +50 XP required for each additional level.