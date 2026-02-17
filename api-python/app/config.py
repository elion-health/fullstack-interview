from pathlib import Path

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://elion:elion_dev_password@localhost:5432/elion_interview"

    model_config = {
        "env_file": str(Path(__file__).resolve().parent.parent.parent / ".env.local"),
        "extra": "ignore",
    }

    @property
    def async_database_url(self) -> str:
        """Convert postgresql:// to postgresql+asyncpg:// for async engine."""
        return self.DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)


settings = Settings()
