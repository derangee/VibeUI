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
    u_id: int
    user_id: str

class DataOut(DataBase):
    id: int
    u_id: int
    user_id: str
    created_at: datetime

    class Config:
        orm_mode = True
