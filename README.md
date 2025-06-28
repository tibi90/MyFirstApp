# Warhammer 40,000 Wound Calculator

A React Native Android application for calculating combat outcomes in Warhammer 40,000 10th Edition. This app provides a comprehensive damage calculator with all the special rules and modifiers from the tabletop game.

## 📱 Features

### Core Functionality
- **Multi-page navigation system** with progress indicators
- **Real-time combat calculations** following official WH40k 10th Edition rules
- **Persistent data storage** using AsyncStorage
- **Dark theme UI** with Warhammer-inspired red and gold accents
- **Dice mechanics** for random attack generation (D6 + modifiers)

### Combat Phases

#### 1. Models & Attacks (First Page)
- Number of models in the attacking unit
- Attacks per model with options for:
  - Fixed number input
  - D6 dice rolls (1D6, 2D6, etc.)
  - Fixed bonuses (e.g., D6+1)
  - Interactive dice rolling button
- Total attacks calculation display

#### 2. Hit Rolls (Second Page)
- Weapon Skill selection (2+ through 6+)
- Hit roll modifiers (-2 to +2)
- Re-roll options (1s, All Failed, All)
- Special rules:
  - Torrent (auto-hit)
  - Lethal Hits (critical hits auto-wound)
  - Sustained Hits (extra hits on criticals)
  - Precision
  - Hazardous
  - Twin-linked
- **Live hit probability percentage display**

#### 3. Wound Rolls (Third Page)
- Weapon Strength input
- Armor Piercing (AP 0 to -6)
- Damage value
- Target Toughness
- Target Unit Size (for Blast calculations)
- Wound modifiers (-2 to +2)
- Re-roll wounds options
- Special rules:
  - Anti-X (improved wound rolls vs specific targets)
  - Devastating Wounds (mortal wounds on criticals)
  - Blast (extra hits based on unit size)
- **Live wound probability percentage display**

#### 4. Saving Throws (Fourth Page)
- Armor Save (2+ through 7+)
- Invulnerable Save options
- Feel No Pain rolls
- Cover bonus (+1 to saves)
- **Live save probability displays**:
  - Armor save chance (after AP)
  - Invulnerable save chance
  - Feel No Pain chance
  - Total survival probability

#### 5. Battle Results (Fifth Page)
- Comprehensive damage calculations showing:
  - Average wounds dealt
  - Models killed
  - Damage output
  - Hit/wound/save probabilities
  - Detailed breakdown by phase
- **Reset All Values** button that returns to first page

## 🛠 Technical Stack

### Core Technologies
- **React Native** 0.72.10
- **React** 18.2.0
- **Node.js** 18.x
- **Java** 11 (for Android builds)

### Key Dependencies
```json
{
  "@react-native-async-storage/async-storage": "^1.19.8",
  "@react-native-picker/picker": "^2.6.1",
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/stack": "^6.3.20",
  "react-native-screens": "~3.20.0",
  "react-native-safe-area-context": "4.5.0",
  "react-native-gesture-handler": "~2.9.0"
}
```

### Build Configuration
- **Android Gradle Plugin**: 7.4.2
- **Gradle Wrapper**: 7.6.3
- **Compile SDK**: 33
- **Target SDK**: 33
- **Min SDK**: 21
- **Kotlin**: 1.7.22

## 📂 Project Structure

```
MyFirstApp/
├── android/                    # Android native code
│   ├── app/
│   │   ├── build.gradle       # App-level build config
│   │   └── src/main/
│   │       ├── java/          # Native Android code
│   │       └── res/           # Android resources
│   └── build.gradle           # Project-level build config
├── src/
│   ├── components/
│   │   ├── Navigation.js      # Main navigation controller
│   │   ├── InputSection.js    # Reusable input component
│   │   ├── ResultsDisplay.js  # Results visualization
│   │   ├── ToggleSwitch.js    # Custom toggle component
│   │   └── pages/
│   │       ├── AttacksPage.js # Models & attacks input
│   │       ├── HitPage.js     # Hit roll configuration
│   │       ├── WoundPage.js   # Wound roll settings
│   │       ├── SavePage.js    # Save configuration
│   │       └── ResultsPage.js # Final calculations
│   ├── styles/
│   │   └── styles.js          # Global styles and theme
│   └── utils/
│       └── combatCalculations.js # Core combat math
├── .github/
│   └── workflows/
│       └── build-android.yml  # GitHub Actions CI/CD
├── App.js                     # Root component
├── index.js                   # Entry point
├── package.json               # Dependencies
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Android Studio (for local builds)
- Android SDK 33

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tibi90/MyFirstApp.git
cd MyFirstApp
```

