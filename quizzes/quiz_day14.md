# Day 14 Checkpoint Quiz – Functions, Lists, Dicts, Files

Take this quiz after completing Day 14. It covers Days 8–14.

---

## Question 1

What does this function return when called as `double(5)`?

```python
def double(x):
    return x * 2
```

- A) Nothing (no output)
- B) `10`
- C) `"10"`
- D) Raises a `TypeError`

<details>
<summary>Answer</summary>

**B) `10`**

`double(5)` returns `5 * 2 = 10` (an integer).  
The function doesn't `print` anything — it `return`s a value.

</details>

---

## Question 2

Which line adds `"mango"` to the end of the list?

```python
fruits = ["apple", "banana"]
```

- A) `fruits.insert("mango")`
- B) `fruits.append("mango")`
- C) `fruits.add("mango")`
- D) `fruits + "mango"`

<details>
<summary>Answer</summary>

**B) `fruits.append("mango")`**

- `append(item)` adds a single item to the **end**.
- `insert(index, item)` inserts at a specific position (requires two arguments).
- `add` does not exist on lists (it exists on sets).
- `fruits + "mango"` would raise a `TypeError`.

</details>

---

## Question 3

What is the output?

```python
person = {"name": "Alice", "age": 30}
print(person["name"])
```

- A) `"name"`
- B) `30`
- C) `Alice`
- D) `{"name": "Alice", "age": 30}`

<details>
<summary>Answer</summary>

**C) `Alice`**

`person["name"]` looks up the value stored under the key `"name"`.

</details>

---

## Question 4

What exception is raised when you try to open a file that does not exist?

```python
with open("missing.txt", "r") as f:
    content = f.read()
```

- A) `ValueError`
- B) `IOError`
- C) `FileNotFoundError`
- D) `MissingFileError`

<details>
<summary>Answer</summary>

**C) `FileNotFoundError`**

`FileNotFoundError` is a subclass of `OSError` (which is also called `IOError`).  
Catch it with:

```python
try:
    with open("missing.txt", "r") as f:
        content = f.read()
except FileNotFoundError:
    print("File not found!")
```

</details>

---

## Question 5

What is printed?

```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Alice"))
print(greet("Bob", "Hi"))
```

<details>
<summary>Answer</summary>

```
Hello, Alice!
Hi, Bob!
```

`greeting="Hello"` is a **default parameter** — it is used when no second argument is provided.  
When `"Hi"` is passed, it overrides the default.

</details>

---

## Question 6

What is the output of this loop?

```python
scores = {"math": 90, "science": 85, "art": 92}
for subject, score in scores.items():
    if score > 88:
        print(subject)
```

<details>
<summary>Answer</summary>

```
math
art
```

`scores.items()` iterates over key-value pairs.  
`math (90 > 88)` and `art (92 > 88)` satisfy the condition; `science (85)` does not.

</details>

---

## Question 7 – Write the Code

Write a function `safe_divide(a, b)` that returns `a / b`, but returns `None` (instead of crashing) if `b` is zero.

<details>
<summary>Answer</summary>

```python
def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return None
```

</details>

---

**Score:** 6–7 → Great — Week 2 mastered! | 4–5 → Review Days 10–14. | <4 → Revisit Days 8–14.
