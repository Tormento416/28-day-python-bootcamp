# Tests for Day 7–8 (Loops and Lists)
#
# Run:  python3 -m pytest exercises/phase1_core/test_day07_loops.py -v

import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
from exercise_day07_loops import sum_to_n, even_numbers, reverse_list, count_occurrences


# ── sum_to_n ───────────────────────────────────────────────────────────────────

def test_sum_to_n_basic():
    assert sum_to_n(5) == 15, (
        f"sum_to_n(5) should be 15 (1+2+3+4+5) but got {sum_to_n(5)!r}.\n"
        "Hint: use a for loop with range(1, n+1) and keep a running total."
    )


def test_sum_to_n_one():
    assert sum_to_n(1) == 1, (
        f"sum_to_n(1) should be 1 but got {sum_to_n(1)!r}."
    )


def test_sum_to_n_ten():
    assert sum_to_n(10) == 55, (
        f"sum_to_n(10) should be 55 but got {sum_to_n(10)!r}."
    )


# ── even_numbers ───────────────────────────────────────────────────────────────

def test_even_numbers_basic():
    assert even_numbers(8) == [2, 4, 6, 8], (
        f"even_numbers(8) should be [2, 4, 6, 8] but got {even_numbers(8)!r}.\n"
        "Hint: use  range(2, max_n+1, 2)  to step by 2."
    )


def test_even_numbers_odd_limit():
    assert even_numbers(7) == [2, 4, 6], (
        f"even_numbers(7) should be [2, 4, 6] but got {even_numbers(7)!r}."
    )


def test_even_numbers_two():
    assert even_numbers(2) == [2], (
        f"even_numbers(2) should be [2] but got {even_numbers(2)!r}."
    )


# ── reverse_list ───────────────────────────────────────────────────────────────

def test_reverse_list_integers():
    assert reverse_list([1, 2, 3]) == [3, 2, 1], (
        f"reverse_list([1, 2, 3]) should be [3, 2, 1] but got {reverse_list([1,2,3])!r}.\n"
        "Hint: you can use  items[::-1]  or  list(reversed(items))."
    )


def test_reverse_list_strings():
    assert reverse_list(["a", "b", "c"]) == ["c", "b", "a"], (
        "reverse_list does not work correctly for string lists."
    )


def test_reverse_list_empty():
    assert reverse_list([]) == [], (
        "reverse_list([]) should return an empty list."
    )


# ── count_occurrences ──────────────────────────────────────────────────────────

def test_count_occurrences_found():
    assert count_occurrences([1, 2, 2, 3], 2) == 2, (
        f"count_occurrences([1,2,2,3], 2) should be 2 but got {count_occurrences([1,2,2,3],2)!r}.\n"
        "Hint: loop through the list and add 1 to a counter each time you see the target."
    )


def test_count_occurrences_not_found():
    assert count_occurrences([1, 2, 3], 9) == 0, (
        "count_occurrences should return 0 when target is not in the list."
    )


def test_count_occurrences_strings():
    assert count_occurrences(["a", "b", "a"], "a") == 2, (
        "count_occurrences should work for lists of strings too."
    )
