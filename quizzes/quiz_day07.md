# Day 7 Checkpoint Quiz – Loops and Conditionals

Take this quiz after completing Day 7. It covers Days 1–7.  
No code editor needed — work through the questions on paper or in your head first, then reveal the answers.

---

## Question 1

What does this code print?

```python
for i in range(3):
    print(i)
```

- A) `1 2 3`
- B) `0 1 2`
- C) `0 1 2 3`
- D) Nothing — it produces an error

<details>
<summary>Answer</summary>

**B) `0 1 2`**

`range(3)` generates the integers 0, 1, 2 (it stops *before* 3).  
To include 3 you would write `range(4)` or `range(0, 4)`.

</details>

---

## Question 2

What is the value of `result` after this runs?

```python
result = 0
for i in range(1, 5):
    result += i
```

- A) 4
- B) 10
- C) 15
- D) 6

<details>
<summary>Answer</summary>

**B) 10**

`range(1, 5)` produces 1, 2, 3, 4.  
`1 + 2 + 3 + 4 = 10`

</details>

---

## Question 3

Which `if` statement correctly identifies a teenager (age 13–19)?

- A) `if age > 13 and age < 20:`
- B) `if age >= 13 and age <= 19:`
- C) `if 13 < age < 20:`
- D) `if age == 13 or age == 19:`

<details>
<summary>Answer</summary>

**B and C are both correct!**

- Option B uses `>=` and `<=` which is explicit and clear.
- Option C uses Python's chained comparison, which is idiomatic.
- Option A misses `13` (uses `>` instead of `>=`).
- Option D only matches exactly 13 or 19 and nothing in between.

</details>

---

## Question 4

What does `%` (the modulo operator) do?

```python
print(10 % 3)
```

- A) Prints `3.33`
- B) Prints `1`
- C) Prints `0`
- D) Prints `30`

<details>
<summary>Answer</summary>

**B) Prints `1`**

`%` returns the **remainder** after division.  
`10 ÷ 3 = 3` with a remainder of `1`, so `10 % 3 == 1`.

A classic use: `n % 2 == 0` checks if `n` is even.

</details>

---

## Question 5

What happens here?

```python
count = 0
while count < 3:
    print("hello")
```

- A) Prints "hello" three times then stops
- B) Prints "hello" once
- C) Runs forever (infinite loop)
- D) Produces a `SyntaxError`

<details>
<summary>Answer</summary>

**C) Runs forever (infinite loop)**

`count` is never incremented inside the loop, so the condition `count < 3` is always `True`.  
Fix: add `count += 1` inside the loop body.

</details>

---

## Question 6 – Code Prediction

What is the output of this snippet?

```python
numbers = [10, 20, 30]
total = 0
for n in numbers:
    total = total + n
print(total)
```

<details>
<summary>Answer</summary>

**`60`**

The loop adds each element to `total`:  
`0 + 10 = 10` → `10 + 20 = 30` → `30 + 30 = 60`

</details>

---

## Question 7 – Write the Code

Write a `for` loop that prints only the **even** numbers from 1 to 10.

<details>
<summary>Answer</summary>

```python
for i in range(1, 11):
    if i % 2 == 0:
        print(i)
```

Or more concisely:

```python
for i in range(2, 11, 2):
    print(i)
```

Both produce: `2 4 6 8 10`

</details>

---

**Score yourself:** 6–7 correct → Ready for Week 2! | 4–5 → Review Days 5–7. | <4 → Revisit Days 1–7.
