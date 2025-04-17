from fastapi import FastAPI
from server.core.database import engine, Base
from server.models.user import User
from server.models.data import Data
from server.schema.user import UserCreate, UserResponse
from server.schema.data import DataCreate
app = FastAPI()
Base.metadata.create_all(bind=engine)
@app.get("/")
def home():
    return {"message": "Hello World"}