# 🐲 Pythonia: 28-Day Gamified RPG Python Training Bootcamp

> **Learn Python from scratch to advanced frameworks in a 28-day D&D/RPG video game adventure powered by WebAssembly, offline desktop support, and MongoDB Atlas.**

![Pythonia Banner](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14.2-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Electron](https://img.shields.io/badge/Electron-29.3-47A248?style=for-the-badge&logo=electron&logoColor=white)
![Pyodide](https://img.shields.io/badge/Pyodide-WASM-FF6F00?style=for-the-badge&logo=webassembly&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## 🌟 Overview

**Pythonia** transforms the process of learning Python into an interactive fantasy RPG video game. Choose your hero archetype on Day 1, embark on daily side quests, battle daily Mini-Bosses, and conquer multi-phase Weekly Epic Boss Dungeons every 7 days!

All Python code is executed **100% in-browser / in-app** using client-side **Pyodide WebAssembly**, providing zero-latency execution, real-time stdout capture, and automated test grading without needing external compilers.

---

## ⚔️ Key Features & Gamification Mechanics

### 🧙‍♂️ 7 Character Archetype Specializations
Select your archetype on Day 1 to tailor quest storylines, code examples, starter tools, and late-game capstone projects:
- 🧙‍♂️ **Wizard**: AI Focus, Generative AI & Logical Reasoning
- ⚔️ **Warrior**: Data Science, Statistics & DataFrames
- 🃏 **Trickster**: Game Development, Physics Loops & Pygame
- 🗡️ **Rogue**: Cybersecurity Tools & Exploitation (Red Team)
- 🏹 **Ranger**: Web Development, REST APIs & Fast-HTTP
- 🛡️ **Healer**: Defensive Security, Log Analysis & Threat Hunting (Blue Team)
- 🛡️ **Tank**: Software Engineering, Clean Code & Object-Oriented Design

### 🎯 Daily Quests & Daily Mini-Bosses (Days 1-6, 8-13, 15-20, 22-27)
- **2-3 Small Side Quests** per day featuring concept explanations, starter code, test assertions, and **+50 XP** per completion.
- **1 Daily Mini-Boss** at the end of each day requiring synthesis of that day's lessons (**+150 XP & Loot Drop**).

### 🐲 Weekly Epic Boss Dungeons (Days 7, 14, 21, 28)
- Every 7 days, there are **no side quests**. Instead, players enter a multi-phase **Weekly Epic Boss Dungeon** with animated boss health bars, phase damage mechanics, and trophy badges (**+500 XP / +1000 XP**).

### 🖥️ Standalone Portable Desktop App (.exe & .dmg)
- Playable 100% **offline without Wi-Fi** using Electron desktop packaging.
- Portable `.exe` for Windows and `.dmg` for macOS.

---

## 🖥️ Building Portable Desktop Executables (.exe & .dmg)

You can package **Pythonia** into a standalone portable Desktop Application that runs 100% offline without requiring Wi-Fi or server deployment:

### Windows (.exe Portable & Installer)
```bash
npm run dist:win
```
*Outputs standalone `dist/Pythonia 28-Day RPG Bootcamp 1.0.0.exe` in the `dist/` directory.*

### macOS (.dmg & Portable Zip)
```bash
npm run dist:mac
```
*Outputs `dist/Pythonia 28-Day RPG Bootcamp-1.0.0.dmg` in the `dist/` directory.*

### Cross-Platform Build
```bash
npm run dist
```

---

## 🗺️ 28-Day Curriculum Roadmap

### 📜 Week 1: Syntax, Variables & Control Structures
- **Day 1**: Awakening in Pythonia (Syntax, `print()`, Comments, Multiline Output) -> *Mini-Boss: The Goblin Scribe*
- **Day 2**: Alchemical Variables & Data Types (`int`, `float`, `str`, `bool`, `type()`) -> *Mini-Boss: The Mana Balance Golem*
- **Day 3**: User Whispers & String Magic (`f-strings`, `.strip()`, `.upper()`, `.capitalize()`) -> *Mini-Boss: The Riddle Gargoyle*
- **Day 4**: Arithmetic & Logical Relics (`%`, `**`, `//`, `and`, `or`, `not`) -> *Mini-Boss: The Vault Keeper Lock*
- **Day 5**: Conditional Branching Paths (`if`, `elif`, `else`) -> *Mini-Boss: The Wandering Elemental*
- **Day 6**: Repetitive Spells - For Loops (`for`, `range()`, string iteration) -> *Mini-Boss: The Hydra of Repeating Heads*
- **👑 Day 7 EPIC BOSS DUNGEON**: **Syntaxius the Unparsed** (Gatekeeper of Syntax & Logic)

### 📚 Week 2: Data Structures & Functions
- **Day 8**: The Adventurer's Satchel - Lists & Tuples (`.append()`, `.pop()`, slicing `[1:4]`) -> *Mini-Boss: The Mimic Chest*
- **Day 9**: The Grimoire of Keys - Dictionaries (`key:value`, `.get()`, `.items()`) -> *Mini-Boss: The Inventory Construct*
- **Day 10**: Sacred Circles - Sets & Tuples (`set()`, `.intersection()`, tuple unpacking) -> *Mini-Boss: The Shadow Twin*
- **Day 11**: While Loops & Infinite Depths (`while` loops, `break`, sentinel values) -> *Mini-Boss: The Endless Kraken*
- **Day 12**: Crafting Custom Incantations - Functions (`def`, parameters, `return`, default args) -> *Mini-Boss: The Alchemist of Functions*
- **Day 13**: Scope, `*args` & `**kwargs` (Arbitrary arguments, scope, dictionary kwargs) -> *Mini-Boss: The Spell-Weaver Chimera*
- **👑 Day 14 EPIC BOSS DUNGEON**: **Arch-Mage Algorithma** (Grand Master of Data & Functions)

### 🏛️ Week 3: OOP, Modules & Persistence
- **Day 15**: The Ancient Blueprint - Classes & Objects (`class`, `__init__`, `self`, methods) -> *Mini-Boss: The Automaton Sentry*
- **Day 16**: Lineage of Heroes - Inheritance & Polymorphism (Subclasses, `super()`, method overriding) -> *Mini-Boss: The Dragon Ancestor*
- **Day 17**: Mystical Encapsulation & Magic Methods (`__str__`, `__len__`, dunders) -> *Mini-Boss: The Rune Enchanter*
- **Day 18**: Scrolls of Power - Modules & Imports (`math`, `datetime`, `json` serialization) -> *Mini-Boss: The Clockwork Chronomancer*
- **Day 19**: Shielding from Chaos - Error Handling (`try`, `except`, `ValueError`, `KeyError`) -> *Mini-Boss: The Chaos Fiend*
- **Day 20**: Persistent Tomes - File I/O (`open()`, `with` statement, reading/writing logs) -> *Mini-Boss: The Necromancer of Lost Records*
- **👑 Day 21 EPIC BOSS DUNGEON**: **Iron Colossus Automaton** (Master of OOP & Resilience)

### 🚀 Week 4: Frameworks, Extensions & Libraries
- **Day 22**: Realm of Virtual Envs & Package Alchemy (`venv`, `pip`, `requirements.txt`) -> *Mini-Boss: The Package Swarm*
- **Day 23**: Web Artifacts - Requests & APIs (`requests`, JSON payloads, HTTP status codes) -> *Mini-Boss: The Oracle of the Web API*
- **Day 24**: CLI Magic - Building Command Line Frameworks (`sys.argv`, flag parsing, rich formatting) -> *Mini-Boss: The Terminal Executioner*
- **Day 25**: Web Realms - Web Frameworks Basics (`FastAPI`/`Flask` routing, endpoints, JSON responses) -> *Mini-Boss: The Web Fortress Sentinel*
- **Day 26**: Data Sorcery - Libraries like Pandas & NumPy (Vectorization, DataFrames, filtering) -> *Mini-Boss: The Data Leviathan*
- **Day 27**: Game Engine Mechanics - Pygame & Graphic Loops (Game loop, frame ticks, bounding box collisions) -> *Mini-Boss: The Glitch Demon*
- **👑 Day 28 FINAL EPIC BOSS DUNGEON**: **Malakor the Overlord of Pythonia** (The Ultimate Capstone)

---

## 🛠️ Quick Start (Web Server Mode)

### Prerequisites
- Node.js 18+ installed

### 1. Clone & Install
```bash
git clone https://github.com/Tormento416/28-day-python-bootcamp.git
cd 28-day-python-bootcamp
npm install
```

### 2. Configure Environment & Seed DB
Create `.env.local`:
```env
MONGODB_URI="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/python_bootcamp?retryWrites=true&w=majority"
MONGODB_DB="python_bootcamp"
```
Run dev server & seed MongoDB:
```bash
npm run dev
curl http://localhost:3000/api/seed
```

---

## 📁 Repository Structure

```
28-day-python-bootcamp/
├── app/                  # Next.js App Router pages & API routes
├── components/           # RPG Combat, CodeEditor, Steppers, Character Sheet
├── electron/
│   ├── main.js           # Electron main desktop process script
│   └── preload.js        # IPC preload bridge
├── lib/
│   ├── db/               # MongoDB models & seed data
│   └── pyodide.ts        # Pyodide WebAssembly Python engine
├── package.json          # Electron & desktop builder scripts
└── README.md
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