2. Install dependencies:
```bash
npm install
```

3. For Android development:
```bash
# Start Metro bundler
npx react-native start

# In another terminal, run Android
npx react-native run-android
```

### Building APK

#### Local Build:
```bash
cd android
./gradlew assembleDebug
# APK will be in android/app/build/outputs/apk/debug/
```

#### GitHub Actions:
- APK builds automatically on push to main branch
- Download from Actions tab → latest workflow run → Artifacts

## 🎮 Usage Guide

### Basic Workflow
1. **Set up your attacking unit** - Enter number of models and attacks
2. **Configure hit rolls** - Set weapon skill and modifiers
3. **Set wound parameters** - Enter strength, AP, and damage
4. **Configure saves** - Input defender's save characteristics
5. **View results** - See complete damage calculations

### Dice Mechanics
- Select number of D6 to roll (0-6)
- Add fixed bonus if needed
- Tap "Roll Dice" to generate random attacks
- Or use fixed number input for consistent values

### Tips
- All inputs are automatically saved
- Tap progress dots to jump between pages
- Use reset button to start fresh calculation
- Probability percentages update in real-time

## 🧮 Combat Calculations

### Hit Probability
```javascript
baseHit = (7 - weaponSkill) / 6
modifiedHit = applyModifiers(baseHit, hitModifier)
finalHit = applyRerolls(modifiedHit, rerollType)
```

### Wound Probability
- S ≥ 2×T: Wounds on 2+
- S > T: Wounds on 3+
- S = T: Wounds on 4+
- S < T: Wounds on 5+
- S ≤ T/2: Wounds on 6+

### Save Calculations
- Best of armor save (modified by AP) or invulnerable save
- Feel No Pain applied after failed saves
- Total survival = 1 - (failSave × failFNP)

## 🎨 UI/UX Design

### Color Scheme
- **Background**: #1a1a1a (Dark grey)
- **Surface**: #2a2a2a (Lighter grey)
- **Primary**: #cc0000 (Blood red)
- **Secondary**: #ffd700 (Gold)
- **Text**: #ffffff (White)
- **Text Secondary**: #cccccc (Light grey)

### Typography
- Headers: 24px bold
- Section titles: 20px bold
- Labels: 14px regular
- Results: 48px bold

## 🔧 Development

### Code Style
- Functional React components with hooks
- Modular component structure
- Centralized styling system
- Pure calculation functions

### State Management
- React useState for local state
- AsyncStorage for persistence
- Props drilling for data flow

### Testing
```bash
npm test
```

### Linting
```bash
npm run lint
```

## 📦 CI/CD

### GitHub Actions Workflow
- Triggers on push to main branch
- Installs Node.js 18 and Java 11
- Cleans npm cache
- Installs dependencies
- Bundles JavaScript
- Builds debug APK
- Uploads as artifact

### Workflow File
See `.github/workflows/build-android.yml`

## 🐛 Known Issues

1. **Picker styling** - Dropdowns may show white on some Android versions
   - Fixed with custom Android theme styles

2. **Kotlin compatibility** - Some navigation libraries require specific versions
   - Pinned to compatible versions in package.json

3. **AndroidX versions** - Conflicts with SDK 33
   - Force resolution strategy in build.gradle

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is private and not licensed for public use.

## 🙏 Acknowledgments

- Games Workshop for Warhammer 40,000
- React Native community
- Claude AI for development assistance

## 📞 Contact

- GitHub: [@tibi90](https://github.com/tibi90)
- Project: [MyFirstApp](https://github.com/tibi90/MyFirstApp)

---

*For the Emperor! May your dice rolls be ever in your favor.*