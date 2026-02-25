import aiohttp
import json
from ..config import get_settings
from ..database import SessionLocal
from ..models import Resume
from sqlalchemy.orm import Session

async def get_ai_response(user_message: str, db: Session) -> str:
    """
    Get AI response from OpenRouter API based on resume context
    """
    
    settings = get_settings()
    
    # Get resume context
    resume = db.query(Resume).filter(Resume.is_active == True).first()
    
    if not resume:
        return "Sorry, I couldn't find your resume data. Please check with the administrator."
    
    # Build context from resume
    resume_context = build_resume_context(resume)
    
    # System prompt for the AI
    system_prompt = f"""You are an intelligent assistant representing a job candidate. 
Your job is to answer questions about their professional background, skills, and projects based on the following resume information:

{resume_context}

Guidelines:
- Answer questions about the candidate's skills, experience, and projects
- Be professional and concise
- If asked about something not in the resume, politely say you don't have that information
- Be helpful and engaging"""
    
    # Call OpenRouter API
    api_key = settings.OPENROUTER_API_KEY
    
    if not api_key or api_key == "your_key_here":
        # Return mock response for testing
        return f"[Mock Response] I would answer your question: '{user_message}' based on the resume. Please add a real OpenRouter API key to enable AI responses."
    
    try:
        async with aiohttp.ClientSession() as session:
            headers = {
                "Authorization": f"Bearer {api_key}",
                "HTTP-Referer": "http://localhost:5173",
            }
            
            data = {
                "model": "mistral/mistral-7b-instruct:free",  # Free model
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message}
                ],
                "temperature": 0.7,
                "max_tokens": 500
            }
            
            async with session.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers=headers,
                json=data
            ) as response:
                if response.status != 200:
                    error_text = await response.text()
                    return f"Error from AI service: {error_text}"
                
                result = await response.json()
                return result["choices"][0]["message"]["content"]
    
    except Exception as e:
        return f"Error connecting to AI service: {str(e)}"

def build_resume_context(resume: Resume) -> str:
    """Build a formatted resume context for the AI"""
    
    context = f"""
NAME: {resume.name}
EMAIL: {resume.email}
PHONE: {resume.phone}
LOCATION: {resume.location}

PROFESSIONAL SUMMARY:
{resume.summary}

SKILLS:
"""
    
    if resume.skills:
        skills = json.loads(resume.skills)
        for skill_group in skills:
            context += f"\n{skill_group['category']}: {', '.join(skill_group['items'])}"
    
    context += "\n\nEXPERIENCE:\n"
    if resume.experiences:
        experiences = json.loads(resume.experiences)
        for exp in experiences:
            context += f"\n- {exp['position']} at {exp['company']} ({exp['duration']})\n  {exp['description']}"
    
    context += "\n\nEDUCATION:\n"
    if resume.education:
        education = json.loads(resume.education)
        for edu in education:
            context += f"\n- {edu['degree']} from {edu['school']} ({edu['year']})"
    
    context += "\n\nPROJECTS:\n"
    if resume.projects:
        projects = json.loads(resume.projects)
        for proj in projects:
            context += f"\n- {proj['name']}: {proj['description']}\n  Technologies: {', '.join(proj['technologies'])}"
    
    return context