from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Resume
import json

router = APIRouter(prefix="/api/resume", tags=["resume"])


@router.get("/")
async def get_resume(db: Session = Depends(get_db)):
    """Get resume data (auto-create if not exists)"""

    # Try to get active resume
    resume = db.query(Resume).filter(Resume.is_active == True).first()

    # IMPORTANT: On Render DB is empty → create default resume
    if not resume:
        resume = Resume(
            name="Saraswati Dani",
            email="example@email.com",
            phone="",
            location="India",
            summary="Welcome to my AI portfolio chatbot!",
            skills="[]",
            experiences="[]",
            education="[]",
            projects="[]",
            is_active=True
        )
        db.add(resume)
        db.commit()
        db.refresh(resume)

    return {
        "id": resume.id,
        "name": resume.name,
        "email": resume.email,
        "phone": resume.phone,
        "location": resume.location,
        "summary": resume.summary,
        "skills": json.loads(resume.skills) if resume.skills else [],
        "experiences": json.loads(resume.experiences) if resume.experiences else [],
        "education": json.loads(resume.education) if resume.education else [],
        "projects": json.loads(resume.projects) if resume.projects else [],
    }


@router.get("/skills")
async def get_skills(db: Session = Depends(get_db)):
    """Get only skills"""

    resume = db.query(Resume).filter(Resume.is_active == True).first()

    if not resume or not resume.skills:
        return {"skills": []}

    return {"skills": json.loads(resume.skills)}


@router.get("/projects")
async def get_projects(db: Session = Depends(get_db)):
    """Get only projects"""

    resume = db.query(Resume).filter(Resume.is_active == True).first()

    if not resume or not resume.projects:
        return {"projects": []}

    return {"projects": json.loads(resume.projects)}