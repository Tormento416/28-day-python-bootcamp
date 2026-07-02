# Tests for Day 5–6 (Conditions and Boolean Logic)
#
# Run:  python3 -m pytest exercises/phase1_core/test_day05_conditions.py -v

import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
from exercise_day05_conditions import age_category, is_even, fizzbuzz


# ── age_category ───────────────────────────────────────────────────────────────

def test_age_category_kid():
    assert age_category(8) == "kid", (
        f"age_category(8) should be 'kid' but got {age_category(8)!r}.\n"
        "Hint: kids are under 13."
    )


def test_age_category_teenager():
    assert age_category(15) == "teenager", (
        f"age_category(15) should be 'teenager' but got {age_category(15)!r}.\n"
        "Hint: teenagers are 13–19."
    )


def test_age_category_adult():
    assert age_category(25) == "adult", (
        f"age_category(25) should be 'adult' but got {age_category(25)!r}.\n"
        "Hint: adults are 20 and over."
    )


def test_age_category_boundary_13():
    assert age_category(13) == "teenager", (
        "age_category(13) should be 'teenager' — 13 is the start of teenager range."
    )


def test_age_category_boundary_20():
    assert age_category(20) == "adult", (
        "age_category(20) should be 'adult' — 20 is where adult range starts."
    )


# ── is_even ────────────────────────────────────────────────────────────────────

def test_is_even_true():
    assert is_even(4) is True, (
        "is_even(4) should return True.\n"
        "Hint: a number is even if  number % 2 == 0"
    )


def test_is_even_false():
    assert is_even(7) is False, (
        "is_even(7) should return False."
    )


def test_is_even_zero():
    assert is_even(0) is True, (
        "is_even(0) should return True — 0 is considered even."
    )


# ── fizzbuzz ───────────────────────────────────────────────────────────────────

def test_fizzbuzz_divisible_by_both():
    assert fizzbuzz(15) == "FizzBuzz", (
        f"fizzbuzz(15) should be 'FizzBuzz' but got {fizzbuzz(15)!r}.\n"
        "Hint: check divisibility by 15 (or both 3 and 5) first."
    )


def test_fizzbuzz_divisible_by_3():
    assert fizzbuzz(9) == "Fizz", (
        f"fizzbuzz(9) should be 'Fizz' but got {fizzbuzz(9)!r}."
    )


def test_fizzbuzz_divisible_by_5():
    assert fizzbuzz(10) == "Buzz", (
        f"fizzbuzz(10) should be 'Buzz' but got {fizzbuzz(10)!r}."
    )


def test_fizzbuzz_plain_number():
    assert fizzbuzz(7) == "7", (
        f"fizzbuzz(7) should be '7' (a string) but got {fizzbuzz(7)!r}.\n"
        "Hint: use  str(n)  to convert the number to a string."
    )
