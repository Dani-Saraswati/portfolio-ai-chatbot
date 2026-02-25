from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import get_settings
from .database import init_db, SessionLocal
from .routes import resume, chat
from .models import Resume
from sqlalchemy.orm import Session
import json

# Initialize database (creates tables on startup)
init_db()

# Load settings
settings = get_settings()

# Create FastAPI app
app = FastAPI(
    title="Portfolio AI Chatbot API",
    description="Backend API for portfolio with AI chatbot",
    version="1.0.0"
)

# -------------------- CORS FIX --------------------
# IMPORTANT: allow your Vercel domain
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://portfolio-ai-chatbot-kfbedv89a.vercel.app",
    "*"  # allow all (safe for portfolio project)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://portfolio-ai-chatbot-kfbedv89a.vercel.app",
    ],
    allow_credentials=False,  # IMPORTANT
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- ROUTES --------------------
app.include_router(resume.router)
app.include_router(chat.router)

# -------------------- BASIC ENDPOINTS --------------------
@app.get("/")
async def root():
    return {
        "message": "Portfolio AI Chatbot API running",
        "docs": "/docs"
    }

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "Backend is running"}

# -------------------- DATABASE SEED (VERY IMPORTANT) --------------------
# This will insert your resume into Render database
@app.get("/seed")
def seed_database():
    db: Session = SessionLocal()

    existing = db.query(Resume).first()
    if existing:
        db.close()
        return {"message": "Data already exists"}

    resume = Resume(
        name="Saraswati Dani",
        email="saraswatidani@gmail.com",
        phone="9876543210",
        location="India",
        summary="AI & Web Developer passionate about building intelligent applications",
        skills=json.dumps([
            "Python",
            "FastAPI",
            "React",
            "Machine Learning",
            "SQL",
            "Git",
            "JavaScript"
        ]),
        experiences=json.dumps([
            {
                "company": "Personal Projects",
                "role": "Full Stack Developer",
                "duration": "2024 - Present",
                "description": "Built AI Portfolio Chatbot using FastAPI and React"
            }
        ]),
        education=json.dumps([
            {
                "degree": "B.Tech Computer Science",
                "institution": "Your College Name",
                "year": "2026"
            }
        ]),
        projects=json.dumps([
            {
                "name": "AI Portfolio Chatbot",
                "description": "An AI chatbot that answers recruiter questions about my resume",
                "tech": ["FastAPI", "React", "OpenRouter API"]
            }
        ]),
        is_active=True
    )

    db.add(resume)
    db.commit()
    db.close()

    return {"message": "Database seeded successfully"}