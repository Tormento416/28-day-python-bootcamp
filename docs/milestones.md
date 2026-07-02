# Project Milestones – Final Web Application (Days 22–28)

Use this document to track your progress through the final project.  
Each milestone has **acceptance criteria** — specific things that must be true before you move on.

---

## Milestone 1 – Project Skeleton (Day 22)

**Goal:** Create the folder structure and verify that the frontend is servable.

### Acceptance criteria

- [ ] Folder structure exists:
  ```
  python28/
    frontend/
      index.html
    backend/
      server.py
  ```
- [ ] `frontend/index.html` contains valid HTML with at least an `<h1>` heading.
- [ ] Running `python3 -m http.server 8000 --directory frontend/` (or `cd frontend && python3 -m http.server 8000`) opens the page in a browser without errors.

### How to verify
```bash
# In one terminal:
python3 -m http.server 8000 --directory frontend/
# Open http://localhost:8000 in your browser — you should see the heading.
```

---

## Milestone 2 – First Working Endpoint (Day 25)

**Goal:** The backend returns a plain-text response for at least one endpoint.

### Acceptance criteria

- [ ] `backend/server.py` imports `http.server` and defines a `MyHandler` class.
- [ ] Visiting `http://localhost:8001/hello` returns a 200 response with text content.
- [ ] The `get_info()` function is implemented and returns a dict with `"message"` and `"status"` keys.
- [ ] Phase 3 project test passes:
  ```bash
  python3 -m pytest exercises/phase3_project/test_project.py::test_get_info_returns_dict -v
  ```

### How to verify
```bash
# In one terminal run the backend:
cd backend
python3 server.py

# In another terminal (or a browser):
curl http://localhost:8001/hello
# Expected: "Hello from Python backend!" (or similar text)
```

---

## Milestone 3 – JSON API Endpoints (Day 25)

**Goal:** Backend serves JSON for `/info` and `/weather`.

### Acceptance criteria

- [ ] `get_weather()` function returns a dict with `"city"`, `"temperature"`, and `"condition"` keys.
- [ ] `get_info()` function returns a dict with `"message"` and `"status"` keys.
- [ ] `json_bytes()` function converts a dict to UTF-8 encoded JSON bytes.
- [ ] All Phase 3 project tests pass:
  ```bash
  python3 -m pytest exercises/phase3_project/ -v
  ```
- [ ] Visiting `http://localhost:8001/weather` returns JSON in the browser/curl.
- [ ] Visiting `http://localhost:8001/info` returns JSON.

### How to verify
```bash
python3 -m pytest exercises/phase3_project/ -v
# All tests should show PASSED

curl http://localhost:8001/weather
# Expected: {"city": "Hickory", "temperature": 25, "condition": "Sunny"}
```

---

## Milestone 4 – Frontend Connects to Backend (Day 23–24)

**Goal:** Clicking a button in the browser triggers a real backend request.

### Acceptance criteria

- [ ] `frontend/index.html` has at least two buttons.
- [ ] Clicking "Check Weather" (or equivalent) makes a request to `http://localhost:8001/weather` and displays the result.
- [ ] Clicking a second button makes a request to a different endpoint.
- [ ] No console errors in browser DevTools (F12 → Console).

### How to verify

1. Start the backend: `cd backend && python3 server.py`
2. Start the frontend: `python3 -m http.server 8000 --directory frontend/`
3. Open `http://localhost:8000` in the browser.
4. Click each button and confirm data appears on the page (or in an alert).
5. Open DevTools (F12) → Console tab → no red errors.

---

## Milestone 5 – Polished and Documented Project (Days 27–28)

**Goal:** The project is clean, documented, and ready to share.

### Acceptance criteria

- [ ] `frontend/styles.css` exists and is linked from `index.html` (no inline `<style>` only).
- [ ] Button labels and page text are clear and descriptive.
- [ ] `backend/server.py` has a docstring or comments explaining each endpoint.
- [ ] A `README.md` exists in the project root (or `backend/`) that explains:
  - How to start the frontend server.
  - How to start the backend server.
  - What each endpoint does.
- [ ] Running `python3 -m pytest` passes all provided tests.
- [ ] Self-assessment rubric in [`docs/capstone_rubric.md`](capstone_rubric.md) is filled in.

---

## All milestones complete?

Congratulations! 🎉  
Your project is fully functional, tested, and documented.

**Next steps to keep learning:**
- Replace the hard-coded weather data with a real API (e.g., Open-Meteo — free and no key required).
- Add a HTML form so users can submit their own data.
- Explore Flask for a more powerful backend framework.
- Deploy to a free hosting service (e.g., Render, Railway).
