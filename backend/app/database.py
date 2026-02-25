from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
from .models import Base

# Database URL
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./portfolio.db")

# Create engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

# Create session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create all tables
def init_db():
    Base.metadata.create_all(bind=engine)

# Dependency for routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()