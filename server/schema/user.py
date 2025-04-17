from pydantic import BaseModel, EmailStr


# Shared properties
class UserBase(BaseModel):
    email: EmailStr


# Properties to receive on user creation
class UserCreate(UserBase):
    pass


# Properties to return via API
class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True
