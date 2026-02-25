from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import json

Base = declarative_base()

class Resume(Base):
    """Resume data model"""
    __tablename__ = "resumes"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    email = Column(String(255))
    phone = Column(String(20))
    location = Column(String(255))
    summary = Column(Text)  # About me section
    
    # Skills as JSON string
    skills = Column(Text)  # Will store JSON
    
    # Experience as JSON string
    experiences = Column(Text)  # Will store JSON
    
    # Education as JSON string
    education = Column(Text)  # Will store JSON
    
    # Projects as JSON string
    projects = Column(Text)  # Will store JSON
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)

class ChatMessage(Base):
    """Chat message history"""
    __tablename__ = "chat_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    user_message = Column(Text)
    assistant_message = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)