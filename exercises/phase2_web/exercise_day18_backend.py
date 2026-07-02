# Day 17–21 Exercise: Python HTTP Backend Logic
#
# These functions implement the business logic for your HTTP backend.
# You can test them WITHOUT running a server — just implement the functions
# and run:  python3 -m pytest exercises/phase2_web/test_day18_backend.py -v


def make_text_response(message: str) -> bytes:
    """Encode a plain-text message as UTF-8 bytes for the HTTP response body.

    Example:
        make_text_response("Hello!")  -> b"Hello!"
    """
    # TODO: replace `pass` with your code
    # Hint: strings have a .encode("utf-8") method
    pass


def make_json_payload(data: dict) -> bytes:
    """Serialize a dict to JSON and return it as UTF-8 bytes.

    Example:
        make_json_payload({"status": "ok"})  -> b'{"status": "ok"}'
    """
    # TODO: replace `pass` with your code
    # Hint: import json, then use json.dumps(data).encode("utf-8")
    pass


def fake_weather(city: str = "Hickory") -> dict:
    """Return a dict with hard-coded weather data for the given city.

    The returned dict MUST contain these keys:
        "city"        -> the city name (string)
        "temperature" -> an integer (e.g. 25)
        "condition"   -> a string (e.g. "Sunny")

    Example:
        fake_weather("Hickory") -> {"city": "Hickory", "temperature": 25, "condition": "Sunny"}
    """
    # TODO: replace `pass` with your code
    pass


def build_info() -> dict:
    """Return a dict with app info.

    The returned dict MUST contain at least these keys:
        "message"  -> a non-empty string
        "status"   -> "ok"

    Example:
        build_info() -> {"message": "Hello from backend", "status": "ok"}
    """
    # TODO: replace `pass` with your code
    pass
