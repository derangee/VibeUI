from sqlalchemy import Column, Integer, String
from server.core.database import Base
from sqlalchemy.orm import relationship
from server.models.comp_list import Component  # adjust path as needed
from server.models.data import Data           # adjust path as needed

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True)
    user_id = Column(String, unique=True)
    
    datas = relationship("Data", back_populates="user_by_id", foreign_keys="Data.u_id")
    datas_by_user_id = relationship("Data", back_populates="user_by_user_id", foreign_keys="Data.user_id")

    components = relationship("Component", back_populates="user_by_id", foreign_keys="Component.uid")
    components_by_user_id = relationship("Component", back_populates="user_by_user_id", foreign_keys="Component.user_id")
