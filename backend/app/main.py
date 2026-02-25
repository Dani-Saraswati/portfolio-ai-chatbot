from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import init_db
from .routes import resume, chat

# Initialize database
init_db()

# Create FastAPI app
app = FastAPI(
    title="Portfolio AI Chatbot API",
    description="Backend API for portfolio with AI chatbot",
    version="1.0.0"
)

# ---------------- CORS FIX (IMPORTANT) ----------------
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://portfolio-ai-chatbot-kfbedv89a.vercel.app",
    "https://portfolio-ai-chatbot-kfbedv89a.vercel.app/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ------------------------------------------------------


# Include routers
app.include_router(resume.router)
app.include_router(chat.router)


# Root
@app.get("/")
async def root():
    return {
        "message": "Portfolio AI Chatbot API",
        "docs": "Visit /docs for API documentation"
    }


# Health check
@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "Backend is running"}


# This line helps confirm deployment in Render logs
print("CORS FIX DEPLOYED SUCCESSFULLY")