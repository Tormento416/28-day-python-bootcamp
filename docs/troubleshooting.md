# Troubleshooting Guide – Common Beginner Issues

This file covers the most common problems beginners run into. If you're stuck, check here first.

---

## 1. Virtual environment not activating

**Symptom:** You run `source venv/bin/activate` but see "No such file or directory."

**Cause:** The virtual environment hasn't been created yet, or you're in the wrong folder.

**Fix:**
```bash
# Make sure you're in the project root
cd ~/python28

# Create the venv (only needed once)
python3 -m venv venv

# Activate it
source venv/bin/activate
```

**How to tell it's active:** Your terminal prompt will start with `(venv)`.

**Deactivate when done:**
```bash
deactivate
```

---

## 2. `python` command not found — use `python3`

**Symptom:** You type `python script.py` and get "command not found" or "python2" runs instead.

**Cause:** On Ubuntu/Linux, the `python` command often doesn't exist or points to Python 2.

**Fix:** Always use `python3`:
```bash
python3 script.py
python3 -m pytest
python3 -m venv venv
```

**Optional alias** (add to `~/.bashrc`):
```bash
alias python=python3
```

---

## 3. `IndentationError` or `TabError`

**Symptom:**
```
IndentationError: expected an indented block
TabError: inconsistent use of tabs and spaces
```

**Cause:** Python is strict about indentation. Mixing tabs and spaces causes errors.

**Fix:**
- Use **4 spaces** for indentation (never tabs in Python).
- In VS Code: open the file, press `Ctrl+Shift+P`, type "Convert Indentation to Spaces", press Enter.
- Check your editor's "Spaces/Tabs" indicator at the bottom status bar.

**Good:**
```python
def greet(name):
    print("Hello,", name)   # 4 spaces
```

**Bad (mixes tab and spaces):**
```python
def greet(name):
	print("Hello,", name)  # TAB — will cause errors
```

---

## 4. `ModuleNotFoundError` / `ImportError`

**Symptom:**
```
ModuleNotFoundError: No module named 'pandas'
```

**Cause 1:** The package is not installed in the active virtual environment.

**Fix:**
```bash
# Make sure venv is active first
source venv/bin/activate
pip install pandas
```

**Cause 2:** You are running Python outside the virtual environment.

**Fix:** Check that `(venv)` appears in your prompt, then run again.

**Cause 3:** Your custom module file is not in the same folder as your script.

**Fix:** Run your script from the folder where the module lives:
```bash
cd ~/python28
python3 day11_use_utils.py   # math_utils.py must be in the same folder
```

---

## 5. `pytest` command not found

**Symptom:**
```
pytest: command not found
```
or
```
python: No module named pytest
```

**Fix:**
```bash
# Make sure venv is active
source venv/bin/activate

# Install pytest
pip install pytest

# Run tests using the module form (always works when venv is active)
python3 -m pytest
```

**Why `python3 -m pytest` is safer than just `pytest`:**  
`python3 -m pytest` always uses the Python interpreter and packages from the active environment.  
`pytest` might pick up a system-wide installation that doesn't know about your venv's packages.

---

## 6. `SyntaxError` near a colon or parenthesis

**Symptom:**
```
SyntaxError: invalid syntax
```
The error points to a line that *looks* correct.

**Cause:** Python often reports the error *after* the actual problem.

**Fix:** Look at the line **before** the one mentioned in the error message.

**Common culprits:**
- Missing `:` at the end of `if`, `for`, `while`, `def`, `class`
- Unclosed parenthesis `(` or bracket `[`
- Missing quotes around a string

```python
# Missing colon — error reported on the NEXT line
for i in range(5)    # ← missing :
    print(i)
```

---

## 7. The server starts but the browser shows "Unable to connect"

**Symptom:** You visit `http://localhost:8001/hello` and the browser says the site can't be reached.

**Cause:** The server is either not running or is listening on a different port.

**Fix:**
1. Check the terminal where you started the server — is it still running?  
   If it stopped, restart it: `python3 day18_endpoint.py`
2. Check the port number in the Python file and in the browser URL — they must match.
3. If you're in **Codespaces**, use the "Ports" tab in VS Code to forward the port, then open the forwarded URL (not `localhost`).

---

## 8. `KeyError` when accessing a dictionary

**Symptom:**
```
KeyError: 'name'
```

**Cause:** You're trying to access a key that doesn't exist in the dictionary.

**Fix — option A:** Use `.get()` which returns `None` if the key is missing:
```python
value = person.get("name")          # returns None if missing
value = person.get("name", "N/A")   # returns "N/A" if missing
```

**Fix — option B:** Check first with `in`:
```python
if "name" in person:
    print(person["name"])
```

---

## Still stuck?

- Re-read the error message carefully — Python is usually telling you exactly what's wrong.
- Search the exact error message on [stackoverflow.com](https://stackoverflow.com).
- Ask in a Python beginner community (e.g., r/learnpython on Reddit).
