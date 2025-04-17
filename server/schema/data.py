from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class DataBase(BaseModel):
    brand_name: str
    brand_description: Optional[str] = None
    industry: str
    brand_style: str
    brand_vibe: Optional[str] = None
    primary_color: Optional[str] = None
    secondary_color: Optional[str] = None
    accent_color: Optional[str] = None

class DataCreate(DataBase):
    user_id: int

class DataOut(DataBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        orm_mode = True
