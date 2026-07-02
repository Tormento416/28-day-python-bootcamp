.PHONY: help setup test test-day

help:
	@echo "28-Day Python Bootcamp – Available commands:"
	@echo ""
	@echo "  make setup              Create venv and install dependencies"
	@echo "  make test               Run all exercises tests"
	@echo "  make test-day D=<phase> Run tests for one phase"
	@echo "                          e.g.: make test-day D=phase1_core"
	@echo "                                make test-day D=phase2_web"
	@echo "                                make test-day D=phase3_project"
	@echo ""

setup:
	python3 -m venv venv
	./venv/bin/pip install --upgrade pip --quiet
	./venv/bin/pip install -r requirements.txt --quiet
	@echo "✅  Setup complete. Activate with: source venv/bin/activate"

test:
	python3 -m pytest

test-day:
	python3 -m pytest exercises/$(D)/
