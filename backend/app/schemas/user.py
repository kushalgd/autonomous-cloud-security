from datetime import datetime

from pydantic import BaseModel, EmailStr


# Schema for creating a new user
class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str


# Schema for updating an existing user
class UserUpdate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    
class UserLogin(BaseModel):
    email: EmailStr
    password: str    


# Schema for returning user data in API responses
class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True