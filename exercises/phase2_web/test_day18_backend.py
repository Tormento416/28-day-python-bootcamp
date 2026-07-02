# Tests for Day 17–21 (HTTP Backend Logic)
#
# Run:  python3 -m pytest exercises/phase2_web/test_day18_backend.py -v

import sys
import os
import json

sys.path.insert(0, os.path.dirname(__file__))
from exercise_day18_backend import (
    make_text_response,
    make_json_payload,
    fake_weather,
    build_info,
)


# ── make_text_response ─────────────────────────────────────────────────────────

def test_make_text_response_returns_bytes():
    result = make_text_response("Hello!")
    assert result is not None, (
        "make_text_response returned None. Did you add a return statement?"
    )
    assert isinstance(result, bytes), (
        f"make_text_response should return bytes but got {type(result).__name__}.\n"
        "Hint: use  message.encode('utf-8')"
    )


def test_make_text_response_content():
    result = make_text_response("Hello from Python backend!")
    assert result == b"Hello from Python backend!", (
        f"Expected b'Hello from Python backend!' but got {result!r}."
    )


# ── make_json_payload ──────────────────────────────────────────────────────────

def test_make_json_payload_returns_bytes():
    result = make_json_payload({"status": "ok"})
    assert isinstance(result, bytes), (
        f"make_json_payload should return bytes but got {type(result).__name__}.\n"
        "Hint: use  json.dumps(data).encode('utf-8')"
    )


def test_make_json_payload_valid_json():
    result = make_json_payload({"status": "ok", "count": 3})
    parsed = json.loads(result)
    assert parsed == {"status": "ok", "count": 3}, (
        f"The JSON payload does not round-trip correctly. Got: {result!r}"
    )


# ── fake_weather ───────────────────────────────────────────────────────────────

def test_fake_weather_has_required_keys():
    result = fake_weather()
    for key in ("city", "temperature", "condition"):
        assert key in result, (
            f"fake_weather() must include key '{key}' but it is missing.\n"
            "Return a dict like: {\"city\": ..., \"temperature\": ..., \"condition\": ...}"
        )


def test_fake_weather_city_is_string():
    result = fake_weather("Hickory")
    assert isinstance(result["city"], str), (
        "The 'city' value in fake_weather must be a string."
    )


def test_fake_weather_temperature_is_int():
    result = fake_weather()
    assert isinstance(result["temperature"], int), (
        f"The 'temperature' value should be an int but got {type(result['temperature']).__name__}."
    )


def test_fake_weather_city_matches_argument():
    result = fake_weather("Springfield")
    assert result["city"] == "Springfield", (
        f"fake_weather('Springfield')['city'] should be 'Springfield' but got {result['city']!r}."
    )


# ── build_info ────────────────────────────────────────────────────────────────

def test_build_info_status_ok():
    result = build_info()
    assert result.get("status") == "ok", (
        f"build_info()['status'] should be 'ok' but got {result.get('status')!r}."
    )


def test_build_info_has_message():
    result = build_info()
    assert "message" in result and result["message"], (
        "build_info() must return a non-empty 'message' key."
    )
