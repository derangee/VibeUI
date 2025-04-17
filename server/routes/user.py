from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from server.models.user import User
from server.schema.user import UserCreate, UserResponse
from server.core.database import get_db

router = APIRouter()

# Create a new user
@router.post("/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    new_user = User(email=user.email)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user

# Get a user by ID
@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return db_user

# Update user email
@router.put("/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    db_user.email = user.email
    db.commit()
    db.refresh(db_user)
    
    return db_user

# Delete a user
@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(db_user)
    db.commit()
    
    return {"message": f"User with ID {user_id} deleted successfully"}
