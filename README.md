# Master Python in 28 Days (Linux‑First)

Welcome! This repo contains a **28‑day, hands‑on Python learning program** that takes you from installing Python on Linux to building a simple web application with a Python backend and an HTML/CSS frontend. It is written with **Linux (Ubuntu)** in mind, but also shows how to use **WSL on Windows** and **GitHub Codespaces** as Linux environments.

The explanations are deliberately beginner‑friendly (“teach me like I’m 5”), but the exercises are real and build toward a usable project.

---

## What You’ll Build and Learn

By the end, you will:

- Install and configure Python 3 on Linux (or WSL / Codespaces).
- Use virtual environments to isolate dependencies.
- Write Python scripts using:
  - Variables, types, and expressions
  - Conditionals, loops, and functions
  - Modules and error handling
  - Basic file I/O (reading & writing text files)
- Build a tiny web app:
  - **Frontend:** HTML page styled with CSS and optional JavaScript.
  - **Backend:** Python HTTP server using the standard library (`http.server`) serving simple endpoints.
  - Integrate frontend buttons with backend routes (e.g., `/hello`, `/info`, `/weather`).
- Explore a **bonus track** on:
  - Data analysis with **pandas**.
  - A tiny ETL/data pipeline (CSV → transform → SQLite).

---

## Prerequisites

- Basic familiarity with:
  - Opening a terminal and running commands
  - Editing files with a text editor (VS Code, nano, etc.)
- A machine with one of:
  - **Ubuntu/Linux** (native)
  - **Windows 10/11 with WSL + Ubuntu**
  - **GitHub Codespaces** (Ubuntu‑based dev container) 

You do **not** need prior Python experience; the program starts from “Hello, World”.

---

## High‑Level Structure

The program is broken into three main phases plus a bonus track:

1. **Days 1–14: Core Python**
   - Environment setup (Python, `venv`, project structure)
   - Variables, strings, conditionals (`if`/`elif`/`else`)
   - Loops (`for`, `while`), lists, dictionaries
   - Functions and simple modules
   - Basic file I/O and error handling

2. **Days 15–21: Web Fundamentals**
   - Intro HTML and CSS
   - Serving static files with `SimpleHTTPRequestHandler` 
   - Creating custom HTTP endpoints with `BaseHTTPRequestHandler`
   - Returning plain text and JSON
   - Simple “fake weather” API with hard‑coded data

3. **Days 22–28: Final Web Project**
   - Project structure (`frontend/`, `backend/`)
   - Frontend: a small HTML/CSS page with 
