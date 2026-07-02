# Tests for Day 10–11 (Functions and Modules)
#
# Run:  python3 -m pytest exercises/phase1_core/test_day10_functions.py -v

import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
from exercise_day10_functions import greet, add, multiply, describe_person, apply_twice


# ── greet ──────────────────────────────────────────────────────────────────────

def test_greet_returns_correct_string():
    assert greet("Alice") == "Hello, Alice!", (
        f"greet('Alice') should be 'Hello, Alice!' but got {greet('Alice')!r}."
    )


# ── add ────────────────────────────────────────────────────────────────────────

def test_add_integers():
    assert add(3, 4) == 7, (
        f"add(3, 4) should be 7 but got {add(3,4)!r}."
    )


def test_add_floats():
    assert abs(add(1.5, 2.0) - 3.5) < 1e-9, (
        f"add(1.5, 2.0) should be 3.5 but got {add(1.5,2.0)!r}."
    )


def test_add_negative():
    assert add(-1, 1) == 0, (
        f"add(-1, 1) should be 0 but got {add(-1,1)!r}."
    )


# ── multiply ───────────────────────────────────────────────────────────────────

def test_multiply_basic():
    assert multiply(3, 4) == 12, (
        f"multiply(3, 4) should be 12 but got {multiply(3,4)!r}."
    )


def test_multiply_by_zero():
    assert multiply(99, 0) == 0, (
        f"multiply(99, 0) should be 0 but got {multiply(99,0)!r}."
    )


# ── describe_person ────────────────────────────────────────────────────────────

def test_describe_person_basic():
    result = describe_person("Bob", 25)
    assert result == "Bob is 25 years old.", (
        f"describe_person('Bob', 25) should be 'Bob is 25 years old.' but got {result!r}.\n"
        "Hint: use an f-string: f'{name} is {age} years old.'"
    )


def test_describe_person_ends_with_period():
    result = describe_person("Ada", 36)
    assert result.endswith("."), (
        f"describe_person result should end with '.' but got {result!r}."
    )


# ── apply_twice ────────────────────────────────────────────────────────────────

def test_apply_twice_increment():
    result = apply_twice(lambda x: x + 1, 5)
    assert result == 7, (
        f"apply_twice(lambda x: x+1, 5) should be 7 (5→6→7) but got {result!r}.\n"
        "Hint: call func(func(value))."
    )


def test_apply_twice_double():
    result = apply_twice(lambda x: x * 2, 3)
    assert result == 12, (
        f"apply_twice(lambda x: x*2, 3) should be 12 (3→6→12) but got {result!r}."
    )
