from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
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

# -------------------- CORS CONFIG --------------------
# VERY IMPORTANT: Add your Vercel frontend URL here
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://portfolio-ai-chatbot-kfbedv89a.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------- HANDLE PREFLIGHT (OPTIONS) REQUESTS ----------
# This fixes: "OPTIONS 400 Bad Request" on Render
@app.options("/{full_path:path}")
async def preflight_handler(request: Request, full_path: str):
    return Response(status_code=200)

# ----------------------------------------------------------

# Include API routers
app.include_router(resume.router)
app.include_router(chat.router)

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Portfolio AI Chatbot API",
        "docs": "Visit /docs for API documentation"
    }

# Health check endpoint
@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "Backend is running"}

# Helpful log so we know Render deployed new code
print("CORS + PREFLIGHT FIX DEPLOYED SUCCESSFULLY")