# Tests for Day 1–4 (Strings and Printing)
#
# Run these tests with:
#   python3 -m pytest exercises/phase1_core/test_day01_strings.py -v
#
# A PASSED test means your solution is correct.
# A FAILED test shows a hint about what went wrong.

import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
from exercise_day01_strings import make_greeting, shout, whisper, full_sentence


# ── make_greeting ─────────────────────────────────────────────────────────────

def test_make_greeting_returns_string():
    result = make_greeting("Alice")
    assert result is not None, (
        "make_greeting returned None. Did you forget to add a return statement?"
    )
    assert isinstance(result, str), (
        f"make_greeting should return a string, but got {type(result).__name__}."
    )


def test_make_greeting_basic():
    result = make_greeting("Alice")
    assert result == "Hello, Alice!", (
        f"Expected 'Hello, Alice!' but got {result!r}.\n"
        "Hint: use an f-string like  f'Hello, {name}!'"
    )


def test_make_greeting_other_name():
    result = make_greeting("Bob")
    assert result == "Hello, Bob!", (
        f"Expected 'Hello, Bob!' but got {result!r}."
    )


# ── shout ──────────────────────────────────────────────────────────────────────

def test_shout_converts_to_uppercase():
    result = shout("hello")
    assert result == "HELLO", (
        f"Expected 'HELLO' but got {result!r}.\n"
        "Hint: Python strings have a .upper() method."
    )


def test_shout_already_upper():
    result = shout("PYTHON")
    assert result == "PYTHON", (
        f"Expected 'PYTHON' but got {result!r}."
    )


# ── whisper ────────────────────────────────────────────────────────────────────

def test_whisper_converts_to_lowercase():
    result = whisper("HELLO")
    assert result == "hello", (
        f"Expected 'hello' but got {result!r}.\n"
        "Hint: Python strings have a .lower() method."
    )


# ── full_sentence ──────────────────────────────────────────────────────────────

def test_full_sentence_basic():
    result = full_sentence("Bob", "blue")
    assert result == "Bob loves blue.", (
        f"Expected 'Bob loves blue.' but got {result!r}.\n"
        "Hint: use an f-string: f'{name} loves {color}.'"
    )


def test_full_sentence_ends_with_period():
    result = full_sentence("Ada", "green")
    assert result.endswith("."), (
        f"The sentence should end with a period '.', but got {result!r}."
    )
