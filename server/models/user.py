from sqlalchemy import Column, Integer, String
from server.core.database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True)
    
    datas = relationship("Data", back_populates="owner") 