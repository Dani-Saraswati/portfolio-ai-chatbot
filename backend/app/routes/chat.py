from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import ChatMessage
from ..services.openrouter_service import get_ai_response

router = APIRouter(prefix="/api/chat", tags=["chat"])

# Request/Response models
class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    user_message: str
    assistant_message: str

@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest, db: Session = Depends(get_db)):
    """
    Send a message and get AI response based on resume
    """
    
    if not request.message or len(request.message.strip()) == 0:
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    # Get AI response
    ai_response = await get_ai_response(request.message, db)
    
    # Save to database
    chat_message = ChatMessage(
        user_message=request.message,
        assistant_message=ai_response
    )
    db.add(chat_message)
    db.commit()
    
    return ChatResponse(
        user_message=request.message,
        assistant_message=ai_response
    )

@router.get("/history")
async def get_chat_history(db: Session = Depends(get_db)):
    """Get chat conversation history"""
    messages = db.query(ChatMessage).order_by(ChatMessage.created_at).all()
    
    return {
        "messages": [
            {
                "user_message": msg.user_message,
                "assistant_message": msg.assistant_message,
                "created_at": msg.created_at
            }
            for msg in messages
        ]
    }

@router.delete("/history")
async def clear_chat_history(db: Session = Depends(get_db)):
    """Clear all chat history"""
    db.query(ChatMessage).delete()
    db.commit()
    
    return {"message": "Chat history cleared"}