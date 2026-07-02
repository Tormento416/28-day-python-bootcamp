# Day 12–14 Exercise: Error Handling and Files
#
# Fill in each function so the tests pass.
# Run: python3 -m pytest exercises/phase1_core/test_day12_errors.py


def safe_divide(a, b):
    """Divide a by b safely.

    Return:
        a / b        if b is not zero
        None         if b is zero  (instead of raising ZeroDivisionError)

    Example:
        safe_divide(10, 2)  -> 5.0
        safe_divide(5, 0)   -> None
    """
    # TODO: replace `pass` with your code
    pass


def parse_number(text: str):
    """Try to convert text to a float.

    Return:
        float(text)  if text is a valid number
        None         if text cannot be converted  (catch ValueError)

    Example:
        parse_number("3.14")  -> 3.14
        parse_number("hello") -> None
        parse_number("42")    -> 42.0
    """
    # TODO: replace `pass` with your code
    pass


def read_first_line(filepath: str) -> str:
    """Read and return the first line of a file (stripped of whitespace).

    Return:
        The first line as a string   if the file exists
        ""  (empty string)           if the file does not exist (catch FileNotFoundError)

    Example (given a file containing "hello\nworld"):
        read_first_line("myfile.txt")  -> "hello"
    """
    # TODO: replace `pass` with your code
    pass
