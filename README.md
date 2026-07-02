# Master Python in 28 Days (Linux‑First, Optional WSL/Codespaces)

## Overview

This 28‑day program teaches Python from installation to building a simple web app with a Python backend and HTML/CSS frontend, focusing on **Linux** (Ubuntu) and optionally **WSL** or **GitHub Codespaces** as Linux environments. [web:19][web:29][web:40]

You’ll learn:

- Python basics (variables, loops, functions, files).
- Simple data handling.
- HTML/CSS fundamentals.
- A tiny HTTP backend in Python.
- A final project: a minimal website with a Python backend.
- Bonus track: data analysis and a mini ETL pipeline.

---

## Interactive Learning Module

This repository is a **fully interactive bootcamp** with auto-checked exercises, quizzes, progress tracking, and project milestones.

### Quick Start

```bash
# 1. Clone and enter the repo
git clone https://github.com/Tormento416/28-day-python-bootcamp.git
cd 28-day-python-bootcamp

# 2. Set up the environment (one command)
make setup
# OR manually:
python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt

# 3. Run ALL exercise tests
make test
# OR: python3 -m pytest

# 4. Run tests for a specific phase
make test-day D=phase1_core
make test-day D=phase2_web
make test-day D=phase3_project
```

### How the exercises work

1. Open an exercise file in `exercises/` (e.g., `exercises/phase1_core/exercise_day01_strings.py`).
2. Replace every `pass` with your code.
3. Run the matching tests — green ✅ means correct, red ❌ shows a helpful hint.
4. Move to the next exercise when all tests pass.

### Learning resources

| Resource | Description |
|----------|-------------|
| [`progress.md`](progress.md) | 28-day checklist — track daily completion |
| [`quizzes/quiz_day07.md`](quizzes/quiz_day07.md) | Day 7 checkpoint quiz |
| [`quizzes/quiz_day14.md`](quizzes/quiz_day14.md) | Day 14 checkpoint quiz |
| [`quizzes/quiz_day21.md`](quizzes/quiz_day21.md) | Day 21 checkpoint quiz |
| [`quizzes/quiz_day28.md`](quizzes/quiz_day28.md) | Day 28 final quiz |
| [`docs/milestones.md`](docs/milestones.md) | Final project milestones with acceptance criteria |
| [`docs/troubleshooting.md`](docs/troubleshooting.md) | Fix common beginner errors |
| [`docs/capstone_rubric.md`](docs/capstone_rubric.md) | Self-grading rubric for the final project |

### Exercise map

| Phase | Days | Exercise folder |
|-------|------|-----------------|
| Core Python | 1–14 | `exercises/phase1_core/` |
| Web Fundamentals | 15–21 | `exercises/phase2_web/` |
| Final Project | 22–28 | `exercises/phase3_project/` |

### Codespaces (zero-setup)

Click the green **Code** button on GitHub → **Codespaces** → **Create codespace on main**.  
Python, VS Code, and all dependencies are configured automatically via `.devcontainer/devcontainer.json`.

---

## Day 0 (Optional): GitHub Codespaces as Linux

If you use GitHub, you can treat Codespaces as a Linux dev box. [web:40]

1. Create or open a repository on GitHub.
2. Click the green **Code** button.
3. Select the **Codespaces** tab and click **“Create codespace on main”** (or similar). [web:32][web:43]
4. In the terminal within the Codespace (an Ubuntu environment), run:

   ```bash
   mkdir python28
   cd python28
   python3 -V
   python3 -m venv venv
   source venv/bin/activate
   ```

---

## Day 1 – Linux Setup and “Hello, World”

### Native Ubuntu / Linux

Update and install Python: [web:19][web:37][web:45]

```bash
sudo apt update
sudo apt -y upgrade
sudo apt install -y python3 python3-pip python3-venv
python3 -V
```

Create project folder and virtual environment:

```bash
mkdir ~/python28
cd ~/python28
python3 -m venv venv
source venv/bin/activate
```

Create `day1_hello.py`:

```python
print("Hello, world from Linux!")
```

Run:

```bash
python3 day1_hello.py
```

