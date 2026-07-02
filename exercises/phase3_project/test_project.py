# Tests for the Final Project (Days 22–28)
#
# These tests check the backend logic functions without starting the HTTP server.
# Run:  python3 -m pytest exercises/phase3_project/test_project.py -v

import sys
import os
import json

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "backend"))
from server import get_weather, get_info, json_bytes


# ── get_weather ────────────────────────────────────────────────────────────────

def test_get_weather_returns_dict():
    result = get_weather()
    assert result is not None, "get_weather() returned None. Did you forget a return statement?"
    assert isinstance(result, dict), (
        f"get_weather() should return a dict but got {type(result).__name__}."
    )


def test_get_weather_required_keys():
    result = get_weather()
    for key in ("city", "temperature", "condition"):
        assert key in result, (
            f"get_weather() must include key '{key}' — it is missing.\n"
            "Return a dict like: {\"city\": \"Hickory\", \"temperature\": 25, \"condition\": \"Sunny\"}"
        )


def test_get_weather_types():
    result = get_weather()
    assert isinstance(result["city"], str), "'city' must be a string."
    assert isinstance(result["temperature"], int), "'temperature' must be an int."
    assert isinstance(result["condition"], str), "'condition' must be a string."


# ── get_info ───────────────────────────────────────────────────────────────────

def test_get_info_returns_dict():
    result = get_info()
    assert isinstance(result, dict), (
        f"get_info() should return a dict but got {type(result).__name__}."
    )


def test_get_info_status_ok():
    result = get_info()
    assert result.get("status") == "ok", (
        f"get_info()['status'] must be 'ok' but got {result.get('status')!r}."
    )


def test_get_info_has_message():
    result = get_info()
    assert "message" in result and result["message"], (
        "get_info() must return a non-empty 'message' key."
    )


# ── json_bytes ────────────────────────────────────────────────────────────────

def test_json_bytes_returns_bytes():
    result = json_bytes({"key": "value"})
    assert isinstance(result, bytes), (
        f"json_bytes should return bytes but got {type(result).__name__}.\n"
        "Hint: use  json.dumps(data).encode('utf-8')"
    )


def test_json_bytes_valid_json():
    result = json_bytes({"status": "ok", "count": 5})
    parsed = json.loads(result)
    assert parsed == {"status": "ok", "count": 5}, (
        f"json_bytes did not produce valid/correct JSON. Got: {result!r}"
    )


# ── integration: weather response is valid JSON ────────────────────────────────

def test_weather_as_json_bytes():
    """End-to-end: get_weather() output can be serialized with json_bytes()."""
    data = get_weather()
    if data is None:
        return  # skip if get_weather not implemented yet
    encoded = json_bytes(data)
    parsed = json.loads(encoded)
    assert parsed["city"] == data["city"], (
        "json_bytes(get_weather()) should round-trip correctly."
    )
