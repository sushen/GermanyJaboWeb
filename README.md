<img width="1536" height="1024" alt="German Learning App Brand Board" src="https://github.com/user-attachments/assets/0deedd73-e65f-4f68-bdb7-ecfaa292cad3" />

# German A1 Language-Learning Conversational Game

An Android application built with Kotlin and Jetpack Compose designed to teach German at the A1 level through interactive lessons, vocabulary, grammar rules, dialogues, and exercises with an extensible, data-driven content architecture.

---

## 📖 Table of Contents
1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Architecture Overview](#architecture-overview)
4. [Project Structure](#project-structure)
5. [Tech Stack & Dependencies](#tech-stack--dependencies)
6. [Getting Started & Build Instructions](#getting-started--build-instructions)
7. [Testing](#testing)
8. [Monetization & AdMob Safety](#monetization--admob-safety)
9. [Project State Tracking](#project-state-tracking)
10. [Future Roadmap](#future-roadmap)

---

## 🌟 Overview

The **German A1 Game** combines language learning with structured interactive exercises and conversational flows. The application is designed to guide learners step-by-step from alphabet/greetings and basic numbers to full conversational proficiency.

Key design principles:
- **Separation of Concerns**: Learning content and monetization logic are decoupled from UI components.
- **Data-Driven Content**: Lessons, exercises, and dialogues are structured in pure domain models and data repositories, allowing content expansion without modifying UI code.
- **Resilient Fallbacks**: Network or ad loading failures fail gracefully without disrupting the user learning journey.

---

## ✨ Key Features

- **User Authentication**:
  - Email & Password Login and Registration powered by **Firebase Authentication**.
  - **Guest Learner Mode**: Instant guest access with local/anonymous fallback support for offline or unauthenticated usage.
  - Reactive auth state updates via Kotlin Coroutines `Flow`.

- **Data-Driven German A1 Content Engine**:
  - **Lektion 1**: German Alphabet, Pronunciation & Basic Greetings (Formal vs. Informal).
  - **Lektion 2**: Zahlen (German Numbers 0–10) & Phone Number Listening Recognition.
  - Tabbed lesson interface covering:
    - 📌 **Overview & Objectives**: Clear learning goals.
    - 📚 **Vocabulary**: Words, phonetics, and context sentences.
    - 💡 **Grammar Rules**: Explanations and usage examples.
    - 💬 **Dialogues**: Conversational speaker interactions.
    - ✍️ **Exercises**: Interactive Fill-in-the-blank, Multiple Choice, and Translation questions with instant check feedback.

- **Google AdMob Integration**:
  - Centralized `InterstitialAdManager` using safe AdMob test ad IDs during development.
  - Interstitial ad triggers on lesson selection with zero risk of blocking navigation or crashing the app.

---

## 🏗 Architecture Overview

The application follows **Clean Modular Architecture** principles, enforcing clear layer boundaries:

```
                          ┌─────────────────────────┐
                          │        UI Layer         │
                          │ Compose / Navigation /  │
                          │       ViewModels        │
                          └────────────┬────────────┘
                                       │
                                       ▼
                          ┌─────────────────────────┐
                          │      Domain Layer       │
                          │   Models & Repository   │
                          │       Interfaces        │
                          └────────────┬────────────┘
                                       │
            ┌──────────────────────────┴──────────────────────────┐
            ▼                                                     ▼
┌───────────────────────┐                             ┌───────────────────────┐
│      Data Layer       │                             │       Ads Layer       │
│  FirebaseAuthImpl &   │                             │ InterstitialAdManager │
│  LessonRepositoryImpl │                             │      (AdMob SDK)      │
└───────────────────────┘                             └───────────────────────┘
```

### Architectural Principles & Design Patterns

1. **UI Layer (`com.biswas.germana1.ui`)**:
   - Built entirely with **Jetpack Compose** and **Material 3**.
   - Single-Activity setup (`MainActivity.kt`) hosting Compose Navigation (`AppNavigation.kt`).
   - UI components observe reactive state provided by `AuthViewModel` (`StateFlow<AuthUiState>`).

2. **Domain Layer (`com.biswas.germana1.domain`)**:
   - Core domain models: `User`, `AuthResult`, `Lesson`, `VocabularyItem`, `GrammarRule`, `ExampleSentence`, `DialogueEntry`, `Exercise`, `ExerciseType`.
   - Repository Abstractions: `AuthRepository` and `LessonRepository`. The domain layer has zero dependency on Android or third-party SDKs.

3. **Data Layer (`com.biswas.germana1.data`)**:
   - `FirebaseAuthRepositoryImpl`: Handles Firebase Auth operations with coroutines/tasks (`await()`) and emits real-time user status via `callbackFlow`.
   - `LessonRepositoryImpl`: Manages lesson dataset delivery.

4. **Ads Layer (`com.biswas.germana1.ads`)**:
   - `InterstitialAdManager`: Centralizes AdMob Interstitial ad initialization, loading, and display callbacks. Decoupled from core UI logic.

---

## 📁 Project Structure

```
app/src/main/java/com/biswas/germana1/
├── GermanA1Application.kt      # Application entry point & MobileAds initialization
├── MainActivity.kt             # Single Activity setup & AdManager lifecycle
├── ads/
│   └── InterstitialAdManager.kt # Centralized AdMob management
├── data/
│   ├── auth/
│   │   └── FirebaseAuthRepositoryImpl.kt # Firebase Auth implementation & Guest fallback
│   └── content/
│       └── LessonRepositoryImpl.kt       # A1 Lessons dataset
├── domain/
│   ├── auth/
│   │   ├── AuthRepository.kt    # Domain interface for authentication
│   │   ├── AuthResult.kt        # Sealed class for auth state/results
│   │   └── User.kt              # Domain user model
│   ├── model/
│   │   └── LessonModels.kt      # Lesson, Vocabulary, Exercise, Dialogue models
│   └── repository/
│       └── LessonRepository.kt  # Domain interface for lesson data
└── ui/
    ├── auth/
    │   ├── AuthViewModel.kt     # Auth state management
    │   ├── LoginScreen.kt       # Login UI
    │   └── RegisterScreen.kt    # Registration UI
    ├── home/
    │   └── HomeScreen.kt        # Lesson selection list & user header
    ├── lesson/
    │   └── LessonDetailScreen.kt # Tabbed lesson viewer & exercise runner
    ├── navigation/
    │   └── AppNavigation.kt     # Compose Navigation Graph
    └── theme/
        ├── Color.kt
        ├── Theme.kt
        └── Type.kt
```

---

## 🛠 Tech Stack & Dependencies

- **Language**: Kotlin 2.0.21 (Target Java 17)
- **Min SDK**: 24 | **Compile / Target SDK**: 36
- **UI Framework**: Jetpack Compose (BOM 2024.09.00) + Material 3
- **Navigation**: androidx.navigation:navigation-compose
- **Architecture & State**: ViewModel, Coroutines, StateFlow, CallbackFlow
- **Authentication**: Firebase Authentication SDK (Firebase BOM 33.1.2)
- **Monetization**: Google Mobile Ads SDK (`play-services-ads:23.6.0`)
- **Testing**: JUnit 4, KotlinX Coroutines Test

---

## 🚀 Getting Started & Build Instructions

### Prerequisites
- **Android Studio** (Ladybug / Jellyfish or newer recommended)
- **JDK 17** configured for Gradle
- Android SDK 36 installed

### Building the Application

To compile and assemble the debug APK:
```bash
./gradlew assembleDebug
```

Output APK location:
`app/build/outputs/apk/debug/app-debug.apk`

---

## 🧪 Testing

To execute all unit tests across the repository:
```bash
./gradlew test
```

Unit test coverage includes:
- `AuthViewModelTest`: Verifies authentication flow states (`Idle`, `Loading`, `Success`, `Error`), guest user login handling, and validation error branches using `FakeAuthRepository`.

---

## 💰 Monetization & AdMob Safety

- Development relies on official **Google AdMob Test Unit IDs** (`TEST_INTERSTITIAL_AD_UNIT_ID = "ca-app-pub-3940256099942544/1033173712"`).
- Ad failure callbacks trigger fallback handlers, ensuring ad loading timeouts or network failures never interrupt navigation or user progress.

---

## 📋 Project State Tracking

- **CURRENT VERSION**: V1 (Prototype)
- **CURRENT MILESTONE**: Foundation, Firebase Auth, Content Engine, Navigation & AdMob
- **COMPLETED**:
  - Jetpack Compose single-activity architecture & Material3 setup
  - Firebase Authentication integration with Guest Mode fallback
  - Extensible Domain Models for Lessons, Vocabulary, Dialogues, and Exercises
  - Data Repository with Lessons 1 & 2
  - Tabbed Lesson Detail screen with instant exercise evaluation
  - Centralized AdMob Interstitial Ad Manager
  - AuthViewModel unit test suite with mock/fake repositories
- **IN PROGRESS**: Documentation & Architecture Baseline
- **NEXT**:
  - Persistent User Progress tracking with DataStore
  - Interactive Conversational Story engine
  - Additional A1 Lessons & Audio Playback integration
- **KNOWN BUGS**: None
- **ARCHITECTURE**: Clean Modular Architecture (UI, Domain, Data, Ads)
- **DEPENDENCIES**: Kotlin, Jetpack Compose, Firebase Auth, Navigation Compose, Google Mobile Ads

---

## 🗺 Future Roadmap

- **V2**: Local progress persistence (DataStore), expanded exercise types (Audio/Listening drills).
- **V3**: Conversational/story branching dialogue game engine.
- **V4**: Rewarded video ad monetization, streak tracking, and Google Play Store release build configuration.
