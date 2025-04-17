from pydantic import BaseModel, EmailStr


# Shared properties
class UserBase(BaseModel):
    email: EmailStr
    user_id: str


# Properties to receive on user creation
class UserCreate(UserBase):
    pass


# Properties to return via API
class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True
