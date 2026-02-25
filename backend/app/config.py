from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    """Application settings from environment variables"""
    
    # API Keys
    OPENROUTER_API_KEY: str = ""
    
    # Database
    DATABASE_URL: str = "sqlite:///./portfolio.db"
    
    # Server
    DEBUG: bool = True
    PORT: int = 8000
    
    # CORS
    ALLOWED_ORIGINS: list = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://portfolio-ai-chatbot-kfbedv89a.vercel.app"
]
    
    class Config:
        env_file = ".env"
        case_sensitive = True

@lru_cache()
def get_settings():
    return Settings()