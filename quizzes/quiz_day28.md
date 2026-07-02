# Day 28 Checkpoint Quiz – Final Project & Full-Stack Concepts

Congratulations on reaching Day 28! This quiz covers the full 28 days.

---

## Question 1

Your project has the structure below. Where should `backend/server.py` import modules from?

```
python28/
  frontend/
    index.html
    styles.css
  backend/
    server.py
```

- A) `from frontend import index`
- B) Standard library only — `json`, `http.server`, etc.
- C) `import frontend.styles`
- D) You must install Flask to do this

<details>
<summary>Answer</summary>

**B) Standard library only — `json`, `http.server`, etc.**

The backend doesn't import from the frontend folder. The frontend is served as static files.  
At this level, the backend only needs Python's standard library.

</details>

---

## Question 2

Which command serves the files in the `frontend/` folder on port 8000?

- A) `python3 -m http.server 8000 --directory frontend/`
- B) `serve frontend/ -p 8000`
- C) `python3 frontend/index.html`
- D) `open frontend/index.html`

<details>
<summary>Answer</summary>

**A) `python3 -m http.server 8000 --directory frontend/`**

(On older Python 3 versions: `cd frontend && python3 -m http.server 8000`)

This uses `http.server` from the standard library — no extra packages needed.

</details>

---

## Question 3

A user visits your frontend in the browser and clicks "Get Weather". The page calls `fetch("http://localhost:8001/weather")`. What must be true for this to work?

- A) The backend server must be running on port 8001
- B) The frontend must be in the same folder as the backend
- C) You need a database
- D) Python must be version 3.10 or higher

<details>
<summary>Answer</summary>

**A) The backend server must be running on port 8001**

The browser makes a real HTTP request to `localhost:8001`.  
If `backend/server.py` is not running, the request fails with a network error.

</details>

---

## Question 4

What does this line do in the context of a `BaseHTTPRequestHandler`?

```python
self.send_header("Content-type", "application/json")
```

- A) Reads the Content-Type from the request
- B) Sets the Content-Type header of the HTTP *response*
- C) Saves the content type to a file
- D) Validates that the data is valid JSON

<details>
<summary>Answer</summary>

**B) Sets the Content-Type header of the HTTP response**

This tells the browser what kind of data it is receiving.  
`"application/json"` means the body is JSON.  
Always call `self.end_headers()` after setting all headers.

</details>

---

## Question 5

You refactored the backend so `get_weather()` is a standalone function. What is the main benefit?

- A) The server starts faster
- B) The function is now testable without running the HTTP server
- C) It uses less memory
- D) The browser loads faster

<details>
<summary>Answer</summary>

**B) The function is now testable without running the HTTP server**

By separating *logic* from *HTTP handling*, you can write unit tests that call `get_weather()` directly.  
This is a fundamental principle of good software design.

</details>

---

## Question 6 – Code Prediction

What does this print?

```python
import json

data = json.loads('{"city": "Hickory", "temp": 25}')
print(data["city"], data["temp"] + 5)
```

<details>
<summary>Answer</summary>

```
Hickory 30
```

`json.loads()` parses a JSON string into a Python dict.  
`data["city"]` is `"Hickory"` and `data["temp"] + 5` is `25 + 5 = 30`.

</details>

---

## Question 7 – Reflection

Name **three things** you would add or improve if you had another week to work on your project.  
There is no single right answer — this is about thinking like a developer.

<details>
<summary>Sample ideas</summary>

- Add a form so users can submit data (not just view it).
- Persist data to a file or SQLite database instead of hard-coding it.
- Add more API endpoints (e.g., `/about`, `/contact`).
- Use CSS transitions to make buttons feel more interactive.
- Add error handling when the backend is unreachable (show a friendly message in the browser).
- Write more tests and reach 100 % test coverage.

</details>

---

**Score:** 6–7 → You've mastered the bootcamp! 🎉 | 4–5 → Review Days 22–28. | <4 → Revisit any section that felt unclear.