#### Exercises

- Change the message to print two lines.
- Create `robot.py` that prints a fun “robot” message.

> **🛑 Stop & Try — Day 1**
> Before reading Day 2, open the terminal and complete this:
> 1. Write a Python script that prints your name and your favourite programming language on two separate lines.
> 2. Run it: `python3 yourscript.py`
> 3. Then run the Day 1 tests: `python3 -m pytest exercises/phase1_core/test_day01_strings.py -v`
>
> Don't move on until at least one test passes.

### Optional: Windows + WSL + Ubuntu

On Windows 10/11, enable WSL: [web:29][web:30]

```powershell
wsl --install
```

Restart when prompted. If needed, enable the feature manually: [web:22]

```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

Install Ubuntu from Microsoft Store, run it, create a user, then inside Ubuntu:

```bash
sudo apt update
sudo apt -y upgrade
sudo apt install -y python3 python3-pip python3-venv
python3 -V

mkdir ~/python28
cd ~/python28
python3 -m venv venv
source venv/bin/activate
```

Create and run `day1_hello.py` as above.

---

## Day 2 – Variables and Simple Math

Create `day2_variables.py`:

```python
x = 5
y = 10
sum_result = x + y
print("Sum:", sum_result)

product_result = x * y
print("Product:", product_result)
```

#### Exercises

- Add subtraction and division.
- Change `x` and `y` values and predict the results before running.

---

## Day 3 – Input and Simple Calculator

Create `day3_calculator.py`:

```python
first = input("Enter first number: ")
second = input("Enter second number: ")

try:
    a = float(first)
    b = float(second)
    print("Sum:", a + b)
    print("Difference:", a - b)
    print("Product:", a * b)
    print("Quotient:", a / b)
except ValueError:
    print("Please type numbers, not words!")
```

#### Exercises

- Handle division by zero using `try/except`.
- Customize prompts and messages.

---

## Day 4 – Strings and Printing Nicely

Create `day4_strings.py`:

```python
name = input("What is your name? ")
age = input("How old are you? ")

message = "Hello, " + name + "!"
print(message)
print(f"{name} is {age} years old.")
print("Uppercase name:", name.upper())
print("Lowercase name:", name.lower())
```

#### Exercises

- Ask for a favorite color and print a sentence.
- Experiment with string methods like `strip()` and `replace()`.

---

## Day 5 – Booleans and `if` Statements

Create `day5_if.py`:

```python
age = int(input("Enter your age: "))

if age < 13:
    print("You are a kid.")
elif age < 20:
    print("You are a teenager.")
else:
    print("You are an adult.")
```

#### Exercises

- Even/odd checker:

  ```python
  num = int(input("Number: "))
  if num % 2 == 0:
      print("Even")
  else:
      print("Odd")
  ```

- Simple password check comparing input to a hard‑coded string.

---

## Day 6 – `while` Loops

Create `day6_while.py`:

```python
count = 1
while count <= 5:
    print("Count is", count)
    count = count + 1
```

#### Exercises

- Guess‑the‑number loop (keep asking until they guess correctly).
- Loop that keeps asking for input until user types `"quit"`.

---

## Day 7 – `for` Loops and `range`

Create `day7_for.py`:

```python
for i in range(1, 6):
    print("Loop step:", i)
```

#### Exercises

- Print numbers from 1 to 10.
- Print only even numbers from 1 to 20 using `if i % 2 == 0`.

> **🛑 Stop & Try — Day 7 (Quiz Checkpoint)**
> 1. Complete the loop exercises in `exercises/phase1_core/exercise_day07_loops.py`.
> 2. Run: `python3 -m pytest exercises/phase1_core/test_day07_loops.py -v`
> 3. Try the [Day 7 Quiz](quizzes/quiz_day07.md) — reveal answers only after you've guessed.
> 4. Mark Day 7 as done in [`progress.md`](progress.md).

---

## Day 8 – Lists

Create `day8_lists.py`:

```python
fruits = ["apple", "banana", "cherry"]

print("First fruit:", fruits[0])

for fruit in fruits:
    print("I like", fruit)
