import os
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from server.core.database import Base

class Data(Base):
    __tablename__ = "datas"

    id = Column(Integer, primary_key=True, index=True)
    u_id = Column(Integer, ForeignKey("users.id"))
    user_id = Column(String, ForeignKey("users.user_id"))
    brand_name = Column(String, index=True)
    brand_description = Column(Text, nullable=True)
    industry = Column(String)
    brand_style = Column(String)  # modern, playful, elegant
    brand_vibe = Column(String, nullable=True)
    primary_color = Column(String, nullable=True)
    secondary_color = Column(String, nullable=True)
    accent_color = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user_by_id = relationship("User", back_populates="datas", foreign_keys=[u_id])
    user_by_user_id = relationship("User", back_populates="datas_by_user_id", foreign_keys=[user_id])