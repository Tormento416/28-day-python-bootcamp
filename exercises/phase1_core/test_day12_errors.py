# Tests for Day 12–14 (Error Handling and Files)
#
# Run:  python3 -m pytest exercises/phase1_core/test_day12_errors.py -v

import sys
import os
import tempfile

sys.path.insert(0, os.path.dirname(__file__))
from exercise_day12_errors import safe_divide, parse_number, read_first_line


# ── safe_divide ────────────────────────────────────────────────────────────────

def test_safe_divide_normal():
    result = safe_divide(10, 2)
    assert result == 5.0, (
        f"safe_divide(10, 2) should be 5.0 but got {result!r}.\n"
        "Hint: just return  a / b  inside a try block."
    )


def test_safe_divide_by_zero_returns_none():
    result = safe_divide(5, 0)
    assert result is None, (
        f"safe_divide(5, 0) should return None but got {result!r}.\n"
        "Hint: catch ZeroDivisionError and return None."
    )


def test_safe_divide_negative():
    result = safe_divide(-10, 2)
    assert result == -5.0, (
        f"safe_divide(-10, 2) should be -5.0 but got {result!r}."
    )


# ── parse_number ───────────────────────────────────────────────────────────────

def test_parse_number_valid_float():
    result = parse_number("3.14")
    assert abs(result - 3.14) < 1e-9, (
        f"parse_number('3.14') should be 3.14 but got {result!r}."
    )


def test_parse_number_valid_integer_string():
    result = parse_number("42")
    assert result == 42.0, (
        f"parse_number('42') should be 42.0 but got {result!r}."
    )


def test_parse_number_invalid_returns_none():
    result = parse_number("hello")
    assert result is None, (
        f"parse_number('hello') should return None but got {result!r}.\n"
        "Hint: catch ValueError when float(text) fails."
    )


# ── read_first_line ────────────────────────────────────────────────────────────

def test_read_first_line_exists():
    with tempfile.NamedTemporaryFile(mode="w", suffix=".txt", delete=False) as f:
        f.write("hello\nworld\n")
        tmp_path = f.name
    try:
        result = read_first_line(tmp_path)
        assert result == "hello", (
            f"read_first_line should return 'hello' but got {result!r}.\n"
            "Hint: open the file with  open(filepath, 'r')  and read the first line."
        )
    finally:
        os.unlink(tmp_path)


def test_read_first_line_missing_file():
    result = read_first_line("/tmp/this_file_does_not_exist_bootcamp.txt")
    assert result == "", (
        f"read_first_line should return '' for a missing file but got {result!r}.\n"
        "Hint: catch FileNotFoundError and return ''."
    )
