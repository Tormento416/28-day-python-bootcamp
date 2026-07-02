# Tests for Day 9 (Dictionaries)
#
# Run:  python3 -m pytest exercises/phase1_core/test_day09_dicts.py -v

import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
from exercise_day09_dicts import get_name, add_key, invert_dict, word_lengths


# ── get_name ───────────────────────────────────────────────────────────────────

def test_get_name_basic():
    result = get_name({"name": "Alice", "age": 30})
    assert result == "Alice", (
        f"get_name should return 'Alice' but got {result!r}.\n"
        "Hint: use  d['name']  to access a dict value."
    )


def test_get_name_different_person():
    result = get_name({"name": "Bob", "city": "London"})
    assert result == "Bob", (
        f"get_name should return 'Bob' but got {result!r}."
    )


# ── add_key ────────────────────────────────────────────────────────────────────

def test_add_key_adds_entry():
    d = {"a": 1}
    result = add_key(d, "b", 2)
    assert "b" in result, (
        "add_key should add the new key to the dict.\n"
        "Hint:  d[key] = value  adds a key."
    )
    assert result["b"] == 2, (
        f"add_key should set the value to 2 but got {result.get('b')!r}."
    )


def test_add_key_preserves_existing():
    d = {"a": 1}
    result = add_key(d, "b", 99)
    assert result["a"] == 1, (
        "add_key should keep existing keys — 'a' disappeared!"
    )


# ── invert_dict ────────────────────────────────────────────────────────────────

def test_invert_dict_basic():
    result = invert_dict({"a": 1, "b": 2})
    assert result == {1: "a", 2: "b"}, (
        f"invert_dict should swap keys and values but got {result!r}.\n"
        "Hint: use a for loop:  for k, v in d.items(): new_dict[v] = k"
    )


def test_invert_dict_empty():
    assert invert_dict({}) == {}, (
        "invert_dict({}) should return an empty dict."
    )


# ── word_lengths ───────────────────────────────────────────────────────────────

def test_word_lengths_basic():
    result = word_lengths(["hi", "hello"])
    assert result == {"hi": 2, "hello": 5}, (
        f"word_lengths should map each word to its length but got {result!r}.\n"
        "Hint:  len('hi')  returns 2."
    )


def test_word_lengths_empty():
    assert word_lengths([]) == {}, (
        "word_lengths([]) should return an empty dict."
    )
