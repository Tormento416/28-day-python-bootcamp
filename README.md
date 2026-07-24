# 🐲 Pythonia: 28-Day Gamified RPG Python Training Bootcamp

> **Learn Python from scratch to advanced frameworks in a 28-day D&D/RPG video game adventure powered by WebAssembly and MongoDB Atlas.**

![Pythonia Banner](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14.2-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Pyodide](https://img.shields.io/badge/Pyodide-WASM-FF6F00?style=for-the-badge&logo=webassembly&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## 🌟 Overview

**Pythonia** transforms the process of learning Python into an interactive fantasy RPG video game. Choose your hero archetype on Day 1, embark on daily side quests, battle daily Mini-Bosses, and conquer multi-phase Weekly Epic Boss Dungeons every 7 days!

All Python code is executed **100% in-browser** using client-side **Pyodide WebAssembly**, providing zero-latency execution, real-time stdout capture, and automated test grading.

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

### ⚡ Client-Side WebAssembly Sandbox
- Safe, instant execution using Pyodide (Python 3.11 compiled to WASM).
- Real-time `stdout`/`stderr` terminal output.
- Automated unit test assertion verification.

### 💾 Persistent MongoDB Atlas Save & Resume
- Automatically saves progress (active day, completed sub-quests, code submissions, XP, level, gear).
- Players can pause anytime and return on any device to pick up right where they left off.

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

## 💻 Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Database**: MongoDB Atlas (`mongodb` driver)
- **Python Execution Engine**: Pyodide (WebAssembly client-side sandbox)
- **Design & Styling**: Dark mode, glassmorphism, responsive grid layouts, Google Fonts (Outfit & JetBrains Mono)

---

## 🛠️ Quick Start & Installation Guide

### Prerequisites
- Node.js 18+ installed
- A MongoDB database (or MongoDB Atlas cluster)

### 1. Clone the Repository
```bash
git clone https://github.com/Tormento416/28-day-python-bootcamp.git
cd 28-day-python-bootcamp
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
MONGODB_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/python_bootcamp?retryWrites=true&w=majority"
MONGODB_DB="python_bootcamp"
```

### 4. Seed the MongoDB Database
Start the development server and trigger the database seed endpoint:
```bash
npm run dev
```
Open your browser or run in terminal:
```bash
curl http://localhost:3000/api/seed
```
*Output: `{"success":true,"message":"Seeded 28 daily quests and 4 weekly epic bosses into MongoDB."}`*

### 5. Launch Pythonia!
Navigate to `http://localhost:3000` in your web browser:
1. Register a new hero account at `/auth/signup`.
2. Select your Day 1 Character Archetype.
3. Complete Day 1 side quests and defeat the *Goblin Scribe*!

---

## 📁 Repository Structure

```
28-day-python-bootcamp/
├── app/
│   ├── actions/          # Server actions
│   ├── api/              # MongoDB API routes (/auth, /profile, /quests, /progress, /seed)
│   ├── auth/             # Login & Signup pages
│   ├── boss/[week]/      # Multi-phase Weekly Epic Boss Battlegrounds
│   ├── create-character/ # Day 1 Character Archetype Selection page
│   ├── dashboard/        # RPG Hero Dashboard & Character Sheet
│   ├── quests/[day]/     # Daily Quest Hub & Sub-Quest Stepper
│   ├── quests/           # 28-Day Campaign Quest Map
│   ├── globals.css       # Global styles & font imports
│   ├── layout.tsx        # Root layout with Pyodide WASM loader & Navbar
│   └── page.tsx          # Landing page & Archetype showcase
├── components/
│   ├── ArchetypeSelector.tsx # Day 1 Archetype choice modal
│   ├── BossFight.tsx         # Animated RPG Boss combat window
│   ├── BootcampSummary.tsx   # Character XP progress bar & trophy case
│   ├── CodeEditor.tsx        # Pyodide WASM Python editor & test checker
│   ├── Navbar.tsx            # Navigation bar with user status
│   └── SubQuestStepper.tsx   # Daily side quest stepper & mini-boss trigger
├── lib/
│   ├── db/
│   │   ├── models.ts     # MongoDB schemas & Archetype definitions
│   │   ├── mongodb.ts    # MongoDB connection client helper
│   │   └── seedData.ts   # Complete 28-day curriculum & boss data
│   └── pyodide.ts        # Pyodide WebAssembly Python execution engine
├── package.json
└── README.md
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
