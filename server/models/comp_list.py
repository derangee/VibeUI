from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from server.core.database import Base

class Component(Base):
    __tablename__ = "components"

    component_id = Column(Integer, primary_key=True, index=True)  # Auto-generated ID
    uid = Column(Integer, ForeignKey("users.id"))  # Reference to User
    user_id = Column(String, ForeignKey("users.user_id"))  # Also reference to User
    
    component_name = Column(String)
    code = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user_by_id = relationship("User", back_populates="components", foreign_keys=[uid])
    user_by_user_id = relationship("User", back_populates="components_by_user_id", foreign_keys=[user_id])