```

#### Exercises

- Add and remove items with `append()` and `remove()`.
- Loop by index using `range(len(fruits))`.

---

## Day 9 – Dictionaries

Create `day9_dict.py`:

```python
person = {
    "name": "Adrian",
    "age": 30,
    "city": "Hickory"
}

print(person["name"])
print(person["age"])

for key, value in person.items():
    print(key, "->", value)
```

#### Exercises

- Add `"favorite_color"` key.
- Build a simple phone book dict and look up names.

---

## Day 10 – Functions

Create `day10_functions.py`:

```python
def greet(name):
    print(f"Hello, {name}!")

def add(a, b):
    return a + b

greet("Adrian")
result = add(5, 7)
print("5 + 7 =", result)
```

#### Exercises

- Add `multiply(a, b)` and use it.
- Create `describe_person(name, age)` to print information.

---

## Day 11 – Modules and Imports

Create `math_utils.py`:

```python
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

def subtract(a, b):
    return a - b

def divide(a, b):
    return a / b
```

Create `day11_use_utils.py`:

```python
import math_utils

print(math_utils.add(3, 4))
print(math_utils.multiply(2, 5))
print(math_utils.subtract(10, 3))
print(math_utils.divide(20, 4))
```

---

## Day 12 – Error Handling (`try/except`)

Create `day12_errors.py`:

```python
user_input = input("Enter a number: ")

try:
    value = float(user_input)
    print("You typed:", value)
except ValueError:
    print("That was not a number!")
```

#### Exercises

- Catch `ZeroDivisionError` when dividing.
- Combine with calculator logic to avoid crashes on bad input.

---

## Day 13 – Reading Files

Create `data.txt`:

```text
line one
line two
line three
```

Create `day13_read.py`:

```python
with open("data.txt", "r") as f:
    for line in f:
        print("Got line:", line.strip())
```

#### Exercises

- Count lines in the file.
- Ask user for a filename and read it.

---

## Day 14 – Writing Files

Create `day14_write.py`:

```python
with open("output.txt", "w") as f:
    f.write("First line\n")
    f.write("Second line\n")

print("Wrote to output.txt")
```

#### Exercises

- Append lines using mode `"a"`.
- Log user input to a file.

> **🛑 Stop & Try — Day 14 (Quiz Checkpoint)**
> 1. Complete `exercises/phase1_core/exercise_day12_errors.py`.
> 2. Run: `python3 -m pytest exercises/phase1_core/ -v`
> 3. Try the [Day 14 Quiz](quizzes/quiz_day14.md).
> 4. Mark Day 14 as done in [`progress.md`](progress.md).
> 5. Review the [project milestones](docs/milestones.md) so you know what's coming.

---

## Day 15 – Intro to HTML (Local File)

Create `frontend/index.html` (or in the main folder first):

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>My First Page</title>
</head>
<body>
    <h1>Hello from HTML</h1>
    <p>This is my first web page.</p>
    <button>Click me (does nothing yet)</button>
</body>
</html>
```

Open in browser:

- On Ubuntu desktop: `xdg-open index.html`.
- In Codespaces: use the “Open in browser” feature or download. [web:32]

---

## Day 16 – CSS Basics

Add a `<style>` block to `index.html` in `<head>`:

```html
<style>
    body {
        font-family: sans-serif;
        background-color: #f0f0f0;
    }

    h1 {
        color: #333366;
    }

    button {
        padding: 10px 20px;
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    button:hover {
        background-color: #45a049;
    }
</style>
```

[web:13]

#### Exercises

- Change button color and border radius.
- Add margin/padding to layout.

---

## Day 17 – Simple HTTP Server in Python

Create `day17_server.py`:

```python
from http.server import SimpleHTTPRequestHandler, HTTPServer

host = "0.0.0.0"
port = 8000

server = HTTPServer((host, port), SimpleHTTPRequestHandler)
print(f"Serving on http://{host}:{port}")
server.serve_forever()
```

Run:

```bash
python3 day17_server.py
```

Visit `http://localhost:8000/index.html` in browser. [web:12][web:7]

---

