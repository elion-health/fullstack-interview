.PHONY: dev seed migrate migrate-create migrate-down reset install

dev:
	uv run uvicorn app.main:app --reload --port 8000

seed:
	uv run python seed.py

migrate:
	uv run alembic upgrade head

migrate-create:
	uv run alembic revision --autogenerate -m "$(name)"

migrate-down:
	uv run alembic downgrade -1

reset:
	uv run alembic downgrade base && uv run alembic upgrade head && uv run python seed.py

install:
	uv sync
