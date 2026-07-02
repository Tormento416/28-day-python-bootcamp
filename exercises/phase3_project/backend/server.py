# Day 25–28 Exercise: Final Project Backend (backend/server.py)
#
# This is the refactored backend for your final project.
# Fill in the functions below, then run the project tests with:
#   python3 -m pytest exercises/phase3_project/test_project.py -v
#
# The tests import from this file directly, so you don't need to run the
# HTTP server to check your logic.

import json
from http.server import BaseHTTPRequestHandler, HTTPServer


def get_weather() -> dict:
    """Return hard-coded weather data.

    Must include keys: "city" (str), "temperature" (int), "condition" (str).

    Example return value:
        {"city": "Hickory", "temperature": 25, "condition": "Sunny"}
    """
    # TODO: replace `pass` with your code
    pass


def get_info() -> dict:
    """Return application info.

    Must include keys: "message" (non-empty str), "status" (value "ok").

    Example return value:
        {"message": "Hello from backend", "status": "ok"}
    """
    # TODO: replace `pass` with your code
    pass


def json_bytes(data: dict) -> bytes:
    """Serialize a dict to UTF-8 encoded JSON bytes.

    Example:
        json_bytes({"a": 1})  -> b'{"a": 1}'
    """
    # TODO: replace `pass` with your code
    pass


class MyHandler(BaseHTTPRequestHandler):
    """HTTP request handler for the final project."""

    def log_message(self, format, *args):  # noqa: A002
        # Suppress default logging to keep terminal output clean during tests
        pass

    def do_GET(self):
        if self.path == "/weather":
            data = get_weather()
            body = json_bytes(data)
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(body)

        elif self.path == "/info":
            data = get_info()
            body = json_bytes(data)
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(body)

        else:
            self.send_response(404)
            self.send_header("Content-type", "text/plain")
            self.end_headers()
            self.wfile.write(b"Not Found")


if __name__ == "__main__":
    host = "0.0.0.0"
    port = 8001
    server = HTTPServer((host, port), MyHandler)
    print(f"Serving backend on http://{host}:{port}")
    print("Endpoints: /info  /weather")
    server.serve_forever()