## Day 18 – Custom Endpoint with `BaseHTTPRequestHandler`

Create `day18_endpoint.py`:

```python
from http.server import BaseHTTPRequestHandler, HTTPServer

class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/hello":
            self.send_response(200)
            self.send_header("Content-type", "text/plain")
            self.end_headers()
            self.wfile.write(b"Hello from Python backend!")
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Not Found")

host = "0.0.0.0"
port = 8001

server = HTTPServer((host, port), MyHandler)
print(f"Serving on http://{host}:{port}")
server.serve_forever()
```

Visit `http://localhost:8001/hello`. [web:7]

---

## Day 19 – HTML Button Linking to Backend

Update `index.html`:

```html
<a href="http://localhost:8001/hello">
    <button>Say Hello (Backend)</button>
</a>
```

Run `day17_server.py` and `day18_endpoint.py` in separate terminals, then click the button.

---

## Day 20 – Returning JSON

Update `day18_endpoint.py` to include JSON:

```python
import json
from http.server import BaseHTTPRequestHandler, HTTPServer

class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/info":
            data = {"message": "Hello", "status": "ok"}
            body = json.dumps(data).encode("utf-8")

            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(body)
        else:
            self.send_response(404)
            self.end_headers()
```

Visit `http://localhost:8001/info` and check DevTools.

---

## Day 21 – Fake Weather Endpoint

Extend `MyHandler`:

```python
if self.path == "/weather":
    data = {
        "city": "Hickory",
        "temperature": 25,
        "condition": "Sunny"
    }
    body = json.dumps(data).encode("utf-8")

    self.send_response(200)
    self.send_header("Content-type", "application/json")
    self.end_headers()
    self.wfile.write(body)
```

> **🛑 Stop & Try — Day 21 (Quiz Checkpoint)**
> 1. Complete `exercises/phase2_web/exercise_day18_backend.py`.
> 2. Run: `python3 -m pytest exercises/phase2_web/ -v`
> 3. Try the [Day 21 Quiz](quizzes/quiz_day21.md).
> 4. Mark Day 21 as done in [`progress.md`](progress.md).
> 5. Check [Milestone 1](docs/milestones.md) acceptance criteria before starting the final project.

---

## Day 22 – Project Skeleton: `frontend/` and `backend/`

Organize:

```text
python28/
  frontend/
    index.html
    styles.css
  backend/
    server.py
```

Serve static files:

```bash
cd frontend
python3 -m http.server 8000
```

Keep `backend/server.py` for endpoints.

---

## Day 23 – Nicer HTML Layout

Update `frontend/index.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Mini Python App</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>My Python Web App</h1>
    <p>Click a button to talk to the backend.</p>

    <a href="http://localhost:8001/hello">
        <button>Say Hello</button>
    </a>

    <a href="http://localhost:8001/weather">
        <button>Check Weather</button>
    </a>
</body>
</html>
```

---

## Day 24 – Optional JavaScript Fetch

Add to `index.html` before `</body>`:

```html
<script>
    async function getWeather() {
        const response = await fetch("http://localhost:8001/weather");
        const data = await response.json();
        alert("Weather in " + data.city + ": " + data.temperature + "°C, " + data.condition);
    }
</script>

<button onclick="getWeather()">Get Weather via JS</button>
```

---

## Day 25 – Backend Refactor

Create `backend/server.py`:

```python
import json
from http.server import BaseHTTPRequestHandler, HTTPServer

def get_weather():
    return {
        "city": "Hickory",
        "temperature": 25,
        "condition": "Sunny"
    }

def get_info():
    return {
        "message": "Hello from backend",
        "status": "ok"
    }

class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/weather":
            data = get_weather()
            body = json.dumps(data).encode("utf-8")

            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(body)
        elif self.path == "/info":
            data = get_info()
            body = json.dumps(data).encode("utf-8")

            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(body)
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == "__main__":
    host = "0.0.0.0"
    port = 8001
    server = HTTPServer((host, port), MyHandler)
    print(f"Serving backend on http://{host}:{port}")
    server.serve_forever()
```

---

## Day 26 – Logging Requests

