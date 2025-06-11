# 🎮 Culturo - Fun General Knowledge App

**Culturo** is a mobile app for practicing general knowledge, inspired by Duolingo — built with React Native and Expo.

The concept: encourage users to practice general knowledge daily, through playful quizzes and an engaging progression system (XP, streaks, levels).

---

## 🚀 Main Features

- 🧠 Dynamic quizzes via [Open Trivia DB](https://opentdb.com/api_config.php)
- 🏆 XP rewards based on question difficulty
- 🔥 Daily streak to encourage consistency
- 📈 Progressive leveling system (XP requirements grow per level)
- 🎁 Bonus XP for perfect quiz streaks
- 🎲 Theme selection screen before each quiz
- 💻 Scalable architecture — ready for future authentication (Supabase Magic Link) and cloud sync

---

## 📱 Tech Stack

- [React Native](https://reactnative.dev/) (Expo)
- [React Navigation](https://reactnavigation.org/)
- [Open Trivia DB API](https://opentdb.com/api_config.php)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) for local persistence
- [Reanimated](https://docs.swmansion.com/react-native-reanimated/) for animations
- [Supabase](https://supabase.io/) (planned for v2 - auth + cloud sync)

---

## 🗺️ Roadmap

- [x] On-the-fly quiz with XP per question
- [x] Bonus for perfect quiz streak
- [x] Daily streak with visual feedback
- [x] Leveling system with progressive XP
- [x] Theme selection screen
- [ ] Profile screen with user stats
- [ ] Authentication via Magic Link (Supabase)
- [ ] Cloud sync of progress
- [ ] Leaderboard
- [ ] Themed learning path (Duolingo style)
- [ ] Enhanced animations (XP bar, level up, mascot)

---

## 💻 Installation (local dev)

```bash
git clone https://github.com/your-username/culturo.git
cd culturo
npm install
expo start
