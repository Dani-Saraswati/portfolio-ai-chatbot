from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import get_settings
from .database import init_db
from .routes import resume, chat
import json

# Initialize database
init_db()

# Get settings
settings = get_settings()

# Create FastAPI app
app = FastAPI(
    title="Portfolio AI Chatbot API",
    description="Backend API for portfolio with AI chatbot",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(resume.router)
app.include_router(chat.router)

# Health check
@app.get("/")
async def root():
    return {
        "message": "Portfolio AI Chatbot API",
        "docs": "Visit /docs for API documentation"
    }

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "Backend is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)