Add basic logging in `MyHandler`:

```python
def do_GET(self):
    print("Got request for:", self.path)

    # existing path checks...
```

---

## Day 27 – Polish Project

Tasks:

- Clean button labels and text.
- Ensure ports and paths are consistent.
- Add an “About” section and footer with version info.

---

## Day 28 – Documentation and GitHub

Create `README.md`:

- Overview of project.
- How to run frontend (`python3 -m http.server 8000` in `frontend`).
- How to run backend (`python3 server.py` in `backend`).
- List endpoints (`/hello`, `/info`, `/weather`).

If using Codespaces, verify everything runs inside the Codespace environment as well. [web:31][web:39][web:40]

> **🛑 Stop & Try — Day 28 (Final Checkpoint)**
> 1. Complete `exercises/phase3_project/backend/server.py`.
> 2. Run all tests: `python3 -m pytest`
> 3. Take the [Day 28 Quiz](quizzes/quiz_day28.md).
> 4. Check off all items in [`docs/milestones.md`](docs/milestones.md).
> 5. Fill in the [Capstone Rubric](docs/capstone_rubric.md) and score yourself.
> 6. Mark all remaining days as done in [`progress.md`](progress.md).
>
> **Congratulations on completing the 28-Day Python Bootcamp!** 🐍🎉

---

## Bonus Track: Data Analysis with Python

### Intro to Data Analysis

Data analysis is:

- Collecting data.
- Cleaning and transforming it.
- Summarizing and visualizing.

Use **pandas**, the main Python data analysis library. [web:64][web:69]

### Setup

Inside `python28` (and `venv`):

```bash
pip install pandas
```

### Simple Analysis Example

Create `sales.csv`:

```text
date,product,quantity,price
2024-01-01,Widget,2,10.0
2024-01-01,Gadget,1,15.0
2024-01-02,Widget,3,10.0
2024-01-02,Gadget,2,15.0
```

Create `bonus_data_analysis.py`:

```python
import pandas as pd

df = pd.read_csv("sales.csv")
print(df)

df["total"] = df["quantity"] * df["price"]

summary = df.groupby("product")["total"].sum()

print("Total sales by product:")
print(summary)
```

### Free Resources

- FreeCodeCamp “Data Analysis with Python” course (covers pandas, NumPy, Matplotlib). [web:71]
- Pandas official docs. [web:64]
- Pandas tutorials on W3Schools, GeeksforGeeks, and DataCamp. [web:63][web:65][web:69]
- Video: “Pandas & Python for Data Analysis by Example”. [web:61]

---

## Bonus Track: Simple ETL/Data Pipeline in Python

### ETL Basics

ETL:

- **Extract** – read data from sources.
- **Transform** – clean and reshape.
- **Load** – write to a destination (DB, CSV, warehouse). [web:68][web:70]

### Mini ETL Example (CSV → SQLite)

Install tools:

```bash
sudo apt install -y sqlite3
pip install pandas
```

Create `bonus_etl.py`:

```python
import pandas as pd
import sqlite3

# Extract
df = pd.read_csv("sales.csv")

# Transform
df = df.dropna()
df["total"] = df["quantity"] * df["price"]

# Load
conn = sqlite3.connect("sales.db")
df.to_sql("sales_clean", conn, if_exists="replace", index=False)
conn.close()

print("Pipeline complete: loaded cleaned data into sales.db")
```

### Pipeline Resources

- Intro to data pipelines article. [web:49]
- ETL process overview. [web:68][web:70]
- “Building an ETL Pipeline in Python” article. [web:66]
- Video: “What is a Data Pipeline! Data Pipelines Explained for Beginners!”. [web:48]
- Python‑focused data engineering tracks/courses. [web:73][web:51]

---

## Connecting Web App and Data Pipeline

You can extend your web app:

- Add backend endpoint `/sales-summary` that reads from `sales.db` or runs a small ETL step.
- Return JSON with total sales and top product.
- Display this summary on your frontend via JavaScript or static HTML.

This ties together:

- Python basics.
- Web development.
- Data analysis and ETL thinking.
