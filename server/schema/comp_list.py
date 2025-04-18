from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# Base schema
class ComponentBase(BaseModel):
    uid: int
    user_id: str
    component_name: str
    code: str

# Schema for creation (input)
class ComponentCreate(ComponentBase):
    pass  # No extra fields needed for creation (component_id is auto-generated)

# Schema for response (output)
class ComponentOut(ComponentBase):
    component_id: int  # Auto-generated
    created_at: Optional[datetime] = None  # If you have a timestamp in your model

    class Config:
        orm_mode = True