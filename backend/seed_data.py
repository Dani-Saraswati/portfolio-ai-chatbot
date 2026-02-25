import json
from app.database import SessionLocal, init_db
from app.models import Resume

def seed_resume_data():
    """Populate database with sample resume data"""
    
    # Initialize database
    init_db()
    
    db = SessionLocal()
    
    # Check if resume already exists
    existing = db.query(Resume).first()
    if existing:
        print("Resume data already exists!")
        db.close()
        return
    
    # Sample data
    resume_data = Resume(
        name="Sarah Anderson",
        email="sarah.anderson@email.com",
        phone="+1 (555) 123-4567",
        location="San Francisco, CA",
        summary="""Full-stack developer with 3+ years of experience building web applications. 
Passionate about creating intuitive user interfaces and scalable backend systems. 
Experienced in React, Python, and cloud technologies.""",
        
        skills=json.dumps([
            {"category": "Frontend", "items": ["React", "TypeScript", "Tailwind CSS", "Next.js"]},
            {"category": "Backend", "items": ["Python", "FastAPI", "Node.js", "PostgreSQL"]},
            {"category": "Tools", "items": ["Git", "Docker", "AWS", "PostgreSQL", "MongoDB"]},
            {"category": "Soft Skills", "items": ["Problem Solving", "Communication", "Team Collaboration"]}
        ]),
        
        experiences=json.dumps([
            {
                "position": "Senior Frontend Developer",
                "company": "Tech Company Inc",
                "duration": "2023 - Present",
                "description": "Led development of customer dashboard with React and TypeScript. Improved performance by 40%."
            },
            {
                "position": "Full Stack Developer",
                "company": "StartUp XYZ",
                "duration": "2021 - 2023",
                "description": "Built REST APIs with FastAPI and developed responsive web interfaces."
            }
        ]),
        
        education=json.dumps([
            {
                "degree": "Bachelor of Science in Computer Science",
                "school": "University of California",
                "year": "2021"
            }
        ]),
        
        projects=json.dumps([
            {
                "name": "E-Commerce Platform",
                "description": "Full-stack e-commerce application with React frontend and Python backend",
                "technologies": ["React", "FastAPI", "PostgreSQL"],
                "link": "https://github.com/example"
            },
            {
                "name": "AI Chat Assistant",
                "description": "Chatbot powered by OpenAI API integrated with portfolio",
                "technologies": ["React", "FastAPI", "OpenRouter"],
                "link": "https://github.com/example"
            }
        ])
    )
    
    db.add(resume_data)
    db.commit()
    db.refresh(resume_data)
    
    print(f"✅ Resume data seeded successfully! ID: {resume_data.id}")
    db.close()

if __name__ == "__main__":
    seed_resume_data()