# Day 21 Checkpoint Quiz – HTML, CSS, and Python HTTP

Take this quiz after completing Day 21. It covers Days 15–21.

---

## Question 1

Which HTML tag creates a clickable button?

- A) `<input type="submit">`
- B) `<btn>Click</btn>`
- C) `<button>Click</button>`
- D) Both A and C

<details>
<summary>Answer</summary>

**D) Both A and C**

- `<button>Click</button>` is the standard HTML button element.
- `<input type="submit">` is an input element that acts as a button (typically used inside forms).
- `<btn>` does not exist in HTML.

</details>

---

## Question 2

What CSS property changes the text colour of an element?

- A) `text-color`
- B) `font-color`
- C) `color`
- D) `foreground`

<details>
<summary>Answer</summary>

**C) `color`**

```css
h1 {
    color: #333366;
}
```

`text-color` and `font-color` do not exist. `foreground` is not a CSS property.

</details>

---

## Question 3

Which Python module is used in this course to build a simple HTTP server?

- A) `flask`
- B) `http.server`
- C) `requests`
- D) `urllib`

<details>
<summary>Answer</summary>

**B) `http.server`**

`http.server` is part of Python's standard library — no installation needed.  
`flask` is a popular third-party framework (used in more advanced courses).  
`requests` is for making HTTP *requests*, not serving them.

</details>

---

## Question 4

What does this Python snippet do?

```python
import json
data = {"city": "Hickory", "temperature": 25}
body = json.dumps(data).encode("utf-8")
```

- A) Reads JSON from a file
- B) Converts a dict to a JSON string, then to bytes
- C) Sends an HTTP response
- D) Parses a JSON string

<details>
<summary>Answer</summary>

**B) Converts a dict to a JSON string, then to bytes**

- `json.dumps(data)` converts the dict to the string `'{"city": "Hickory", "temperature": 25}'`.
- `.encode("utf-8")` converts the string to bytes — required by `wfile.write()`.

</details>

---

## Question 5

Your Python server listens on `http://localhost:8001`. A browser visits `/weather`. Which method in `BaseHTTPRequestHandler` handles this request?

- A) `handle_GET()`
- B) `get()`
- C) `do_GET()`
- D) `on_request()`

<details>
<summary>Answer</summary>

**C) `do_GET()`**

`BaseHTTPRequestHandler` dispatches HTTP methods to methods named `do_<METHOD>`.  
For a GET request, it calls `do_GET()`.

</details>

---

## Question 6

What HTTP status code means "OK / success"?

- A) 404
- B) 500
- C) 301
- D) 200

<details>
<summary>Answer</summary>

**D) 200**

Common status codes to know:
| Code | Meaning |
|------|---------|
| 200 | OK |
| 404 | Not Found |
| 500 | Internal Server Error |
| 301 | Moved Permanently |

</details>

---

## Question 7 – Write the Code

Write the `do_GET` handler that returns `{"status": "ok"}` as JSON when the path is `/ping`, and 404 otherwise.

<details>
<summary>Answer</summary>

```python
import json

def do_GET(self):
    if self.path == "/ping":
        data = {"status": "ok"}
        body = json.dumps(data).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()
        self.wfile.write(body)
    else:
        self.send_response(404)
        self.end_headers()
        self.wfile.write(b"Not Found")
```

</details>

---

**Score:** 6–7 → Ready for the final project! | 4–5 → Review Days 17–21. | <4 → Revisit Days 15–21.
